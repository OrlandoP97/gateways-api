import mongoose from 'mongoose';
const { Schema } = mongoose;

export const PeripheralDeviceSchema = new Schema({
  uid: { type: Number },
  vendor: String,
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' }
});

const PeripheralDevice = mongoose.model(
  'PeripheralDevice',
  PeripheralDeviceSchema
);

export default PeripheralDevice;
