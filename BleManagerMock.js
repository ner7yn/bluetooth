class BleManagerMock {
    constructor() {
      this.devices = [
        { id: '1', name: 'Device 1',connected:true,batteryLevel:30,mac:"D3:33:34:21:43:32" },
        { id: '2', name: 'Device 2',connected:false,batteryLevel:80,mac:"D3:33:34:21:43:32"},
        // Добавьте другие устройства по желанию
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
  }
  
  export default BleManagerMock;