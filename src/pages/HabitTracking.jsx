import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Plus, Target, Flame, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { fetchHabits, addHabit, logHabit } from '../slices/habitsSlice';

const HabitTracking = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { habits, loading } = useSelector(state => state.habits);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    type: 'positive', // 'positive' or 'negative'
    frequency: 'daily',
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchHabits(user.uid));
    }
  }, [dispatch, user]);

  const handleAddHabit = async () => {
    if (newHabit.name.trim() && user) {
      try {
        await dispatch(addHabit({
          userId: user.uid,
          habitData: {
            name: newHabit.name,
            description: newHabit.description,
            type: newHabit.type,
            frequency: newHabit.frequency,
          }
        })).unwrap();

        setNewHabit({
          name: '',
          description: '',
          type: 'positive',
          frequency: 'daily',
        });
        setShowAddForm(false);
      } catch (error) {
        console.error('Failed to add habit:', error);
      }
    }
  };

  const handleLogHabit = async (habitId, logType) => {
    try {
      await dispatch(logHabit({
        habitId,
        logData: {
          type: logType,
          notes: logType === 'relapse' ? 'Logged relapse' : 'Logged success',
        }
      })).unwrap();
    } catch (error) {
      console.error('Failed to log habit:', error);
    }
  };

  const getHabitIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'relapse': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'temptation': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <Target className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-white">Habit Tracking</h1>
              <p className="mt-2 text-white/70 text-lg">
                Track your positive habits and overcome negative ones
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>

          {/* Add Habit Form */}
          {showAddForm && (
            <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <CardTitle className="text-white">Add New Habit</CardTitle>
                <CardDescription className="text-white/70">
                  Create a habit to track your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Habit Name
                  </label>
                  <Input
                    value={newHabit.name}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning meditation, No smoking"
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:bg-white/30 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Description
                  </label>
                  <Input
                    value={newHabit.description}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the habit"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newHabit.type}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="positive">Positive Habit</option>
                      <option value="negative">Habit to Overcome</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={newHabit.frequency}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, frequency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddHabit} disabled={loading}>
                    Add Habit
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Habits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <Card key={habit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{habit.name}</CardTitle>
                      <CardDescription>{habit.description}</CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      habit.type === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {habit.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Streak Display */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        <span className="font-semibold">{habit.streak || 0}</span>
                        <span className="text-sm text-gray-500">day streak</span>
                      </div>
                    </div>

                    {/* Quick Log Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-green-600 border-green-300 hover:bg-green-50"
                        onClick={() => handleLogHabit(habit.id, 'success')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Success
                      </Button>
                      {habit.type === 'negative' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                            onClick={() => handleLogHabit(habit.id, 'temptation')}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Temptation
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => handleLogHabit(habit.id, 'relapse')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Relapse
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Recent Logs */}
                    {habit.logs && habit.logs.length > 0 && (
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
                        <div className="space-y-1">
                          {habit.logs.slice(-3).reverse().map((log, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              {getHabitIcon(log.type)}
                              <span className="capitalize">{log.type}</span>
                              <span className="text-gray-500">
                                {new Date(log.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {habits.length === 0 && !loading && (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
              <p className="text-gray-500 mb-4">Start tracking your habits to build better routines</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Habit
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HabitTracking;