import axios from 'axios'

const state = {
    todos: [
        {
            id: 1,
            title: 'one'
        }
    ]
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const result = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log(result.data)
        commit('setTodos', result.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos)
}

export default {
    state,
    getters,
    actions,
    mutations
}