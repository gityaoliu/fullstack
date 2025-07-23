export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    name: "productCode",
    label: "Product Code",
    type: "text",
    placeholder: "e.g. P001",
  },

  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Trendy Styles", label: "Trendy Styles" },
      { id: "Minimalist", label: "Minimalist" },
      { id: "Luxury & Glitter", label: "Luxury & Glitter" },
      { id: "French Tips", label: "French Tips" },
      { id: "Dark & Edgy", label: "Dark & Edgy" },
    ],
  },
  {
    label: "Color Series",
    name: "Brand",
    componentType: "select",
    options: [
      { id: "Red Collection", label: "Red Collection" },
      { id: "Black Collection", label: "Black Collection" },
      { id: "Blue Collection", label: "Blue Collection" },
      { id: "Green Collection", label: "Green Collection" },
      { id: "Yellow Collection", label: "Yellow Collection" },
      { id: "Nude Collection", label: "Nude Collection" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];


