import http from "../plugins/axios";

const loadInclusions = async () => {
    const response = await http.get('/api/company/v1/inclusion');
    return response.data;
};

export default {loadInclusions};