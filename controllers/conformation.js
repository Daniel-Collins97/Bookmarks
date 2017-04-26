'use strict'
const logger = require('../utils/logger');

const conformation = {
    index(request, response) {
        logger.info('conformation rendering');
        const viewData = {
            title: 'conformation',
        };
        response.render('conformation', viewData);
    }
};

module.exports = conformation;