import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface UserProps {
  isLogin: boolean
  name?: string
  _id?: string
  headline?: string
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
  _id: number
  title: string
  content?: string
  image?: string
  createdAt: string
  columnId: number
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  column: ColumnDetailProps
  user: UserProps
}

const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  params?: any
) => {
  const { data } = await axios.post(url, params)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    column: {
      _id: '',
      title: '',
      description: ''
    },
    user: {
      _id: '',
      isLogin: false,
      name: 'tang',
      columnId: 1
    }
  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: 'tang' }
    // },
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
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login(state, rawData) {
      const { token, data } = rawData
      state.token = token
      state.user = { isLogin: true, ...data }
      localStorage.setItem('token', token)
      localStorage.setItem('_id', data._id)
      axios.defaults.headers.common.token = `Bearer ${token}`
    }
  },
  actions: {
    fetchColumns({ commit }) {
      postAndCommit('/columns/getColumnList', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      postAndCommit('/columns/getColumnInfo', 'fetchColumn', commit, {
        columnId: cid
      })
    },
    fetchPosts({ commit }, cid) {
      postAndCommit('/columns/columnArticleList', 'fetchPosts', commit, {
        columnId: cid
      })
    },
    fetchCurrentUser({ commit }, cid) {
      postAndCommit('/users/getUserInfo', 'fetchCurrentUser', commit, {
        userId: cid
      })
    },
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios.post('/users/login', params).then(res => {
          if (res.data.code === 1) {
            commit('login', res.data)
            resolve(res.data)
          } else {
            reject()
          }
        }).catch(err => {
          console.log(err)
        })
      })
    }
    // loginAndFetch({dispatch}, loginData) {
    //   return dispatch('login', loginData).then(() => {
    //     return dispatch('fetchCurrentUser')
    //   })
    // }
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
