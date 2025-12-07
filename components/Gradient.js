import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = ({
  style,
  children,
  colors = ['#0B1426', '#1C3A56', '#2a9d8f'],
  locations = [0, 0.4, 1],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;