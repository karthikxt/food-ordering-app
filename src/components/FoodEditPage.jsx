import React, { useEffect, useState } from "react";
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood } from "react-icons/md";
import { categories } from "../utils/data";
import AdminHeader from "./AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { add, getById, update } from "../services/foodService";
import { toast } from "react-toastify";
import { uploadImage } from "../services/uploadService";

export default function FoodEditPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!foodId;
 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then(food => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId]);

  const submit = async foodData => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
      return;
    }
    const newFood = await add(food);
    toast.success(`Food "${food.name}" added successfully!`);
    navigate('/admin/editFood/' + newFood.id, { replace: true });
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="w-[30%]">
        <AdminHeader />
      </div>
      <div className="w-[90%] justify-center items-center flex flex-col ml-60 mt-40 gap-10">
      <p className="text-3xl font-semibold text-headingColor ">
      {isEditMode ? 'Edit Food' : 'Add Food'}
        </p>
         
          <form
          className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFastfood className="text-xl text-gray-700" />
              <input
                type="text"
               
                {...register('name', { required: true, minLength: 5 })}
                placeholder="Give me a Name..."
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className="w-full">
              <select
                 {...register('category', { required: true })}
                className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories &&
                  categories.map((item) => (
                    <option
                      key={item.id}
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                      value={item.urlParamName}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
            
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="imageUrl"
                      accept="image/*"
                      onChange={upload}
                      className="w-0 h-0"
                    />
                  </label>
                  {imageUrl && (
                  <div className="relative h-full">
                    <img
                      src={imageUrl}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    </div>
                         )}
              
            </div>

      

            <div className="w-full">
              <select
                  {...register('favourite',{ required: true })}
                className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Favorite
                </option>

                <option
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value="true"
                >
                  Yes
                </option>
                <option
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value="false"
                >
                  No
                </option>
              </select>
            </div>

            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className="text-gray-700 text-2xl" />
              <input
                type="number"
               
                {...register('price', { required: true })}
                placeholder="Price"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className="text-gray-700 text-2xl" />
              <input
                type="number"
                
                {...register('stars', { required: true })}
                placeholder="Stars here"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className="flex justify-center items-center ">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
           
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
          
          </form>
          {/* </div>  */}

          
        
        
        </div>
      
      
      </div>
   
  );
}
