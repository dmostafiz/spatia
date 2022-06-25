const UserController = require('../controllers/UserController')

async function router(app) {

    app.get('/signup', UserController.signup )
    app.get('/', {onRequest: app.auth}, UserController.getUser )
    app.get('/protected', {onRequest: app.auth}, UserController.protected) 

}

module.exports = router