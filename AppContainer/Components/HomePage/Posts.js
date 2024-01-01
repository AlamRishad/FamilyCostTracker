import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import TitleImage from "../../../assets/splash.png";
import { fetchPosts } from "../../API/post";
import { formatDistanceToNow } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");
const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({}); // Object to track liked posts by their ID

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await fetchPosts();
        // console.log("Fetched posts:", fetchedPosts);
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          console.log("No posts fetched, array is empty or not an array.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const renderItem = ({ item }) => {
    // console.log("Rendering item: ", item);
    const timeAgo = formatDistanceToNow(new Date(item.timestamp), {
      addSuffix: true,
    });
    const handleLikePress = () => {
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [item.postID]: !prevLikedPosts[item.postID],
      }));
    };

    const isLiked = likedPosts[item.postID] === true;

    return (
      <View style={styles.postItem}>
        <View style={styles.titlecontainermain}>
          <View style={styles.titlecontainer}>
            <Image
              source={TitleImage}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.postTitle}>{item.title}</Text>

              <Text style={styles.timeAgo}>{timeAgo}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "#000"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.postContent}>{item.content}</Text>

        {/* <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}> */}
        {/* <Text style={styles.likeButtonText}>Like</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savvy Secrets</Text>
      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={(item, index) =>
          item.PostID ? item.PostID.toString() : index.toString()
        }
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF3FB",
    padding: 20,
  },
  title: {
    // backgroundColor: "#76C7A6",
    backgroundColor: "#205578",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    padding: 3,
    color: "white",
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
    marginBottom: 10,
  },
  titlecontainermain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlecontainer: {
    flexDirection: "row",
  },
  imageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  postItem: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 15,
    //borderWidth: 5,
    borderColor: "#F6F6F6",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 0.5 },
    // shadowOpacity: 0.0005,
    // shadowRadius: 10,
    elevation: 1,
    marginBottom: 5,
    padding: 10,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    paddingTop: 2,
    marginBottom: 1,
  },
  postContent: {
    paddingLeft: 5,
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    textAlign: "justify",
  },
  loadingIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 1,
  },
  flatList: {},

  timeAgo: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  likeIcon: {
    paddingRight: 5,
  },
});

export default PostsScreen;
