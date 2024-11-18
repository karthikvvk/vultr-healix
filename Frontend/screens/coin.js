import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button, Card, IconButton, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomNav from "./CustomBottomNav"; // Import your CustomBottomNav

const MedCoinsPage = () => {
  return (
    <View style={styles.pageContainer}>  {/* Wrap everything in a container with flex */}
      <ScrollView style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>MedCoins Management</Text>
        </View>

        {/* MedCoins Balance Overview */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceHeader}>Your MedCoins Balance</Text>
          <Text style={styles.balanceAmount}>1,200</Text>
          <Button mode="contained" style={styles.addButton}>Add More Coins</Button>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsContainer}>
            <Card style={styles.statsCard}>
              <Icon name="medal" size={40} color="#FFB703" />
              <Text style={styles.statsLabel}>Rank</Text>
              <Text style={styles.statsValue}>#12</Text>
            </Card>
            <Card style={styles.statsCard}>
              <Icon name="trophy" size={40} color="#2196F3" />
              <Text style={styles.statsLabel}>Leaderboard</Text>
              <Text style={styles.statsValue}>Top 5%</Text>
            </Card>
            <Card style={styles.statsCard}>
              <Icon name="chart-line" size={40} color="#66BB6A" />
              <Text style={styles.statsLabel}>Total Coins</Text>
              <Text style={styles.statsValue}>10,000</Text>
            </Card>
          </View>
        </View>

        {/* Usage Options */}
        <View style={styles.usageSection}>
          <Text style={styles.sectionTitle}>Ways to Use Your MedCoins</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <Card style={styles.optionCard}>
              <Icon name="pill" size={40} color="#8ECAE6" />
              <Text style={styles.optionText}>Pharmacy Discount</Text>
              <Text style={styles.requiredCoins}>50 Coins</Text>
              <Button mode="outlined" style={styles.redeemButton}>Redeem</Button>
            </Card>
            <Card style={styles.optionCard}>
              <Icon name="calendar-check" size={40} color="#023047" />
              <Text style={styles.optionText}>Appointment Savings</Text>
              <Text style={styles.requiredCoins}>75 Coins</Text>
              <Button mode="outlined" style={styles.redeemButton}>Redeem</Button>
            </Card>
          </ScrollView>
        </View>

        {/* Discounts & Vouchers */}
        <View style={styles.voucherSection}>
          <Text style={styles.sectionTitle}>Available Discounts & Vouchers</Text>
          <View style={styles.voucherGrid}>
            <Card style={styles.voucherCard}>
              <Image source={{ uri: 'https://example.com/discount.png' }} style={styles.voucherImage} />
              <Text style={styles.voucherText}>20% off on Checkups</Text>
              <Text style={styles.requiredCoins}>100 Coins</Text>
              <Button mode="contained" style={styles.voucherButton}>Redeem Now</Button>
            </Card>
            <Card style={styles.voucherCard}>
              <Image source={{ uri: 'https://example.com/voucher.png' }} style={styles.voucherImage} />
              <Text style={styles.voucherText}>10% off on Labs</Text>
              <Text style={styles.requiredCoins}>80 Coins</Text>
              <Button mode="contained" style={styles.voucherButton}>Redeem Now</Button>
            </Card>
          </View>
          <Button mode="text" style={styles.viewMoreButton}>View More</Button>
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <Text style={styles.leaderboardDescription}>Top users with high MedCoins:</Text>
          <View style={styles.leaderboardContainer}>
            <View style={styles.leaderboardEntry}>
              <Avatar.Image size={40} source={{ uri: 'https://example.com/avatar1.png' }} />
              <Text style={styles.leaderboardName}>User123</Text>
              <Text style={styles.leaderboardCoins}>2,500 Coins</Text>
            </View>
            <View style={styles.leaderboardEntry}>
              <Avatar.Image size={40} source={{ uri: 'https://example.com/avatar2.png' }} />
              <Text style={styles.leaderboardName}>User456</Text>
              <Text style={styles.leaderboardCoins}>2,000 Coins</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Custom Bottom Navigation */}
      <CustomBottomNav />  {/* Add the CustomBottomNav component at the bottom */}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1 },  // Use flex: 1 to allow bottom navigation to be positioned at the bottom
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20 },
  headerText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  balanceCard: {
    padding: 20,
    backgroundColor: '#8ECAE6',
    borderRadius: 15,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceHeader: { fontSize: 18, fontWeight: 'bold', color: '#023047' },
  balanceAmount: { fontSize: 32, fontWeight: 'bold', color: '#2196F3', marginVertical: 10 },
  addButton: { backgroundColor: '#023047', marginTop: 10 },
  statsSection: { padding: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  statsCard: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  statsLabel: { marginTop: 5, color: '#023047' },
  statsValue: { fontWeight: 'bold', color: '#2196F3', fontSize: 18 },
  usageSection: { padding: 15 },
  horizontalScroll: { flexDirection: 'row', paddingVertical: 10 },
  optionCard: {
    width: 150,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  optionText: { fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  requiredCoins: { color: '#FFB703', fontSize: 12 },
  redeemButton: { marginTop: 10 },
  voucherSection: { padding: 15 },
  voucherGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  voucherCard: {
    width: '45%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  voucherImage: { width: 50, height: 50 },
  voucherText: { marginTop: 5, fontWeight: 'bold' },
  viewMoreButton: { marginVertical: 10, alignSelf: 'center' },
  leaderboardSection: { padding: 15 },
  leaderboardContainer: { marginTop: 10, marginBottom:70, },
  leaderboardEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
   
  },
  leaderboardName: { marginLeft: 10, fontWeight: 'bold', },
  leaderboardCoins: { marginLeft: 'auto', color: '#FFB703' },
});

export default MedCoinsPage;
