# Phase 4A — Safe Project Cleanup Audit

## Scope and method

This was an audit only. No files were deleted, renamed, moved, or modified as part of the cleanup audit. The audit covered every `.html` file under `public/`, repository-wide filename references, iframe and `srcDoc` usage, `fetch()` usage, JavaScript/CSS/build references, the active `ProjectPage.tsx` branches, and TypeScript/build validation.

Documentation references in migration reports and mapping files are recorded as historical references, not runtime dependencies.

## Complete standalone HTML inventory

| File | Associated project/page | Current usage/reference status | Classification |
|---|---|---|---|
| `public/about-work.html` | About / Work legacy page | No application reference found; direct public URL usage cannot be ruled out | UNCERTAIN |
| `public/catalyst-sheet.html` | Architecture page — Catalyst sheet | Active iframe through `ArchitecturePage.tsx` (`SheetFrame`) | STILL REFERENCED |
| `public/catalyst-step-sequence.html` | Catalyst | Not loaded by the application; embedded as `srcDoc` in `CatalystStepSequence.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/housing-massing-sequence.html` | Housing One | Active `SequenceFrame` iframe in `ProjectPage.tsx` | STILL REFERENCED |
| `public/housing-standalone.html` | Housing One | Active `SequenceFrame` iframe in `ProjectPage.tsx` | STILL REFERENCED |
| `public/housing-step-sequence.html` | Housing One | Not loaded by the application; embedded as `srcDoc` in `HousingOneStepSequences.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/jamming-studio-collage.html` | Jamming Studio | Not loaded by the application; embedded as `srcDoc` in `JammingStudioCollage.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/journal-2026-light.html` | Journal page | Active iframe through `JournalEmbed.tsx` | STILL REFERENCED |
| `public/loop-collage.html` | Loop | Not loaded by the application; embedded as `srcDoc` in `LoopCollage.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/loop-row.html` | Loop | Not loaded by the application; embedded as `srcDoc` in `LoopRow.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/loop-sequence.html` | Loop legacy/alternate sequence | No active application reference found; direct public URL usage cannot be ruled out | UNCERTAIN |
| `public/projects-row.html` | Global project preloader | Active iframe through `PagePreloader.tsx` | SHARED DEPENDENCY |
| `public/road-network.html` | Urban Traction | Not loaded by the application; embedded as `srcDoc` in `RoadNetwork.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/roads-public-realm.html` | Architecture page — Roads/public realm | Active iframe through `ArchitecturePage.tsx` (`SheetFrame`) | STILL REFERENCED |
| `public/urban-study-single.html` | Urban Traction | Not loaded by the application; embedded as `srcDoc` in `UrbanTractionStudy.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/urban-traction-row-4up.html` | Urban Traction | Not loaded by the application; embedded as `srcDoc` in `UrbanTractionComparisons.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/urban-traction-row.html` | Urban Traction legacy/alternate sequence | No active application reference found; direct public URL usage cannot be ruled out | UNCERTAIN |
| `public/urban-traction-standalone.html` | Urban Traction | Not loaded by the application; embedded as `srcDoc` in `UrbanTractionCollage.tsx`; historical report/mapping references remain | SAFE TO REMOVE* |
| `public/works-map.html` | Services page — selected works map | Active iframe through `ServicesPage.tsx` (`SheetFrame`) | STILL REFERENCED |

\* `SAFE TO REMOVE` means safe from the current React application's runtime dependency graph after the verified TSX replacement is active. A separate product decision is still recommended before deleting public fallback URLs or historical rollback files.

## Reference audit

### React application

The following migrated implementations are the active implementations in `ProjectPage.tsx`:

- Catalyst → `CatalystStepSequence.tsx`
- Housing One site-study sequence → `HousingOneStepSequences.tsx`
- Urban Traction → `UrbanTractionStudy.tsx`, `RoadNetwork.tsx`, `UrbanTractionComparisons.tsx`, `UrbanTractionCollage.tsx`
- Loop → `LoopRow.tsx`, `LoopCollage.tsx`
- Jamming Studio → `JammingStudioCollage.tsx`

The migrated HTML files are not used as `iframe src` values by those project branches. Their React copies render the preserved documents through `srcDoc`.

