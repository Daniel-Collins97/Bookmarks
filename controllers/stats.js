'use strict'

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const stats = {
    index(request, response) {
        logger.info('stats rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        const pictures = pictureStore.getUserPictures(loggedInUser.id);
        const viewData = {
            title: 'stats',
            user: loggedInUser,
            pictures: pictures
        };
        response.render('stats', viewData);
    }
};

module.exports = stats;