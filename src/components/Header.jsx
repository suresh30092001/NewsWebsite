import React from 'react';
import { Menu } from 'lucide-react';
import SearchBar from './SearchBar'; // Make sure this component is defined elsewhere

const styles = {
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    borderBottom: '1px solid #E5E7EB', 
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width:"100%"
  },
  container: {
    maxWidth: '100%', 
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    height: '4rem', 
    justifyContent: 'space-between',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menuButton: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(to right, #2563EB, #7C3AED)', 
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  centerSection: {
    flex: 1,
    maxWidth: '28rem',
    margin: '0 1rem',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  dateText: {
    display: 'none', 
    fontSize: '0.875rem',
    color: '#6B7280', 
  },
  dateTextSmUp: {
    display: 'block', 
  },
};

const Header = ({ onMenuToggle, searchQuery, setSearchQuery }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <button
            onClick={onMenuToggle}
            style={styles.menuButton}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')} 
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Menu style={{ width: 24, height: 24 }} />
          </button>
          <h1 style={styles.logo}>NewsHub</h1>
        </div>

        <div style={styles.centerSection}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div style={styles.rightSection}>
          <div
            style={{
              ...styles.dateText,
              ...styles.dateTextSmUp,
            }}
          >
            {currentDate}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
