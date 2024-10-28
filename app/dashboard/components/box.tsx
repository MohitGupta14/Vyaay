'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateGroup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [invitationLink, setInvitationLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    setError(null);
    if (step === 1 && !groupName) {
      setError('Group name is required.');
    } else if (step === 2 && !groupDescription) {
      setError('Group description is required.');
    } else if (step === 3 && !image) {
      setError('Image is required.');
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send the group data to your backend
      const formData = new FormData();
      formData.append('groupName', groupName);
      formData.append('groupDescription', groupDescription);
      if (image) formData.append('image', image);
      formData.append('invitationLink', invitationLink);

      await axios.post('/api/groups', formData);

      router.push('/dashboard'); // Redirect to the dashboard or any other page after successful submission
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-lg p-10 w-1/2 "> 
        <h2 className="text-2xl font-bold text-center mb-6">Create Group</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-6"> 
              <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="groupName"> 
                Group Name
              </label>
              <input
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:border-darkGreen" 
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
              <button
                type="button"
                className="mt-4 bg-btnGreen text-white font-semibold rounded-lg w-full py-3" 
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mb-6"> {/* Increased margin bottom */}
              <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="groupDescription"> 
                Group Description
              </label>
              <textarea
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:border-darkGreen" 
                id="groupDescription"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white font-semibold rounded-lg px-4 py-3" 
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-btnGreen text-white font-semibold rounded-lg px-4 py-3" 
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mb-6"> {/* Increased margin bottom */}
              <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="image"> 
                Group Image
              </label>
              <input
                type="file"
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:border-darkGreen" 
                id="image"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white font-semibold rounded-lg px-4 py-3"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-btnGreen text-white font-semibold rounded-lg px-4 py-3" 
                  disabled={loading}
                >
                  {loading ? 'Creating Group...' : 'Create Group'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
  );
}
