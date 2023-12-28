import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchDailyExpenses } from "../../API/DailyExpenseApi";
import { useFocusEffect } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const PeriodicityDetails = ({ route }) => {
  const { userId } = route.params;
  const [selectedPeriodicity, setSelectedPeriodicity] = useState("Daily");
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  // const [showDotsLabel, setShowDotsLabel] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        try {
          const fetchedData = await fetchDailyExpenses(userId);
          let processedData;
          if (selectedPeriodicity === "Monthly") {
            processedData = processMonthlyExpenses(fetchedData);
          } else if (selectedPeriodicity === "Weekly") {
            processedData = processWeeklyExpenses(fetchedData);
          } else {
            fetchedData.sort((a, b) => new Date(a.date) - new Date(b.date));
            const labels = fetchedData.map((item) =>
              new Date(item.date).getDate().toString()
            );
            const expenses = fetchedData.map((item) => item.dailyExpense);

            const expenseDifferences = expenses.map((current, index, array) => {
              if (index === 0) return current;
              return current - array[index - 1];
            });

            processedData = {
              labels,
              data: expenseDifferences,
              // dailyDifferences: ,
            };

            console.log(processedData);
          }
          setChartData(processedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchExpenses();
      return () => {};
    }, [userId, selectedPeriodicity])
  );
  const processMonthlyExpenses = (fetchedData) => {
    const monthlyExpenses = fetchedData.reduce((acc, curr) => {
      const monthYearKey = `${curr.month}-${curr.year}`;
      if (!acc[monthYearKey]) {
        acc[monthYearKey] = { ...curr, monthlyExpense: 0 };
      }
      acc[monthYearKey].monthlyExpense += curr.dailyExpense;
      return acc;
    }, {});

    const labels = Object.keys(monthlyExpenses).map((key) => key.split("-")[0]);
    const expenses = Object.values(monthlyExpenses).map(
      (item) => item.monthlyExpense
    );
    return { labels, data: expenses };
  };

  const processWeeklyExpenses = (fetchedData) => {
    const weeklyExpenses = fetchedData.reduce((acc, curr) => {
      const weekYearKey = `${curr.week}-${curr.year}`;
      if (!acc[weekYearKey]) {
        acc[weekYearKey] = { ...curr, weeklyExpense: 0 };
      }
      acc[weekYearKey].weeklyExpense += curr.dailyExpense;
      return acc;
    }, {});

    const labels = Object.keys(weeklyExpenses).map((key) => key.split("-")[0]);
    const expenses = Object.values(weeklyExpenses).map(
      (item) => item.weeklyExpense
    );
    return { labels, data: expenses };
  };

  // const handleDotClick = () => {
  //   setShowDotsLabel(!showDotsLabel);
  // };

  // const renderDotContent = ({ x, y, index }) => {
  //   const dotSize = 8;
  //   const touchableSize = 44;
  //   const offset = touchableSize / 2;
  //   const dotOffset = dotSize / 2;

  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       style={{
  //         top: -height * 0.02,
  //         left: width * 0.4,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         zIndex: 100,
  //         // borderWidth: 10, // Use borderWidth instead of border
  //         borderColor: "black",
  //       }}
  //       onPress={handleDotClick}
  //     >
  //       {showDotsLabel && (
  //         <Text
  //           style={{
  //             position: "absolute",
  //             left: x - width * 0.5,
  //             top: y - offset,
  //             width: touchableSize,
  //             height: touchableSize,
  //             justifyContent: "center",
  //             alignItems: "center",
  //             zIndex: 100,
  //             // For debugging:
  //             borderColor: "red",
  //             borderWidth: 1,
  //             color: "white",
  //             padding: 4,
  //             borderRadius: 4,
  //             backgroundColor: "rgba(0, 0, 0, 0.8)",
  //             fontSize: 10,
  //             textAlign: "center",
  //             zIndex: 200,
  //           }}
  //         >
  //           {chartData.data[index]} ৳
  //         </Text>
  //       )}
  //       <View
  //         style={[
  //           styles.dot,
  //           {
  //             // left: offset - dotOffset,
  //             // top: offset - dotOffset,
  //             backgroundColor: showDotsLabel ? "green" : "blue",
  //           },
  //         ]}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  const isActive = (periodicity) => selectedPeriodicity === periodicity;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.buttonContainer}>
        {["Daily", "Weekly", "Monthly"].map((periodicity) => (
          <TouchableOpacity
            key={periodicity}
            style={[
              styles.button,
              isActive(periodicity) ? styles.activeButton : {},
            ]}
            onPress={() => setSelectedPeriodicity(periodicity)}
          >
            <Text
              style={[
                styles.buttonText,
                isActive(periodicity) ? styles.activeButtonText : {},
              ]}
            >
              {periodicity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedPeriodicity && chartData.data.length > 0 && (
        <>
          <Text style={styles.monthYearText}>
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })}
          </Text>
          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{ data: chartData.data }],
              }}
              width={Dimensions.get("window").width * 0.8}
              height={200}
              yAxisLabel="৳"
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              // renderDotContent={renderDotContent}
              style={styles.chartStyle}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
    margin: "2%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  // dotLabel: {
  //   position: "absolute",
  //   backgroundColor: "rgba(0, 0, 0, 0.7)",
  //   padding: 5,
  //   borderRadius: 5,
  //   color: "white",
  // },
  // dotLabel: {
  //   // Adjust your style as needed
  //   color: "white",
  //   padding: 4,
  //   borderRadius: 4,
  //   backgroundColor: "rgba(0, 0, 0, 0.8)",
  //   fontSize: 10,
  //   textAlign: "center",
  //   zIndex: 200,
  // },
  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   borderWidth: 2,
  //   borderColor: "white",
  //   backgroundColor: "#ffa726",
  //   position: "absolute",
  // },

  buttonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginBottom: 20,
  },
  button: {
    textAlign: "center",
    width: "33%",
    backgroundColor: "#205578",
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  graphContainer: {
    // styles for your graph container
    width: "80%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "#F0F0F0",
    borderColor: "#F0F0F0",
  },
  activeButtonText: {
    color: "#205578",
  },

  // graphContainer: {
  //   width: "90%",
  //   height: 220,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 10,
  //   marginTop: 20,
  // },
});
const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default PeriodicityDetails;
