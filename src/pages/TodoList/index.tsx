import AddTaskButton from "../../components/TodoList/AddTaskButton";
import TaskInput from "../../components/TodoList/TaskInput";
import "./style.scss";

const TodoList = () => {
    return (
        <div className="todo-list">
            <header>
                <h2><span>#1</span> Time to focus!</h2>
                <div className="list-head">Tasks</div>
            </header>
            <ul></ul>
            <TaskInput />
            <AddTaskButton />
        </div>
    )
}

export default TodoList