import {
   BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale,
   PointElement, Title,
   Tooltip
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { data } from '../components/assets/constants'
import Box from '../components/box/Box.jsx'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper.jsx'
import OverallList from '../components/overall-list/OverallList.jsx'
import RevenueList from '../components/revenue-list/RevenueList.jsx'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox.jsx'

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   BarElement,
   Title,
   Tooltip,
   Legend
)

export default function Analytics() {
   return (
      <DashboardWrapper>
         <DashboardWrapperMain>
            <div className="row">
               <div className="col-8 col-md-12">
                  <div className="row">
                     {
                        data.summary.map((item, index) => (
                           <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                              <SummaryBox item={item} />
                           </div>
                        ))
                     }
                  </div>
               </div>
               <div className="col-4 hide-md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SummaryBoxSpecial item={data.revenueSummary} />
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <Box>
                     <RevenueByMonthsChart />
                  </Box>
               </div>
            </div>
         </DashboardWrapperMain>
         <DashboardWrapperRight>
            <div className="title mb">Overall</div>
            <div className="mb">
               <OverallList />
            </div>
            <div className="title mb">Revenue by channel</div>
            <div className="mb">
               <RevenueList />
            </div>
         </DashboardWrapperRight>
      </DashboardWrapper>
   )
}

const RevenueByMonthsChart = () => {
   const theme = useSelector(state => state.theme)
   let color = theme.color.slice(12)
   if (color === 'blue') color = '#349eff'

   const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         xAxes: {
            grid: {
               display: false,
               drawBorder: false
            }
         },
         yAxes: {
            grid: {
               display: false,
               drawBorder: false
            }
         }
      },
      plugins: {
         legend: {
            display: false
         },
         title: {
            display: false
         }
      },
      elements: {
         bar: {
            backgroundColor: color,
            borderRadius: 20,
            borderSkipped: 'bottom'
         }
      }
   }

   const chartData = {
      labels: data.revenueByMonths.labels,
      datasets: [
         {
            label: 'Revenue',
            data: data.revenueByMonths.data
         }
      ]
   }
   return (
      <>
         <div className="title mb">
            Revenue by months
         </div>
         <div>
            <Bar options={chartOptions} data={chartData} height={`300px`} />
         </div>
      </>
   )
}