// views/client/store/dashboard.js
export default {
    state: {
      // Trạng thái của Dashboard
      dashboardData: null,
    },
    mutations: {
      // Mutations để cập nhật trạng thái
      SET_DASHBOARD_DATA(state, data) {
        state.dashboardData = data;
      },
    },
    actions: {
      // Actions để thực hiện các tác vụ liên quan đến Dashboard
      fetchDashboardData({ commit }) {
        // Gọi API hoặc thực hiện các tác vụ khác để lấy dữ liệu Dashboard
        // Sau đó gọi mutation để cập nhật trạng thái
        const totalProfit = {
            title: 'Total Profit',
            color: 'secondary',
            icon: 'mdi-poll',
            stats: '$25.6k',
            change: 42,
            subtitle: 'Weekly Project',
          }
          const newProject = {
            title: 'New Project',
            color: 'primary',
            icon: 'mdi-briefcase-variant-outline',
            stats: '862',
            change: -18,
            subtitle: 'Yearly Project',
          }
        const data = {
            totalProfit: totalProfit,
            newProject: newProject
        }; // Dữ liệu lấy từ API hoặc tác vụ khác
        commit('SET_DASHBOARD_DATA', data);
      },
    },
    getters: {
      // Getters để truy cập và sử dụng trạng thái trong component
      getDashboardData: (state) => state.dashboardData,
    },
  };
  