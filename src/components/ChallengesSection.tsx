import React, { useState, useEffect } from "react";
import challenges from "../content/hackathon-challenges.json";

export const ChallengesSection = () => {
  const target = new Date("2026-04-01T17:00:00+03:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const section = document.getElementById('challenges');
    let interval: ReturnType<typeof setInterval> | null = null;

    const updateTimer = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setIsRevealed(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimerActive(true);
          updateTimer();
          if (!interval) {
            interval = setInterval(updateTimer, 1000);
          }
        } else {
          setTimerActive(false);
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      },
      { threshold: 0.1 }
    );
    if (section) observer.observe(section);

    return () => {
      if (interval) clearInterval(interval);
      if (section) observer.unobserve(section);
    };
  }, [target]);

  return (
    <div id="challenges" className="pt-8 md:pt-12">
      <h2 className="font-display text-2xl tracking-tight md:text-3xl">Challenges</h2>
      
      {!isRevealed ? (
        <>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Challenge tracks will be revealed at the <a href="https://luma.com/snql39fy" className="text-fuchsia-600 hover:underline">soft start</a> on April 1, with themes spanning AR, biosignals, and new interaction design.
          </p>
          {isMounted && timerActive && (
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
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {challenges.map((challenge, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">{challenge.track}</p>
              <p className="mt-2 font-semibold">{challenge.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{challenge.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
