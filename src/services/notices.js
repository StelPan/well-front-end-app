import http from "../plugins/axios";

const loadNotices = async () => {
    const response = await http.get('/api/company/v1/push');
    return response.data;
};

const loadNotice = async (id) => {
    const response = await http.get('/api/company/v1/push' + id);
    return response.data;
};

export {loadNotices, loadNotice};