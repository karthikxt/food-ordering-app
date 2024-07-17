import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }


export default function OrderItemsList({order}) {
   

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Order Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.food.id}>
              <TableCell > <Link to={`/food/${item.food.id}`}><img
        src={item.food.imageUrl}
        className="w-20 h-50 max-w-[70px] "
        alt=""
      /></Link></TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.food.price}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}
          
          
          <TableRow>
            
            <TableCell colSpan={3} align="center">Total</TableCell>
            <TableCell align="right">{ccyFormat(order.totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
