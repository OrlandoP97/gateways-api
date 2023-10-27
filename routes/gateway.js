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

/**
 * @swagger
 * /gateways:
 *   get:
 *     summary: Retrieve all registered gateways.
 *     description: Retrieve all registered gateways.
 *     responses:
 *       200:
 *         description: A list of gateways.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The gateway ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The gateway's name.
 *                         example: Gateway 1
 */
gatewayRouter.get('/', getAll);

/**
 * @swagger
 * /gateways:
 *   post:
 *     summary: Create a new gateway.
 *     description: Create a new gateway.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The gateway's name.
 *               serialNumber:
 *                 type: string
 *                 unique: true,
 *                 description: The gateway's serial number.
 *               ipV4:
 *                 type: string
 *                 description: The gateway's ip address
 *               devices:
 *                 type: Array
 *                 description: The gateway's linked devices
 *
 */
gatewayRouter.post('/', createGateway);

/**
 * @swagger
 * /gateways/{serialNumber}:
 *   get:
 *     summary: Retrieve a single gateway.
 *     description: Retrieve a single gateway by its serial number.
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         description: The gateway's serial number.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single gateway.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The gateway's ID.
 *                   example: 0
 *                 name:
 *                   type: string
 *                   description: The gateway's name.
 *                   example: Gateway 1
 *                 serialNumber:
 *                   type: string
 *                   description: The gateway's serial number.
 *                   example: SN123456
 */
gatewayRouter.get('/:serialNumber', getSingleGateway);

/**
 * @swagger
 * /gateways/{serialNumber}/devices:
 *   post:
 *     summary: Add devices to a gateway.
 *     description: Add devices to a gateway.
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         description: The gateway's serial number.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                   type: number
 *                   description: The device's unique identifier.
 *               vendor:
 *                   type: string
 *                   description: The device's vendor
 *               dateCreated:
 *                   type: date
 *                   description: The device's created date
 *               status:
 *                   type: string
 *                   description: The device's status (offline - online)
 *
 *     responses:
 *       200:
 *         description: A device was added to the gateway successfully.
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               uid:
 *                   type: number
 *                   description: The device's unique identifier.
 *                   example: 1234
 *               vendor:
 *                   type: string
 *                   description: The device's vendor
 *               dateCreated:
 *                   type: date
 *                   description: The device's created date
 *               status:
 *                   type: string
 *                   description: The device's status (offline - online)
 *
 */
gatewayRouter.post('/:serialNumber/devices', addDeviceToGateway);

/**
 * @swagger
 * /gateways/{serialNumber}/devices/{uid}:
 *   delete:
 *     summary: Remove a device from a gateway.
 *     description: Remove a device from a gateway by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         description: The gateway's serial number.
 *         schema:
 *           type: string
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The device'```
 *     responses:
 *       200:
 *         description: Returns the new gateway value after deletion
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The gateway's ID.
 *                   example: 0
 *                 name:
 *                   type: string
 *                   description: The gateway's name.
 *                   example: Gateway 1
 *                 serialNumber:
 *                   type: string
 *                   description: The gateway's serial number.
 *                   example: SN123456
 *                 devices:
 *                   type: array
 *                   description: The gateway's devices.
 *                   example: []
 */
gatewayRouter.delete('/:serialNumber/devices/:uid', removeDeviceFromGateway);

export default gatewayRouter;
