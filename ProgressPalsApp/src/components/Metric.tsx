// src/components/Metric.tsx
import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, Text as SVGText } from 'react-native-svg';

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
    const rangeInDays = (maxDate - minDate) / (1000 * 60 * 60 * 24) + 2;

    // Create a new dataset based on the date range
    const newDataset: number[] = Array(Math.round(rangeInDays)).fill(null);
    parsedDates.forEach((date, index) => {
        const position = (date - minDate) / (1000 * 60 * 60 * 24);
        newDataset[Math.round(position)] = data[index];
    });

    // Fill in gaps with interpolated values
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

    const calculateCY = (dataValue: number) => {
        const chartHeight = 200;
        const contentInsetTop = 31;
        const contentInsetBottom = 47;
        const normalizedData = (dataValue - (dataMin - padding)) / (dataMax + padding - (dataMin - padding));
        const plottingHeight = chartHeight - contentInsetTop - contentInsetBottom;
        return contentInsetTop + plottingHeight * (1 - normalizedData);
    };

    const Decorators = parsedDates.map((date, index) => {
        const position = (date - minDate) / (1000 * 60 * 60 * 24);
        const xPosition = (position / (newDataset.length - 1)) * 100 + '%';
        const cy = calculateCY(newDataset[Math.round(position)]);
    
        if (index === parsedDates.length - 1) {
            // This is the last data point; we add the rocket emoji 🚀 instead of a circle
            return (
                <React.Fragment key={index}>
                    <SVGText
                        x={xPosition}
                        y={cy}
                        dy={5}  // Adjust as necessary to position the rocket in place of the circle
                        fill="black"
                        fontSize="22" // Adjust the font size for the rocket emoji
                        textAnchor="middle"
                    >
                        🚀
                    </SVGText>
                    <SVGText
                        x={xPosition}
                        y={cy + 20} // positioning the text slightly below the circle
                        fill="black"
                        fontSize="10"
                        textAnchor="middle"
                    >
                        {data[index].toString()}
                    </SVGText>
                </React.Fragment>
            );
        } else {
            // This is not the last data point; we add a circle as before
            return (
                <React.Fragment key={index}>
                    <Circle
                        cx={xPosition}
                        cy={cy}
                        r={6}
                        stroke={'#112A46'}
                        fill={'#112A46'}
                    />
                    <SVGText
                        x={xPosition}
                        y={cy + 20} // positioning the text slightly below the circle
                        dx = {5}
                        fill="black"
                        fontSize="10"
                        textAnchor="middle"
                    >
                        {data[index].toString()}
                    </SVGText>
                </React.Fragment>
            );
        }
    });
    

    const formatDateForXAxis = (index: number) => {
        const date = parsedDates[index];
        if (date) {
            const dateObject = new Date(date);
            return `${dateObject.getDate()}/${dateObject.getMonth() + 1}`;
        }
        return "";
    };

    const [newValue, setNewValue] = useState<string>("");

    const isCurrentUser = true;  // Dummy variable

    // Placeholder function to handle new data submission (only logs it)
    const handleSubmitData = () => {
        console.log("New Data:", newValue);
        setNewValue("");  // Reset the input field after submitting
        // TODO: Your logic to send this to the backend
    };
    

    return (
        <View style={metricStyles.container}>
            <Text style={metricStyles.title}>{title}</Text>
            <View style={{ flexDirection: 'row', height: 200 }}>
                <YAxis
                    data={[dataMin - padding, dataMax + padding]}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={0}
                />
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={metricStyles.chart}
                        data={newDataset}
                        svg={{ stroke: 'rgb(23, 15, 28)', strokeWidth: 5 }}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveLinear}
                        yMin={dataMin - padding}
                        yMax={dataMax + padding}
                    >
                        {Decorators}
                    </LineChart>
                    <XAxis
                        style={{ marginTop: 5 }}
                        data={parsedDates}
                        formatLabel={formatDateForXAxis}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'grey' }}
                    />
                </View>
            </View>
            {isCurrentUser && (
                <View style={metricStyles.inputContainer}>
                    <TextInput
                        style={metricStyles.input}
                        value={newValue}
                        onChangeText={setNewValue}
                        placeholder="Add new value"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={metricStyles.addButton} onPress={handleSubmitData}>
                        <Text style={metricStyles.addButtonText}>Add Data</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const metricStyles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#dcc5e6',
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
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#112A46',
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#112A46',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Metric;

