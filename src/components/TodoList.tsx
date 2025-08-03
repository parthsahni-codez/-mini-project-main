
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      priority
    };
    
    setTodos(prev => [...prev, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Card className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          ✅ Task Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button 
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            Add Task ➕
          </Button>
        </div>

        {totalCount > 0 && (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {completedCount}/{totalCount} completed
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 ${
                  todo.completed ? 'border-green-400' : 'border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                  {todo.text}
                </span>
                <span className={`text-sm ${getPriorityColor(todo.priority)}`}>
                  {getPriorityEmoji(todo.priority)}
                </span>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  🗑️
                </Button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completedCount === totalCount 
                ? "🎉 All tasks completed! Great job!" 
                : "Keep going! You're making progress! 💪"
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
