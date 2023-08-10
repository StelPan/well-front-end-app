import http from "../plugins/axios";

const loadUsers = async (params = {}) => {
    const response = await http.get('/api/company/v1/user', params);
    return response.data;
};

export { loadUsers };
