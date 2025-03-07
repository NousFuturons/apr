// server/scripts/seeds/mediaSeed.js

const mongoose = require('mongoose');
const Media = require('../../models/Media');

const mediaData = [
    {
        filename: '0-saint-suliac-lamoureux-alexandre-1920x1280.jpg',
        url: 'https://www.tourismebretagne.com/app/uploads/crt-bretagne/2018/11/0-saint-suliac-lamoureux-alexandre-1920x1280.jpg',
        type: 'image',
        description: 'Saint-Suliac et la vallée de la Rance'
    },
    {
        filename: 'EDF_construction-mareemotrice.mp4',
        url: 'https://youtu.be/PYMrpHWW0Ho',
        type: 'video',
        description: 'Construction de l\'usine maréemotrice de la Rance. ©EDF'
    }
];

const seedMedia = async () => {
    try {
        const media = await Media.create(mediaData);
        console.log(`${media.length} media created`);
        return media;
    } catch (error) {
        console.error('Error seeding media:', error);
        throw error;
    }
};

module.exports = seedMedia;
