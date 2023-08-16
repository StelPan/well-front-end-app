import http from "../plugins/axios";

const loadBuildings = async () => {
    const response = http.get('/api/company/v1/building');
    return response.data;
};

const loadBuilding = async (id) => {
    const response = http.get('/api/app/v1/building/' + id);
    return response.data;
};

export {loadBuildings, loadBuilding};