// src/components/Metric.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export type DataPoint = {
    date: string; // Date string in the format "DD/MM/YYYY"
    value: number;
};

export type MetricProps = {
    title: string;
    dataPoints: DataPoint[];
};


const Metric: React.FC<MetricProps> = ({ title, dataPoints }) => {
    const data = dataPoints.map(point => point.value);
    const dates = dataPoints.map(point => point.date);
    const dataMax = Math.max(...data);
    const dataMin = Math.min(...data);
    const padding = (dataMax - dataMin) * 0.25;

    const parsedDates = dates.map(d => new Date(d.split('/').reverse().join('-')).getTime());
    
    const minDate = Math.min(...parsedDates);
    const maxDate = Math.max(...parsedDates);

    const rangeInDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    // Create a new dataset based on the date range
    const newDataset: number[] = Array(Math.round(rangeInDays)).fill(null);

    parsedDates.forEach((date, index) => {
        const position = (date - minDate) / (1000 * 60 * 60 * 24);
        newDataset[Math.round(position)] = data[index];
    });

    // Iterate over the newDataset and fill in gaps with interpolated values
    let lastKnownValue = data[0]; 
    let lastKnownIndex = 0;

    for (let i = 0; i < newDataset.length; i++) {
        if (newDataset[i] !== null) {
            if (i - lastKnownIndex > 1) {
                const nextKnownValue = newDataset[i];
                const daysBetween = i - lastKnownIndex - 1;
                const dailyDifference = (nextKnownValue - lastKnownValue) / (daysBetween + 1);

                // Interpolate
                for (let j = 1; j <= daysBetween; j++) {
                    newDataset[lastKnownIndex + j] = lastKnownValue + dailyDifference * j;
                }
            }

            lastKnownValue = newDataset[i];
            lastKnownIndex = i;
        }
    }

    const formatDateForXAxis = (index: number) => {
        const date = new Date(minDate + index * (1000 * 60 * 60 * 24));
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    return (
        <View style={metricStyles.container}>
            <Text style={metricStyles.title}>{title}</Text>
            <View style={{ flexDirection: 'row', height: 200 }}>
                <YAxis
                    data={newDataset}
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
                        data={newDataset}
                        svg={{ stroke: 'rgb(23, 15, 28)', strokeWidth: 4 }}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveLinear}
                        yMin={dataMin - padding}
                        yMax={dataMax + padding}
                    >
                    </LineChart>
                    <XAxis
                        style={{ marginTop: 5 }}
                        data={newDataset}
                        formatLabel={formatDateForXAxis}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'grey' }}
                    />
                </View>
            </View>
        </View>
    );
};



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
