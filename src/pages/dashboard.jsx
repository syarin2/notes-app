
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FileText,
  Star,
  Archive,
  X
} from 'lucide-react';

import MainLayout from '../layouts/mainLayout';
import NoteCard from '../components/noteCard';

const initialNotes = [
  {
    id: 1,
    title: 'Belajar React',
    content: 'Memahami Component, Props, State, dan React Router untuk membuat website.',
    category: 'Kuliah',
    date: '08 Nov 2026',
    pinned: true,
    archived: false
  },
  {
    id: 2,
    title: 'Project Notes App',
    content: 'Menyelesaikan website Notes App dengan React dan membuat tampilan yang menarik.',
    category: 'Pekerjaan',
    date: '08 Nov 2026',
    pinned: false,
    archived: false
  },
  {
    id: 3,
    title: 'Daily Journal',
    content: 'Menuliskan kegiatan sehari-hari dan hal-hal menarik yang terjadi hari ini.',
    category: 'Pribadi',
    date: '07 Nov 2026',
    pinned: true,
    archived: false
  },
  {
    id: 4,
    title: 'Ide Website',
    content: 'Mengembangkan ide website dengan desain minimalis dan fitur yang mudah digunakan.',
    category: 'Ide',
    date: '06 Nov 2026',
    pinned: false,
    archived: false
  },
  {
    id: 5,
    title: 'Catatan Database',
    content: 'Mempelajari SQL, database, primary key, foreign key, dan relasi tabel.',
    category: 'Kuliah',
    date: '05 Nov 2026',
    pinned: false,
    archived: false
  },
  {
    id: 6,
    title: 'Catatan Lama',
    content: 'Kumpulan catatan yang sudah selesai dan disimpan sebagai arsip.',
    category: 'Pribadi',
    date: '01 Nov 2026',
    pinned: false,
    archived: true
  }
];

const categories = [
  'Semua',
  'Kuliah',
  'Pribadi',
  'Pekerjaan',
  'Ide'
];

export default function Dashboard() {
  const location = useLocation();

  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Kuliah'
  });

  const pageTitles = {
    '/': 'Dashboard',
    '/notes': 'My Notes',
    '/favorites': 'Favorites',
    '/archive': 'Archive'
  };

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  const activeNotes = notes.filter(note => !note.archived);
  const favoriteNotes = notes.filter(note => note.pinned && !note.archived);
  const archivedNotes = notes.filter(note => note.archived);

  const filteredNotes = notes.filter(note => {
    let matchesPage = true;

    if (location.pathname === '/favorites') {
      matchesPage = note.pinned && !note.archived;
    } else if (location.pathname === '/archive') {
      matchesPage = note.archived;
    } else {
      matchesPage = !note.archived;
    }

    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Semua' ||
      note.category === selectedCategory;

    return matchesPage && matchesSearch && matchesCategory;
  });

  const handleAddNote = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      pinned: false,
      archived: false
    };

    setNotes([newNote, ...notes]);

    setFormData({
      title: '',
      content: '',
      category: 'Kuliah'
    });

    setShowForm(false);
  };

  return (
    <MainLayout
      search={search}
      setSearch={setSearch}
      onAddNote={handleAddNote}
    >
      <section className="dashboard-heading">
        <div>
          <p className="section-subtitle">YOUR PERSONAL SPACE</p>
          <h1>{pageTitle}</h1>
          <p className="heading-description">
            Organize your thoughts and keep your ideas in one place.
          </p>
        </div>

        <div className="date-badge">
          <FileText size={17} />
          {activeNotes.length} Active Notes
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue-icon">
            <FileText size={22} />
          </div>
          <div>
            <p>Total Notes</p>
            <h2>{activeNotes.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow-icon">
            <Star size={22} />
          </div>
          <div>
            <p>Favorites</p>
            <h2>{favoriteNotes.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-icon">
            <Archive size={22} />
          </div>
          <div>
            <p>Archived</p>
            <h2>{archivedNotes.length}</h2>
          </div>
        </div>
      </section>

      <section className="notes-section">
        <div className="notes-heading">
          <div>
            <h2>
              {location.pathname === '/favorites'
                ? 'Favorite Notes'
                : location.pathname === '/archive'
                ? 'Archived Notes'
                : 'Recent Notes'}
            </h2>
            <p>Manage and organize your notes.</p>
          </div>

          <button
            className="add-note-btn"
            onClick={handleAddNote}
          >
            + Create Note
          </button>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? 'category-btn selected'
                  : 'category-btn'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FileText size={40} />
            <h3>No notes found</h3>
            <p>Try another keyword or create a new note.</p>
          </div>
        )}
      </section>

      {showForm && (
        <div className="modal-overlay">
          <div className="note-modal">
            <div className="modal-header">
              <div>
                <p className="section-subtitle">CREATE SOMETHING NEW</p>
                <h2>Create New Note</h2>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
                aria-label="Tutup form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Note Title</label>
              <input
                type="text"
                placeholder="Enter your note title..."
                value={formData.title}
                onChange={e =>
                  setFormData({
                    ...formData,
                    title: e.target.value
                  })
                }
                required
              />

              <label>Category</label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({
                    ...formData,
                    category: e.target.value
                  })
                }
              >
                <option value="Kuliah">Kuliah</option>
                <option value="Pribadi">Pribadi</option>
                <option value="Pekerjaan">Pekerjaan</option>
                <option value="Ide">Ide</option>
              </select>

              <label>Note Content</label>
              <textarea
                placeholder="Write your thoughts here..."
                rows="5"
                value={formData.content}
                onChange={e =>
                  setFormData({
                    ...formData,
                    content: e.target.value
                  })
                }
                required
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
