import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTask, toggleCompleted } from '../../features/todo/todoSlice';
import { IStore } from '../../types/store';
import { ITodo } from '../../types/TodoList/todo';

interface IProps {
    todos: ITodo[];
}

const TaskList = ({ todos }: IProps) => {
    const { activeTask } = useSelector((state: IStore) => state.todos)
    const dispatch = useDispatch();

    const handleComplete = (event: React.MouseEvent, _id: string) => {
        event.stopPropagation();
        dispatch(toggleCompleted(_id));
    }

    const handleActiveId = (_id: string, name: string) => {
        dispatch(setActiveTask({ _id, name }));
    }

    return (
        <ul className="task-list">
            {todos.map((todo) => (
                <li
                    className={`task-item
                        ${todo.completed ? "completed" : ""} 
                        ${activeTask._id === todo._id ? "active" : ""}
                    `}
                    key={todo._id}
                    onClick={() => handleActiveId(todo._id, todo.name)}
                >
                    <div className="task__head">
                        <FontAwesomeIcon
                            className='fa-check'
                            onClick={(e) => handleComplete(e, todo._id)}
                            icon={faCircleCheck}
                        />
                        <h3>{todo.name}</h3>
                    </div>
                    {todo.note && <p className="task__body">{todo.note}</p>}
                </li>
            ))}
        </ul>
    )
}

export default TaskList