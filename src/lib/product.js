// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "featured") {
    const featuredProducts = finalProducts.filter((single) => single.featured);
    return featuredProducts.slice(0, limit ? limit : featuredProducts.length);
  }
  if (type && type === "deal") {
    const dealProducts = finalProducts.filter((single) => single.dealEnd);
    return dealProducts.slice(0, limit ? limit : dealProducts.length);
  }
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "popular") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.saleCount - a.saleCount;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "topRated") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.rating - a.rating;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "sale") {
    const saleItems =
      finalProducts &&
      finalProducts.filter((single) => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return (
    finalProducts &&
    finalProducts.slice(0, limit ? limit : finalProducts.length)
  );
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : price;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
// export const getSortedProducts = (products, sortType, sortValue) => {
//   let sortedProducts = [...products];
//   if (products && sortType && sortValue) {
//     if (sortType === "sizes") {
//       sortedProducts = sortedProducts.filter(
//         (product) => product.size === sortValue
//       );
//     }
//     if (sortType === "sinks") {
//       sortedProducts = sortedProducts.filter(
//         (product) => product.sinks === sortValue
//       );
//     }
//     if (sortType === "mounts") {
//       sortedProducts = sortedProducts.filter(
//         (product) => product.mount === sortValue
//       );
//     }
//     if (sortType === "kitParts") {
//       sortedProducts = sortedProducts.filter(
//         (product) => product.storage_kit_part === sortValue
//       );
//     }
//     if (sortType === "materials") {
//       sortedProducts = sortedProducts.filter(
//         (product) => product.storage_material === sortValue
//       );
//     }
//   }

//   return sortedProducts;
// };

export const sortColors = (colors) => {
  return colors.sort((a, b) => {
    if (a.price_type === "normal" && b.price_type === "supreme") {
      return -1;
    }
    if (a.price_type === "supreme" && b.price_type === "normal") {
      return 1;
    }
    return a.price - b.price;
  });
};

export const getSortedProducts = (products, sortParams) => {
  if (!Array.isArray(products)) {
    // console.error("Expected products to be an array");
    return []; // Return an empty array if products is not iterable
  }

  let sortedProducts = [...products];

  // Apply each sort filter
  if (products && sortParams) {
    Object.keys(sortParams).forEach((sortType) => {
      const sortValue = sortParams[sortType];
      if (sortValue) {
        if (sortType === "sizes") {
          sortedProducts = sortedProducts.filter(
            (product) => product.size === sortValue
          );
        }
        if (sortType === "sinks") {
          sortedProducts = sortedProducts.filter(
            (product) => product.sinks === sortValue
          );
        }
        if (sortType === "mounts") {
          sortedProducts = sortedProducts.filter(
            (product) => product.mount === sortValue
          );
        }
        if (sortType === "kitParts") {
          // console.log(products)
          sortedProducts = sortedProducts.filter(
            (product) => product.storage_kit_part === sortValue
          );
        }
        if (sortType === "materials") {
          sortedProducts = sortedProducts.filter(
            (product) => product.storage_material === sortValue
          );
        }
      }
    });
  }

  return sortedProducts;
};

export const getSortedCountertopProducts = (products) => {
  const sortedProducts = products.sort((a, b) => {
    // First, sort by size in ascending order
    if (a.size !== b.size) {
      return a.size - b.size;
    }

    // Then sort by type, with 'classic' first and 'slim' second
    if (
      (a.type === "Classic" || a.type === "كلاسيكي") &&
      (b.type === "Slim" || b.type === "ضئيله")
    ) {
      return -1;
    }
    if (
      (a.type === "Slim" || a.type === "ضئيله") &&
      (b.type === "Classic" || b.type === "كلاسيكي")
    ) {
      return 1;
    }

    return 0;
  });

  return sortedProducts;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter((v, i, self) => {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual element object
const getIndividualColorObjectArray = (array) => {
  let individualObjectArray = array.filter((v, i, self) => {
    return (
      i ===
      self.findIndex(
        (t) => t.colorName === v.colorName && t.colorCode === v.colorCode
      )
    );
  });
  return individualObjectArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  var individualProductCategories = [];
  var obj = {};
  var newArr = [];

  function countItems(productCategories, val) {
    var count = 0,
      i;
    while ((i = productCategories.indexOf(val, i)) != -1) {
      ++count;
      ++i;
    }
    return count;
  }

  productCategories.forEach((item) => {
    let count = countItems(productCategories, item);
    var objValues = Object.values(obj);
    newArr.push(objValues[0]);
    if (newArr.indexOf(item) !== -1) return;
    obj = {
      name: item,
      count: count,
    };
    individualProductCategories.push(obj);
  });
  return individualProductCategories;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get individual Dimensions
export const getIndividualDimension = (products) => {
  let productDimensions = [];
  products &&
    products.map((product) => {
      return product.size && productDimensions.push(product.size);
    });

  const individualProductDimensions = getIndividualItemArray(
    productDimensions
  ).sort((a, b) => a - b);
  return individualProductDimensions;
};

// get individual Sinks
export const getIndividualSink = (products) => {
  let productSinks = [];
  products &&
    products.map((product) => {
      return product.sinks && productSinks.push(product.sinks);
    });

  const individualProductSinks = getIndividualItemArray(productSinks);
  return individualProductSinks;
};

// get individual Mount
export const getIndividualMount = (products) => {
  let productMounts = [];
  products &&
    products.map((product) => {
      return product.mount && productMounts.push(product.mount);
    });

  const individualProductMounts = getIndividualItemArray(productMounts);
  return individualProductMounts;
};

export const getIndividualKitParts = (products) => {
  let productKitParts = [];
  products &&
    products.map((product) => {
      return (
        product.storage_kit_part &&
        productKitParts.push(product.storage_kit_part)
      );
    });

  const individualProductKitParts = getIndividualItemArray(productKitParts);
  return individualProductKitParts;
};
export const getIndividualMaterials = (products) => {
  let productMaterials = [];
  products &&
    products.map((product) => {
      return (
        product.storage_material &&
        productMaterials.push(product.storage_material)
      );
    });

  const individualProductMaterials = getIndividualItemArray(productMaterials);
  return individualProductMaterials;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push({
            colorName: single.color,
            colorCode: single.colorCode,
          });
        })
      );
    });
  const individualProductColors = getIndividualColorObjectArray(productColors);
  return individualProductColors;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e, widgetClass) => {
  const filterButtons = document.querySelectorAll(`.${widgetClass} button`);
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};
// export const setActiveSort = (e) => {
//   const filterButtons = document.querySelectorAll(
//     ".widget__categories button, .widget__sizes button, .widget__sinks button, .widget__colors button, .widget__tags button"
//   );
//   filterButtons.forEach((item) => {
//     item.classList.remove("active");
//   });
//   e.currentTarget.classList.add("active");
// };

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".products-view button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};
