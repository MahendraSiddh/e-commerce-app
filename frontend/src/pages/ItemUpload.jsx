import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemUpload = () => {

  const token = localStorage.getItem('token');
  const [item, setItem] = useState({
    name: '',
    cost: '',
    type: '',
    color: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setItem(prevItem => ({
          ...prevItem,
          image: base64String
        }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setItem({
      name: '',
      cost: '',
      type: '',
      color: '',
      description: '',
      image: null
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "https://localhost:8080/itemupload"
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      
      if (!response.ok) {
        
        toast.error('Error uploading item. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }else
      {
          toast.success('Item uploaded successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          
        });
        resetForm()
      }
      
      
    } catch (error) {
      console.error('Error uploading item:', error);
     
    }
   // window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-purple-200 rounded-full flex flex-shrink-0 justify-center items-center text-purple-500 text-2xl font-mono">i</div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Upload an Item</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter the details of the item you want to upload.</p>
              </div>
            </div>
            <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={item.cost}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Enter cost"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={item.type}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Enter item type"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={item.color}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Enter item color"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <textarea
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    rows="3"
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Enter item description"
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    required
                  />
                </div>
                {preview && (
                  <div className="mt-4">
                    <img src={preview} alt="Preview" className="mt-2 rounded-md max-h-48 w-auto" />
                  </div>
                )}
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-purple-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-purple-600 transition-colors duration-300"
                >
                  Upload Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemUpload;