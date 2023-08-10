import http from "../plugins/axios";

const loadUsers = async (params = {}) => {
    const response = await http.get('/api/company/v1/user', params);
    return response.data;
};

const loadUser = async (id) => {
    const response = await http.get('/api/company/v1/user/' + id);
    return response.data;
};

export { loadUsers, loadUser };
