import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {fetchProductsUsingFetch, fetchProductsUsingAxios} from '../api/api';
import analytics from '@react-native-firebase/analytics';
import ProductDetailsModal from '../components/Modal/ProductDetails';
import NotificationServices from '../utils/NotificationServices';
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      userName: this.props.route.params.userName,
      topList: [],
      bottomList: [],
      selectedProduct: null,
      isModalVisible: false,
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
    // Fetch data from the API using the functions from api.js
    fetchProductsUsingFetch()
      .then(data => {
        this.setState({topList: data});
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });

    fetchProductsUsingAxios()
      .then(data => {
        this.setState({bottomList: data});
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }

  goToProfile = () => {
    const {userName, userDetails} = this.props.route.params;
    // const {userDetails} = this.state;
    this.props.navigation.navigate('ProfileScreen', {
      userName,
      userDetails,
    });
  };

  // Function to show the product details modal
  showProductDetails = product => {
    this.setState({
      selectedProduct: product,
      isModalVisible: true,
    });
  };

  // Function to close the product details modal
  closeProductDetails = () => {
    this.setState({
      selectedProduct: null,
      isModalVisible: false,
    });
  };
  trackAddToCart = item => {
    analytics()
      .logEvent('add_to_cart', {
        item_id: item.id,
        item_name: item.title,
        price: item.price,
      })
      .then(() => console.log('Add to Cart event tracked'))
      .catch(error => console.error('Error tracking Add to Cart event', error));
  };
  openAmazonWebsite() {
    const amazonUrl = 'https://www.amazon.com'; // Replace with the Amazon URL you want to open
    Linking.openURL(amazonUrl)
      .then(() => {
        console.log(`Opened Amazon website: ${amazonUrl}`);
      })
      .catch(error => {
        console.error(`Error opening Amazon website: ${amazonUrl}`, error);
      });
  }

  // Function to show the notification using the NotificationService class
  showViewMoreNotificationHandler = () => {
    NotificationService.showViewMoreNotification();
  };
  renderTopList = ({item}) => (
    <TouchableOpacity onPress={() => this.showProductDetails(item)}>
      <View style={styles.topListItem}>
        <Image source={{uri: item.image}} style={styles.topImage} />
        <Text style={styles.topTitle}>{item.title}</Text>
        <Text style={styles.topPrice}>${item.price}</Text>
        <TouchableOpacity
          onPress={() => this.trackAddToCart(item)} // Add an item to cart on press
          style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
          <View style={styles.bottomListTitleContainer}>
            <Text style={styles.sectionTitle}>Bottom List (Axios method)</Text>
            <TouchableOpacity onPress={() => this.openAmazonWebsite()}>
              <Text style={styles.viewMoreButtonText}>View More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bottomList}
            renderItem={this.renderBottomList}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        {/* Render the product details modal */}
        <ProductDetailsModal
          isVisible={this.state.isModalVisible}
          product={this.state.selectedProduct}
          onClose={this.closeProductModal}
          onAddToCart={this.trackAddToCart}
        />
        {/* <TouchableOpacity onPress={this.showViewMoreNotificationHandler}>
          <Text>Show Notification</Text>
        </TouchableOpacity> */}
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
    top: 4,
    height: 21,
    width: 21,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: 100,
  },
  text: {
    fontSize: 20,
    color: 'black',
    left: 5,
  },
  title: {
    fontSize: 25,
    color: '#000000',
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
    height: 250,
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
    bottom: 30,
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
  addToCartButton: {
    // marginTop: 8,
    backgroundColor: '#1E90FF',
    padding: 2,
    borderRadius: 5,
    height: 20,
    width: 55,
    bottom: 5,
    left: 10,
    position: 'absolute',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  bottomListTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewMoreButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    right: 10,
    // position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default HomeScreen;

// // Fetch data from api using fetch method
// fetch(URL)
//   .then(response => response.json())
//   .then(data => {
//     this.setState({topList: data});
//   })
//   .catch(error => {
//     console.error('Error fetching products', error);
//   });
// // Fetch data from api using axios method
// axios
//   .get(URL)
//   .then(response => {
//     this.setState({bottomList: response.data});
//   })
//   .catch(error => {
//     console.error('Error fetching data', error);
//   });

// navigation
