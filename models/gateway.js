import mongoose from 'mongoose';
import { PeripheralDeviceSchema } from './peripheralDevice.js';
const { Schema } = mongoose;

const gatewaySchema = new Schema({
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  ipv4: {
    type: String,
    match: [/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address']
  },
  devices: {
    type: [PeripheralDeviceSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  }
});

function arrayLimit(val) {
  return val.length <= 10;
}
const Gateway = mongoose.model('Gateway', gatewaySchema);
export default Gateway;
