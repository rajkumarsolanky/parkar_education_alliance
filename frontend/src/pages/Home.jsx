import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-br from-primary-container/20 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-10 -z-10 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-container/30 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 flex flex-col gap-md z-10">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[18px]">school</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Advancing Education Together</span>
            </div>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface">
              Empowering Institutions <br className="hidden md:block" />
              Through <span className="text-primary relative inline-block">
                Innovation
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-container opacity-50" preserveAspectRatio="none" viewBox="0 0 100 10"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Parkar Education Alliance connects leading institutions, providing comprehensive testing services, standardized curriculum development, and collaborative networks to shape the future of learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-sm">
              <Link to="/testing-services" className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md hover:shadow-lg transition-all active:scale-95 duration-150 flex items-center justify-center gap-2">
                Explore Services
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link to="/contact" className="bg-surface-container text-on-surface font-body-md text-body-md px-lg py-sm rounded-full border border-outline-variant/50 hover:bg-surface-variant transition-all active:scale-95 duration-150 flex items-center justify-center">
                Partner With Us
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 relative mt-lg md:mt-0 animate-float">
            <div className="relative rounded-2xl overflow-hidden ambient-shadow-md border border-outline-variant/20 bg-surface-container-lowest aspect-square md:aspect-[4/5]">
              <img alt="Students collaborating in a modern educational environment" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5MMI59zx5d3_37BDohk_CwawF4dIeW__FlzrD6dgdthkqDJNb0tNmUVkn_zOGTITkZ_3TDbrAEvv5_A5KN2-oQIh93PXNg78sgx04877rqyVjR1T5aBI165pREkDgE4PtcuXntG0O2BWKuVpvXDf0mWqkid1_dGSTsUGgW4XoAbK_2iFMGkV8H_JRtch6_pnyC0NFZlFquKQe3D-ygIGRuYIMxXB-hjqEU0vrn57pDVjII7g7QnF1574MRB4trAodPjBDvzbaIqGK" />
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-md rounded-xl ambient-shadow-md border border-outline-variant/30 hidden md:flex items-center gap-4">
                <div className="bg-primary-container/20 p-sm rounded-lg">
                  <span className="material-symbols-outlined text-primary text-[32px]">verified</span>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-on-surface">500+</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Institutions Partnered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface-container py-lg border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-gutter divide-x divide-outline-variant/30">
            {[
              ['1M+', 'Students Assessed'],
              ['50+', 'Standardized Curriculums'],
              ['98%', 'Partner Satisfaction'],
              ['15', 'Years of Excellence'],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center text-center px-sm">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">{num}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="text-center max-w-2xl mx-auto mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Comprehensive Educational Solutions</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Discover our integrated ecosystem designed to elevate academic standards, streamline assessments, and foster institutional growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] gap-md">
          <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-primary text-[24px]">quiz</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Standardized Testing Systems</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">Robust, secure, and scalable assessment platforms designed for accuracy and insightful analytics. We manage the entire testing lifecycle.</p>
            </div>
            <Link to="/testing-services" className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-primary-fixed-variant transition-colors mt-auto">
              LEARN MORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="md:col-span-4 bg-secondary-container/20 rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Curriculum Design</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Modern, compliant curricula tailored for diverse educational needs.</p>
            </div>
          </div>
          <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="bg-surface-container/30 w-12 h-12 rounded-lg flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-tertiary text-[24px]">groups</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Educator Training</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Professional development workshops and certification programs.</p>
            </div>
          </div>
          <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-shadow group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-transparent to-transparent -z-10"></div>
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-primary text-[24px]">analytics</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Institutional Analytics &amp; Reporting</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">Data-driven insights to help schools track performance, identify learning gaps, and optimize operational efficiency across all levels.</p>
            </div>
            <Link to="/testing-services" className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-primary-fixed-variant transition-colors mt-auto">
              LEARN MORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="bg-surface-container-highest rounded-3xl p-lg md:p-xl flex flex-col md:flex-row items-center justify-between gap-lg relative overflow-hidden border border-outline-variant/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-bl-[100px] opacity-10 pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Ready to Elevate Your Institution?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">Join the Parkar Education Alliance network today. Access our testing frameworks, curriculum resources, and collaborative community to drive academic excellence.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 text-center">
                Become a Partner
              </Link>
              <Link to="/contact" className="bg-surface-container-lowest text-on-surface font-body-md text-body-md px-lg py-sm rounded-full border border-outline-variant/50 hover:bg-surface-variant transition-all active:scale-95 duration-150 text-center">
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="relative z-10 hidden md:block">
            <div className="w-48 h-48 bg-surface-container-lowest rounded-full border-8 border-surface-container-highest flex items-center justify-center ambient-shadow-md">
              <span className="material-symbols-outlined text-primary text-[80px]">handshake</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
