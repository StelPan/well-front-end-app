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

export default {loadRoomCategory, loadRoomCategoryTariffs, loadRoomCategories};