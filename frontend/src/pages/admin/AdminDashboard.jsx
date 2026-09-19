import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminAxios';
import AdmitCard from '../../components/AdmitCard';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [slips, setSlips] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedAdmitCard, setSelectedAdmitCard] = useState(null);

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin_user') || '{}');

  useEffect(() => {
    fetchStats();
    fetchSlips();
  }, [filter]);

  async function fetchStats() {
    try {
      const res = await adminApi.get('/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    }
  }

  async function fetchSlips() {
    setLoading(true);
    try {
      const url = filter === 'all' ? '/admin/slips' : `/admin/slips?status=${filter}`;
      const res = await adminApi.get(url);
      setSlips(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  }

  function openCandidateAdmitCard(slip) {
    const cardData = {
      seatNo: slip?.seat_no || `PEA-2026-${(slip?.id || 1).toString().padStart(4, '0')}`,
      applicationId: slip?.application_id || `2469${(slip?.user_id || 1).toString().padStart(2, '0')}`,
      fullName: slip?.full_name || 'Candidate',
      fatherName: slip?.father_name || 'Ghulam Rasool',
      surname: slip?.surname || 'Parkar',
      cnic: slip?.cnic || '44301-XXXXXXX-X',
      testDate: slip?.exam_date ? new Date(slip.exam_date).toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + ' 05:00 PM' : 'Sunday, 27-September-2026 05:00 PM',
      testVenue: slip?.test_venue || 'Public School / Govt Degree College, Nagarparkar',
      photoUrl: null
    };
    setSelectedAdmitCard(cardData);
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      {/* ──────── Header ──────── */}
      <header className="bg-[#173a5e] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-emerald-400">admin_panel_settings</span>
            <div>
              <h1 className="font-headline-sm text-body-lg font-bold leading-tight tracking-wide">PEA Admin Portal</h1>
              <p className="text-[11px] text-emerald-200">Candidates & Admit Cards Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[13px] font-bold">{admin.full_name || admin.username || 'Administrator'}</span>
              <span className="text-[11px] text-emerald-200">Super Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ──────── Main Content ──────── */}
      <main className="max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-lg flex-1">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-sm font-bold text-on-surface">Candidate Admit Cards & Roll No Slips</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Manage Pre-Entry Test candidate registrations, seat numbers, and printable slips</p>
          </div>
          <button
            onClick={() => { fetchStats(); fetchSlips(); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#173a5e] text-white hover:bg-[#102a45] rounded-xl text-xs font-bold shadow transition-all active:scale-95 w-max"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Refresh List
          </button>
        </div>

        {/* ──────── Stats Cards ──────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          <div className="bg-surface-container-lowest p-md rounded-2xl border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Candidates</p>
              <p className="text-2xl font-black text-slate-900">{stats.total}</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-2xl border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Slips Issued</p>
              <p className="text-2xl font-black text-emerald-700">{stats.approved || stats.total}</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-2xl border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">event</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Test Date</p>
              <p className="text-sm font-black text-purple-900">27-Sep-2026</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-2xl border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Venue</p>
              <p className="text-xs font-bold text-amber-900 truncate max-w-[130px]">Nagarparkar Centre</p>
            </div>
          </div>
        </div>

        {/* ──────── Candidates Table ──────── */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-md md:p-lg shadow-sm">
          <div className="flex items-center justify-between pb-md mb-md border-b border-outline-variant/20">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#173a5e] text-[22px]">badge</span>
              Registered Candidates List ({slips.length})
            </h3>
          </div>

          {loading ? (
            <div className="py-xl flex flex-col items-center justify-center gap-2 text-slate-400">
              <div className="w-8 h-8 border-4 border-[#173a5e] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold">Loading candidates...</p>
            </div>
          ) : slips.length === 0 ? (
            <div className="py-xl flex flex-col items-center justify-center gap-2 text-center text-slate-400">
              <span className="material-symbols-outlined text-5xl text-slate-300">inbox</span>
              <p className="text-sm font-semibold text-slate-600">No candidate registered yet</p>
            </div>
          ) : (
            <>
              {/* Desktop Table (md and above) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-3">Candidate & Father Name</th>
                      <th className="p-3">Surname</th>
                      <th className="p-3">CNIC / Mobile</th>
                      <th className="p-3">Seat No</th>
                      <th className="p-3">App ID</th>
                      <th className="p-3">Test Date & Venue</th>
                      <th className="p-3 text-center">Admit Card</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {slips.map((slip) => (
                      <tr key={slip.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 text-sm block">{slip.full_name}</span>
                          <span className="text-slate-500 text-[11px]">S/D/O {slip.father_name || '—'}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800 uppercase">
                          {slip.surname || '—'}
                        </td>
                        <td className="p-3">
                          <span className="font-mono font-bold text-slate-900 block">{slip.cnic}</span>
                          <span className="text-slate-500 text-[11px]">{slip.mobile}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-mono font-extrabold text-[#173a5e] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                            {slip.seat_no || `PEA-2026-${slip.id.toString().padStart(4, '0')}`}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-700">
                          {slip.application_id || `2469${slip.user_id || slip.id}`}
                        </td>
                        <td className="p-3 text-slate-700">
                          <span className="font-bold block">27-Sep-2026 05:00 PM</span>
                          <span className="text-[11px] text-slate-500">{slip.test_venue || 'Public School Nagarparkar'}</span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => openCandidateAdmitCard(slip)}
                            className="inline-flex items-center gap-1.5 bg-[#173a5e] hover:bg-[#102a45] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[15px]">print</span>
                            Print Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards (small screens) */}
              <div className="flex flex-col gap-3 md:hidden">
                {slips.map((slip) => (
                  <div key={slip.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                    {/* Top Row: Name + Print Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-black text-slate-900 text-base leading-tight">{slip.full_name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">S/D/O {slip.father_name || '—'}</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5 uppercase tracking-wide">Surname: {slip.surname || '—'}</p>
                      </div>
                      <button
                        onClick={() => openCandidateAdmitCard(slip)}
                        className="shrink-0 inline-flex flex-col items-center gap-0.5 bg-[#173a5e] hover:bg-[#102a45] text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow-md transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">print</span>
                        Print Slip
                      </button>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CNIC</p>
                        <p className="font-mono font-bold text-slate-900 mt-0.5 text-[11px]">{slip.cnic}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mobile</p>
                        <p className="font-semibold text-slate-900 mt-0.5 text-[11px]">{slip.mobile}</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Seat No</p>
                        <p className="font-mono font-extrabold text-[#173a5e] mt-0.5 text-[12px]">
                          {slip.seat_no || `PEA-2026-${slip.id.toString().padStart(4, '0')}`}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">App ID</p>
                        <p className="font-mono font-bold text-slate-700 mt-0.5 text-[11px]">
                          {slip.application_id || `2469${slip.user_id || slip.id}`}
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[16px]">event</span>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Test Date & Venue</p>
                        <p className="text-[11px] font-bold text-emerald-900">27-Sep-2026 05:00 PM</p>
                        <p className="text-[10px] text-emerald-700">{slip.test_venue || 'Public School Nagarparkar'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ──────── Official Admit Card Modal ──────── */}
      {selectedAdmitCard && (
        <AdmitCard
          data={selectedAdmitCard}
          onClose={() => setSelectedAdmitCard(null)}
        />
      )}
    </div>
  );
}
