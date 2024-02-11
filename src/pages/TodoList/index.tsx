import { useSelector } from "react-redux";
import AddTaskButton from "../../components/TodoList/AddTaskButton";
import TaskInput from "../../components/TodoList/TaskInput";
import "./style.scss";
import { IStore } from "../../types/store";
import TaskList from "../../components/TodoList/TaskList";
import MoreOptionButton from "../../components/TodoList/MoreOptionButton";
import DeleteListButtons from "../../components/TodoList/DeleteListButtons";

const TodoList = () => {
    const { todos, activeTask, orderNumber } = useSelector((state: IStore) => state.todos)
    const { showAddTaskButton } = useSelector((state: IStore) => state.todos)
    const completedTodos = todos.filter(todo => todo.completed);
    const notCompletedTodos = todos.filter(todo => !todo.completed);
    return (
        <div className="todo-list">
            <header>
                <h2><span>#{orderNumber}</span> {activeTask.name}</h2>
                <div className="list-head">
                    <span className="title">Tasks</span>
                    <MoreOptionButton>
                        <DeleteListButtons />
                    </MoreOptionButton>
                </div>
            </header>
            {notCompletedTodos.length !== 0 && <TaskList todos={notCompletedTodos} />}
            {completedTodos.length !== 0 && <TaskList todos={completedTodos} />}
            {showAddTaskButton ? <AddTaskButton /> : <TaskInput />}
        </div>
    )
}

export default TodoList