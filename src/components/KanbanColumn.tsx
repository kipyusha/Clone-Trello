import React, { useEffect, useState } from "react";
import KanbanCard from "./KanbanCard";
import styled from "styled-components";
import Cookies from 'js-cookie';

interface KanbanColumnProps {
  column: string;
  title: string;
  onTitleChange: (column: string, newTitle: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, title, onTitleChange }) => {
  
  const [cards, setCards] = useState<string[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCardContent, setNewCardContent] = useState("");

  const loadColumnTitlesFromCookie = () => {
    const columnTitlesString = Cookies.get('columnTitles');
    return columnTitlesString ? JSON.parse(columnTitlesString) : {};
  };

  const saveColumnTitleToCookie = (column: string, newTitle: string) => {
    const columnTitlesFromCookie = loadColumnTitlesFromCookie();
    columnTitlesFromCookie[column] = newTitle;
    Cookies.set('columnTitles', JSON.stringify(columnTitlesFromCookie));
  };
  const handleTitleSave = () => {
    saveColumnTitleToCookie(column, newTitle);
    onTitleChange(column, newTitle);
    setIsEditingTitle(false);
    
  };

  
  const saveCardsToCookie = (column: string, cards: string[]) => {
    Cookies.set(`cards_${column}`, JSON.stringify(cards));
  };
  const loadCardsFromCookie = (column: string) => {
    const cardsString = Cookies.get(`cards_${column}`);
    return cardsString ? JSON.parse(cardsString) : [];
  };
  const handleAddCard = () => {
    if (newCardContent.trim() !== "") {
      const newCards = [...cards, newCardContent];
      setCards(newCards);
      setNewCardContent("");
  
      // Сохранить карточки в cookie
      saveCardsToCookie(column, newCards);
    }
  };
  useEffect(() => {
    const initialCards = loadCardsFromCookie(column);
    setCards(initialCards);
    const columnTitlesFromCookie = loadColumnTitlesFromCookie();
    if (columnTitlesFromCookie[column]) {
      setNewTitle(columnTitlesFromCookie[column]);
    }
  }, [column]);
  return (
    <Container>
      <ColumnTitle>
        {isEditingTitle ? (
          <>
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleTitleSave}>&#10004;</Button>
          </>
        ) : (
          <>
            {newTitle}
            <Button onClick={() => setIsEditingTitle(true)}>&#9998;</Button>
          </>
        )}
      </ColumnTitle>
      <ColumnCards>
        {cards.map((cardContent, index) => (
          <KanbanCard key={index} content={cardContent} column={column} title={newTitle} />
        ))}
      </ColumnCards>
      <div className="add-card">
        <Input
          type="text"
          placeholder="Add a card..."
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
        />
        <ButtonAdd onClick={handleAddCard}>Add</ButtonAdd>
      </div>
    </Container>
  );
};

export default KanbanColumn;

const Container = styled.div`
  width: 300px;
  max-height: 100vh;
  height: max-content;
  background: #1D2125;
  border-radius: 10px;
  padding: 15px 10px;
`

const ColumnTitle = styled.div` 
 color: #fff;
 font-weight: 600;
 padding: 0 0 10px 10px;
`

const ColumnCards = styled.div `
  
`



const Button = styled.span` 
  background: transparent;
  color: #fff;
  
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #e92525;
  }
`

const Input = styled.input`
width: 70%;
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
`

const ButtonAdd = styled.span `
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
`