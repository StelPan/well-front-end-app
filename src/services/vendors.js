import http from '../plugins/axios';

const loadVendors = async (params) => {
    const response = await http.get('/api/company/v1/vendor', {params});
    return response.data;
};

const loadVendor = async (id) => {
    const response = await http.get('/api/company/v1/vendor/' + id);
    return response.data;
};

const updateVendor = async (id, form) => {
    const response = await http.post('/api/company/v1/vendor/' + id, form);
    return response.data;
};

export default { loadVendors, loadVendor, updateVendor};