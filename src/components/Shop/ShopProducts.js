import Link from "next/link";
import { ProductGridListWrapper } from "../../components/ProductThumb";

const ShopProducts = ({ products, layout, productType }) => {
  return (
    <div className="shop-products">
      <ProductGridListWrapper
        products={products}
        bottomSpace="space-mb--50"
        layout={layout}
        productType={productType}
      />
    </div>
  );
};

export default ShopProducts;
