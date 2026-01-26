import { FaCalendarAlt, FaDiscord, FaUserPlus, FaTelegram } from "react-icons/fa";
import { ButtonLink, EventButton } from "./buttons.tsx";
import { track } from "@vercel/analytics";

export default function WelcomeButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <EventButton
        href="https://t.me/+rxHNt6GA4-o1NWUy?text=Hello,%20I%20am%20"
        onClick={() => track("event_button_click")}
      >
        <span className="font-mono">Join builders</span>
        </EventButton>
      <ButtonLink
        href="https://discord.gg/gtncJfm85n"
        onClick={() => track("discord_button_click")}
      >
        <FaDiscord className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Discord</span>
      </ButtonLink>
      <ButtonLink
        href="https://t.me/thinkinrocks"
        onClick={() => track("telegram_button_click")}
      >
        <FaTelegram className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Telegram channel</span>
      </ButtonLink>
    </div>
  );
}
