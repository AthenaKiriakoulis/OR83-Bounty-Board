import React, { useEffect, useState, memo } from 'react';

const Point = memo(({ src, className, left, top }) => {
  const [style, setStyle] = useState({});

  const updatePosition = () => {
    const rectElement = document.getElementById("clickSpace");
    if (rectElement) {
      const rect = rectElement;
      const rectY = rect.offsetTop;
      const rectX = rect.offsetLeft;

      setStyle({
        left: left * rect.offsetWidth + rectX + "px",
        top: top * rect.offsetHeight + rectY + "px",
        position: 'absolute',
      });
    }
  };

  useEffect(() => {
    updatePosition(); // Initial position

    window.addEventListener('resize', updatePosition); // Update on resize
    return () => window.removeEventListener('resize', updatePosition); // Cleanup on unmount
  }, [left, top]);

  return <img src={src} className={className} style={style} alt="point" />;
}, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.className === nextProps.className &&
    prevProps.left === nextProps.left &&
    prevProps.top === nextProps.top
  );
});

export default Point;