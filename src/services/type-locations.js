import http from '../plugins/axios';

const loadTypeLocations = async () => {
    const response = await http.get('/api/company/v1/location/types');
    return response.data;
};

export {loadTypeLocations};