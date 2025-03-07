// server/models/Point.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    altitude: {
        type: Number,
        default: 0
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    category: {
        type: String,
        required: true,
        enum: ['historic', 'cultural', 'natural', 'other'] // Adaptez selon vos besoins
    },
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Media'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    tags: [{
        type: String,
        trim: true
    }],
    metadata: {
        visitCount: {
            type: Number,
            default: 0
        },
        lastVisited: Date,
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },
    accessibility: {
        wheelchair: {
            type: Boolean,
            default: false
        },
        parking: {
            type: Boolean,
            default: false
        },
        publicTransport: {
            type: Boolean,
            default: false
        }
    },
    openingHours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    seasonality: {
        start: Date,
        end: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Gère automatiquement createdAt et updatedAt
});

// Index géospatial pour les requêtes de proximité
PointSchema.index({ location: '2dsphere' });

// Index pour améliorer les performances des recherches
PointSchema.index({ title: 'text', description: 'text' });
PointSchema.index({ category: 1 });
PointSchema.index({ status: 1 });
PointSchema.index({ tags: 1 });

// Middleware pre-save pour mettre à jour updatedAt
PointSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Méthodes statiques
PointSchema.statics.findNearby = function(coords, maxDistance) {
    return this.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: coords
                },
                $maxDistance: maxDistance
            }
        }
    });
};

// Méthodes d'instance
PointSchema.methods.incrementVisitCount = function() {
    this.metadata.visitCount += 1;
    this.metadata.lastVisited = new Date();
    return this.save();
};

// Virtuals
PointSchema.virtual('fullAddress').get(function() {
    const address = this.address;
    return `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`;
});

// Configuration des options de toJSON
PointSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

// Export du modèle
const Point = mongoose.model('Point', PointSchema);
module.exports = Point;