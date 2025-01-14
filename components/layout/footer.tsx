import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Made with ❤️ by{" "}
          <span className="font-medium">Positive Developer</span>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/johnbenet009"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/onokoya-john-87819b213/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}