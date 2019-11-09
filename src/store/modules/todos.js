import axios from 'axios'

const state = {
    todos: []
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const result = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit('setTodos', result.data)
    },
    async addTodo({ commit }, title) {
        console.log('work')
        const result = await axios.post('https://jsonplaceholder.typicode.com/todos', { title,
        completed: false })
        
        commit('newTodo', result.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e ) {
        console.log(e)
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        console.log(limit)
        const result = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', result.data)
    },
    async updateTodo({ commit }, updTodo) {
        const result = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, 
            updTodo
        );
        commit('updateTodo', result.data)
        console.log(result.data)
    }
    
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id)
        if(index !== -1) {
            state.todos.splice(index, 1, updTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}