import React, { useState } from 'react';
import SideMenu from './SideMenu';
import FooterAdminPage from './FooterAdminPage';
import NavBarAdminPage from './NavBarAdminPage';
import ImgUploader from './ImgUploader';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { updateLogo } from '../features/adminSlice';

function DesignPage() {
  const dispatch = useDispatch()
  const [logoType, setLogoType] = useState('image');
  const [logoName, setLogoName] = useState('Your Company');
  const [imgFiles, setImgFiles] = useState({
    mobile: null,
    tablet: null,
    desktop: null,
  });

  const handleLogoChange = (e) => {
    setLogoName(e.target.value);
  };

  const toggleLogoType = () => {
    setLogoType((prevType) => (prevType === 'image' ? 'text' : 'image'));
  };

  const handleImgChange = (file, deviceType) => {
    setImgFiles((prevFiles) => ({
      ...prevFiles,
      [deviceType]: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      const promises = Object.keys(imgFiles).map(async (deviceType) => {
        if (imgFiles[deviceType]) {
          const path = `assets/logo${deviceType}`;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, imgFiles[deviceType]);
          const downloadURL = await getDownloadURL(storageRef);
          return { [deviceType]: downloadURL };
        }
        return { [deviceType]: '' };
      });

      const uploadedUrls = await Promise.all(promises);

      const formData = {
        text: logoName,
        mode: logoType === 'image' ? 'img' : 'text',
        img: {
          mobile: uploadedUrls[0].mobile,
          tablet: uploadedUrls[1].tablet,
          desktop: uploadedUrls[2].desktop,
        }
      };

      dispatch(updateLogo(formData));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu />
      <div className="flex-1 p-4 xl:ml-80">
        <NavBarAdminPage />
        <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Logo Settings</h2>
          <div className="flex items-center mb-4">
            <button
              onClick={toggleLogoType}
              className={`px-4 py-2 text-sm rounded-md focus:outline-none ${
                logoType === 'image'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {logoType === 'image' ? 'Image Mode' : 'Text Mode'}
            </button>
          </div>
          {logoType === 'image' ? (
            <div className="flex items-center space-x-4 mb-4">
              <ImgUploader imgToSend={imgFiles.mobile} pathToImg="mobile" onImgChange={(file) => handleImgChange(file, 'mobile')} />
              <ImgUploader imgToSend={imgFiles.tablet} pathToImg="tablet" onImgChange={(file) => handleImgChange(file, 'tablet')} />
              <ImgUploader imgToSend={imgFiles.desktop} pathToImg="desktop" onImgChange={(file) => handleImgChange(file, 'desktop')} />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="logoName" className="block text-sm font-medium text-gray-700">
                Logo Name
              </label>
              <input
                type="text"
                id="logoName"
                name="logoName"
                value={logoName}
                onChange={handleLogoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Enter logo name"
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
        <FooterAdminPage />
      </div>
    </div>
  );
}

export default DesignPage;