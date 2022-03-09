const wifi = require('node-wifi');
// Include Nodejs' net module.
const Net = require('net');
// The port number and hostname of the server.
const port = 8080;
const host = 'localhost';

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

// Scan networks
// wifi.scan((error, networks) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(networks);
//     /*
//         networks = [
//             {
//               ssid: '...',
//               bssid: '...',
//               mac: '...', // equals to bssid (for retrocompatibility)
//               channel: <number>,
//               frequency: <number>, // in MHz
//               signal_level: <number>, // in dB
//               quality: <number>, // same as signal level but in %
//               security: 'WPA WPA2' // format depending on locale for open networks in Windows
//               security_flags: '...' // encryption protocols (format currently depending of the OS)
//               mode: '...' // network mode like Infra (format currently depending of the OS)
//             },
//             ...
//         ];
//         */
//   }
// });

// Connect to a network
wifi.connect({ ssid: 'USR-W610_3BCC', password: '' }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected');


    // Create a new TCP client.
    const client = new Net.Socket();
    // Send a connection request to the server.
    client.connect(({ port: 8899, host: '10.10.100.254' }), function () {
      // If there is no error, the server has accepted the request and created a new 
      // socket dedicated to us.
      console.log('TCP connection established with the server.');

      // The client can now send data to the server by writing to its socket.
      client.write('P');
    });

    // The client can also receive data from the server by reading from its socket.
    client.on('data', function (chunk) {
      const data = chunk.toString('utf8');

      console.log(data);

      // Request an end to the connection after the data has been received.
      // client.end();
    });

    client.on('end', function () {
      console.log('Requested an end to the TCP connection');
    });
  }
});

// // Disconnect from a network
// // not available on all os for now
// wifi.disconnect(error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Disconnected');
//   }
// });

// // Delete a saved network
// // not available on all os for now
// wifi.deleteConnection({ ssid: 'ssid' }, error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Deleted');
//   }
// });

// // List the current wifi connections
// wifi.getCurrentConnections((error, currentConnections) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(currentConnections);
//     /*
//     // you may have several connections
//     [
//         {
//             iface: '...', // network interface used for the connection, not available on macOS
//             ssid: '...',
//             bssid: '...',
//             mac: '...', // equals to bssid (for retrocompatibility)
//             channel: <number>,
//             frequency: <number>, // in MHz
//             signal_level: <number>, // in dB
//             quality: <number>, // same as signal level but in %
//             security: '...' //
//             security_flags: '...' // encryption protocols (format currently depending of the OS)
//             mode: '...' // network mode like Infra (format currently depending of the OS)
//         }
//     ]
//     */
//   }
// });

// // All functions also return promise if there is no callback given
// wifi
//   .scan()
//   .then(networks => {
//     // networks
//   })
//   .catch(error => {
//     // error
//   });