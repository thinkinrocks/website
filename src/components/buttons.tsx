import { FaDiscord } from "react-icons/fa";

export function ButtonLink({
  href = "#",
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="bg-slate-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-slate-50 text-slate-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap"
        target="_blank"
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}

export function DiscordButton({
  href = "#",
  onClick,
}: {
  href: string;
  onClick?: () => void;
}) {
  return (
    <div className="bg-green-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-green-50 text-green-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2"
        target="_blank"
        onClick={onClick}
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
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="bg-teal-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-teal-50 text-teal-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap"
        target="_blank"
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}

export function PurpleButtonLink({
  href = "#",
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isExternal = href.startsWith('http');
  return (
    <div className="bg-purple-600 h-fit translate-0.5">
      <a
        href={href}
        className="bg-purple-50 text-purple-600 inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}
