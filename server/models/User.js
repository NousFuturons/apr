// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Adresse email invalide']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'user'],
        default: 'user'
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: {
            type: String,
            maxlength: 500
        },
        organization: String,
        website: String
    },
    preferences: {
        language: {
            type: String,
            enum: ['fr', 'en'],
            default: 'fr'
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            }
        },
        privacy: {
            showEmail: {
                type: Boolean,
                default: false
            },
            showProfile: {
                type: Boolean,
                default: true
            }
        }
    },
    stats: {
        pointsCreated: {
            type: Number,
            default: 0
        },
        mediaUploaded: {
            type: Number,
            default: 0
        },
        lastLogin: Date,
        loginCount: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    verification: {
        isVerified: {
            type: Boolean,
            default: false
        },
        token: String,
        tokenExpires: Date
    },
    passwordReset: {
        token: String,
        tokenExpires: Date
    },
    lastPasswordChange: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ 'profile.firstName': 1, 'profile.lastName': 1 });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        
        if (this.isModified('password')) {
            this.lastPasswordChange = new Date();
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

// Methods
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.incrementLoginCount = function() {
    this.stats.loginCount += 1;
    this.stats.lastLogin = new Date();
    return this.save();
};

// Virtuals
UserSchema.virtual('fullName').get(function() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
});

UserSchema.virtual('points', {
    ref: 'Point',
    localField: '_id',
    foreignField: 'creator'
});

UserSchema.virtual('media', {
    ref: 'Media',
    localField: '_id',
    foreignField: 'uploader'
});

// Configure toJSON
UserSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.verification;
        delete ret.passwordReset;
        delete ret.__v;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;