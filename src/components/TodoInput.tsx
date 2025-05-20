
import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TodoInputProps {
  addTodo: (text: string) => void;
  setIsInputFocused: (isFocused: boolean) => void;
  initialValue?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ 
  addTodo, 
  setIsInputFocused, 
  initialValue = '', 
  isEditing = false,
  onCancel 
}) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
    if (!isEditing) {
      setText('');
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isEditing ? "Edit task..." : "Add a new task..."}
        className="flex-grow rounded-md border-gray-200 focus:border-todo-primary focus:ring focus:ring-todo-accent focus:ring-opacity-50"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        autoFocus={isEditing}
      />
      
      {isEditing ? (
        <>
          <Button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={!text.trim()}
          >
            <Check className="w-5 h-5" />
            <span className="sr-md:not-sr-only ml-1">Save</span>
          </Button>
          <Button 
            type="button" 
            onClick={handleCancel}
            variant="outline"
            className="border-gray-200"
          >
            <X className="w-5 h-5" />
            <span className="sr-md:not-sr-only ml-1">Cancel</span>
          </Button>
        </>
      ) : (
        <Button 
          type="submit" 
          className="bg-todo-primary hover:bg-todo-secondary text-white"
          disabled={!text.trim()}
        >
          <Plus className="w-5 h-5" />
          <span className="sr-md:not-sr-only ml-1">Add</span>
        </Button>
      )}
    </form>
  );
};

export default TodoInput;
