import styled, { css } from 'styled-components';
import { closeModal, useModalStore } from '../zustand';

const Overlay = styled.div(({ theme })=>css`
  position: fixed;
  inset: 0;
  background: ${theme.colors.overlayBG};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.overlay};
`);

const ModalBox = styled.div`
  background: ${({ theme })=>theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme })=>theme.radius.md};
  min-width: 300px;
  max-width: 90%;
`;

const Title = styled.h2(({ theme })=>css`
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  font-size: ${theme.font.size.lg};
  font-weight: ${theme.font.weight.bold};
`);

export const Modal = () => {
  const { content, title } = useModalStore();

  if (!content && !title) return null;

  return (
    <Overlay onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        {content}
      </ModalBox>
    </Overlay>
  );
};
