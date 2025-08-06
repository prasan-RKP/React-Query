import React, { useState } from "react";
import { toast } from "sonner";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [oldTodoValue, setOldTodoValue] = useState({ uid: '', txt: "" });


    //AddTodo

    const addTodo = () => {

        const trimmedText = text.trim();
        const isDuplicate = todos.some((todo)=> todo.text.trim() === trimmedText);

        if(trimmedText === "" || isDuplicate){
            toast.error('Cannot push duplicate values');
            return;
        }

        setTodos([...todos, { id: Date.now() + Math.random(), text: text }]);
        setText("");

    }

    const deleteTodo = (txt) => {
        const newTodos = todos.filter((todo) => todo.text.toLowerCase() !== txt);
        setTodos(newTodos);
    }


    const onMark = (txt) => {
        const newTodos = todos.map((todo) => {
            if (todo.text === txt) {
                return { ...todo, mark: true }
            }
            else {
                return todo;
            }
        });

        setTodos(newTodos);
    }

    const onEditEnable = (uid, txt) => {
        if (txt) {
            setIsModalOpen(true);
            //console.log("Getting Id", uid, "text", txt)
            setOldTodoValue({ uid: Number(uid), txt: txt });
        }
    }

    const onEditTodo = () => {
        let oldtext = oldTodoValue.txt;
        let oldId = oldTodoValue.uid;

        const newTodos = todos.map((todo) => {
            if (todo.id === oldId) {
                return { ...todo, text: currentText };
            }

            return todo;
        });
        setTodos(newTodos);
        setOldTodoValue({ uid: "", txt: "" });
        setIsModalOpen(false);

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-red-700">Todo List</h2>

                {/* Input Section (UI only) */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter a todo"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"

                    />
                    <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Add
                    </button>

                </div>

                {/* Todo List */}
                <ul className="space-y-2 text-black">
                    {todos.length === 0 ? (
                        <p className="text-center text-gray-500">No Todos</p>
                    ) : (
                        todos.map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm"
                            >
                                <span className={`flex-1 text-blue-500 ${item.mark ? 'text-gray-600 line-through' : ''}`}>
                                    {item.text}
                                </span>

                                {/* Button group */}
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => onMark(item.text)}
                                        className={`px-3 py-1 rounded-md text-white text-sm transition ${item.mark
                                            ? "bg-amber-400 hover:bg-amber-500 text-black"
                                            : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        {item.mark ? "Marked" : "Mark"}
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(item.text)}
                                        className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm transition"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => onEditEnable(item.id, item.text)}
                                        className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))
                    )}

                </ul>

                {/* modal opens here code s */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                            <h3 className="text-xl text-blue-600 font-semibold mb-4 text-center">Edit Todo</h3>
                            <input
                                type="text"
                                value={currentText}
                                onChange={(e) => setCurrentText(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onEditTodo}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
