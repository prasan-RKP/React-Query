import React, { useContext, useRef } from 'react'
import { TodoListConTXT } from './TodoList-Store';
import { toast } from 'sonner';


const AddMyTodo = () => {

  const { addTodo, deleteAllTodo } = useContext(TodoListConTXT);

  const todoValRef = useRef('');
  const onFormSubmit = (e) => {
    e.preventDefault();

    let todoVal = todoValRef.current.value;

    if (todoVal.length === 1) {
      toast.error("Todo must be two char Long");
      return;
    }

    else {
      let todoObj = {
        id: Date.now().toString(36).slice(-4),
        text: todoVal,
        completed: false
      }


      addTodo(todoObj);
      console.log('completed ✅', todoObj);
      todoValRef.current.value = "";
    }

  }


  return (
    <div>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            ref={todoValRef}
            maxLength={18}
            placeholder="Add a new task..."
            className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

          >
            Add
          </button>

          <button
            type="button"
            onClick={() => deleteAllTodo([])}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Delete All
          </button>
        </div>
      </form>


    </div>
  )
}

export default AddMyTodo
