import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {
  fetchProductsUsingFetch,
  fetchProductsUsingAxios,
} from '../../../api/api';
import ProductDetailsModal from '../../../components/Modal/ProductDetails/ProductDetails';
import {
  renderTopList,
  renderBottomList,
} from '../../../components/Modal/ProductModal/ProductModal';
import {trackAddToCart} from '../../../firebase/analytics';
import {openAmazonWebsite} from '../../../utils/linking';
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
      cart: [],
      cartCount: 0,
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
    this.loadCartData();
  }
  showProductDetails = product => {
    this.setState({
      selectedProduct: product,
      isModalVisible: true,
    });
  };

  closeProductDetails = () => {
    this.setState({
      selectedProduct: null,
      isModalVisible: false,
    });
  };

  goToBills = () => {
    console.log('Cart in HomeScreen:', this.state.cart);
    this.props.navigation.navigate('Bills', {cart: this.state.cart});
  };

  onAddToCart = async product => {
    this.setState(prevState => ({
      cart: [...prevState.cart, product],
      cartCount: prevState.cartCount + 1,
    }));

    // Store the cart data in AsyncStorage
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartArray = JSON.parse(cart) || [];
      cartArray.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
      console.log('Product added to cart:', product);
    } catch (error) {
      console.error('Error storing product in cart:', error);
    }
  };
  // Load cart data from AsyncStorage
  loadCartData = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartArray = JSON.parse(cart) || [];
      this.setState({cart: cartArray, cartCount: cartArray.length});
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  showViewMoreNotificationHandler = () => {
    NotificationService.showViewMoreNotification();
  };

  render() {
    const {route} = this.props;
    const {userName} = route.params;
    const {userDetails} = this.state;
    const {topList, bottomList, cart} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.text}>{userName ? userName : 'hi'}</Text>
        </View>
        <View style={styles.apiContainer}>
          <View style={styles.listTitleContainer}>
            <Text style={styles.sectionTitle}>Top Products</Text>
            <TouchableOpacity onPress={this.goToBills}>
              <View style={styles.cartContainer}>
                <Icon
                  name="shopping-cart"
                  size={25}
                  color="#000"
                  style={styles.cartIcon}
                />
                {this.state.cartCount > 0 && (
                  <Text style={styles.cartCountText}>
                    {this.state.cartCount}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.topList}>
            <FlatList
              data={topList}
              renderItem={item =>
                renderTopList({
                  ...item,
                  showProductDetails: this.showProductDetails,
                  trackAddToCart: trackAddToCart,
                  onAddToCart: this.onAddToCart,
                })
              }
              keyExtractor={item => item.id.toString()}
              horizontal={true}
            />
          </View>
          <View style={styles.listTitleContainer}>
            <Text style={styles.sectionTitle}>Trending Offers</Text>
            <TouchableOpacity onPress={() => openAmazonWebsite()}>
              <Text style={styles.viewMoreButtonText}>View More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bottomList}
            renderItem={item =>
              renderBottomList({
                ...item,
                showProductDetails: this.showProductDetails,
                trackAddToCart: trackAddToCart,
              })
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <ProductDetailsModal
          isVisible={this.state.isModalVisible}
          product={this.state.selectedProduct}
          onClose={this.closeProductDetails}
          onAddToCart={this.onAddToCart}
        />
      </View>
    );
  }
}

export default HomeScreen;
