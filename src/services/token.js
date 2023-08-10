const ACCESS_TOKEN = 'access_token';

const getRefreshToken = () => {};

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};

const removeRefreshToken = () => {};

const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};

const setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
};

export default { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken };
