import { ProductType } from "@/app/type";
import React from "react";

interface ProductCardProps {
  product: ProductType;
  setIsEdit: Function;
  deleteProduct: Function;
  setIsModalOpen: Function;
  setCurrentProduct: Function;
}

function ProductCard({
  product,
  setIsEdit,
  deleteProduct,
  setIsModalOpen,
  setCurrentProduct,
}: ProductCardProps) {
  return (
    <div className="max-w-[290px] w-full rounded-xl overflow-hidden">
      <div className=" bg-[url('/productCover.png')] bg-cover bg-center min-h-[180px]"></div>
      <div className="bg-white p-4">
        <h1 className="mb-4 text-xl font-semibold">{product.name}</h1>
        <div className="mb-4 text-[#e21c23] flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h1>{product.price}</h1>
        </div>
        <div className="flex gap-3 justify-end">
          <div
            className="text-sm px-4 py-1 rounded-lg text-[#2374E1] hover:cursor-pointer border-[1px] border-[#2374E1] hover:bg-[#2374E1] hover:text-white"
            onClick={() => {
              setIsEdit(true), setIsModalOpen(true), setCurrentProduct(product);
            }}
          >
            Edit
          </div>
          <div
            className="text-sm px-4 py-1 rounded-lg text-[#e21c23] hover:cursor-pointer border-[1px] border-[#e21c23] hover:bg-[#e21c23] hover:text-white"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
