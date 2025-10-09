// TodoFilter.jsx
import React, { useState } from "react";
import { toast } from "sonner";

const TodoFilter = () => {
    const [inputVal, setInputval] = useState("");
    const [todos, setMyTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState("");
    const [saveTodoText, setSaveTodotext] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTodoId, setEditTodoId] = useState("");
    const [toggle, setToggle] = useState(false);
    const [newTodos, setNewTodos] = useState([]);


    // Add Todo BTN
    const addTodo = () => {
        if (!inputVal) {
            toast.error("Please Fill you Value..");
            return false;
        }
        setMyTodos([
            ...todos,
            { id: Date.now().toString(36).slice(-4), text: inputVal, completed: false },
        ]);
        setInputval("");
    };

    // ALL delete Todo BTN
    const handleDeleteTodo = (todoId) => {
        const todoArr = todos.filter((todo) => todo.id !== todoId);
        setMyTodos(todoArr);
    };

    // Mark feature
    const handleMarkTodo = (todoId) => {
        let todoArr = todos.map((todo) => {
            if (todoId === todo.id) {
                return { ...todo, completed: true };
            } else {
                return { ...todo, completed: false };
            }
        });

        setMyTodos(todoArr);
    };

    // Edit-Todo
    const handleEditTodo = (todoId) => {
        setIsModalOpen(true);
        setEditTodoId(todoId);
    };

    // Edit The text here
    const saveTheText = (newText) => {
        const newArr = todos.map((todo) => {
            if (todo.id === editTodoId) {
                return { ...todo, text: newTodoText };
            } else {
                return todo;
            }
        });

        setMyTodos(newArr);
        setIsModalOpen(false);
        setNewTodoText("");
    };

    const deleteAllTodo = () => {
        setMyTodos([]);
    };


    //  --------- ToggleTodo Behaviour --------

    const toggleTodo = () => {

        if (toggle) {
            let arr = todos.filter((todo) => todo.completed === true);

            setMyTodos(arr);
        }

    }


    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10">
            {/* ----------- Header ----------- */}
            <h1 className="text-4xl font-bold text-white mb-8">My Todo List</h1>

            {/* ----------- Input Section ----------- */}
            <div className="flex gap-3 mb-8 items-center">
                {/* Input field */}
                <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputval(e.target.value)}
                    maxLength={18}
                    placeholder="Add a new task..."
                    className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                />

                {/* Add Button */}
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    onClick={addTodo}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTodo();
                        }
                    }}
                >
                    Add
                </button>

                {/* Delete All Todo */}
                <button
                    onClick={deleteAllTodo}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    Delete All Todo
                </button>

                {/* Modern Toggle Button (no logic) */}
                <label onClick={() =>{
                    setToggle(!toggle)
                    toggleTodo();
                    }} className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-green-400 transition-all duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
            </div>

            {/* ----------- Todo List ----------- */}
            <ul className="w-full max-w-md space-y-3">
                {todos.length === 0 ? (
                    <>
                        <h3 className="text-center text-pink-400 text-xl">
                            Your TodoList is Empty !
                        </h3>
                    </>
                ) : (
                    <>
                        {todos.map((todo, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg"
                            >
                                <div
                                    className={`flex-1 cursor-pointer ${todo.completed
                                            ? "line-through text-gray-400"
                                            : "text-white"
                                        }`}
                                    onClick={() => handleMarkTodo(todo.id)}
                                >
                                    {todo.text}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditTodo(todo?.id)}
                                        className="text-yellow-400 hover:text-yellow-300 mr-2"
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className="text-red-500 hover:text-red-400 mr-2"
                                    >
                                        DELETE
                                    </button>
                                    <button
                                        onClick={() => handleMarkTodo(todo.id)}
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        {todo?.completed ? "MARKED" : "MARK"}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </>
                )}
            </ul>

            {/* Edit modal here */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Edit Todo
                        </h2>

                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            className="w-full px-4 py-2 mb-5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Edit your todo..."
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => saveTheText(newTodoText)}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoFilter;
