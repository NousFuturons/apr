// server/models/Media.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    filename: {
        type: String,
        required: true,
        unique: true
    },
    originalFilename: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video', 'audio', 'document'],
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        url: String,
        width: Number,
        height: Number
    },
    metadata: {
        size: Number, // in bytes
        width: Number,
        height: Number,
        duration: Number, // for video/audio
        format: String,
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: [Number] // [longitude, latitude]
        }
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    usage: {
        points: [{
            type: Schema.Types.ObjectId,
            ref: 'Point'
        }],
        viewCount: {
            type: Number,
            default: 0
        },
        downloadCount: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ['processing', 'active', 'archived', 'failed'],
        default: 'processing'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'restricted'],
        default: 'public'
    },
    license: {
        type: String,
        enum: ['CC0', 'CC-BY', 'CC-BY-SA', 'CC-BY-NC', 'CC-BY-NC-SA', 'all-rights-reserved'],
        default: 'CC-BY-SA'
    },
    tags: [{
        type: String,
        trim: true
    }],
    technicalInfo: {
        encoding: String,
        bitrate: Number,
        fps: Number, // for video
        sampleRate: Number, // for audio
        channels: Number // for audio
    },
    processingHistory: [{
        action: String,
        timestamp: Date,
        status: String,
        error: String
    }],
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
MediaSchema.index({ filename: 1 });
MediaSchema.index({ type: 1 });
MediaSchema.index({ uploader: 1 });
MediaSchema.index({ tags: 1 });
MediaSchema.index({ 'metadata.location': '2dsphere' });
MediaSchema.index({ title: 'text', description: 'text' });

// Methods
MediaSchema.methods.incrementViewCount = function() {
    this.usage.viewCount += 1;
    return this.save();
};

MediaSchema.methods.incrementDownloadCount = function() {
    this.usage.downloadCount += 1;
    return this.save();
};

MediaSchema.methods.addProcessingEvent = function(action, status, error = null) {
    this.processingHistory.push({
        action,
        timestamp: new Date(),
        status,
        error
    });
    return this.save();
};

// Virtuals
MediaSchema.virtual('isImage').get(function() {
    return this.type === 'image';
});

MediaSchema.virtual('isVideo').get(function() {
    return this.type === 'video';
});

MediaSchema.virtual('isAudio').get(function() {
    return this.type === 'audio';
});

// Configure toJSON
MediaSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

// Middleware
MediaSchema.pre('save', function(next) {
    if (this.isNew) {
        this.status = 'processing';
    }
    next();
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;