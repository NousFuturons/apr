// server/scripts/seeds/usersSeed.js

const mongoose = require('mongoose');
const User = require('../../models/User');

const seedUsers = async () => {
    try {
        const usersData = [
            {
                username: "annabelr",
                email: "annabel@futurons.org",
                password: "\$2y\$12$4Umg0rCJwMswRw/l.SwHvuQV01coP0eWmGzd61QH2RvAOMANUBGC.", // APR_LesVagues2025!
                role: "admin",
                profile: {
                    firstName: "Annabel",
                    lastName: "Roux",
                    avatar: "https://storage.example.com/avatars/admin.jpg",
                    bio: "Designer des transitions, bricoleuse tout terrain, Annabel veille sur les témoignages collectés.",
                    organization: "Futurons!",
                    website: "https://futurons.org"
                },
                preferences: {
                    language: "fr",
                    notifications: {
                        email: true,
                        push: true
                    },
                    privacy: {
                        showEmail: false,
                        showProfile: true
                    }
                },
                stats: {
                    pointsCreated: 0,
                    mediaUploaded: 0,
                    lastLogin: new Date(),
                    loginCount: 1
                },
                status: "active",
                verification: {
                    isVerified: true,
                    token: null,
                    tokenExpires: null
                },
                lastPasswordChange: new Date()
            },
            {
                username: "davidp",
                email: "david@example.com",
                password: "\$2y\$12$Q9JxF5vXK8Z2pL9wQ.YJ3.X5K7q9Z8Q8Q4X5K7q9Z8Q8Q4X5K7q9Z", // David_LesVagues2025!
                role: "editor",
                profile: {
                    firstName: "David",
                    lastName: "Poncet",
                    avatar: "https://storage.example.com/avatars/david.jpg",
                    bio: "David lui aussi veille sur les témoignages collectés ET sur les finances du projet.",
                    organization: "Les Vagues",
                    website: "https://noussommeslesvagues.org"
                },
                preferences: {
                    language: "fr",
                    notifications: {
                        email: true,
                        push: false
                    },
                    privacy: {
                        showEmail: false,
                        showProfile: true
                    }
                },
                stats: {
                    pointsCreated: 0,
                    mediaUploaded: 0,
                    lastLogin: new Date(),
                    loginCount: 1
                },
                status: "active",
                verification: {
                    isVerified: true,
                    token: null,
                    tokenExpires: null
                },
                lastPasswordChange: new Date()
            },
            {
                username: "user_test",
                email: "user@example.com",
                password: "\$2y\$12$randomHashedPassword", // À générer avec bcrypt
                role: "user",
                profile: {
                    firstName: "User",
                    lastName: "Test",
                    avatar: "https://storage.example.com/avatars/default.jpg",
                    bio: "Utilisateur test de la plateforme",
                    organization: null,
                    website: null
                },
                preferences: {
                    language: "fr",
                    notifications: {
                        email: true,
                        push: true
                    },
                    privacy: {
                        showEmail: false,
                        showProfile: false
                    }
                },
                stats: {
                    pointsCreated: 0,
                    mediaUploaded: 0,
                    lastLogin: new Date(),
                    loginCount: 1
                },
                status: "active",
                verification: {
                    isVerified: false,
                    token: "verification_token_123",
                    tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
                },
                lastPasswordChange: new Date()
            }
        ];

        // Supprimer les utilisateurs existants
        await User.deleteMany({});
        console.log('Utilisateurs existants supprimés');

        // Créer les nouveaux utilisateurs
        const users = await User.create(usersData);
        console.log(`${users.length} utilisateurs créés :`);
        users.forEach(user => {
            console.log(`- ${user.username} (${user.role})`);
        });

        return users;
    } catch (error) {
        console.error('Erreur lors du seeding des utilisateurs:', error);
        throw error;
    }
};

module.exports = seedUsers;
