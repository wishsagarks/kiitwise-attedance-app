import React from 'react';

const backgroundStyle = {
  fontFamily: 'Dosis, sans-serif',
  backgroundImage: 'linear-gradient(140deg, rgb(219, 98, 65) 0%, rgb(229, 91, 141) 100%)',
  height: '100vh',
  width:'100vw',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

const Background = ({ children }) => {
  return <div style={backgroundStyle}>{children}</div>;
};

export default Background;
