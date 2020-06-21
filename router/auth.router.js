const express = require('express')
const controller = require('../controllers/auth.controller')
const validate = require('../validate/auth.validate')
const multer = require('multer')
const upload = multer({
    dest: "./public/image"
})
const router = express.Router();

router.get('/login', controller.login);
router.post('/login', validate.postLogin ,controller.postLogin);

router.get('/signOut', controller.signOut);

router.get('/creat', controller.creat);

router.post('/creat', upload.single('avatar'), validate.postCreat, controller.postCreat);

module.exports = router