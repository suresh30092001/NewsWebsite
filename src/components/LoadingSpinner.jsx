import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 0', // py-12
  },
  spinner: {
    height: '3rem', // h-12
    width: '3rem',  // w-12
    borderRadius: '9999px', // rounded-full
    border: '4px solid #E5E7EB', // fallback light border
    borderTop: '4px solid #2563EB', // blue-600
    animation: 'spin 1s linear infinite',
  },
};

// Add keyframes using a <style> tag (required for inline animation)
const LoadingSpinner = () => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
