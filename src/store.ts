import { createStore } from 'vuex'
import axios from 'axios'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: string
  description: string
}

export interface ColumnDetailProps {
  _id: string
  title: string
  avatar?: string
  description: string
}

export interface PostProps {
  _id: string
  title: string
  content?: string
  image?: string
  createdAt: string
  columnId: number
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  column: ColumnDetailProps
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    column: {
      _id: '',
      title: '',
      description: ''
    },
    user: {
      isLogin: true,
      name: 'tang',
      columnId: 1
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'tang' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data
    },
    fetchColumn(state, rawData) {
      state.column = rawData.data
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data
    }
  },
  actions: {
    fetchColumns(context) {
      axios.post('/columns/getColumnList').then((res) => {
        context.commit('fetchColumns', res.data)
      })
    },
    fetchColumn({ commit }, cid) {
      axios.post('/columns/getColumnInfo', { columnId: cid }).then((res) => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts({ commit }, cid) {
      axios
        .post('/columns/columnArticleList', { columnId: cid })
        .then((res) => {
          commit('fetchPosts', res.data)
        })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c._id === id)
    },
    getPostsByCid: (state) => () => {
      return state.posts
    }
  }
})

export default store
