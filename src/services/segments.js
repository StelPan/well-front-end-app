import http from "../plugins/axios";

const loadSegments = async (params = {}) => {
    const response = await http.get('/api/company/v1/segment', {params});
    return response.data;
};

const loadSegment = async (id) => {
    const response = await http.get('/api/company/v1/segment/' + id);
    return response.data;
};

const createSegment = async (body = {}) => {
    const response = await http.post('/api/company/v1/segment', body);
    return response.data;
};

const updateSegment = async (id, body = {}) => {
    const response = await http.post('/api/company/v1/segment/' + id, body);
    return response.data
};

export default {loadSegment, loadSegments, createSegment, updateSegment};