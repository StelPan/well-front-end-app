import http from "../plugins/axios";

const loadTypeTariffs = async () => {
    const response = await http.get('/api/company/v1/tariff/period');
    return response.data;
}

export default {loadTypeTariffs};