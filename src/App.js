import logo from './logo.svg';
import './App.css';
import DataObj from './taskData';
import ColumnList from './columnList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

//const dataPackage = DataObj;
//const ids = dataPackage.columnOrder[0];
//console.dir(dataPackage.columns[ids]);

export default function App() {
  const [state, setState] = useState(DataObj);
  
  let col;
  let taskInCol;
  const columnGroup = state.columnOrder.map((colId) => {
    col = state.columns[colId];
    taskInCol = col.taskIds.map((tId) => state.tasks[tId]);
    return(
      <ColumnList key={colId} col={col} tasks={taskInCol}></ColumnList>
    )
  })


  const onDragStart = () => {
    document.body.style.color = 'red';
  }

  const onDragUpdate = () => {

  }

  const onDragEnd = result => {
    // after dnd, visiable style back to initial def
    document.body.style.color = "inherit";
    document.body.style.color = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) { return };
    if ( source.index === destination.index && source.droppableId === destination.droppableId) { return };

    const targetCol = state.columns[source.droppableId];
    const newTaskIds = Array.from(targetCol.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index,0, draggableId);

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

    setState(pre => newState);
  }

  return(
    <DragDropContext 
      onDragStart = { onDragStart }
      onDragUpdate = { onDragUpdate }
      onDragEnd = { onDragEnd }
    >
      <div>{ columnGroup }</div>
    </DragDropContext>
    
  )
}
