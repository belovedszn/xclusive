// src/components/slider/useCountdown.js
import { useEffect, useState } from "react";

export const useCountdown = (startDate = "April 7, 2025 12:00:00") => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const baseStart = new Date(startDate).getTime();
    const cycleLength = 14 * 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const now = Date.now();
      const cyclesPassed = Math.floor((now - baseStart) / cycleLength);
      const nextTarget = baseStart + (cyclesPassed + 1) * cycleLength;
      const distance = nextTarget - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [startDate]);

  return timeLeft;
};

// for Display Box component

// src/components/slider/useCountdown.js

export const useDisplayTimer = (startDate = "May 2, 2025 09:00:00") => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const baseStart = new Date(startDate).getTime();
    const cycleLength = 7 * 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const now = Date.now();
      const cyclesPassed = Math.floor((now - baseStart) / cycleLength);
      const nextTarget = baseStart + (cyclesPassed + 1) * cycleLength;
      const distance = nextTarget - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [startDate]);

  return timeLeft;
};
