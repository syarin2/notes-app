
import React from 'react';
import { Pin, MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';

export default function NoteCard({ note }) {
  return (
    <article className="note-card">
      <div className="note-card-top">
        <span className={`note-category ${note.category.toLowerCase()}`}>
          {note.category}
        </span>

        <div className="note-card-actions">
          {note.pinned && <Pin size={17} />}
          <MoreHorizontal size={20} />
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
  }).isRequired
};
