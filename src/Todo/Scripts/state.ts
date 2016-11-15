export interface Todo {
    id: number,
    text: string,
    isCompleted: boolean,
    isPersisted: boolean
}

export interface State {
    isLoading: boolean,
    todos: Todo[]
};