import { IProduct } from '@/app/admin/dashboard/page';
import { setProduct } from '@/redux/features/productSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { Dispatch, SetStateAction } from 'react'
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Image from 'next/image'
import { setLoading } from '@/redux/features/loadingSlice';
import axios from 'axios';
import { makeToast } from '@/utils/helper';

interface PropsType {
    srNo: number,
    setOpenPopup : Dispatch<SetStateAction<boolean>>;
    setUpdateTable : Dispatch<SetStateAction<boolean>>;
    product : IProduct

}
const ProductRow = ({srNo,setOpenPopup,setUpdateTable,product}:PropsType) => {
    const dispatch = useAppDispatch()
    const onEdit =()=>{
        dispatch(setProduct(product))
        setOpenPopup(true)
    }
    const OnDelete=()=>{
    
        dispatch(setLoading(true))
        const payload={
            fileKey: product.filekey
        }
        axios.delete("/api/uploadthing",{data : payload}).then(res=>{
            console.log(res.data);
            axios.delete(`/api/delete_product/${product._id}`).then(res=>{
                console.log(res.data);
                makeToast("Product deleted Successfully")
                setUpdateTable((prevState)=> !prevState)
            }).catch((err)=> console.log(err))
            .finally(()=>dispatch(setLoading(false)))
        })
        .catch((err)=> console.log(err))
    }

  return (
   <tr className=' text-center'>
        <td>
        <div className=' items-center'>{srNo}</div>
        </td>
        <td>
        <div  className=' items-center'>{product.name}</div>
        </td>
        <td>
        <div  className=' items-center'>$ {product.price}</div>
        </td>
        <td className='py-2  item-center'>
        <Image src={product.imgSrc} width={40} height={40} alt="Product_image"/> 
        </td>
        <td  className=' items-center'>
            <div className=' text-2xl flex items-center gap-2 text-gray-600'>
           <CiEdit className=' cursor-pointer hover:text-black' 
           onClick={onEdit}/>
           <RiDeleteBin5Fill  className=' text-[20px] cursor-pointer hover:text-red-600' 
           onClick={OnDelete}
           />
            </div>
        </td>
        
   </tr>
  )
}

export default ProductRow
