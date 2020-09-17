import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const RegAndLog = () => import('components/regiAndLog/regiAndLog')
const Login = () => import('components/regiAndLog/login')
const Regist = () => import('components/regiAndLog/regist')
const My = () => import('components/my/my')
const MyProfile = () => import('components/my/profile')
const MyBlogs = () => import('components/my/myBlogs')
const MyFavorites = () => import('components/my/favorites')
const ChangeProfile = () => import('components/my/changeProfile')

const Blogs = () => import('components/blog/blogs')
const BlogDetail = () => import('components/blog/blogDetail')
const AddBlog = () => import('components/blog/addBlog')

// const ImgCropper = () => import('components/user/imgCropper')

const routes = [
  {
    path: '/',
    redirect: '/blogs',
  },
  {
    name: 'regAndLog',
    path: '/login',
    component: RegAndLog,
    children: [
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        name: 'regist',
        path: '/regist',
        component: Regist,
      },
    ],
  },

  {
    name: 'blogs',
    path: '/blogs',
    component: Blogs,
    children: [
      {
        path: ':id',
        component: BlogDetail,
      },
    ],
  },

  {
    name: 'addBlog',
    path: '/add',
    component: AddBlog,
    meta: {
      requireAuth: true,
    },
  },

  {
    name: 'my',
    path: '/myProfile',
    component: My,
    children: [
      {
        name: 'myProfile',
        path: '/myProfile',
        component: MyProfile,
      },
      {
        name: 'myBlogs',
        path: '/myBlogs',
        component: MyBlogs,
      },
      {
        name: 'myFavorites',
        path: '/myFavorites',
        component: MyFavorites,
      },
      {
        name: 'changeProfile',
        path: '/change-info',
        component: ChangeProfile,
      },
    ],
  },

  // {
  //   path: '/test',
  //   component: TestCropper,
  // },
  {
    path: '*',
    redirect: '/blog',
  },
]
export default new Router({
  mode: 'history',
  routes,
})
