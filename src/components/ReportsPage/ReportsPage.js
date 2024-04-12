import React, { useEffect, useRef, useState } from 'react'
import './ReportsPage.scss'
import SearchIcon from './../../assets/images/search-bigiocn.svg'
import NoDataFoundIcon from './../../assets/images/no-searchfound.png'
import ReactECharts from 'echarts-for-react'
import graphPoints from "../../store/data.json"
import "./style.css"
import { Audio } from 'react-loader-spinner';
const ReportsPage = () => {
    const [graphData,setgraphData]=useState([]);
    const [xaxis,setXaxis]=useState([])
    const [yaxis,setYaxis]=useState([])
    const [names,setName]=useState([])
    const [set,setSet]=useState(1);
    const [namesAbbr,setNamesAbbr]=useState([]);
    function findAbbr(str) {
        if (!str) return ""; 
        const words = str.split(" "); 
        const abbreviation = words.map(word => word.charAt(0)).join(""); 
        return abbreviation.toUpperCase();
    }
    const fetchHanlder=async()=>{
        try {
            const data=graphPoints
            const size=15;
            let mn=Math.min(size*set,data.length)
            const tempData=[]
            let mx=Math.max(size*(set-1),0);
            console.log(mx,mn)
            for(let i=mx;i<mn;i++){
                tempData.push({
                    name:data[i].name,
                    val1:data[i].value1,
                    val2:data[i].value2,
                    select:false
                })
            }
            setSet(prev=>{
                return prev+1;
            })
            setgraphData(prev=>[...prev,...tempData])   
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoader(false)
    }
    useEffect(()=>{
        fetchHanlder();
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    },[])
    const option = {
        grid: {
            show: false,
            z: 0,
            left: 30,
            top: 30,
            right: 40,
            bottom: 60,
            containLabel: false,
            backgroundColor: 'transparent',
            borderWidth: 0,
        },
        tooltip: {
            className: 'tooltipCharts',
            trigger: 'axis',
            borderWidth: 0,
            axisPointer: {
                type: 'shadow',
            },
            textStyle: {
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
            }
        },
        legend: {
            bottom: 0,
            orient: 'horizontal',
            itemWidth: 11,
            itemHeight: 11,
            textStyle: {
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                color: '#000000'
            },
            data: ['FDS Value', 'Avg Value', '% Diff']
        },
        xAxis: [
            {
                type: 'category',
                data: namesAbbr,
                axisLabel: {
                    textStyle: {
                        fontSize: 11,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666666'
                    },
                    nameLocation: 'start'
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Avg Value',
                // min: 0,
                // max: 11,
                axisLabel: {
                    // formatter: '{value} ml',
                    textStyle: {
                        fontSize: 11,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666666'
                    },
                    nameLocation: 'start'
                },
            },
            {
                type: 'value',
                name: '% Diff',
                // min: 0,
                // max: 10,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: 'FDS Value',
                type: 'bar',
                tooltip: {

                },
                data: xaxis,
                smooth: true,
                itemStyle: {
                    color: '#0daeff',
                    borderRadius: [0, 0, 0, 0],
                    emphasis: {
                        color: '#0daeff',
                    },
                },
            },
            {
                name: 'Avg Value',
                type: 'bar',
                tooltip: {

                },
                data: yaxis,
                smooth: true,
                itemStyle: {
                    color: '#25d589',
                    emphasis: {
                        color: '#25d589',
                    },
                },
            },
            {
                name: '% Diff',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {

                },
                data: xaxis,
                smooth: true,
                itemStyle: {
                    color: '#0052cc',
                    borderRadius: [10, 10, 0, 0],
                    emphasis: {
                        color: '#0052cc',
                    },
                },
            }
        ]
    }   
    const containerRef = useRef(null);
    const [loader,setLoader]=useState(false);
    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight && !loader) {
            setLoader(true);
            fetchHanlder();
        }
    };
    return (
        <div className="page-wrapper">
            <section className="create-Report-Form-Header ps-4 pe-4 pb-4" >
                <div className='page-title'>
                    <h1>Asset Performance Report</h1>
                </div>
                <div className='report-page-wrapper d-flex flex-row mt-4'>
                    <div className='col-lg-5 col-xl-4 col-xxl-4 container-opts'>
                        <div className='wrapper-in-con-opts p-4'>
                            <div className='input-search-wrapper position-relative'>
                                <img src={SearchIcon} alt="image search" className='position-absolute search-icon' />
                                <input type='text' className='input-seach w-100' placeholder='Search ...' />
                            </div>
                            {/* For No data Found */}
                            <div className='d-flex align-items-center flex-column pt-5 pb-5 no-data'>
                                <img src={NoDataFoundIcon} alt="nodata" />
                                <p className='mb-0 mt-4'>No Data Found</p>
                            </div>
                            {/* For No data Found */}
                            <div className='asset-report-list d-flex flex-column mt-4' ref={containerRef}>
                                {
                                    graphData.map((data)=>(
                                        <>
                                        <div className='indi-report-name d-flex mb-2' key={data.name}>
                                            <span className='w-100'>{data.name}</span>
                                        </div>
                                        </>
                                    ))
                                }
                                {loader && <div className='loading'>
                                <Audio
                                    height="30"
                                    width="60"
                                    radius="9"
                                    color="blue"
                                    ariaLabel="loading"
                                    wrapperStyle
                                    wrapperClass
                                />
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7 col-xl-8 col-xxl-8 container-graph'>
                        <div className='wrapper-graph-report p-4'>
                            <div className="wrapper-graph-section mb-5 d-flex flex-column">
                                <p className='text-center'>AHU SAF (Above FDS)</p>
                                {xaxis.length>0 && <div className='graph-wrapper'>
                                    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} className="graph-charts" />
                                </div>}
                                {xaxis.length===0 && <div className='img-box'>
                                    <img src='https://img.freepik.com/free-vector/employee-working-office-interior-workplace-flat-vector-illustration_1150-37453.jpg?size=338&ext=jpg&ga=GA1.1.1292351815.1712188800&semt=ais'>
                                </img>
                                    <h6>Click on the left-panel assets to view the analytics</h6>
                                </div>}
                            </div>
                            <div className="text-insights-wrapper">
                                <div className="in-insi-wrapper">
                                    <p>5 AHUs are working above FDS levels. Deviation range is from 11% to 22%. Potential increase in energy consumption would be around 20%-30% as compared to FDS levels.<br />
                                        Only those assets have been listed where in the flow is below or at FDS level.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ReportsPage