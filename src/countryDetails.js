import React, { Component } from "react";
import axios from "axios";

import { View, ActivityIndicator, Image } from "react-native";
import { Text } from "react-native-elements";
import Tab from "./Tabs";

class ByCountry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: this.props.route.params.country,
      flag: this.props.route.params.flag,
      error: null,
      loading: false,
      firstDate: null,
      firstDayCases: null,
      totalCases: null,
      activeCases: null,
      recovered: null,
      deaths: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url =
      "https://covid-19-data.p.rapidapi.com/country" +
      this.state.country +
      "/status/confirmed";
    this.setState({ loading: true });

    axios
      .get(url)
      .then((res) => {
        var st = res.data[0].Date;
        this.setState({
          firstDate: st.substring(0, 10),
          firstDayCases: res.data[0].Cases,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });

    axios
      .get("https://covid-19-data.p.rapidapi.com" + this.state.country)
      .then((res) => {
        this.setState({
          totalCases: res.data.cases,
          activeCases: res.data.active,
          deaths: res.data.deaths,
          recovered: res.data.recovered,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });

    if (this.state.firstDayCases == null) {
      this.setState({
        firstDayCases: "No Data Found",
        firstDate: "No Data Found",
      });
    }
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
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text h4>{this.state.country}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> First Case On </Text>
            {this.state.firstDate}
          </Text>
          {this.line}

          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> Cases on First Day </Text>
            {this.state.firstDayCases}
          </Text>

          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> Total Cases </Text>
            {this.state.totalCases}
          </Text>

          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> Active Cases </Text>
            {this.state.activeCases}
          </Text>

          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> Total Deaths </Text>
            {this.state.deaths}
          </Text>

          <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}> Recovered </Text>
            {this.state.recovered}
          </Text>
        </View>
      </>
    );
  }
}

export default ByCountry;
