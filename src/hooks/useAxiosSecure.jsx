import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';  
import { useNavigate } from 'react-router'; 

const axiosSecure = axios.create({
  baseURL: "https://local-chef-bazaar-server-gold.vercel.app"
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

   axiosSecure.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

   axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;

       if (status === 401 || status === 403) {
        const auth = getAuth();
        await signOut(auth); 
        navigate('/login'); 
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;