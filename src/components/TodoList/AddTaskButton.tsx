import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setShowAddTaskButton } from "../../features/todo/todoSlice";

const AddTaskButton = () => {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setShowAddTaskButton(false))
    }

    return (
        <button className="add-task-btn" onClick={(e) => handleClick(e)}>
            <FontAwesomeIcon icon={faPlusCircle} className="fa-plus" />
            Add Task
        </button>
    )
}

export default AddTaskButton