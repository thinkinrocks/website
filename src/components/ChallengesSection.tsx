import React, { useState, useEffect } from "react";
import challenges from "../content/hackathon-challenges.json";

export const ChallengesSection = () => {
  // April 1, 2026 18:00 EEST (UTC+3) -> 15:00 UTC
  const target = Date.UTC(2026, 3, 1, 15, 0, 0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isRevealed, setIsRevealed] = useState(() => Date.now() >= target);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!Number.isFinite(target)) {
      setIsRevealed(true);
      return;
    }

    const updateTimer = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setIsRevealed(true);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div id="challenges" className="pt-8 md:pt-12">
      <h2 className="font-display text-2xl tracking-tight md:text-3xl">Challenges</h2>
      {!isRevealed ? (
        <>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Challenge tracks will be revealed at the <a href="https://luma.com/snql39fy" className="text-fuchsia-600 hover:underline">soft start</a> on April 1, with themes spanning AR, biosignals, and new interaction design.
          </p>
          {isMounted && (
            <div className="mt-8 mb-8 flex justify-center gap-3 md:gap-4">
              <div className="flex min-w-[6rem] flex-col items-center justify-center  p-4 md:min-w-[7rem]">
                <span className="font-display text-4xl font-semibold text-foreground md:text-5xl">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Days</span>
              </div>
              <div className="flex min-w-[6rem] flex-col items-center justify-center p-4 md:min-w-[7rem]">
                <span className="font-display text-4xl font-semibold text-foreground md:text-5xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Hours</span>
              </div>
              <div className="flex min-w-[6rem] flex-col items-center justify-center p-4 md:min-w-[7rem]">
                <span className="font-display text-4xl font-semibold text-foreground md:text-5xl">{String(timeLeft.mins).padStart(2, '0')}</span>
                <span className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Mins</span>
              </div>
              <div className="flex min-w-[6rem] flex-col items-center justify-center  p-4 md:min-w-[7rem]">
                <span className="font-display text-4xl font-semibold text-foreground md:text-5xl">{String(timeLeft.secs).padStart(2, '0')}</span>
                <span className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Secs</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {challenges.map((challenge, i) => (
            <div key={i} className="rounded-xl  p-4">
              <div className="flex items-center gap-2">
                <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground text-d">{challenge.track}</p>
                {Array.isArray(challenge.devices) && challenge.devices.map((device, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-fuchsia-100 text-fuchsia-700 text-[10px] font-mono px-2 py-0.5 "
                  >
                    {device}
                  </span>
                ))}
              </div>
              <p className="mt-2 font-display text-2xl">{challenge.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
