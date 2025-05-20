
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Check, Plus, Trash, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import { toast } from '@/components/ui/sonner';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type FilterType = 'all' | 'active' | 'completed';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (e) {
        console.error('Error parsing todos from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<FilterType>('all');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };
      
      setTodos([...todos, newTodo]);
      toast.success('Task added');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Task deleted');
  };

  const startEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const updateTodo = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: text.trim() } : todo
      ));
      setEditingTodo(null);
      toast.success('Task updated');
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    toast.success('Completed tasks cleared');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-todo-primary mb-2">Todo Add</h1>
        <p className="text-gray-600">Alireza Askari</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all">
        <div className={`p-6 ${isInputFocused ? 'bg-todo-light' : 'bg-white'} transition-colors duration-300`}>
          {editingTodo ? (
            <TodoInput 
              addTodo={(text) => updateTodo(editingTodo.id, text)}
              setIsInputFocused={setIsInputFocused}
              initialValue={editingTodo.text}
              isEditing={true}
              onCancel={cancelEdit}
            />
          ) : (
            <TodoInput 
              addTodo={addTodo} 
              setIsInputFocused={setIsInputFocused} 
            />
          )}
        </div>

        <AnimatePresence>
          {filteredTodos.length > 0 && (
            <div className="border-t border-gray-100">
              <TodoList 
                todos={filteredTodos} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo}
                editTodo={startEditTodo}
                editingTodoId={editingTodo?.id}
              />
            </div>
          )}
        </AnimatePresence>

        <div className="bg-gray-50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3 sm:mb-0">
            {activeTodoCount === 0 ? 'No active tasks' : 
              `${activeTodoCount} task${activeTodoCount === 1 ? '' : 's'} remaining`}
          </p>
          
          <div className="flex items-center space-x-2">
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {todos.some(todo => todo.completed) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCompleted}
                className="text-xs text-gray-500 hover:text-todo-primary"
              >
                Clear completed
              </Button>
            )}
          </div>
        </div>
      </div>

      {todos.length === 0 && (
        <div className="mt-10 text-center text-gray-500 animate-fade-in">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
