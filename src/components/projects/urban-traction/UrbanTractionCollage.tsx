import React, { useEffect, useRef } from 'react';

interface UrbanTractionCollageProps {
  className?: string;
  title?: string;
  contentCss?: string;
  disableAutoHeight?: boolean;
  disableScroll?: boolean;
}

// React copy of public/urban-traction-standalone.html; the original HTML remains the fallback implementation.
const sourceDocument = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Urban Traction — Existing / Proposed</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;background:#FFFFFF;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}

/* ================= COLLAGE =================
   Fills the viewport with three aligned columns and two even rows.
   One single --gap value drives every gutter AND the outer frame,
   so the spacing is identical everywhere — between columns, between
   rows, and around the outside. */
:root{ --gap:10px; --ar:1.93; }   /* --ar = the sheets' aspect ratio */
@media (max-width:760px){ :root{ --gap:7px } }

.collage{
   /* Full bleed: the grid is the viewport. 3 across x 2 down. */
  position:fixed;inset:0;
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  grid-template-rows:minmax(0,1fr);
  gap:0;
  row-gap:0;
  align-items:stretch;
  align-content:start;
  padding:0;
  background:#FFFFFF;
}
/* Keep all remaining images in one row on phones as well. */
@media (max-width:820px){
  .collage{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:minmax(0,1fr);gap:0;padding:0}
  .cell:nth-child(n){grid-column:span 1}
}

/* Each cell: a blurred duplicate of its own image fills the cell edge to
   edge, the real image sits on top with object-fit:contain.
   Result — the cell is 100% full, and the image is never cropped,
   never trimmed and never stretched. */
.cell{
  position:relative;
  overflow:hidden;
  border:0;padding:0;
  background:#FFFFFF;
  cursor:pointer;
  display:block;
}
.cell .cbg{
  display:none;
  position:absolute;
  top:-80px;left:-80px;
  width:calc(100% + 160px);
  height:calc(100% + 160px);
  object-fit:cover;object-position:center;
  filter:blur(26px);
  z-index:0;
  transform:translateZ(0);
}
.cell .cfg{
  position:relative;z-index:1;
  display:block;
  width:100%;height:100%;
  max-width:none;max-height:none;
  object-fit:contain;object-position:center;
  border:0;outline:0;box-shadow:none;background:none;
  transition:transform .55s cubic-bezier(.22,1,.36,1);
}
.cell:hover .cfg{transform:scale(1.03)}
.cell:focus-visible{outline:2px solid #fff;outline-offset:-4px}
.cell .num{
  position:absolute;z-index:3;left:10px;top:8px;
  font-size:10px;letter-spacing:.18em;color:#fff;
  text-shadow:0 1px 6px rgba(0,0,0,.7);
  opacity:0;transition:opacity .3s;
}
.cell:hover .num,.cell:focus-visible .num{opacity:.9}

/* ================= VIEWER ================= */
.viewer{
  position:fixed;inset:0;z-index:9999;overflow:hidden;background:#FFFFFF;
  opacity:0;visibility:hidden;transition:opacity .34s ease,visibility .34s;
}
.viewer.open{opacity:1;visibility:visible}
.layer{position:absolute;inset:0;opacity:0;transition:opacity .42s ease}
.layer.on{opacity:1}

/* background: same image, cover, strong blur.
   Fixed-pixel overscan (not transform:scale) so the blur — which reaches
   about 3x its radius — never pulls an edge inward and leaves a line. */
.bg{
  position:absolute;top:-220px;left:-220px;
  width:calc(100% + 440px);height:calc(100% + 440px);
  object-fit:cover;object-position:center;
  filter:blur(clamp(30px,2.6vw,46px));
  z-index:0;border:0;outline:0;transform:translateZ(0);
}
/* foreground: same image, contain, untouched */
.fg{
  position:relative;z-index:2;display:block;
  width:100%;height:100%;max-width:none;max-height:none;
  object-fit:contain;object-position:center;
  border:0;outline:0;box-shadow:none;background:none;background-color:transparent;filter:none;
}
.layer.on .fg{animation:fgIn .5s cubic-bezier(.22,1,.36,1) both}
@keyframes fgIn{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:none}}

