import React from 'react';

interface LoopCollageProps {
  className?: string;
  title?: string;
}

// React copy of public/loop-collage.html; the original HTML remains the fallback implementation.
const sourceDocument = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Loop — James Bay</title>
<style>
:root{ --gap:10px; --ink:#1A1A1A; --ink-50:rgba(26,26,26,.5); --paper:#FFFFFF; --rule:#E4E4E2; }
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  background:var(--paper);color:var(--ink);
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
  display:flex;flex-direction:column;overflow:hidden;
}
img{display:block;max-width:none}

.head{padding:clamp(14px,2.2vh,26px) clamp(14px,2vw,26px) 0;text-align:center;flex-shrink:0}
.head h1{font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
.head p{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-50);margin-top:5px}

/* ---------------------------------------------------------------
   Two rows. Within a row each tile grows in proportion to its own
   aspect ratio, so every tile in that row lands at the same height
   and fills its width exactly — no cropping, no filler behind.
   Row 1 carries the plan and the lead render; row 2 the other four.
   The block centres, so the leftover height sits evenly top and bottom.
   --------------------------------------------------------------- */
.sheet{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;
       gap:var(--gap);padding:clamp(12px,2vh,22px) var(--gap) var(--gap)}
.row{display:flex;gap:var(--gap);min-height:0}
.tile{min-width:0;border:0;padding:0;background:none;cursor:pointer;overflow:hidden;display:block}
.tile img{width:100%;height:auto}        /* height follows the image: never stretched */
.tile{transition:opacity .3s}
.tile:hover{opacity:.88}
.tile:focus-visible{outline:2px solid var(--ink);outline-offset:2px}

/* ---------------- fullscreen reader ---------------- */
.view{position:fixed;inset:0;z-index:9999;overflow:hidden;background:var(--paper);
      display:flex;flex-direction:column;gap:12px;
      padding:clamp(12px,2vw,26px);
      opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
.view.on{opacity:1;visibility:visible}
.view .big{position:absolute;inset:0;min-height:0;z-index:0}
.view .big img{position:absolute;inset:0;width:100%;height:100%;
               object-fit:contain;object-position:center}   /* never crops */
.view .foot{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;gap:20px;
            font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-50)}
