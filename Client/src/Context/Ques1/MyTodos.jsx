import React, { useContext } from 'react'
import MyTodo from './MyTodo'
import { TodoListConTXT } from "./TodoList-Store.jsx"

const MyTodos = () => {

    const { todos } = useContext(TodoListConTXT);

    return (
        <div>
            <ul className="w-full max-w-md space-y-3">
                {todos.length === 0 ? (
                    <h3 className="text-center text-pink-400 text-xl">
                        Your Todo List is Empty !
                    </h3>
                ) : (
                    <>
                        {todos.map((todo, idx) => (
                            <MyTodo key={idx + 1} todo={todo} />
                        ))}
                    </>
                )}
            </ul>
        </div>
    )
}

export default MyTodos
