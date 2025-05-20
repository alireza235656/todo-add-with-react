
import React from 'react';
import { FilterType } from './TodoApp';
import { cn } from '@/lib/utils';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex items-center bg-gray-100 rounded-md p-1">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-md transition-colors",
            filter === option.value
              ? "bg-white text-todo-primary shadow-sm"
              : "text-gray-500 hover:text-todo-primary"
          )}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
