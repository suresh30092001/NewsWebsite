import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  User,
} from 'lucide-react';

const ArticleCard = ({ article, isBookmarked, onToggleBookmark, categories = [] }) => {
  // console.log("isbookedmarked:",isBookmarked);
  const timeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const styles = {
    card: {
      background: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      border: '1px solid #f0f0f0',
      transition: 'box-shadow 0.3s ease',
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '192px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    bookmarkBtnContainer: {
      position: 'absolute',
      top: '12px',
      right: '12px',
    },
    bookmarkBtn: (active) => ({
      backgroundColor: active ? '#e53e3e' : 'rgba(255, 255, 255, 0.8)',
      color: active ? '#fff' : '#666',
      padding: '8px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      backdropFilter: 'blur(6px)',
      transition: 'all 0.2s ease',
    }),
    content: {
      padding: '24px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    category: {
      backgroundColor: '#ebf4ff',
      color: '#3182ce',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    time: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#718096',
      gap: '6px',
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '8px',
      transition: 'color 0.3s',
    },
    description: {
      color: '#4a5568',
      fontSize: '0.95rem',
      marginBottom: '16px',
      lineHeight: 1.4,
      maxHeight: '4.2em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#718096',
      gap: '6px',
    },
    readMore: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#3182ce',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
    },
  };

  return (
    <article
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)')}
    >
      <div style={styles.imageContainer}>
        <img
          src={article.image_url}
          alt={article.title}
          style={styles.image}
        />
        <div style={styles.bookmarkBtnContainer}>
          <button
            onClick={() => onToggleBookmark(article)}
            style={styles.bookmarkBtn(isBookmarked)}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.category}>
            {categories.find(cat => cat.id === article.category)?.name || 'News'}
          </span>
          <div style={styles.time}>
            <Clock size={16} />
            <span>{timeAgo(article.pubDate)}</span>
          </div>
        </div>

        <h3 style={styles.title}>{article.title}</h3>
        <p style={styles.description}>{article.description}</p>

        <div style={styles.footer}>
          <div style={styles.author}>
            <User size={16} />
            <span>{article.source_name }</span>
          </div>
          <button style={styles.readMore}>
            <span>Read more</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
