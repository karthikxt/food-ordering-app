import React from 'react'
import { Link, Route, Routes } from "react-router-dom";
import FoodsAdminPage from './FoodsAdminPage';
import { PieChart } from '@mui/x-charts/PieChart';
import AdminRoute from './AdminRoute';
import AdminHeader from './AdminHeader';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Sales',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const valueFormatter = (value) => `${value}mm`;
export default function Dashboard() {

  const data=[
    {
        color:"primary",
        title:"Earnings (Monthly)",
        price:"$40,000",
        icon:"fas fa-calendar"
    },
    {
        color:"success",
        title:" Earnings (Annual)",
        price:"$215,000",
        icon:"fas fa-dollar-sign"
    },
    {
        color:"info",
        title:"Users",
        price:"70%",
        icon:"fas fa-clipboard-list"
    },
    {
        color:"warning",
        title:"Foods",
        price:"70%",
        icon:"fas fa-comments"
    }
]

const dataset = [
  {
    fruits: 159,
    curry: 57,
    chicken: 86,
    fish: 21,
    Icecreams:44,
    drinks:50,
    month: 'Jan',
  },
  {
    fruits: 150,
    curry: 52,
    chicken: 78,
    fish: 28,
    Icecreams:80,
    drinks:60,
    month: 'Fev',
  },
  {
    fruits: 47,
    curry: 53,
    chicken: 106,
    fish: 41,
    Icecreams:64,
    drinks:80,
    month: 'Mar',
  },
  {
    fruits: 154,
    curry: 156,
    chicken: 92,
    fish: 73,
    Icecreams:64,
    drinks:80,
    month: 'Apr',
  },
  {
    fruits: 157,
    curry: 169,
    chicken: 92,
    fish: 99,
    Icecreams:94,
    drinks:80,
    month: 'May',
  },
  {
    fruits: 260,
    curry: 163,
    chicken: 103,
    fish: 144,
    Icecreams:44,
    drinks:90,
    month: 'June',
  },
  {
    fruits: 259,
  curry: 60,
    chicken: 105,
    fish: 119,
    Icecreams:144,
    drinks:90,
    month: 'July',
  },
  {
    fruits: 365,
    curry: 60,
    chicken: 106,
    fish: 149,
    Icecreams:104,
    drinks:110,
    month: 'Aug',
  },
  {
    fruits: 251,
    curry: 151,
    chicken: 95,
    fish: 131,
    Icecreams:114,
    drinks:110,
    month: 'Sept',
  },
  {
    fruits: 160,
    curry: 165,
    chicken: 297,
    fish: 55,
    Icecreams:114,
    drinks:110,
    month: 'Oct',
  },
  {
    fruits: 167,
    curry: 64,
    chicken: 276,
    fish: 248,
    Icecreams:114,
    drinks:90,
    month: 'Nov',
  },
  {
    fruits: 261,
    curry: 170,
    chicken: 203,
    fish: 125,
    Icecreams:114,
    drinks:90,
    month: 'Dec',
  },
];

  return (
    <>

<AdminHeader/>


<div className="w-full h-full flex flex-col justify-center items-center ">

<div className="w-[30%]">
<AdminHeader/>
</div>
<div className="w-[70%] justify-center flex flex-col ml-60 mt-40 gap-10">
<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

{/* Chart-1 */}
<div class="row">

      {data.map((item,index)=>{
        return(
            <div key={index} class="col-xl-3 col-md-6 mb-4">
    <div class={`card border-left-${item.color} shadow h-100 py-2`}>
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class={`text-xs font-weight-bold text-${item.color} text-uppercase mb-1}`}>
                    {item.title}</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{item.price}</div>
                </div>
                <div class="col-auto">
                    <i class={`${item.icon} fa-2x text-gray-300`}></i>
                </div>
            </div>
        </div>
    </div>
</div>

        )

      })}                



</div>

<div className='flex  justify-between'>
{/* Pie-Chart */}

<PieChart
      series={[
        {
          data: [
            { id: 0, value: 30, label: 'Fruits' },
            { id: 1, value: 20, label: 'Curry' },
            { id: 2, value: 15, label: 'Chicken' },
            { id: 2, value: 15, label: 'Fish' },
            { id: 2, value: 10, label: 'Ice creams' },

            { id: 2, value: 10, label: 'Drinks' },

          ],
        },
      ]}
      width={400}
      height={200}
    />

<BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'fruits', label: 'fruits', valueFormatter },
        { dataKey: 'curry', label: 'curry', valueFormatter },
        { dataKey: 'chicken', label: 'chicken', valueFormatter },
        { dataKey: 'fish', label: 'fish', valueFormatter },
        { dataKey: 'Icecreams', label: 'Icecreams', valueFormatter },
        { dataKey: 'Drinks', label: 'Drinks', valueFormatter },
      ]}
      {...chartSetting}
    />
</div>
</div>
</div>

</>

  )
}
