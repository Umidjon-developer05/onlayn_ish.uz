import { useSession } from "next-auth/react";
import Product from "../_components/Product";

export default function NewProduct() {
  const session = useSession();
  if (session?.status === "authenticated") {
    return (
      <>
        <section className="p-4">
          <div>
            <Product />
          </div>
        </section>
      </>
    );
  }
}
