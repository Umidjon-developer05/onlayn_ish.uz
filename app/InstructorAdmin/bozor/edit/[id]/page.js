"use client";
import Product from "../../_components/Product";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const pathname = usePathname();
  const [item, setItem] = useState({});
  const id = pathname.split("/")[4];
  const [productInfo, setProductInfo] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/bozor?id=" + id)
      .then((response) => {
        const data = response?.data;
        setProductInfo(data);
        setItem(data);
      })
      .catch((error) => {
        console.error("Error fetching product info:", error);
      });
  }, [id]);

  const filterData = productInfo?.find((user) => user?._id === id);
  return (
    <div className="max-sm:p-4">
      <div className="sm:flex sm:items-center sm:justify-center">
        <div className="text-center sm:text-left">
          <p className="my-4 text-xl text-red-500">
            Editing <span className="text-green-600">{item?.title}</span>
          </p>
        </div>
      </div>
      <div className="my-10 max-sm:my-12">
        {filterData && (
          <Product
            _id={filterData?._id}
            title={filterData?.title}
            description={filterData?.description}
            text={filterData?.text}
            Date={filterData?.Date}
            category={filterData?.category}
            price={filterData?.price}
          />
        )}
      </div>
    </div>
  );
}
