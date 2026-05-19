# 🍳 Local Chef Bazaar

---

**Local Chef Bazaar** is a modern MERN-stack platform that bridges the gap between passionate home cooks (Chefs) and food lovers (Users). It allows users to explore daily menus, order fresh homemade meals, and make secure payments. Simultaneously, it empowers talented home chefs to run a culinary business straight from their kitchen without the overhead costs of a physical restaurant.

---
## 🚀 Live Links
- **Front-end Live URL:** [https://local-chef-bazaar-client-a11.vercel.app/](https://local-chef-bazaar-client-a11.vercel.app/)
- **Back-end Server URL:** [https://local-chef-bazaar-server-gold.vercel.app](https://local-chef-bazaar-server-gold.vercel.app)

---

## 📸 Project Preview

![Local Chef Bazaar Showcase](/src/assets/localChefSS.PNG) 
 
---

## 🔐 Demo Credentials (For Testing)

To explore the dashboard and role-based functionalities, you can use the following accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | r@hm.com | `123456aA` |
| **Chef** | c@c.com | `123456aA` |
| **User** | m@m.com | `123456aA` |

---

## ✨ Features & Role-Based Access Control

The platform implements a strict **3-Tier Role-Based Access Control (RBAC)** system with unique dashboards for each role:

### 👑 1. Admin Dashboard
* **Manage Users:** View, update, or restrict user profiles across the platform.
* **Manage Requests:** Review and approve/reject applications from regular users who want to become verified Chefs and Admin.
* **Platform Statistics:** Get a birds-eye view of total sales, active users, and order counts.

### 👨‍🍳 2. Chef Dashboard
* **Meal Creation:** Add new dishes to the menu with price, ingredients, and availability.
* **My Meals (CRUD):** View listed items with full flexibility to edit meal details or delete items.
* **Order Request Management:** View incoming orders from customers, accept them, and update status to "Delivered".
* **Become a Chef:** Standard users can submit a formal request to the admin to upgrade their account to a Chef profile.

###   3. User (Customer) Dashboard
* **Explore & Order:** Browse healthy, affordable homemade meals filtered by local availability.
* **Favorites System:** Shortlist and save preferred menus for quick future ordering.
* **Stripe Secure Payment:** Once a Chef accepts an order, users can securely pay via credit card using **Stripe Payment Gateway**.
* **Review Management (CRUD):** Share feedback by writing reviews. Users can also dynamically update or delete their reviews directly from their dashboard.

---

## 🛠️ Technologies Used

### Frontend
* **React.js & Vite** - For building a fast, optimized, single-page application.
* **React Router** - Smooth client-side navigation.
* **Tailwind CSS & DaisyUI** - For a clean, fully responsive, and modern UI.
* **TanStack Query (React Query)** - Efficient server-state management and caching.
* **React Hook Form** - Optimized form handling and validation.
* **SweetAlert2** - Beautiful and interactive alert messages.

### Backend & Database
* **Node.js & Express.js** - Scalable backend architecture.
* **MongoDB & Mongoose** - NoSQL database for flexible data management.
* **Firebase Authentication** - Secure social and email/password login.
* **Stripe SDK** - Handling secure and seamless online financial transactions.

---

## 🚀 How to Run Locally

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
```bash
   git clone https://github.com/robiulhasanmumin/LocalChefBazaar_Client_a11.git
   npm install
   npm run dev 

