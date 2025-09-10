/* Mobile nav (optional example) */
const trigger = document.querySelector('.mobile-nav-trigger');
const nav = document.querySelector('.main-nav');
if (trigger && nav){
  trigger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? '' : 'block';
  });
}

/* Animated Orbs Canvas — soft floating bokeh */
(function(){
  const c = document.getElementById('orbs');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, orbs;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    W = c.clientWidth = window.innerWidth;
    H = c.clientHeight = window.innerHeight;
    c.width = W * DPR; c.height = H * DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    make();
  }
  function rand(a,b){ return Math.random()*(b-a)+a }
  function make(){
    orbs = Array.from({length: prefersReduce ? 8 : 20}, ()=>({
      x: rand(0,W), y: rand(0,H),
      r: rand(40,120),
      a: rand(0, Math.PI*2),
      s: rand(.1,.35),
      hue: rand(155,175), // teal-ish
      alpha: rand(.08,.18)
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    orbs.forEach(o=>{
      o.a += 0.002 * o.s;
      o.x += Math.cos(o.a)*0.3*o.s;
      o.y += Math.sin(o.a)*0.25*o.s;
      if(o.x<-200) o.x=W+200; if(o.x>W+200) o.x=-200;
      if(o.y<-200) o.y=H+200; if(o.y>H+200) o.y=-200;

      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      grad.addColorStop(0, `hsla(${o.hue}, 90%, 65%, ${o.alpha})`);
      grad.addColorStop(1, `hsla(${o.hue}, 90%, 65%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
      ctx.fill();
    });
    if(!prefersReduce) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
