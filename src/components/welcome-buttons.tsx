import { FaCalendarAlt, FaGithub, FaUserPlus } from "react-icons/fa";
import { TealButtonLink, PurpleButtonLink, ButtonLink } from "./buttons.tsx";
const track = (name: string, data?: Record<string, any>) => {

export default function WelcomeButtons() {
   const track = (name: string, data?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track(name, data);
    }
  };

  return (
    <div className="">
      <PurpleButtonLink
        href="/events"
        onClick={() => track("attend-click")}
      >
        <FaCalendarAlt className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Attend events</span>
      </PurpleButtonLink><br/>
      <TealButtonLink
        href="https://t.me/+rxHNt6GA4-o1NWUy?text=Hello,%20I%20am%20"
        onClick={() => track("join-chat-click")}
      >
        <FaUserPlus className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Join our chat</span>
      </TealButtonLink><br/>
      <ButtonLink
        href="https://github.com/thinkinrocks/"
        onClick={() => track("contribute-click")}
      >
        <FaGithub className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Contribute</span>
      </ButtonLink>
    </div>
  );
}
