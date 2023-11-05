// client/routes.js

// Import các component tương ứng với các trang
import Dashboard from '../dashboard/index.vue';

const clientRoutes = [
    {
        path: '', // Đường dẫn của trang Dashboard
        name: 'index',
        component: Dashboard, // Sử dụng component Dashboard
    },
    {
        path: '/client/dashboard', // Đường dẫn của trang Dashboard
        name: 'ClientDashboard',
        component: Dashboard, // Sử dụng component Dashboard
    },
    // Thêm các routes khác cho phía client tại đây
];

export default clientRoutes;




