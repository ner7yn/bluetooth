class BleManagerMock {
  constructor() {
    this.devices = [
      { id: '1', name: 'Device 1', connected: true, batteryLevel: 30, mac: "D3:33:34:21:43:32", level: 0 },
      { id: '2', name: 'Device 2', connected: false, batteryLevel: 80, mac: "D3:33:34:21:43:32", level: 3 },
      { id: '3', name: 'Device 3', connected: true, batteryLevel: 50, mac: "A1:B2:C3:D4:E5:F6", level: 2 },
      { id: '4', name: 'Device 4', connected: false, batteryLevel: 90, mac: "1A:2B:3C:4D:5E:6F", level: 5 },
      { id: '5', name: 'Device 5', connected: true, batteryLevel: 20, mac: "F1:E2:D3:C4:B5:A6", level: 1 },
      { id: '6', name: 'Device 6', connected: false, batteryLevel: 70, mac: "98:76:54:32:10:EF", level: 4 },
      { id: '7', name: 'Device 7', connected: true, batteryLevel: 60, mac: "11:22:33:44:55:66", level: 6 },
      { id: '8', name: 'Device 8', connected: false, batteryLevel: 40, mac: "AA:BB:CC:DD:EE:FF", level: 7 },
      { id: '9', name: 'Device 9', connected: true, batteryLevel: 10, mac: "01:23:45:67:89:AB", level: 8 },
      { id: '10', name: 'Device 10', connected: false, batteryLevel: 95, mac: "CD:EF:01:23:45:67", level: 9 },
      { id: '11', name: 'Device 11', connected: true, batteryLevel: 35, mac: "89:AB:CD:EF:01:23", level: 0 },
      { id: '12', name: 'Device 12', connected: false, batteryLevel: 75, mac: "45:67:89:AB:CD:EF", level: 2 },
      { id: '13', name: 'Device 13', connected: true, batteryLevel: 55, mac: "23:45:67:89:AB:CD", level: 4 },
    ];
  }

  state() {
    return Promise.resolve('PoweredOn');
  }

  onStateChange(callback) {
    callback('PoweredOn');
    return {
      remove: () => {},
    };
  }

  startDeviceScan(_, __, callback) {
    this.devices.forEach(device => callback(null, device));
    return {
      remove: () => {},
    };
  }

  stopDeviceScan() {}

  destroy() {}

  updateDevice(deviceId, newValues) {
    const deviceIndex = this.devices.findIndex(device => device.id === deviceId);
    if (deviceIndex !== -1) {
      this.devices[deviceIndex] = { ...this.devices[deviceIndex], ...newValues };
    }
  }

  getDeviceById(deviceId) {
    return this.devices.find(device => device.id === deviceId);
  }
}

export default BleManagerMock;