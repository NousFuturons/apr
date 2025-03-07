// server/scripts/seeds/pointsSeed.js

const mongoose = require('mongoose');
const Point = require('../../models/Point'); // Assurez-vous que le modèle existe

const pointsData = [
  {
    title: "Maison Pélicot",
    description: "Le camp de base des Vagues. Permanences Atlas Poétique de la Rance tous les mercredis après-midi de 14 à 18 heures.",
    location: {
      type: "Point",
      coordinates: [-2.02514, 48.65087] // [longitude, latitude]
    },
    mediaIds: [], // Sera rempli après création des médias
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Ajoutez d'autres points...
];

const seedPoints = async () => {
  try {
    const points = await Point.create(pointsData);
    console.log(`${points.length} points created`);
    return points;
  } catch (error) {
    console.error('Error seeding points:', error);
    throw error;
  }
};

module.exports = seedPoints;
