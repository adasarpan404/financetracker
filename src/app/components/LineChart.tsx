import * as d3 from 'd3'
import React, { useEffect, useRef } from "react";
import { Transaction } from "../../../types";


interface LineChartProps {
    transactions: Transaction[]
}

const LineChart: React.FC<LineChartProps> = ({ transactions }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const width = 600;
            const height = 300;
            const svg = d3.select(ref.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(50, 50)');

            const x = d3.scaleTime().range([0, width - 100]);
            const y = d3.scaleLinear().range([height - 100, 0]);

            const line = d3.line<Transaction>()
                .x(d => x(new Date(d.id)))
                .y(d => y(d.amount));

            x.domain(d3.extent(transactions, d => new Date(d.id)) as [Date, Date]);
            y.domain([0, d3.max(transactions, d => d.amount)] as [number, number]);

            svg.append('path')
                .datum(transactions)
                .attr('class', 'line')
                .attr('d', line);

            svg.append('g')
                .attr('transform', `translate(0, ${height - 100})`)
                .call(d3.axisBottom(x));

            svg.append('g')
                .call(d3.axisLeft(y));
        }
    }, [transactions])
    return (<svg ref={ref}></svg>);
}

export default LineChart;
