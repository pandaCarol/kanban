import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import SubTask from "./newList";

const ColumnContainer = styled.div`
    margin: 6px;
    width: 50%;
    border-radius: 12px;

    background-color: ${props => props.isDragging ? 'rgba(102, 121, 187, 0.25)' : 'rgba(102, 121, 187, 0)'}
`

const Container = styled.div`
    border-radius: 12px;
    min-height: 100%;
`;
const TitleCol = styled.h2`
    margin: 12px;   
    padding: 12px;    
    text-align: center;
`;
const TasksInfo = styled.div`
    text-align: center;s
`
const TodoTask = styled.div`
    padding: 8px;
    min-height: 120px;
`;

function infos(col) {
    const info = col.taskIds.length > 1 ? `${col.taskIds.length} tasks` :  `${col.taskIds.length} task`;
    switch(col.title) {
        case 'To do List':
            return(`${info} left`);
        case 'In progress':
            return(`${info} in progress`);
        case 'Done':
            return(`${info} completed`);
        default:
            break;
    }
}

//***Questions:
// */ I have no idea where is the upper level of 'isDraggingOver'. Props.isDraagingOver undef, but below snapshot.isDragging Over works! 
// !!!! Question solved! see "line 11" about $ColumnContainer = styled.div`$

export default function ColumnList({col, tasks, index}) {
    //console.dir(<i class="fa fa-tasks" aria-hidden="true"></i>);
    //console.log(col);
    //console.log(tasks);
    

    return(
        <Draggable draggableId={col.id} index={index}>
            {(provided, snapshot) => (
                <ColumnContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging = {snapshot.isDragging}
                >
                    <Droppable droppableId={col.id} type="task">
                        {(provided, snapshot) => (
                            <Container 
                                style = {{border: snapshot.isDraggingOver ? '3px solid rgba(102, 121, 187, 0.5)' : '1px solid lightgray'}}
                                //****Using style ={...} way to solve the problem that can't find the upper level */
                                //isDraggingOver = {snapshot.isDraggingOver}
                            >
                                <TitleCol>{col.title}</TitleCol>
                                <TasksInfo>{infos(col)}</TasksInfo>
                                <TodoTask
                                    ref = {provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((task, index)=> <SubTask key={task.id} taskObj={task} index={index} colName={col.id}></SubTask>)}
                                </TodoTask>
                                {/*console.dir(Droppable.snapshot)*/}
                                { provided.placeholder }
                            </Container>
                        )}
                    </Droppable>
                </ColumnContainer>
            )}
        </Draggable>
        
        
        
    )
}