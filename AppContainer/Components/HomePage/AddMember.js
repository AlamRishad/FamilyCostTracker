import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
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

  const fetchFamilyMembers = () => {
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
  };

  useFocusEffect(
    useCallback(() => {
      fetchFamilyMembers();
      // Optional cleanup if needed
      return () => {};
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
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

        {isLoading && <Text>Loading family members...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: height * 0.3,
  },
  container: {},
  row: {
    flex: 1,
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
