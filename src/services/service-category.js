import http from "../plugins/axios";

const loadServiceCategories = async () => {
    const response = await http.get('/api/company/v1/service-category');
    return response.data;
};

const loadServiceCategory = async (id) => {
    const response = await http.get('/api/company/v1/service-category/' + id);
    return response.data;
};

const createServiceCategory = async (data) => {
    const response = await http.post('/api/company/v1/service-category', data);
    return response.data;
}

const updateServiceCategory = async (id, data) => {
    const response = await http.post('/api/company/v1/service-category/' + id, data);
    return response.data;
}

export default {loadServiceCategories, loadServiceCategory, createServiceCategory, updateServiceCategory};