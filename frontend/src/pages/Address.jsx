import React, { useState } from 'react';
import axios from 'axios';

const Address = () => {
    const [formData, setFormData] = useState({
        email: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        addressType: '',
        isPrimary: false
      });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
      const [isLoading, setIsLoading] = useState(false);
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
    
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setIsLoading(false);
          return;
        }
    
        const email = formData.email;
        const address = {
            line1: formData.line1,
            line2: formData.line2,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postalCode: formData.postalCode,
            addressType: formData.addressType,
            isPrimary: formData.isPrimary
        }
    
        const postData = new FormData();
        postData.append("email", new Blob([email], { type: "application/json" }));
    postData.append("address", new Blob([JSON.stringify(address)], { type: "application/json" }));
    
        try {
          const response = await axios.post('http://localhost:8080/api/v1/create_order', 
            postData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            }
          );
    
    
        } catch (err) {
          setError(err.response?.data?.message || 'An error occurred while creating the order. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <div>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Create Order</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input type="text" id="line1" name="line1" required value={formData.line1} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="line2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                <input type="text" id="line2" name="line2" value={formData.line2} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input type="text" id="state" name="state" required value={formData.state} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" id="country" name="country" required value={formData.country} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" required value={formData.postalCode} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">Address Type</label>
                <input type="text" id="addressType" name="addressType" required value={formData.addressType} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="isPrimary" name="isPrimary" checked={formData.isPrimary} onChange={handleChange}
                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-900">
                  Is Primary Address
                </label>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-500 text-sm">{success}</div>}
              <div>
                <button type="submit" disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {isLoading ? 'Creating Order...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Address