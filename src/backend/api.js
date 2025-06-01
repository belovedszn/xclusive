/*export async function productsApi(id) {
  const url = id ? `/api/products/${id}` : "/api/products";
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      message: "Failed to fetch products",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();

  // If getting a single product, Mirage returns `{ product: {...} }`
  // If getting all, it returns `{ products: [...] }`
  return id ? data.product : data.products;
}


export async function productsApi(id) {
    const url = id ? `/api/products/${id}` : "/api/products";
    const res = await fetch(url);
  
    if (!res.ok) {
      throw {
        message: "Failed to fetch products",
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    const data = await res.json();
    return id ? data.product : data.products;
  }
   */

  export async function productsApi(id) {
    const url = id ? `/api/products/${id}` : "/api/products";
    const res = await fetch(url);
  
    if (!res.ok) {
      throw {
        message: "Failed to fetch products",
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    const data = await res.json();
    return id ? data.product : data.products; // returns product directly
  }
  