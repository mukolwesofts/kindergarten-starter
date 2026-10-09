"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { User } from "../schema";
import {
    createUser,
    updateUser,
    resetPassword,
    deleteUser,
} from "../actions";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField, inputClasses } from "./form-field";
import { userRoles } from "../schema";
import { Pencil, KeyRound, Trash2, Search, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogState =
    | { type: "create" }
    | { type: "edit"; user: User }
    | { type: "reset"; user: User }
    | { type: "delete"; user: User }
    | null;

function RoleBadge({ role }: { role: User["role"] }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-pill px-2.5 py-0.5 font-display text-xs font-semibold",
                role === "admin" ? "bg-accent text-on-accent" : "bg-soft text-brand",
            )}
        >
            {role}
        </span>
    );
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-xs",
                active ? "text-ink" : "text-muted",
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "size-2 rounded-full",
                    active ? "bg-green-600" : "bg-muted",
                )}
            />
            {active ? "Active" : "Inactive"}
        </span>
    );
}

export function UsersManager({
    users,
    currentUserId,
    isAdmin,
    search,
}: {
    users: User[];
    currentUserId: string;
    isAdmin: boolean;
    search: string;
}) {
    const [dialog, setDialog] = useState<DialogState>(null);
    const [pending, startTransition] = useTransition();
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    function run(action: Promise<{ ok: boolean; error?: string; fieldErrors?: Record<string, string> }>, successMsg: string) {
        startTransition(async () => {
            const result = await action;
            if (result.ok) {
                toast.success(successMsg);
                setDialog(null);
                setFieldErrors({});
            } else {
                setFieldErrors(result.fieldErrors ?? {});
                if (result.error) toast.error(result.error);
            }
        });
    }

    const isSelf = (u: User) => String(u.id) === currentUserId;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <form
                    method="get"
                    action="/dashboard/users"
                    className="flex items-center gap-2"
                    role="search"
                >
                    <label htmlFor="user-search" className="sr-only">
                        Search users by email
                    </label>
                    <div className="relative">
                        <Search
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                        />
                        <input
                            id="user-search"
                            name="q"
                            defaultValue={search}
                            placeholder="Search by email…"
                            className={cn(inputClasses, "w-64 pl-9")}
                        />
                    </div>
                    <Button variant="outline" type="submit" className="min-h-10 px-4 py-2 text-sm">
                        Search
                    </Button>
                </form>

                {isAdmin && (
                    <Button
                        variant="accent"
                        className="min-h-10 px-4 py-2 text-sm"
                        onClick={() => {
                            setFieldErrors({});
                            setDialog({ type: "create" });
                        }}
                    >
                        <UserPlus aria-hidden="true" className="size-4" />
                        New user
                    </Button>
                )}
            </div>

            <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-soft">
                <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-line bg-soft">
                            <th scope="col" className="px-4 py-3 font-display font-semibold">Name</th>
                            <th scope="col" className="px-4 py-3 font-display font-semibold">Email</th>
                            <th scope="col" className="px-4 py-3 font-display font-semibold">Role</th>
                            <th scope="col" className="px-4 py-3 font-display font-semibold">Status</th>
                            <th scope="col" className="px-4 py-3 font-display font-semibold">Last login</th>
                            {isAdmin && (
                                <th scope="col" className="px-4 py-3 font-display font-semibold">
                                    <span className="sr-only">Actions</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={isAdmin ? 6 : 5}
                                    className="px-4 py-8 text-center text-muted"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                        {users.map((u) => (
                            <tr key={u.id} className="border-b border-line last:border-0">
                                <td className="px-4 py-3 font-medium text-ink">
                                    {u.name}
                                    {isSelf(u) && (
                                        <span className="ml-2 text-xs text-muted">(you)</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-muted">{u.email}</td>
                                <td className="px-4 py-3">
                                    <RoleBadge role={u.role} />
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge active={u.active} />
                                </td>
                                <td className="px-4 py-3 text-muted">
                                    {u.lastLoginAt
                                        ? new Date(u.lastLoginAt * 1000).toLocaleDateString("en-KE", {
                                            dateStyle: "medium",
                                        })
                                        : "—"}
                                </td>
                                {isAdmin && (
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFieldErrors({});
                                                    setDialog({ type: "edit", user: u });
                                                }}
                                                aria-label={`Edit ${u.name}`}
                                                className="grid size-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-brand"
                                            >
                                                <Pencil aria-hidden="true" className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFieldErrors({});
                                                    setDialog({ type: "reset", user: u });
                                                }}
                                                aria-label={`Reset password for ${u.name}`}
                                                className="grid size-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-brand"
                                            >
                                                <KeyRound aria-hidden="true" className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDialog({ type: "delete", user: u })}
                                                disabled={isSelf(u)}
                                                aria-label={`Delete ${u.name}`}
                                                className="grid size-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Trash2 aria-hidden="true" className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create user */}
            <Dialog
                open={dialog?.type === "create"}
                onClose={() => setDialog(null)}
                title="New user"
            >
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        run(
                            createUser({
                                name: fd.get("name"),
                                email: fd.get("email"),
                                role: fd.get("role"),
                                password: fd.get("password"),
                            }),
                            "User created.",
                        );
                    }}
                >
                    <FormField id="cu-name" label="Name" error={fieldErrors.name}>
                        <input id="cu-name" name="name" required className={inputClasses} />
                    </FormField>
                    <FormField id="cu-email" label="Email" error={fieldErrors.email}>
                        <input
                            id="cu-email"
                            name="email"
                            type="email"
                            required
                            className={inputClasses}
                        />
                    </FormField>
                    <FormField id="cu-role" label="Role" error={fieldErrors.role}>
                        <select id="cu-role" name="role" className={inputClasses}>
                            {userRoles.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField
                        id="cu-password"
                        label="Temporary password"
                        error={fieldErrors.password}
                    >
                        <input
                            id="cu-password"
                            name="password"
                            type="password"
                            required
                            minLength={10}
                            className={inputClasses}
                        />
                    </FormField>
                    <Button type="submit" variant="accent" disabled={pending}>
                        {pending ? "Creating…" : "Create user"}
                    </Button>
                </form>
            </Dialog>

            {/* Edit user */}
            <Dialog
                open={dialog?.type === "edit"}
                onClose={() => setDialog(null)}
                title={dialog?.type === "edit" ? `Edit ${dialog.user.name}` : "Edit"}
            >
                {dialog?.type === "edit" && (
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            run(
                                updateUser({
                                    id: dialog.user.id,
                                    name: fd.get("name"),
                                    role: fd.get("role"),
                                    active: fd.get("active") === "on",
                                }),
                                "User updated.",
                            );
                        }}
                    >
                        <FormField id="eu-name" label="Name" error={fieldErrors.name}>
                            <input
                                id="eu-name"
                                name="name"
                                required
                                defaultValue={dialog.user.name}
                                className={inputClasses}
                            />
                        </FormField>
                        <FormField id="eu-role" label="Role" error={fieldErrors.role}>
                            <select
                                id="eu-role"
                                name="role"
                                defaultValue={dialog.user.role}
                                className={inputClasses}
                            >
                                {userRoles.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                        <label className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-4 text-sm text-ink">
                            <input
                                type="checkbox"
                                name="active"
                                defaultChecked={dialog.user.active}
                                className="size-4 accent-brand"
                            />
                            Active
                        </label>
                        <Button type="submit" variant="accent" disabled={pending}>
                            {pending ? "Saving…" : "Save changes"}
                        </Button>
                    </form>
                )}
            </Dialog>

            {/* Reset password */}
            <Dialog
                open={dialog?.type === "reset"}
                onClose={() => setDialog(null)}
                title={
                    dialog?.type === "reset"
                        ? `Reset password — ${dialog.user.name}`
                        : "Reset password"
                }
            >
                {dialog?.type === "reset" && (
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            run(
                                resetPassword({
                                    id: dialog.user.id,
                                    password: fd.get("password"),
                                }),
                                "Password reset.",
                            );
                        }}
                    >
                        <FormField
                            id="rp-password"
                            label="New password"
                            error={fieldErrors.password}
                        >
                            <input
                                id="rp-password"
                                name="password"
                                type="password"
                                required
                                minLength={10}
                                className={inputClasses}
                            />
                        </FormField>
                        <Button type="submit" variant="accent" disabled={pending}>
                            {pending ? "Resetting…" : "Reset password"}
                        </Button>
                    </form>
                )}
            </Dialog>

            {/* Delete confirmation */}
            <Dialog
                open={dialog?.type === "delete"}
                onClose={() => setDialog(null)}
                title="Delete user"
            >
                {dialog?.type === "delete" && (
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted">
                            Delete <strong className="text-ink">{dialog.user.name}</strong> (
                            {dialog.user.email})? This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setDialog(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="flex-1"
                                disabled={pending}
                                onClick={() =>
                                    run(deleteUser({ id: dialog.user.id }), "User deleted.")
                                }
                            >
                                {pending ? "Deleting…" : "Delete"}
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
