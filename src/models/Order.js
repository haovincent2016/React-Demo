import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  text: String,
  coordinates: [],
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    index: true,
  },
  passenger: {
    type: Number,
  },
  mobile: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  startLocation: {
    type: LocationSchema,
    required: true,
    index: '2dsphere',
  },
  endLocation: {
    type: LocationSchema,
    required: true,
    index: '2dsphere',
  },
  totalCost: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'INPROGRESS', 'COMPLETED', 'CANCELED'],
    default: 'PENDING',
    required: true,
  },
}, { timestamps: true });

OrderSchema.pre('save', function preSave(next) {
  if (!this.startTime || this.startTime < Date.now()) {
    this.startTime = this.createdAt;
  }
  next();
});

export default mongoose.model('Order', OrderSchema);
