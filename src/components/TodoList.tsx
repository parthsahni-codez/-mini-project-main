
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <Card className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          ✅ To-Do List
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} className="bg-pink-500 hover:bg-pink-600">
            Add
          </Button>
        </div>
        
        {todos.length > 0 && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {completedCount} of {todos.length} tasks completed! 
            {completedCount === todos.length && todos.length > 0 && " 🎉 Great job!"}
          </div>
        )}
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                todo.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span 
                className={`flex-1 ${
                  todo.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {todo.text}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {todos.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500 dark:text-gray-400">No tasks yet! Add one above to get started.</p>
          </div>
        )}
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Stay organized and accomplish your goals! I believe in you! 💪
        </p>
      </CardContent>
    </Card>
  );
};

export default TodoList;
