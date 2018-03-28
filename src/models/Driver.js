import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  modal: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  photo: { type: String },
}, { _id : false });

const DriverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: {
      unique: true
    }
  },
  car: CarSchema,
  nickname: {
    type: String,
    required: true,
  },
  sex: {
    type: Number,
    enum: [ 1, 2 ],
    default: 1,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  wechat: {
    type: String,
    required: true,
  },
  registerType: {
    type: Number,
    default: 1,
    required: true,
  },
  region: {
    type: Number,
    default: 1,
    required: true,
  },
  availableTime: {
    type: Number,
    default: 1,
    required: true,
  },
  experience: String,
  status: {
    type: String,
    enum: ['OFFLINE', 'ONLINE', 'BLACKLIST'],
    default: 'ONLINE',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Driver', DriverSchema);
