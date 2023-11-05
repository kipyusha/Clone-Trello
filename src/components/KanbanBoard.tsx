import React, { useState } from 'react'
import KanbanColumn from './KanbanColumn';
import styled from 'styled-components';

interface KanbanBoardProps {
  initialColumnTitles: Record<string, string>;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialColumnTitles }) => {
  const [columnTitles, setColumnTitles] = useState(initialColumnTitles);
  

  const handleTitleChange = (column: string, newTitle: string) => {
    setColumnTitles((prevColumnTitles) => ({
      ...prevColumnTitles,
      [column]: newTitle,
    }));
  };

  return (
    <Container>
      {Object.entries(columnTitles).map(([column, title]) => (
        <KanbanColumn
          key={column}
          column={column}
          title={title}
          onTitleChange={handleTitleChange}
        />
      ))}
    </Container>
  );
};

export default KanbanBoard;

const Container = styled.div`
display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  justify-content: center;
`