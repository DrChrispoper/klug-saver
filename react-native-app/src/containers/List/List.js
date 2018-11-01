import React from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { PAGES } from '../../constants';

export default class List extends React.Component {
  static navigationOptions = {
    title: PAGES.LIST
  };

  render() {
    const { expenses } = this.props;
    return (
      <View style={styles.root}>
        <Button
          buttonStyle={styles.refreshButton}
          title="Refresh"
          icon={{ name: 'refresh' }}
          onPress={this.onRefresh}
        />
        {expenses && expenses.length && expenses.map && <FlatList
          styles={styles.container}
          data={expenses.map((e, i) => ({ ...e, key: i + '' }))}
          renderItem={this.renderItem}
        />}
      </View>
    );
  }

  renderItem = ({ item }) => {
    const {id} = item;
    const swipeOutButtons = [
      {
        text: 'Delete',
        backgroundColor: '#E90F09',
        color: '#FFFFFF',
        onPress: this.onDelete(id)
      }
    ];

    return (
      <Swipeout
        right={swipeOutButtons}
        backgroundColor="#F1F5F5"
        autoClose={true}
      >
        <View style={styles.item}>
          <Text style={styles.amount}>{`${item.amount}`}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>{this.formatDate(item.createdAt)}</Text>
        </View>
      </Swipeout>
    );
  };

  formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);

    return `${d.getDate()}-${d.getMonth()}`;
  };

  onRefresh = () => {
    this.props.getExpenses();
  }

  onDelete = (id) => () => {
    this.props.removeExpense(id);
  }
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#D1EAEB',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#003249'
  },
  amount: {
    fontWeight: 'bold',
    width: 90,
    color: '#003249'
  },
  description: {
    flexGrow: 1,
    color: '#003249'
  },
  date: {
    width: 50,
    color: '#003249'
  },
  refreshButton: {
    backgroundColor: '#003249'
  }
});
