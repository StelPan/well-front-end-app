import http from "../plugins/axios";

const loadPartners = async (params = {}) => {
    const response = await http.get('/api/company/v1/partner', {params});
    return response.data;
};

const loadPartner = async (id) => {
    const response = await http.get('/api/company/v1/partner/' + id);
    return response.data;
};

const loadPartnerCategories = async () => {
    const response = await http.get('/api/company/v1/partner-category');
    return response.data;
};

const updatePartnerCategory = async (id, body) => {
    const response = await http.post('/api/company/v1/partner-category/' + id, body);
    return response.data;
};

const updatePartner = async (id, body) => {
    await http.post('/api/company/v1/partner/' + id, body);
};

const destroyPartnerCategory = async (id) => {
    // TODO: DELETE PARTNER CATEGORY
}

const loadPartnerCategory = async (id) => {
    const response = await http.get('/api/company/v1/partner-category/' + id);
    return response.data;
};

const createPartnerCategory = async (body) => {
    const response = await http.post('/api/company/v1/partner-category', body);
    return response.data;
};

const uploadPartnerPhoto = async (id, body) => {
    const response = await http.post(`api/company/v1/partner/${id}/photo/upload`, body);
    return response.data
};

const destroyPartnerPhoto = async (id, body) => {
    const response = await http.post(`/api/company/v1/partner/${id}/photo/delete`, body);
    return response.data;
};

export default {
    loadPartner,
    loadPartners,
    loadPartnerCategories,
    loadPartnerCategory,
    updatePartnerCategory,
    createPartnerCategory,
    updatePartner,
    uploadPartnerPhoto,
    destroyPartnerPhoto,
};