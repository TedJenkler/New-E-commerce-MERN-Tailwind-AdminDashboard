import axiosInstance from '../api/axiosInstance';

const isAuthenticated = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const response = await axiosInstance.post('/admin/validateToken', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isValid;
  } catch (error) {
    console.error('Error validating token', error);
    return false;
  }
};

export default isAuthenticated;