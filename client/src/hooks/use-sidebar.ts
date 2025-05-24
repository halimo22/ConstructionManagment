import { useState, useEffect } from 'react';

export function useSidebar() {
  // Initialize sidebarOpen to true for desktop and false for mobile
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check if we're on mobile (screen width < 768px)
    return window.innerWidth >= 768;
  });

  // Update sidebarOpen state when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Always show sidebar on desktop
        setSidebarOpen(true);
      } else {
        // Hide sidebar on mobile by default
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar
  };
}
