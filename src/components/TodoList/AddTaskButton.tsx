import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setShowAddTaskButton } from "../../features/todo/todoSlice";
import { useCallback, useEffect } from "react";

const AddTaskButton = () => {
    const dispatch = useDispatch();

    const handleClick = useCallback((event?: React.MouseEvent) => {
        if (event) event.stopPropagation();
        dispatch(setShowAddTaskButton(false))
    }, [dispatch])

    const handleKeyboard = useCallback((e: KeyboardEvent) => {
        const [key, ctrl] = [e.key, e.ctrlKey];
        if (key === "Enter" && ctrl) handleClick();
    }, [handleClick])

    useEffect(() => {
        document.addEventListener("keyup", handleKeyboard)
        return () => {
            document.removeEventListener("keyup", handleKeyboard)
        }
    }, [handleKeyboard])

    return (
        <button
            className="add-task-btn"
            onClick={(e) => handleClick(e)}
            title="Ctrl + Enter"
        >
            <FontAwesomeIcon icon={faPlusCircle} className="fa-plus" />
            Add Task
        </button>
    )
}

export default AddTaskButton