.view .foot span{position:absolute;left:50%;bottom:clamp(14px,2.4vw,28px);transform:translateX(-50%);
                 padding:7px 14px;border-radius:999px;background:rgba(0,0,0,.34);color:#fff;white-space:nowrap}
.view .foot b{color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.view button{position:absolute;border:0;background:rgba(0,0,0,.34);color:#fff;width:52px;height:52px;border-radius:50%;cursor:pointer;
             display:grid;place-items:center;transition:border-color .2s}
.view button:hover{border-color:var(--ink)}
.view #prev{left:clamp(12px,2vw,26px);top:50%;transform:translateY(-50%)}
.view #next{right:clamp(12px,2vw,26px);top:50%;transform:translateY(-50%)}
.view svg{width:14px;height:14px;fill:none;stroke:var(--ink);stroke-width:1.5;
          stroke-linecap:round;stroke-linejoin:round}
.view .close{position:absolute;z-index:3;top:clamp(14px,2.2vw,26px);right:clamp(14px,2.2vw,26px);width:52px;height:52px;border:0;border-radius:50%;
             background:rgba(0,0,0,.34);color:#fff;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.view .close:hover{background:rgba(0,0,0,.6)}

@media (max-width:820px){
  body{overflow:auto}
  .sheet{display:block;padding:12px}
  .row{display:block}
  .tile{margin-bottom:var(--gap)}
  .view .foot button{top:auto;bottom:clamp(14px,2.4vw,28px);transform:none;width:44px;height:44px}
  .view .close{top:14px;right:14px;width:44px;height:44px}
  .view #prev{left:14px}
  .view #next{right:14px}
  .view .foot span{max-width:50vw;overflow:hidden;text-overflow:ellipsis}
  .view .foot span span{display:none}
}
@media (prefers-reduced-motion:reduce){ .tile,.view{transition:none} }
</style>
</head>
<body>

<header class="head">
  <h1>Loop</h1>
  <p>James Bay, Victoria &mdash; proposed neighbourhood</p>
</header>

<main class="sheet">
  <div class="row" id="rowA"></div>
  <div class="row" id="rowB"></div>
</main>

<div class="view" id="view" role="dialog" aria-modal="true" aria-label="Drawing">
  <button class="close" id="close" aria-label="Close viewer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
  <div class="big"><img id="bigImg" alt=""></div>
  <div class="foot">
    <button id="prev" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
    <span><b id="now">01</b> / 06 &nbsp;&middot;&nbsp; <span id="cap"></span></span>
    <button id="next" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
  </div>
</div>

<noscript><p style="padding:20px">Loop, James Bay — proposed plan and five views of the neighbourhood.</p></noscript>

<script>
(function(){
'use strict';
/* ratio drives the flex share, so a row's tiles all land at one height */
const IMAGES = [{"src": "/loop-grid-images/Picture1.jpg", "title": "Proposed plan — James Bay", "ratio": 1.1749}, {"src": "/loop-grid-images/Picture2.jpg", "title": "Tram corridor", "ratio": 2.1823}, {"src": "/loop-grid-images/Picture3.jpg", "title": "Commercial street", "ratio": 2.091}, {"src": "/loop-grid-images/Picture4.jpg", "title": "Linear park", "ratio": 2.1601}, {"src": "/loop-grid-images/Picture5.jpg", "title": "Green roofs toward the Legislature", "ratio": 2.5185}, {"src": "/loop-grid-images/Picture6.jpg", "title": "Waterfront tram", "ratio": 2.432}];

const rowA = document.getElementById('rowA');
const rowB = document.getElementById('rowB');
const view = document.getElementById('view');
const bigImg = document.getElementById('bigImg');
const now = document.getElementById('now');
const cap = document.getElementById('cap');
let at = 0;

IMAGES.forEach((im,i)=>{
  const b = document.createElement('button');
  b.className = 'tile'; b.type = 'button';
  b.style.flex = im.ratio + ' 1 0%';          // width proportional to the image's own ratio
  b.setAttribute('aria-label','Open '+im.title);
  b.innerHTML = '<img src="'+im.src+'" alt="'+im.title+'"'+(i>1?' loading="lazy"':'')+'>';
  b.addEventListener('click', ()=> open(i));
  (i < 2 ? rowA : rowB).appendChild(b);
});

function show(i){
  at = (i + IMAGES.length) % IMAGES.length;
  bigImg.src = IMAGES[at].src;
  bigImg.alt = IMAGES[at].title;
  now.textContent = String(at+1).padStart(2,'0');
  cap.textContent = IMAGES[at].title;
}
function open(i){ show(i); view.classList.add('on'); document.getElementById('close').focus(); }
function close(){ view.classList.remove('on'); }

const onKeyDown = e=>{
  if (!view.classList.contains('on')) return;
  if (e.key === 'Escape'){ e.preventDefault(); close(); }
  else if (e.key === 'ArrowRight'){ e.preventDefault(); show(at+1); }
  else if (e.key === 'ArrowLeft'){ e.preventDefault(); show(at-1); }
};
document.getElementById('close').addEventListener('click', close);
document.getElementById('next').addEventListener('click', ()=> show(at+1));
document.getElementById('prev').addEventListener('click', ()=> show(at-1));
addEventListener('keydown', onKeyDown);
let sx=null;
view.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; }, {passive:true});
view.addEventListener('touchend', e=>{
  if (sx===null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
  sx = null;
}, {passive:true});
})();
</script>
</body>
</html>
`;

export const LoopCollage: React.FC<LoopCollageProps> = ({ className = 'block h-full w-full border-0', title = 'Loop project collage' }) => (
  <iframe srcDoc={sourceDocument} title={title} className={className} />
);
