import React, {Component} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {fetchNews} from '../../redux/action/action';
import {styles} from './styles';

class NewsList extends Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const {news, loading, error} = this.props;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    const data = news.news.results;

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => (
          <View style={styles.articleContainer}>
            <Image source={{uri: item.image}} style={styles.articleImage} />
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
  loading: state.loading,
  error: state.error,
});

export default connect(mapStateToProps, {fetchNews})(NewsList);
