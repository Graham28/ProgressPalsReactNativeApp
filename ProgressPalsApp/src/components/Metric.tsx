// src/components/Metric.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-svg-charts';

export type MetricProps = {
    title: string;
    data: number[];
};

const Metric: React.FC<MetricProps> = ({ title, data }) => {
    return (
        <View style={metricStyles.container}>
            <Text style={metricStyles.title}>{title}</Text>
            <BarChart style={metricStyles.chart} data={data} />
        </View>
    );
}

const metricStyles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    chart: {
        height: 200,
    }
});

export default Metric;
