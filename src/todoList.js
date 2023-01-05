import React from "react";
import styled from "styled-components";
import InputComponent from "./inputbar";
import DndWrapping from "./dndContext";

const Container = styled.div`
    text-align: center;
`;


export default function TodoList() {
    return(
        <Container>
            <h2>Task KanBan</h2>
            <InputComponent ></InputComponent>
            <DndWrapping></DndWrapping>
        </Container>
    )
}