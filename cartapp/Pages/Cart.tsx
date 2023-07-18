import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

const Cart = () => {
  const [counterOne, setCounterOne] = useState<any>(0);
  const [counterTwo, setCounterTwo] = useState<any>(0);
  const [counterThree, setCounterThree] = useState<any>(0);
  const [counterFour, setCounterFour] = useState<any>(0);
  const [viewItemOne, setViewItemOne] = useState<any>(true);
  const [viewItemTwo, setViewItemTwo] = useState<any>(true);
  const [viewItemThree, setViewItemThree] = useState<any>(true);
  const [viewItemFour, setViewItemFour] = useState<any>(true);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.shoppingCartContainer}>
          <Icon testID='shopping-cart' name="shopping-cart" size={40} />
          <Text style={styles.totalValue}>
            {counterOne + counterTwo + counterThree + counterFour}
          </Text>
          <Text style={styles.itemsContainer}>Items</Text>
        </View>
        <View style={styles.refreshRecycleContainer}>
          <TouchableOpacity
            style={styles.refreshIcon}
            onPress={() => {
              setCounterOne(0);
              setCounterTwo(0);
              setCounterThree(0);
              setCounterFour(0);
            }}>
            <Icon name="refresh" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recycleIcon}
            onPress={() => {
              setCounterOne(0);
              setCounterTwo(0);
              setCounterThree(0);
              setCounterFour(0);
              setViewItemOne(false);
              setViewItemTwo(false);
              setViewItemThree(false);
              setViewItemFour(false);
            }}>
            <Icon name="recycle" size={35} />
          </TouchableOpacity>
        </View>
        {viewItemOne && (
          <View style={styles.counterBox}>
            <Text
              style={[
                {backgroundColor: counterOne == 0 ? '#ffd507' : '#2563eb'},
                styles.totalVlue,
              ]}>
              {counterOne}
            </Text>
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={() => {
                setCounterOne(counterOne + 1);
              }}>
              <Icon name="plus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusIcon}
              onPress={() => {
                setCounterOne(counterOne - 1);
              }}>
              <Icon name="minus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => {
                setCounterOne(0);
                setViewItemOne(false);
              }}>
              <Icon name="trash" size={35} />
            </TouchableOpacity>
          </View>
        )}
        {viewItemTwo && (
          <View style={styles.counterBox}>
            <Text
              style={[
                {backgroundColor: counterTwo == 0 ? '#ffd507' : '#2563eb'},
                styles.totalVlue,
              ]}>
              {counterTwo}
            </Text>
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={() => {
                setCounterTwo(counterTwo + 1);
              }}>
              <Icon name="plus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusIcon}
              onPress={() => {
                setCounterTwo(counterTwo - 1);
              }}>
              <Icon name="minus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => {
                setCounterTwo(0);
                setViewItemTwo(false);
              }}>
              <Icon name="trash" size={35} />
            </TouchableOpacity>
          </View>
        )}
        {viewItemThree && (
          <View style={styles.counterBox}>
            <Text
              style={[
                {backgroundColor: counterThree == 0 ? '#ffd507' : '#2563eb'},
                styles.totalVlue,
              ]}>
              {counterThree}
            </Text>
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={() => {
                setCounterThree(counterThree + 1);
              }}>
              <Icon name="plus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusIcon}
              onPress={() => {
                setCounterThree(counterThree - 1);
              }}>
              <Icon name="minus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => {
                setCounterThree(0);
                setViewItemThree(false);
              }}>
              <Icon name="trash" size={35} />
            </TouchableOpacity>
          </View>
        )}
        {viewItemFour && (
          <View style={styles.counterBox}>
            <Text
              style={[
                {backgroundColor: counterFour == 0 ? '#ffd507' : '#2563eb'},
                styles.totalVlue,
              ]}>
              {counterFour}
            </Text>
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={() => {
                setCounterFour(counterFour + 1);
              }}>
              <Icon name="plus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusIcon}
              onPress={() => {
                setCounterFour(counterFour - 1);
              }}>
              <Icon name="minus-circle" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => {
                setCounterFour(0);
                setViewItemFour(false);
              }}>
              <Icon name="trash" size={35} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 800,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
  },
  shoppingCartContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginRight: -35,
    paddingTop: 70,
    gap: 10,
  },
  totalValue: {
    backgroundColor: '#199f9d',
    color: 'white',
    fontSize: 30,
    width: 100,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
  },
  itemsContainer: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: -10,
  },
  refreshRecycleContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  refreshIcon: {
    width: 60,
    height: 50,
    backgroundColor: '#3cb371',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    paddingLeft: 13,
  },
  recycleIcon: {
    width: 60,
    height: 50,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    paddingLeft: 13,
  },
  counterBox: {
    flexDirection: 'row',
    padding: 18,
    gap: 5,
  },
  totalVlue: {
    width: 100,
    height: 50,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    borderRadius: 10,
    paddingTop: 2,
    paddingLeft: 42,
  },
  plusIcon: {
    width: 60,
    height: 50,
    backgroundColor: 'grey',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
  },
  minusIcon: {
    width: 60,
    height: 50,
    backgroundColor: '#9ad6e7',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
  },
  trashIcon: {
    width: 60,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
  },
});
