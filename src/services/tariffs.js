import http from '../plugins/axios';

const loadTariffs = async (params = {}) => {
  const response = await http.get('/api/company/v1/tariff', { params });
  return response.data;
};

const loadTariff = async (id) => {
  const response = await http.get('/api/company/v1/tariff/' + id);
  return response.data;
};

const createTariff = async (data) => {
  const response = await http.post('/api/company/v1/tariff', data);
  return response.data;
}

const editTariff = async (id, data) => {
  const response = await http.post('/api/company/v1/tariff/' + id, data);
  return response.data;
}

const destroyTariff = async (id) => {
  const response = await http.post(`/api/company/v1/tariff/` + id + '/delete');
}

export default {loadTariffs, loadTariff, editTariff, createTariff, destroyTariff};