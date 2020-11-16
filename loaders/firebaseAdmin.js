const admin = require("firebase-admin")

module.exports = ()=> {
    admin.initializeApp({
        credential: admin.credential.cert(config.admin_service_account),
        databaseURL: 'https://onetouch-3d523.firebaseio.com'
    })
}
