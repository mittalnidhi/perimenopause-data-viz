import { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import { filter, isEmpty } from 'lodash';
import { useResizeObserver, useDebounceCallback } from 'usehooks-ts';
import peridata from '../data/peridata.json'
import ColonySymptoms from './ColonySymptoms';

export default function Colony(props){
    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row items-center justify-center h-25'>
                <h1>Colony of Symptoms</h1>
            </div>
            <div className='flex flex-row w-[90vw] h-190 my-8 mx-auto text-white'>
                <div className='gray-panel flex flex-col flex-2 h-full p-12'>
                    <h5>Select a Symptom</h5>
                    <ColonySymptoms {...peridata}/>
                    <h5>View</h5>
                    <div>Intensity | Low Intensity | High Intensity</div>
                    <h5>Stage</h5>
                </div>
                <div className='flex-3 h-full mx-25'>
                    <img className='h-full mx-auto' src='Nidhi-ColonyViz-sil.png' />
                </div>
                <div className='flex-2 flex flex-col h-full'>
                    <div className='gray-panel flex-2 h-full p-12'>
                        Insert settings here
                    </div>
                    <div className='flex-1 m-5'>
                        Words words words
                    </div>
                </div>
            </div>
        </div>
    )
}