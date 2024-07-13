import * as d3 from 'd3';
import React, { useEffect, useRef } from "react";
import { Transaction } from "../../../types";

interface PieChartProps {
    transactions: Transaction[]
}

const PieChart: React.FC<PieChartProps> = ({ transactions }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const width = 400;
            const height = 400;
            const radius = Math.min(width, height) / 2;

            const svg = d3.select(ref.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const color = d3.scaleOrdinal(['#4caf50', '#f44336']);

            const pie = d3.pie<Transaction>().value(d => d.amount).sort(null);

            const arc = d3.arc<d3.PieArcDatum<Transaction>>()
                .innerRadius(0)
                .outerRadius(radius);

            svg.selectAll('.arc').remove();

            const arcs = svg.selectAll('.arc')
                .data(pie(transactions))
                .enter()
                .append('g')
                .attr('class', 'arc');

            arcs
                .append('path')
                .attr('d', arc)
                .attr('fill', d => color(d.data.type));

            arcs.append('text')
                .attr('transform', d => `translate(${arc.centroid(d)})`)
                .attr('dy', '0.35em')
                .text(d => d.data.description);
        }
    }, [transactions])
    return (<svg ref={ref}></svg>);
}

export default PieChart;