import AuthService from "../services/auth";
import TokenService from "../services/token";

const state = () => ({
    code: null,
    phone: null,
    phoneCode: null,
    profile: null,
    auth: null
})

const actions = {
    async fetchAuthorization({commit}, phone) {
        const response = await AuthService.fetchAuthorization(phone);
        commit('updatePhone', phone);
    },
    async fetchVerificationCode({commit}, {phone, code, phoneCode}) {
        const response = await AuthService.fetchVerifyCode(phone, code, phoneCode);
        const {data: {access_token}, user} = response;

        commit('updateProfile', user);
        TokenService.setAccessToken(access_token);
    },
    async fetchProfile({commit}) {
        const {data} = await AuthService.fetchProfile();
        commit('updateProfile', data);
    },
    async fetchUpdateProfile({commit}, {id, body = {}}) {
        await AuthService.fetchUpdateProfile(id, body);
    },
    async fetchDeleteAvatar({commit}, id) {
        await AuthService.fetchDeleteAvatar(id);
    },
    async fetchUpdateAuth({commit}, auth) {
        commit('updateAuth', !!auth);
    }
};

const mutations = {
    updateCode(state, code) {
        state.code = code;
    },
    updatePhone(state, phone) {
        state.phone = phone;
    },
    updateProfile(state, profile) {
        state.profile = profile;
    },
    updatePhoneCode(state, phoneCode) {
        state.phoneCode = phoneCode;
    },
    updateAuth(state, auth) {
        state.auth = auth;
    }
};

const getters = {
    getCode(state) {
        return state.code;
    },
    getPhone(state) {
        return state.phone;
    },
    getProfile(state) {
        return state.profile;
    },
    getPhoneCode(state) {
        return state.phoneCode;
    },
    getAuth(state) {
        return state.auth;
    }
};

export default {state, actions, mutations, getters};
