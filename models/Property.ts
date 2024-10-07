import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    description: {
        type: String,
    },
    location: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zipcode: {
            type: String,
        },
    },
    beds: {
        type: Number,
        required: [true, 'Beds is required'],
    },
    baths: {
        type: Number,
        required: [true, 'Baths is required'],
    },
    square_feet: {
        type: Number,
        required: [true, 'Square Feet is required'],
    },
    amenities: [{
        type: String,
    }],
    rates: {
        weekly: {
            type: Number,
        },
        monthly: {
            type: Number,
        },
        nightly: {
            type: Number,
        },
    },
    seller_info: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    images: [{
        type: String,
    }],
    is_featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Property = models.Property || model('Property', PropertySchema);

export default Property;
