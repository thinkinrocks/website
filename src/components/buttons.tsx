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
    <a
      href={href}
      className="hover:bg-slate-100 h-fit py-1 px-2 text-slate-600 inline-flex items-center gap-2 whitespace-nowrap"
      target="_blank"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function GreenButtonLink({
  href = "#",
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className="hover:bg-green-100 h-fit py-1 px-2 text-green-600 inline-flex items-center gap-2 whitespace-nowrap"
      target="_blank"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function TealButtonLink({
  href = "#",
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className="hover:bg-teal-50 h-fit py-1 px-2 text-teal-600 inline-flex items-center gap-2 whitespace-nowrap"
      target="_blank"
      onClick={onClick}
    >
      {children}
    </a>
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
    <a
      href={href}
      className="hover:bg-purple-50 h-fit py-1 px-2 text-purple-600 inline-flex items-center gap-2 whitespace-nowrap"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
