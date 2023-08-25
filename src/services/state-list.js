import http from "../plugins/axios";

const loadStates = async () => {
    const response = await http.get('/api/company/v1/state/state-list');
    return response.data;
};

const updateState = async (id, body) => {
    const response = await http.post('/api/company/v1/state/state-list/' + id, body);
    return response.data;
}

export {loadStates, updateState};