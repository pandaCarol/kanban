import React from "react";
import styled from "styled-components";
import TaskList from "./taskList";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    margin: 6px;
    width: 50%;
    border: 1px solid lightgray;
`;
const TitleCol = styled.h2`
    margin: 12px;   
    padding: 12px;    
    text-align: center;
`;
const TodoTask = styled.div``;

export default function ColumnList({col, tasks}) {
    //console.dir(<i class="fa fa-tasks" aria-hidden="true"></i>);

    return(
        <Droppable droppableId={col.id}>
            {provided => (
                <Container 
                    ref = {provided.innerRef}
                    {...provided.droppableProps}
                >
                    <TitleCol>{col.title}</TitleCol>
                    <TodoTask>{tasks.map((task, index)=> <TaskList key={task.id} taskObj={task} index={index}></TaskList>)}</TodoTask>
                    { provided.placeholder }
                </Container>
            )}
        </Droppable>
        
    )
}