import { useEffect, useState } from 'react';
import { closeModal, openModal } from '../zustand';

export const useViewportGuard = (
  minWidth = 830,
  message = 'This app is best viewed on a larger screen.',
) => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      setWidth(currentWidth);

      if (currentWidth < minWidth) {
        openModal(
          null,
          message,
        );
      } else if (currentWidth >= minWidth) {
        closeModal();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      closeModal();
    };
  }, [minWidth, message]);

  return {
    isSmallScreen: width < minWidth,
    width,
  };
};
