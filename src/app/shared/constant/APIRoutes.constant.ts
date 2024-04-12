export const APIRoutes = {
  getAllPost: '/post',
  login: '/api/auth/login',
  register: '/api/auth/signup',
  uploadImage: '/post/upload-post',
  myUploads: '/post/my-uploads',
  getUserDetails: '/user',
  likePost: '/post/likePost',
  unLikePost: '/post/unlikePost',

  getPostDetail: (postId:  string) => `/post/${postId}`,
  deletePostById: (postId:  string) => `/post/${postId}`,
  commentPostById: (postId:  string) => `/post/comment/${postId}`,
}