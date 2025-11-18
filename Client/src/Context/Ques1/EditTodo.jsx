import React, { useContext, useRef } from 'react'
import { TodoListConTXT } from './TodoList-Store.jsx'

const EditTodo = ({ setIsModalOpen, id }) => {
  const { editTodo } = useContext(TodoListConTXT);
  const newTodoRef = useRef('');

  const onFormSubmit = (e) => {
    e.preventDefault();

    let newTodoValue = newTodoRef.current.value;
    editTodo(id, newTodoValue);
    console.log(id, newTodoValue);
    newTodoRef.current.value = "";
    setIsModalOpen(false);
  }


  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Edit Todo
            </h2>

            <input
              type="text"
              ref={newTodoRef}
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
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTodo
