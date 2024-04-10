import React from "react";
import { Button } from "../../components/ui/button";
const Blog = () => {
  return (
    <section className="slider_section mt-10 ">
      <div className="flex container  justify-between items-center  flex-wrap">
        <div className="sm:w-[500px] flex flex-col gap-8">
          <h1 className="sm:text-5xl">
              Bizning saytimiz haqida malumot
          </h1>
          <p>
            Explicabo esse amet tempora quibusdam laudantium, laborum eaque
            magnam fugiat hic? Esse dicta aliquid error repudiandae earum
            suscipit fugiat molestias, veniam, vel architecto veritatis delectus
            repellat modi impedit sequi.
          </p>
          <div className="btn-box">
            <Button variant="outline" >
              ishlarni korish
            </Button>
          </div>
        </div>
        <div className="img-box sm:w-[600px]">
          <img src="/slider-img.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Blog;
