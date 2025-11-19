import { useState } from "react";
import type { Todo } from "../App";

interface TodoItemProps {
  todo: Todo;
  editTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
}

function TodoItem({ todo, editTodo, deleteTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input 
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>{todo.text}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => deleteTodo(todo.id)} className="delete">
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
