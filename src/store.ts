import { createStore, Commit } from 'vuex'
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
  _id: number
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

interface ParamsProps {
  columnId: string
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  params?: ParamsProps
) => {
  const { data } = await axios.post(url, params)
  commit(mutationName, data)
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
    fetchColumns({ commit }) {
      getAndCommit('/columns/getColumnList', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit('/columns/getColumnInfo', 'fetchColumn', commit, {
        columnId: cid
      })
    },
    fetchPosts({ commit }, cid) {
      getAndCommit('/columns/columnArticleList', 'fetchPosts', commit, {
        columnId: cid
      })
    },
    // async createPost({commit}, params) {
    //   const res = await axios.post('')
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
