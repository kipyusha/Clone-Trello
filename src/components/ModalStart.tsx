import React, { ReactElement, useState } from "react";
import Cookies from 'js-cookie';
import styled from "styled-components";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalStart = ({
  visible = false,
  onClose,
}: ModalProps) => {
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
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Заголовок</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <label className="modal-content-text">Введите свое имя</label>
            <input
              className="modal-content-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
            <button
              onClick={() => {
                Cookies.set('userName', name);
                onClose();
              }}
            >
              Войти
            </button>
          </div>
        
      </div>
    </div>
  );
};
