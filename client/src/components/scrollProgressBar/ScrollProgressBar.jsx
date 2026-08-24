import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const totalHeight = scrollHeight - clientHeight;

      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / totalHeight) * 100),
      );

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      {/* Percentage */}
      <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-md">
        {Math.round(scrollProgress)}%
      </div>

      {/* Progress */}
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 shadow-sm">
        <div
          className="h-full rounded-full bg-indigo-500 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollProgressBar;
