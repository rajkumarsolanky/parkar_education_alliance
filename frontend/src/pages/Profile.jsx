import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AdmitCard from '../components/AdmitCard';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('admit-card'); // admit-card, dashboard, edit, security
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedAdmitCard, setSelectedAdmitCard] = useState(null);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ── Admit Cards / Test Registrations state ──
  const [slips, setSlips] = useState([]);
  const [slipsLoading, setSlipsLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get('/profile');
        setUser(response.data);
        setFullName(response.data.full_name || '');
        setFatherName(response.data.father_name || '');
        setSurname(response.data.surname || '');
        setMobile(response.data.mobile || '');
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
    fetchSlips();
  }, [navigate]);

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

  async function handleRegisterTest() {
    setRegistering(true);
    setError('');
    try {
      const res = await api.post('/slips', {
        exam_name: 'Pre-Entry Test (Batch - 2026)',
        exam_date: '2026-09-27',
        test_venue: 'Public School / Govt Degree College, Nagarparkar'
      });
      setSuccessMsg('Admit Card generated successfully!');
      fetchSlips();
      // Auto open the Admit Card
      openAdmitCard(res.data);
    } catch (err) {
      console.error(err);
      setError('Test registration failed. Please try again.');
    } finally {
      setRegistering(false);
    }
  }

  function openAdmitCard(slip) {
    const cardData = {
      seatNo: slip?.seat_no || `PEA-2026-${(slip?.id || 1).toString().padStart(4, '0')}`,
      applicationId: slip?.application_id || `2469${(user?.id || 1).toString().padStart(2, '0')}`,
      fullName: user?.full_name || fullName || 'Candidate Name',
      fatherName: user?.father_name || fatherName || 'Father Name',
      surname: user?.surname || surname || 'Parkar',
      cnic: user?.cnic || '44301-XXXXXXX-X',
      testDate: slip?.exam_date ? new Date(slip.exam_date).toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + ' 05:00 PM' : 'Sunday, 27-September-2026 05:00 PM',
      testVenue: slip?.test_venue || 'Public School / Govt Degree College, Nagarparkar',
      photoUrl: null
    };
    setSelectedAdmitCard(cardData);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const response = await api.put('/profile/update', {
        full_name: fullName,
        father_name: fatherName,
        surname,
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

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-body-md text-body-md text-on-surface-variant font-medium">Loading Candidate Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full mx-auto px-margin-mobile md:px-0 py-lg md:py-xl">

      {/* ── Mobile: Avatar + Horizontal Tab Bar ── */}
      <div className="lg:hidden flex flex-col gap-3 mb-4">
        {/* Compact Avatar Row */}
        <div className="bg-surface-container-lowest rounded-2xl px-4 py-3 border border-outline-variant/30 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#173a5e] text-white flex items-center justify-center font-bold text-xl shadow-md uppercase shrink-0">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-on-surface text-sm leading-tight truncate">{user?.full_name}</p>
            {user?.father_name && <p className="text-[11px] text-on-surface-variant truncate">S/D/O {user.father_name}</p>}
            <p className="text-[10px] font-mono font-semibold text-primary mt-0.5">{user?.cnic}</p>
          </div>
          <button onClick={handleLogout} className="shrink-0 flex flex-col items-center gap-0.5 text-error text-[10px] font-bold">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>

        {/* Horizontal Tab Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'admit-card', icon: 'badge', label: 'Admit Card' },
            { id: 'dashboard', icon: 'dashboard', label: 'My Info' },
            { id: 'edit', icon: 'person_edit', label: 'Edit Profile' },
            { id: 'security', icon: 'lock_reset', label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setError(''); setSuccessMsg(''); }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#173a5e] text-white shadow-md'
                  : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-lg">
        
        {/* Left Column: Sidebar Profile Navigation (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-md">
          <div className="bg-surface-container-lowest rounded-3xl p-md border border-outline-variant/30 ambient-shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#173a5e] text-white flex items-center justify-center font-bold text-2xl shadow-md uppercase mb-sm">
              {user?.full_name ? user.full_name.charAt(0) : 'U'}
            </div>
            <h2 className="font-headline-sm text-body-lg font-bold text-on-surface leading-tight">{user?.full_name}</h2>
            {user?.father_name && (
              <p className="font-body-xs text-body-sm text-on-surface-variant">S/D/O {user.father_name}</p>
            )}
            <p className="font-body-xs text-[11px] font-mono font-semibold text-primary mt-1 bg-primary/10 px-2.5 py-0.5 rounded-full">{user?.cnic}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-sm border border-outline-variant/30 ambient-shadow-sm flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('admit-card'); setError(''); setSuccessMsg(''); }}
              className={`flex items-center gap-3 px-md py-3 rounded-2xl font-body-md text-body-md font-semibold transition-all duration-150 ${
                activeTab === 'admit-card'
                  ? 'bg-[#173a5e] text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
              Admit Card (Roll No Slip)
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setError(''); setSuccessMsg(''); }}
              className={`flex items-center gap-3 px-md py-3 rounded-2xl font-body-md text-body-md font-semibold transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-[#173a5e] text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Candidate Info
            </button>
            
            <button
              onClick={() => { setActiveTab('edit'); setError(''); setSuccessMsg(''); }}
              className={`flex items-center gap-3 px-md py-3 rounded-2xl font-body-md text-body-md font-semibold transition-all duration-150 ${
                activeTab === 'edit'
                  ? 'bg-[#173a5e] text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person_edit</span>
              Edit Profile
            </button>
            
            <button
              onClick={() => { setActiveTab('security'); setError(''); setSuccessMsg(''); }}
              className={`flex items-center gap-3 px-md py-3 rounded-2xl font-body-md text-body-md font-semibold transition-all duration-150 ${
                activeTab === 'security'
                  ? 'bg-[#173a5e] text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              Security
            </button>

            <div className="h-px bg-outline-variant/30 my-1"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-md py-3 rounded-2xl font-body-md text-body-md font-semibold text-error hover:bg-error-container/20 transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface-container-lowest rounded-3xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-md flex flex-col gap-lg">
            
            {/* Status Messages */}
            {error && (
              <div className="p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-sm bg-primary/10 text-primary rounded-xl border border-primary/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">check_circle</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* ──────── TAB 1: ADMIT CARD & ROLL NO SLIP ──────── */}
            {activeTab === 'admit-card' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-md">
                  <div>
                    <h2 className="font-headline-md text-headline-sm font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#173a5e] text-[28px]">badge</span>
                      Pre-Entry Test Admit Card (Roll No Slip)
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Official Roll No Slip for appearing in the Pre-Entry Test (Batch - 2026)
                    </p>
                  </div>
                  
                  <button
                    onClick={handleRegisterTest}
                    disabled={registering}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#173a5e] hover:bg-[#102a45] text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 duration-150"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    {registering ? 'Generating Slip...' : 'Download / Print Slip'}
                  </button>
                </div>

                {/* Candidate Admit Card Banner Preview Card */}
                <div className="border-2 border-[#173a5e]/30 rounded-2xl p-5 md:p-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      Test Registration Active (Batch 2026)
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      Parkar Education Alliance — Pre-Entry Test
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs md:text-sm text-slate-700">
                      <p><strong className="text-slate-900">Candidate:</strong> {user?.full_name}</p>
                      <p><strong className="text-slate-900">Father's Name:</strong> {user?.father_name || 'Ghulam Rasool'}</p>
                      <p><strong className="text-slate-900">Surname:</strong> {user?.surname || 'Parkar'}</p>
                      <p><strong className="text-slate-900">CNIC:</strong> <span className="font-mono font-semibold">{user?.cnic}</span></p>
                      <p><strong className="text-slate-900">Test Date:</strong> Sunday, 27-Sep-2026 05:00 PM</p>
                      <p><strong className="text-slate-900">Venue:</strong> Public School Nagarparkar</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => openAdmitCard(slips[0] || null)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-lg">print</span>
                      View & Print Official Slip
                    </button>
                    <span className="text-[11px] text-slate-500 text-center font-medium">
                      Exact printable A4 format
                    </span>
                  </div>
                </div>

                {/* Test Instructions Box */}
                <div className="bg-surface-container rounded-2xl p-4 md:p-5 border border-outline-variant/30 space-y-2">
                  <h4 className="font-bold text-sm text-on-surface uppercase tracking-wide flex items-center gap-1.5 text-[#173a5e]">
                    <span className="material-symbols-outlined text-base">info</span>
                    Important Test Day Instructions
                  </h4>
                  <ul className="text-xs text-on-surface-variant space-y-1 pl-4 list-disc font-medium">
                    <li>It is mandatory to bring a printed copy of this Admit Card along with original CNIC/B-Form.</li>
                    <li>Mobile phones, smart watches, and electronic devices are strictly prohibited.</li>
                    <li>Please bring a black ballpoint pen with you.</li>
                    <li>Candidates must report to their respective blocks by 04:30 PM.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* ──────── TAB 2: CANDIDATE INFO DASHBOARD ──────── */}
            {activeTab === 'dashboard' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div className="border-b border-outline-variant/30 pb-md">
                  <h2 className="font-headline-md text-headline-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[28px]">account_circle</span>
                    Candidate Overview
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Review your registered candidate and test details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">Candidate Full Name</span>
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">{user?.full_name}</span>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">Father's Name</span>
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">{user?.father_name || '—'}</span>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">Surname / Caste</span>
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">{user?.surname || '—'}</span>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">CNIC Number</span>
                    <span className="font-body-lg text-body-lg font-mono font-bold text-on-surface">{user?.cnic}</span>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">Mobile Number</span>
                    <span className="font-body-lg text-body-lg font-semibold text-on-surface">{user?.mobile}</span>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-md border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-body-xs text-body-xs font-bold text-on-surface-variant uppercase tracking-wider">Date of Birth</span>
                    <span className="font-body-lg text-body-lg font-semibold text-on-surface">
                      {user?.dob ? new Date(user.dob).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setActiveTab('admit-card')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#173a5e] hover:bg-[#102a45] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-lg">badge</span>
                    Go to Admit Card / Roll No Slip
                  </button>
                </div>
              </div>
            )}

            {/* ──────── TAB 3: EDIT PROFILE ──────── */}
            {activeTab === 'edit' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div className="border-b border-outline-variant/30 pb-md">
                  <h2 className="font-headline-md text-headline-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[28px]">edit_note</span>
                    Edit Candidate Profile
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Keep your candidate personal details accurate for the Admit Card</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="flex flex-col gap-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label htmlFor="fullName" className="font-body-sm text-body-sm font-semibold text-on-surface">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label htmlFor="fatherName" className="font-body-sm text-body-sm font-semibold text-on-surface">Father's Name</label>
                      <input
                        type="text"
                        id="fatherName"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="e.g. Ghulam Rasool"
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label htmlFor="surname" className="font-body-sm text-body-sm font-semibold text-on-surface">Surname / Caste</label>
                      <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="e.g. Parkar"
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label htmlFor="mobile" className="font-body-sm text-body-sm font-semibold text-on-surface">Mobile Number *</label>
                      <input
                        type="tel"
                        id="mobile"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label htmlFor="dob" className="font-body-sm text-body-sm font-semibold text-on-surface">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label htmlFor="city" className="font-body-sm text-body-sm font-semibold text-on-surface">City / District</label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Nagarparkar, Tharparkar"
                        className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-md border-t border-outline-variant/30">
                    <button
                      type="submit"
                      className="bg-[#173a5e] text-white font-body-md text-body-md font-bold px-lg py-sm rounded-full hover:bg-[#102a45] shadow-md transition-all active:scale-95 duration-150"
                    >
                      Save Profile Updates
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ──────── TAB 4: SECURITY ──────── */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-lg animate-fade-in">
                <div className="border-b border-outline-variant/30 pb-md">
                  <h2 className="font-headline-md text-headline-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[28px]">lock</span>
                    Password & Security
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage your account authentication credentials</p>
                </div>

                <form onSubmit={handleChangePassword} className="flex flex-col gap-md max-w-lg">
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="currentPassword" className="font-body-sm text-body-sm font-semibold text-on-surface">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="newPassword" className="font-body-sm text-body-sm font-semibold text-on-surface">New Password (min 6 characters)</label>
                    <input
                      type="password"
                      id="newPassword"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="pt-sm">
                    <button
                      type="submit"
                      className="bg-[#173a5e] text-white font-body-md text-body-md font-bold px-lg py-sm rounded-full hover:bg-[#102a45] shadow-md transition-all active:scale-95 duration-150"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Official Admit Card Modal */}
      {selectedAdmitCard && (
        <AdmitCard
          data={selectedAdmitCard}
          onClose={() => setSelectedAdmitCard(null)}
        />
      )}
    </div>
  );
}
