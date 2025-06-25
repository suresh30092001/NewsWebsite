import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CategoryFilter from './CategoryFilter';
import NewsGrid from './NewsGrid';

const styles = {
  app: {
    maxWidth: '100%',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
  },
  layout: {
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: '1.5rem',
  },
  container: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  headerText: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subText: {
    color: '#4B5563',
  },
  responsiveSmUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const NewsAggregator = () => {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchNews(selectedCategory, selectedLanguage, searchQuery);
  }, [selectedCategory, selectedLanguage, searchQuery]);

  useEffect(() => {
  const bookMarks = localStorage.getItem("bookmarkedArticles");
  if (bookMarks) {
    try {
      setBookmarkedArticles(JSON.parse(bookMarks)); // ✅ convert string → array
    } catch (error) {
      console.error("Failed to parse bookmarks:", error);
      setBookmarkedArticles([]); // fallback
    }
  } else {
    setBookmarkedArticles([]); // if nothing in storage
  }
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPage && !isFetchingMore) {
          loadMoreNews();
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [nextPage, isFetchingMore]);

  const fetchNews = async (category, language, searchQuery = '', page = null, append = false) => {
    const apiKey = 'pub_e35a5c4731b94ee09aae4751822d69e9';
    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}`;

    if (category && category !== 'all') {
      url += `&category=${encodeURIComponent(category)}`;
    }

    if (language) {
      url += `&language=${encodeURIComponent(language)}`;
    }

    if (searchQuery.trim()) {
      url += `&q=${encodeURIComponent(searchQuery.trim())}`;
    }

    if (page) {
      url += `&page=${page}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'success') {
        setArticles((prev) => (append ? [...prev, ...(data.results || [])] : data.results || []));
        setNextPage(data.nextPage || null);
      } else {
        console.error('❌ Failed to fetch news:', data);
        alert("You've reached the maximum number of requests allowed by the news service. Please try again later or upgrade your API plan.");
        setArticles([]);
      }
    } catch (error) {
      console.error('❌ Error fetching news:', error);
      setArticles([]);
    }

    setLoading(false);
    setIsFetchingMore(false);
  };

  const loadMoreNews = useCallback(() => {
    if (nextPage) {
      setIsFetchingMore(true);
      fetchNews(selectedCategory, selectedLanguage, searchQuery, nextPage, true);
    }
  }, [nextPage, selectedCategory, selectedLanguage, searchQuery]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        (Array.isArray(article.category)
          ? article.category.includes(selectedCategory)
          : article.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const handleToggleBookmark = (newsData) => {
  const { article_id, title, source_url, pubDate } = newsData;

  // Get existing bookmarks from localStorage or set as empty array
  const existingBookmarks =
    JSON.parse(localStorage.getItem("bookmarkedArticles")) || [];

  const isAlreadyBookmarked = existingBookmarks.some(
    (item) => item.article_id === article_id
  );

  let updatedBookmarks;
  if (isAlreadyBookmarked) {
    // Remove bookmark
    updatedBookmarks = existingBookmarks.filter(
      (item) => item.article_id !== article_id
    );
  } else {
    // Add new bookmark with pubDate included
    const newBookmark = { article_id, title, source_url, pubDate };
    updatedBookmarks = [...existingBookmarks, newBookmark];
  }

  // Save to localStorage
  localStorage.setItem(
    "bookmarkedArticles",
    JSON.stringify(updatedBookmarks)
  );

  // Update React state
  setBookmarkedArticles(updatedBookmarks);
};



  return (
    <div style={styles.app}>
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div style={styles.layout}>
        {sidebarOpen && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            bookmarkedArticles={bookmarkedArticles}
            articles={articles}
            setBookmarkedArticles={setBookmarkedArticles}
          />
        )}

        <main style={styles.main}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.headerSection,
                ...(window.innerWidth >= 640 ? styles.responsiveSmUp : {}),
              }}
            >
              <div>
                <h2 style={styles.headerText}>Latest News</h2>
                <p style={styles.subText}>Stay updated with the latest stories</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  isOpen={categoryDropdownOpen}
                  setIsOpen={setCategoryDropdownOpen}
                />

                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: '#111827',
                  }}
                >
                  <option value="en">English</option>
                  <option value="te">Telugu</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>

            <NewsGrid
              articles={filteredArticles}
              bookmarkedArticles={bookmarkedArticles}
              onToggleBookmark={handleToggleBookmark}
              loading={loading}
            />

            <div ref={bottomRef} style={{ height: 40 }}></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsAggregator;
