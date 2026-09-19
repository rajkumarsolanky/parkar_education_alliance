import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminAxios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [slips, setSlips] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // slip id being acted on

  // Reject modal state
  const [rejectModal, setRejectModal] = useState({ open: false, slipId: null });
  const [rejectReason, setRejectReason] = useState('');

  // Image preview modal
  const [previewImg, setPreviewImg] = useState(null);

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin_user') || '{}');

  // ──────── Fetch data ────────
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

  // ──────── Actions ────────
  async function handleApprove(slipId) {
    setActionLoading(slipId);
    try {
      await adminApi.put(`/admin/slips/${slipId}/approve`);
      fetchStats();
      fetchSlips();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject() {
    if (!rejectReason.trim()) return;
    setActionLoading(rejectModal.slipId);
    try {
      await adminApi.put(`/admin/slips/${rejectModal.slipId}/reject`, { reason: rejectReason });
      setRejectModal({ open: false, slipId: null });
      setRejectReason('');
      fetchStats();
      fetchSlips();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  }

  // ──────── Helpers ────────
  const statusBadge = (status) => {
    const map = {
      pending: { bg: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: 'schedule', label: 'Pending' },
      approved: { bg: 'bg-green-100 text-green-800 border-green-300', icon: 'check_circle', label: 'Approved' },
      rejected: { bg: 'bg-red-100 text-red-800 border-red-300', icon: 'cancel', label: 'Rejected' },
    };
    const s = map[status] || map.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border ${s.bg}`}>
        <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
        {s.label}
      </span>
    );
  };

  const filterTabs = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'pending', label: 'Pending', count: stats.pending },
    { key: 'approved', label: 'Approved', count: stats.approved },
    { key: 'rejected', label: 'Rejected', count: stats.rejected },
  ];

  return (
    <div className="min-h-screen bg-surface">

      {/* ──────── Admin Top Bar ──────── */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[28px]">admin_panel_settings</span>
            <span className="font-headline-md text-headline-md font-bold text-on-surface">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:block">
              {admin.full_name || admin.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-surface-container text-on-surface font-label-caps text-label-caps px-md py-sm rounded-full border border-outline-variant hover:bg-surface-variant transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">

        {/* ──────── Stats Cards ──────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-lg">
          {[
            { label: 'Total Slips', value: stats.total, icon: 'receipt_long', color: 'text-on-surface', bg: 'bg-surface-container' },
            { label: 'Pending', value: stats.pending, icon: 'schedule', color: 'text-yellow-700', bg: 'bg-yellow-50' },
            { label: 'Approved', value: stats.approved, icon: 'check_circle', color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Rejected', value: stats.rejected, icon: 'cancel', color: 'text-red-700', bg: 'bg-red-50' },
          ].map((card) => (
            <div key={card.label} className="bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/30 ambient-shadow-sm flex items-center gap-3">
              <div className={`${card.bg} w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">{card.value}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ──────── Filter Tabs ──────── */}
        <div className="flex gap-2 mb-md overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-md py-sm rounded-full font-body-sm text-body-sm font-semibold transition-all whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
              }`}
            >
              {tab.label}
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                filter === tab.key ? 'bg-on-primary/20 text-on-primary' : 'bg-outline-variant/20 text-on-surface-variant'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ──────── Slips Table ──────── */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 ambient-shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-xl">
              <p className="font-body-md text-body-md text-on-surface-variant">Loading slips...</p>
            </div>
          ) : slips.length === 0 ? (
            <div className="text-center py-xl flex flex-col items-center gap-sm">
              <span className="material-symbols-outlined text-outline text-[48px]">inbox</span>
              <p className="font-body-md text-body-md text-on-surface-variant">No slips found for this filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/30">
                    <th className="p-md font-semibold text-on-surface">Student</th>
                    <th className="p-md font-semibold text-on-surface">CNIC</th>
                    <th className="p-md font-semibold text-on-surface">Exam</th>
                    <th className="p-md font-semibold text-on-surface">Date</th>
                    <th className="p-md font-semibold text-on-surface text-right">Fee (PKR)</th>
                    <th className="p-md font-semibold text-on-surface text-center">Slip</th>
                    <th className="p-md font-semibold text-on-surface text-center">Status</th>
                    <th className="p-md font-semibold text-on-surface text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {slips.map((slip) => (
                    <tr key={slip.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-md">
                        <span className="font-semibold text-on-surface block">{slip.full_name}</span>
                        <span className="text-on-surface-variant text-[12px]">{slip.mobile}</span>
                      </td>
                      <td className="p-md font-mono text-on-surface-variant">{slip.cnic}</td>
                      <td className="p-md text-on-surface font-semibold">{slip.exam_name}</td>
                      <td className="p-md text-on-surface-variant">
                        {slip.exam_date ? new Date(slip.exam_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="p-md text-on-surface font-semibold text-right">
                        {slip.fee_amount ? `Rs. ${Number(slip.fee_amount).toLocaleString()}` : '—'}
                      </td>
                      <td className="p-md text-center">
                        {slip.fee_slip_url ? (
                          <button
                            onClick={() => setPreviewImg(slip.fee_slip_url)}
                            className="inline-flex items-center gap-1 text-primary hover:text-on-primary-fixed-variant font-semibold text-[12px] bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">image</span>
                            View
                          </button>
                        ) : (
                          <span className="text-outline text-[12px]">No file</span>
                        )}
                      </td>
                      <td className="p-md text-center">{statusBadge(slip.status)}</td>
                      <td className="p-md text-center">
                        {slip.status === 'pending' ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(slip.id)}
                              disabled={actionLoading === slip.id}
                              className="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-green-700 transition-colors active:scale-95 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">check</span>
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectModal({ open: true, slipId: slip.id })}
                              disabled={actionLoading === slip.id}
                              className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-red-700 transition-colors active:scale-95 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                              Reject
                            </button>
                          </div>
                        ) : slip.status === 'rejected' && slip.rejection_reason ? (
                          <span className="text-[12px] text-red-600 italic max-w-[150px] block truncate" title={slip.rejection_reason}>
                            {slip.rejection_reason}
                          </span>
                        ) : (
                          <span className="text-outline text-[12px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ──────── Reject Reason Modal ──────── */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center z-50 p-margin-mobile">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/30 p-md md:p-lg flex flex-col gap-md shadow-lg">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-error text-[36px] bg-error-container/20 p-sm rounded-xl shrink-0">block</span>
              <div>
                <h3 className="font-headline-md text-body-lg font-bold text-on-surface">Reject Slip</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Please provide a reason for rejection. The student will see this reason.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="reject-reason" className="font-body-sm text-body-sm font-semibold text-on-surface">Rejection Reason *</label>
              <textarea
                id="reject-reason"
                rows="3"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Fee slip image is unclear, amount mismatch..."
                className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 border-t border-outline-variant/20 pt-md">
              <button
                onClick={() => { setRejectModal({ open: false, slipId: null }); setRejectReason(''); }}
                className="bg-surface-container text-on-surface font-body-md text-body-md px-md py-sm rounded-full border border-outline-variant/50 hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="bg-error text-on-error font-body-md text-body-md px-md py-sm rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────── Image Preview Modal ──────── */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-on-surface/70 backdrop-blur-sm flex items-center justify-center z-50 p-margin-mobile cursor-pointer"
          onClick={() => setPreviewImg(null)}
        >
          <div className="relative max-w-2xl max-h-[80vh] w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-md border-b border-outline-variant/30">
              <h3 className="font-body-md text-body-md font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">receipt</span>
                Fee Slip Preview
              </h3>
              <button onClick={() => setPreviewImg(null)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-md flex items-center justify-center bg-surface-container min-h-[300px]">
              <img
                src={previewImg}
                alt="Fee slip"
                className="max-w-full max-h-[60vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
