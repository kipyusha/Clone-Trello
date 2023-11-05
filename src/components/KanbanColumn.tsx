import React, { useEffect, useState } from "react";
import KanbanCard from "./KanbanCard";
import styled from "styled-components";
import Cookies from "js-cookie";

interface KanbanColumnProps {
  column: string;
  title: string;
  onTitleChange: (column: string, newTitle: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  title,
  onTitleChange,
}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCardContent, setNewCardContent] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const loadColumnTitlesFromCookie = () => {
    const columnTitlesString = Cookies.get("columnTitles");
    return columnTitlesString ? JSON.parse(columnTitlesString) : {};
  };

  const saveColumnTitleToCookie = (column: string, newTitle: string) => {
    const columnTitlesFromCookie = loadColumnTitlesFromCookie();
    columnTitlesFromCookie[column] = newTitle;
    Cookies.set("columnTitles", JSON.stringify(columnTitlesFromCookie));
  };
  const handleTitleSave = () => {
    saveColumnTitleToCookie(column, newTitle);
    onTitleChange(column, newTitle);
    setIsEditingTitle(false);
  };
  const removeCardFromCookie = (column: string, cardContent: string) => {
    const existingCards: string[] = loadCardsFromCookie(column);
    const updatedCards = existingCards.filter((card) => card !== cardContent);
    saveCardsToCookie(column, updatedCards);
  };
  const handleRemoveCard = (cardContent: string) => {
    const updatedCards = cards.filter((card) => card !== cardContent);
    setCards(updatedCards);
    setCardsToDelete([...cardsToDelete, cardContent]);
    const cardKey = `card_${column}_${cardContent}`;
    Cookies.remove(cardKey)
    // Удалить карточку из данных, сохраненных в куках
    removeCardFromCookie(column, cardContent);
  };
  const handleEditCard = (cardContent: string) => {
    setEditingCard(cardContent);
    setNewCardContent(cardContent);
  };
  const handleSaveCard = (originalCardContent: string) => {
    const updatedCards = cards.map((card) =>
      card === originalCardContent ? newCardContent : card
    );
    setCards(updatedCards);
    const cardKey = `card_${column}_${originalCardContent}`;
    
    Cookies.set(cardKey, newCardContent);
    saveCardsToCookie(column, updatedCards);
    
    
    setEditingCard(null); // Завершаем режим редактирования
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
    
    const savedComments = Cookies.get(`comments_${column}`);
    if (savedComments) {
      const parsedComments = JSON.parse(savedComments);
      setCommentsCount(parsedComments.length);
    }
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
          
          <div key={index}>
            
            {editingCard === cardContent ? (
              <>
                <Input
                  type="text"
                  value={newCardContent}
                  onChange={(e) => setNewCardContent(e.target.value)}
                />
                <ButtonSave onClick={() => handleSaveCard(cardContent)}>
                  Сохранить
                </ButtonSave>
              </>
            ) : (
              <ContainerCard>
                <KanbanCard
                  key={index}
                  content={cardContent}
                  column={column}
                  title={newTitle}
                  
                  
                />
                <QuantityComment>&#9993;<span>{commentsCount}</span></QuantityComment>
                <ButtonEdit onClick={() => handleEditCard(cardContent)}>
                  Редактировать
                </ButtonEdit>
                <ButtonEdit onClick={() => handleRemoveCard(cardContent)}>
                  Удалить
                </ButtonEdit>
              </ContainerCard>
            )}
          </div>
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
  background: #1d2125;
  border-radius: 10px;
  padding: 15px 10px;
`;

const ColumnTitle = styled.div`
  color: #fff;
  font-weight: 600;
  padding: 0 0 10px 10px;
`;

const ColumnCards = styled.div``;

const Button = styled.span`
  background: transparent;
  color: #fff;

  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #e92525;
  }
`;

const Input = styled.input`

  width: 70%;
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
`;

const ButtonSave = styled.div` 
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

const ContainerCard = styled.div`
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  padding: 10px 10px 5px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 500ms ease;
  &:hover {
    background: #d8d8f3;
  }
`

const QuantityComment = styled.span`
  color: #000;
  font-size: 14px;
  padding: 5px 0 0 5px;
  & span {
    padding-left: 3px;
  }
`

const ButtonAdd = styled.span`
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


const ButtonEdit = styled.span`
  background: #d8d8f3;
  border-radius: 5px;
  padding: 5px 10px;
  width: max-content;
  margin-left: 25px;
  cursor: pointer;
  transition: all 500ms ease;
  &:hover {
    background: #fff;
  }
`

