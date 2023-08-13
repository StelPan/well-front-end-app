import http from '../plugins/axios';

const loadTypeLocations = async () => {
    const response = await http.get('/api/v1/company/location/types');
    return response.data;
};

export {loadTypeLocations};