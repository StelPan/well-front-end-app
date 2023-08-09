import http from "../plugins/axios";

const fetchAuthorization = async (phone) => {
    const response = await http.post('/api/company/v1/auth/login', { phone });
    return response.data;
};

const fetchVerifyCode = async (phone, code, phoneCode) => {
    console.log('fetchVerify')
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

const fetchProfile = async (phone, code) => {
    const response = await http.post('/api/company/v1/auth/me', { phone, code });
    return response.data;
};

export default { fetchProfile, fetchAuthorization, fetchLogout, fetchRefreshToken, fetchVerifyCode}
