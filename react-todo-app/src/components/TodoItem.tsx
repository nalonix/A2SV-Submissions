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
    if (newText.trim()) {
      editTodo(todo.id, newText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <input
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <div className="todo-actions">
            <button className="save" onClick={handleSave}>Save</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="todo-text">{todo.text}</p>
          <div className="todo-actions">
            <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
