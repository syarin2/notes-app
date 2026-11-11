
import React, { useState } from 'react';
import {
  Pin,
  MoreHorizontal,
  Star,
  Archive,
  ArchiveRestore
} from 'lucide-react';
import PropTypes from 'prop-types';

export default function NoteCard({
  note,
  onToggleFavorite,
  onToggleArchive
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article className="note-card">
      <div className="note-card-top">
        <span className={`note-category ${note.category.toLowerCase()}`}>
          {note.category}
        </span>

        <div className="note-card-actions">
          {note.pinned && <Pin size={17} />}

          <div className="note-menu-container">
            <button
              type="button"
              className="note-menu-button"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Pilihan catatan"
              aria-expanded={showMenu}
            >
              <MoreHorizontal size={21} />
            </button>

            {showMenu && (
              <div className="note-dropdown">
                <button
                  type="button"
                  onClick={() => {
                    onToggleFavorite(note.id);
                    setShowMenu(false);
                  }}
                >
                  <Star
                    size={16}
                    fill={note.pinned ? 'currentColor' : 'none'}
                  />
                  {note.pinned
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleArchive(note.id);
                    setShowMenu(false);
                  }}
                >
                  {note.archived ? (
                    <ArchiveRestore size={16} />
                  ) : (
                    <Archive size={16} />
                  )}

                  {note.archived
                    ? 'Restore to Dashboard'
                    : 'Move to Archive'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3>{note.title}</h3>

      <p className="note-content">{note.content}</p>

      <div className="note-card-bottom">
        <span>{note.date}</span>
        <span className="note-dot"></span>
        <span>MyNotes</span>
      </div>
    </article>
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    pinned: PropTypes.bool,
    archived: PropTypes.bool
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired
};
