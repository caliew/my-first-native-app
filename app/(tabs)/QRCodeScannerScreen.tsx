import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


//From Wk12 Con
export default function QRCodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Camera permission state
  const [scanned, setScanned] = useState(false); // Scan state
  const [scannedData, setScannedData] = useState(''); // Store scanned data

  // Request camera permission when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); // Request camera permission using BarCodeScanner API
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle what happens when a QR code is scanned
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data); // Store the scanned data

    // Assuming data is in the format "project_id:location_id"
    const [projectId, locationId] = data.split(':');
    
    if (projectId && locationId) {
      // Trigger content display at that location
      Alert.alert(
        'Location Triggered',
        `Project ID: ${projectId}\nLocation ID: ${locationId}`,
        [
          {
            text: 'OK',
            onPress: () => setScanned(false), // Reset scanner after showing alert
          },
        ]
      );
    } else {
      Alert.alert(
        'Invalid QR Code',
        'The QR Code does not contain the required project and location data.',
        [
          {
            text: 'OK',
            onPress: () => setScanned(false), // Reset scanner after showing alert
          },
        ]
      );
    }
  };

  // Show message when permission is still being checked
  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  // Show message if permission is denied
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No access to camera. Please enable it in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>

      {/* QR Code Scanner */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Disable scanner once QR code is scanned
        style={StyleSheet.absoluteFillObject} // Fullscreen camera view
      />

      {/* QR Code Scan Window - Simulating the scan frame */}
      <View style={styles.scanWindowContainer}>
        <View style={styles.scanWindow} />
      </View>

      {/* Show scanned data if available */}
      {scanned && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Data: {scannedData}</Text>
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

// Styles for the scanner, header, and scan window
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#E57373',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scanWindowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanWindow: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 10,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});





// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button, Alert } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function QRCodeScannerScreen() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Camera permission state
//   const [scanned, setScanned] = useState(false); // Scan state
//   const [scannedData, setScannedData] = useState(''); // Store scanned data
//   const [cameraRef, setCameraRef] = useState<Camera | null>(null);

//   // Request camera permission when component mounts
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync(); // Request camera permission using Camera API
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   // Handle what happens when the QR code is scanned
//   const handleBarCodeScanned = ({ data }: { data: string }) => {
//     setScanned(true);
//     setScannedData(data); // Store the scanned data

//     // Assuming data is in the format "project_id:location_id"
//     const [projectId, locationId] = data.split(':');
    
//     if (projectId && locationId) {
//       // Trigger content display at that location
//       Alert.alert(
//         'Location Triggered',
//         `Project ID: ${projectId}\nLocation ID: ${locationId}`,
//         [
//           {
//             text: 'OK',
//             onPress: () => setScanned(false), // Reset scanner after showing alert
//           },
//         ]
//       );
//     } else {
//       Alert.alert(
//         'Invalid QR Code',
//         'The QR Code does not contain the required project and location data.',
//         [
//           {
//             text: 'OK',
//             onPress: () => setScanned(false), // Reset scanner after showing alert
//           },
//         ]
//       );
//     }
//   };

//   // Show message when permission is still being checked
//   if (hasPermission === null) {
//     return (
//       <View style={styles.centered}>
//         <Text>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   // Show message if permission is denied
//   if (hasPermission === false) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>No access to camera. Please enable it in settings.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Scan QR Code</Text>
//       </View>

//       {/* QR Code Scanner */}
//       <Camera
//         style={StyleSheet.absoluteFillObject}
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Disable scanner once QR code is scanned
//         ref={ref => setCameraRef(ref)} // Get reference of camera
//         barCodeScannerSettings={{
//           barCodeTypes: [Camera.Constants.BarCodeType.qr], // Only scan QR codes
//         }}
//       />

//       {/* QR Code Scan Window - Simulating the scan frame */}
//       <View style={styles.scanWindowContainer}>
//         <View style={styles.scanWindow} />
//       </View>

//       {/* Show scanned data if available */}
//       {scanned && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultText}>Scanned Data: {scannedData}</Text>
//           <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
//         </View>
//       )}
//     </View>
//   );
// }

// // Styles for the scanner, header, and scan window
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     backgroundColor: '#E57373',
//     paddingVertical: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 22,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   scanWindowContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scanWindow: {
//     width: 250,
//     height: 250,
//     borderWidth: 2,
//     borderColor: '#FF0000',
//     borderRadius: 10,
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000',
//     padding: 20,
//     alignItems: 'center',
//   },
//   resultText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     marginBottom: 10,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 10,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
