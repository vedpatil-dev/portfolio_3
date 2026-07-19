import { gsap } from "gsap";

/**
 * Riddle's Diary Cinematic Animations
 */

export const animateBookEntrance = (
  book: HTMLElement,
  onComplete?: () => void
) => {
  const tl = gsap.timeline({ onComplete });
  
  // Set initial states
  gsap.set(book, {
    y: 400,
    z: -600,
    rotationX: 45,
    rotationY: -15,
    rotationZ: -8,
    opacity: 0,
  });

  tl.to(book, {
    y: 0,
    z: 0,
    rotationX: 12, // Landed tilt
    rotationY: -5,
    rotationZ: 0,
    opacity: 1,
    duration: 0.75, // Snappy entry
    ease: "power3.out",
  });

  return tl;
};

export const animateBookOpening = (
  coverLeft: HTMLElement,
  lock: HTMLElement | null,
  pages: HTMLElement[],
  onComplete?: () => void
) => {
  const tl = gsap.timeline({ onComplete });

  // Initial closed state z-indexes to ensure front cover covers the pages!
  gsap.set(coverLeft, { zIndex: 40, rotateY: 180 });
  if (pages[0]) gsap.set(pages[0], { zIndex: 30, rotateY: 180 });
  if (pages[1]) gsap.set(pages[1], { zIndex: 20, rotateY: 0 });

  // 1. Clasp unlocks and rotates out of the way
  if (lock) {
    tl.to(lock, {
      rotateY: 90,
      duration: 0.25,
      ease: "power2.inOut",
    });
  }

  // 2. Cover turns open (flips from right/closed 180 to left/open -10)
  tl.to(
    coverLeft,
    {
      rotateY: -10, // open on the left
      duration: 1.1,
      ease: "power3.out",
      onUpdate: function() {
        // At the midpoint of cover rotation (when cover passes 90deg, i.e., progress > 0.5)
        // change zIndex so the left page sheet is rendered above the left cover!
        const progress = this.progress();
        if (progress > 0.5) {
          coverLeft.style.zIndex = "5"; // Move cover behind pages on the left
          if (pages[0]) pages[0].style.zIndex = "15";
        } else {
          coverLeft.style.zIndex = "40"; // Cover stays on top when on the right
          if (pages[0]) pages[0].style.zIndex = "30";
        }
      }
    },
    lock ? "-=0.2" : "0"
  );

  // 3. Pages flip open and settle
  if (pages.length > 0) {
    // pages[0] is Left page: animate from 180 to -5 in perfect sync with the cover!
    tl.to(
      pages[0],
      {
        rotateY: -5,
        duration: 1.1, // Match cover duration
        ease: "power3.out", // Match cover ease
        onUpdate: function() {
          const progress = this.progress();
          if (progress > 0.5) {
            pages[0].style.zIndex = "15"; // Lies on the left
          } else {
            pages[0].style.zIndex = "30"; // Still on the right, above right page
          }
        }
      },
      "<" // Start at the exact same time as the cover
    );
    // pages[1] is Right page: animate from 0 to 5
    if (pages[1]) {
      tl.fromTo(
        pages[1],
        { rotateY: 0 },
        {
          rotateY: 5,
          duration: 0.95,
          ease: "power2.out",
        },
        "-=1.1"
      );
    }
  }

  return tl;
};

export const animatePageFlip = (
  pageSheet: HTMLElement,
  isForward: boolean,
  onMidpoint?: () => void,
  onComplete?: () => void
) => {
  const tl = gsap.timeline({ onComplete });

  const targetAngle = isForward ? -180 : 0;
  
  tl.to(pageSheet, {
    rotateY: targetAngle,
    duration: 0.85, // Snappier page turn
    ease: "power2.inOut",
    onUpdate: function () {
      // Manage z-index dynamically at the midpoint of page flip
      const progress = this.progress();
      if (progress > 0.5) {
        pageSheet.style.zIndex = isForward ? "10" : "20";
      } else {
        pageSheet.style.zIndex = isForward ? "20" : "10";
      }
    }
  });

  if (onMidpoint) {
    tl.call(onMidpoint, [], 0.425);
  }

  return tl;
};

export const animateBookClosing = (
  book: HTMLElement,
  coverLeft: HTMLElement,
  lock: HTMLElement | null,
  pages: HTMLElement[],
  overlay: HTMLElement | null,
  onComplete?: () => void
) => {
  const tl = gsap.timeline({ onComplete });

  // 1. Close all pages back to closed state
  if (pages.length > 0) {
    tl.to(pages[0], {
      rotateY: 180,
      duration: 0.65,
      ease: "power2.in",
      onUpdate: function() {
        const progress = this.progress();
        if (progress > 0.5) {
          pages[0].style.zIndex = "30"; // moves back to top on the right
        } else {
          pages[0].style.zIndex = "15"; // stays on the left
        }
      }
    });
    if (pages[1]) {
      tl.to(pages[1], {
        rotateY: 0,
        duration: 0.55,
        ease: "power2.in",
      }, "-=0.55");
    }
  }

  // 2. Cover closes shut (left cover folds back to 180)
  tl.to(
    coverLeft,
    {
      rotateY: 180,
      duration: 0.75,
      ease: "power3.inOut",
      onUpdate: function() {
        const progress = this.progress();
        if (progress > 0.5) {
          coverLeft.style.zIndex = "40"; // stays on top on the right
        } else {
          coverLeft.style.zIndex = "5"; // stays on the left
        }
      }
    },
    "-=0.4"
  );

  // 3. Clasp locks back
  if (lock) {
    tl.to(lock, {
      rotateY: 0,
      duration: 0.35,
      ease: "power2.in",
    });
  }

  // 4. Book flies back into darkness
  tl.to(book, {
    y: 350,
    z: -500,
    rotationX: 35,
    rotationY: 10,
    opacity: 0,
    duration: 0.9,
    ease: "power3.in",
  }, "-=0.2");

  if (overlay) {
    tl.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.6");
  }

  return tl;
};
