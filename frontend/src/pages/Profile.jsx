import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, edit, security, settings, slips
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ── Slips state ──
  const [slips, setSlips] = useState([]);
  const [slipsLoading, setSlipsLoading] = useState(false);
  const [slipForm, setSlipForm] = useState({ exam_name: '', exam_date: '', fee_amount: '' });
  const [slipFile, setSlipFile] = useState(null);
  const [slipSubmitting, setSlipSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get('/profile');
        setUser(response.data);
        setFullName(response.data.full_name || '');
        setMobile(response.data.mobile || '');
        // Format YYYY-MM-DD for date input
        if (response.data.dob) {
          setDob(response.data.dob.substring(0, 10));
        }
        setCity(response.data.city || '');
        setAddress(response.data.address || '');
      } catch (err) {
        console.error(err);
        setError('Session expired or unauthorized. Please log in.');
        localStorage.removeItem('pea_token');
        localStorage.removeItem('pea_user');
        window.dispatchEvent(new Event('auth-change'));
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [navigate]);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const response = await api.put('/profile/update', {
        full_name: fullName,
        mobile,
        dob,
        city,
        address
      });
      setUser(response.data);
      localStorage.setItem('pea_user', JSON.stringify(response.data));
      window.dispatchEvent(new Event('auth-change'));
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to update profile.');
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await api.put('/profile/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      setCurrentPassword('');
      setNewPassword('');
      setSuccessMsg('Password updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to change password.');
    }
  }

  async function handleDeleteAccount() {
    setError('');
    try {
      await api.delete('/profile/delete');
      localStorage.removeItem('pea_token');
      localStorage.removeItem('pea_user');
      window.dispatchEvent(new Event('auth-change'));
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Failed to delete account.');
      setShowDeleteModal(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('pea_token');
    localStorage.removeItem('pea_user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  }

  // ── Slips functions ──
  async function fetchSlips() {
    setSlipsLoading(true);
    try {
      const res = await api.get('/slips');
      setSlips(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSlipsLoading(false);
    }
  }

  async function handleSubmitSlip(e) {
    e.preventDefault();
    if (!slipForm.exam_name) return;
    setSlipSubmitting(true);
    setError('');
    setSuccessMsg('');
    try {
      const formData = new FormData();
      formData.append('exam_name', slipForm.exam_name);
      if (slipForm.exam_date) formData.append('exam_date', slipForm.exam_date);
      if (slipForm.fee_amount) formData.append('fee_amount', slipForm.fee_amount);
      if (slipFile) formData.append('fee_slip', slipFile);

      await api.post('/slips', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSlipForm({ exam_name: '', exam_date: '', fee_amount: '' });
      setSlipFile(null);
      setSuccessMsg('Slip submitted successfully! Admin will review it soon.');
      fetchSlips();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit slip.');
    } finally {
      setSlipSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <p className="font-body-lg text-body-lg text-on-surface-variant">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 flex flex-col gap-md">
          
          {/* User Brief Card */}
          <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/30 text-center flex flex-col items-center gap-sm">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-headline-lg border-2 border-primary/20">
                {fullName ? fullName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'U'}
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-surface cursor-pointer shadow hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
            <div>
              <h3 className="font-body-lg text-body-lg font-bold text-on-surface">{fullName}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Candidate Account</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-xs inline-flex items-center gap-1 text-error hover:text-error/80 font-body-sm text-body-sm font-semibold cursor-pointer border border-error/20 px-4 py-1.5 rounded-full hover:bg-error-container/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </button>
          </div>

          {/* Navigation Links */}
          <div className="bg-surface-container rounded-2xl p-sm border border-outline-variant/30 flex flex-col gap-1">
            {[
              ['dashboard', 'Dashboard', 'dashboard'],
              ['slips', 'My Slips', 'receipt_long'],
              ['edit', 'Personal Details', 'edit'],
              ['security', 'Security Settings', 'settings'],
              ['settings', 'Danger Zone', 'warning']
            ].map(([tabId, label, iconName]) => (
              <button
                key={tabId}
                onClick={() => {
                  setActiveTab(tabId);
                  setError('');
                  setSuccessMsg('');
                  if (tabId === 'slips') fetchSlips();
                }}
                className={`flex items-center gap-3 px-md py-3 rounded-xl font-body-md text-body-md text-left transition-all ${
                  activeTab === tabId
                    ? 'bg-primary text-on-primary font-semibold shadow-md'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{iconName}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-9 bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-sm min-h-[400px] flex flex-col justify-between">
          
          <div>
            {/* Success & Error Alert Banners */}
            {successMsg && (
              <div className="mb-md p-sm bg-primary/10 text-primary rounded-xl border border-primary-container/40 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">task_alt</span>
                <span>{successMsg}</span>
              </div>
            )}
            {error && (
              <div className="mb-md p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Candidate Dashboard</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Overview of your assessments, results, and curriculum updates.</p>
                </div>

                {/* Score Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  <div className="bg-surface-container rounded-xl p-md border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[36px] bg-primary/10 p-sm rounded-lg">workspace_premium</span>
                    <div>
                      <h4 className="font-headline-md text-body-lg font-bold text-on-surface">Secondary Level 1</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Active Test Assessment</p>
                    </div>
                  </div>
                  <div className="bg-surface-container rounded-xl p-md border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[36px] bg-secondary/10 p-sm rounded-lg">grade</span>
                    <div>
                      <h4 className="font-headline-md text-body-lg font-bold text-on-surface">88.5% Average</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Evaluation Rank</p>
                    </div>
                  </div>
                  <div className="bg-surface-container rounded-xl p-md border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[36px] bg-tertiary/10 p-sm rounded-lg">schedule</span>
                    <div>
                      <h4 className="font-headline-md text-body-lg font-bold text-on-surface">July 18, 2026</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Next Evaluation Schedule</p>
                    </div>
                  </div>
                </div>

                {/* Mock Exams / Tasks List */}
                <div className="flex flex-col gap-md">
                  <h3 className="font-headline-md text-body-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px] text-primary">fact_check</span>
                    Test History & Credentials
                  </h3>
                  <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                    <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                      <thead>
                        <tr className="bg-surface-container border-b border-outline-variant/30">
                          <th className="p-md font-semibold text-on-surface">Assessed Course</th>
                          <th className="p-md font-semibold text-on-surface">Evaluation Code</th>
                          <th className="p-md font-semibold text-on-surface text-center">Score</th>
                          <th className="p-md font-semibold text-on-surface text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        <tr>
                          <td className="p-md text-on-surface font-semibold">Mathematics Level 1 Foundation</td>
                          <td className="p-md font-mono text-on-surface-variant">PEA-M-901</td>
                          <td className="p-md text-primary font-bold text-center">92%</td>
                          <td className="p-md text-right"><span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[12px] font-semibold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="p-md text-on-surface font-semibold">English Language Composition</td>
                          <td className="p-md font-mono text-on-surface-variant">PEA-E-722</td>
                          <td className="p-md text-primary font-bold text-center">85%</td>
                          <td className="p-md text-right"><span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[12px] font-semibold">Verified</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EDIT PROFILE */}
            {activeTab === 'edit' && (
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-md animate-fade-in">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Personal Details</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Update your primary account demographics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="pname" className="font-body-sm text-body-sm font-semibold text-on-surface">Full Name</label>
                    <input
                      type="text"
                      id="pname"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="pmobile" className="font-body-sm text-body-sm font-semibold text-on-surface">Mobile Number</label>
                    <input
                      type="tel"
                      id="pmobile"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="pdob" className="font-body-sm text-body-sm font-semibold text-on-surface">Date of Birth</label>
                    <input
                      type="date"
                      id="pdob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="pcity" className="font-body-sm text-body-sm font-semibold text-on-surface">City</label>
                    <input
                      type="text"
                      id="pcity"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lahore"
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-xs">
                  <label htmlFor="paddr" className="font-body-sm text-body-sm font-semibold text-on-surface">Residential Address</label>
                  <textarea
                    id="paddr"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete postal address"
                    className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 w-max"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Save Changes
                </button>
              </form>
            )}

            {/* TAB: SECURITY */}
            {activeTab === 'security' && (
              <form onSubmit={handleChangePassword} className="flex flex-col gap-md animate-fade-in">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Change Password</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Keep your account credentials secure by updating them regularly.</p>
                </div>

                <div className="max-w-md flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="curpass" className="font-body-sm text-body-sm font-semibold text-on-surface">Current Password</label>
                    <input
                      type="password"
                      id="curpass"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="newpass" className="font-body-sm text-body-sm font-semibold text-on-surface">New Password</label>
                    <input
                      type="password"
                      id="newpass"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 w-max"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* TAB: DANGER ZONE */}
            {activeTab === 'settings' && (
              <div className="flex flex-col gap-md animate-fade-in">
                <div>
                  <h2 className="font-headline-md text-headline-md text-error">Danger Zone</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Actions taken here are irreversible.</p>
                </div>

                <div className="border border-error/30 rounded-2xl p-md bg-error-container/10 flex flex-col md:flex-row items-center justify-between gap-md">
                  <div className="max-w-xl">
                    <h4 className="font-body-md text-body-md font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                      Delete Candidate Account
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                      Deleting your account will erase all test records, score analytics, and certification data permanently. This action cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-error text-on-error font-body-md text-body-md px-lg py-sm rounded-full hover:bg-red-700 transition-all active:scale-95 duration-150 flex items-center justify-center gap-1 shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* TAB: MY SLIPS */}
            {activeTab === 'slips' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">My Slips</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Submit exam fee slips and track their approval status.</p>
                </div>

                {/* Submit Slip Form */}
                <form onSubmit={handleSubmitSlip} className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-md">
                  <h3 className="font-body-lg text-body-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
                    Submit New Slip
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label htmlFor="slip-exam" className="font-body-sm text-body-sm font-semibold text-on-surface">Exam Name *</label>
                      <input
                        type="text"
                        id="slip-exam"
                        required
                        value={slipForm.exam_name}
                        onChange={(e) => setSlipForm({ ...slipForm, exam_name: e.target.value })}
                        placeholder="e.g. Mathematics Level 1"
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label htmlFor="slip-date" className="font-body-sm text-body-sm font-semibold text-on-surface">Exam Date</label>
                      <input
                        type="date"
                        id="slip-date"
                        value={slipForm.exam_date}
                        onChange={(e) => setSlipForm({ ...slipForm, exam_date: e.target.value })}
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label htmlFor="slip-fee" className="font-body-sm text-body-sm font-semibold text-on-surface">Fee Amount (PKR)</label>
                      <input
                        type="number"
                        id="slip-fee"
                        value={slipForm.fee_amount}
                        onChange={(e) => setSlipForm({ ...slipForm, fee_amount: e.target.value })}
                        placeholder="e.g. 5000"
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="slip-file" className="font-body-sm text-body-sm font-semibold text-on-surface">Fee Slip Image *</label>
                    <div className="relative">
                      <input
                        type="file"
                        id="slip-file"
                        accept="image/*,.pdf"
                        onChange={(e) => setSlipFile(e.target.files[0] || null)}
                        className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:font-body-sm file:text-body-sm file:bg-primary/10 file:text-primary file:font-semibold file:cursor-pointer"
                      />
                    </div>
                    {slipFile && (
                      <p className="font-body-sm text-body-sm text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">attach_file</span>
                        {slipFile.name}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={slipSubmitting}
                    className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 w-max"
                  >
                    <span className="material-symbols-outlined text-[20px]">upload</span>
                    {slipSubmitting ? 'Submitting...' : 'Submit Slip'}
                  </button>
                </form>

                {/* Slips List */}
                <div className="flex flex-col gap-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">list_alt</span>
                      Submitted Slips
                    </h3>
                    <button
                      onClick={fetchSlips}
                      className="inline-flex items-center gap-1 text-primary hover:text-on-primary-fixed-variant font-body-sm text-body-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">refresh</span>
                      Refresh
                    </button>
                  </div>

                  {slipsLoading ? (
                    <p className="font-body-md text-body-md text-on-surface-variant text-center py-md">Loading slips...</p>
                  ) : slips.length === 0 ? (
                    <div className="text-center py-lg flex flex-col items-center gap-sm bg-surface-container rounded-2xl border border-outline-variant/20">
                      <span className="material-symbols-outlined text-outline text-[48px]">inbox</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">No slips submitted yet. Use the form above to submit your first slip.</p>
                    </div>
                  ) : (
                    <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                      <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                        <thead>
                          <tr className="bg-surface-container border-b border-outline-variant/30">
                            <th className="p-md font-semibold text-on-surface">Exam</th>
                            <th className="p-md font-semibold text-on-surface">Date</th>
                            <th className="p-md font-semibold text-on-surface text-right">Fee</th>
                            <th className="p-md font-semibold text-on-surface text-center">Status</th>
                            <th className="p-md font-semibold text-on-surface">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {slips.map((slip) => (
                            <tr key={slip.id}>
                              <td className="p-md text-on-surface font-semibold">{slip.exam_name}</td>
                              <td className="p-md text-on-surface-variant">
                                {slip.exam_date ? new Date(slip.exam_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                              </td>
                              <td className="p-md text-on-surface font-semibold text-right">
                                {slip.fee_amount ? `Rs. ${Number(slip.fee_amount).toLocaleString()}` : '—'}
                              </td>
                              <td className="p-md text-center">
                                {slip.status === 'pending' && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> Pending
                                  </span>
                                )}
                                {slip.status === 'approved' && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold bg-green-100 text-green-800 border border-green-300">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Approved
                                  </span>
                                )}
                                {slip.status === 'rejected' && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold bg-red-100 text-red-800 border border-red-300">
                                    <span className="material-symbols-outlined text-[14px]">cancel</span> Rejected
                                  </span>
                                )}
                              </td>
                              <td className="p-md">
                                {slip.status === 'rejected' && slip.rejection_reason && (
                                  <span className="text-red-600 text-[12px] italic" title={slip.rejection_reason}>
                                    <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
                                    {slip.rejection_reason}
                                  </span>
                                )}
                                {slip.fee_slip_url && (
                                  <a href={slip.fee_slip_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-[12px] font-semibold hover:text-on-primary-fixed-variant ml-2">
                                    <span className="material-symbols-outlined text-[14px]">image</span> View Slip
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center z-50 p-margin-mobile">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/30 p-md md:p-lg flex flex-col gap-md shadow-lg animate-scale-in">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-error text-[36px] bg-error-container/20 p-sm rounded-xl shrink-0">warning</span>
              <div>
                <h3 className="font-headline-md text-body-lg font-bold text-on-surface">Are you absolutely sure?</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  You are about to delete your Parkar Education Alliance account. All credentials will be lost.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-outline-variant/20 pt-md">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-surface-container text-on-surface font-body-md text-body-md px-md py-sm rounded-full border border-outline-variant/50 hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-error text-on-error font-body-md text-body-md px-md py-sm rounded-full hover:bg-red-700 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
