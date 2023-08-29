import http from '../plugins/axios';

const loadFilterSegments = async () => {
    const response = await http.get('/api/company/v1/room/filter/segment');
    return response.data;
};

const loadSegment = async (id) => {
    const response = await http.get('/api/company/v1/room/filter/segment/' + id);
    return response.data;
}

const loadCategoriesByFilter = async (filterId) => {
    const response = await http.get(`/api/company/v1/room/filter/${filterId}/category`);
    return response.data;
};

const loadObjectsByCategory = async (params = {}) => {
    const response = await http.get('/api/company/v1/room', {params});
    return response.data;
};

const loadObject = async (objectId) => {
    const response = await http.get('/api/company/v1/room/' + id);
    return response.data;
};

const updateObject = async (objectId, body = {}) => {
    const response = await http.post('/api/company/v1/room' + id, body);
    return response.data;
};

export default {
    loadSegment,
    loadFilterSegments,
    loadCategoriesByFilter,
    loadObjectsByCategory,
    loadObject, updateObject
};