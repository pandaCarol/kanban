

//***function to 'inputbar' 
//->input some value and press enter databank will be updated */
export function createNewList(state,value) {


    
    console.dir(state);
    console.dir(value);

    const newListName = `task-${Object.keys(state.tasks).length+1}`;
    const newList = {
        "userId": 1,
        "id": newListName,
        "title": value,
        "completed": false,
        "isDelete": false,
    }
    const newDataObj = {
        ...state,
    }
    //**create a new task in 'tasks' 
    newDataObj.tasks[newListName] = newList;
    //**create the task name in 'columns -> column-1 -> taskIds'
    const newColumnsArray = [newListName].concat(newDataObj.columns['column-1'].taskIds);
    newDataObj.columns['column-1'].taskIds = newColumnsArray;
    //newDataObj.columns['column-1'].taskIds.push(newListName);
    //console.dir(newDataObj);
    return(newDataObj);
}

export function taskDelete(task, state, colName, index) {
    //console.log(task);
    //console.log(state);

    //update prop 'isDelete' in tasks from false to true
    const deletedTask = {
        ...task,
        "isDelete": true,
    }

    //remove the task name from Array-taskIds of the target column
    const updateTaskIdsArray = Array.from(state.columns[colName].taskIds);
    updateTaskIdsArray.splice(index,1);
    const updateCol = {
        ...state.columns[colName],
        taskIds: updateTaskIdsArray,
    }

    //modify state
    const newState = {
        ...state,
        tasks: {
            ...state.tasks,
            [task.id]: deletedTask,
        },
        columns: {
            ...state.columns,
            [colName]: updateCol
        }
    }
    return(newState);
}

export function taskCompleted(task, state, colName, index) {
    //console.log('start to run taskCompleted');
    const isCompleted = {
        completed: task.completed === false ? true : false,
        colFrom: task.completed === false ? colName : 'column-3',
        colTo: task.completed === false ? 'column-3' : 'column-1',
    }

    const CompletedTask = {
        ...task,
        "completed": isCompleted.completed,
    }

    //remove the task name from 'unfinished' columns to 'done' column
    const updateTaskIdsFrom = Array.from(state.columns[isCompleted.colFrom].taskIds);
    updateTaskIdsFrom.splice(index,1);
    const updateColFrom = {
        ...state.columns[isCompleted.colFrom],
        taskIds: updateTaskIdsFrom,
    }
    const updateTaskIdsTo = Array.from(state.columns[isCompleted.colTo].taskIds);
    updateTaskIdsTo.splice(0,0, task.id);
    //console.log(updateTaskIdsTo);
    const updateColTo = {
        ...state.columns[isCompleted.colTo],
        taskIds: updateTaskIdsTo,
    }



    //modify state
    const newState = {
        ...state,
        tasks: {
            ...state.tasks,
            [task.id]: CompletedTask,
        },
        columns: {
            ...state.columns,
            [isCompleted.colFrom]: updateColFrom,
            [isCompleted.colTo]: updateColTo,
        }
    }
    return(newState);
}
















