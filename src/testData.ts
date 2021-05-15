export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}

export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    description:
      '这是test1专栏，有一段有意思的简介，可以更新一下这是test1专栏，有一段有意思的简介，可以更新一下',
    avatar:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  },
  {
    id: 2,
    title: 'test2专栏',
    description:
      '这是test2专栏，有一段有意思的简介，可以更新一下这是有一段有意思的简介，可以更新一下',
    avatar:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  },
  {
    id: 3,
    title: 'test3专栏',
    description:
      '这是test2专栏，有一段有意思的简介，可以更新一下这是有一段有意思的简介，可以更新一下',
    avatar:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test2专栏，有一段有意思的简介，可以更新一下',
    avatar:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }
]

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是一篇文章这是一篇文章这是一篇文章这是一篇文章',
    content:
      'this is a new post you very often we will need to map router. this is a new post you very often we will need to map router this is a new post you very often we will need to map router',
    image:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    createdAt: '2021-05-22 11:22:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是一篇文章这是一篇文章这是一篇文章',
    content:
      'this is a new post you very often we will need to map router.this is a new post you very often we will need to map router.this is a new post you very often we will need to map router.this is a new post you very often we will need to map router.',
    createdAt: '2021-05-22 11:22:22',
    columnId: 1
  },
  {
    id: 3,
    title: '这是一篇文章',
    content: 'this is a new post you very often we will need to map router',
    image:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    createdAt: '2021-05-22 11:22:22',
    columnId: 1
  }
]
