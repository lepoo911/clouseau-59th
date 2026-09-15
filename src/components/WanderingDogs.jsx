import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';

const DOG_SPECIES = [
  {
    id: 'doodle',
    name: 'Doodle',
    breed: 'Golden Retriever',
    image: 'assets/dog_doodle_art.png',
    width: 108,
    height: 108,
    speed: 2.2,
    barkPitch: 1.0,
  },
  {
    id: 'enzo',
    name: 'Enzo',
    breed: 'Hound Mix',
    image: 'assets/dog_enzo_art.png',
    width: 96,
    height: 96,
    speed: 2.7,
    barkPitch: 1.2,
  },
  {
    id: 'mariah',
    name: 'Mariah',
    breed: 'Beagle',
    image: 'assets/dog_mariah_art.png',
    width: 92,
    height: 92,
    speed: 1.9,
    barkPitch: 0.9,
  },
];

// Nasty, sarcastic, hilarious dog quotes specifically roasting golfers
const NASTY_GOLFER_ROASTS = {
  en: [
    "WOOF! Chasing a tiny white ball because you have no real hobbies! ⛳🤡",
    "RUFF! I bury bones with more dignity than your terrible slice! 🦴🏌️",
    "A 4-hour walk completely ruined by ugly plaid pants! 👖🫣",
    "You yell FORE because your aim is an international disaster! 💥",
    "Stop swinging metal sticks and throw me the damn ball! 🎾😡",
    "Lost another ball in the pond? Even the ducks are laughing! 🦆😂",
    "A 12-handicap? More like a total handicap of dignity! 🤡",
    "I've seen three-legged squirrels drive straighter than that! 🐿️💨",
    "Mulligan again?! Even Inspector Clouseau doesn't cheat this bad! 🔎",
    "Nice sand trap vacation! Want me to dig you out, duffer?! 🏖️🐾",
    "Golf carts: invented for humans too lazy to walk their dogs! 🛺🐕",
    "Hit the green? You couldn't hit the planet Earth! 🌍⛳",
    "Your backswing looks like a cat having an electric shock! ⚡🐱",
    "Who spends $800 on a driver to assault a pine tree?! 🌲💸",
    "The 19th hole is the ONLY hole you're qualified to visit! 🍻⛳",
    "Call that a putt?! A turtle crawls faster than that ball! 🐢🐾",
    "Does your dog bite? No, but my golf reviews are LETHAL! 🦷🏌️",
    "AROOOO! Another ball in the woods! Free chew toy for me! 🌲🦴",
    "A birdie? You couldn't catch a cooked chicken! 🍗🤡",
    "Nice swing, twinkletoes! Did you learn that at ballet class?! 🩰🏌️",
  ],
  fr: [
    "OUAF ! 4 heures à courir après une baballe... Trouvez-vous une vie ! ⛳🤡",
    "Encore dans le bunker de sable ?! Veux-tu que je t'aide à creuser, duffer ?! 🏖️🐾",
    "Un pantalon à carreaux pareil, c'est un crime contre l'humanité ! 👖🫣",
    "Crier BALLE ! pour masquer un coup complètement pourri ! 💥🏌️",
    "La balle est dans le lac ! Même les carpes se marrent ! 🐟😂",
    "Encore un mulligan ?! Même Clouseau ne triche pas autant ! 🔎👀",
    "Lâche ton fer 9 et lance-moi la baballe, deux de pique ! 🎾😡",
    "Un handicap de 12 ? Plutôt un handicap de talent ! 🤡⛳",
    "Tu vises le vert et tu décapites un pissenlit ! Bravo champion ! 🌼💥",
    "Le 19e trou est la seule chose que tu réussis de la journée ! 🍻🏌️‍♂️",
    "Ton swing ressemble à un chat qui s'électrocute ! AROUUU ! ⚡🐱",
    "Dépenser 500$ pour un bâton qui finit dans les buissons... ridicule ! 🌲💸",
    "Est-ce que ton chien mord ? Non, mais mes critiques de golf sont MORTELLES ! 🦷🏌️",
  ],
  de: [
    "WUFF! Vier Stunden einem winzigen Ball nachlaufen... Such dir ein Hobby! ⛳🤡",
    "Schon wieder im Sandbunker?! Soll ich dir beim Graben helfen, du Pflaume?! 🏖️🐾",
    "Karohosen?! Hast du dich im finsteren Kleiderschrank angezogen?! 👖🫣",
    "FORE schreien, bloß weil der Abschlag im Wald gelandet ist! 🌲💥",
    "Der Ball liegt im See! Sogar die Frösche lachen dich aus! 🐸😂",
    "Noch ein Mulligan?! Sogar Inspektor Clouseau schummelt weniger! 🔎👀",
    "Wirf den Schläger weg und wirf mir den Ball, Mensch! 🎾😡",
    "Handicap 12? Eher ein totaler Mangel an Talent! 🤡⛳",
    "Dein Schwung sieht aus wie ein epileptischer Igel! AROOO! 🦔💨",
    "Das 19. Loch ist das Einzige, das du heute triffst! 🍻🏌️",
    "Beißt Ihr Hund? Nein, aber meine Golf-Kritik ist TÖDLICH! 🦷🏌️",
  ],
};

