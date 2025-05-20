
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { Todo } from './TodoApp';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
  editingTodoId?: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo, editingTodoId }) => {
  return (
    <ul className="divide-y divide-gray-100">
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              isEditing={todo.id === editingTodoId}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
