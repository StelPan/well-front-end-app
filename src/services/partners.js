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

const loadPartnerCategory = async (id) => {
    const response = await http.get('/api/company/v1/partner-category/' + id);
    return response.data;
};

export default {loadPartner, loadPartners, loadPartnerCategories, loadPartnerCategory};