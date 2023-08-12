import http from '../plugins/axios';

const loadVendors = async () => {
    const response = await http.get('/api/company/v1/vendor');
    return response.data;
};

const loadVendor = async (id) => {
    const response = await http.get('/api/company/v1/' + id);
    return response.data;
};

export default { loadVendors, loadVendor};