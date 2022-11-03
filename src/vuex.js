import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    
    user: null,
    alertMessage: null,
    alert: null
}

const store = new Vuex.Store({
    state,
    getters:{
        user: (state) => {
            return state.user
        },
        alertMessage: (state) => {
            return state.alertMessage;
        },
        alert: (state) => {
            return state.alert;
        }
    },
    actions:{
        user(context, user){
            context.commit('user',user);
        },
        alertMessage(context, alertMessage) {
            context.commit('alertMessage',alertMessage);
        },
        alert(context, alert) {
            context.commit('alert',alert);
        }
    },
    mutations:{
        user(state, user){     
            state.user = user;
        },
        alertMessage(state, alertMessage) {
            state.alertMessage = alertMessage;
        },
        alert(state, alert) {
            state.alert = alert;
        }
    },
    plugins: [createPersistedState()]
});

export default store;