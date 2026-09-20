import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdmitCard from '../components/AdmitCard';

export default function AdmitCardPage() {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    try {
      const storedCard = localStorage.getItem('pea_admit_card');
      if (storedCard) {
        setCardData(JSON.parse(storedCard));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!cardData) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 text-center shadow-md">
          <h1 className="text-xl font-bold text-slate-900">Admit Card not found</h1>
          <p className="mt-2 text-sm text-slate-600">Please open the Admit Card from your profile.</p>
          <Link to="/profile" className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold">
            Back to Profile
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-6 print:bg-white print:py-0">
      <AdmitCard
        data={cardData}
        standalone
        onClose={() => window.close()}
      />
    </main>
  );
}
