import { useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { addTodo, setShowAddTaskButton } from "../../features/todo/todoSlice";

const TaskInput = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleCancel = useCallback(() => {
        dispatch(setShowAddTaskButton(true));
    }, [dispatch])

    const handleSave = useCallback(() => {
        const input = inputRef.current!.value.trim();
        if (!input) return;
        dispatch(addTodo({
            name: input,
            note: textareaRef.current!.value
        }))
    }, [dispatch])

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        document.addEventListener("click", handleCancel);
        return () => {
            document.removeEventListener("click", handleCancel);
        }
    }, [handleCancel])


    const handleKeyboard = useCallback((e: KeyboardEvent) => {
        const [key, ctrl] = [e.key, e.ctrlKey];
        if (key === "Enter" && ctrl) handleSave();
        if (key === "Escape") handleCancel();
    }, [handleSave, handleCancel])

    useEffect(() => {
        document.addEventListener("keyup", handleKeyboard)
        return () => {
            document.removeEventListener("keyup", handleKeyboard)
        }
    }, [handleSave, handleKeyboard])

    return (
        <form
            className="task-form"
            onSubmit={(e) => { e.preventDefault() }}
            onClick={(e) => { e.stopPropagation() }}
        >
            <div className="form-body">
                <input className="task-name" type="text" ref={inputRef} placeholder="What are you working on?" />
                <textarea className="task-note" ref={textareaRef} placeholder="If you have some notes..." />
            </div>
            <div className="form-btns">
                <button type="button" className="cancel-btn" onClick={handleCancel} title="Escape key">Cancel</button>
                <button type="button" className="save-btn" onClick={handleSave} title="Ctrl + Enter">Save</button>
            </div>
        </form>
    )
}

export default TaskInput