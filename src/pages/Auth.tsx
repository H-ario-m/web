import React, { useState } from 'react';
import { User, Mail, Lock, Code, Briefcase, Terminal, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: 'client' | 'contributor';
  interests?: string[];
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
}

const TECH_INTERESTS = [
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'UI/UX Design',
  'DevOps',
  'Machine Learning',
  'Blockchain',
  'Cloud Computing'
];

export default function Auth() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    interests: []
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.role) {
        newErrors.role = 'Please select an account type';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.role) {
          throw new Error('Missing required fields');
        }
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
          interests: formData.interests
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors(prev => ({
        ...prev,
        email: 'Authentication failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      name: '',
      role: undefined,
      interests: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Terminal className="h-16 w-16 text-indigo-500 animate-float" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Access Your Workspace' : 'Join the Developer Community'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isLogin ? 'Enter your credentials to continue' : 'Create your account to start collaborating'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      className={`input-primary pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="John Doe"
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Account Type
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    {(['client', 'contributor'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, role: type})}
                        className={`${
                          formData.role === type
                            ? 'bg-indigo-600 text-white border-transparent'
                            : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                        } px-4 py-3 border rounded-md text-sm font-medium capitalize transition-all duration-200`}
                      >
                        {type === 'client' ? (
                          <div className="flex items-center justify-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            {type}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Code className="h-4 w-4 mr-2" />
                            {type}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                  )}
                </div>

                {formData.role === 'contributor' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Areas of Interest
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TECH_INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`${
                            formData.interests?.includes(interest)
                              ? 'bg-indigo-600 text-white border-transparent'
                              : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                          } px-3 py-2 border rounded-md text-xs font-medium transition-all duration-200`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  className={`input-primary pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="you@example.com"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  className={`input-primary pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={switchMode}
                disabled={isLoading}
                className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}