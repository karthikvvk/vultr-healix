import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color="black" />
          <Ionicons name="megaphone" size={24} color="black" />
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}></View>
        <Text style={styles.username}>user name</Text>
      </View>
      <Image
        source={{ uri: 'https://placehold.co/200x200' }}
        style={styles.qrCode}
      />
      <View style={styles.details}>
        {Array.from({ length: 7 }).map((_, index) => (
          <View key={index} style={styles.detailItem}>
            <Text style={styles.heading}>Heading:</Text>
            <Text>Complete detail about the heading here</Text>
          </View>
        ))}
      </View>
      {/* Bottom Navigation */}
      <View style={styles.footer}>
  <TouchableOpacity>
    <FontAwesome name="stethoscope" size={24} color="blue" />
  </TouchableOpacity>
  <TouchableOpacity>
    <MaterialCommunityIcons name="clipboard-text" size={24} color="blue" />
  </TouchableOpacity>
  <TouchableOpacity>
    <FontAwesome5 name="pills" size={24} color="blue" />
  </TouchableOpacity>
  <TouchableOpacity>
    <MaterialCommunityIcons name="watch" size={24} color="blue" />
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 80,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'gray',
    borderWidth: 4,
    borderColor: 'blue',
  },
  username: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  qrCode: {
    width: 192,
    height: 192,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 16,
  },
  heading: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});
