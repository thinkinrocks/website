import { FaCalendarAlt, FaGithub, FaUserPlus } from "react-icons/fa";
import { TealButtonLink, PurpleButtonLink, ButtonLink } from "./buttons.tsx";
import { track } from "@vercel/analytics";

export default function WelcomeButtons() {
  return (
    <div className="">
      <PurpleButtonLink
        href="/events"
        onClick={() => track("events_page_click")}
      >
        <FaCalendarAlt className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Attend events</span>
      </PurpleButtonLink><br/>
      <TealButtonLink
        href="https://t.me/+rxHNt6GA4-o1NWUy?text=Hello,%20I%20am%20"
        onClick={() => track("event_button_click")}
      >
        <FaUserPlus className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Join our chat</span>
      </TealButtonLink><br/>
      <ButtonLink
        href="https://t.me/+rxHNt6GA4-o1NWUy?text=Hello,%20I%20am%20"
        onClick={() => track("event_button_click")}
      >
        <FaGithub className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Contribute</span>
      </ButtonLink>
    </div>
  );
}
