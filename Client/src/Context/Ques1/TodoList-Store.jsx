import { createContext, useEffect, useReducer } from "react";

export const TodoListConTXT = createContext({
    todos: [],
    addTodo: () => { },
    deleteTodo: () => { },
    editTodo: () => { },
    deleteAllTodo: () => { },
    markedTodo: () => { }
})

// reducer function 
const todoReducer = (todos, action) => {
    let newTodos = todos;

    if (action.type === "ADD_TODO") {
        newTodos = [action.payload.todo, ...todos];
    }

    if (action.type === "DEL_TODO") {
        newTodos = todos.filter((to) => to.id !== action.payload.id);
    }

    if (action.type === "EDIT_TODO") {
        let updated = todos.map((todo) =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        )

        newTodos = updated;
    }

    if (action.type === "MARK_TODO") {
        let updated = todos.map((todo) =>
            todo.id === action.payload.id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
        newTodos = updated;
    }


    if (action.type === "DEL_ALL") {
        let val = action.payload.val;
        newTodos = val;
    }

    if (action.type === "INIL_TODO") {
        newTodos = action.payload.todos;
    }

    localStorage.setItem("TODY", JSON.stringify(newTodos));
    return newTodos;

}

// make a provider

const TodoListProvider = ({ children }) => {
    const [todos, dispatchPost] = useReducer(todoReducer, []);

    const addTodo = (todo) => {
        console.log("Value got in Store", todo);
        dispatchPost({
            type: "ADD_TODO",
            payload: {
                todo: todo
            }
        })
    }

    const deleteTodo = (id) => {
        dispatchPost({
            type: "DEL_TODO",
            payload: {
                id: id
            }
        })
    }


    const editTodo = (id, text) => {
        dispatchPost({
            type: "EDIT_TODO",
            payload: {
                id: id,
                text: text
            }
        })
    }

    const markedTodo = (id) => {
        dispatchPost({
            type: "MARK_TODO",
            payload: {
                id: id
            }
        })
    }

    const deleteAllTodo = (val) => {
        dispatchPost({
            type: "DEL_ALL",
            payload: {
                val: val
            }
        })
    }

    // useEffect wiill come here 

    useEffect(() => {
        let todos = localStorage.getItem("TODY");
        if (todos) {
            try {
                let reTodos = JSON.parse(todos);
                dispatchPost({
                    type: "INIL_TODO",
                    payload: {
                        todos: reTodos
                    }
                })
            } catch (error) {
                console.log("Error in  'INIL_TODO'", error);
            }
        }
    }, [])

    return (
        <TodoListConTXT.Provider
            value={{ todos, addTodo, deleteTodo, deleteAllTodo, editTodo, markedTodo }} >
            {children}
        </TodoListConTXT.Provider>
    )
}

export default TodoListProvider;