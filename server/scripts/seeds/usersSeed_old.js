// server/scripts/seeds/usersSeed.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Pour hasher les mots de passe
const User = require('../../models/User');

const usersData = [
    {
        username: 'admin',
        email: 'annabel@futurons.org',
        password: '\$2y\$12$4Umg0rCJwMswRw/l.SwHvuQV01coP0eWmGzd61QH2RvAOMANUBGC.',  // mot de passe hashé
        role: 'admin'
    },
    {
        username: 'davidp',
        email: 'david@noussommeslesvagues.org',
        password: '\$2y\$12$Q9JxF5vXK8Z2pL9wQ.YJ3.X5K7q9Z8Q8Q4X5K7q9Z8Q8Q4X5K7q9Z',
        role: 'editor'
    }
];

const seedUsers = async () => {
    try {
        // Hash des mots de passe
        const hashedUsers = await Promise.all(
            usersData.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );

        // Création des utilisateurs
        const users = await User.create(hashedUsers);
        console.log(`${users.length} users created`);
        return users;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
};

module.exports = seedUsers;
