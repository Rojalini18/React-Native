import { Text, View, TextInput, ImageBackground } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

interface IEpisode {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
}

export const Episode = () => {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchSeason, setSearchSeason] = useState<string>("");
  const [searchEpisode, setSearchEpisode] = useState<string>("");
  const [episodeData, setEpisodeData] = useState<IEpisode>();
  const [error, setError] = useState<string>("");

  const fetchEpisodeData = () => {
    const apiUrl = `http://www.omdbapi.com/?apikey=d2b2703d&type=episode&t=${searchTitle}&season=${searchSeason}&episode=${searchEpisode}`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.Response === "True") {
          setEpisodeData(res.data);
          setError("");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 90,
          marginBottom: 2,
        }}
      >
        Search an Episode...
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          gap: 5,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            padding: 5,
            borderWidth: 1,
            borderRadius: 2,
          }}
          placeholder="Title"
          value={searchTitle}
          onChangeText={(text) => setSearchTitle(text)}
        />
        <TextInput
          style={{
            flex: 1,
            padding: 5,
            borderWidth: 1,
            borderRadius: 2,
          }}
          keyboardType="numeric"
          placeholder="Season"
          value={searchSeason}
          onChangeText={(text) => setSearchSeason(text)}
        />
        <TextInput
          style={{
            flex: 1,
            padding: 5,
            borderWidth: 1,
            borderRadius: 2,
          }}
          keyboardType="numeric"
          placeholder="Episode"
          value={searchEpisode}
          onChangeText={(text) => setSearchEpisode(text)}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "black",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 25,
        }}
      >
        <Icon
          name="search"
          size={50}
          color="white"
          style={{ padding: 2 }}
          onPress={() => fetchEpisodeData()}
        />
      </View>
      {error ? (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{error}</Text>
      ) : (
        <View>
          {episodeData && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ImageBackground
                source={{ uri: episodeData.Poster }}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: 5,
                }}
              ></ImageBackground>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Title: {episodeData?.Title}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {`Year Of Release: ${episodeData.Year}`}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Plot: {episodeData.Plot}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
