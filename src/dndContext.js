import React from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnList from "./columnList";
import { UseStateContext } from "./stateContext";

const TodoColumns = styled.div`
  display: flex;
`;

export default function DndWrapping() {
    const  stateFromProvider = UseStateContext();
    const  state = stateFromProvider.state;

    let colObj;
    let taskInCol;
    const columnGroup = state.columnOrder.map((colId) => {
      colObj = state.columns[colId];
      taskInCol = colObj.taskIds.map((tId) => state.tasks[tId]);
      return(
        <ColumnList key={colId} col={colObj} tasks={taskInCol}></ColumnList>
      )
    })
    

    const onDragEnd = result => {
        // after dnd, visiable style back to initial def
        document.body.style.color = "inherit";
        document.body.style.color = "inherit";
    
        const { destination, source, draggableId } = result;
    
        if (!destination) { return };
        if ( source.index === destination.index && source.droppableId === destination.droppableId) { return };

        // dnd in a same column 
        if(source.droppableId === destination.droppableId) {
          const targetCol = state.columns[source.droppableId];
          const newTaskIds = Array.from(targetCol.taskIds);
          //console.log(newTaskIds);
          newTaskIds.splice(source.index, 1);
          //console.log(newTaskIds);
          newTaskIds.splice(destination.index,0, draggableId);
          //console.log(newTaskIds);
      
          const newColumn = {
            ...targetCol,
            taskIds: newTaskIds,
          };
      
          const newState = {
            ...state,
            columns: {
              ...state.columns,
              [targetCol.id]: newColumn,
            }
        }
    
          stateFromProvider.setState(pre => newState);
          return;
        }

        //dnd between different columns
        const colfrom = state.columns[source.droppableId];
        const colTo = state.columns[destination.droppableId];

        const colfromTaskIds = Array.from(colfrom.taskIds);
        colfromTaskIds.splice(source.index, 1);
        console.log(colfromTaskIds);
        const colToTaskIds = Array.from(colTo.taskIds);
        colToTaskIds.splice(0, 0, draggableId);
        console.log(colToTaskIds);

        const newColumnfrom = {
          ...colfrom,
          taskIds: colfromTaskIds,
        }
        const newColumnTo = {
          ...colTo, 
          taskIds: colToTaskIds,
        }
        const newState = {
          ...state,
          columns: {
            ...state.columns, 
            [colfrom.id]: newColumnfrom,
            [colTo.id]: newColumnTo,
          }
        }
        stateFromProvider.setState(pre => newState);
      }

    return(
        <DragDropContext
            onDragEnd={onDragEnd}
        >
          <TodoColumns>{ columnGroup }</TodoColumns>
        </DragDropContext>
    )
}
