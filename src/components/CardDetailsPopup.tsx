// CardDetailsPopup.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

interface CardDetailsPopupProps {
  closePopup: () => void;
  column: string;
  title: string;
}

const CardDetailsPopup: React.FC<CardDetailsPopupProps> = ({
  closePopup,
  column,
  title,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const author = Cookies.get("userName");
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState("Текст...");
 

  

  const addComment = () => {
    if (comment && author) {
      const newComment = `${comment}`;
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      Cookies.set(`comments_${column}`, JSON.stringify(updatedComments));
      setComment("");
    }
  };
  const editComment = (index: number) => {
    const updatedComment = prompt("Изменить комментарий", comments[index]);
    if (updatedComment !== null) {
      const updatedComments = [...comments];
      updatedComments[index] = updatedComment;
      setComments(updatedComments);
      Cookies.set(`comments_${column}`, JSON.stringify(updatedComments));
    }
  };
  const deleteComment = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    Cookies.set(`comments_${column}`, JSON.stringify(updatedComments));
  };

  const saveDescription = () => {
    setEditingDescription(false);
    Cookies.set(`description_${column}`, description);
  };
  useEffect(() => {
    const savedDescription = Cookies.get(`description_${column}`);
    const savedComments = Cookies.get(`comments_${column}`);
    if (savedDescription) {
      setDescription(savedDescription);
    }
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [column]);
  return (
    <Container>
      <Content>
        <TitleCard>Планирование проекта</TitleCard>
        <TitleColumn>в колонке {title}</TitleColumn>
        <Description>
          <Title>
            Описание
            {editingDescription ? (
              <ButtonEditTitle onClick={saveDescription}>
                &#10004;
              </ButtonEditTitle>
            ) : (
              <ButtonEditTitle onClick={() => setEditingDescription(true)}>
                &#9998;
              </ButtonEditTitle>
            )}
          </Title>
          {editingDescription ? (
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <Text>{description}</Text>
          )}
        </Description>
        <AuthorCards>Автор - {author}</AuthorCards>
        <Comments>
          <Title>Действие</Title>
          <Input
            placeholder="Напишите комментарий..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <ButtonAdd onClick={addComment}>Отправить</ButtonAdd>
          <ContainerComments>
            {comments.map((comment, index) => (
              <ContainerCommentsContent key={index}>
                <AuthorName>{author}</AuthorName>

                <WrapFlex>
                  <CommentBlock>{comment}</CommentBlock>
                  <div>
                    <ButtonEdit onClick={() => editComment(index)}>
                      Изменить
                    </ButtonEdit>
                    <ButtonEdit onClick={() => deleteComment(index)}>
                      Удалить
                    </ButtonEdit>
                  </div>
                </WrapFlex>
              </ContainerCommentsContent>
            ))}
          </ContainerComments>
        </Comments>
      </Content>
      <ButtonClose onClick={closePopup}>&#10006;</ButtonClose>
    </Container>
  );
};

export default CardDetailsPopup;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -330px;
  width: 600px;
  height: 660px;
  background: #2f3133;
  border-radius: 10px;
  padding: 20px 30px;
  cursor: default;
`;

const Content = styled.div``;

const TitleCard = styled.h1`
  margin: 0;
  font-size: 20px;
  color: #fff;
`;

const TitleColumn = styled.h3`
  margin: 0;
  padding-top: 5px;
  font-size: 14px;
  color: #ffffff9e;
`;

const Description = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #fff;
  margin-bottom: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #1f1f22;
  }
  &::-webkit-scrollbar-thumb {
    background: #111;

    border-radius: 8px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: max-content;
  max-height: 100px;
  margin: 0;
  padding-top: 5px;
  font-size: 14px;
  color: #fff;
  margin-left: 5px;
  margin-bottom: 5px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #1f1f22;
  }
  &::-webkit-scrollbar-thumb {
    background: #111;

    border-radius: 8px;
  }
`;

const ButtonEditTitle = styled.span`
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: #e92525;
  }
`;

const ContainerComments = styled.div`
  width: 100%;
  height: max-content;
  max-height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #1f1f22;
  }
  &::-webkit-scrollbar-thumb {
    background: #111;

    border-radius: 8px;
  }
`;

const ContainerCommentsContent = styled.div`
  padding: 10px 0;
`;

const AuthorCards = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #fff;
`;

const Comments = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 70%;
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
`;

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

const ButtonClose = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  color: #fff;
  cursor: pointer;
`;

const AuthorName = styled.h3`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  padding: 5px -5px 0;
  margin: 0;
`;

const WrapFlex = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentBlock = styled.div`
  width: 70%;
  background: #fff;
  border-radius: 5px;
  padding: 10px 10px;
`;

const ButtonEdit = styled.div`
  background: transparent;
  color: #e9e8e8;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #949292;
  }
`;
