import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const App = ({ navigation }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const sheets = [
        { title: 'Latest Medical News', content: 'Researchers have developed a new AI tool to predict patient outcomes more accurately.', icon: <FontAwesome name="newspaper-o" size={16} color="crimson" /> },
        { title: 'Vaccination Alert', content: 'COVID-19 booster shots are now available for all eligible adults. Schedule your appointment today!', icon: <MaterialCommunityIcons name="needle" size={16} color="crimson" /> },
        { title: 'New Technology in Medicine', content: 'A breakthrough in telemedicine allows for remote patient monitoring using wearable devices.', icon: <FontAwesome5 name="robot" size={16} color="crimson" /> },
        { title: 'Health Advisory', content: 'Stay informed about the latest health guidelines and recommendations from health authorities.', icon: <Ionicons name="ios-alert" size={16} color="crimson" /> },
        { title: 'Clinical Trials', content: 'New clinical trials are being launched for innovative cancer treatments. Check eligibility.', icon: <MaterialCommunityIcons name="clipboard-text" size={16} color="crimson" /> },
        { title: 'Medical Innovations', content: '3D printing is revolutionizing prosthetics, making them more accessible and affordable.', icon: <FontAwesome name="wrench" size={16} color="crimson" /> },
        { title: 'Mental Health Awareness', content: 'Join our campaign to raise awareness about mental health issues and available resources.', icon: <MaterialCommunityIcons name="account-heart" size={16} color="crimson" /> },
        { title: 'Nutrition and Wellness', content: 'Discover tips for a balanced diet that promotes overall health and wellness.', icon: <FontAwesome5 name="apple-alt" size={16} color="crimson" /> },
        { title: 'Emergency Preparedness', content: 'Learn how to prepare for health emergencies and natural disasters.', icon: <Ionicons name="ios-warning" size={16} color="crimson" /> },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Community Alerts</Text>
                <View />
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                {/* Search Input */}
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        onFocus={() => setSearchOpen(true)}
                    />
                    <FontAwesome name="search" size={16} style={styles.searchIcon} />
                </View>

                {/* Horizontal Scroll Icons */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconRow}>
                    {Array(15).fill().map((_, index) => (
                        <View key={index} style={styles.iconCircle} />
                    ))}
                </ScrollView>

                {/* Sheets Section */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                    {sheets.map((sheet, index) => (
                        <View key={index} style={styles.sheetContainer}>
                            <View style={styles.sheetBox}>
                                <View style={styles.sheetHeader}>
                                    {sheet.icon}
                                    <Text style={styles.sheetTitle}>{sheet.title}</Text>
                                </View>
                                <Text style={styles.sheetContent}>{sheet.content}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                
                {/* Spacer */}
                <View style={styles.box} />
                <View style={styles.box} />
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity>
                    <FontAwesome name="stethoscope" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="clipboard-text" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name="pills" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="watch" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Search Overlay */}
            {searchOpen && (
                <View style={styles.searchOverlay}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.iconOverlayRow}>
                            {Array(15).fill().map((_, index) => (
                                <View key={index} style={styles.iconCircle} />
                            ))}
                        </View>
                    </ScrollView>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.searchItemContainer}>
                        {Array(25).fill().map((_, index) => (
                            <Text key={index} style={styles.searchItem}>Space between items vertically</Text>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSearchOpen(false)}
                    >
                        <FontAwesome name="times" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'crimson',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        padding: 16,
    },
    searchWrapper: {
        position: 'relative',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    searchInput: {
        width: '100%',
        padding: 8,
        paddingLeft: 30,
        borderRadius: 20,
        backgroundColor: '#E5E7EB',
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
        color: '#6B7280',
    },
    iconRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    iconCircle: {
        width: 48,
        height: 48,
        backgroundColor: 'teal',
        borderRadius: 24,
        marginRight: 8,
    },
    scrollContainer: {
        flexGrow: 1,
        marginBottom: 16,
    },
    sheetContainer: {
        marginBottom: 16,
    },
    sheetBox: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderLeftWidth: 4,
        borderLeftColor: 'crimson',
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sheetTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'crimson',
        marginLeft: 8,
    },
    sheetContent: {
        fontSize: 14,
        color: '#333',
    },
    box: {
        backgroundColor: '#D1D5DB',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'teal',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    searchOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 10,
        padding: 16,
    },
    iconOverlayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    searchItemContainer: {
        flexGrow: 1,
        marginBottom: 16,
    },
    searchItem: {
        marginVertical: 10,
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});

export default App;
