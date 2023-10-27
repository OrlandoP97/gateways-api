import supertest from 'supertest';
import app from '../server';
import crypto from 'node:crypto';
import Gateway from '../models/gateway.js';
import mongoose from 'mongoose';

const MOCKDEVICE = {
  uid: 1,
  vendor: 'testVendor',
  status: 'online'
};

async function createGateway() {
  const mockSerial = 'mockSerial';
  const dataSended = {
    serialNumber: 'mockSerial',
    devices: [MOCKDEVICE]
  };
  /* Create gateway if doesn't exist */
  await supertest(app).post('/gateways').send(dataSended);

  /* Confirm that device is added so when remove device test is executed by a second time the device exists  */
  await supertest(app)
    .post(`/gateways/${mockSerial}/devices`)
    .send(dataSended.devices);

  return { mockSerial, dataSended };
}

describe('Testing gateway API', () => {
  afterAll(async () => {
    await Gateway.deleteMany({ serialNumber: /^mockSerial/ });
    await mongoose.connection.close();
  });

  /* GET ALL GATEWAYS */
  it('get all gateways', async () => {
    const response = await supertest(app).get('/gateways');
    expect(response.status).toBe(200);
  });

  /* GET GATEWAY BY SERIAL */
  it('get gateway by serialNumber when gateway exists', async () => {
    const { mockSerial } = await createGateway();

    const goodResponse = await supertest(app).get(`/gateways/${mockSerial}`);
    expect(goodResponse.status).toBe(200);
  });
  it("get gateway by serialNumber when gateway doesn't exist", async () => {
    const badResponse = await supertest(app).get(
      '/gateways/inexistentSerialNumber'
    );
    expect(badResponse.status).toBe(404);
    expect(badResponse.text).toBe('Gateway not found 😢');
  });

  /* POST GATEWAY */
  it('post a new gateway with empty body fails because serialNumber required', async () => {
    const response = await supertest(app).post('/gateways');
    expect(response.status).toBe(422);
  });
  it('post a new gateway with data and with different serialNumber', async () => {
    const uid = crypto.randomUUID();
    const dataSended = {
      serialNumber: 'mockSerial' + uid,
      devices: [MOCKDEVICE]
    };
    const response = await supertest(app).post('/gateways').send(dataSended);
    expect(response.status).toBe(201);
    expect(response.body.serialNumber).toEqual('mockSerial' + uid);
    expect(response.body.devices[0].uid).toEqual(MOCKDEVICE.uid);
  });

  /* POST DEVICE TO GATEWAY */
  it('post device to existent gateway when not exceed', async () => {
    const { mockSerial, dataSended } = await createGateway();
    const response = await supertest(app)
      .post(`/gateways/${mockSerial}/devices`)
      .send(dataSended);
    expect(response.status).toBe(200);
  });
  it('post device to existent gateway fails when number of devices exceed 10', async () => {
    const { mockSerial, dataSended } = await createGateway();
    const exceededDevices = [];
    for (let index = 0; index < 11; index++) {
      exceededDevices.push(dataSended.devices[0]);
    }

    const response = await supertest(app)
      .post(`/gateways/${mockSerial}/devices`)
      .send(exceededDevices);

    expect(response.status).toBe(422);
    expect(response.text).toBe('Maximum number of devices reached');
  });
  it('post device to nonexistent gateway fails', async () => {
    const randomUID = crypto.randomUUID();

    const badResponse = await supertest(app).post(
      `/gateways/${randomUID}/devices`
    );

    expect(badResponse.status).toBe(404);
    expect(badResponse.text).toBe('Gateway not found 😢');
  });

  /* REMOVE DEVICE FROM GATEWAY */
  it('remove existent device from existent gateway', async () => {
    const { mockSerial } = await createGateway();

    const response = await supertest(app).delete(
      `/gateways/${mockSerial}/devices/${MOCKDEVICE.uid}`
    );

    expect(response.status).toBe(200);
  });
  it('remove device from nonexistent gateway fails', async () => {
    const randomUID = crypto.randomUUID();

    const badResponse = await supertest(app).delete(
      `/gateways/${randomUID}/devices/${MOCKDEVICE.uid}`
    );

    expect(badResponse.status).toBe(404);
    expect(badResponse.text).toBe('Gateway not found 😢');
  });
  it('remove nonexistent device from existent gateway fails', async () => {
    const { mockSerial } = await createGateway();
    const randomDeviceUID = crypto.randomUUID();

    const badResponse = await supertest(app).delete(
      `/gateways/${mockSerial}/devices/${randomDeviceUID}`
    );

    expect(badResponse.status).toBe(404);
    expect(badResponse.text).toBe('Device not found 😢');
  });
});
