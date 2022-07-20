const UserController = require('../controllers/UserController')
const {getCategories, getOneCategory} = require('../controllers/CategoryController')
const { storeDiscussion, getOneDiscussion, getCategoryDiscussions, storeReply, getDiscussionReplies, increasDiscussionViews, storePrivateDiscussion, getPrivateDiscussions } = require('../controllers/DiscussionController')

// import CategoryContents from './../../src/Components/Home/Category/CategoryContents';

async function router(app) {

    app.get('/signup', UserController.signup )

    app.get('/', {onRequest: app.auth}, UserController.getUser )

    app.get('/protected', {onRequest: app.auth}, UserController.protected) 

    //People
    app.get('/members', UserController.getMembers)

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

}

module.exports = router