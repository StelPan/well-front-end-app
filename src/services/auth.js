import http from "../plugins/axios";

let timerRefresh = null;

const fetchAuthorization = async (phone) => {
    const response = await http.post('/api/company/v1/auth/login', { phone });
    return response.data;
};

const fetchVerifyCode = async (phone, code, phoneCode) => {
    const response = await http.post('/api/company/v1/auth/verify-code', {
        phone_code: phoneCode,
        phone,
        code,
    });

    return response.data;
};

const fetchRefreshToken = async (phone, code) => {
    const response = await http.post('/api/company/v1/auth/refresh', { phone, code });
    return response.data;
};

const fetchLogout = async (phone, code) => {
    const response = await http.post('/api/company/v1/auth/logout', { phone, code });
    return response.data;
};

const fetchProfile = async () => {
    const response = await http.get('/api/company/v1/auth/me');
    return response.data;
};

const fetchDeleteAvatar = async (id) => {
    const response = await http.get('/api/company/v1/user/' + id + '/avatar/delete');
    return response.data;
};

const fetchUpdateProfile = async (id, body = {}) => {
    const response = await http.post('/api/company/v1/user/' + id, body);
    return response.data;
};

const refreshInterval = (token, iat, callback) => {
    if (!timerRefresh) timerRefresh = setInterval(async () => await callback())
};

export default {
    fetchProfile,
    fetchAuthorization,
    fetchLogout,
    fetchRefreshToken,
    fetchVerifyCode,
    fetchDeleteAvatar,
    fetchUpdateProfile,
    refreshInterval,
}
