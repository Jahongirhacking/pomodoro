import { useSelector } from "react-redux";
import AddTaskButton from "../../components/TodoList/AddTaskButton";
import TaskInput from "../../components/TodoList/TaskInput";
import "./style.scss";
import { IStore } from "../../types/store";
import TaskList from "../../components/TodoList/TaskList";

const TodoList = () => {
    const { todos, activeTask } = useSelector((state: IStore) => state.todos)
    const { showAddTaskButton } = useSelector((state: IStore) => state.todos)
    return (
        <div className="todo-list">
            <header>
                <h2><span>#1</span> {activeTask.name}</h2>
                <div className="list-head">Tasks</div>
            </header>
            <TaskList todos={todos.filter(todo => !todo.completed)} />
            <TaskList todos={todos.filter(todo => todo.completed)} />
            {showAddTaskButton ? <AddTaskButton /> : <TaskInput />}
        </div>
    )
}

export default TodoList