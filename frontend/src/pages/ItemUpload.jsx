import React, { useState } from 'react';

const ItemUploadForm = () => {

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    ownerEmail: '',
    cost: '',
    type: '',
    color: '',
    description: '',
    base64Image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          base64Image: reader.result.split(',')[1]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    const API_URL = 'http://localhost:8080/itemupload';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cost: parseInt(formData.cost, 10)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload item');
      }

      setSuccess('Item uploaded successfully!');
      setFormData({
        name: '',
        ownerEmail: '',
        cost: '',
        type: '',
        color: '',
        description: '',
        base64Image: ''
      });
    } catch (err) {
      setError('An error occurred while uploading the item. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadAnother = () => {
    setFormData({
      name: '',
      ownerEmail: '',
      cost: '',
      type: '',
      color: '',
      description: '',
      base64Image: ''
    });
    setSuccess('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Item Upload</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">Owner Email</label>
                <input type="email" id="ownerEmail" name="ownerEmail" required value={formData.ownerEmail} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                <input type="number" id="cost" name="cost" required value={formData.cost} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <input type="text" id="type" name="type" required value={formData.type} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                <input type="text" id="color" name="color" required value={formData.color} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows="3" required value={formData.description} onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} required
                       className="mt-1 block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-purple-50 file:text-purple-700
                                  hover:file:bg-purple-100" />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-500 text-sm">{success}</div>}
              <div className="flex justify-between items-center">
                <button type="submit" disabled={isUploading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  {isUploading ? 'Uploading...' : 'Upload Item'}
                </button>
                {success && (
                  <button type="button" onClick={handleUploadAnother}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Upload Another Item
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemUploadForm;