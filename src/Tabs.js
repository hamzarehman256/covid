import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Stats from "./Stats";
import { color } from "react-native-reanimated";
const Tab = createMaterialBottomTabNavigator();

var colors = ["#b39ddb", "#90caf9", "#ce93d8", "#ef9a9a"];
function getRandomColor() {
  let random =
    (getRandomColor.number = Math.floor(Math.random() * colors.length)) ===
    getRandomColor.lastNumber
      ? getRandomColor()
      : (getRandomColor.lastNumber = getRandomColor.number);
  return random;
}

function RegionalStats() {
  let currColor = colors[getRandomColor()];

  return (
    <Tab.Navigator initialRouteName="Asia">
      <Tab.Screen name="Asia" component={Stats} />
      <Tab.Screen name="Europe" component={Stats} />
      <Tab.Screen name="Stats2" component={Stats} />
      <Tab.Screen name="Stats3" component={Stats} />
      <Tab.Screen name="Stats4" component={Stats} />
      <Tab.Screen name="Stats5" component={Stats} />
    </Tab.Navigator>
  );
}

export default RegionalStats;
