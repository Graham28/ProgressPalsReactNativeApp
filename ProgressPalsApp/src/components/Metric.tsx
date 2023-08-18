// src/components/Metric.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export type MetricProps = {
    title: string;
    data: number[];
    dates: string[]; // Date strings in the format "DD/MM/YYYY"
};

const Metric: React.FC<MetricProps> = ({ title, data, dates }) => {
    const dataMax = Math.max(...data);
    const dataMin = Math.min(...data);
    const padding = (dataMax - dataMin) * 0.25;

    // A helper function to format dates for display on the x-axis
    const formatDateForXAxis = (date: string) => {
        const [day, month] = date.split("/"); // We're omitting the year for brevity
        return `${day}/${month}`;
    };

    return (
        <View style={metricStyles.container}>
            <Text style={metricStyles.title}>{title}</Text>
            <View style={{ flexDirection: 'row', height: 200 }}>
                <YAxis
                    data={data}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={3}
                    min={dataMin - padding}
                    max={dataMax + padding}
                />
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={metricStyles.chart}
                        data={data}
                        svg={{ stroke: 'rgb(23, 15, 28)', strokeWidth: 4 }}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveLinear}
                        yMin={dataMin - padding}
                        yMax={dataMax + padding}
                        xMax={6.9}
                    >
                    </LineChart>
                    <XAxis
                        style={{ marginTop: 5 }}
                        data={data}
                        formatLabel={(value, index) => formatDateForXAxis(dates[index])}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'grey' }}
                    />
                </View>
            </View>
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
        flex: 1,
    }
});

export default Metric;
