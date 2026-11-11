import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import { COMPANY } from '../constants/index.js';

const DETAILS = [
  { icon: MapPin, label: 'Studio Address', value: COMPANY.address },
  { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Clock, label: 'Working Hours', value: 'Sat–Thu, 10:00 AM – 7:00 PM' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s Talk About Your Space"
        subtitle="Book a free consultation — at our studio, your site, or over a call. We reply within one business day."
      />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Details */}
          <Reveal className="space-y-5">
            {DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-ink-900 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-sm font-medium text-cream-50 transition hover:text-brand-400">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-cream-50">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-white/5">
              <iframe
                title="Studio location"
                src="https://www.google.com/maps?q=East+Kazipara,+Mirpur,+Dhaka&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
