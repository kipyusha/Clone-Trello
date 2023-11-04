import React, { ReactElement, useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalStart = ({ visible = false, onClose }: ModalProps) => {
  const [name, setName] = useState("");
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });
  if (!visible) return null;

  return (
    <Container>
      <Modal onClick={onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <Title>Заголовок</Title>
          <hr />
          <Body>
            <Label>Введите свое имя</Label>
            <Input
              className="modal-content-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={() => {
                Cookies.set("userName", name);
                onClose();
              }}
            >
              Войти
            </Button>
          </Body>
        </div>
      </Modal>
    </Container>
  );
};
const Container = styled.div`
  &:before {
    content: "";
    background: #000;
    position: fixed;
    backdrop-filter: blur(10px);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 5;
  }
`;
const Modal = styled.div`
  width: 550px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -275px;
  margin-top: -150px;
  z-index: 9999;
  background: #020202e1;
  border-radius: 10px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  padding: 15px 30px 10px;
  color: #fff;
`;

const Body = styled.div`
  display: flex;
  padding: 20px 30px;
  margin: 0 auto;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 20px;
  color: #fff;
`;

const Input = styled.input`
  width: 200px;
  background: #fff;
  
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
  
  font-size: 18px;
  margin-left: 10px;
`;

const Button = styled.span`
  background: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  width: max-content;
  margin-left: 5px;
  cursor: pointer;
  transition: all 500ms ease;
  &:hover {
    background: #d8d8f3;
  }
`;
