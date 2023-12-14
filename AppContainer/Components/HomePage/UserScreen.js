import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { getAllUsers } from "../../API/getAllUser";

const App = ({ userId }) => {
  console.log(userId);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const users = await getAllUsers();
        console.log(users);
        setUsers(users);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const renderItem = ({ item }) => (
    <Text style={styles.item}>
      {item.userId}: {item.username} - {item.email}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.UserId ? item.UserId.toString() : Math.random().toString()
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default App;
