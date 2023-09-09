import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import BottomDesign from '../components/BottomDesign/BottomDesign';

const URL = 'https://fakestoreapi.com/products';
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      userName: this.props.route.params.userName,
      topList: [],
      bottomList: [],
    };
  }
  componentDidMount() {
    const {route} = this.props;
    const {userName, userDetails} = route.params;

    if (userDetails) {
      this.setState({userDetails});
    }
    if (userName) {
      this.setState({userName});
    }

    // Fetch data from api using fetch method
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({topList: data});
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });
    // Fetch data from api using axios method
    axios
      .get(URL)
      .then(response => {
        this.setState({bottomList: response.data});
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }
  // navigation

  goToProfile = () => {
    const {userName, userDetails} = this.props.route.params;
    // const {userDetails} = this.state;
    this.props.navigation.navigate('ProfileScreen', {
      userName,
      userDetails,
    });
  };

  renderTopList = ({item}) => (
    <View style={styles.topListItem}>
      <Image source={{uri: item.image}} style={styles.topImage} />
      <Text style={styles.topTitle}>{item.title}</Text>
      <Text style={styles.topPrice}>${item.price}</Text>
    </View>
  );
  renderBottomList = ({item}) => (
    <View style={styles.bottomListItem}>
      <Image source={{uri: item.image}} style={styles.bottomImage} />
      <Text style={styles.bottomTitle}>{item.title}</Text>
      <Text style={styles.bottomPrice}>${item.price}</Text>
    </View>
  );
  render() {
    const {route} = this.props;
    const {userName} = route.params;
    const {userDetails} = this.state;
    const {topList, bottomList} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>HELLO USER</Text>
          <View style={styles.profile}>
            <TouchableOpacity onPress={this.goToProfile}>
              <Image
                source={require('./../assets/images/user.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <Text style={styles.text}>{userName ? userName : 'hi'}</Text>
          </View>
        </View>
        <View style={styles.apiContainer}>
          <Text style={styles.sectionTitle}>Top List (Fetch method)</Text>
          <View style={styles.topList}>
            <FlatList
              data={topList}
              renderItem={this.renderTopList}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
            />
          </View>
          <Text style={styles.sectionTitle}>Bottom List (Axios method)</Text>
          <FlatList
            data={bottomList}
            renderItem={this.renderBottomList}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.bottom}>
          <BottomDesign />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    top: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  logo: {
    height: 25,
    width: 25,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: 100,
  },
  text: {
    fontSize: 20,
    color: 'black',
    left: 5,
  },
  title: {
    fontSize: 25,
    color: 'black',
  },
  apiContainer: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    left: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    marginTop: 20,
  },
  topListItem: {
    marginRight: 5,
    padding: 5,
    alignItems: 'center',
    width: 120,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
    height: 200,
  },
  topImage: {
    width: 100,
    height: 100,
  },
  topTitle: {
    fontSize: 12,
    marginTop: 5,
    color: '#000000',
  },
  topPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    left: 10,
    bottom: 3,
  },
  bottomListItem: {
    margin: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 10,
    position: 'relative',
    height: 150,
  },
  bottomImage: {
    width: 130,
    height: 130,
    left: 5,
    position: 'absolute',
    left: 15,
    bottom: 15,
  },
  bottomTitle: {
    fontSize: 16,
    color: '#000000',
    right: 15,
    left: 150,
    position: 'absolute',
  },
  bottomPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    right: 15,
    bottom: 15,
    position: 'absolute',
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
});

export default HomeScreen;
