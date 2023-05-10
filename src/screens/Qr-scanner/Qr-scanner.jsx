import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function QrScanner({ route, navigation }) {
  const { eventId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let res = data?.split(" ");
    axios
      // .post(`http://10.10.5.151:5000/api/admin/scanqr`, {
      .post(`http://192.168.100.14:5000/api/admin/scanqr`, {
        email: res?.[0],
        eventId: res?.[1],
        id: eventId,
      })
      .then((d) => {
        alert("Qrcode Scanned Successfully");
      })
      .catch((err) => {
        if (err.message.includes(401)) {
          alert("QR Code is Already Scanned");
        }
        if (err.message.includes(404)) {
          alert("You are not invited to this event");
        }
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={20} />
        </TouchableOpacity>
        <Text style={styles.heading}>Scan Qr</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: "85%", width: "100%" }}
        />
        {/* {scanned && ( */}
        <View style={styles.btn}>
          <TouchableOpacity
            style={{
              backgroundColor: "#1eae63",
              opacity: scanned ? 1 : 0.4,
              width: "90%",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
            onPress={() => setScanned(false)}
            disabled={!scanned}
          >
            <Text style={styles.qrText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* )} */}
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    marginTop: 0,
    marginLeft: 20,
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 15,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  qrText: {
    fontSize: 16,
    color: "white",
    padding: 5,
  },
});
