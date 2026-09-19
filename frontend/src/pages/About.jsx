import { Link } from 'react-router-dom';

const team = [
  { name: 'Dr. Arthur Vance', role: 'Executive Director', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTEeAhBeFuGUduO10yWLYpGqkEc56zSHmC5fDW-AEpicDZFa_4PnylHyVpBHPGa7hlMQnfVuFDac5l35ngluA0Ub8cCdz4QKsyYHfgYVZGln57-00-xRMI0PHG6Y2Xh_o26q5fkft79JLXVHQxaCtnorcfFVNRQEgwtNNHE7lNZFo8fY1Dg-Dy1nPyNdYlPaYXaBO8tr7oP1RYJAAPGattro1rfdFLUhlMxfpfZ8KKNRAoQw7hoZAgzOoZc0kuGJoaUpKqhXHEiBb7' },
  { name: 'Dr. Sarah Jenkins', role: 'Head of Assessment', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_e1ohEhcJEWjBz3nFlI8dRWdsLb9oIdfOZ1rsnjcwXR1iZw8aanNJBB_JOyUAGLcAi8MbtaNMDP_criwsCx8u8jWE3HP3bAEbWh6uf5Qsg7PM9Oc8gnBVc2Ilo3LEdmWSi082YpVlkUNUU4lHVJip35n3IxgQ4pKr_3nry9202w9R6mZdvAnaj9NvItXRHqrXnQnAZPmLuNZ4Zkb8QdPzjE4xy7cUuknydMTp0Kzv0TqZJ9S0TZdFP_lJY1vrj41JNYlA27QqewPY' },
  { name: 'Marcus Chen', role: 'VP of Operations', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFXVY2tqnXzMu4jIpDAPVc1VEsGiO_9l-IwTEG8Q4ilteS_uhsm3axdpQDTJ7llrzCFVpzThcs0iN5JNE5E3w93iVlaSmuaSgLWd3h15IVWQuGfiKiOPY34iOPzM4Ps1H83YVrKNwgqYdW47hQpHjXATxUkFk89T_tqo066IeUp6Npj4bN0lkdq5EKEjM6euvIEAONK0aDV7iS_hW30WVbbaJK72K3ksfMC7sPDBNiT-idKFKPiW_k9HbG23Xq_vOB5V1YoIGrgkc6' },
  { name: 'Elena Rodriguez', role: 'Director of Partnerships', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNpLvE-3CVn2JiLsdPoyZpJpJnbCVjb7nG-esDd3SJnug8ivkShxBtkQeIz5Wgdyfy4GfaRuxjlKGKUoKwF8Cby7ofapFBferSB4oj7P6dZY1BelZo5MK760EC_SBC_Y4uvpNIpPYes8BxfPWv72s_EpB3rWg5HqFa3u1kSytO2ndT5SPFv9gPDhI_x9XPf5R_oaKu8fcvvLuxB7CR7-ZoEcvbco6CuzV1gf2NaalG5N4l2QZ759QV0kraeT24Pv0cAISbCEG2Hpww3Y' },
];

export default function About() {
  return (
    <>
      <section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-container/20 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 flex flex-col gap-md">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[18px]">info</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Who We Are</span>
            </div>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface">
              Empowering the Future Through Academic Excellence.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Parkar Education Alliance is dedicated to elevating educational standards, providing robust testing services, and fostering a community of lifelong learners. We believe in precision, integrity, and the transformative power of knowledge.
            </p>
          </div>
          <div className="md:col-span-5 relative mt-lg md:mt-0">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden ambient-shadow-md border border-outline-variant/20">
              <img alt="Students collaborating" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrFa7Tl-HgXmQMsZqVt0RGeHN1oT7YT60cgtSGaACo8V2_3reyrGYWFVFbIu_OOOXqyDF-dEeULatzh9CVopTTPgld07BFkskA9hmDCkUcYJCHxEcSUzp3rKx-b1VKmjrDUwhqbQnjPYf9ETHUxANh6L4JXDAX6PfeKslDfcKQ__LWISlhNAoSInox7H4bNuhdXzvgwYPwMLs8RZtwzWjkSFSUf-c4GDS7GyfAFwdCGBl1OjURAGCbP7_uqcP3Ly1BL2F1US76P383" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container py-xl border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Our Purpose</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">The driving forces behind our alliance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-7 bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-md">
                <span className="material-symbols-outlined text-[24px]">flag</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Our Mission</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To establish a global standard for educational assessment and support, ensuring every institution has the tools to accurately measure and encourage student potential. We build bridges between learning and certification.
              </p>
            </div>
            <div className="md:col-span-5 bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-center relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-tl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-md">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Our Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                A world where educational credentials are universally recognized, transparent, and reflective of true academic mastery, paving the way for seamless professional transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Core Values</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">The principles that guide our everyday operations and strategic decisions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            ['01.', 'Precision', 'In testing and evaluation, accuracy is non-negotiable. We employ rigorous methodologies to ensure every assessment is reliable and fair.'],
            ['02.', 'Integrity', 'We uphold the highest ethical standards, maintaining the confidentiality and security of all testing materials and candidate data.'],
            ['03.', 'Innovation', 'Education evolves, and so do we. We constantly explore new technologies to make testing more accessible, secure, and insightful.'],
          ].map(([num, title, desc]) => (
            <div key={title} className="bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow border-t-4 border-t-primary">
              <div className="text-primary font-headline-md text-headline-md mb-sm">{num}</div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">{title}</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container py-xl border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Leadership Team</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Guided by experienced professionals dedicated to academic excellence.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {team.map((p) => (
              <div key={p.name} className="flex flex-col items-center text-center gap-sm group">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-sm border-4 border-surface-container-high group-hover:border-primary-container transition-colors duration-300">
                  <img alt={p.name} className="object-cover w-full h-full" src={p.img} />
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-on-surface">{p.name}</h4>
                <p className="font-body-sm text-body-sm text-primary">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="bg-surface-container-highest rounded-3xl p-lg md:p-xl flex flex-col md:flex-row items-center justify-between gap-lg relative overflow-hidden border border-outline-variant/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-bl-[100px] opacity-10 pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Join the Alliance Today</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">Partner with Parkar Education Alliance and be part of a movement shaping the future of education worldwide.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 text-center">
                Become a Partner
              </Link>
              <Link to="/contact" className="bg-surface-container-lowest text-on-surface font-body-md text-body-md px-lg py-sm rounded-full border border-outline-variant/50 hover:bg-surface-variant transition-all active:scale-95 duration-150 text-center">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative z-10 hidden md:block">
            <div className="w-48 h-48 bg-surface-container-lowest rounded-full border-8 border-surface-container-highest flex items-center justify-center ambient-shadow-md">
              <span className="material-symbols-outlined text-primary text-[80px]">groups</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
