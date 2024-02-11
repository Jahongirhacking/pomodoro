export interface ITodo {
  name: string;
  note: string;
  completed: boolean;
  _id: string;
}

export interface IActiveTask {
  _id: string | null;
  name: string;
}

export interface ITodoState {
  todos: ITodo[];
  showAddTaskButton: boolean;
  activeTask: IActiveTask;
  orderNumber: number;
}
