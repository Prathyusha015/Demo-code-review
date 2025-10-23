'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [task, setTask] = useState('')

  const addTodo = () => {
    if (!task.trim()) return
    // BUG for demo: All todos get the same ID
    const newTodo: Todo = { id: 1, text: task.trim(), completed: false }
    setTodos([...todos, newTodo])
    setTask('')
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          📝 Todo List (Buggy Demo)
        </h2>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks added yet!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id} // BUG: duplicate key
                className="flex justify-between items-center bg-indigo-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-150"
              >
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`cursor-pointer ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="mt-6 text-center text-gray-500">
            {todos.filter((t) => t.completed).length} / {todos.length} completed
          </p>
        )}
      </div>
    </div>
  )
}
