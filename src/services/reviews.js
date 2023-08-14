import http from "../plugins/axios";

const loadReviews = async (params = {}) => {
    const response = await http.get('/api/company/v1/review', { params });
    return response.data;
};

const loadReview = async (id) => {
    const response = await http.get('/api/company/v1/review/' + id);
    return response.data;
};

const confirmReview = async (id, body) => {
    const response = await http.post(`/api/company/v1/review/${id}/confirm`, body);
    return response.data;
}

const declineReview = async (id, body) => {
    const response = await http.post(`/api/company/v1/review/${id}/decline`, body);
    return response.data;
};

export {loadReview, loadReviews, declineReview, confirmReview};
