import React from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import styled from 'styled-components';
import { CalendarGrid } from './components/CalendarGrid';
import { CalendarTools } from './components/CalendarTools';
import { Modal } from './components/Modal';
import { useViewportGuard } from './hooks/useViewportGuard';

const Wrapper = styled.div`
  display: flex;
  max-height: 100vh;
  height: 100%;
  flex-direction: column;
`;

export const App: React.FC = () => {
  useViewportGuard(830,`
    Your screen is too small to use this app comfortably.
    This application is optimized for larger displays with a minimum width of 830 pixels.
    For the best experience, please switch to a tablet, laptop, or desktop device.
  `);

  return (
    <Wrapper>
      <CalendarTools />
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <CalendarGrid />
      </DndProvider>
      <Modal />
    </Wrapper>
  );
};
