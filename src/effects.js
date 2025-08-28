// Effects for GreenMind site
// 1. Fade-in on scroll
// 2. Parallax hero
// 3. Floating particles

export function fadeInOnScroll() {
  const els = document.querySelectorAll('.fade-in-on-scroll');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(el);
  });
}

export function parallaxHero() {
  const hero = document.querySelector('.parallax-hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.backgroundPosition = `center ${y * 0.3}px`;
  });
}

export function floatingParticles() {
  const canvas = document.createElement('canvas');
// function floatingParticles() {
//   const canvas = document.createElement('canvas');
//   canvas.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-0';
//   canvas.style.position = 'fixed';
//   canvas.style.top = 0;
//   canvas.style.left = 0;
//   canvas.style.width = '100vw';
//   canvas.style.height = '100vh';
//   canvas.style.pointerEvents = 'none';
//   canvas.style.zIndex = 0;
//   document.body.appendChild(canvas);
//   const ctx = canvas.getContext('2d');
//   let particles = Array.from({length: 24}, () => ({
//     x: Math.random() * window.innerWidth,
//     y: Math.random() * window.innerHeight,
//     r: 8 + Math.random() * 8,
//     dx: -0.2 + Math.random() * 0.4,
//     dy: 0.1 + Math.random() * 0.3,
//     color: `rgba(163,230,53,${0.15 + Math.random() * 0.2})`
//   }));
//   function draw() {
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     for (const p of particles) {
//       ctx.beginPath();
//       ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
//       ctx.fillStyle = p.color;
//       ctx.fill();
//       p.x += p.dx;
//       p.y += p.dy;
//       if (p.y > window.innerHeight) p.y = -p.r;
//       if (p.x < -p.r) p.x = window.innerWidth + p.r;
//       if (p.x > window.innerWidth + p.r) p.x = -p.r;
//     }
//     requestAnimationFrame(draw);
//   }
//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   window.addEventListener('resize', resize);
//   resize();
//   draw();
// }
}
