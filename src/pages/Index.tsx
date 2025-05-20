
import React from 'react';
import TodoApp from '../components/TodoApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-todo-background to-white">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <TodoApp />
      </div>
    </div>
  );
};

export default Index;
