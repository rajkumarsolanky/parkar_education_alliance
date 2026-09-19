import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'How does an institution partner with Parkar Education Alliance?',
      a: 'Institutions can initiate partnership by filling out our inquiry form or contacting our regional office. We will schedule a consultation to assess requirements and establish terms.'
    },
    {
      q: 'What testing formats do you support?',
      a: 'We support both computer-based testing (CBT) and traditional paper-based testing (PBT), complete with secure registration, invigilation guidelines, and rapid results processing.'
    },
    {
      q: 'Are your curricula compliant with national standards?',
      a: 'Yes, all Parkar curricula are fully aligned with national educational frameworks, optimized for modern pedagogical requirements, and regularly updated.'
    },
    {
      q: 'Can students access their test results directly?',
      a: 'Students can check results and credentials by logging into their Profile portal or using the Verification service on our Testing Services page.'
    }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.contactInfo || !formData.message) return;
    setSubmitted(true);
  }

  function toggleFaq(index) {
    setActiveFaq(activeFaq === index ? null : index);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-container/20 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-3xl flex flex-col gap-md">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Get In Touch</span>
          </div>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface">
            We'd Love to Hear From You.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Have questions about our testing solutions, partnership framework, or training modules? Our team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Form & Details Section */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-xl gap-md animate-fade-in">
                <span className="material-symbols-outlined text-primary text-[72px]">check_circle</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Message Sent Successfully!</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Thank you, <strong>{formData.name}</strong>. Our team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', contactInfo: '', subject: '', message: '' });
                  }}
                  className="mt-sm bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant transition-all active:scale-95 duration-150"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Send Inquiry</h2>
                
                <div className="flex flex-col gap-xs">
                  <label htmlFor="name" className="font-body-sm text-body-sm font-semibold text-on-surface">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-xs">
                  <label htmlFor="contactInfo" className="font-body-sm text-body-sm font-semibold text-on-surface">Email / CNIC / Mobile *</label>
                  <input
                    type="text"
                    id="contactInfo"
                    required
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    placeholder="e.g. name@school.edu or +92 300 1234567"
                    className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-xs">
                  <label htmlFor="subject" className="font-body-sm text-body-sm font-semibold text-on-surface">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Inquiry topic"
                    className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-xs">
                  <label htmlFor="message" className="font-body-sm text-body-sm font-semibold text-on-surface">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your institution?"
                    className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-xs bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 w-max"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-md">
            
            {/* Location Card */}
            <div className="bg-surface-container-low rounded-2xl p-md border border-outline-variant/20 flex gap-4">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div>
                <h4 className="font-headline-md text-body-lg font-semibold text-on-surface">Head Office</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  14-A, Block G, Gulberg III, Lahore, Punjab, Pakistan
                </p>
                <div className="mt-sm inline-flex items-center gap-1 text-primary hover:text-on-primary-fixed-variant text-body-sm font-semibold cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span> Find on Map
                </div>
              </div>
            </div>

            {/* Support Calls */}
            <div className="bg-surface-container-low rounded-2xl p-md border border-outline-variant/20 flex gap-4">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <div>
                <h4 className="font-headline-md text-body-lg font-semibold text-on-surface">Call Us</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  +92 (42) 111-732-732 <br />
                  Mon - Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-surface-container-low rounded-2xl p-md border border-outline-variant/20 flex gap-4">
              <div className="bg-tertiary/10 w-12 h-12 rounded-xl flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div>
                <h4 className="font-headline-md text-body-lg font-semibold text-on-surface">Email Support</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  info@parkaredu.org <br />
                  partnerships@parkaredu.org
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-container py-xl mt-xl border-y border-outline-variant/20">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-lg">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30 mb-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">help</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Frequently Asked Questions</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Common Queries</h2>
          </div>

          <div className="flex flex-col gap-sm">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left p-md font-body-md text-body-md font-semibold text-on-surface hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined transition-transform duration-300 font-bold" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      keyboard_arrow_down
                    </span>
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '200px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-md pb-md font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/10 pt-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
