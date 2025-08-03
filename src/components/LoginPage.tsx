import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff, User, Lock, Heart, Mail, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

interface UserCredentials {
  username: string;
  password: string;
  email: string;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Demo credentials
  const DEMO_CREDENTIALS = {
    username: 'demo',
    password: 'demo123'
  };

  // Get stored users
  const getStoredUsers = (): UserCredentials[] => {
    const stored = localStorage.getItem('baymax_users');
    return stored ? JSON.parse(stored) : [];
  };

  // Store new user
  const storeUser = (user: UserCredentials) => {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('baymax_users', JSON.stringify(users));
    console.log('Stored users:', users); // Debug log
  };

  // Check if user exists
  const userExists = (username: string): boolean => {
    const users = getStoredUsers();
    return users.some(user => user.username === username);
  };

  // Validate credentials
  const validateCredentials = (username: string, password: string): boolean => {
    const users = getStoredUsers();
    console.log('Validating credentials for:', username, 'against stored users:', users); // Debug log
    return users.some(user => user.username === username && user.password === password);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check demo credentials first
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem('baymax_logged_in', 'true');
      localStorage.setItem('baymax_username', username);
      onLogin(username);
      return;
    }

    // Check stored user credentials
    const isValid = validateCredentials(username, password);
    console.log('Login attempt result:', isValid); // Debug log
    
    if (isValid) {
      localStorage.setItem('baymax_logged_in', 'true');
      localStorage.setItem('baymax_username', username);
      onLogin(username);
    } else {
      setError('Invalid username or password. Try demo/demo123 or sign up for a new account.');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    // Check if user already exists
    if (userExists(username)) {
      setError('Username already exists. Please choose a different username.');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store new user
    const newUser: UserCredentials = {
      username,
      password,
      email
    };

    storeUser(newUser);
    setSuccess('Account created successfully! You can now sign in.');
    
    // Clear form
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    
    // Switch to sign in mode
    setTimeout(() => {
      setIsSignUp(false);
      setSuccess('');
    }, 2000);

    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setUsername(DEMO_CREDENTIALS.username);
    setPassword(DEMO_CREDENTIALS.password);
  };

  const debugStoredUsers = () => {
    const users = getStoredUsers();
    console.log('Currently stored users:', users);
    alert(`Stored users: ${JSON.stringify(users, null, 2)}`);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              {isSignUp ? 'Create Account' : 'Welcome to BayMax'}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp 
                ? 'Join BayMax for personalized mental health support'
                : 'Your personal AI companion for mental health and wellness'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  {success}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !username || !password || (isSignUp && (!email || !confirmPassword))}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isLoading 
                  ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                  : (isSignUp ? 'Create Account' : 'Sign In')
                }
              </Button>
            </form>

            {!isSignUp && (
              <div className="text-center space-y-2">
                <Button
                  onClick={handleDemoLogin}
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600"
                >
                  Try Demo Login
                </Button>
                <Button
                  onClick={debugStoredUsers}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500"
                >
                  Debug: Check Stored Users
                </Button>
              </div>
            )}

            <div className="text-center">
              <Button
                onClick={toggleMode}
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {isSignUp ? (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </>
                ) : (
                  "Don't have an account? Sign Up"
                )}
              </Button>
            </div>

            {!isSignUp && (
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">Demo Credentials:</p>
                <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  Username: demo | Password: demo123
                </p>
              </div>
            )}

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Your mental health journey starts here 💙</p>
              <p>Safe, secure, and always here for you</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage; 