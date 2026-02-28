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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-white">Progress Reports</h1>
              <p className="mt-2 text-white/70 text-lg">
                Track your mental health and productivity journey.
              </p>
            </div>
            <div className="flex space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-white/30 bg-white/10 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
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
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Goals Completed</CardTitle>
                <Target className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{currentData.goalsCompleted}/{currentData.totalGoals}</div>
                <p className="text-xs text-white/60">
                  {Math.round((currentData.goalsCompleted / currentData.totalGoals) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Habits Tracked</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{currentData.habitsTracked}</div>
                <p className="text-xs text-white/60">
                  Activities this {timeRange}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Current Streak</CardTitle>
                <Award className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{currentData.streakDays}</div>
                <p className="text-xs text-white/60">
                  Days in a row
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Average Mood</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{currentData.moodAverage}/10</div>
                <p className="text-xs text-white/60">
                  Self-reported mood
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Weekly Progress Chart */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Weekly Progress</CardTitle>
                <CardDescription className="text-white/60">
                  Daily goal completion for this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-white/80">{day.day}</div>
                      <div className="flex-1">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(day.completed / day.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-sm text-white/80 text-right">
                        {day.completed}/{day.total}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Category Breakdown</CardTitle>
                <CardDescription className="text-white/60">
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
                        <span className="text-sm font-medium text-white/80">{category.name}</span>
                      </div>
                      <div className="text-sm text-white/80">
                        {category.completed}/{category.total}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mt-6 bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription className="text-white/60">
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
                        ? 'bg-yellow-500/20 border-yellow-500/50'
                        : 'bg-white/10 border-white/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-400' : 'text-white/40'}`} />
                      <div>
                        <h3 className={`font-medium ${achievement.unlocked ? 'text-yellow-300' : 'text-white/60'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.unlocked ? 'text-yellow-200' : 'text-white/40'}`}>
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