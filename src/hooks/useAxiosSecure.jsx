import axios from 'axios'
import { getAuth } from 'firebase/auth';
import React from 'react'

const axiosSecure=axios.create({
  baseURL:"https://local-chef-bazaar-server-gold.vercel.app"
})

axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();  
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

const useAxiosSecure = () => {
  return axiosSecure
}

export default useAxiosSecure