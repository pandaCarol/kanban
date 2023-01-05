import React from "react";
import styled from "styled-components";
import { UseStateContext } from "./stateContext";
import { Draggable } from "react-beautiful-dnd";
import { IconUncheck } from "./icons";
import { taskDelete, taskCompleted } from "./functions";

const listStatus = {
    todo: '',
    start: '',
    done: ''
}

const ColumnWrapping = styled.div`
    margin: 12px 0;
    padding: 6px;
    border: 1px solid lightgray;
    border-radius: 6px;
    text-align: left;
    display: flex;
`;
const Checkboxs = styled.div`
    margin: auto 1px;
    height:30px;

    &:hover{
        cursor: pointer;
        height: 36px;
    }
`
const Content = styled.div`
    margin: auto 9px;
    width: 90%;
`
const BtnDelete = styled.button`
    background-color: rgba(255, 99, 71, 0);
    border: none;
    height: 30px;
    color: rgb(180, 180, 180);

    &:hover{
        cursor: pointer;
        height: 36px;
        color: rgb(90, 90, 90);
    }
`


export default function NewColumn({ taskObj, index, colName }) {
    const stateFromProvider = UseStateContext();
    const state = stateFromProvider.state;

    //const columnNameArray = state.columnOrder;
    return(
        <Draggable draggableId={taskObj.id} index={index}>
            {(provided, snapshot) => (
                <ColumnWrapping key={colName} status={taskObj.completed} index={index}
                    { ...provided.draggableProps }
                    ref = { provided.innerRef }
                    isDragging = { snapshot.isDragging }
                > 
                    <Checkboxs onClick={()=> stateFromProvider.setState(taskCompleted(taskObj, state, colName,index))}><IconUncheck /></Checkboxs>
                    <Content { ...provided.dragHandleProps }>{taskObj.title}</Content>
                    <BtnDelete onClick={()=> stateFromProvider.setState(taskDelete(taskObj, state, colName,index))}>X</BtnDelete>
                </ColumnWrapping>
                )
            }
        </Draggable>
    )
}