'use strict';

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const saved = {
    index(request, response) {
        logger.info('saved rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        const viewData = {
            title: 'Saved Pictures',
            user: loggedInUser,
            album: pictureStore.getAlbum(loggedInUser.id),
        };
        response.render('saved', viewData);
    },

    uploadPicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
            response.redirect('/saved');
        });
    },

    deleteAllPictures(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deleteAllPictures(loggedInUser.id);
        response.redirect('/saved');
    },

    deletePicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deletePicture(loggedInUser.id, request.query.img);
        response.redirect('/saved');
    },
};

module.exports = saved;