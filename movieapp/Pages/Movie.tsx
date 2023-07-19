import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

interface IMovie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: String;
}

interface Props {
  contentType: "movie" | "series";
}

export const Movie = ({ contentType }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    });
    fetchMovies(page + 1);
  };

  const apiUrl =
    contentType === "movie"
      ? "http://www.omdbapi.com/?apikey=d2b2703d&type=movie&s="
      : "http://www.omdbapi.com/?apikey=d2b2703d&type=series&s=";

  const fetchMovies = (page = 1) => {
    axios
      .get(`${apiUrl}${searchQuery}&page=${page}`)
      .then((res) => {
        const data = res.data;
        if (data.Response === "True") {
          setMovie((prevMovies) => [...prevMovies, ...data.Search]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(page);
      setIsLoading(false);
    }
  }, [page]);

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 110,
          marginBottom: 2,
        }}
      >
        {contentType === "movie" ? "Search a movie..." : "Search a series..."}
      </Text>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          marginLeft: 90,
          marginBottom: 25,
        }}
      >
        <TextInput
          style={{ flex: 1, height: 50 }}
          placeholder={
            contentType === "movie"
              ? "Enter Movie Name.."
              : "Enter Series Name.."
          }
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Icon
          name="search"
          size={35}
          color="black"
          style={{ marginRight: 5 }}
          onPress={() => fetchMovies()}
        />
      </View>
      {error ? (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{error}</Text>
      ) : (
        <View>
          {movie && (
            <FlatList
              data={movie}
              renderItem={({ item: movie }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{ uri: movie.Poster }}
                    style={{
                      width: 300,
                      height: 150,
                    }}
                  ></ImageBackground>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Title:{movie.Title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {`Year Of Release: ${movie.Year}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      marginBottom: 15,
                    }}
                  >
                    Plot: {movie.Plot}
                  </Text>
                </View>
              )}
            />
          )}
          {/* pagination */}
          {movie?.length > 0 && !isLoading && (
            <TouchableOpacity onPress={handleLoadMore}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 130,
                }}
              >
                Load More
              </Text>
            </TouchableOpacity>
          )}
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};
