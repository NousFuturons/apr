// server/scripts/seeds/pointsSeed.js

const mongoose = require('mongoose');
const Point = require('../../models/Point');
const User = require('../../models/User');

const seedPoints = async () => {
    try {
        // Récupérer un utilisateur pour lier les points
        const user = await User.findOne({ role: 'admin' });
        if (!user) {
            console.warn('No admin user found, creating a default user...');
            // Créer un utilisateur par défaut si aucun n'existe
            const defaultUser = new User({
                username: 'admin',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            });
            await defaultUser.save();
        }

        const pointsData = [
            {
                title: "Maison Pélicot",
                description: "Le camp de base des Vagues, avec des permanences pour l\'Atlas Poétique de la Rance",
                location: {
                    type: "Point",
                    coordinates: [2.294481, 48.858370] // [longitude, latitude]
                },
                altitude: 324,
                address: {
                    street: "5 rue du Pélicot",
                    city: "Saint-Malo",
                    postalCode: "35400",
                    country: "France"
                },
                category: "historic",
                media: [], // Sera rempli après création des médias
                creator: user._id,
                status: "published",
                tags: ["monument", "paris", "tourisme"],
                metadata: {
                    visitCount: 12345,
                    lastVisited: new Date(),
                    rating: 4.5
                },
                accessibility: {
                    wheelchair: true,
                    parking: true,
                    publicTransport: true
                },
                openingHours: {
                    monday: "09:00 - 23:45",
                    tuesday: "09:00 - 23:45",
                    wednesday: "09:00 - 23:45",
                    thursday: "09:00 - 23:45",
                    friday: "09:00 - 23:45",
                    saturday: "09:00 - 23:45",
                    sunday: "09:00 - 23:45"
                },
                seasonality: {
                    start: new Date("2024-01-01"),
                    end: new Date("2024-12-31")
                }
            },
            {
                title: "Musée du Louvre",
                description: "Le plus grand musée d'art du monde",
                location: {
                    type: "Point",
                    coordinates: [2.337644, 48.860611]
                },
                altitude: 35,
                address: {
                    street: "Rue de Rivoli",
                    city: "Paris",
                    postalCode: "75001",
                    country: "France"
                },
                category: "cultural",
                media: [],
                creator: user._id,
                status: "published",
                tags: ["musée", "art", "peinture"],
                metadata: {
                    visitCount: 54321,
                    lastVisited: new Date(),
                    rating: 4.7
                },
                accessibility: {
                    wheelchair: true,
                    parking: false,
                    publicTransport: true
                }
            }
        ];

        // Création des points
        const points = await Point.create(pointsData);
        console.log(`${points.length} points créés.`);
        return points;
    } catch (error) {
        console.error("Erreur lors du seeding des points :", error);
        throw error;
    }
};

module.exports = seedPoints;
