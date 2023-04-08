import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 2,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '40%',
    },
    qty: {
        width: '20%',
    },
    rate: {
        width: '20%',
    },
    amount: {
        width: '20%'
    },
});

const CompanyTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Unternehmen</Text>
        <Text style={styles.qty}>Verkauft</Text>
        <Text style={styles.rate}>Preis</Text>
        <Text style={styles.amount}>Umsatz</Text>
    </View>
);

export default CompanyTableHeader