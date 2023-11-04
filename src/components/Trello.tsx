import React from 'react'
import styled from "styled-components";
import KanbanBoard from './KanbanBoard';

const Trello = () => {
    const initialColumnTitles = {
        todo: "TODO",
        inProgress: "In Progress",
        testing: "Testing",
        done: "Done",
      };
  return (
    <Container>
        <Header>
            <Title>Trello</Title>
        </Header>
        <KanbanBoard initialColumnTitles={initialColumnTitles}/>
    </Container>
  )
}

export default Trello

const Container = styled.div` 
    width: 100%;
    height: 100vh;
    background: #85dcb8;
`

const Header = styled.div` 
    width: 100%;
    height: 60px;
    background: #0003
`

const Title = styled.h1` 
    color: #fff;
    font-weight: 500;
    margin: 0 20px;
    padding: 10px 0;
`