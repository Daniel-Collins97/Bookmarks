'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');
const accounts = require('./accounts');

const start = {
    index(request, response) {
        logger.info('start rendering');
        const currentUser = accounts.getCurrentUser(request);
        const bookmarks = bookmarkStore.getUserBookmarks(currentUser.id);
        let totallinks = 0;
        for (let i = 0; i<bookmarks.length; i++)
        {
            logger.info("bookmark", bookmarks[i].links.length);
            totallinks+=bookmarks[i].links.length;
        }
        logger.info("total =", totallinks)
        const viewData = {
            title: 'Welcome to Gomark V3.0',
            bookmarks: bookmarks,
            total: totallinks,
        };

        response.render('start', viewData);
    },
};

module.exports = start;
