import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  getAPIData = async () => {
    console.warn("Hello");
    const url = "https://192.168.2.216:7285/GetAllUser";
    var result = await fetch(url);
    result = await result.json();
    console.warn(result);
  };

  useEffect(() => {
    // getAPIData();
    // const fetchAllUsers = async () => {
    //   setIsLoading(true);
    //   try {
    //     // Replace 'YOUR_LOCAL_IP' with the actual IP address of your server.
    //     const response = await fetch("https://localhost:7285/GetAllUser");
    //     if (response.ok) {
    //       const users = await response.json();
    //       setUsers(users);
    //     } else {
    //       throw new Error("Failed to fetch users: " + response.status);
    //     }
    //   } catch (error) {
    //     setError(error.toString());
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetch("https://localhost:7285/GetAllUser").then((data) => {
    //   console.log(data);
    // });
    // fetchAllUsers();
  }, []);

  const renderItem = ({ item }) => (
    <Text style={styles.item}>
      {item.UserId}: {item.Username} - {item.Email}
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
          keyExtractor={(item) => item.UserId.toString()}
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
