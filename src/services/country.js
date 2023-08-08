import http from "../plugins/axios";

const loadCountries = async () => {
    const response = await http.get('/api/app/v1/country');
    return response.data.data;
};

export { loadCountries };
