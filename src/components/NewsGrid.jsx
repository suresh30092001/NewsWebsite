import React from 'react';
import { Search } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner'; 
import ArticleCard from './ArticleCard'; 

const styles = {
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0', 
  },
  icon: {
    width: '4rem', 
    height: '4rem',
    color: '#D1D5DB', 
    margin: '0 auto 1rem',
  },
  heading: {
    fontSize: '1.25rem', 
    fontWeight: 500,
    color: '#111827', 
    marginBottom: '0.5rem',
  },
  subText: {
    color: '#6B7280',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem', 
  },
  gridMd: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  gridXl: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const NewsGrid = ({ articles, bookmarkedArticles, onToggleBookmark, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (articles.length === 0) {
    return (
      <div style={styles.emptyState}>
        <Search style={styles.icon} />
        <h3 style={styles.heading}>No articles found</h3>
        <p style={styles.subText}>Try adjusting your search or category filter</p>
      </div>
    );
  }

  
  let gridStyles = { ...styles.grid };
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;

  if (width >= 1280) {
    Object.assign(gridStyles, styles.gridXl);
  } else if (width >= 768) {
    Object.assign(gridStyles, styles.gridMd);
  }

  return (
    <div style={gridStyles}>
      {articles.map((article,index) => (
        <div key={index}>
          <ArticleCard
        key={article.article_id}
        article={article}
        isBookmarked={bookmarkedArticles.some(bookmark => bookmark.article_id === article.article_id)}
        onToggleBookmark={onToggleBookmark}
      />
        </div>

      ))}
    </div>
  );
};

export default NewsGrid;
