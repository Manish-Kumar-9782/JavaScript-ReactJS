import { useEffect } from 'react'
import { fetchTaskLists } from '../../store/slices/taskListSlice'
import { useDispatch } from 'react-redux'

const TaskLists = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchTaskLists(dispatch)
    }, [])


    return (
        <div>
            <h1>Task Lists</h1>
        </div>
    )
}

export default TaskLists
