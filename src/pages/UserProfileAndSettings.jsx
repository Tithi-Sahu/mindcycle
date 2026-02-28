import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { User, Mail, Bell, Shield, Palette, Save, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

const UserProfileAndSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
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

  // Load user data from database on mount
  useEffect(() => {
    const loadUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Update profile
            setProfile(prev => ({
              ...prev,
              name: user.displayName || '',
              email: user.email || '',
              bio: userData.bio || '',
              avatar: user.photoURL || null
            }));

            // Update settings
            if (userData.settings) {
              setSettings(prev => ({
                ...prev,
                ...userData.settings
              }));
            }
          } else {
            // Set default values if user doc doesn't exist
            setProfile(prev => ({
              ...prev,
              name: user.displayName || '',
              email: user.email || ''
            }));
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setErrorMessage('Error loading user data');
        }
      }
    };

    loadUserData();
  }, [user]);

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

  const handleSave = async () => {
    if (!user?.uid) {
      setErrorMessage('User not logged in');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setIsSaved(false);

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: profile.avatar || null
      });

      // Update Firestore user document
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profile.name,
        bio: profile.bio,
        photoURL: profile.avatar,
        settings: settings,
        updatedAt: new Date().toISOString()
      });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage(error.message || 'Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
      </div>

      <Header />
      <PanicModeButton />

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Status Messages */}
        {isSaved && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-200">
            <CheckCircle className="w-5 h-5" />
            Profile updated successfully!
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200">
            <AlertCircle className="w-5 h-5" />
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <Card className="sticky top-20 bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'profile'
                        ? 'bg-blue-500/60 text-white'
                        : 'text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <User className="inline mr-2 w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'notifications'
                        ? 'bg-blue-500/60 text-white'
                        : 'text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Bell className="inline mr-2 w-4 h-4" /> Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'privacy'
                        ? 'bg-blue-500/60 text-white'
                        : 'text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Shield className="inline mr-2 w-4 h-4" /> Privacy
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'appearance'
                        ? 'bg-blue-500/60 text-white'
                        : 'text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Palette className="inline mr-2 w-4 h-4" /> Appearance
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white text-3xl font-bold flex items-center gap-3">
                  {activeTab === 'profile' && <User className="w-6 h-6" />}
                  {activeTab === 'notifications' && <Bell className="w-6 h-6" />}
                  {activeTab === 'privacy' && <Shield className="w-6 h-6" />}
                  {activeTab === 'appearance' && <Palette className="w-6 h-6" />}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {activeTab === 'profile' && 'Manage your profile information'}
                  {activeTab === 'notifications' && 'Control how you receive notifications'}
                  {activeTab === 'privacy' && 'Manage your privacy and data settings'}
                  {activeTab === 'appearance' && 'Customize your app appearance'}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Avatar Section */}
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-4">Profile Picture</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full flex items-center justify-center border-2 border-white/20">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-10 h-10 text-white/70" />
                          )}
                        </div>
                        <div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Avatar
                          </Button>
                          <p className="text-white/50 text-sm mt-2">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-white text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                          <Input
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Enter your full name"
                            className="bg-white/10 border-white/30 text-white placeholder-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                          <Input
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="Enter your email"
                            disabled
                            className="bg-white/10 border-white/30 text-white/70 placeholder-white/50"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-white text-sm font-medium mb-2">Bio</label>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleProfileChange}
                          rows={3}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-white/70 text-sm mt-1">Receive important updates via email</p>
                        </div>
                        <Checkbox
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Push Notifications</h3>
                          <p className="text-white/70 text-sm mt-1">Get notified on your device</p>
                        </div>
                        <Checkbox
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, pushNotifications: checked }))
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Reminder Frequency</label>
                      <select
                        name="reminderFrequency"
                        value={settings.reminderFrequency}
                        onChange={handleSettingChange}
                        className="w-full bg-white/10 border border-white/30 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="daily" className="bg-slate-900">Daily</option>
                        <option value="weekly" className="bg-slate-900">Weekly</option>
                        <option value="monthly" className="bg-slate-900">Monthly</option>
                        <option value="never" className="bg-slate-900">Never</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Privacy Mode</h3>
                          <p className="text-white/70 text-sm mt-1">Hide your activity from other users</p>
                        </div>
                        <Checkbox
                          checked={settings.privacyMode}
                          onCheckedChange={(checked) =>
                            setSettings(prev => ({ ...prev, privacyMode: checked }))
                          }
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-white font-semibold mb-4">Data Management</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/10">
                          Download My Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Theme</label>
                      <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleSettingChange}
                        className="w-full bg-white/10 border border-white/30 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light" className="bg-slate-900">Light</option>
                        <option value="dark" className="bg-slate-900">Dark</option>
                        <option value="system" className="bg-slate-900">System</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Language</label>
                      <select
                        name="language"
                        value={settings.language}
                        onChange={handleSettingChange}
                        className="w-full bg-white/10 border border-white/30 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en" className="bg-slate-900">English</option>
                        <option value="es" className="bg-slate-900">Spanish</option>
                        <option value="fr" className="bg-slate-900">French</option>
                        <option value="de" className="bg-slate-900">German</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="border-t border-white/10 pt-6 flex gap-3">
                  <Button 
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAndSettings;