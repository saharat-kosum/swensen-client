"use client";
import ProductModal from "@/components/productModal";
import { useEffect, useState } from "react";
import { ProductType } from "../type";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "@/components/loading";
import ProductCard from "@/components/productCard";
import { useRouter } from "next/navigation";

const defaultProduct = {
  name: "",
  price: 1,
};

function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<ProductType>(defaultProduct);
  const [allProduct, setAllProduct] = useState<ProductType[]>([]);
  const prefixURL = process.env.NEXT_PUBLIC_PREFIX_URL;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (token && token.length > 0) {
      getProduct();
    } else {
    router.push("/");
    }
  }, []);

  const productChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseInt(value) : value,
    }));
  };

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${prefixURL}/product`);
      if (response.status === 200) {
        setAllProduct(response.data);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        Swal.fire({
          title: "Get Product Failed",
          text: err.response?.data.error,
          icon: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async () => {
    if (!currentProduct.name || !currentProduct.price) {
      return Swal.fire({
        title: "Please fill all data",
        icon: "error",
      });
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${prefixURL}/product/add`,
        currentProduct
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Add Product Complete",
          icon: "success",
        });
        allProduct.push(response.data);
        setIsModalOpen(false);
        setCurrentProduct(defaultProduct);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        Swal.fire({
          title: "Add Product Failed",
          text: err.response?.data.error,
          icon: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async () => {
    if (!currentProduct.name || !currentProduct.price) {
      return Swal.fire({
        title: "Please fill all data",
        icon: "error",
      });
    }

    if (currentProduct.id) {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${prefixURL}/product/${currentProduct.id}/update`,
          currentProduct
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Update Product Complete",
            icon: "success",
          });
          setAllProduct((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
              product.id === currentProduct.id ? response.data : product
            );
            return updatedProducts;
          });
          setIsModalOpen(false);
          setCurrentProduct(defaultProduct);
        }
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          Swal.fire({
            title: "Add Product Failed",
            text: err.response?.data.error,
            icon: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteProduct = async (id: number) => {
    Swal.fire({
      title: "Are you sure to delete this product ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .delete(`${prefixURL}/product/${id}/delete`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Delete Product Complete",
                icon: "success",
              });
              const filterProducts = allProduct.filter(
                (product) => product.id !== id
              );
              setAllProduct(filterProducts);
            }
          })
          .catch((err) => {
            console.error(err);
            if (axios.isAxiosError(err)) {
              Swal.fire({
                title: "Add Product Failed",
                text: err.response?.data.error,
                icon: "error",
              });
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <main className="pt-[102px] lg:pt-[72px] grow xl:max-w-[1252px] mx-auto w-full container">
      {isLoading && <Loading />}
      <ProductModal
        isModalOpen={isModalOpen}
        isEdit={isEdit}
        setIsModalOpen={setIsModalOpen}
        editProduct={editProduct}
        addProduct={addProduct}
        currentProduct={currentProduct}
        productChangeHandle={productChangeHandle}
        setIsEdit={setIsEdit}
      />
      <div className="mt-8 mx-4 mb-14">
        <h1 className="sm:text-3xl text-2xl font-medium text-center">
          Product Management
        </h1>
        <div
          className="my-8 hover:cursor-pointer rounded-[50px] px-6 py-1 font-light border-[1px] border-[#e21c23] text-[#e21c23] w-fit"
          onClick={() => {
            setIsModalOpen(true),
              setIsEdit(false),
              setCurrentProduct(defaultProduct);
          }}
        >
          Add new
        </div>
        {allProduct.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {allProduct.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                setIsEdit={setIsEdit}
                deleteProduct={deleteProduct}
                setIsModalOpen={setIsModalOpen}
                setCurrentProduct={setCurrentProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-xl flex flex-col justify-center items-center gap-2 mt-40">
            <div>
              {/* No Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <h1>No product yet</h1>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPage;
