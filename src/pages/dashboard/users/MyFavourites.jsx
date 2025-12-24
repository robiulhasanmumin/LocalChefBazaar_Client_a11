import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyFavourites = () => {
    const {user} = useAuth()
  const axiosSecure = useAxiosSecure()


    const { data: favourites = [], refetch } = useQuery({
  queryKey: ['myFavourites', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {

    const token = await user.getIdToken();
    const res = await axiosSecure.get(`/favourites/${user.email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
});


  return (
    <div>

    </div>
  )
}

export default MyFavourites