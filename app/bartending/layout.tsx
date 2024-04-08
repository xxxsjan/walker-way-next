import { Navbar } from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Navbar title="调酒推演" />
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
