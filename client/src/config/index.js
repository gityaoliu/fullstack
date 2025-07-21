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

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "New Arrivals",
    label: "New Arrivals",
    path: "/shop/listing",
  },
  {
    id: "Trendy Styles",
    label: "Trendy Styles",
    path: "/shop/listing",
  },
  {
    id: "Minimalist",
    label: "Minimalist",
    path: "/shop/listing",
  },
  {
    id: "Luxury & Glitter",
    label: "Luxury & Glitter",
    path: "/shop/listing",
  },
  {
    id: "Dark & Edgy",
    label: "Dark & Edgy",
    path: "/shop/listing",
  },
  {
    id: "French Tips",
    label: "French Tips",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Trendy_Styles: "Trendy_Styles",
  Minimalist: "Minimalist",
  Luxury_Glitter: "Luxury & Glitter",
  French_Tips: "French Tips",
  Dark_Edgy: "Dark & Edgy",
};

export const brandOptionsMap = {
  Red: "Red Collection",
  Black: "Black Collection",
  Blue: "Blue Collection",
  Green: "Green Collection",
  Yellow: "Yellow Collection",
  "Nude": "Nude Collection",
};

export const filterOptions = {
  category: [
    { id: "Trendy Styles", label: "Trendy Styles" },
    { id: "Minimalist", label: "Minimalist" },
    { id: "Luxury & Glitter", label: "Luxury & Glitter" },
    { id: "French Tips", label: "French Tips" },
    { id: "Dark & Edgy", label: "Dark & Edgy" },
  ],
  Color: [
    { id: "Red Collection", label: "Red Collection" },
    { id: "Black Collection", label: "Black Collection" },
    { id: "Blue Collection", label: "Blue Collection" },
    { id: "Green Collection", label: "Green Collection" },
    { id: "Yellow Collection", label: "Yellow Collection" },
    { id: "Nude Collection", label: "Nude Collection" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
