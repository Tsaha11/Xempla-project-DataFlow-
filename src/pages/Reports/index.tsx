import React from 'react'
import ReportsPage from '../../components/ReportsPage'
import Header from '../../components/Header'
import { Analytics } from "@vercel/analytics/react"

const Reports = () => {
    return (
        <>
            <Header />
            <Analytics/>
            <ReportsPage />
        </>

    )
}

export default Reports