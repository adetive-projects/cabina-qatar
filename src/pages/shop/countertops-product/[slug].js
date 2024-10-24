import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../../lib/product";
import { getProducts } from "../../../lib/product";
import { LayoutOne } from "../../../layouts";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import {
  ImageGalleryLeftThumb,
  ProductDescription,
  ProductDescriptionTab,
} from "../../../components/ProductDetails";
import products from "../../../data/products.json";
import { ProductSliderTwo } from "../../../components/ProductSlider";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../data/api/api";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ProductThumbLeft = ({ product }) => {
  // const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);
  // const { compareItems } = useSelector((state) => state.compare);

  const router = useRouter();
  const { slug } = router.query;
  const [singleProduct, setSingleProduct] = useState({});
  const [allSingleProductData, setAllSingleProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getSingleProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/single-countertop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: slug,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setAllSingleProductData(data.data);
        const c =
          currentLanguage === "ar"
            ? data.data.arabic_countertops
            : data.data.english_countertops;
        setSingleProduct(c);
        setIsLoading(false);
      } else {
        console.error("Error:", data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [slug]);

  useEffect(() => {
    setSingleProduct(
      currentLanguage === "ar"
        ? allSingleProductData.arabic_countertops
        : allSingleProductData.english_countertops
    );
  }, [currentLanguage, allSingleProductData]);

  // const relatedProducts = getProducts(
  //   products,
  //   product.category[0],
  //   "popular",
  //   8
  // );
  // const discountedPrice = getDiscountPrice(
  //   product.price,
  //   product.discount
  // ).toFixed(2);

  // const productPrice = singleProduct?.price.toFixed(2);
  const cartItem = cartItems.find(
    (cartItem) => cartItem.id === singleProduct?.id
  );
  // const wishlistItem = wishlistItems.find(
  //   (wishlistItem) => wishlistItem.id === product.id
  // );
  // const compareItem = compareItems.find(
  //   (compareItem) => compareItem.id === product.id
  // );

  return (
    <LayoutOne>
      {/* breadcrumb */}
      {/* <BreadcrumbOne pageTitle={singleProduct?.name}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop/countertops">Shop</Link>
          </li>
          <li className="breadcrumb-item active">{singleProduct?.name}</li>
        </ol>
      </BreadcrumbOne> */}

      {/* product details */}
      <div className="product-details space-pt--r100 space-pb--r100">
        <Container>
          {!isLoading ? (
            <Row>
              <Col lg={6} className="space-mb-mobile-only--40">
                {/* image gallery */}
                <ImageGalleryLeftThumb product={singleProduct} />
              </Col>
              <Col lg={6}>
                {/* product description */}
                <ProductDescription
                  product={singleProduct}
                  productType={"countertops"}
                  productAllDetails={allSingleProductData}
                  // productPrice={productPrice}
                  // discountedPrice={discountedPrice}
                  cartItems={cartItems}
                  cartItem={cartItem}
                  // wishlistItem={wishlistItem}
                  // compareItem={compareItem}
                />
              </Col>
            </Row>
          ) : (
            <div style={{ marginBottom: "500px" }}>
              <div className="spinner-grow" role="status"></div>
            </div>
          )}
          {/* <Row> */}
          {/* <Col> */}
          {/* product description tab */}
          {/* <ProductDescriptionTab product={product} /> */}
          {/* </Col> */}
          {/* </Row> */}

          {/* related product slider */}
          {/* <ProductSliderTwo
            title="Related Products"
            products={relatedProducts}
          /> */}
        </Container>
      </div>
    </LayoutOne>
  );
};

export default ProductThumbLeft;

// export async function getStaticPaths() {
//   try {
//     const res = await fetch(`${apiUrl}/countertops`);
//     const products = await res.json();
//     const englishCountertops = products?.data?.english_countertops || [];
//     const paths = englishCountertops.map((product) => ({
//       params: { slug: product?.id?.toString() },
//     }));

//     return {
//       paths,
//       fallback: false,
//     };
//   } catch (error) {
//     console.error("Error:", error.message);
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// }

// export async function getStaticProps({ params }) {
//   try {
//     const res = await fetch(`${apiUrl}/single-countertop`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: params.slug,
//       }),
//     });

//     const productData = await res.json();

//     if (!productData || !productData.data) {
//       return { notFound: true };
//     }

//     const product = productData.data;

//     return {
//       props: { product },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {},
//     };
//   }
// }
