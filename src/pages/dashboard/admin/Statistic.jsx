import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTitle from '../../../hooks/useTitle';

const Statistic = () => {
  useTitle("Statistics")
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

   const { data: stats = {} } = useQuery({
    queryKey: ['Stats'],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axiosSecure.get('/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  console.log(stats);

  const paymentData = [
    { name: 'Total Payments', value: stats.totalPayments || 0 }
  ];

  const ordersData = [
    { name: 'Pending Orders', value: stats.ordersPending || 0 },
    { name: 'Delivered Orders', value: stats.ordersDelivered || 0 }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className='p-5'>
      <h1 className="text-3xl font-bold mb-10 text-primary text-center">Platform Statistics</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-10'>
        <div className='card p-4 shadow'>
          <p className='font-bold'>Total Users</p>
          <p className='text-xl'>{stats.totalUsers || 0}</p>
        </div>
        <div className='card p-4 shadow'>
          <p className='font-bold'>Total Payments</p>
          <p className='text-xl'>${stats.totalPayments || 0}</p>
        </div>
        <div className='card p-4 shadow'>
          <p className='font-bold'>Orders Pending</p>
          <p className='text-xl'>{stats.ordersPending || 0}</p>
        </div>
        <div className='card p-4 shadow'>
          <p className='font-bold'>Orders Delivered</p>
          <p className='text-xl'>{stats.ordersDelivered || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Bar chart */}
        <BarChart width={400} height={300} data={paymentData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        {/* Pie chart */}
        <PieChart width={400} height={300}>
          <Pie
            data={ordersData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {ordersData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default Statistic;
