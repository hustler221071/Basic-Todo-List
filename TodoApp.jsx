import { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React and build a basic Project', completed: true },
    { id: 2, text: 'Learn Django and its integration', completed: false },
  ]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
    setShowModal(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
    setEditText('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const logCompletedTasks = () => {
    todos.forEach(task => {
      if (task.completed) {
        console.log(task);
      }
    });
  };

  const backgroundColor = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#f0f0f0' : '#000000';
  const cardColor = darkMode ? '#2c2c2c' : '#ffffff';
  const borderColor = darkMode ? '#444' : '#ccc';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor,
        color: textColor,
        minHeight: '100vh',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: darkMode ? '#444' : '#ddd',
          color: darkMode ? '#fff' : '#000',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        <img
        src={darkMode ? 'https://img.icons8.com/ios-filled/24/moon-symbol.png' : 'https://img.icons8.com/ios-filled/24/sun--v1.png'}
        alt="mode"
        style={{ width: '20px', height: '20px' }}
      />
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <h2>To-Do List</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              margin: '10px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: cardColor,
              padding: '8px',
              borderRadius: '5px',
              border: `1px solid ${borderColor}`
            }}
          >
            <input
              type="radio"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={{ marginRight: '10px' }}
            />
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'gray' : textColor,
                    marginRight: '10px'
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button onClick={logCompletedTasks}>Log Completed Tasks</button>

      {/* Floating + Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#5644CB',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
        title="Add Task"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: cardColor,
            color: textColor,
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Add New Task</h3>
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter task..."
              style={{
                padding: '0.5rem',
                width: '100%',
                marginBottom: '10px',
                backgroundColor: darkMode ? '#3b3b3b' : '#fff',
                color: textColor,
                border: `1px solid ${borderColor}`
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={addTodo}>Add Task</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
