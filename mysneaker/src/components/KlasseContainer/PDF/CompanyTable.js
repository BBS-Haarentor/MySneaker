import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import CompanyTableHeader from './CompanyTableHeader'
import CompanyTableRow from './CompanyTableRow'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: '10px',
        marginTop: 24,
        textAlign: "center"
    },
});

const CompanyItemsTable = ({companys}) => (
    <View style={styles.tableContainer}>
        <CompanyTableHeader />
        <CompanyTableRow items={companys} />
    </View>
);

export default CompanyItemsTable