'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const stats = require('./controllers/stats');
const saved = require('./controllers/saved.js');
const about = require('./controllers/about.js');
const bookmark = require('./controllers/bookmark.js');
const conformation = require('./controllers/conformation.js');
const accounts = require('./controllers/accounts.js');


router.get('/stats', stats.index);
router.get('/saved', saved.index);
router.get('/about', about.index);
router.get('/bookmark/:id', bookmark.index);
router.get('/bookmark/:id/deletelink/:linkid', bookmark.deleteLink);
router.get('/')

router.get('/conformation', conformation.index);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/start', start.index);
router.get('/saved/deleteallpictures', saved.deleteAllPictures);
router.get('/saved/deletepicture', saved.deletePicture);

router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/bookmark/:id/addlink', bookmark.addLink);
//router.post('/saved/addbookmark', saved.addBookmark);
router.post('/about/sentmessage', about.sentMessage);
router.post('/saved/uploadpicture', saved.uploadPicture);


module.exports = router;
