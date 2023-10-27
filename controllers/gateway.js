import Gateway from '../models/gateway.js';
export const createGateway = async (req, res) => {
  const gateway = new Gateway(req.body);
  try {
    await gateway.save();
    res.status(201).send(gateway);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

export const getAll = async (req, res) => {
  const gateways = await Gateway.find({
    serialNumber: req.params.serialNumber
  });
  res.send(gateways);
};

export const getSingleGateway = async (req, res) => {
  const gateway = await Gateway.findOne({
    serialNumber: req.params.serialNumber
  });
  if (!gateway) {
    res.status(404).send('Gateway not found 😢');
  } else {
    res.send(gateway);
  }
};
