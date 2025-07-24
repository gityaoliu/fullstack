import { Button } from "@/components/ui/button";
import home_page1 from "../../assets/home_page1.jpg";
import home_page2 from "../../assets/home_page2.jpg";
import home_page3 from "../../assets/home_page3.jpg";
import floatingIcon from "@/assets/floating-icon.png";
import { FaFireAlt, FaBolt, FaGem, FaHandSparkles, FaSkull, FaHeart } from "react-icons/fa";
import { MdOutlineUmbrella } from "react-icons/md";
import { GiClothes, GiWatch, GiBasket } from "react-icons/gi";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/common/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiFingersCrossed } from "react-icons/gi";



const localBannerList = [home_page1, home_page2, home_page3];

const categoriesWithIcon = [
  { id: "Trendy Styles", label: "Trendy Styles", icon: <FaFireAlt className="text-red-500 w-8 h-8" /> },
  { id: "Minimalist", label: "Minimalist", icon: <FaBolt className="text-blue-500 w-8 h-8" /> },
  { id: "Luxury & Glitter", label: "Luxury & Glitter", icon: <FaGem className="text-yellow-500 w-8 h-8" /> },
  { id: "French Tips", label: "French Tips", icon: <FaHandSparkles className="text-pink-500 w-8 h-8" /> },
  { id: "Dark & Edgy", label: "Dark & Edgy", icon: <FaSkull className="text-black w-8 h-8" /> },
];

const brandIcons = [
  { id: "Red Collection", label: "Red Collection", icon: <GiFingersCrossed className="text-red-500 w-8 h-8" /> },
  { id: "Black Collection", label: "Black Collection", icon: <GiFingersCrossed className="text-gray-900 w-8 h-8" /> },
  { id: "Blue Collection", label: "Blue Collection", icon: <GiFingersCrossed className="text-blue-500 w-8 h-8" /> },
  { id: "Green Collection", label: "Green Collection", icon: <GiFingersCrossed className="text-green-500 w-8 h-8" /> },
  { id: "Yellow Collection", label: "Yellow Collection", icon: <GiFingersCrossed className="text-yellow-500 w-8 h-8" /> },
  { id: "Nude Collection", label: "Nude Collection", icon: <GiFingersCrossed className="w-8 h-8" style={{ color: "#FADADD" }} /> },
];


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % localBannerList.length);
    }, 5000); // 5s
  
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
      {localBannerList.map((img, index) => (
    <div
      key={index}
      className={`${index === currentSlide ? "opacity-100" : "opacity-0"
        } absolute top-0 left-0 w-full h-full transition-opacity duration-1000`}
    >
      <img
        src={img}
        className="w-full h-full object-cover"
        alt={`Slide ${index + 1}`}
      />

      {/* ✅ 只在第一张图上展示按钮 */}
      {index === 0 && (
          <div className="absolute bottom-20 right-16 z-10">
          <Button
            onClick={() => navigate("/shop/listing")}
            className="bg-pink-500 text-white px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:bg-pink-600 transition-all"
          >
            SHOP ALL NAILS
          </Button>
        </div>
        
        )}
      </div>
  ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + localBannerList.length) % localBannerList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <FaChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % localBannerList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <FaChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {categoryItem.icon}
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Color </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandIcons.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {brandItem.icon}
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddtoCart}
                />
              ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      <a
        href="https://nailspecialist.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <img
          src={floatingIcon}
          alt="AI Nail Specialist"
          className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform"
        />
      </a>
    </div>
  );
}

export default ShoppingHome;
