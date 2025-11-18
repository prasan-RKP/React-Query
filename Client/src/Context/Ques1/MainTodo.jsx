// myTodoList.jsx
import React, { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import AddMyTodo from "./temp/AddMyTodo";
import EditTodo from "./temp/EditTodo";
import MyTodos from "./temp/MyTodos";
import TodoListProvider from "./store/TodoList-Store";


const MyTodoList = () => {
    let isModalOpen = false;

    return (
        <TodoListProvider>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10">
                
                <h1 className="text-4xl font-bold text-white mb-8">My Todo List</h1>

                {/* INPUT + BTNS */}
                <AddMyTodo />

                {/* TODO LIST */}
                <MyTodos />
            
            </div>
        </TodoListProvider>
    );
};

export default MyTodoList;
