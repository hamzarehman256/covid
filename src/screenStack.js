import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./countriesList";
import ByCountry from "./countryDetails";
import Wordwide from "./Worldwide";
import Stats from "./Stats";

const Stack = createStackNavigator();
class screenStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Covid 19 Statistics" }}
        />
        <Stack.Screen
          name="ByCountry"
          component={ByCountry}
          options={{ title: "By Country" }}
        />
        <Stack.Screen
          name="Worldwide"
          component={Wordwide}
          options={{ title: "Worldwide" }}
        />
        <Stack.Screen
          name="RegStats"
          component={Stats}
          options={{ title: "Regional Stats" }}
        /> 
      </Stack.Navigator>
    );
  }
}

export default screenStack;
