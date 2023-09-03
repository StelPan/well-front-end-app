import http from "../plugins/axios";

const loadServices = async (params) => {
    const response = await http.get('/api/company/v1/service', {params});
    return response.data;
};

const loadService = async (id) => {
    const response = await http.get('/api/company/v1/service/' + id);
    return response.data;
};

const updateService = async (id, body) => {
    const response = await http.post('/api/company/v1/service/' + id, body);
    return response.data;
};

const createService = async (body) => {
    const response = await http.post('/api/company/v1/service', body);
    return response.data;
};

const destroyServicePhoto = async (id, uuid) => {
    const response = await http.post('/api/company/v1/service/' + id + '/photo/delete', {uuid});
    return response.data;
};

const createServiceCategory = async (body = {}) => {
    const response = await http.post('/api/company/v1/service-category', body);
    return response.data;
};

const uploadServicePhoto = async (id, body) => {
    const response = await http.post(`/api/company/v1/service/${id}/photo/upload`, body);
    return response.data;
};

export default {
    loadService,
    loadServices,
    updateService,
    createService,
    destroyServicePhoto,
    createServiceCategory,
    uploadServicePhoto
};