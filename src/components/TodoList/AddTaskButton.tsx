import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setShowAddTaskButton } from "../../features/todo/todoSlice";

const AddTaskButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setShowAddTaskButton(false))
    }

    return (
        <button className="add-task-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faPlusCircle} className="fa-plus" />
            Add Task
        </button>
    )
}

export default AddTaskButton