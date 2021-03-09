import React, { useState } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Animated,
  Text,
  Image
} from "react-native";
import {
  MapView,
  RegionProps,
  MapMarker,
  HereMapMarker
} from "@nriin/react-native-here";
import bus from "./assets/bus.png";

export default function App() {
  const [mode, setMode] = useState<String>("");
  const onBtnClick = (mode: String) => {
    setMode(mode);
  };
  const _onRegionChange = (region: RegionProps) => {
    console.log("region", region);
  };
  const [markers, setMarkers] = useState<HereMapMarker[]>([
    {
      id: "Marker1",
      latitude: -6.145489,
      longitude: 106.7969082,
      title: "Custom",
      subtitle: "Sub1",
      icon: Image.resolveAssetSource(bus),
      pulsator: {
        color: "#ff00ff",
        radius: 20,
        duration: 1500
      }
    }
  ]);
  return (
    <View style={styles.container}>
      {mode == "" && (
        <View style={{ marginTop: 50, height: "100%" }}>
          <ScrollView>
            <Button title="Simple" onPress={() => onBtnClick("Simple")} />
          </ScrollView>
        </View>
      )}
      {mode == "Simple" && (
        <MapView
          style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
          region={{
            target: {
              latitude: -6.1457023,
              longitude: 106.7980715
            },
            zoomLevel: 10
          }}
          onRegionChange={_onRegionChange}
        >
          {markers.map((marker, index) => {
            return (
              <MapMarker
                id={marker.id}
                latitude={marker.latitude}
                longitude={marker.longitude}
                icon={Image.resolveAssetSource(bus)}
              >
                <Animated.View style={[styles.columnContainer]}>
                  <Animated.View style={[styles.bubble]}>
                    <Text style={styles.amount}>{"Driver"}</Text>
                  </Animated.View>
                  <Animated.View style={[styles.arrowBorder]} />
                  <Animated.View style={[styles.arrow]} />
                </Animated.View>
              </MapMarker>
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  },
  tinyLogo: {
    width: 50,
    height: 50
  },
  columnContainer: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#FF5A5F",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
    borderColor: "#D23F44",
    borderWidth: 0.5
  },
  dollar: {
    color: "#fff",
    fontSize: 10
  },
  amount: {
    color: "#fff",
    fontSize: 13
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#FF5A5F",
    alignSelf: "center",
    marginTop: -9
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#D23F44",
    alignSelf: "center",
    marginTop: -0.5
  },
  selectedBubble: {
    backgroundColor: "#4da2ab",
    borderColor: "#007a87"
  },
  selectedArrow: {
    borderTopColor: "#4da2ab"
  },
  selectedArrowBorder: {
    borderTopColor: "#007a87"
  }
});
