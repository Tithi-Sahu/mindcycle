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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="mt-2 text-gray-600">
              Here's your mental health and productivity overview.
            </p>
            {user?.isGuest && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Guest Mode:</strong> Your data will be stored locally and cleared when you log out.
                  Create a free account to save your progress permanently.
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump into your most common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Set New Goal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Motivation Library
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'habit' ? 'bg-green-500' :
                          activity.type === 'goal' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
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