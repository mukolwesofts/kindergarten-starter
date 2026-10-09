import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="font-display text-4xl">{site.name}</h1>
        <p className="mt-2 text-muted">Scaffold check — theme tokens live.</p>
        <Button variant="accent" className="mt-6" href="#">
          Book a visit
        </Button>
      </div>
    </main>
  );
}
