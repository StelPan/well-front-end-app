import http from "../plugins/axios";

const loadRoles = async () => {
    const response = await http.get('/api/company/v1/role');
    return response.data;
};

export { loadRoles };
