import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Worldwide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      newConfirmed: null,
      newDeaths: null,
      activeCases: null,
      totalConfirmed: null,
      totalDeaths: null,
      totalRecovered: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://world-population.p.rapidapi.com`;
    this.setState({ loading: true });

    axios
      .get(url)
      .then((res) => {
        this.setState({
          newConfirmed: res.data.todayCases,
          newDeaths: res.data.todayDeaths,
          activeCases: res.data.active,
          totalConfirmed: res.data.cases,
          totalDeaths: res.data.deaths,
          totalRecovered: res.data.recovered,
          error: res.error || null,
          loading: false,
        });
        console.log();
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <>
        <View style={{ marginTop: 5, width: 100 }}>
          <Icon
            name="arrow-left"
            size={25}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={{
              uri:
                "https://www.globe.gov/globe-gov-home-portlet/images/learn-earth-system/learn-earth-system-clean.png",
            }}
            style={{ width: 100, height: 100, marginLeft: 10, marginTop: 10 }}
          ></Image>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text h4>Global Summary </Text>
        </View>

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Cases Today </Text>
            {this.state.newConfirmed}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />

          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Deaths Today </Text>
            {this.state.newDeaths}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />

          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Active Cases </Text>
            {this.state.activeCases}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />

          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Cases </Text>
            {this.state.totalConfirmed}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />

          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Deaths </Text>
            {this.state.totalDeaths}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />

          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Recovered </Text>
            {this.state.totalRecovered}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#CED0CE",
              marginBottom: 2,
            }}
          />
        </View>
      </>
    );
  }
}

export default Worldwide;
