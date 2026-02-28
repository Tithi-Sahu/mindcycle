import React, { useState } from 'react';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { Plus, Target, Calendar, Bell, Edit, Trash2, CheckCircle } from 'lucide-react';

const GoalsAndReminders = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Daily Meditation',
      description: 'Meditate for 10 minutes every morning',
      completed: false,
      dueDate: '2024-01-15',
      category: 'Wellness'
    },
    {
      id: 2,
      title: 'Read for 30 minutes',
      description: 'Read a book or article daily',
      completed: true,
      dueDate: '2024-01-14',
      category: 'Learning'
    },
    {
      id: 3,
      title: 'Exercise 3x per week',
      description: 'Complete workout sessions',
      completed: false,
      dueDate: '2024-01-20',
      category: 'Fitness'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'General'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      setGoals(prev => [...prev, {
        id: Date.now(),
        ...newGoal,
        completed: false
      }]);
      setNewGoal({
        title: '',
        description: '',
        dueDate: '',
        category: 'General'
      });
      setShowAddForm(false);
    }
  };

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const categories = ['General', 'Wellness', 'Learning', 'Fitness', 'Career', 'Relationships'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-white">Goals & Reminders</h1>
              <p className="mt-2 text-white/70 text-lg">
                Set and track your personal goals and daily reminders.
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>

          {/* Add Goal Form */}
          {showAddForm && (
            <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                <CardTitle className="text-white">Add New Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <Input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter goal title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter goal description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddGoal}>Add Goal</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Goals List */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map(goal => (
              <Card key={goal.id} className={`transition-all ${goal.completed ? 'opacity-75' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={goal.completed}
                        onCheckedChange={() => toggleGoal(goal.id)}
                      />
                      <CardTitle className={`text-lg ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                        {goal.title}
                      </CardTitle>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {goal.dueDate}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goal.category === 'Wellness' ? 'bg-green-100 text-green-800' :
                      goal.category === 'Learning' ? 'bg-blue-100 text-blue-800' :
                      goal.category === 'Fitness' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {goal.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={goal.completed ? 'line-through' : ''}>
                    {goal.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No goals yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first goal.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GoalsAndReminders;