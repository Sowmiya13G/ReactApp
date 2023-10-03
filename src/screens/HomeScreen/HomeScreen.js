import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {fetchProductsUsingFetch, fetchProductsUsingAxios} from '../../api/api';
import ProductDetailsModal from '../../components/Modal/ProductDetails/ProductDetails';
import {
  renderTopList,
  renderBottomList,
} from '../../components/Modal/ProductModal/ProductModal';
import {trackAddToCart} from '../../firebase/analytics';
import {openAmazonWebsite} from '../../utils/linking';
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
  onAddToCart = product => {
    console.log('Product added to cart:', product);
  };
  // Function to show the notification using the NotificationService class
  showViewMoreNotificationHandler = () => {
    NotificationService.showViewMoreNotification();
  };

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
              renderItem={item =>
                renderTopList({
                  ...item,
                  showProductDetails: this.showProductDetails,
                  trackAddToCart: trackAddToCart,
                })
              }
              keyExtractor={item => item.id.toString()}
              horizontal={true}
            />
          </View>
          <View style={styles.bottomListTitleContainer}>
            <Text style={styles.sectionTitle}>Bottom List (Axios method)</Text>
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
