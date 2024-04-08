import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div>崩铁助手</div>
      <div>
        <a href="/walker-way" className={title({ color: "violet" })}>
          行者之道
        </a>
      </div>
      <div>
        <a href="/bartending" className={title({ color: "violet" })}>
          调酒推演
        </a>
      </div>
    </section>
  );
}
