import { FaCalendarAlt, FaDiscord, FaUserPlus, FaTelegram } from "react-icons/fa";
import { ButtonLink, EventButton } from "./buttons.tsx";
import { track } from "@vercel/analytics";

export default function WelcomeButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <EventButton
        href="https://discord.gg/gtncJfm85n"
        onClick={() => track("discord_button_click")}
      >
        <FaDiscord className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Discord</span>
      </EventButton>
      <ButtonLink
        href="https://t.me/+rxHNt6GA4-o1NWUy"
        onClick={() => track("telegram_button_click")}
      >
        <FaTelegram className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Telegram chat</span>
      </ButtonLink>
      <ButtonLink
        href="https://tally.so/r/mBrVg7"
        onClick={() => track("signup_button_click")}
      >
        <FaUserPlus className="w-4 h-4 -mb-0.5" />
        <span className="font-mono">Show interest</span>
      </ButtonLink>
    </div>
  );
}
