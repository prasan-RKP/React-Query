import React, { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        setTodos([...todos, { text: newTodo }]);
        setNewTodo("");
    }

    const deleteTodo = (text) => {
      const ptxt = text.trim();
      setTodos((todo)=> todo.filter((td)=> td.text.trim() !== ptxt));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-red-700">Todo List</h2>

                {/* Input Section */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a todo"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Add
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Delete
                    </button>
                </div>

                {/* Todo List */}
                <ul className="space-y-2">
                    {todos.length === 0 ? (
                        <p className="text-gray-500 text-center">No Todos Available</p>
                    ) : (
                        todos.map((item) => (
                            <li
                                key={item.text}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm"
                            >
                                <span className="text-blue-500">{item.text}</span>
                                <button
                                     onClick={()=> deleteTodo(item.text)} 
                                    className="text-white p-2 rounded-md bg-red-950 hover:text-red-800"
                                >
                                    delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
