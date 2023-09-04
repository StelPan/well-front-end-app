import http from "../plugins/axios";

const loadCounterparties = async () => {
    const response = await http.get('/api/company/v1/contractor');
    return response.data;
};

const loadCounterparty = async (id) => {
    const response = await http.get('/api/company/v1/contractor/' + id);
    return response.data;
};

const createCounterparty = async (data = {}) => {
    const response = await http.post('/api/company/v1/contractor', data);
    return response.data;
};

const updateCounterparty = async (id, body = {}) => {
    const response = await http.post(`/api/company/v1/contractor/${id}`, body);
    return response.data;
};

const uploadCounterpartyPhoto = async (id, body) => {
    const response = await http.post(`/api/company/v1/contractor/${id}/photo/upload`, body);
    return response.data;
};

const deleteCounterpartyPhoto = async (id, body = {}) => {
    const response = await http.post(`/api/company/v1/contractor/${id}/photo/delete`, body);
    return response.data;
};

export default {
    loadCounterparty,
    loadCounterparties,
    createCounterparty,
    updateCounterparty,
    uploadCounterpartyPhoto,
    deleteCounterpartyPhoto,
};