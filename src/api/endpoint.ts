const endpoints = {
     // Assistant
     getStudents: 'GET /api/students',
     getStudentsByFaculty: 'GET /api/student-by-faculty/:faculty',
     updateDiscipline: 'PUT /api/update-discipline',

     // Auth
     login: 'POST /api/login',
     logout: 'POST /api/logout',
     forgotPassword: 'POST /api/forgot-password',
     resetPassword: 'POST /api/reset-password',

     // Profile
     getProfile: 'GET /api/profile',
     updateProfile: 'PUT /api/update-profile',
     changePassword: 'PUT /api/change-password',
     pointCategory: 'POST /api/get-points-category',
     updateTrainingPoint: 'PUT /api/update-training-point',

     // Post
     getPosts: 'GET /api/posts',
     getPostsAssistant: 'GET /api/posts-assistant',
     getPostById: 'GET /api/post_by_id',
     getExpiredPosts: 'GET /api/expired_posts',
     getPostByCategory: 'GET /api/post_by_category',
     getListAttendees: 'GET /api/list_attendees/{id}',
     createPost: 'POST /api/create_post',
     updatePost: 'PUT /api/update_post',
     joinPost: 'POST /api/join_post',
     checkAttendance: 'POST /api/check_attendance',

     // Test   
     getTests: 'GET /api/tests/{testId}',
     getTestById: 'GET /api/test-by-id',
     createTest: 'POST /api/create-test',
     doTest: 'POST /api/do-test',
}
export default endpoints;