import axios from "axios";

const axiosPublic = axios.create({
     baseURL: "https://local-chef-bazaar-server-gold.vercel.app" 
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;