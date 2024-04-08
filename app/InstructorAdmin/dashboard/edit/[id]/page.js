"use client";
import Product from "../../_components/Product";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const pathname = usePathname();
  const [item, setItem] = useState();
  const id = pathname.split("/")[4];
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/work?id=" + id)
      .then((response) => {
        setProductInfo(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching product info:", error);
      });
  }, [id]);

  useEffect(() => {
    if (productInfo && productInfo.length > 0) {
      productInfo?.forEach((element, index) => {
        setItem(element);
      });
    }
  }, [productInfo]);

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
        {item && (
          <Product
            _id={item?._id}
            title={item?.title}
            desription={item?.desription}
            text={item?.text}
            Date={item?.Date}
            category={item?.category}
            price={item?.price}
          />
        )}
      </div>
    </div>
  );
}
