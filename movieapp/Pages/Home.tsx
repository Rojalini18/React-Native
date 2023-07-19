import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Movie } from "./Movie";
import { Episode } from "./Episode";

export const Home = () => {
  const [contentType, setContentType] = useState("movie");

  return (
    <View
      style={{
        marginTop: 70,
        padding: 15,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginLeft: 105,
          marginBottom: 10,
        }}
      >
        Movies-App
      </Text>
      <Picker
        selectedValue={contentType}
        style={{
          width: "50%",
          marginLeft: 90,
          borderColor: "black",
          backgroundColor: "whitesmoke",
        }}
        onValueChange={(item) => setContentType(item)}
      >
        <Picker.Item label="Movie" value="movie" />
        <Picker.Item label="Series" value="series" />
        <Picker.Item label="Episode" value="episode" />
      </Picker>
      {contentType === "episode" ? (
        <Episode />
      ) : (
        <Movie contentType={contentType} />
      )}
    </View>
  );
};
