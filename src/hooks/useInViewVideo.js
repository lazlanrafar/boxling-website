import { useEffect } from "react";

export function useInViewVideo(ref, threshold = 0.35) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const play = () => video.play()?.catch?.(() => {});
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? play() : video.pause();
    }, { threshold });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [ref, threshold]);
}
