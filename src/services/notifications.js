import http from "../plugins/axios";

const loadNotifications = async () => {
    const response = await http.get('/api/company/v1/push');
    return response.data;
};

const loadNotification = async (id) => {
    const response = await http.get('/api/company/v1/')
};

export {loadNotifications};