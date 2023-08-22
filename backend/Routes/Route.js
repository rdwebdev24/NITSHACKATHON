const express = require('express');
// initialising the express router 
const router = express.Router();
// getting all the controllers
const {GET_USER_WASTE,GET_ALL_USER,GET_WASTE_INFO,POST_WASTE_INFO,DELETE_WASTE_INFO} = require('../controllers/Controller.js')
const {LOGIN,REGISTER} = require('../controllers/authControllers.js')

router.route('/users').get(GET_ALL_USER)
router.route('/login').post(LOGIN)
router.route('/register').post(REGISTER)

// for getting and posting all wastes data
router.route('/waste').get(GET_WASTE_INFO).post(POST_WASTE_INFO)
// for single user contribution 
router.route('/waste/:userId').get(GET_USER_WASTE)

module.exports =  router