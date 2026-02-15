import { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function ColonySymptoms(props){
    // Used to calculate bar width
    let maxCount = 0;
    for(const entry of props.symptoms.children){
        maxCount = Math.max(maxCount, entry.value);
    }

    return (
        <div className='flex flex-col h-2/3'>
            {
                props.symptoms.children.map((category, index) => {
                    const chartRowsProps = {
                        index: index,
                        text: category.name,
                        width: category.value / maxCount,
                        color: category.color};
                    return <ChartRows key={index} {...chartRowsProps} />
                })
            }
        </div>
    )
}

function ChartRows(props){
    const containerRef = useRef(null)
    const textRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        d3.select(containerRef.current)
            .on('click', (e) => {
                // Reset all categories
                d3.select(d3.select(containerRef.current).node().parentNode)
                    .selectAll('.chart-text')
                    .transition()
                    .duration(150)
                    .style('color', 'white');
                d3.select(d3.select(containerRef.current).node().parentNode)
                    .selectAll('.chart-bar')
                    .transition()
                    .duration(150)
                    .style('background-color', 'white');
                // Color clicked category
                d3.select(textRef.current)
                    .transition()
                    .duration(150)
                    .style('color', props.color)
                d3.select(barRef.current)
                    .transition()
                    .duration(150)
                    .style('background-color', props.color)
            }
        )
    }, []);

    return (
        <div ref={containerRef} key={props.index} className='flex flex-row items-center h-1/8'>
            <div ref={textRef} className='chart-text flex-2'>{props.text}</div>
            <div className='flex-3'>
                <div ref={barRef} className='chart-bar bg-white rounded-md' style={{color: 'rgba(0,0,0,0)', width: `${props.width * 100}%`}}>A</div>
            </div>
        </div>
    )
}