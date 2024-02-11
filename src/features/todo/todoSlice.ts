import { createSlice } from "@reduxjs/toolkit";
import { IActiveTask, ITodo, ITodoState } from "../../types/TodoList/todo";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_ACTIVE_NAME = "Time to focus!";

const initialState: ITodoState = {
  todos: [],
  showAddTaskButton: true,
  activeTask: {
    _id: null,
    name: DEFAULT_ACTIVE_NAME,
  },
  orderNumber: 1,
};

const todoSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {
    setShowAddTaskButton: (state, action: { payload: boolean }) => {
      return { ...state, showAddTaskButton: action.payload };
    },

    toggleCompleted: (state, action: { payload: string }) => {
      const todos: ITodo[] = [...state.todos].map((todo) => ({
        _id: todo._id,
        name: todo.name,
        note: todo.note,
        completed: todo.completed,
      }));
      const targetTodo = todos.find((todo) => todo._id === action.payload);
      targetTodo!.completed = !targetTodo!.completed;
      const notCompletedTodos = todos.filter((todo) => !todo.completed);
      const activeTask = {
        _id: notCompletedTodos.length === 0 ? null : notCompletedTodos[0]._id,
        name:
          notCompletedTodos.length === 0
            ? DEFAULT_ACTIVE_NAME
            : notCompletedTodos[0].name,
      };
      return {
        ...state,
        todos,
        activeTask,
      };
    },

    setActiveTask: (state, action: { payload: IActiveTask }) => {
      return {
        ...state,
        activeTask: action.payload,
      };
    },

    increaseOrderNumber: (state) => {
      return {
        ...state,
        orderNumber: state.orderNumber + 1,
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

    deleteTodo: (state, action: { payload: string }) => {
      const todos = state.todos.filter((todo) => todo._id !== action.payload);
      const notCompletedTodos = todos.filter((todo) => !todo.completed);
      const activeTask = {
        _id: notCompletedTodos.length === 0 ? null : notCompletedTodos[0]._id,
        name:
          notCompletedTodos.length === 0
            ? DEFAULT_ACTIVE_NAME
            : notCompletedTodos[0].name,
      };

      return {
        ...state,
        todos,
        activeTask,
      };
    },
  },
});

export const {
  setShowAddTaskButton,
  toggleCompleted,
  setActiveTask,
  increaseOrderNumber,
  addTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
