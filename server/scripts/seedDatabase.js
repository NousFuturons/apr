// server/scripts/seedDatabase.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import des seeds spécifiques
const pointsSeed = require('./seeds/pointsSeed');
const mediaSeed = require('./seeds/mediaSeed');
const usersSeed = require('./seeds/usersSeed');

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Nettoyage des collections existantes
        console.log('Cleaning existing collections...');
        await mongoose.connection.db.dropDatabase();

        // Exécution des seeds dans l'ordre
        console.log('Seeding users...');
        await usersSeed();

        console.log('Seeding points...');
        await pointsSeed();

        console.log('Seeding media...');
        await mediaSeed();

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();