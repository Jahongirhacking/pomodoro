import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { clearAllTasks, clearFinishedTasks } from "../../features/todo/todoSlice"

const DeleteListButtons = () => {
    const dispatch = useDispatch();

    const handleClearFinishedTasks = () => {
        dispatch(clearFinishedTasks());
    }

    const handleClearAllTasks = () => {
        dispatch(clearAllTasks());
    }

    return (
        <>
            <button className="option" onClick={handleClearFinishedTasks}>
                <FontAwesomeIcon icon={faTrashCan} />
                Clear finished tasks
            </button>
            <button className="option" onClick={handleClearAllTasks}>
                <FontAwesomeIcon icon={faTrash} />
                Clear all tasks
            </button>
        </>
    )
}

export default DeleteListButtons