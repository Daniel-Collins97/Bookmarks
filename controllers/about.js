'use strict';

const logger = require('../utils/logger');

const about = {
    index(request, response) {
        logger.info('about rendering');
        const viewData = {
            title: 'About',
        };
        response.render('about', viewData);
    },

    sentMessage(request, response)
    {
        logger.info('Message sent to Author');
        const viewData =
            {
                title: "Congrats!"
            }
        response.render('conformation', viewData)
    }
};

module.exports = about;
