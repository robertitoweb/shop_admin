"use client"
import Popup from '@/components/admin-panel/Popup';
import ProductRow from '@/components/admin-panel/ProductRow';
import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch } from '@/redux/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
 

export interface IProduct {
  _id:string,
  imgSrc:string,
  filekey:string,
  name:string,
  price:string,
  category :string,
}


const Dashboard = () => {

const [products,setProducts] =useState([]);
const [openPopup,setOpenPopup] = useState(false);
const [updateTable, setUpdateTable] = useState(false);

const dispatch = useAppDispatch()

useEffect(()=>{ 
  dispatch(setLoading(true));

  axios
  .get("/api/get_products")
  .then((res)=> setProducts(res.data))
  .catch((err) => console.log(err))
  .finally(()=>dispatch(setLoading(false)))
},[updateTable])

  return (
    <div>
       <div className=' bg-white h-[calc(100vh-96px)] rounded-lg p-4'>
      <h2 className=' text-3xl'>All Products</h2>


      <div className=' mt-4 h-[calc(100vh-180px)] overflow-x-auto ' >
        <table className='w-full'>
        <thead>
        <tr className=' text-gray-500 border-t  border-[#b8b3b3]'>
          <th className=' px-6 py-3 text-center'>SR No.</th>
          <th className=' px-6 py-3 text-center'>Name</th>
          <th className=' px-6 py-3 text-center'>Price</th>
          <th className=' px-6 py-3 text-center'>Picture</th>
          <th className=' px-6 py-3 text-center'>Actions</th>
        </tr>
          </thead>
            <tbody>
                  {
                    products.map((product: IProduct , index)=>
                  <ProductRow
                  key ={product._id}
                  srNo={index+1}
                  setOpenPopup={setOpenPopup}
                  setUpdateTable={setUpdateTable}
                  product={product}
                  />
                    )
                  }
            </tbody>
          </table>
      </div>
     </div>
     {openPopup &&(
      <Popup  setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
    )}

    </div>
   
  );
};

export default Dashboard
