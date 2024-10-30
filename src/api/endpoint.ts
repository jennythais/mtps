const endpoints = {
     // Assistant
     getStudent: 'GET /api/students',
     getStudentByFaculty: 'GET /api/student-by-faculty/{faculty}',
     searchStudent: 'POST /api/search-student',
     updateDiscipline: 'PUT /api/update-discipline',

     // Auth
     login: 'POST /api/login',
     forgotPassword: 'POST /api/forgot-password',
     resetPassword: 'POST /api/reset-password',
     // Profile
     getProfile: 'GET /api/profile',
     updateProfile: 'PUT /api/update-profile',
     changePassword: 'POST /api/change-password',
     pointCategory: 'POST /api/get-points-category',

     // Post
     getPosts: 'GET /api/posts',
     getPostById: 'GET /api/post_by_id/{postID}',
     getExpiredPosts: 'GET /api/expired_posts',
     getPostByCategory: 'GET /api/post_by_cate',
     getListAttendees: 'GET /api/list_attendees/{id}',
     createPost: 'POST /api/create_post',
     updatePost: 'PUT /api/update_post',
     checkAttendance: 'PUT /api/check_attendance',

     // Test   
     getTests: 'GET /api/tests/{testId}',
     getTestById: 'GET /api/test-by-id/{postId}',
     createTest: 'POST /api/create-test',
     doTest: 'POST /api/do-test',
}
export default endpoints;