.ui{position:absolute;inset:0;z-index:5;pointer-events:none}
.ui button{pointer-events:auto}
.btn{
  position:absolute;border:0;background:rgba(0,0,0,.34);color:#fff;
  width:52px;height:52px;border-radius:50%;cursor:pointer;display:grid;place-items:center;
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  transition:background .2s,transform .2s;
}
.btn:hover{background:rgba(0,0,0,.6);transform:scale(1.06)}
.btn:focus-visible{outline:2px solid #fff;outline-offset:3px}
.btn svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.close{top:clamp(14px,2.2vw,26px);right:clamp(14px,2.2vw,26px)}
.prev{left:clamp(12px,2vw,26px);top:50%;transform:translateY(-50%)}
.next{right:clamp(12px,2vw,26px);top:50%;transform:translateY(-50%)}
.prev:hover,.next:hover{transform:translateY(-50%) scale(1.06)}
.counter{
  position:absolute;left:50%;bottom:clamp(14px,2.4vw,28px);transform:translateX(-50%);
  font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#fff;
  background:rgba(0,0,0,.34);padding:7px 14px;border-radius:999px;white-space:nowrap;
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
}
@media (max-width:640px){
  .btn{width:44px;height:44px}
  .prev,.next{top:auto;bottom:clamp(14px,2.4vw,28px);transform:none}
  .prev:hover,.next:hover{transform:scale(1.06)}
  .prev{left:14px}.next{right:14px}
  .counter{max-width:50vw;overflow:hidden;text-overflow:ellipsis}
  .counter .ttl{display:none}
}
@media (prefers-reduced-motion:reduce){
  .viewer,.layer,.btn,.cell .cbg{
  position:absolute;
  top:-80px;left:-80px;
  width:calc(100% + 160px);
  height:calc(100% + 160px);
  object-fit:cover;object-position:center;
  filter:blur(26px);
  z-index:0;
  transform:translateZ(0);
}
.cell .cfg{transition:none}
  .layer.on .fg{animation:none}
}
</style>
</head>
<body>

<div class="collage" id="collage"></div>

<div class="viewer" id="viewer" role="dialog" aria-modal="true" aria-label="Image viewer">
  <div class="layer"><img class="bg" alt="" aria-hidden="true"><img class="fg" alt=""></div>
  <div class="layer"><img class="bg" alt="" aria-hidden="true"><img class="fg" alt=""></div>
  <div class="ui">
    <button class="btn close" id="close" aria-label="Close (Esc)"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
    <button class="btn prev" id="prev" aria-label="Previous image"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
    <button class="btn next" id="next" aria-label="Next image"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
    <div class="counter" id="counter"></div>
  </div>
</div>

<script>
/* One list. The collage cell, the blurred backdrop and the fullscreen
   foreground all read the SAME src — there is no second copy of any file. */
const IMAGES = [
  { src:'/projects/urban-traction/Picture3.jpg', title:'Picture 3' },
  { src:'/projects/urban-traction/Picture7.jpg', title:'Picture 7' },
  { src:'/projects/urban-traction/Picture2.jpg', title:'Picture 2 (Massing)' }
];

const collage = document.getElementById('collage');
const viewer  = document.getElementById('viewer');
const layers  = [...viewer.querySelectorAll('.layer')];
const counter = document.getElementById('counter');
let index = 0, active = 0, lastFocus = null;

IMAGES.forEach((im,i)=>{
  const b = document.createElement('button');
  b.className='cell'; b.type='button'; b.setAttribute('aria-label','Open '+im.title);
  b.innerHTML =
    ${'`'}<img class="cbg" src="${'${'}im.src}" alt="" aria-hidden="true">${'`'}+
    ${'`'}<img class="cfg" src="${'${'}im.src}" alt="${'${'}im.title}">${'`'}+
    ${'`'}<span class="num">${'${'}String(i+1).padStart(2,'0')}</span>${'`'};
  b.addEventListener('click',()=>openAt(i));
  collage.appendChild(b);
});

