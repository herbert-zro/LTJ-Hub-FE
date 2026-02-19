import { createBrowserRouter } from 'react-router'
import { DashboardPage } from '../admin/pages/dashboard/DashboardPage';
import { LoginPager } from '../auth/pages/login/LoginPager';
import { RegisterPage } from '../auth/pages/register/RegisterPage';
import { lazy } from 'react';


const AuthLayout = lazy(() => import('../auth/layout/AuthLayout'));
const AdminLayout = lazy(() => import('../admin/layout/AdminLayout'));

export const appRouter = createBrowserRouter ([
    
    // Auth routes
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { index: true, element: <LoginPager /> },
            { path: 'register', element: <RegisterPage /> }
        ]
    },

    // Admin routes
    {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
            { index: true, element: <DashboardPage /> } 
        ]
    }
])
