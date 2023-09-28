import React, {Component} from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {fetchProductsUsingFetch, fetchProductsUsingAxios} from '../../api/api';
import analytics from '@react-native-firebase/analytics';
import ProductDetailsModal from '../../components/Modal/ProductDetails';
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
    <TouchableOpacity onPress={() => this.showProductDetails(item)}>
      <View style={styles.bottomListItem}>
        <Image source={{uri: item.image}} style={styles.bottomImage} />
        <Text style={styles.bottomTitle}>{item.title}</Text>
        <Text style={styles.bottomPrice}>${item.price}</Text>
        <TouchableOpacity
          onPress={() => this.trackAddToCart(item)}
          style={styles.addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  render() {
    const {route} = this.props;
    const {userName} = route.params;
    const {userDetails} = this.state;
    const {topList, bottomList} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.text}>{userName ? userName : 'hi'}</Text>
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
        <ProductDetailsModal
          isVisible={this.state.isModalVisible}
          product={this.state.selectedProduct}
          onClose={this.closeProductDetails}
          onAddToCart={this.trackAddToCart}
        />
      </View>
    );
  }
}

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
