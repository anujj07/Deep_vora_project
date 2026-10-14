# Selected Works Carousel — Combined Reference

This is a compact reference for the homepage Selected Works carousel. The live implementation remains split between `WorkIndex.tsx`, `workWriteUps.ts`, `mapConfig.ts`, and `index.css`.

```tsx
// Core component structure — src/components/WorkIndex.tsx
const [openId, setOpenId] = useState<string | null>(null);
const [activeImages, setActiveImages] = useState<Record<string, number>>({});

const selectImage = (id: string, imageIndex: number, count: number) => {
  const nextIndex = Math.max(0, Math.min(imageIndex, count - 1));
  setActiveImages((current) => ({ ...current, [id]: nextIndex }));

  requestAnimationFrame(() => {
    const strip = stripRefs.current.get(id);
    if (!strip) return;
    if (nextIndex === 0) {
      strip.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    slideRefs.current.get(`${id}-${nextIndex}`)?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    });
  });
};

<article
  className={`work-index__row ${isOpen ? 'is-open' : ''}`}
  style={{ '--work-carousel-index': activeImage } as React.CSSProperties}
>
  <div className="work-index__label">
    {/* Project number, title, location, metadata */}
  </div>

  <div className="work-index__media">
    <button className="work-index__hero" onClick={() => toggle(project.id)}>
      <img src={media[0].imageUrl} alt={title} />
    </button>

    <div className="work-index__strip">
      <div className="work-index__scroll">
        {/* First text box: placed between key image and gallery images */}
        <p className="work-index__brief">{writeUp?.narrative ?? project.description}</p>

        {/* Every later image and its caption move together */}
        {media.slice(1).map((item, offset) => (
          <div
            className="work-index__carousel-slide"
            ref={(node) => {
              if (node) slideRefs.current.set(`${project.id}-${offset + 1}`, node);
            }}
            key={item.imageUrl}
          >
            <figure className="work-index__image-box">
              <img src={item.imageUrl} alt="" />
            </figure>
            {item.narrative && <p className="work-index__narrative-box">{item.narrative}</p>}
          </div>
        ))}
      </div>

      <div className="work-index__controls">
        <button onClick={() => selectImage(project.id, activeImage - 1, media.length)} disabled={activeImage === 0}>Previous</button>
        <span>{String(activeImage + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}</span>
        <button onClick={() => selectImage(project.id, activeImage + 1, media.length)} disabled={activeImage === media.length - 1}>Next</button>
      </div>
    </div>
  </div>
</article>
```

```css
/* Core carousel styling — src/index.css */
.work-index__scroll {
  display: flex;
  align-items: flex-start;
  gap: clamp(28px, 5vw, 64px);
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.work-index__carousel-slide {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: clamp(20px, 3vw, 48px);
  height: 100%;
  scroll-snap-align: center;
}

.work-index__scroll img {
  height: 100%;
  width: auto;
  max-height: var(--work-strip-height);
  object-fit: cover;
}

@media (min-width: 768px) {
  .work-index__scroll img {
    max-width: min(46vw, 560px);
    min-width: 0;
  }
}

.work-index__brief,
.work-index__narrative-box {
  flex: 0 0 290px;
  max-height: 100%;
  overflow-y: auto;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.65;
}

.work-index__narrative-box {
  font-size: 11px;
  font-weight: 700;
}
```

```ts
// Image data pattern — src/data/mapConfig.ts
export const HOUSING_ONE_IMAGES = [
  { id: 'HOUSING_ONE_KEY', imageUrl: '/projects/housing-one/KEY_IMAGE_HOUSING_ONE.png', caption: '01 — Housing and greenway framework' },
  { id: 'HOUSING_ONE_STREET', imageUrl: '/projects/housing-one/HOUSING_IMAGE_01.png', caption: '02 — Street-level residential view' },
  { id: 'HOUSING_ONE_LANDSCAPE', imageUrl: '/projects/housing-one/HOUSING_IMAGE_02.png', caption: '03 — Shared landscape and housing view' },
];
```
