import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BuyGetComponent from "../components/BuyGetComponent";

const screenWidth = Dimensions.get("window").width;
export default function MarketPlace({ navigation }) {
  const [activeTab, setActiveTab] = useState("buy");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Marketplace</Text>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubbles" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {/* Content for each tab */}
        {activeTab === "buy" && <BuyGetComponent />}
        {activeTab === "sell" && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Sell/Give Content</Text>
            <TouchableOpacity style={styles.floatingButton} onPress={()=>{navigation.navigate("CreateSellAd")}}>
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        {activeTab === "shortlist" && <Text>Shortlist Content</Text>}
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "buy" && styles.activeTab]}
          onPress={() => handleTabPress("buy")}
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color={activeTab === "buy" ? "#007bff" : "#333"}
          />
          <Text style={styles.tabButtonText}>Buy/Get</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "sell" && styles.activeTab]}
          onPress={() => handleTabPress("sell")}
        >
          <Ionicons
            name="cash-outline"
            size={24}
            color={activeTab === "sell" ? "#007bff" : "#333"}
          />
          <Text style={styles.tabButtonText}>Sell/Give</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "shortlist" && styles.activeTab,
          ]}
          onPress={() => handleTabPress("shortlist")}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color={activeTab === "shortlist" ? "#007bff" : "#333"}
          />
          <Text style={styles.tabButtonText}>Shortlist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    justifyContent: "space-between",
    // flex:1
  },
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  backButton: {
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: "#1c40bd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    paddingBottom: 8,
  },
  tabButton: {
    alignItems: "center",
    padding: 8,
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: "ComfortaaBold",
    color: "#333",
    marginTop: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1c40bd",
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: screenWidth * 0.05, // Adjust the percentage as needed
    backgroundColor: "#1c40bd",
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
