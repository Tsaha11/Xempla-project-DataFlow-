import React, { useEffect, useRef, useState } from 'react'
import './ReportsPage.scss'
import SearchIcon from './../../assets/images/search-bigiocn.svg'
import NoDataFoundIcon from './../../assets/images/no-searchfound.png'
import ReactECharts from 'echarts-for-react'
import graphPoints from "../../store/data.json"
import "./style.css"
import { Audio } from 'react-loader-spinner';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Tooltip } from 'antd';
import XemplLogo from '../../assets/images/xempla-logo.svg'
import NavIconMenu from '../../assets/images/nav-dropdown-icon.svg'
import ThemeMoon from '../../assets/images/nightmode-nav-icon.svg'
import LocationPin from '../../assets/images/location-nav-icon.svg'
import WeatherIcon from '../../assets/images/weather-nav-icon.svg'
import NotificationIcon from '../../assets/images/noti-nav-icon.svg'
import UserNavIcon from '../../assets/images/user-nav-icon.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportsPage = () => {
    const [graphData,setgraphData]=useState([]);
    const [xaxis,setXaxis]=useState([])
    const [yaxis,setYaxis]=useState([])
    const [avg,setAvg]=useState([]);
    const [names,setName]=useState([])
    const [namesAbbr,setNamesAbbr]=useState([]);
    const [pagination,setPagination]=useState(true);
    const [count,setCount]=useState(1);
    const [idx,setIdx]=useState([]);
    const [p,setP]=useState(1);
    const [mode,setMode]=useState(false);
    const modeHanlder = () => {
        if (mode === true) {
            document.body.classList.add('dark-theme');
            document.body.style.color = 'white';
            setMode(false);
        } else {
            document.body.className=''
            document.body.style.color = ''; // Reset to default color
            setMode(true);
        }
    };
    
    function findAbbr(str) {
        if (!str) return ""; 
        const words = str.split(" "); 
        const abbreviation = words.map(word => word.charAt(0)).join(""); 
        return abbreviation.toUpperCase();
    }
    const fetchHanlder=async(cnt)=>{
        try {
            const data=graphPoints
            const size=10;
            let mn=Math.min(size*cnt,data.length)
            const tempData=[]
            let mx=Math.max(0,size*(cnt-1))
            for(let i=mx;i<mn;i++){
                if(idx.includes(data[i].index)){
                    tempData.push({
                        index:data[i].index,
                        name:data[i].name,
                        val1:data[i].value1,
                        val2:data[i].value2,
                        select:true
                    })
                }
                else{
                    tempData.push({
                        index:data[i].index,
                        name:data[i].name,
                        val1:data[i].value1,
                        val2:data[i].value2,
                        select:false
                    })
                }
            }
            setgraphData(tempData)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const addData = (data, ind) => {
        if (!idx.includes(ind)) {
            const updatedXaxis = [...xaxis, data.val1];
            const updatedYaxis = [...yaxis, data.val2];
            const updatedIdx = [...idx, ind];
            const updateNames=[...namesAbbr,findAbbr(data.name)]
            const updatedAvg=[...avg,(data.val1+data.val2)/2]
            setXaxis(updatedXaxis);
            setYaxis(updatedYaxis);
            setAvg(updatedAvg)
            setNamesAbbr(updateNames)
            setIdx(updatedIdx);
            fetchHanlder(p);
        }
    };
    useEffect(()=>{
        fetchHanlder(1);
        let cnt=(graphPoints.length+9)/10;
        setCount(cnt)
    },[])
    useEffect(()=>{
        if(mode){
            document.body.classList.add('dark-theme')
            document.body.style={color:'white'}
        }
    },[])
    const handlePageChange = async(event, page) => {
        const cnt=await page
        fetchHanlder(cnt);
        setP(cnt);
    };
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
                data: avg,
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
    
    const changeTextHanlder=(env)=>{
        const text=env.target.value.toLowerCase();
        const regexPattern = new RegExp(text, 'gi');
        const countOccurrences = (str) => {
            const matches = str.match(regexPattern);
            return matches ? matches.length : 0;
        };
        const data=graphPoints.filter(item=>
            countOccurrences(item.name) > 0
        )
        let mn=data.length
        const tempData=[]
        let mx=0
        console.log(idx)
        for(let i=mx;i<mn;i++){
            if(idx.includes(data[i].index)){
                tempData.push({
                    index:data[i].index,
                    name:data[i].name,
                    val1:data[i].value1,
                    val2:data[i].value2,
                    select:true
                })
            }
            else{
                tempData.push({
                    index:data[i].index,
                    name:data[i].name,
                    val1:data[i].value1,
                    val2:data[i].value2,
                    select:false
                })
            }
        }
        setgraphData(tempData)
    }
    return (<>
        <header className='w-100 product-header position-fixed'>
        <div className="header-wrapper d-flex justify-content-between pe-3 position-relative">
            <div className="left-header-content d-flex flex-row align-items-center">
            <button className='xem-header-nav-btn d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: mode ? 'var(#292929)' : 'var(--light-bg-color)' }}><img src={NavIconMenu} alt="nav" /></button>
            <img src={XemplLogo} alt="Xempla" className='xempla-logo' />
            </div>
            <div className='right-header-content d-flex flex-row align-items-center'>
            <Tooltip title="Change Theme">
                <button className='squircle-btn theme-change-btn me-2' >
                <img src={ThemeMoon} alt="change theme" onClick={modeHanlder}/>
                </button>
            </Tooltip>
            <Tooltip title="Location: Mumbai, India">
                <div className="weatherHeader d-flex flex-row align-items-center justify-content-center me-2">
                <img src={LocationPin} alt="change theme" />
                <p className="m-0 ps-2">Mumbai, India</p>
                </div>
            </Tooltip>
            <Tooltip title="Weather">
                <button className='squircle-btn wun-btn me-2'>
                <img src={WeatherIcon} alt="weather" />
                </button>
            </Tooltip>
            <Tooltip title="Notification">
                <div className='position-relative me-2'>
                <span className="notidot position-absolute"></span>
                <button className='squircle-btn wun-btn me-0' onClick={()=>{
                    toast("No notification",{
                        position:'top-center'
                    })
                }}>
                    <img src={NotificationIcon} alt="change theme" />
                </button>
                </div>
            </Tooltip>

            <div className='dropdown-usernav'>
                <Tooltip title="Your Profile and settings">
                <button className='squircle-btn wun-btn'>
                    <img src={UserNavIcon} alt="change theme" />
                </button>
                </Tooltip>
            </div>

            </div>
        </div>
        </header>
        <ToastContainer></ToastContainer>
        <div className="page-wrapper">
            <section className="create-Report-Form-Header ps-4 pe-4 pb-4" >
                <div className='page-title'>
                    <h1>Asset Performance Report</h1>
                </div>
                <div className='report-page-wrapper d-flex flex-col flex-wrap mt-4'>
                    <div className='col-lg-5 col-xl-4 col-xxl-4 container-opts'>
                        <div className='wrapper-in-con-opts p-4'>
                            <div className='input-search-wrapper position-relative'>
                                <img src={SearchIcon} alt="image search" className='position-absolute search-icon' />
                                <input type='text' className='input-seach w-100' placeholder='Search ...'  onChange={changeTextHanlder}/>
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
                                        <div className={`${data.select && 'selected'} indi-report-name d-flex mb-2`} key={data.name} onClick={()=>{
                                            addData(data,data.index)
                                        }}>
                                            <span className={`${data.select && 'selected-option'} w-100`}>{data.name}</span>
                                        </div>
                                        </>
                                    ))
                                }
                                {pagination && <div className='pagination'>
                                <Stack spacing={2}>
                                    <Pagination onChange={handlePageChange} count={count} color='primary' />
                                </Stack>
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
        </>
    )
}

export default ReportsPage