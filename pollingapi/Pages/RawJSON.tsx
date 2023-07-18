import React from 'react';
import {View, Text, ScrollView} from 'react-native';

function RawJSON({route}: any) {
  const data = route.params;
  return (
    <View style={{borderWidth: 1, padding: 10}}>
      <ScrollView>
        <Text
          style={{
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          {JSON.stringify(data, null, 2)}
        </Text>
      </ScrollView>
    </View>
  );
}

export default RawJSON;
