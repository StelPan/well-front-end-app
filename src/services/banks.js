import http from "../plugins/axios";

const loadBanks = async () => {
    const response = await http.get('/api/company/v1/bank');
    return response.data;
};

const loadAcquiring = async (bankId) => {
    const response = await http.get(`/api/company/v1/bank/${bankId}/acquiring`);
    return response.data;
};

const createAcquiring = async (bankId, body = {}) => {
    const response = await http.post(`/api/company/v1/bank/${bankId}/acquiring`, body);
    return response.data;
};

const updateAcquiring = async (bankId, acquiringId, body) => {
    const response = await http.post(`/api/company/v1/bank/${bankId}/acquiring/${acquiringId}`, body);
    return response.data;
};

export default {loadBanks, loadAcquiring, createAcquiring, updateAcquiring};