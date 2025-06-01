/*export function getProducts(productId) {
    let matchingProduct;
  
   /* products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    }); /
    productsApi()
  .then(products => {
    products.forEach(product => {
      // render product card
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

  
    return matchingProduct;
  } */

import { productsApi } from "../backend/api";

// product image
import gamepad from "../assets/media/gamepad.png";
import keyboard from "../assets/media/ak-900-01-500x500 1.png";
import gamingpads from "../assets/media/GP.png";
import monitor from "../assets/media/g27cq4-500x500 1.png";
import satin from "../assets/media/satin-jacket.png";
import curology from "../assets/media/curology-j7pKVQrTUsM-unsplash 1.png";
import chair from "../assets/media/chair.png";
import copa from "../assets/media/Copa_Sense 1.png";
import ideapad from "../assets/media/ideapad.png";
import northfaceGucci from "../assets/media/northface.png";
import duffleBag from "../assets/media/duffle-bag.png";
import bookshelf from "../assets/media/bookshelf.png";
import benz from "../assets/media/Benz.png";
import rodeo from "../assets/media/rodeo.png";
import cannon from "../assets/media/cannon.png";
import gammaxx from "../assets/media/gammaxx.png";
import iphoneImg from "../assets/media/iphone14pro1.jpeg";
import samsungImg from "../assets/media/flipsix.png";
import iwatchImg from "../assets/media/iwatch.png";
import ps5Img from "../assets/media/ps5.png";
import macbookImg from "../assets/media/macbook.png";
import boomBoxByJBL from "../assets/media/JBL-BOOMBOX.png";
import echo from "../assets/media/echo.png";
import intense from "../assets/media/intense.png";

export async function getProducts(productId) {
  try {
    const products = await productsApi(); // fetch all products
    const matchingProduct = products.find(
      (product) => product.id === productId
    );
    return matchingProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
export const products = [
  {
    id: "vAh1--mj23mn-",

    image: northfaceGucci,
    price: "$340",
    item: "The North Coat",
    slashPrice: "$380",
    rating: [
      {
        one: `<i class="bi bi-star-fill"></i>`,
      },
    ],
  },
  {
    id: "b1-gucci4-91f2",

    image: duffleBag,
    price: "$980",
    item: "Gucci Duffle Bag",
    slashPrice: "$800",
    rating: [{}],
  },
  {
    id: "gammax-yc67ug5",

    image: gammaxx,
    price: "$160",
    item: "RGB Liquid CPU Cooler",
    slashPrice: "$170",
    rating: [{}],
  },
  {
    id: "sam4-9d87ek",

    image: bookshelf,
    price: "$180",
    item: "Small Bookself",
    slashPrice: "$205",
    rating: [{}],
  },
  {
    id: "car-2electric444",
    image: benz,
    price: "$960",
    item: "Kids Electric Car",
    slashPrice: "$1200",
    rating: [{}],
  },
  {
    id: "dog--mj123mn",

    image: rodeo,
    price: "$100",
    item: "Breed Dry Dog Food ",

    rating: [
      {
        one: `<i class="bi bi-star-fill"></i>`,
      },
    ],
  },
  {
    id: "eos-250d-91g4",

    image: cannon,
    price: "$2180",
    item: "Cannon EOS DSLR Camera",
    rating: [{}],
  },
  {
    id: "asus-67oap8",

    image: ideapad,
    price: "$700",
    item: "ASUS FHD Gaming Laptop",
    rating: [{}],
  },
  {
    id: "benz-987hgy98",

    image: benz,
    price: "$999",
    item: "Kids Electric Car",
    rating: [{}],
  },
  {
    id: "satin-1010hga",
    image: satin,
    price: "$440",
    item: "Versace Satin Jacket",
    rating: [{}],
  },
  {
    id: "jammer-98bta",
    image: "../media/gammaxx-l240-argb-1-500x500 1.png",
    price: "$200",
    item: "RGB Multicolor Gammaxx",
    rating: [{}],
  },
  {
    id: "copa-cr7",
    image: copa,
    price: "$830",
    item: "CR7 Special Edition",
    rating: [{}],
  },
  {
    id: "usb-gamepad-872",
    image: gamingpads,
    price: "$660",
    item: "GP11 Shooter USB Gamepad",
    rating: [{}],
  },
  {
    id: "nivea-7253hais",
    image: curology,
    price: "$500",
    item: "Nivea Body Lotion",
    rating: [{}],
  },
  {
    id: "savoy-hsg963bs",
    image: duffleBag,
    price: "$960",
    item: "Gucci Pinksweat Bag",
    rating: [{}],
  },
  {
    id: "av1--dq0mn--",
    discount: "-40%",
    image: gamepad,
    price: "$260",
    item: "Havit USB Gamepad",
    slashPrice: "$360",
    rating: [
      {
        one: `<i class="bi bi-star-fill"></i>`,
      },
    ],
  },
  {
    id: "bo1-9z71fn2t",
    discount: "-35%",
    image: keyboard,
    price: "$980",
    item: "AK-900 Wired Keyboard",
    slashPrice: "$1160",
    rating: [{}],
  },
  {
    id: "bt1-fa1u69g5",
    discount: "-30%",
    image: monitor,
    price: "$370",
    item: "IPS LCD Gaming Monitor",
    slashPrice: "$410",
    rating: [{}],
  },
  {
    id: "as3-um9dvdek",
    discount: "-40%",
    image: satin,
    price: "$600",
    item: "LV Maestro Hoodie",
    slashPrice: "$675",
    rating: [{}],
  },
  {
    id: "co9--2thkumb",
    discount: "-40%",
    image: curology,
    price: "$500",
    item: "Curology Product Set",
    slashPrice: "$530",
    rating: [{}],
  },
  {
    id: "lt4-hsvcn6b-",
    discount: "-70%",
    image: chair,
    price: "$475",
    item: "S-Series Comfort Chair",
    slashPrice: "$500",
    rating: [{}],
  },
  {
    id: "mn7-pdxdoss-",
    discount: "-55%",
    image: copa,
    price: "$1175",
    item: "Jr. Zoom Soccer Cleat",
    slashPrice: "$1250",
    rating: [{}],
  },
  {
    id: "br5-9nsy1vxv",
    discount: "-25%",
    image: ideapad,
    price: "$700",
    item: "ASUS FHD Gaming Laptop",
    slashPrice: "$750",
    rating: [{}],
  },

  {
    id: "apple-14-pro",
    discount: "-15%",
    image: iphoneImg,
    price: "$999",
    item: "IPhone 14 Pro",
  },
  {
    id: "sam-sung-flip",
    discount: "-25%",
    image: samsungImg,
    price: "$499",
    item: "Samsung Flip 6",
  },
  {
    id: "apple-i-watch",
    discount: "-25%",
    image: iwatchImg,
    price: "$199",
    item: "Apple iWatch Series 6",
  },
  {
    id: "play-station-5",
    discount: "-25%",
    image: ps5Img,
    price: "$899",
    item: "Playstation 5",
  },
  {
    id: "apple-mac-book",
    discount: "-25%",
    image: macbookImg,
    price: "$1499",
    item: "Macbook Air",
  },
  {
    id: "jbl-boom-box",
    item: "JBL BoomBox",
    image: boomBoxByJBL,
    price: "$199",
  },
  {
    id: "amazon-echo-234",
    image: echo,
    item: "Amazon Echo Wireless Speaker",
    price: "$99",
  },
  {
    id: "gucci-intense-007",
    image: intense,
    item: "Gucci Intense 007 Edition",
    price: "$49",
  },
];
