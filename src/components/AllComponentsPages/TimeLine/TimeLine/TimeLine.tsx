import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './TimeLine.scss';
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};
const TimeLine = () => {
    return (

        <div className="w-100 timeline-wrapper d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row mt-3">
            <div className="col-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 left-timeline">
                <div className="wrapper-timeline-dates d-flex align-items-center justify-content-center">
                    <span>Showing Timeline From</span>
                    <div>
                        <DatePicker onChange={onChange} className="datepicker-timeline" />
                        <span>to</span>
                        <DatePicker onChange={onChange} className="datepicker-timeline" />
                    </div>
                </div>
                <div className='timeline-wrapper-main mt-3'>
                    <Timeline
                        mode="alternate"
                        className='xem-timeline'
                        items={[
                            {
                                className: "active",
                                children: (
                                    <>
                                        <p>Planned Maintenance (3M)</p>
                                        <span>03.03.2024</span>
                                    </>
                                ),
                                color: '#0daeff',
                            },
                            {
                                children:
                                    (
                                        <>
                                            <p>Supply fan operating at maximum level.</p>
                                            <span>02.03.2024</span>
                                        </>
                                    ),
                                color: '#000000',
                            },
                            {
                                color: '#0daeff',
                                children:
                                    (
                                        <>
                                            <p>Corrective Work Order</p>
                                            <span>31.02.2024</span>
                                        </>
                                    ),
                            },

                            {
                                color: '#000000',
                                children:
                                    (
                                        <>
                                            <p>Corrective Work Order</p>
                                            <span>25.02.2024</span>
                                        </>
                                    ),
                            },
                            {
                                children:
                                    (
                                        <>
                                            <p>Thermal comfort issue at hall</p>
                                            <span>24.02.2024</span>
                                        </>
                                    ),
                                color: '#0daeff',
                            },
                            {
                                children:
                                    (
                                        <>
                                            <p>Supply fan operating at maximum level.</p>
                                            <span>23.02.2024</span>
                                        </>
                                    ),
                                color: '#000000',
                            },
                            {
                                color: '#0daeff',
                                children:
                                    (
                                        <>
                                            <p>Corrective Work Order</p>
                                            <span>23.02.2024</span>
                                        </>
                                    ),
                            },

                            {
                                color: '#000000',
                                children:
                                    (
                                        <>
                                            <p>Corrective Work Order</p>
                                            <span>22.02.2024</span>
                                        </>
                                    ),
                            },
                            {
                                children:
                                    (
                                        <>
                                            <p>Thermal comfort issue at hall</p>
                                            <span>20.02.2024</span>
                                        </>
                                    ),
                                color: '#0daeff',
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 right-timeline">
                <div className='content-timeline p-3'>
                    <h4>Planned Maintenance (3M)</h4>
                    <div className='scroll-content-details'>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>

                        <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>

                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>

                        <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>

                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>

                        <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>

                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TimeLine;