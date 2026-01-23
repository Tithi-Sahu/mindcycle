import React, { useState } from 'react';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { TrendingUp, Calendar, Target, Award, BarChart3, PieChart, Download } from 'lucide-react';

const ProgressReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - in a real app, this would come from an API
  const progressData = {
    week: {
      goalsCompleted: 5,
      totalGoals: 8,
      habitsTracked: 21,
      streakDays: 7,
      moodAverage: 7.2,
      categories: [
        { name: 'Wellness', completed: 3, total: 4 },
        { name: 'Fitness', completed: 1, total: 2 },
        { name: 'Learning', completed: 1, total: 2 }
      ]
    },
    month: {
      goalsCompleted: 18,
      totalGoals: 25,
      habitsTracked: 84,
      streakDays: 12,
      moodAverage: 7.5,
      categories: [
        { name: 'Wellness', completed: 12, total: 15 },
        { name: 'Fitness', completed: 3, total: 5 },
        { name: 'Learning', completed: 3, total: 5 }
      ]
    }
  };

  const currentData = progressData[timeRange];

  const achievements = [
    { title: 'First Week Complete', description: 'Completed your first week of tracking', unlocked: true },
    { title: 'Goal Crusher', description: 'Completed 10 goals', unlocked: true },
    { title: 'Consistency King', description: 'Maintained a 30-day streak', unlocked: false },
    { title: 'Wellness Warrior', description: 'Completed 50 wellness activities', unlocked: false }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 3, total: 4 },
    { day: 'Tue', completed: 4, total: 4 },
    { day: 'Wed', completed: 2, total: 4 },
    { day: 'Thu', completed: 3, total: 4 },
    { day: 'Fri', completed: 4, total: 4 },
    { day: 'Sat', completed: 3, total: 4 },
    { day: 'Sun', completed: 2, total: 4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Progress Reports</h1>
              <p className="mt-2 text-gray-600">
                Track your mental health and productivity journey.
              </p>
            </div>
            <div className="flex space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.goalsCompleted}/{currentData.totalGoals}</div>
                <p className="text-xs text-gray-600">
                  {Math.round((currentData.goalsCompleted / currentData.totalGoals) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Habits Tracked</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.habitsTracked}</div>
                <p className="text-xs text-gray-600">
                  Activities this {timeRange}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Award className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.streakDays}</div>
                <p className="text-xs text-gray-600">
                  Days in a row
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.moodAverage}/10</div>
                <p className="text-xs text-gray-600">
                  Self-reported mood
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>
                  Daily goal completion for this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(day.completed / day.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">
                        {day.completed}/{day.total}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>
                  Progress by goal category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          category.name === 'Wellness' ? 'bg-green-500' :
                          category.name === 'Fitness' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {category.completed}/{category.total}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>
                Unlock achievements as you progress on your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                      <div>
                        <h3 className={`font-medium ${achievement.unlocked ? 'text-yellow-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProgressReportsAnalytics;