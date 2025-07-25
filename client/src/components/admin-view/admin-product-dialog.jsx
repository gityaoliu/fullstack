import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  updateProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  productCode: "",
};

function AdminProductDialog({
  open,
  setOpen,
  isEditMode = false,
  currentEditedId = null,
  setCurrentEditedId,
  defaultFormData = null,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // ✅ 校验表单
  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "salePrice")
      .every((key) => formData[key] !== "");
  }

  // ✅ 表单提交逻辑：区分添加 / 编辑
  async function onSubmit(event) {
    event.preventDefault();

    if (imageLoadingState || !uploadedImageUrl) {
      toast({ title: "Please wait for image upload to complete." });
      return;
    }

    let actionResponse;
    if (isEditMode && currentEditedId) {
      actionResponse = await dispatch(
        updateProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: uploadedImageUrl, // ✅ 合并 image 字段
          },
        })
      );
      
    } else {
      actionResponse = await dispatch(
        addNewProduct({
          formData,
          imageUrl: uploadedImageUrl,
        })
      );
    }

    if (actionResponse?.payload?.success) {
      toast({
        title: isEditMode ? "Product updated successfully" : "Product added successfully",
      });

      dispatch(fetchAllProducts());
      dispatch(
        fetchAllFilteredProducts({
          filterParams: {},
          sortParams: "price-lowtohigh",
        })
      );

      setOpen(false);
      setFormData(initialFormData);
      setImageFile(null);
      setUploadedImageUrl("");
      setCurrentEditedId(null); // ✅ 重置当前编辑状态
    }
  }

  // ✅ 初始化：编辑时填入默认数据
  useEffect(() => {
    if (open) {
      if (isEditMode && defaultFormData) {
        setFormData({
          ...defaultFormData,
        });
        setUploadedImageUrl(defaultFormData.image || "");
      } else {
        setFormData(initialFormData);
        setImageFile(null);
        setUploadedImageUrl("");
      }
    }
  }, [open, isEditMode, defaultFormData]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "Edit Product" : "Add New Product"}</SheetTitle>
        </SheetHeader>

        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={isEditMode}
        />

        <div className="py-6">
          <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText={isEditMode ? "Update" : "Add"}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid() || imageLoadingState}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AdminProductDialog;
