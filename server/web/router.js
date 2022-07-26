const UserController = require('../controllers/UserController')
const {getCategories, getOneCategory} = require('../controllers/CategoryController')
const { storeDiscussion, getOneDiscussion, getCategoryDiscussions, storeReply, getDiscussionReplies, increasDiscussionViews, storePrivateDiscussion, getPrivateDiscussions, storeReaction, getReaction, getReplyReaction, storeReplyReaction, getUserDiscussions, getUserPosts, getUserMentions } = require('../controllers/DiscussionController')

// import CategoryContents from './../../src/Components/Home/Category/CategoryContents';

async function router(app) {

    app.get('/signup', UserController.signup )
    app.post('/authorize', {onRequest: app.auth}, UserController.authorize) 

    //People
    app.get('/user/:id', UserController.getUserInfo)
    app.get('/members', UserController.getSearchedMembers)
    app.get('/all_members', UserController.getAllMembers)
    app.get('/user/posts/:userId', getUserPosts)
    app.get('/user/discussions/:userId', getUserDiscussions)
    app.get('/user/mentions/:userId', getUserMentions)
    app.get('/user/notifications/unread', {onRequest: app.auth}, UserController.getUnreadNotifications)
    app.post('/user/notification/make_read', {onRequest: app.auth}, UserController.makeNotificationUnread)
    
    //Category
    app.get('/category/get', getCategories)
    app.get('/category/:slug', getOneCategory)
 
    //Discussions
    app.get('/discussions/:categorySlug', getCategoryDiscussions)
    app.get('/discussions/private', {onRequest: app.auth}, getPrivateDiscussions)
    app.get('/discussion/:discussionId', {onRequest: app.auth}, getOneDiscussion)
    app.post('/discussion/views/:id', increasDiscussionViews)
    app.post('/discussion/store', {onRequest: app.auth}, storeDiscussion)
    app.post('/discussion/private/store', {onRequest: app.auth}, storePrivateDiscussion)


    //Reply
    app.post('/reply/store', {onRequest: app.auth}, storeReply)
    app.get('/replies/:discussionId', getDiscussionReplies)

    //Reaction
    app.get('/reaction/get/:discussionId', getReaction)
    app.get('/reply/reaction/get/:replyId', getReplyReaction)
    app.post('/reaction/store', {onRequest: app.auth}, storeReaction)
    app.post('/reply/reaction/store', {onRequest: app.auth}, storeReplyReaction)


}

module.exports = router