const UserController = require('../controllers/UserController')
const {getCategories, getOneCategory, storeSubCategories, getOneSubCategory, getOneTag} = require('../controllers/CategoryController')
const { storeDiscussion, getOneDiscussion, getCategoryDiscussions, storeReply, getDiscussionReplies, increasDiscussionViews, storePrivateDiscussion, getPrivateDiscussions, storeReaction, getReaction, getReplyReaction, storeReplyReaction, getUserDiscussions, getUserPosts, getUserMentions, getsubCategoryDiscussions, getFollowingDiscussions, discussionAction, getTagDiscussions, setBestAnswer } = require('../controllers/DiscussionController')
const { getSeachData } = require('../controllers/SystemController')
const { updateProfile, uploadProfilePhoto, uploadDiscussionPhoto } = require('../controllers/ProfileController')

// import CategoryContents from './../../src/Components/Home/Category/CategoryContents';

async function router(app) {


    app.post('/sso_auth', {onRequest: app.authSso }, UserController.ssoAuth)
    
    app.get('/signup', UserController.signup )
    app.post('/authorize', {onRequest: app.auth}, UserController.authorize) 

    //Profile
    app.post('/update_profile', {onRequest: app.authSso}, updateProfile)
    app.post('/upload_profile_photo', {onRequest: app.authSso}, uploadProfilePhoto)

    app.post('/upload_discussion_photo', {onRequest: app.authSso}, uploadDiscussionPhoto)

    

    //Search
    app.get('/search', getSeachData)

    //People
    app.get('/user/:id', UserController.getUserInfo)
    app.get('/members', UserController.getSearchedMembers)
    app.get('/all_members', UserController.getAllMembers)
    app.get('/user/posts/:userId', getUserPosts)
    app.get('/user/discussions/:userId', getUserDiscussions)
    app.get('/user/mentions/:userId', getUserMentions)
    app.get('/user/notifications/unread', {onRequest: app.auth}, UserController.getUnreadNotifications)
    app.post('/user/notification/make_read', {onRequest: app.auth}, UserController.makeNotificationUnread)
    app.post('/user/save_bio', {onRequest: app.auth}, UserController.saveBio)
    app.post('/user/action', {onRequest: app.auth}, UserController.userAction)
    app.post('/user/remove_from_ignore', {onRequest: app.auth}, UserController.removeFromIgnore)

    
    
    //Category
    app.get('/category/get', getCategories)
    app.get('/category/:slug', getOneCategory)
    app.get('/subcategory/:id', getOneSubCategory)

    //Create Static sub category (will remove after done)
    // app.get('/subcategory', storeSubCategories)

 
    //Discussions
    app.get('/discussions/:categorySlug', getCategoryDiscussions)
    app.get('/discussions/following', {onRequest: app.auth}, getFollowingDiscussions)
    app.get('/discussions/subcategory/:id', getsubCategoryDiscussions)
    app.get('/discussions/tag/:name', getTagDiscussions)


    app.get('/discussions/private', {onRequest: app.auth}, getPrivateDiscussions)
    app.get('/discussion/:discussionId', {onRequest: app.auth}, getOneDiscussion)
    app.post('/discussion/views/:id', increasDiscussionViews)
    app.post('/discussion/store', {onRequest: app.auth}, storeDiscussion)
    app.post('/discussion/private/store', {onRequest: app.auth}, storePrivateDiscussion)
    app.post('/discussion/action', {onRequest: app.auth}, discussionAction)


    //Reply
    app.post('/reply/store', {onRequest: app.auth}, storeReply)
    app.get('/replies/:discussionId', getDiscussionReplies)


    app.post('/store_best_answer', {onRequest: app.auth}, setBestAnswer)

    //Reaction
    app.get('/reaction/get/:discussionId', getReaction)
    app.get('/reply/reaction/get/:replyId', getReplyReaction)
    app.post('/reaction/store', {onRequest: app.auth}, storeReaction)
    app.post('/reply/reaction/store', {onRequest: app.auth}, storeReplyReaction)


}

module.exports = router