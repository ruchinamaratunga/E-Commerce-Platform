const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.getRegisterAction);
router.post('/signup', authController.postRegisterAction);
router.get('/login', authController.getLoginAction);
router.post('/login', authController.postLoginAction);
router.post('/logout', authController.postLogoutAction);

module.exports = router;