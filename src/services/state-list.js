import http from "../plugins/axios";

const loadStates = async () => {
    const response = await http.get('/api/company/v1/state/state-list');
    return response.data;
};

export {loadStates};