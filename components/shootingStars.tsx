'use client'
import { useState, useEffect } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  width: string;
}

const ShootingStars = ({ count }: { count: number }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: count }, (_, i) => ({
      id: i,
      top:      `${Math.random() * 50}%`,
      left:     `${Math.random() * 120}%`,
      delay:    `${Math.random() * 15}s`,
      duration: `${2 + Math.random() * 4}s`,
      width:    `${80 + Math.random() * 150}px`,
    })));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden nonsel pointer-events-none blur-[1px]">
      {stars.map(star => (
        <div
          key={star.id}
          className="shooting-star absolute"
          style={{
            top:               star.top,
            left:              star.left,
            width:             star.width,
            animationDelay:    star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars