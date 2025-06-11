import { useLocation, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import Notification from '../components/Notification';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const isStrong = password.length >= 12;
  const [showNotice, setShowNotice] = useState(true);

  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email || '';

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate('/login', {
        state : {
            email,
            password
        },
    });
  };
  

  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-transparent bg-opacity-80  p-6 rounded-xl shadow-xl">
        {/* Stepper */}
      <div className="flex justify-center items-center space-x-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-blue-600" />
        <div className="flex items-center justify-center h-3">
          <span className="text-teal-700 text-sm">→</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-blue-600" />
        <div className="flex items-center justify-center h-3">
          <span className="text-teal-700 text-sm">→</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-blue-600" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set a Password</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Fill in the registration form by setting up the password.It will take a couple of seconds. 
        </p>
      </div>

      {/* Notification */}
      {showNotice && (
        <Notification message={`${email}✔️
        email address confirmed`} />
      )}    

      <form className="space-y-4" onSubmit={handleConfirm}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            readOnly
            placeholder="example@gmail.com"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Set your password
          </label>
          <div className="relative mt-1">
            <input
              type={show ? 'text' : 'password'}
              maxLength={24}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              aria-label="Toggle password visibility"
            >
              <Eye size={18} />
            </button>
          </div>
          {password && (
            <p className={`text-sm mt-1 ${isStrong ? 'text-green-600' : 'text-red-500'}`}>
              {isStrong ? '✓ Good password' : '✗ Too short'}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Set Password
        </button>
      </form>
    </div>
  );
}
