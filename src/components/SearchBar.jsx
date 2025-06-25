import React from 'react';
import { Search } from 'lucide-react';

const styles = {
  wrapper: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '0.75rem', // pl-3
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  icon: {
    width: '1.25rem', // h-5
    height: '1.25rem',
    color: '#9CA3AF', // gray-400
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem 0.5rem 2.5rem', // pl-10, pr-3, py-2
    border: '1px solid #D1D5DB', // gray-300
    borderRadius: '0.5rem', // rounded-lg
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    fontSize: '1rem',
  },
};

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleFocus = (e) => {
    e.target.style.border = '1px solid transparent';
    e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.5)'; // focus:ring-2 focus:ring-blue-500
  };

  const handleBlur = (e) => {
    e.target.style.border = '1px solid #D1D5DB';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.iconContainer}>
        <Search style={styles.icon} />
      </div>
      <input
        type="text"
        placeholder="Search news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </div>
  );
};

export default SearchBar;
