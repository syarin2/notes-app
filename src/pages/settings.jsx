
import React, { useEffect, useState } from 'react';
import { UserRound, Mail, AtSign, Lock, Sun, Moon, Save } from 'lucide-react';
import MainLayout from '../layouts/mainLayout';

const dataAwal = {
  nama: 'Syarin Suherman',
  username: 'syarin',
  email: 'syarin@email.com'
};

export default function SettingsPage() {
  const [tema, setTema] = useState(
    () => localStorage.getItem('notes-theme') || 'light'
  );

  const [profil, setProfil] = useState(() => {
    const tersimpan = localStorage.getItem('notes-profile');
    return tersimpan ? JSON.parse(tersimpan) : dataAwal;
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('notes-theme', tema);
  }, [tema]);

  const ubahProfil = (e) => {
    const { name, value } = e.target;
    setProfil({ ...profil, [name]: value });
  };

  const simpanProfil = (e) => {
    e.preventDefault();
    localStorage.setItem('notes-profile', JSON.stringify(profil));
    setEditMode(false);
  };

  return (
    <MainLayout
      search=""
      setSearch={() => {}}
      onAddNote={() => {}}
    >
      <div className="settings-page">
        <div className="dashboard-heading">
          <div>
            <p className="section-subtitle">PREFERENCES</p>
            <h1>Settings</h1>
            <p className="heading-description">
              Atur informasi akun dan tampilan Notes App kamu.
            </p>
          </div>
        </div>

        <section className="settings-section">
          <div className="settings-section-title">
            <div className="settings-title-icon">
              <UserRound size={20} />
            </div>
            <div>
              <h2>Account Information</h2>
              <p>Informasi akun yang sedang digunakan.</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={simpanProfil}>
            <div className="profile-avatar">
              <UserRound size={35} />
            </div>

            <div className="profile-fields">
              <label>
                Nama Lengkap
                <div className="profile-input">
                  <UserRound size={17} />
                  <input
                    name="nama"
                    value={profil.nama}
                    onChange={ubahProfil}
                    disabled={!editMode}
                  />
                </div>
              </label>

              <label>
                Username
                <div className="profile-input">
                  <AtSign size={17} />
                  <input
                    name="username"
                    value={profil.username}
                    onChange={ubahProfil}
                    disabled={!editMode}
                  />
                </div>
              </label>

              <label>
                Email
                <div className="profile-input">
                  <Mail size={17} />
                  <input
                    type="email"
                    name="email"
                    value={profil.email}
                    onChange={ubahProfil}
                    disabled={!editMode}
                  />
                </div>
              </label>

              <label>
                Password
                <div className="profile-input">
                  <Lock size={17} />
                  <input value="••••••••••" disabled />
                </div>
              </label>
            </div>

            <div className="profile-actions">
              {editMode ? (
                <>
                  <button
                    type="button"
                    className="profile-cancel"
                    onClick={() => setEditMode(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="profile-save">
                    <Save size={16} /> Simpan Perubahan
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="profile-save"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profil
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="settings-section">
          <div className="settings-section-title">
            <div className="settings-title-icon">
              <Sun size={20} />
            </div>
            <div>
              <h2>Appearance</h2>
              <p>Pilih tampilan yang nyaman untuk digunakan.</p>
            </div>
          </div>

          <div className="theme-options">
            <button
              type="button"
              className={`theme-card ${tema === 'light' ? 'selected' : ''}`}
              onClick={() => setTema('light')}
            >
              <div className="theme-preview light-preview">
                <Sun size={30} />
                <span>Aa</span>
              </div>
              <div className="theme-card-info">
                <div>
                  <h3>Light Mode</h3>
                  <p>Tampilan terang dan lembut.</p>
                </div>
                <span className="theme-radio">
                  {tema === 'light' && <span />}
                </span>
              </div>
            </button>

            <button
              type="button"
              className={`theme-card ${tema === 'dark' ? 'selected' : ''}`}
              onClick={() => setTema('dark')}
            >
              <div className="theme-preview dark-preview">
                <Moon size={30} />
                <span>Aa</span>
              </div>
              <div className="theme-card-info">
                <div>
                  <h3>Dark Mode</h3>
                  <p>Tampilan gelap yang nyaman di mata.</p>
                </div>
                <span className="theme-radio">
                  {tema === 'dark' && <span />}
                </span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
