
import React from 'react';
import { Check, Trash, Edit } from 'lucide-react';
import { Todo } from './TodoApp';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
  isEditing: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo, isEditing }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between group hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center flex-1">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
            todo.completed 
              ? "bg-todo-primary border-todo-primary text-white" 
              : "border-gray-300 hover:border-todo-primary"
          )}
          disabled={isEditing}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>
        
        <span
          className={cn(
            "transition-all duration-200 flex-1",
            todo.completed && "line-through text-gray-400"
          )}
        >
          {todo.text}
        </span>
      </div>
      
      <div className="flex">
        {!todo.completed && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editTodo(todo)}
            className="text-gray-400 hover:text-todo-primary mr-1 flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            <span>Edit</span>
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500 flex items-center"
          disabled={isEditing}
        >
          <Trash className="w-4 h-4 mr-1" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
