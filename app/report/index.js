import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { gait_report } from "../../services/report/gait_report";

export default function App() {
    const router = useRouter();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const { walkingId, height, weight, weight_type } = useLocalSearchParams();
  
    useEffect(() => {
      const fetchReport = async () => {
        try {
          if (walkingId && height && weight && weight_type) {
            const reportData = await gait_report(walkingId, height, weight, weight_type);
            setReport(reportData); // API 결과를 상태에 저장
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
  
    // 로딩 중 UI
    if (loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4C2A86" />
          <Text style={styles.loadingText}>Loading Report...</Text>
        </SafeAreaView>
      );
    }

    // 데이터가 없을 때 UI
    if (!report) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No Report Available</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Header */}
          <Text style={styles.headerTitle}>Your Walking Report</Text>

          {/* Grid Cards */}
          <View style={styles.grid}>
            {report && report.data ? (
              <>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Steps</Text>
                  <Text style={styles.cardValue}>{report.data.steps}</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Calories</Text>
                  <Text style={styles.cardValue}>{report.data.calories}</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Distance</Text>
                  <Text style={styles.cardValue}>{report.data.distance}</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Balance</Text>
                  <Text style={styles.cardValue}>{report.data.balance_score}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.loadingText}>No Data Available</Text>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Report Content */}
          <View style={styles.reportSection}>
            <Text style={styles.reportHeader}>Detailed Report</Text>
            <Text style={styles.reportContent}>{report.report}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F7FB",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4C2A86",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
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
