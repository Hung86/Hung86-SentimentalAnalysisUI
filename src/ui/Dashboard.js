import React, { Component } from 'react';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import {parse} from "querystring";

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000,},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181,},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500,},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100,},
];


const data2 = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000,},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181,},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500,},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100,},
];

const data3 = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
];

const data4 = [
    {subject: 'Math', A: 120, B: 110, fullMark: 150,},
    {subject: 'Chinese', A: 98, B: 130, fullMark: 150,},
    {subject: 'English', A: 86, B: 130, fullMark: 150,},
    {subject: 'Geography', A: 99, B: 100, fullMark: 150,},
    {subject: 'Physics', A: 85, B: 90, fullMark: 150,},
    {subject: 'History', A: 65, B: 85, fullMark: 150,},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const analyzed_data = this.props.analyzed_data;
        console.log(analyzed_data); 
        return !analyzed_data ? (
            <div className="container my-5">
            </div>
        ) : (
            <div>
                <div>
                    <div className='child_div_1'>
                        <LineChart width={500} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                        </LineChart>
                    </div>
                    <div className='child_div_1'>
                        <BarChart
                            width={500}
                            height={300}
                            data={data2}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="pv" fill="#8884d8"/>
                            <Bar dataKey="uv" fill="#82ca9d"/>
                        </BarChart></div>
                </div>

                <div className='clear'>
                    <div className='child_div_1'>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data3}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`}
                                                                     fill={COLORS[index % COLORS.length]}/>)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                    <div className='child_div_1'>
                        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data4}>
                            <PolarGrid/>
                            <PolarAngleAxis dataKey="subject"/>
                            <PolarRadiusAxis/>
                            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                        </RadarChart>
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;