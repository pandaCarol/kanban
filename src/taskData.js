
const DataObj = {
    tasks: {
        'task-1': {
            "userId": 1,
            "id": "task-1",
            "title": "delectus aut autem",
            "completed": false
        },
        'task-2': {
            "userId": 1,
            "id": "task-2",
            "title": "quis ut nam facilis et officia qui",
            "completed": false
        },
        'task-3': {
            "userId": 1,
            "id": "task-3",
            "title": "fugiat veniam minus",
            "completed": false
        },
        'task-4': {
            "userId": 1,
            "id": "task-4",
            "title": "et porro tempora",
            "completed": true
        },
        'task-5': {
            "userId": 1,
            "id": "task-5",
            "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
            "completed": false
        },
        'task-6': {
            "userId": 1,
            "id": "task-6",
            "title": "qui ullam ratione quibusdam voluptatem quia omnis",
            "completed": false
        },
    },

    columns: {
        'column-1': {
            id: 'column-1', 
            title: 'To do List',
            taskIds: ['task-6', 'task-5', 'task-4', 'task-3', 'task-2', 'task-1'],
        },
        'column-2': {
            id: 'column-2', 
            title: 'In progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3', 
            title: 'Done',
            taskIds: [],
        }

    },

    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default DataObj







