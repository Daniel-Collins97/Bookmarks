
'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts');
try {
    const env = require('../.data/.env.json');
    cloudinary.config(env.cloudinary);
}
catch(e) {
    logger.info('You must provide a Cloudinary credentials file - see README.md');
    process.exit(1);
}

const pictureStore = {

    store: new JsonStore('./models/picture-store.json', { pictures: [] }),
    collection: 'pictures',

    getUserPictures(userid) {
        return this.store.findBy(this.collection, { userid: userid });
    },

    getPicture(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },

    getAlbum(userid) {
        return this.store.findOneBy(this.collection, { userid: userid });
    },

    addAlbum() {
        let album = {
            userid: userId,
            photo: [],
        };
        this.store.add(this.collection, album);
    },

    addPicture(userId, title, imageFile, response) {
        logger.info(userId);
        let album = this.getAlbum(userId);
        logger.info(album);
        if (!album) {
            album = {
                userid: userId,
                photo: [],
            };
            this.store.add(this.collection, album);
        }

        imageFile.mv('tempimage', err => {
            if (!err) {
                cloudinary.uploader.upload('tempimage', result => {
                    console.log(result);
                    const picture = {
                        img: result.url,
                        title: title,
                    };
                    album.photo.push(picture);
                    response();
                });
            }
        });
    },

    deletePicture(userId, image) {
        const id = path.parse(image);
        let album = this.getAlbum(userId);
        _.remove(album.photos, { img: image });
        cloudinary.api.delete_resources([id.name], function (result) {
            console.log(result);
        });
    },

    deleteAllPictures(userId) {
        let album = this.getAlbum(userId);
        if (album) {
            album.photo.forEach(photo => {
                const id = path.parse(photo.img);
                cloudinary.api.delete_resources([id.name], result => {
                    console.log(result);
                });
            });
            this.store.remove(this.collection, album);
        }
    },
};

module.exports = pictureStore;




/*
'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarkStore = {

    store: new JsonStore('./models/bookmark-store.json', { bookmarkCollection: [] }),
    collection: 'bookmarkCollection',

    getAllBookmarks() {
        return this.store.findAll(this.collection);
    },

    getBookmark(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },

    addBookmark(bookmark) {
        this.store.add(this.collection, bookmark);
    },

    getUserBookmarks(userid) {
        return this.store.findBy(this.collection, { userid: userid });
    },

    removeBookmark(id) {
        const bookmark = this.getBookmark(id);
        this.store.remove(this.collection, bookmark);
    },

    removeAllBookmark() {
        this.store.removeAll(this.collection);
    },

    addLink(id, link) {
        const bookmark = this.getBookmark(id);
        bookmark.links.push(link);
    },

    removeLink(id, linkId) {
        const bookmark = this.getBookmark(id);
        const link = bookmark.links;
        _.remove(link, { id: linkId});
    },
};

module.exports = bookmarkStore;*/
