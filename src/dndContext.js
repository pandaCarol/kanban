import React from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
    const columnGroup = state.columnOrder.map((colId, index) => {
      colObj = state.columns[colId];
      taskInCol = colObj.taskIds.map((tId) => state.tasks[tId]);
      return(
        <ColumnList key={colId} col={colObj} tasks={taskInCol} index={index}/>
      )
    })
    

    const onDragEnd = result => {
        // after dnd, visiable style back to initial def
        document.body.style.color = "inherit";
        document.body.style.color = "inherit";
    
        const { destination, source, draggableId, type } = result;
    
        if (!destination) { return };
        if ( source.index === destination.index && source.droppableId === destination.droppableId) { return };
        //console.log(draggableId);

        //dnd column
        if (type === 'column') {
          const newColumnOrder = Array.from(state.columnOrder);
          newColumnOrder.splice(source.index, 1);
          newColumnOrder.splice(destination.index, 0, draggableId);

          const newState = {
            ...state,
            columnOrder: newColumnOrder
          }

          stateFromProvider.setState(newState);
          return
        }

        if (type === 'task') {
          // dnd task in a same column 
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

           //dnd task between different columns
            const colfrom = state.columns[source.droppableId];
            const colTo = state.columns[destination.droppableId];
            const isCompleted = destination.droppableId === 'column-3' ? true : false;
            
            const colfromTaskIds = Array.from(colfrom.taskIds);
            colfromTaskIds.splice(source.index, 1);
            //console.log(colfromTaskIds);
            const colToTaskIds = Array.from(colTo.taskIds);
            colToTaskIds.splice(0, 0, draggableId);
            //console.log(colToTaskIds);

            const newTask = {
              ...state.tasks[draggableId],
              "completed": isCompleted,
            }

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
              tasks: {
                ...state.tasks,
                [draggableId]: newTask,
              },
              columns: {
                ...state.columns, 
                [colfrom.id]: newColumnfrom,
                [colTo.id]: newColumnTo,
              }
            }
            stateFromProvider.setState(pre => newState);
          }
        }
        

    return(
        <DragDropContext
            onDragEnd={onDragEnd}
        >
          <Droppable droppableId="allColumns" direction="horizontal" type="column">
            {(provided, snapshot) => (
              <TodoColumns
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                { columnGroup }
                {provided.placeholder}
              </TodoColumns>
            )}
          </Droppable>
        </DragDropContext>
    )
}
