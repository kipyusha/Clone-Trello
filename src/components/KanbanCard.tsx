import React, { useEffect, useState } from "react";
import CardDetailsPopup from "./CardDetailsPopup";
import styled from "styled-components";

interface KanbanCardProps {
  content: string;
  column: string;
  title: string;
  
}

const KanbanCard: React.FC<KanbanCardProps> = ({ content, column, title}) => {
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
          <CardDetailsPopup closePopup={closePopupTest} column={column} title={title} 
          />
        )}
      </Container>
    );
  };

export default KanbanCard;

const Container = styled.div`
  margin-bottom: 10px;
`