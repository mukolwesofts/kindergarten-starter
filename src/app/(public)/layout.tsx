import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/widgets/whatsapp-button";
import { ChatbotWidget } from "@/components/widgets/chatbot-widget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-pill focus:bg-accent focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
    </>
  );
}
