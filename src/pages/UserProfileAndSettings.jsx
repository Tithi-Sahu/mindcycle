import React, { useState } from 'react';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { User, Mail, Bell, Shield, Palette, Save, Camera } from 'lucide-react';

const UserProfileAndSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about mental health and personal growth.',
    avatar: null
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    reminderFrequency: 'daily',
    theme: 'light',
    language: 'en',
    privacyMode: false
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Saving profile and settings:', { profile, settings });
    alert('Profile and settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PanicModeButton />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
            <p className="mt-2 text-gray-600">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {(() => {
                      const activeTabData = tabs.find(tab => tab.id === activeTab);
                      const IconComponent = activeTabData?.icon;
                      return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
                    })()}
                    <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      {/* Avatar */}
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Avatar
                          </Button>
                        </div>
                      </div>

                      {/* Profile Fields */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleProfileChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <Checkbox
                          name="emailNotifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                          <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                        </div>
                        <Checkbox
                          name="pushNotifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, pushNotifications: checked }))
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reminder Frequency
                        </label>
                        <select
                          name="reminderFrequency"
                          value={settings.reminderFrequency}
                          onChange={handleSettingChange}
                          className="w-full md:w-1/2 h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'privacy' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Privacy Mode</h3>
                          <p className="text-sm text-gray-600">Hide your activity from other users</p>
                        </div>
                        <Checkbox
                          name="privacyMode"
                          checked={settings.privacyMode}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, privacyMode: checked }))
                          }
                        />
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Data & Privacy</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            Download My Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          name="theme"
                          value={settings.theme}
                          onChange={handleSettingChange}
                          className="w-full md:w-1/2 h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          name="language"
                          value={settings.language}
                          onChange={handleSettingChange}
                          className="w-full md:w-1/2 h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <Button onClick={handleSave} className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileAndSettings;