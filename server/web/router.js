const UserController = require('../controllers/UserController')
const {getCategories, getOneCategory} = require('../controllers/CategoryController')
const { storeDiscussion, getOneDiscussion, getCategoryDiscussions } = require('../controllers/DiscussionController')

// import CategoryContents from './../../src/Components/Home/Category/CategoryContents';

async function router(app) {

    app.get('/signup', UserController.signup )

    app.get('/', {onRequest: app.auth}, UserController.getUser )
    
    app.get('/protected', {onRequest: app.auth}, UserController.protected) 

    //Category
    app.get('/category/get', getCategories)
    app.get('/category/:slug', getOneCategory)
    
    //Discussions
    app.get('/discussions/:categorySlug', getCategoryDiscussions)
    app.get('/discussion/:discussionId', getOneDiscussion)
    app.post('/discussion/store', {onRequest: app.auth}, storeDiscussion)

}

module.exports = router