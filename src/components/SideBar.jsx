import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import BookmarkList from './BookmarkList'; 

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 20,
  },
  sidebarBase: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: '20rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    overflow: 'hidden',
  },
  sidebarOpen: {
    transform: 'translateX(0)',
  },
  sidebarLg: {
    position: 'relative',
    boxShadow: 'none',
    borderRight: '1px solid #E5E7EB',
    transform: 'none',
    top: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '1.5rem',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  scrollableBookmarks: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '0.25rem',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE 10+
  },
};

const SideBar = ({ isOpen, onClose, bookmarkedArticles, articles,setBookmarkedArticles }) => {
  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;

  useEffect(() => {
    if (isOpen && !isLargeScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isLargeScreen]);

  const sidebarStyle = {
    ...styles.sidebarBase,
    ...(isLargeScreen ? styles.sidebarLg : isOpen ? styles.sidebarOpen : {}),
  };

  return (
    <>
      {!isLargeScreen && isOpen && (
        <div style={styles.overlay} onClick={onClose} />
      )}

      <div style={sidebarStyle}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h2 style={styles.title}>Bookmarks</h2>
            {!isLargeScreen && (
              <button
                onClick={onClose}
                style={styles.closeButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            )}
          </div>

          <div
            style={styles.scrollableBookmarks}
            className="hide-scroll"
          >
            <BookmarkList
              bookmarkedArticles={bookmarkedArticles}
              // articles={articles}
              setBookmarkedArticles={setBookmarkedArticles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