function getRandomRoast(lang) {
  const list = NASTY_GOLFER_ROASTS[lang] || NASTY_GOLFER_ROASTS.en;
  return list[Math.floor(Math.random() * list.length)];
}

export default function WanderingDogs({ lang = 'en' }) {
  const [dogs, setDogs] = useState([]);
  const dogsRef = useRef([]);
  dogsRef.current = dogs;

  const nextSpawnTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastCollisionTimeRef = useRef({});

  // Helper to spawn a new dog
  const spawnDog = (preferredType = null) => {
    if (typeof window === 'undefined') return;

    // Don't spawn if already a dog on screen
    if (dogsRef.current.length >= 1) return;

    const available = DOG_SPECIES;
    const species = preferredType
      ? available.find((d) => d.id === preferredType) || available[0]
      : available[Math.floor(Math.random() * available.length)];

    // 50/50 enter from Left or Right
    const enterFromLeft = Math.random() > 0.5;
    const dir = enterFromLeft ? 1 : -1;
    const startX = enterFromLeft ? -130 : window.innerWidth + 30;

    // Pick a natural vertical walking band in the viewport (between 38% and 80% of window height)
    const minY = Math.max(140, window.innerHeight * 0.38);
    const maxY = Math.max(minY + 60, window.innerHeight * 0.80);
    const startY = minY + Math.random() * (maxY - minY);

    const newDog = {
      instanceId: `dog-${Date.now()}-${Math.random()}`,
      species,
      x: startX,
      y: startY,
      dir,
      speed: species.speed * (0.85 + Math.random() * 0.3),
      state: 'walking', // 'walking' | 'roasting' | 'bumping'
      stateTimer: 0,
      bumpText: '',
      showBubble: false,
      bouncesLeft: Math.random() > 0.65 ? 1 : 0, // mostly 0 (trot straight across and exit), occasionally 1 bump
      spontaneousTimer: 4500 + Math.random() * 5000, // relaxed time before possible spontaneous roast
    };

    setDogs((prev) => [...prev, newDog]);
  };

  // Schedule random dog walks automatically
  const scheduleNextSpawn = (delayMs) => {
    if (nextSpawnTimeoutRef.current) clearTimeout(nextSpawnTimeoutRef.current);
    nextSpawnTimeoutRef.current = setTimeout(() => {
      spawnDog();
      // Schedule next walk in 28 to 50 seconds (relaxed, non-intrusive appearance)
      const nextDelay = 28000 + Math.random() * 22000;
      scheduleNextSpawn(nextDelay);
    }, delayMs);
  };

  // Listen for manual summon events
  useEffect(() => {
    const handleSummon = (e) => {
      spawnDog(e?.detail?.dogType);
    };
    window.addEventListener('summon-dog', handleSummon);
    return () => window.removeEventListener('summon-dog', handleSummon);
  }, []);

  // Initial spawn shortly after mounting
  useEffect(() => {
    // First dog trots in 12-16 seconds after page load
    scheduleNextSpawn(12000 + Math.random() * 4000);

    return () => {
      if (nextSpawnTimeoutRef.current) clearTimeout(nextSpawnTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Main animation, collision, and spontaneous bark loop
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 60);
      lastTime = now;

      if (dogsRef.current.length > 0) {
        // Query obstacle bounding boxes in the DOM
        const obstacleElements = document.querySelectorAll(
          '[data-dog-obstacle="true"], .location-card, .time-selector-card, .decision-card'
        );
        const obstacles = [];
        obstacleElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 30 && rect.height > 30) {
            obstacles.push({ el, rect });
          }
        });

        setDogs((currentDogs) => {
          const updated = [];

          for (let dog of currentDogs) {
            let {
              x,
              y,
              dir,
              speed,
              state,
              stateTimer,
              bumpText,
              showBubble,
              bouncesLeft,
              spontaneousTimer,
            } = dog;

            // 1. If currently barking / roasting or recovering from a bump
            if (state === 'bumping' || state === 'roasting') {
              stateTimer -= dt;
              if (stateTimer <= 0) {
                // Done barking -> resume walking
                const wasBumping = state === 'bumping';
                state = 'walking';
                showBubble = false;
                if (wasBumping && bouncesLeft > 0) {
                  dir = -dir;
                  bouncesLeft -= 1;
                }
                spontaneousTimer = 999999; // At most one spontaneous roast per crossing so dog trots off smoothly
              }
              updated.push({
                ...dog,
                state,
                stateTimer,
                showBubble,
                dir,
                bouncesLeft,
                spontaneousTimer,
              });
              continue;
            }

            // 2. Normal walking movement
            x += dir * speed;
            // Gentle natural wave in vertical trajectory
            y += Math.sin(x * 0.018) * 0.45;

            // Keep within sensible vertical viewport bounds (below header)
            const minY = 120;
            const maxY = window.innerHeight - 90;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            // 3. Spontaneous random barking & roasting while trotting across screen
            spontaneousTimer -= dt;
            const isWellOnScreen = x > 140 && x < window.innerWidth - 170;
            if (spontaneousTimer <= 0 && isWellOnScreen && state === 'walking') {
              state = 'roasting';
              stateTimer = 5600; // pause 5.6s (was 2.6s + 3s) to bark and show roast
              showBubble = true;
              bumpText = getRandomRoast(lang);
              sound.playRandomDogBark(dog.species.id);
            }

            // 4. Check collision with obstacles
            const dogBox = {
              left: x + 15,
              right: x + dog.species.width - 15,
              top: y + 20,
              bottom: y + dog.species.height - 10,
            };

            let collidedObstacle = null;
            for (let obs of obstacles) {
              const r = obs.rect;
              const isOverlap =
                dogBox.right > r.left + 5 &&
                dogBox.left < r.right - 5 &&
                dogBox.bottom > r.top + 10 &&
                dogBox.top < r.bottom - 10;

              if (isOverlap) {
                const nowMs = Date.now();
                const lastColl = lastCollisionTimeRef.current[dog.instanceId] || 0;
                if (nowMs - lastColl > 1400) {
                  collidedObstacle = obs;
                  lastCollisionTimeRef.current[dog.instanceId] = nowMs;
                  break;
                }
              }
            }

            if (collidedObstacle) {
              // BUMP OCCURRED!
              state = 'bumping';
              stateTimer = 5400; // pause 5.4s (was 2.4s + 3s)
              showBubble = true;
              bumpText = getRandomRoast(lang);

              // Comic bump sound & species bark
              sound.playBoop();
              setTimeout(() => sound.playRandomDogBark(dog.species.id), 120);

              // Visual recoil: push dog backwards
              x -= dir * 18;

              // Wobble animation on the bumped UI element!
              const el = collidedObstacle.el;
              if (el) {
                el.classList.remove('dog-bumped');
                void el.offsetWidth;
                el.classList.add('dog-bumped');
                setTimeout(() => el.classList.remove('dog-bumped'), 500);
              }
            }

            // Check if dog has walked completely off screen
            const isOffScreen =
              (dir > 0 && x > window.innerWidth + 150) ||
              (dir < 0 && x < -170);

            if (!isOffScreen) {
              updated.push({
                ...dog,
                x,
                y,
                dir,
                state,
                stateTimer,
                bumpText,
                showBubble,
                bouncesLeft,
                spontaneousTimer,
              });
            }
          }

          return updated;
        });
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [lang]);

  // Click dog to poke it: barks angrily at golfers!
  const handleDogClick = (instanceId, speciesId) => {
    sound.playRandomDogBark(speciesId);
    setDogs((prev) =>
      prev.map((d) => {
        if (d.instanceId === instanceId) {
          return {
            ...d,
            state: 'roasting',
            stateTimer: 5800, // pause 5.8s (was 2.8s + 3s)
            bumpText: getRandomRoast(lang),
            showBubble: true,
          };
        }
        return d;
      })
    );
  };

  if (dogs.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {dogs.map((dog) => {
        const isFacingLeft = dog.dir < 0;
        const isBumping = dog.state === 'bumping';
        const isRoasting = dog.state === 'roasting';

        return (
          <div
            key={dog.instanceId}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate3d(${dog.x}px, ${dog.y}px, 0)`,
              width: dog.species.width,
              height: dog.species.height,
              transition: isBumping ? 'transform 0.15s ease-out' : 'none',
            }}
            className="pointer-events-auto cursor-pointer group"
            onClick={() => handleDogClick(dog.instanceId, dog.species.id)}
            title={`${dog.species.name} (${lang === 'fr' ? 'Cliquez pour le faire aboyer !' : lang === 'de' ? 'Klicken zum Bellen!' : 'Click to hear roast!'})`}
          >
            {/* Comic Speech Bubble when barking or roasting */}
            {dog.showBubble && (() => {
              const isNearTop = dog.y < 130;
              const isNearLeft = dog.x < 110;
              const isNearRight = typeof window !== 'undefined' && dog.x > window.innerWidth - 220;

              const positionClasses = isNearTop
                ? 'top-full mt-3'
                : '-top-16 sm:-top-20';

              const horizontalClasses = isNearLeft
                ? 'left-0 translate-x-0'
                : isNearRight
                ? 'right-0 translate-x-0 left-auto'
                : 'left-1/2 -translate-x-1/2';

              const tailTailClasses = isNearTop
                ? '-top-2 border-b-8 border-b-stone-950'
                : '-bottom-2 border-t-8 border-t-stone-950';

              const tailHorizontalClasses = isNearLeft
                ? 'left-6 translate-x-0'
                : isNearRight
                ? 'right-6 translate-x-0 left-auto'
                : 'left-1/2 -translate-x-1/2';

              return (
                <div
                  className={`absolute ${positionClasses} ${horizontalClasses} bg-amber-50 text-stone-950 border-2 border-stone-950 rounded-2xl px-3 py-1.5 text-xs sm:text-sm font-black shadow-2xl whitespace-normal w-56 sm:w-64 md:w-72 text-center animate-bounce z-50 font-typewriter leading-snug`}
                  style={{
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.85)',
                  }}
                >
                  <span>{dog.bumpText}</span>
                  {/* Speech bubble tail */}
                  <div
                    className={`absolute w-0 h-0 border-x-6 border-x-transparent ${tailTailClasses} ${tailHorizontalClasses}`}
                  />
                </div>
              );
            })()}

            {/* Dog Sprite Image with Trot, Bump, or Roasting animation */}
            <div
              className={`w-full h-full relative transition-transform ${
                isBumping ? 'animate-dog-bump' : isRoasting ? 'scale-110' : 'animate-dog-trot'
              }`}
              style={{
                transform: `scaleX(${isFacingLeft ? -1 : 1})`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${dog.species.image}`}
                alt={dog.species.name}
                className="w-full h-full object-contain filter drop-shadow-[0_6px_8px_rgba(0,0,0,0.25)]"
                draggable={false}
              />

              {/* Tiny Name Tag below dog */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-900/80 text-amber-300 text-[9px] font-typewriter font-bold px-1.5 py-0.2 rounded-full border border-amber-400/60 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{
                  transform: `scaleX(${isFacingLeft ? -1 : 1})`,
                }}
              >
                {dog.species.name} 🐾
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
