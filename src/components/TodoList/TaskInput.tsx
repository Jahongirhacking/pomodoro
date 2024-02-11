import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { addTodo, setShowAddTaskButton } from "../../features/todo/todoSlice";

const TaskInput = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [])

    const handleCancel = () => {
        dispatch(setShowAddTaskButton(true))
    }

    const handleSave = () => {
        dispatch(addTodo({
            name: inputRef.current!.value,
            note: textareaRef.current!.value
        }))
    }

    return (
        <form className="task-form" onSubmit={(e) => { e.preventDefault() }}>
            <div className="form-body">
                <input className="task-name" type="text" ref={inputRef} placeholder="What are you working on?" />
                <textarea className="task-note" ref={textareaRef} placeholder="If you have some notes..." />
            </div>
            <div className="form-btns">
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="button" className="save-btn" onClick={handleSave}>Save</button>
            </div>
        </form>
    )
}

export default TaskInput