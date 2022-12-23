import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = styled.div`
margin: 12px;   
padding: 12px;
border: 1px solid lightgray;
`;

export default function TaskList({ taskObj, index }) {
    return(
        <Draggable draggableId={taskObj.id} index={index}>
            {provided => (
                <TaskItem
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref = { provided.innerRef }
                >
                    { taskObj.title }
                </TaskItem>
            )}
        </Draggable>
        
    )
}