function show(i, immediate){
  index = (i + IMAGES.length) % IMAGES.length;
  const item = IMAGES[index];
  const incoming = immediate ? active : 1 - active;
  const L = layers[incoming], bg = L.querySelector('.bg'), fg = L.querySelector('.fg');
  const swap = ()=>{
    bg.src = item.src; fg.src = item.src; fg.alt = item.title;
    layers.forEach(l=>l.classList.remove('on'));
    L.classList.add('on'); active = incoming;
  };
  const pre = new Image();
  pre.onload = pre.onerror = swap;
  pre.src = item.src;
  if (pre.complete) swap();
  counter.innerHTML = ${'`'}${'${'}String(index+1).padStart(2,'0')} / ${'${'}String(IMAGES.length).padStart(2,'0')}<span class="ttl"> — ${'${'}item.title}</span>${'`'};
}

function openAt(i){
  lastFocus = document.activeElement;
  show(i, true);
  viewer.classList.add('open');
  document.getElementById('close').focus({preventScroll:true});
}
function closeViewer(){
  viewer.classList.remove('open');
  if (lastFocus) lastFocus.focus({preventScroll:true});
}
const next = ()=>show(index+1);
const prev = ()=>show(index-1);

document.getElementById('close').addEventListener('click', closeViewer);
document.getElementById('next').addEventListener('click', next);
document.getElementById('prev').addEventListener('click', prev);

document.addEventListener('keydown', e=>{
  if (!viewer.classList.contains('open')) return;
  if (e.key==='Escape'){ e.preventDefault(); closeViewer(); }
  else if (e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){ e.preventDefault(); next(); }
  else if (e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev(); }
  else if (e.key==='Home'){ e.preventDefault(); show(0); }
  else if (e.key==='End'){ e.preventDefault(); show(IMAGES.length-1); }
});

let sx=null, sy=null;
viewer.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
viewer.addEventListener('touchend',e=>{
  if(sx===null) return;
  const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)) (dx<0?next:prev)();
  sx=sy=null;
},{passive:true});
</script>
</body>
</html>
`;


export const UrbanTractionCollage: React.FC<UrbanTractionCollageProps> = ({ className = 'block h-full w-full border-0', title = 'Urban Traction image collage', contentCss, disableAutoHeight, disableScroll }) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const applyContentCss = () => {
      if (!contentCss) return;
      const doc = frame.contentDocument;
      if (!doc?.head) return;
      let style = doc.head.querySelector<HTMLStyleElement>('style[data-parent-layout-overrides]');
      if (!style) {
        style = doc.createElement('style');
        style.dataset.parentLayoutOverrides = '';
        doc.head.appendChild(style);
      }
      style.textContent = contentCss;
    };
    const fitFrame = () => {
      if (disableAutoHeight) return;
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      const height = Math.max(doc.body.scrollHeight, doc.body.offsetHeight);
      if (height > 0) frame.style.height = `${height}px`;
    };
    const observeContent = () => {
      applyContentCss();
      fitFrame();
    };
    frame.addEventListener('load', observeContent);
    window.addEventListener('resize', fitFrame);
    return () => {
      frame.removeEventListener('load', observeContent);
      window.removeEventListener('resize', fitFrame);
    };
  }, [contentCss, disableAutoHeight]);

  return <iframe ref={frameRef} srcDoc={sourceDocument} title={title} loading="lazy" scrolling={disableScroll ? 'no' : undefined} className={className} />;
};
