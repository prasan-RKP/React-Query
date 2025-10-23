import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


const TodoApp = () => {

    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    const handleAddTodo = () => {
        if (!text) {
            toast.error("Please add todo First 📌");
            return false;
        }
        if (text.trim().length < 3) {
  toast.error("Todo must be at least 3 characters long 📏");
  return;
}

        let newTodo = { id: Date.now().toString(36).slice(-4), text: text.trim(), marked: false };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
        setText("");
    }

    useEffect(()=> {
      let myTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(myTodos || []);
      
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-base-200 to-base-300 py-12">
            <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-6 border border-base-300 backdrop-blur-md">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center mb-6 text-primary tracking-wide">
                    📝 Todo List
                </h1>

                {/* Input and Buttons */}
                <div className="flex gap-2 mb-6">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Enter a task..."
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="btn btn-primary font-semibold hover:scale-105 transition-transform duration-200">
                        ADD
                    </button>
                    <button className="btn btn-error font-semibold hover:scale-105 transition-transform duration-200">
                        DELETE ALL
                    </button>
                </div>

                {/* Filter */}
                <div className="flex justify-end mb-4">
                    <select className="select select-bordered w-40 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                        <option>All</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>
                </div>

                {/* Todo List */}
                <ul className="space-y-3">
                    {todos.map((todo) => {
                        return (
                            <li className="flex items-center justify-between bg-base-200 p-3 rounded-xl shadow-md hover:bg-base-300 transition-all duration-200">
                                <span className="flex-1 text-lg pl-2 font-medium">{todo.text}</span>
                                <div className="flex gap-2">
                                    <button className="btn btn-sm btn-success hover:scale-105 transition-transform">
                                        MARK
                                    </button>
                                    <button className="btn btn-sm btn-error hover:scale-105 transition-transform">
                                        REMOVE
                                    </button>
                                    <button className="btn btn-sm btn-error hover:scale-105 transition-transform">
                                        Edit
                                    </button>
                                </div>
                            </li>
                        )
                    })}


                </ul>
            </div>
        </div>

    )
}

export default TodoApp
