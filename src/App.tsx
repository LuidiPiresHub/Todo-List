import { FormEvent, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Todo {
  todo: string;
  checked: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const createTodo = (event: FormEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    const trimmedValue = input.value.trim();
    if (!trimmedValue) return;
    setTodos([...todos, { todo: `- ${trimmedValue}`, checked: false }]);
    target.reset();
  };

  const toggleTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const deleteTodo = (todoIndex: number): void => {
    const newTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(newTodos);
  };

  return (
    <main>
      <h1 className='title'>Todo list</h1>
      <section className='todo-container'>
        <form
          onSubmit={createTodo}
          className='todo-form'
        >
          <input
            type="text"
            placeholder='Ex: Comprar pão...'
            className='todo-input'
          />
          <button
            type="submit"
            className='todo-button'
          >
            Add
          </button>
        </form>
        {todos.length > 0 ? (
          <ul className='todos'>
            {todos.map(({ todo, checked }, index) => (
              <li key={index}>
                <p
                  onClick={() => toggleTodo(index)}
                  style={{ textDecoration: checked ? 'line-through' : 'none' }}
                >
                  {todo}
                </p>
                <FaTrash
                  className='delete-icon'
                  onClick={() => deleteTodo(index)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='feedback'>No todos</p>
        )}
      </section>
    </main>
  );
}
