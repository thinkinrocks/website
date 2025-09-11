import { FaCalendarAlt, FaDiscord, FaUserPlus } from "react-icons/fa";
import { ButtonLink, EventButton } from "./buttons.tsx";
import { track } from "@vercel/analytics";

export default function WelcomeButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <EventButton
        href="https://luma.com/sf4dp6u2"
        onClick={() => track("meetup_button_click")}
      >
        <FaCalendarAlt className="w-4 h-4 -mb-0.5" />
        Join meetup 16.09
      </EventButton>
      <ButtonLink
        href="https://discord.gg/gtncJfm85n"
        onClick={() => track("discord_button_click")}
      >
        <FaDiscord className="w-4 h-4 -mb-0.5" />
        Discord
      </ButtonLink>
      <ButtonLink
        href="https://tally.so/r/mBrVg7"
        onClick={() => track("signup_button_click")}
      >
        <FaUserPlus className="w-4 h-4 -mb-0.5" />
        Get Involved
      </ButtonLink>
    </div>
  );
}
