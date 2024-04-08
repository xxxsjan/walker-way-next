import { title, subtitle } from "@/components/primitives";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className={title({ color: "violet" })}>404 Not Found</div>
    </section>
  );
}
