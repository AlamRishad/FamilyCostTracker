import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import NetInfo from "@react-native-community/netinfo";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getFamilyMembersByUserId } from "../../API/getAllUser";

const { width, height } = Dimensions.get("window");

function AddMember({ route }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const { userId } = route.params;

  const fetchFamilyMembers = useCallback(() => {
    let isActive = true;

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setIsLoading(true);
        getFamilyMembersByUserId(userId)
          .then((data) => {
            if (isActive) {
              setError(null);
              setFamilyMembers(data);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            if (isActive) {
              setError(`An error occurred: ${err.message || err.toString()}`);
              setIsLoading(false);
            }
          });
      } else {
        setError("No internet connection. Please connect and try again.");
      }
    });

    return () => {
      isActive = false;
    };
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchFamilyMembers();
      return () => {
        isActive = false;
      };
    }, [userId])
  );

  const handleAddMemberPress = () => {
    console.log(userId + " addmember section");
    navigation.navigate("AddMemberScreen", { userId: userId });
  };

  useEffect(() => {
    setIsLoading(true);
    getFamilyMembersByUserId(userId)
      .then((data) => {
        setFamilyMembers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setIsLoading(false);
      });
  }, [userId]);

  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const renderMemberItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memberItem}
      onPress={() =>
        navigation.navigate("MemberDetailsScreen", {
          familyMemberID: item.familyMemberID,
          userId: userId,
        })
      }
    >
      <Icon2 name="human-male" size={20} color="#fff" />

      <Text style={styles.memberRelationText}>{item.relationship}</Text>
      <Text style={styles.memberText}>{truncate(item.name, 20)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading family members...</Text>}

      {error ? (
        // Display the error message if there is an error
        <Text style={styles.error}>{error}</Text>
      ) : (
        // Render the FlatList if there is no error
        <FlatList
          data={[{ key: "addMemberButton" }, ...familyMembers]}
          renderItem={({ item }) => {
            if (item.key === "addMemberButton") {
              return (
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.addMemberButton]}
                  onPress={handleAddMemberPress}
                >
                  <Icon name="plus" size={20} color="#fff" />
                  <Text style={styles.textStyle}>Add Member</Text>
                </TouchableOpacity>
              );
            } else {
              return renderMemberItem({ item });
            }
          }}
          keyExtractor={(item, index) => item.key || index.toString()}
          numColumns={Math.floor(width / (width * 0.2 + 6))}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // maxHeight: height * 0.3,
    marginTop: "2%",
    paddingTop: "3%",
    paddingLeft: "3.5%",
    paddingBottom: "3%",
    borderRadius: 5,
    flexWrap: "wrap",
    justifyContent: "flex-start",

    alignItems: "center",
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: "white",
  },
  row: {
    // flex: 1,
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

  memberItem: {
    backgroundColor: "#205578",
    borderRadius: 10,
    padding: 10,
    margin: 3,
    width: width * 0.2,
    justifyContent: "center",
    alignItems: "center",

    maxHeight: height * 0.1,
  },
  memberText: {
    color: "#76C7A6",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    height: height * 0.03,
  },
  memberRelationText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 10,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  addMemberButton: {
    backgroundColor: "#76C7A6",
    borderRadius: 15,
    width: width * 0.2,
    minHeight: height * 0.1,
  },
  textStyle: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default AddMember;
