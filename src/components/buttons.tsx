import { FaDiscord } from "react-icons/fa";

export function ButtonLink({
  href = "#",
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-slate-50 text-slate-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap"
      >
        {children}
      </a>
    </div>
  );
}

export function DiscordButton({ href = "#" }: { href: string }) {
  return (
    <div className="bg-green-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-green-50 text-green-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2"
      >
        <FaDiscord className="w-4 h-4 -mb-1" />
        Discord
      </a>
    </div>
  );
}

export function EventButton({
  href = "#",
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-indigo-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-indigo-50 text-indigo-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap"
      >
        {children}
      </a>
    </div>
  );
}
