import AuthService from "../services/auth";

const state = () => ({
    code: null,
    phone: null,
    phoneCode: null,
    profile: null,
})

const actions = {
    async fetchAuthorization({ commit }, phone){
        console.log('phone', phone);
        const response = await AuthService.fetchAuthorization(phone);
        console.log(response);
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
    }
};

export default { state, actions, mutations, getters };
