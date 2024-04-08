"use client";

import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useTitle } from "ahooks";
export default function Home() {
  useTitle("崩铁助手");
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ul className="space-y-2">
        <li>
          <a href="/walker-way" className="block hover:text-blue-500">
            行者之道
          </a>
        </li>
        <li>
          <a href="/bartending" className="block hover:text-blue-500">
            调酒推演
          </a>
        </li>
      </ul>
    </section>
  );
}
