export const APIRoutes = {
  getAllPost: '/post',
  login: '/api/auth/login',
  register: '/api/auth/signup',
  uploadImage: '/post/upload-post',
  myUploads: '/post/my-uploads',
  getUserDetails: '/user',
  getPostDetail: (postId:  string) => `/post/${postId}`,
  deletePostById: (postId:  string) => `/post/${postId}`,
}