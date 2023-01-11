import React from "react";
import styled from "styled-components";
import { UseStateContext } from "./stateContext";
import { Draggable } from "react-beautiful-dnd";
import { taskDelete, taskCompleted } from "./functions";
import DueCompo from "./dueComponents";
import checkboxUnclick from "./svg/checkboxUnclick.svg";
import checkboxClick from "./svg/checkboxClick.svg";

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

    &:hover {
        background-color: rgba(217, 217, 217, 0.1);
    }
`;

const ListWrapping = styled.div`
    text-align: left;
    display: flex;
`;

const Checkboxs = styled.div`
    margin: auto 3px;
    width: 24px;
    height:24px;
    border-radius: 50%;
    
    background-image: url(${props => props.completed ? checkboxClick : checkboxUnclick});
    background-position: center;
    background-size: cover;
    

    &:hover{
        cursor: pointer;
        background-color: rgba(102, 121, 187, 0.5);
        opacity: 0.5
    }
`;
const Content = styled.div`
    margin: 3px 9px;
    width: 90%;
`;
const BtnDelete = styled.button`
    background-color: rgba(255, 99, 71, 0);
    border: none;
    height: 30px;
    color: rgb(180, 180, 180);

    &:hover{
        cursor: pointer;
        height: 30px;
        color: rgba(102, 121, 187, 1);
    }
`;
const DueWrapping = styled.div`
    display: flex;
`;



export default function SubTask({ taskObj, index, colName }) {
    const stateFromProvider = UseStateContext();
    const state = stateFromProvider.state;

    const isDone = state.tasks[taskObj.id].completed;
    //const columnNameArray = state.columnOrder;
    return(
        <Draggable draggableId={taskObj.id} index={index}>
            {(provided, snapshot) => (
                <ColumnWrapping key={colName} status={taskObj.completed} index={index}
                    { ...provided.draggableProps }
                    ref = { provided.innerRef }
                    isDragging = { snapshot.isDragging }
                > 
                    <ListWrapping>
                        <Checkboxs onClick={()=> stateFromProvider.setState(taskCompleted(taskObj, state, colName,index))} completed={isDone}/>
                        <Content { ...provided.dragHandleProps }>{taskObj.title}</Content>
                        <BtnDelete onClick={()=> stateFromProvider.setState(taskDelete(taskObj, state, colName,index))}>X</BtnDelete>
                    </ListWrapping>
                    <DueWrapping>
                        <DueCompo taskObj={taskObj} colName={colName} />
                    </DueWrapping>
                    
                </ColumnWrapping>
                )
            }
        </Draggable>
    )
} 