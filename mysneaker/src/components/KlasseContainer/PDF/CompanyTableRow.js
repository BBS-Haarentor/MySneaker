import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const formatter = new Intl.NumberFormat('de-de', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
})

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '40%',
        paddingLeft: 8,
    },
    qty: {
        width: '20%',
        paddingRight: 8,
    },
    rate: {
        width: '20%',
        paddingRight: 8,
    },
    amount: {
        width: '20%',
        paddingRight: 8,
    },
});


const CompanyTableRow = ({items}) => {
    const rows = items.map( item =>
        <View style={styles.row} key={item.company_id.toString()}>
            <Text style={styles.description}>{item.name}</Text>
            <Text style={styles.qty}>{item.real_sales === null ? 0 : item.real_sales} Stk.</Text>
            <Text style={styles.rate}>{formatter.format(item.income_from_sales)}</Text>
            <Text style={styles.rate}>{formatter.format(item.sales_bid)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export default CompanyTableRow