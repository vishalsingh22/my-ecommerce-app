import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Fetch profile data from localStorage when component mounts
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Fetch the logged-in user data
    if (loggedInUser) {
      setProfile({
        name: loggedInUser.name,
        email: loggedInUser.email,
        address: loggedInUser.address,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated profile to localStorage
    const updatedUser = {
      ...profile,
      password: JSON.parse(localStorage.getItem('user')).password, // Keep existing password if not changed
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('Profile updated', profile);
    setIsEditing(false); // Turn off editing mode after saving changes
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Update password in localStorage
      const updatedUser = { ...profile, password: newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Password reset to', newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Passwords do not match');
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Name:</label>
          <input 
            type="text" 
            name="name"
            value={profile.name} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing} // Input field is disabled unless editing is true
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Email:</label>
          <input 
            type="email" 
            name="email"
            value={profile.email} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing} // Input field is disabled unless editing is true
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Address:</label>
          <input 
            type="text" 
            name="address"
            value={profile.address} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing} // Input field is disabled unless editing is true
          />
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Update Profile
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)} // Cancel editing
                className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              type="button"
              onClick={() => setIsEditing(true)} // Turn on editing mode
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">New Password:</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Confirm Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
