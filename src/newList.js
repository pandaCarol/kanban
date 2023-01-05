import React from "react";
import styled from "styled-components";
import { UseStateContext } from "./stateContext";
import { Draggable } from "react-beautiful-dnd";
import { IconUncheck } from "./icons";

const listStatus = {
    todo: '',
    start: '',
    done: ''
}

const ColumnWrapping = styled.div`
`;
const TaskContent = styled.div`
    margin: 12px 0;
    padding: 6px;
    border: 1px solid lightgray;
    border-radius: 6px;
    text-align: left;
    display: flex;
`;
const Checkboxs = styled.div`
    margin: auto 0;
    height:30px;

`
const Content = styled.div`
    margin: auto 9px;
    width: 80%;
`
const BtnDelete = styled.button`
    background-color: rgba(255, 99, 71, 0);
    border: none;
    height: 30px;
    color: gray;
`

function NewList({taskObj, index}) {
    /*
    const taskIds = column.taskIds;
    const idReversed = taskIds.slice().reverse();
    console.log(idReversed);
    */
    return(
        /*idReversed.map((id, index) => {
            const subtask = state.tasks[id]*/
        <TaskContent status={taskObj.completed} index={index}>
            <Checkboxs><IconUncheck /></Checkboxs>
            <Content>{taskObj.title}</Content>
            <BtnDelete>X</BtnDelete>
        </TaskContent>
    )
}

export default function NewColumn({ taskObj, index, colName }) {
    const stateFromProvider = UseStateContext();
    const state = stateFromProvider.state;

    //const columnNameArray = state.columnOrder;
    return(
        <Draggable draggableId={taskObj.id} index={index}>
            {(provided, snapshot) => (
                <ColumnWrapping key={colName} 
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref = { provided.innerRef }
                    isDragging = { snapshot.isDragging }
                >
                    <NewList taskObj={taskObj} index={index}></NewList>
                </ColumnWrapping>
                )
            }
        </Draggable>
    )
}