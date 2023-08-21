import http from "../plugins/axios";

const loadNotices = async (params = {}) => {
    const response = await http.get('/api/company/v1/push', {params});
    return response.data;
};

const loadNotice = async (id) => {
    const response = await http.get('/api/company/v1/push' + id);
    return response.data;
};

const createNotice = async (body) => {
    const response = await http.post('/api/company/v1/push', body);
    return response.data;
}

export {loadNotices, loadNotice, createNotice};