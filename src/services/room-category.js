import http from "../plugins/axios";

const loadRoomCategory = async (segmentId, roomCategoryId) => {
    const response = await http.get(
        '/api/company/v1/segment/' + segmentId + '/room-category/' + roomCategoryId
    );

    return response.data;
};

export default {loadRoomCategory};