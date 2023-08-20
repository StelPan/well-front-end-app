import http from '../plugins/axios';

const loadVendors = async (params) => {
    const response = await http.get('/api/company/v1/vendor', {params});
    return response.data;
};

const loadVendor = async (id) => {
    const response = await http.get('/api/company/v1/vendor/' + id);
    return response.data;
};

export default { loadVendors, loadVendor};