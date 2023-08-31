import http from "../plugins/axios";

const loadRoomCategories = async (segmentId, params = {}) => {
    const response = await http.get(
        '/api/company/v1/segment/' + segmentId + '/room-category',
        {params}
    );

    return response.data;
};

const loadRoomCategory = async (segmentId, roomCategoryId) => {
    const response = await http.get(
        '/api/company/v1/segment/' + segmentId + '/room-category/' + roomCategoryId
    );

    return response.data;
};

const loadRoomCategoryTariffs = async (segmentId, roomCategoryId) => {
    const response = await http.get(
        '/api/company/v1/segment/' + segmentId + '/room-category/' + roomCategoryId + '/tariff'
    );

    return response.data;
};

const loadRoomCategoryServices = async (segmentId, roomCategoryId) => {
    const response = await http.get(
        '/api/company/v1/segment/' + segmentId + '/room-category/' + roomCategoryId + '/tariff'
    );

    return response.data;
};

const touchRoomCategoryTariff = async (segmentId, roomCategoryId, body = {}) => {
    const response = await http.post(
        '/api/company/v1/segment/' + segmentId + '/room-category/' + roomCategoryId + '/tariff',
        body
    );

    return response.data;
};

export default {
    loadRoomCategory,
    loadRoomCategoryTariffs,
    loadRoomCategories,
    loadRoomCategoryServices,
    touchRoomCategoryTariff
};