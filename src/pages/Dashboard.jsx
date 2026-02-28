import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Target, BookOpen, TrendingUp, User, Calendar, CheckCircle, Plus, Award } from 'lucide-react';
import { fetchHabits } from '../slices/habitsSlice';
import { fetchJournalEntries } from '../slices/journalSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { habits } = useSelector(state => state.habits);
  const { entries: journalEntries } = useSelector(state => state.journal);

  useEffect(() => {
    if (user) {
      dispatch(fetchHabits({ userId: user.uid, isGuest: user.isGuest }));
      dispatch(fetchJournalEntries({ userId: user.uid, isGuest: user.isGuest }));
    }
  }, [dispatch, user]);

  // Calculate stats from real data
  const totalHabits = habits.length;
  const activeHabits = habits.filter(habit => habit.streak > 0).length;
  const totalStreaks = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0);
  const recentEntries = journalEntries.slice(0, 3);

  const quickStats = [
    { title: 'Active Habits', value: activeHabits.toString(), icon: CheckCircle, color: 'text-green-600' },
    { title: 'Total Habits', value: totalHabits.toString(), icon: Target, color: 'text-blue-600' },
    { title: 'Total Streaks', value: totalStreaks.toString(), icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Journal Entries', value: journalEntries.length.toString(), icon: BookOpen, color: 'text-orange-600' },
  ];

  const recentActivities = recentEntries.map(entry => ({
    action: `Journal entry: ${entry.content.substring(0, 50)}...`,
    time: new Date(entry.createdAt).toLocaleDateString(),
    type: 'journal'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="mt-2 text-white/70 text-lg">
              Here's your mental health and productivity overview.
            </p>
            {user?.isGuest && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/50 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-blue-100">
                  <strong>Guest Mode:</strong> Your data will be stored locally and cleared when you log out.
                  Create a free account to save your progress permanently.
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/60">
                  Jump into your most common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105" variant="default">
                  <Target className="mr-2 h-4 w-4" />
                  Set New Goal
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 transform hover:scale-105" variant="default">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Motivation Library
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105" variant="default">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress Reports
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105" variant="default">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/60">
                  Your latest actions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'habit' ? 'bg-green-500' :
                          activity.type === 'goal' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/90">{activity.action}</p>
                        <p className="text-xs text-white/50">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;