Housing One still has two intentionally unmigrated active fallbacks:

- `housing-massing-sequence.html`
- `housing-standalone.html`

### iframe references

Active standalone HTML iframe references found:

- `ArchitecturePage.tsx` → `catalyst-sheet.html`, `roads-public-realm.html`
- `JournalEmbed.tsx` → `journal-2026-light.html`
- `PagePreloader.tsx` → `projects-row.html`
- `ProjectPage.tsx` → `housing-massing-sequence.html`, `housing-standalone.html`
- `ServicesPage.tsx` → `works-map.html`

### srcDoc references

Verified TSX copies use `srcDoc` for the migrated projects. `srcDoc` references were found in:

- Catalyst step sequence
- Housing One step sequence, massing sequence, and collage copies
- Urban Traction study, road network, comparisons, and collage copies
- Loop row and collage copies
- Jamming Studio collage copy

### fetch, JavaScript, CSS, and configuration

- No application `fetch()` usage was found for the standalone HTML files.
- No build script or configuration reference was found for the migrated HTML filenames.
- `SequenceFrame` remains in `ProjectPage.tsx` only for the still-active Housing One massing and collage fallbacks.
- The migrated standalone documents contain their own inline CSS and JavaScript. Their verified TSX copies preserve those documents inside `srcDoc`.
- The audit found no external HTML-to-HTML dependency that makes the five migrated project fallbacks runtime-shared with another project.

## Asset audit

The migrated documents primarily embed image data as `data:image/...` values inside the HTML/TSX documents. No separate external image, video, font, CSS, or JavaScript asset was conclusively identified as being used only by an old migrated HTML file.

The following externally referenced assets remain relevant to active application code and must not be removed based on this audit:

- Assets used by the active React project registry and project pages.
- Assets used by active shared HTML pages such as `projects-row.html`, `works-map.html`, `journal-2026-light.html`, `catalyst-sheet.html`, and `roads-public-realm.html`.
- Housing One assets used by the still-active `housing-massing-sequence.html` and `housing-standalone.html` fallbacks.

No asset deletion was performed.

## Removal impact assessment

Removing the files classified `SAFE TO REMOVE` would not change the current React route branches because those branches use the verified TSX copies and `srcDoc`. However, deletion would remove the standalone rollback/fallback files and could affect direct public URL access or manual rollback procedures. Those operational consequences require explicit approval in a later cleanup phase.

Removing files classified `STILL REFERENCED` or `SHARED DEPENDENCY` would affect active pages, project sections, preload behavior, or shared content and is not safe.

Files classified `UNCERTAIN` require manual review for direct links, bookmarks, deployment conventions, or historical integrations before removal.

## Protected project confirmation

- **Production Design:** untouched.
- **Mithchowki Transformation:** untouched; current React/video implementation remains unchanged.
- **TEDx Gateway:** untouched.

## Validation

- **TypeScript diagnostics:** PASS — no problems reported in the audited React source.
- **Production build:** PASS — `npm run build`.
- Existing large-bundle warning remains; it is informational and unrelated to cleanup safety.
- No deletion or migration was performed during this audit.

## Final action lists

### 1. SAFE TO REMOVE

Runtime-safe after explicit fallback-retirement approval:

- `public/catalyst-step-sequence.html`
- `public/housing-step-sequence.html`
- `public/jamming-studio-collage.html`
- `public/loop-collage.html`
- `public/loop-row.html`
- `public/road-network.html`
- `public/urban-study-single.html`
- `public/urban-traction-row-4up.html`
- `public/urban-traction-standalone.html`

### 2. DO NOT REMOVE

- `public/catalyst-sheet.html`
- `public/housing-massing-sequence.html`
- `public/housing-standalone.html`
- `public/journal-2026-light.html`
- `public/projects-row.html`
- `public/roads-public-realm.html`
- `public/works-map.html`

### 3. NEEDS MANUAL REVIEW

- `public/about-work.html`
- `public/loop-sequence.html`
- `public/urban-traction-row.html`

These files have no active application reference found, but their direct public URL or legacy integration usage could not be ruled out by repository search alone.
