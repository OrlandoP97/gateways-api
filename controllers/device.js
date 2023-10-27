import Gateway from '../models/gateway.js';
import PeripheralDevice from '../models/peripheralDevice.js';

export const addDeviceToGateway = async (req, res) => {
  const devicesAmount = Array.isArray(req.body) ? req.body.length : 1;

  const gateway = await Gateway.findOne({
    serialNumber: req.params.serialNumber
  });
  if (!gateway) {
    return res.status(404).send('Gateway not found 😢');
  }
  if (gateway.devices.length + devicesAmount >= 10) {
    return res.status(422).send('Maximum number of devices reached');
  }
  const device = new PeripheralDevice(req.body);
  if (Array.isArray(req.body)) {
    req.body.map((deviceElement) => gateway.devices.push(deviceElement));
  } else {
    gateway.devices.push(device);
  }
  await gateway.save();
  res.send(gateway.devices);
};

export const removeDeviceFromGateway = async (req, res) => {
  Gateway.findOne({ serialNumber: req.params.serialNumber })
    .then((gateway) => {
      if (gateway) {
        const device = gateway.devices.find(
          (device) => device.uid == req.params.uid
        );

        if (device) {
          return Gateway.findOneAndUpdate(
            { serialNumber: req.params.serialNumber },
            { $pull: { devices: { uid: req.params.uid } } },
            { new: true }
          );
        } else {
          res.status(404).send('Device not found 😢');
        }
      } else {
        res.status(404).send('Gateway not found 😢');
      }
    })
    .then((updatedDevices) => {
      res.send(updatedDevices);
    })
    .catch((err) => console.error(err));
};
