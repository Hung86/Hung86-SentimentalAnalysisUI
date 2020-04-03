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

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();

  const toPercent = (decimal, fixed = 0) => `${(decimal).toFixed(fixed)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;
  
    return toPercent(ratio, 2);
  };

  const renderCustomizedLabel = (props) => {
    const {
      x, y, width, height, value,
    } = props;
    const radius = 10;
  
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value.split(' ')[1]}
        </text>
      </g>
    );
  };

  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (entry.value), 0);
  
    return (
        <div className="customized-tooltip-content">
        <p className="total">{`${label} (${total}%)`}</p>
      </div>
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
        

        console.log("----json Dashboard : " + analyzed_data);


        return (
            <div align="center">
                <h1>{this.props.keyword}</h1>
                <BarChart
                    width={700}
                    height={400}
                    data={analyzed_data}
                    margin={{
                    top: 50, right: 30, left: 30, bottom: 5,
                    }}
                    barSize={70}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 10 }} />
                    <YAxis type="number" domain={[0, 100]} tickFormatter={toPercent} /> 
                    <Tooltip content={renderTooltipContent}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} label={{ position: 'top'}}>
                    {
                        analyzed_data.map((entry, index) => (
                        <Cell key={'cell-${index}'} fill={colors[index % 20]} />
                        ))
                    }
                    </Bar>

                </BarChart>
            </div>
        )
    }
}

export default Dashboard;