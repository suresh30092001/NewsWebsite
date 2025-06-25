import React from 'react';
import { Bookmark, X } from 'lucide-react'; 

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  icon: {
    width: '48px',
    height: '48px',
    color: '#D1D5DB', 
    margin: '0 auto 0.75rem auto',
  },
  message: {
    color: '#6B7280', 
  },
  subMessage: {
    fontSize: '0.875rem',
    color: '#9CA3AF',
    marginTop: '0.25rem',
  },
  listItem: {
    position: 'relative',
    border: '1px solid #E5E7EB',
    borderRadius: '0.5rem',
    padding: '1rem',
    transition: 'box-shadow 0.2s',
    marginBottom: '1rem',
    backgroundColor: '#fff',
  },
  titleLink: {
    fontWeight: '600',
    color: '#1F2937',
    fontSize: '1rem',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#6B7280',
    marginTop: '0.5rem',
  },
  removeButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#9CA3AF',
  },
};

const BookmarkList = ({ bookmarkedArticles, setBookmarkedArticles }) => {
  if (!bookmarkedArticles || bookmarkedArticles.length === 0) {
    return (
      <div style={styles.container}>
        <Bookmark style={styles.icon} />
        <p style={styles.message}>No bookmarks yet</p>
        <p style={styles.subMessage}>Save articles to read later</p>
      </div>
    );
  }

  const timeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  
const handleRemove = (idToRemove) => {
  const updated = bookmarkedArticles.filter(
    (article) => article.article_id !== idToRemove
  );

  
  setBookmarkedArticles(updated);

  
  localStorage.setItem("bookmarkedArticles", JSON.stringify(updated));
};
  return (
    <div>
      {bookmarkedArticles.map((article) => (
        <div key={article.article_id} style={styles.listItem}>
          
          <button
            onClick={() => handleRemove(article.article_id)}
            style={styles.removeButton}
            title="Remove from bookmarks"
          >
            <X size={16} />
          </button>

          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.titleLink}
          >
            {article.title}
          </a>
          <div style={styles.footer}>
            <span>{new URL(article.source_url).hostname}</span>
            <span>{timeAgo(article.pubDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
