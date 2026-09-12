'use client';
/* oxlint-disable next/no-img-element -- Supplied local photographs and video posters are optimized before delivery. */
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Maximize2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useI18n } from '@/lib/i18n';

const TIKTOK = 'https://www.tiktok.com/@jingcai.thread';

interface PhotoItem {
  id: 'production' | 'dyeing' | 'winding' | 'people' | 'packing';
  src: string;
  className: string;
}

const photoItems: PhotoItem[] = [
  {
    id: 'production',
    src: '/images/factory-production.webp',
    className: '',
  },
  {
    id: 'dyeing',
    src: '/images/factory-dyeing.webp',
    className: '',
  },
  {
    id: 'winding',
    src: '/images/winding.webp',
    className: '',
  },
  {
    id: 'people',
    src: '/images/factory-team.webp',
    className: '',
  },
  {
    id: 'packing',
    src: '/images/packing.webp',
    className: '',
  },
];

export function FactoryShowcase() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<PhotoItem | null>(null);

  const selectedData = selected ? t.factoryShowcase.photos[selected.id] : null;

  return (
    <>
      <section className="section factory-showcase" id="factory">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.factoryShowcase.eyebrow}</p>
            <h2>
              {t.factoryShowcase.heading1}
              <br />
              <em>{t.factoryShowcase.heading2}</em>
            </h2>
          </div>
          <div className="factory-intro">
            <p>{t.factoryShowcase.intro}</p>
            <a href="#films" className="text-link">
              {t.factoryShowcase.watchLink} <Play size={14} />
            </a>
          </div>
        </div>
        <div className="factory-mosaic">
          {photoItems.map((p, i) => {
            const data = t.factoryShowcase.photos[p.id];
            return (
              <button
                type="button"
                className={'factory-photo photo-' + i}
                key={p.id}
                onClick={() => setSelected(p)}
                aria-label={'Enlarge photo: ' + data.title}
              >
                <div className={'factory-frame ' + p.className}>
                  <img
                    width={2048}
                    height={1536}
                    src={p.src}
                    alt={data.desc}
                    loading="lazy"
                  />
                </div>
                <span className="enlarge-photo">
                  <Maximize2 size={17} />
                </span>
                <span className="factory-photo-caption">
                  <span>{data.label}</span>
                  <strong>{data.title}</strong>
                </span>
              </button>
            );
          })}
        </div>
        <div className="factory-story-grid">
          {t.factoryShowcase.stories.map((story) => (
            <div key={story.num}>
              <span>{story.num}</span>
              <h3>{story.title}</h3>
              <p>{story.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="store-section" id="showroom">
        <div className="store-front">
          <img
            src="/images/showroom-enhanced.webp"
            alt="Qianye Jingcai factory store entrance, showing the real signage and product displays"
            width={1272}
            height={856}
            loading="lazy"
          />
          <span className="store-photo-label">
            {t.factoryShowcase.store.photoLabel} · AI-enhanced photo
          </span>
        </div>
        <div className="store-copy">
          <p className="eyebrow">{t.factoryShowcase.store.eyebrow}</p>
          <h2>
            {t.factoryShowcase.store.title1}
            <br />
            <em>{t.factoryShowcase.store.title2}</em>
          </h2>
          <p>{t.factoryShowcase.store.p1}</p>
          <p>{t.factoryShowcase.store.p2}</p>
          <a
            className="button"
            href={
              'https://wa.me/8618205894588?text=' +
              encodeURIComponent(t.factoryShowcase.store.visitWaMsg)
            }
            target="_blank"
            rel="noreferrer"
          >
            {t.factoryShowcase.store.visitBtn} <ArrowUpRight size={18} />
          </a>
          <div className="store-location">
            <MapPin size={15} />
            <span>{t.factoryShowcase.store.location}</span>
          </div>
        </div>
      </section>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="factory-lightbox">
          <DialogTitle>{selectedData?.title}</DialogTitle>
          <DialogDescription>{selectedData?.desc}</DialogDescription>
          {selected && (
            <div
              className={'factory-frame lightbox-image ' + selected.className}
            >
              <img
                src={selected.src}
                alt={selectedData?.desc || ''}
                width={2048}
                height={1536}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const filmIds = [
  { id: 'film-01', duration: '0:12' },
  { id: 'film-02', duration: '0:20' },
  { id: 'film-03', duration: '0:18' },
  { id: 'film-04', duration: '0:42' },
  { id: 'film-05', duration: '0:35' },
  { id: 'film-06', duration: '0:19' },
  { id: 'film-07', duration: '0:18' },
] as const;

export function FactoryFilms() {
  const { t } = useI18n();
  const rail = useRef<HTMLDivElement>(null);
  const players = useRef(new Map<string, HTMLVideoElement>());
  const paused = useRef(new Set<string>());
  const [loaded, setLoaded] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState<string[]>([]);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const container = rail.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-film]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const bounds = container.getBoundingClientRect();
      setEdges({ start: container.scrollLeft < 2, end: container.scrollLeft + container.clientWidth >= container.scrollWidth - 2 });
      const visible = cards.filter(card => {
        const rect = card.getBoundingClientRect();
        const width = Math.max(0, Math.min(rect.right, bounds.right, window.innerWidth) - Math.max(rect.left, bounds.left, 0));
        const height = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        return width / rect.width > .7 && height / rect.height > .7;
      });
      if (document.hidden || reduced.matches || !visible.length) { setActive(null); return; }
      const center = (bounds.left + bounds.right) / 2;
      visible.sort((a, b) => Math.abs(a.getBoundingClientRect().left + a.clientWidth / 2 - center) - Math.abs(b.getBoundingClientRect().left + b.clientWidth / 2 - center));
      setActive(visible[0].dataset.film || null);
    };
    const observer = new IntersectionObserver(entries => {
      const ids = entries.filter(entry => entry.isIntersecting).map(entry => (entry.target as HTMLElement).dataset.film!);
      if (ids.length) setLoaded(current => [...new Set([...current, ...ids])]);
      sync();
    }, { threshold: [0, .25, .7, 1] });
    cards.forEach(card => observer.observe(card));
    container.addEventListener('scroll', sync, { passive: true });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    return () => { observer.disconnect(); container.removeEventListener('scroll', sync); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    players.current.forEach((video, id) => {
      if (id !== active || paused.current.has(id)) video.pause();
      else if (loaded.includes(id)) void video.play().catch(() => { /* Autoplay may be blocked; keep the play button available. */ });
    });
  }, [active, loaded]);

  function move(direction: number) {
    const container = rail.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    container.scrollBy({ left: direction * ((card?.offsetWidth || 190) + 18), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function toggle(id: string) {
    const video = players.current.get(id);
    if (!video) return;
    if (!video.paused) { paused.current.add(id); video.pause(); }
    else {
      paused.current.delete(id);
      setLoaded(current => current.includes(id) ? current : [...current, id]);
      setActive(id);
      if (video.getAttribute('src')) void video.play().catch(() => {});
    }
  }

  return (
    <section className="section film-shelf" id="films">
      <div className="film-shelf-heading">
        <div><p className="eyebrow">{t.factoryFilms.eyebrow}</p><h2>{t.factoryFilms.heading1} <em>{t.factoryFilms.heading2}</em></h2></div>
        <div className="film-rail-navigation" dir="ltr"><button disabled={edges.start} onClick={() => move(-1)} aria-label="Previous videos"><ChevronLeft size={18} /></button><button disabled={edges.end} onClick={() => move(1)} aria-label="Next videos"><ChevronRight size={18} /></button></div>
      </div>
      <div className="film-rail" ref={rail} dir="ltr" role="region" aria-label={t.factoryFilms.eyebrow} tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
        {filmIds.map(meta => {
          const film = t.factoryFilms.items[meta.id];
          const isPlaying = playing === meta.id;
          return <article className="film-tile" key={meta.id} data-film={meta.id}>
            <div className={'film-tile-media' + (isPlaying ? ' is-playing' : '')}>
              <video ref={element => { if (element) players.current.set(meta.id, element); else players.current.delete(meta.id); }} src={loaded.includes(meta.id) ? '/videos/' + meta.id + '.mp4' : undefined} playsInline muted={muted} loop preload="none" poster={'/videos/' + meta.id + '.webp'} aria-label={film.title}
                onPlay={() => { players.current.forEach((video, id) => { if (id !== meta.id) video.pause(); }); setPlaying(meta.id); }}
                onPause={() => setPlaying(current => current === meta.id ? null : current)}
                onError={() => setFailed(current => current.includes(meta.id) ? current : [...current, meta.id])}>
                <track src={'/videos/' + meta.id + '.vtt'} kind="descriptions" srcLang="en" label="Visual description" />
              </video>
              <button className="film-toggle" onClick={() => toggle(meta.id)} aria-label={(isPlaying ? 'Pause: ' : 'Play: ') + film.title}><span>{isPlaying ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}</span></button>
              <span className="film-time">{meta.duration}</span>
              <h3 dir="auto">{film.title}</h3>
              {isPlaying && <button className="film-sound" onClick={() => setMuted(current => !current)} aria-label={muted ? 'Unmute video' : 'Mute video'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>}
              {failed.includes(meta.id) && <a className="film-fallback" href={TIKTOK} target="_blank" rel="noreferrer">{t.factoryFilms.watchTiktok} <ArrowUpRight size={16} /></a>}
            </div>
          </article>;
        })}
      </div>
      <div className="film-shelf-footer"><span className="film-footer-line" /><a className="text-link" href={TIKTOK} target="_blank" rel="noreferrer">{t.factoryFilms.watchTiktok} <ArrowUpRight size={16} /></a></div>
    </section>
  );
}
