import http from "../plugins/axios";

const loadBuildings = async (params = {}) => {
    const response = await http.get('/api/company/v1/building', {params});
    return response.data;
};

const loadBuilding = async (id) => {
    const response = await http.get('/api/company/v1/building/' + id);
    return response.data;
};

const createBuilding = async (body = {}) => {
    const response = await http.post('/api/company/v1/building', body);
    return response.data;
};

const updateBuilding = async (id, body) => {
    const response = await http.post('/api/company/v1/building/' + id, body);
    return response.data;
};

const destroyBuilding = async (id) => {
     // TODO: ДОБАВИТЬ ЗАПРОС НА УДАЛЕНИЕ ЗДАНИЯ
}

const createBuildingLocationPoint = async (id, body = {}) => {
    const response = await http.post('/api/company/v1/building/' + id + '/point/location', body);
    return response.data;
};

const updateBuildingLocationPoint = async (buildingId, pointId, body) => {
    const response = await http.post(
        '/api/company/v1/building/' + buildingId + '/point/location/' + pointId, body
    );

    return response.data;
};

const changePointTypeLocationPoint = async (buildingId, pointId, body = {}) => {
    const response = await http.post(
        '/api/company/v1/building/' + buildingId + '/point/location/' + pointId + '/type',
        body,
    );

    return response.data;
};

export {
    loadBuildings,
    loadBuilding,
    createBuilding,
    destroyBuilding,
    createBuildingLocationPoint,
    updateBuildingLocationPoint,
    updateBuilding,
    changePointTypeLocationPoint,
};