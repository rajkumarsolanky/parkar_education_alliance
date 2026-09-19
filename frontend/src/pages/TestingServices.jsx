import { useState } from 'react';

export default function TestingServices() {
  const [candidateId, setCandidateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const mockDb = {
    'PEA-2026-984': { name: 'Muhammad Ali', test: 'Secondary Academic Level 1', score: '88%', status: 'Verified', date: 'June 15, 2026' },
    'PEA-2026-102': { name: 'Ayesha Khan', test: 'Primary Foundation Level 3', score: '94%', status: 'Verified', date: 'May 20, 2026' },
    'PEA-2026-441': { name: 'Zainab Bibi', test: 'Professional Educator Assessment', score: '81%', status: 'Verified', date: 'April 02, 2026' }
  };

  const services = [
    {
      icon: 'foundation',
      title: 'Primary Foundation Assessment',
      desc: 'Formative assessments focusing on cognitive development, basic numeracy, literacy, and logical reasoning for elementary grades.'
    },
    {
      icon: 'school',
      title: 'Secondary Standardized Tests',
      desc: 'Rigorous subject-specific examinations designed to benchmark academic aptitude and readiness for high school pathways.'
    },
    {
      icon: 'account_tree',
      title: 'Curriculum Alignment Analysis',
      desc: 'Mapping of institutional curricula against national guidelines to align educational targets and output benchmarks.'
    },
    {
      icon: 'workspace_premium',
      title: 'Professional Educator Certification',
      desc: 'Advanced testing modules to assess and certify teacher competencies, teaching methodologies, and classroom management.'
    },
    {
      icon: 'insights',
      title: 'Institutional Analytics',
      desc: 'Deep-dive reports for school administrators, tracking class-level performance, and outlining actionable improvement vectors.'
    },
    {
      icon: 'fact_check',
      title: 'Secure Result Verification',
      desc: 'Tamper-proof credential verification services allowing instant validation of candidate certificates and scores globally.'
    }
  ];

  function handleVerify(e) {
    e.preventDefault();
    if (!candidateId.trim()) return;
    setLoading(true);
    setError('');
    setVerificationResult(null);

    setTimeout(() => {
      setLoading(false);
      const match = mockDb[candidateId.trim().toUpperCase()];
      if (match) {
        setVerificationResult(match);
      } else {
        setError('No candidate found with this ID. Please check the ID and try again (e.g. Try: PEA-2026-984).');
      }
    }, 800);
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-container/20 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-3xl flex flex-col gap-md">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[18px]">quiz</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Testing & Assessment</span>
          </div>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface">
            Secure, Scalable & High-Fidelity Evaluations.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            From early childhood foundational evaluations to professional teacher certifications, Parkar provides state-of-the-art diagnostic testing frameworks.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((svc) => (
            <div key={svc.title} className="bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm hover:ambient-shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-md transition-colors group-hover:bg-primary group-hover:text-on-primary duration-300">
                  <span className="material-symbols-outlined text-[24px]">{svc.icon}</span>
                </div>
                <h3 className="font-headline-md text-body-lg font-semibold text-on-surface mb-sm">{svc.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Verification Tool */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-surface-container rounded-3xl p-lg md:p-xl border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-bl-[100px] opacity-10 pointer-events-none"></div>
          
          <div className="lg:col-span-6 flex flex-col gap-sm relative z-10">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-sm py-xs rounded-full w-max border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[18px]">assignment</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Instant Validation</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Credential Verification Portal</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Quickly verify student marks sheets, teacher certificates, and evaluation results. Enter the official Candidate ID printed on the certificates.
            </p>
            <div className="mt-sm p-sm bg-surface-container-lowest rounded-xl border border-outline-variant/20 max-w-sm">
              <p className="font-body-sm text-body-sm font-semibold text-primary">Mock IDs for Testing:</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">`PEA-2026-984` (Muhammad Ali)</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">`PEA-2026-102` (Ayesha Khan)</p>
            </div>
          </div>

          <div className="lg:col-span-6 w-full relative z-10">
            <div className="bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/30 shadow-md">
              <form onSubmit={handleVerify} className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <label htmlFor="cid" className="font-body-sm text-body-sm font-semibold text-on-surface">Candidate ID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="cid"
                      value={candidateId}
                      onChange={(e) => setCandidateId(e.target.value)}
                      placeholder="e.g. PEA-2026-984"
                      className="flex-grow bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-on-primary font-body-md text-body-md px-md py-sm rounded-xl hover:bg-on-primary-fixed-variant disabled:bg-primary/50 transition-all flex items-center justify-center gap-1 active:scale-95 duration-150"
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {verificationResult && (
                  <div className="p-md bg-primary-container/10 border border-primary-container/40 rounded-xl flex flex-col gap-sm animate-fade-in">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span className="material-symbols-outlined">workspace_premium</span>
                      <span className="font-body-md text-body-md">Official Certificate Record Verified</span>
                    </div>
                    <div className="grid grid-cols-2 gap-sm border-t border-outline-variant/20 pt-sm">
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">Candidate Name:</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">{verificationResult.name}</span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">Assigned Test:</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">{verificationResult.test}</span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">Academic Score:</span>
                        <span className="font-body-md text-body-md font-semibold text-primary">{verificationResult.score}</span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">Verification Date:</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">{verificationResult.date}</span>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
