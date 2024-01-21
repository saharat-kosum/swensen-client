import { ProductType } from "@/app/type";
import React from "react";

interface ModalProps {
  isModalOpen: boolean;
  isEdit: boolean;
  currentProduct: ProductType;
  productChangeHandle: Function;
  setIsModalOpen: Function;
  addProduct: Function;
  editProduct: Function;
  setIsEdit: Function;
}

function ProductModal({
  isModalOpen,
  isEdit,
  currentProduct,
  productChangeHandle,
  setIsModalOpen,
  addProduct,
  editProduct,
  setIsEdit,
}: ModalProps) {
  const addOrEditHandle = () => {
    if (isEdit) {
      editProduct();
    } else {
      addProduct();
    }
  };

  if (!isModalOpen) {
    return <></>;
  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[100]">
        <div className="w-full mx-2 relative max-w-lg px-3 py-4 sm:mx-auto rounded-xl shadow-lg bg-[#f4f4f4]">
          <h3 className="mb-5 text-2xl text-center">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h3>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-600">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Product Name"
              className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
              value={currentProduct.name}
              onChange={(e) => productChangeHandle(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-gray-600">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="price"
              className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
              value={currentProduct.price}
              onChange={(e) => productChangeHandle(e)}
              required
              min={1}
            />
          </div>
          <div className="flex gap-3 justify-center">
            <div
              className="px-4 py-1 rounded-lg bg-[#2374E1] hover:cursor-pointer hover:bg-[#2374E1]/90 text-white"
              onClick={() => addOrEditHandle()}
            >
              {isEdit ? "Edit" : "Add"}
            </div>
            <div
              className="px-4 py-1 rounded-lg text-[#e21c23] hover:cursor-pointer border-[1px] border-[#e21c23] hover:bg-[#e21c23] hover:text-white"
              onClick={() => {
                setIsModalOpen(false), setIsEdit(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
