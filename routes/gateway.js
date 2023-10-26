import { Router } from 'express';
import {
  getAll,
  getSingleGateway,
  createGateway
} from '../controllers/gateway.js';

import {
  addDeviceToGateway,
  removeDeviceFromGateway
} from '../controllers/device.js';

const gatewayRouter = Router();

gatewayRouter.get('/', getAll);
gatewayRouter.post('/', createGateway);
gatewayRouter.get('/:serialNumber', getSingleGateway);
gatewayRouter.post('/:serialNumber/devices', addDeviceToGateway);
gatewayRouter.delete('/:serialNumber/devices/:uid', removeDeviceFromGateway);

export default gatewayRouter;
