import React, { useContext, useState } from 'react'
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { TodoListConTXT } from './TodoList-Store.jsx';
import EditTodo from './EditTodo.jsx';

const MyTodo = ({ todo, idx }) => {
    const { markedTodo, deleteTodo } = useContext(TodoListConTXT);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');

    const editMyTodo = (id) => {
        setId(id);
        setIsModalOpen(true);
    }
    return (
        <div>
            <li
                key={idx}
                className="flex justify-between items-center bg-gray-800 px-4 py-4 rounded-xl shadow-md border border-gray-700 hover:border-blue-600 transition-all duration-300"
            >
                {/* Todo TEXT */}
                <div
                    className={`flex-1 cursor-pointer text-lg ${todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-100"
                        }`}
                >
                    {todo.text}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3">
                    {/* EDIT */}
                    <button
                        onClick={() => editMyTodo(todo?.id)}
                        className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 hover:scale-110 transition-all duration-300"
                    >
                        <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                        onClick={() => deleteTodo(todo?.id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-300"
                    >
                        <Trash2 size={18} />
                    </button>

                    {/* MARK */}
                    <button
                        onClick={() => markedTodo(todo?.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${todo?.completed
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:scale-110"
                            }`}
                    >
                        <CheckCircle size={18} />
                    </button>
                </div>
            </li>

            {isModalOpen && (
                <EditTodo setIsModalOpen={setIsModalOpen} id={id} />
            )}
        </div>
    )
}

export default MyTodo
