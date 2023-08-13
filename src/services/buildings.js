import http from "../plugins/axios";

const loadBuildings = async () => {
    const response = http.get('/api/v1/company/building');
    return response.data;
};

const loadBuilding = async (id) => {
    const response = http.get('/api/app/v1/building/' + id);
    return response.data;
};

export {loadBuildings, loadBuilding}