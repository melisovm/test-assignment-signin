export const state = {
  notification: null
}

export const getters = {
  notification: (state) => state.notification
}

export const actions = {
  open({ commit }, { color, text, timeout } = { color: 'success', text: '' }) {
    commit('ADD', { color, text })
  },

  remove({ commit }, notificationId) {
    commit('DELETE', notificationId)
  }
}

export const mutations = {
  ADD(state, payload) {
    state.notification = payload
  },

  DELETE(state, notificationId) {
    state.notification = null
  }
}
