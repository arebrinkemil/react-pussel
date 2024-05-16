import React from "react";
import styled from "@emotion/styled";

interface ModalProps {
  text: string;
  isVisible: boolean;
  onClose: () => void;
}

const Overlay = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
`;

const MessageModal: React.FC<ModalProps> = ({ text, isVisible, onClose }) => {
  return (
    <Overlay isVisible={isVisible}>
      <ModalContainer>
        <div>{text}</div>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default MessageModal;
