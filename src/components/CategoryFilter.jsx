import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import {categories} from "../appenum"


const styles = {
  container: {
    position: 'relative',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    border: '1px solid #D1D5DB', // gray-300
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '0.5rem',
    width: '12rem',
    backgroundColor: '#fff',
    border: '1px solid #E5E7EB', // gray-200
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    textAlign: 'left',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  selectedItem: {
    backgroundColor: '#EFF6FF', // blue-50
    color: '#2563EB', // blue-600
  },
  colorDot: (color) => ({
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: color,
  }),
  chevron: (isOpen) => ({
    width: '1rem',
    height: '1rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s',
  }),
};

const getColorFromTailwind = (className) => {
  const map = {
    'bg-blue-500': '#3B82F6',
    'bg-green-500': '#10B981',
    'bg-red-500': '#EF4444',
    // Add more mappings if needed
  };
  return map[className] || '#D1D5DB';
};

const CategoryFilter = ({ selectedCategory, setSelectedCategory, isOpen, setIsOpen }) => {
  const selectedCat = categories.find(cat => cat.id === selectedCategory);

  return (
    <div style={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.button}>
        <Filter style={{ width: 16, height: 16 }} />
        <span style={{ fontWeight: 500 }}>{selectedCat?.name}</span>
        <ChevronDown style={styles.chevron(isOpen)} />
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsOpen(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  ...(isSelected ? styles.selectedItem : {}),
                }}
              >
                <div style={styles.colorDot(getColorFromTailwind(category.color))}></div>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
