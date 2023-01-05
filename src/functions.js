

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
        "completed": false
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
















