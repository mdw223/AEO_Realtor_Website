"use client";

import type { Dispatch, SetStateAction } from "react";

type VideoModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  youtubeId: string;
  title: string;
};

export function VideoModal({
  open,
  onOpenChange,
  youtubeId,
  title,
}: VideoModalProps) {
  if (!open) return null;

  const handleBackdropClick = () => onOpenChange(false);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>
        <div className="modal__body modal__body--video">
          <div className="modal__video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

