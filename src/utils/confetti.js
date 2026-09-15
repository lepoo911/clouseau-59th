import confetti from 'canvas-confetti';

let customConfetti = null;

/**
 * Lazily creates and returns a safe, transparent confetti instance that runs
 * on the main thread (useWorker: false).
 * 
 * This prevents the notorious Chromium / Windows bug where OffscreenCanvas
 * worker initialization creates an opaque white/black compositing layer that
 * blanks out the screen while confetti flies.
 */
function getConfetti() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  if (!customConfetti) {
    let canvas = document.getElementById('safe-confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'safe-confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      canvas.style.backgroundColor = 'transparent';
      document.body.appendChild(canvas);
    }

    try {
      // useWorker: false is crucial: it disables transferControlToOffscreen()
      // so the canvas remains a normal transparent 2D canvas that never obscures the UI.
      customConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: false,
        disableForReducedMotion: true
      });
    } catch (e) {
      console.warn('Falling back to default confetti:', e);
      customConfetti = confetti;
    }
  }

  return customConfetti;
}

/**
 * Safely fires confetti without risking blanking out the screen or throwing unhandled errors.
 */
export function fireConfetti(options = {}) {
  try {
    const fire = getConfetti();
    if (typeof fire === 'function') {
      fire({
        ...options,
        // Ensure transparent blending
        disableForReducedMotion: true
      });
    }
  } catch (err) {
    console.warn('Confetti execution safely caught:', err);
  }
}

export default fireConfetti;
