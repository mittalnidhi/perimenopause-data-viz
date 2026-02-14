import { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import { filter, isEmpty } from 'lodash';
import { useResizeObserver, useDebounceCallback } from 'usehooks-ts';

export default function Colony(props){
    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row items-center justify-center bg-blue-300 h-25'>
                <h1>Colony of Symptoms</h1>
            </div>
            <div className='flex flex-row w-[95vw] h-190 mt-8 mx-auto'>
                <div className='bg-[#C2C5D0] border-2 border-[#45144B] flex-2 h-full rounded-[48px] p-12 mix-blend-multiply'>
                    Insert bars here
                </div>
                <div className='bg-green-100 flex-3 h-full mx-25'>
                    Insert silhouette here
                </div>
                <div className='bg-purple-100 flex-2 flex flex-col h-full'>
                    <div className='bg-[#C2C5D0] border-2 border-[#45144B] flex-2 h-full rounded-[48px] p-12 mix-blend-multiply'>
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