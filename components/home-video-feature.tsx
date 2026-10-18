"use client";

import { useState } from "react";
import { VideoModal } from "@/components/modals/video-modal";

export function HomeVideoFeature() {
  const [open, setOpen] = useState(false);

  return (
    <section className="video-feature">
      <div className="video-feature__inner">
        <div className="video-feature__copy">
          <p className="eyebrow">Watch</p>
          <h2 className="section-title">How to Buy a Home as a First-Time Buyer</h2>
          <p className="section-subtitle">
            Fatima walks through the steps, timelines, and programs available
            to first-time buyers in North Carolina, including down payment and
            closing cost assistance.
          </p>
          <button
            type="button"
            className="btn btn--navy"
            onClick={() => setOpen(true)}
          >
            Watch the Video
          </button>
        </div>
        <button
          type="button"
          className="video-feature__thumb"
          onClick={() => setOpen(true)}
          aria-label="Play Fatima's first-time buyer video"
        >
          <img
            src="/images/video.jpg"
            alt=""
            width={1400}
            height={933}
          />
          <span className="video-feature__play" aria-hidden="true">
            ▶
          </span>
        </button>
      </div>
      <VideoModal
        open={open}
        onOpenChange={setOpen}
        youtubeId="dQw4w9WgXcQ"
        title="How to Buy a Home as a First-Time Buyer in North Carolina"
      />
    </section>
  );
}
