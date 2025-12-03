import { useState, useEffect } from 'react';

const names = ['👨🏿‍💼 Jesse Egbosionu', '👨🏿‍💻 jesseinit', '😎 jessewithit'];

export default function AnimatedName() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % names.length);
        setIsAnimating(false);
      }, 500); // Half of animation duration for smooth transition
    }, 3000); // Change name every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="animated-name-wrapper">
      <span className={`highlight animated-name ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        {names[currentIndex]}
      </span>
    </span>
  );
}
