import http from "../plugins/axios";

const loadReviews = async (params = {}) => {
    const response = await http.get('/api/company/v1/review', { params });
    return response.data;
};

const loadReview = async (id) => {
    const response = await http.get('/api/company/v1/review/' + id);
    return response.data;
};

export {loadReview, loadReviews};
