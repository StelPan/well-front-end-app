import http from "../plugins/axios";

const loadPermissions = async () => {
    const response = await http.get('/api/company/v1/state/permission-list');
    return response.data;
};

export {loadPermissions};