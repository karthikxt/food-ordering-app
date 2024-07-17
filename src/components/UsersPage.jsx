import React, { useEffect, useState } from 'react'
import { getAll, toggleBlock } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {  useNavigate } from "react-router-dom";
import AdminHeader from './AdminHeader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function UsersPage() {

    const [users,setUsers]=useState()
    const auth = useAuth();
  const navigate=useNavigate()
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const users = await getAll();
      setUsers(users);
    };
    const handleToggleBlock=async (userId)=>{
        const isBlocked=await toggleBlock(userId)
    }
  return (
    <>
    <div className="w-full h-full flex flex-col justify-center items-center ">

       <div className="w-[30%]">
   <AdminHeader/>
   </div>
   <div className="w-[70%] justify-center flex flex-col ml-60 mt-40 gap-10">

     <TableContainer component={Paper} >
       <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            
                            <StyledTableCell align="left">Email </StyledTableCell>
                            <StyledTableCell align="left">Address</StyledTableCell>
                            <StyledTableCell align="left">Admin</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>
         <TableBody>
            {users && (
           users.map((user) => (
             <StyledTableRow key={user.id}>
            
               <StyledTableCell align="left">{user.name}</StyledTableCell>
               <StyledTableCell align="left">{user.email}</StyledTableCell>
               <StyledTableCell align="left">{user.address}</StyledTableCell>
               <StyledTableCell align="left">{user.isAdmin ? '✔️': '❌'}</StyledTableCell>
              
               <StyledTableCell align="left">
                                   <div className="d-flex">
                   <IconButton
                     aria-label="editBtn"
                     color="error"
                     onClick={() => navigate(`/admin/editUser/${user.id}`)}
                   >
                     <EditIcon />
                   </IconButton>
                   {
                      auth.user.id!==user.id &&(
                   <IconButton
                     aria-label="deletBtn"
                     color="secondary"
                     onClick={() =>  handleToggleBlock(user.id)}
                   >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                   </IconButton>
)}
                   </div>
               </StyledTableCell>
             </StyledTableRow>
           ))
           )}
         </TableBody>
       </Table>
     </TableContainer>
     </div>
   </div>
   </>
  )
}
