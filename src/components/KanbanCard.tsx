import React, { useEffect, useState } from "react";
import CardDetailsPopup from "./CardDetailsPopup";
import styled from "styled-components";

interface KanbanCardProps {
  content: string;
  column: string;
  title: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ content, column, title }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const openPopup = () => {
      setIsPopupOpen(true);
      
    };
  
    const closePopupTest = () => {
      console.log('closePopup called');
      setIsPopupOpen(false);
    };
    
  
    return (
      <Container >
        <div onClick={openPopup}>{content}</div>
        
        {isPopupOpen && (
          <CardDetailsPopup closePopup={closePopupTest} column={column} title={title}/>
        )}
      </Container>
    );
  };

export default KanbanCard;

const Container = styled.div`
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 500ms ease;
  &:hover {
    background: #d8d8f3;
  }
`