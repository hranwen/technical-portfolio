import { useEffect, useState } from "react";
import type { RefObject } from "react";

type Options = {
  /** Top offset in % of viewport. Section becomes "active" when its top crosses this line. */
  topOffsetPct?: number;
};

/**
 * Tracks which of the given element IDs is currently "active" based on
 * scroll position inside an optional scroll root.
 *
 * Sections whose natural trigger point lies beyond the scrollable range
 * (i.e. cannot be scrolled into the threshold zone) get their trigger
 * points redistributed evenly across the remaining scroll range, so each
 * section still becomes active as the user approaches the bottom.
 */
export function useScrollSpy(
  ids: readonly string[],
  rootRef?: RefObject<Element | null>,
  { topOffsetPct = 30 }: Options = {},
): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const root = (rootRef?.current ?? null) as HTMLElement | null;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const scroller: HTMLElement | Window = root ?? window;

    const compute = () => {
      const rootTop = root ? root.getBoundingClientRect().top : 0;
      const rootHeight = root ? root.clientHeight : window.innerHeight;
      const scrollTop = root ? root.scrollTop : window.scrollY;
      const scrollHeight = root
        ? root.scrollHeight
        : document.documentElement.scrollHeight;
      const thresholdPx = rootHeight * (topOffsetPct / 100);
      const maxScroll = Math.max(0, scrollHeight - rootHeight);

      const triggers = elements.map(
        (el) =>
          el.getBoundingClientRect().top - rootTop + scrollTop - thresholdPx,
      );

      const firstUnreachable = triggers.findIndex((t) => t > maxScroll);
      if (firstUnreachable !== -1) {
        const start =
          firstUnreachable > 0 ? triggers[firstUnreachable - 1] : 0;
        const remaining = elements.length - firstUnreachable;
        const step = (maxScroll - start) / remaining;
        for (let i = firstUnreachable; i < elements.length; i++) {
          triggers[i] = start + step * (i - firstUnreachable + 1);
        }
      }

      let activeId = elements[0].id;
      for (let i = 0; i < elements.length; i++) {
        if (scrollTop + 1 >= triggers[i]) activeId = elements[i].id;
      }
      setActive(activeId);
    };

    compute();
    scroller.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      scroller.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids, rootRef, topOffsetPct]);

  return active;
}
