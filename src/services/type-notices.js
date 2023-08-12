import http from "../plugins/axios";

const loadTypeNotices = async () => {
    const response = await http.get('/api/company/v1/push/type');
    return response.data;
};

export {loadTypeNotices};