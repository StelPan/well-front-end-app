import http from "../plugins/axios";

const loadTypeNotices = async () => {
    const response = await http.get('/api/company/v1/push/type');
    return response.data;
};

const createTypeNotice = async (body = {}) => {
    const response = await http.post('/api/company/v1/push/type', body);
    return response.data;
}

export {loadTypeNotices, createTypeNotice};