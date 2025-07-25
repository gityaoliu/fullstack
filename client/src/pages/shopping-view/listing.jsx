import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/common/product-tile";
import AdminProductDialog from "@/components/admin-view/admin-product-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { deleteProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [defaultFormData, setDefaultFormData] = useState(null);
  const { toast } = useToast();

  // 决定显示搜索结果还是普通商品列表
  const displayProducts = searchResults.length > 0 ? searchResults : productList;
  const isSearchMode = searchResults.length > 0;

  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems, "cartItems");

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id, // 对于游客用户，这里会是null/undefined
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // 对于游客用户，这里会获取本地存储的购物车
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDeleteProduct(productId) {
    dispatch(deleteProduct(productId)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Product deleted successfully" });
        dispatch(fetchAllProducts());
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: sort }));
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
  }, []);

  useEffect(() => {
    const createQueryString = `sort=${sort}`;
    setSearchParams(new URLSearchParams(createQueryString));
  }, [sort]);

  useEffect(() => {
    // 只有在没有搜索关键词时才获取全部商品
    if (!isSearchMode) {
      dispatch(
        fetchAllFilteredProducts({ 
          filterParams: {}, 
          sortParams: sort || "price-lowtohigh" 
        })
      );
    }
  }, [dispatch, sort, isSearchMode]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="p-4 md:p-6">
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">
            {isSearchMode ? "Search Results" : "All Products"}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {displayProducts?.length || 0} Products
            </span>

            {user?.role === "admin" && !isSearchMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentEditedId(null);
                  setDefaultFormData(null);
                  setOpenAdminDialog(true);
                }}
              >
                Add Product
              </Button>
            )}

            {!isSearchMode && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {displayProducts && displayProducts.length > 0 ? (
            displayProducts.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={{
                  ...productItem,
                  image: productItem.image || "/nail.png",
                }}
                handleAddToCart={handleAddToCart}
                isAdmin={user?.role === "admin" && !isSearchMode}
                onEditClick={(productItem) => {
                  setCurrentEditedId(productItem._id);
                  setDefaultFormData(productItem);
                  setOpenAdminDialog(true);
                }}
                handleDelete={handleDeleteProduct}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              {isSearchMode ? "No results found" : "No products found"}
            </p>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      {user?.role === "admin" && (
        <AdminProductDialog
          open={openAdminDialog}
          setOpen={setOpenAdminDialog}
          currentEditedId={currentEditedId}
          setCurrentEditedId={setCurrentEditedId}
          isEditMode={Boolean(currentEditedId)}
          defaultFormData={defaultFormData}
        />
      )}
    </div>
  );
}

export default ShoppingListing;
