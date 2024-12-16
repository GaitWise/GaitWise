import React, { useEffect, useState } from "react";
import { icons } from "../../constants";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { gait_report } from "../../services/report/gait_report";

export default function App() {
    const router = useRouter();
    const { walkingId, height, weight } = useLocalSearchParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchReport = async () => {
        try {
          if (walkingId && height && weight) {
            console.log("Fetching report with params:", { walkingId, height, weight });
            console.log("weight:", weight.values)
            const reportData = await gait_report(walkingId, height, weight);
            setReport(reportData);
            console.log("Report Data:", reportData);
          }
        } catch (error) {
          console.error("Error fetching gait report:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReport();
    }, [walkingId, height, weight]);
  

    const reportContent = `
    **Walking Report**
    - Steps: 4,670
    - Distance: 2.3 km
    - Calories burned: 230 kcal
    - Balance score: 0.98
    - Gait Status: Normal

    **Insights**
    The user's walking performance is healthy and consistent. No abnormalities detected. 
    Continue regular walking for sustained benefits. For improvement, consider increasing step count or distance.

    **Recommendations**
    - Maintain daily walking routines.
    - Incorporate incline walking or faster pace for better calorie burn.
    - Monitor progress weekly for balance and stability.
    `;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.headerTitle}>Your Walking Report</Text>

        {/* Grid Cards */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <icons.walking_arrow_back></icons.walking_arrow_back>
            <Text style={styles.cardTitle}>Gait Status</Text>
            <Text style={styles.cardValue}>4,670</Text>
          </View>
          <View style={styles.card}>
            <icons.walking_arrow_back></icons.walking_arrow_back>
            <Text style={styles.cardTitle}>Calories</Text>
            <Text style={styles.cardValue}>230 kcal</Text>
          </View>
          <View style={styles.card}>
            <icons.walking_arrow_back></icons.walking_arrow_back>
            <Text style={styles.cardTitle}>Distance</Text>
            <Text style={styles.cardValue}>2.3 km</Text>
          </View>
          <View style={styles.card}>
            <icons.walking_arrow_back></icons.walking_arrow_back>
            <Text style={styles.cardTitle}>Balance</Text>
            <Text style={styles.cardValue}>0.98</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Report Content */}
        <View style={styles.reportSection}>
          <Text style={styles.reportHeader}>Detailed Report</Text>
          <Text style={styles.reportContent}>{reportContent}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FB", 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
    fontFamily: "System",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    width: "48%",
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D1",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  reportSection: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  reportHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  reportContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 24,
  },
});
