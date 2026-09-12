'use client';
/* oxlint-disable next/no-img-element -- Images are pre-optimized local WebP assets with reserved layout dimensions. */
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { FactoryShowcase, FactoryFilms } from './factory';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useI18n } from '@/lib/i18n';

const FB = 'https://www.facebook.com/isla.zhu';
export const WA = 'https://wa.me/8618205894588';

const COLOR_DEFS = [
  { key: 'navy' as const, image: 'navy', hex: '#333f59' },
  { key: 'red' as const, image: 'red', hex: '#c82733' },
  { key: 'yellow' as const, image: 'yellow', hex: '#eabc29' },
  { key: 'sky' as const, image: 'sky', hex: '#80cfdf' },
  { key: 'pink' as const, image: 'pink', hex: '#ecadbf' },
  { key: 'purple' as const, image: 'purple', hex: '#582487' },
  { key: 'wine' as const, image: 'wine', hex: '#672137' },
  { key: 'lavender' as const, image: 'lavender', hex: '#b397cf' },
];

export function ColorSection() {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<string>('navy');

  const currentColorDef =
    COLOR_DEFS.find((c) => c.image === selectedImage) || COLOR_DEFS[0];
  const currentColorName = t.colors.names[currentColorDef.key];
  const currentIndex = COLOR_DEFS.findIndex((c) => c.image === selectedImage);

  return (
    <section className="color-section" id="colors">
      <div className="color-photo">
        <img
          width={1600}
          height={1200}
          src={'/images/' + currentColorDef.image + '.webp'}
          alt={currentColorName + ' Qianye polyester sewing thread cones'}
          loading="lazy"
        />
        <span className="photo-caption">{t.colors.caption}</span>
      </div>
      <div className="color-copy">
        <p className="eyebrow">{t.colors.eyebrow}</p>
        <h2>
          {t.colors.title1}
          <br />
          <em>{t.colors.title2}</em>
        </h2>
        <p>{t.colors.desc}</p>
        <RadioGroup
          className="swatches"
          value={currentColorDef.image}
          onValueChange={(value) => setSelectedImage(value)}
          aria-label="Thread color"
        >
          {COLOR_DEFS.map((c) => {
            const name = t.colors.names[c.key];
            return (
              <RadioGroupItem
                key={c.image}
                value={c.image}
                aria-label={name}
                title={name}
                style={{ backgroundColor: c.hex }}
                className="swatch"
              />
            );
          })}
        </RadioGroup>
        <div className="color-selection">
          <span>{currentColorName}</span>
          <span>
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(COLOR_DEFS.length).padStart(2, '0')}
          </span>
        </div>
        <p className="fine-print">{t.colors.finePrint}</p>
        <a
          className="button"
          href={
            WA +
            '?text=' +
            encodeURIComponent(
              t.colors.sampleWaMsg.replace('{color}', currentColorName),
            )
          }
          target="_blank"
          rel="noreferrer"
        >
          {t.colors.sampleBtn} <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { t } = useI18n();

  return (
    <>
      <section className="section about-section" id="about">
        <div className="about-copy">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>
            {t.about.title1}
            <br />
            {t.about.title2}
          </h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about-points">
            <span>
              <Check size={17} /> {t.about.point1}
            </span>
            <span>
              <Check size={17} /> {t.about.point2}
            </span>
            <span>
              <Check size={17} /> {t.about.point3}
            </span>
          </div>
          <a href={FB} target="_blank" rel="noreferrer" className="text-link">
            {t.about.fbLink} <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="factory-photos">
          <img
            width={1600}
            height={1200}
            className="factory-main"
            src="/images/factory-enhanced.webp"
            alt="Jingcai production workshop with rows of thread winding equipment"
            loading="lazy"
          />
          <img
            width={1600}
            height={1200}
            className="factory-inset"
            src="/images/winding.webp"
            alt="White thread cones on winding equipment, supplied factory photograph"
            loading="lazy"
          />
          <div className="factory-caption">
            <span>{t.about.estYear}</span>
            <span>{t.about.location} · AI-enhanced photo</span>
          </div>
        </div>
      </section>
      <FactoryShowcase />
      <FactoryFilms />
      <section className="application-section">
        <div className="application-image">
          <img
            width={1600}
            height={1200}
            src="/images/stitch-detail.webp"
            alt="Illustrative close-up of terracotta stitching on natural woven fabric"
            loading="lazy"
          />
        </div>
        <div className="application-copy">
          <p className="eyebrow">{t.about.appEyebrow}</p>
          <h2>
            {t.about.appTitle1}
            <br />
            {t.about.appTitle2}
          </h2>
          <p>
            {t.about.appP1}
            <br />
            {t.about.appP2}
          </p>
          <a className="text-link" href="#contact">
            {t.about.appLink} <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

export function FAQSection() {
  const { t } = useI18n();

  return (
    <section className="section faq-section" id="faq">
      <div>
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h2>
          {t.faq.title1}
          <br />
          {t.faq.title2}
        </h2>
        <a className="text-link" href="#contact">
          {t.faq.moreQuestions} <ArrowUpRight size={16} />
        </a>
      </div>
      <Accordion className="faq-list" defaultValue={[0]}>
        {t.faq.items.map((item, i) => (
          <AccordionItem className="faq" key={item.q} value={i}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent keepMounted>
              <p>{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}


export function ContactSection() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  const [url, setUrl] = useState('');

  return (
    <section className="section inquiry-section" id="contact">
      <div className="inquiry-copy">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2>
          {t.contact.title1}
          <br />
          <em>{t.contact.title2}</em>
        </h2>
        <p>
          {t.contact.desc1}
          <br />
          {t.contact.desc2}
        </p>
        <div className="contact-person">
          <span className="person-initials">IZ</span>
          <div>
            <strong>Isla Zhu</strong>
            <span>{t.contact.contactRole}</span>
          </div>
        </div>
        <a className="contact-phone" href={WA} target="_blank" rel="noreferrer">
          <MessageCircle size={20} />
          <span>
            {t.contact.waWechat}
            <strong>+86 182 0589 4588</strong>
          </span>
          <ArrowUpRight size={19} />
        </a>
        <p className="location">
          <MapPin size={16} /> {t.contact.locationChina}
        </p>
        <div className="social-links">
          <a href={FB} target="_blank" rel="noreferrer">
            Facebook <ArrowUpRight size={15} />
          </a>
          <a
            href="https://www.tiktok.com/@jingcai.thread"
            target="_blank"
            rel="noreferrer"
          >
            TikTok <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <form
        className="inquiry-form"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const field = (key: string) => {
            const value = data.get(key);
            return typeof value === 'string' ? value.trim() : '';
          };
          const message = t.contact.waMsgTemplate
            .replace('{name}', field('name'))
            .replace('{company}', field('company') || '-')
            .replace('{email}', field('email'))
            .replace('{requirements}', field('requirements'));
          setUrl(WA + '?text=' + encodeURIComponent(message));
          setReady(true);
        }}
      >
        <p className="form-heading">{t.contact.formHeading}</p>
        <p>{t.contact.formSub}</p>
        <div className="field-row">
          <label>
            {t.contact.nameLabel} <span>*</span>
            <input
              name="name"
              autoComplete="name"
              placeholder={t.contact.namePlaceholder}
              required
              maxLength={100}
            />
          </label>
          <label>
            {t.contact.companyLabel}
            <input
              name="company"
              autoComplete="organization"
              placeholder={t.contact.companyPlaceholder}
              maxLength={150}
            />
          </label>
        </div>
        <label>
          {t.contact.emailLabel} <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.contact.emailPlaceholder}
            required
            maxLength={150}
          />
        </label>
        <label>
          {t.contact.reqLabel} <span>*</span>
          <textarea
            name="requirements"
            placeholder={t.contact.reqPlaceholder}
            required
            rows={4}
            maxLength={2000}
          />
        </label>
        <button className="button" type="submit">
          {t.contact.submitBtn} <ArrowUpRight size={18} />
        </button>
        <p className="form-note">{t.contact.formNote}</p>
        {ready && (
          <output className="inquiry-ready">
            <strong>{t.contact.readyTitle}</strong>
            <p>{t.contact.readyDesc}</p>
            <a href={url} target="_blank" rel="noreferrer" className="button">
              {t.contact.readyBtn} <ArrowUpRight size={16} />
            </a>
          </output>
        )}
      </form>
    </section>
  );
}
const PRODUCT_DETAILS = {
  polyester: {
    title: 'Polyester Sewing Thread',
    subtitle:
      'Reliable 100% polyester sewing thread for a wide range of industrial and garment applications.',
    badge: 'POLYESTER THREAD',
    heading: 'Polyester Sewing Thread',
    brand: 'ODM/ OEM',
    counts: '20s–60s',
    example: '40s/2',
    packing: 'Standard or customized',
    finePrint: 'Custom thread counts, colors, winding lengths, and packaging are available for bulk orders.',
  },

  'close bag': {
    title: 'Bag Closing Thread',
    subtitle:
      'Strong sewing thread designed for bag closing and packaging applications.',
    badge: 'BAG CLOSING THREAD',
    heading: 'Bag Closing Thread',
    brand: 'ODM/ OEM',
    counts: '10s–20s',
    example: '120g bag closing thread',
    packing: 'Standard or customized',
    finePrint:
      'Custom colors, counts, lengths, and packaging are available for bulk orders.',
  },

  'greige-yarn': {
    title: '100% Polyester Yarn',
    subtitle:
      'Undyed or dyed yarn supplied for processing, and textile applications.',
    badge: 'POLYESTER YARN',
    heading: 'Yarn',
    brand: 'OEM/ OEM',
    counts: 'Available on request',
    example: 'Dyed yarn',
    packing: 'Standard or customized',
    finePrint:
      'Specifications, counts, colors after dyeing can be customized for bulk orders.',
  },

    cotton: {
      title: '100% Cotton Sewing Thread',
      subtitle:
        'Reliable 100% cotton sewing thread for a wide range of industrial and garment applications.',
      badge: 'COTTON THREAD',
      heading: '100% Cotton Sewing Thread',
      brand: 'ODM/ OEM',
      counts: '20s-60s',
      example: '40s/2 cotton sewing thread',
      packing: 'Standard or customized',
      finePrint:
        'Custom thread counts, colors, winding lengths, and packaging are available for bulk orders.',
    },
  };

const POLYESTER_SPECS = [
  {
    name: '3000Y',
    image: '3000Y.webp',
  },
  {
    name: '4000Y',
    image: '4000Y.webp',
  },
  {
    name: '5000Y',
    image: '5000Y.webp',
  },
  {
    name: '8000Y',
    image: 'collection.webp',
  },
];
export function ProductDetails({
  selected,
  onClose,
}: {
  selected: string | null;
  onClose: () => void;
}) {
  const { t } = useI18n();

  const selectedDef = COLOR_DEFS.find((c) => c.image === selected);
  const selectedName = selectedDef
    ? t.colors.names[selectedDef.key]
    : selected || '';

 const detail =
  selected === 'close bag'
    ? PRODUCT_DETAILS['close bag']
    : selected === 'greige-yarn'
      ? PRODUCT_DETAILS['greige-yarn']
      : selected === 'cotton'
        ? PRODUCT_DETAILS.cotton
        : PRODUCT_DETAILS.polyester;

  return (
    <Dialog
      open={!!selected}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="product-dialog">
        <DialogTitle>{detail.title}</DialogTitle>

        <DialogDescription>
          {detail.subtitle}
        </DialogDescription>
        {selected === 'collection' && (
  <div className="product-specs">
    <p className="eyebrow">Specifications</p>

    <div className="product-spec-grid">
      {POLYESTER_SPECS.map((spec) => (
        <div className="product-spec-card" key={spec.name}>
          <img
            src={'/images/' + spec.image}
            alt={spec.name + ' polyester sewing thread'}
            width={800}
            height={800}
          />
          <p>{spec.name}</p>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="detail-grid">
          <img
            width={1600}
            height={1200}
            src={'/images/' + (selected || 'white') + '.webp'}
            alt={detail.heading}
          />

          <div>
            <p className="eyebrow">
              {detail.badge}
            </p>

            <dl>
              <div>
                <dt>{t.productDialog.brandLabel}</dt>
                <dd>{detail.brand}</dd>
              </div>

              <div>
                <dt>{t.productDialog.countsLabel}</dt>
                <dd>{detail.counts}</dd>
              </div>

              <div>
                <dt>{t.productDialog.exampleLabel}</dt>
                <dd>{detail.example}</dd>
              </div>

              <div>
                <dt>{t.productDialog.packingLabel}</dt>
                <dd>{detail.packing}</dd>
              </div>
            </dl>

            <p className="fine-print">
              {detail.finePrint}
            </p>

            <a
              className="button"
              href={
                WA +
                '?text=' +
                encodeURIComponent(
                  t.productDialog.quoteWaMsg.replace(
                    '{color}',
                    selectedName,
                  ),
                )
              }
              target="_blank"
              rel="noreferrer"
            >
              {t.productDialog.quoteBtn}{' '}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}