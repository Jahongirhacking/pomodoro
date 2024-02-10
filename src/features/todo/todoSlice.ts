import { createSlice } from "@reduxjs/toolkit";
import { IActiveTask, ITodo, ITodoState } from "../../types/TodoList/todo";
import { v4 as uuidv4 } from "uuid";

const initialState: ITodoState = {
  todos: [],
  showAddTaskButton: true,
  activeTask: {
    _id: null,
    name: "Time to focus!",
  },
};

const todoSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {
    setShowAddTaskButton: (state, action: { payload: boolean }) => {
      return { ...state, showAddTaskButton: action.payload };
    },

    toggleCompleted: (state, action: { payload: string }) => {
      const targetTodo = state.todos.find(
        (todo) => todo._id === action.payload
      );
      targetTodo!.completed = !targetTodo!.completed;
    },

    setActiveTask: (state, action: { payload: IActiveTask }) => {
      return {
        ...state,
        activeTask: action.payload,
      };
    },

    addTodo: (state, action) => {
      const currentTodo: ITodo = {
        ...action.payload,
        completed: false,
        _id: uuidv4(),
      };
      return {
        ...state,
        todos: [...state.todos, { ...currentTodo }],
        showAddTaskButton: true,
        activeTask:
          state.todos.length === 0
            ? { _id: currentTodo._id, name: currentTodo.name }
            : state.activeTask,
      };
    },
  },
});

export const { setShowAddTaskButton, toggleCompleted, setActiveTask, addTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
