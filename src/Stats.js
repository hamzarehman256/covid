import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    flex: 1,
    backgroundColor: "#90caf9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  values: {},
  valueColor: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
});

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      continent: "Asia",
      countries: null,
      data: null,
    };
    this.cont = this.state.continent;
  }

  componentDidMount() {
    this.getRegionCountries();
  }

  getRegionCountries = () => {
    const url = `https://world-population.p.rapidapi.com/` + this.state.continent;
    this.setState({ loading: true });

    this.array = [];
    axios
      .get(url)
      .then((res) => {
        this.setState({
          countries: res.data.countries,
          error: res.error || null,
        });
        if (res.data.countries != null) {
          const url1 =
            `https://world-population.p.rapidapi.com/{,` +
            res.data.countries +
            `}?yesterday=false`;

          axios.get(url1).then((res) => {
            this.setState({
              data: res.data,
              loading: false,
            });
          });
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    if (this.state.loading == true || this.state.data == null) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.continent == "Australia%2FOceania") {
      this.cont = "Australia/Oceania";
    }

    if (this.state.data != null) {
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text h4>{this.cont}</Text>
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.country}</Text>
                <View style={styles.values}>
                  <View
                    style={(styles.valueColor, { backgroundColor: "orange" })}
                  ></View>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Cases </Text>
                    {item.cases}{" "}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Active </Text>
                    {item.active}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Deaths </Text>
                    {item.deaths}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Recovered </Text>
                    {item.recovered}
                  </Text>

                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Cases Today </Text>
                    {item.todayCases}
                  </Text>

                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Deaths Today </Text>
                    {item.todayDeaths}
                  </Text>

                  <Text>
                    <Text style={{ fontWeight: "bold" }}> Tests </Text>
                    {item.tests}
                  </Text>
                </View>
              </View>
            )}
            // }
          />
        </>
      );
    }
  }
}

export default Stats;
