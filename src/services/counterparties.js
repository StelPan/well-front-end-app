import http from "../plugins/axios";

const loadCounterparties = async () => {
    const response = await http.get('/api/company/v1/contractor');
    return response.data;
};

const loadCounterparty = async (id) => {
    const response = await http.get('/api/company/v1/contractor/' + id);
    return response.data;
};

const createCounterparty = async (type, data = {}) => {
    const assignData = Object.assign({ type }, data);
    const response = await http.post('/api/company/v1/contractor/', assignData);
    return response.data;
};

export default { loadCounterparty, loadCounterparties, createCounterparty };