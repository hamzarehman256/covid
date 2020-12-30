import React from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import axios from "axios";

class countriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      selectedItem: null,
      flag: null,
    };

    this.response = [];
  }

  componentDidMount() {
    this.API();
  }

  API = () => {
    const url = `https:covid-19-data.p.rapidapi.com/`;
    this.setState({ loading: true });
    axios
      .get(url)
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false,
        });
        this.response = res.data;
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  nextS(selectedCountry, selectedFlag) {
    this.props.navigation.navigate("ByCountry", {
      country: selectedCountry,
      flag: selectedFlag,
    });
  }

  search = (text) => {
    this.setState({
      value: text,
    });
    const newData = this.response.filter((item) => {
      const itemData = `${item.country.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  searchBox = () => {
    return (
      <SearchBar
        placeholder="Search in Here"
        onChangeText={(text) => this.search(text)}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 30, color: "#888" }}>
            Loading... Please wait
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) => (
            <ListItem
              key={item.id}
              title={`${item.country}`}
              onPress={() => {
                this.nextS(item.country);
              }}
            />
          )}
          ListHeaderComponent={this.searchBox}
        />
      </View>
    );
  }
}

export default countriesList;
