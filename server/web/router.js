const UserController = require('../controllers/UserController')
const {getCategories, getOneCategory} = require('../controllers/CategoryController')
const { storeDiscussion, getOneDiscussion } = require('../controllers/DiscussionController')

// import CategoryContents from './../../src/Components/Home/Category/CategoryContents';

async function router(app, opt, done) {

    app.get('/signup', UserController.signup )

    app.get('/', {onRequest: app.auth}, UserController.getUser )
    
    app.get('/protected', {onRequest: app.auth}, UserController.protected) 

    app.get('/category/get', getCategories)
    app.get('/category/:slug', getOneCategory)

    app.get('/discussion/:discussionId', getOneDiscussion)
    app.post('/discussion/store', {onRequest: app.auth}, storeDiscussion)



    await done()

}

module.exports = router