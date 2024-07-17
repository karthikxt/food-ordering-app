import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteById, getAll } from "../services/foodService";

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
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FoodsAdminPage() {
    const navigate=useNavigate();
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods=async ()=>{
    const loadedfoods = await getAll();
    console.log("FoodsAdmin page",loadedfoods)
    setFoods(loadedfoods);
  }

  const deleteFood = async (food) => {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    await deleteById(food.id);
    toast.success(`"${food.name}" Has Been Removed!`);
    setFoods(foods.filter((f) => f.id !== food.id));
  };
  return (
    <>
     <div className="w-full h-full flex flex-col justify-center items-center ">

        <div className="w-[30%]">
    <AdminHeader/>
    </div>
    <div className="w-[70%] justify-center flex flex-col ml-60 mt-40 gap-10">
        <div className="flex justify-start">  <Link to="/admin/addFood"
         
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Add Food
        </Link></div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          
          <TableBody>
            {foods.map((food) => (
              <StyledTableRow key={food.id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={food.imageUrl}
                    className="w-20 h-50 max-w-[70px] "
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{food.name}</StyledTableCell>
                <StyledTableCell align="left">{food.category}</StyledTableCell>
                <StyledTableCell align="left">{food.price}</StyledTableCell>
                <StyledTableCell align="left">{food.stars}</StyledTableCell>
                <StyledTableCell align="left">
                  {food.favorite ? "yes" : "No"}
                </StyledTableCell>
                <StyledTableCell align="left">
                                    <div className="d-flex">
                    <IconButton
                      aria-label="editBtn"
                      color="error"
                      onClick={() => navigate(`/admin/editFood/${food.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="deletBtn"
                      color="secondary"
                      onClick={() => deleteFood(food)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
    </>
  );
}
