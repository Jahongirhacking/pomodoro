import { createSlice } from "@reduxjs/toolkit";
import { IActiveTask, ITodo, ITodoState } from "../../types/TodoList/todo";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_ACTIVE_NAME = "Time to focus!";
const LOCAL_STORAGE_NAME = "todo_list";

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
  initialState: localStorage.getItem(LOCAL_STORAGE_NAME)
    ? {
        ...(JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_NAME)!
        ) as ITodoState),
        orderNumber: 1,
      }
    : initialState,
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
      const activeTask: IActiveTask = {
        _id: notCompletedTodos.length === 0 ? null : notCompletedTodos[0]._id,
        name:
          notCompletedTodos.length === 0
            ? DEFAULT_ACTIVE_NAME
            : notCompletedTodos[0].name,
      };
      const newState = {
        ...state,
        todos,
        activeTask,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
    },

    setActiveTask: (state, action: { payload: IActiveTask }) => {
      const newState = {
        ...state,
        activeTask: action.payload,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
    },

    increaseOrderNumber: (state) => {
      const newState = {
        ...state,
        orderNumber: state.orderNumber + 1,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
    },

    addTodo: (state, action) => {
      const currentTodo: ITodo = {
        ...action.payload,
        completed: false,
        _id: uuidv4(),
      };

      const newState = {
        ...state,
        todos: [...state.todos, { ...currentTodo }],
        showAddTaskButton: true,
        activeTask:
          state.todos.length === 0
            ? { _id: currentTodo._id, name: currentTodo.name }
            : state.activeTask,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
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
      const newState = {
        ...state,
        todos,
        activeTask,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
    },

    clearFinishedTasks: (state) => {
      const todos = state.todos.filter((todo) => !todo.completed);
      const activeTask: IActiveTask = {
        _id: todos.length === 0 ? null : state.activeTask._id,
        name: todos.length === 0 ? DEFAULT_ACTIVE_NAME : state.activeTask.name,
      };
      const newState = {
        ...state,
        activeTask,
        todos,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
    },

    clearAllTasks: (state) => {
      const newState = {
        ...state,
        todos: [],
        activeTask: {
          _id: null,
          name: DEFAULT_ACTIVE_NAME,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
      return newState;
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
  clearAllTasks,
  clearFinishedTasks,
} = todoSlice.actions;

export default todoSlice.reducer;
