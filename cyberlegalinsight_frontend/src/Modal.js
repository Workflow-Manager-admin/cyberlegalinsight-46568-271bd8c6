import React from 'react';

// PUBLIC_INTERFACE
/**
 * Modal - Reusable modal dialog scaffold with backdrop and close logic.
 * @param {object} props
 *   open: boolean (modal visible)
 *   onClose: function to call when backdrop or close pressed
 *   children: modal content
 *   title: optional string for modal header
 */
function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" tabIndex={-1} onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="modal-dialog"
        style={{ position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 6,
            right: 10,
            background: 'none',
            border: 'none',
            fontSize: '1.47em',
            color: 'var(--accent)',
            cursor: 'pointer',
            zIndex: 1111
          }}
          onClick={onClose}
        >
          &#10006;
        </button>
        {title && (
          <h2 style={{marginTop: 0, marginBottom: 10, fontSize: '1.22em', color: 'var(--primary)'}}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
