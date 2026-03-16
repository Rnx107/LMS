import { useState } from 'react'
import {
  Bell,
  Lock,
  Moon,
  Globe,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

/**
 * Settings Page
 * 
 * Allows users to manage their account settings, notifications, and security.
 * Accessible to both students and teachers.
 */
const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications')
  const { changePassword, isChangingPassword } = useAuth()

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [notifications, setNotifications] = useState({
    email: {
      courseUpdates: true,
      newMaterials: true,
      announcements: true,
      grades: true,
    },
    push: {
      courseUpdates: false,
      newMaterials: true,
      announcements: true,
      grades: false,
    },
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
  })

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ]

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    changePassword(
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          })
        },
      }
    )
  }

  const handleNotificationChange = (type, key) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key],
      },
    }))
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Settings</h1>
        <p className="text-secondary-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <nav className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 font-medium border-r-2 border-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-8">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <h3 className="font-medium text-secondary-900">Email Notifications</h3>
                  </div>
                  <div className="space-y-3 pl-8">
                    {Object.entries(notifications.email).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100 transition-colors"
                      >
                        <span className="text-secondary-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationChange('email', key)}
                          className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-primary-600" />
                    <h3 className="font-medium text-secondary-900">Push Notifications</h3>
                  </div>
                  <div className="space-y-3 pl-8">
                    {Object.entries(notifications.push).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100 transition-colors"
                      >
                        <span className="text-secondary-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationChange('push', key)}
                          className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-secondary-200">
                <button
                  onClick={() => toast.success('Notification preferences saved!')}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">
                Security Settings
              </h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-secondary-200">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-secondary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-secondary-900">Two-Factor Authentication</h3>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div>
                    <p className="font-medium text-secondary-900">Enable 2FA</p>
                    <p className="text-sm text-secondary-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => toast.info('2FA setup coming soon!')}
                    className="btn-secondary"
                  >
                    Setup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">
                Preferences
              </h2>

              <div className="space-y-6">
                {/* Dark Mode */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">Dark Mode</p>
                      <p className="text-sm text-secondary-500">
                        Switch between light and dark themes
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.darkMode}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, darkMode: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, language: e.target.value }))
                    }
                    className="input w-full"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, timezone: e.target.value }))
                    }
                    className="input w-full"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-secondary-200">
                <button
                  onClick={() => toast.success('Preferences saved!')}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
