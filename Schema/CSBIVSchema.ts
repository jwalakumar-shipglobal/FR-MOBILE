import z from "zod";

export const SearchCustomerSchema = z.object({
  userId: z
    .object({
      first_name: z.string(),
      last_name: z.string(),
      phone: z.string(),
      address: z.string(),
      document: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, { message: "Please Select Customer" }),
});

export const personalDataschema = z
  .object({
    fname: z.string().nonempty("First name is required"),
    lname: z.string().nonempty("Last name is required"),
    mobile: z
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    email: z.string().email("Please enter a valid email address"),
    country: z.string().nonempty("Please select a country"),
    state: z.string().nonempty("Please select a state"),
    address1: z.string().nonempty("Address 1 is required"),
    address2: z.string().nonempty("Address 2 is required"),
    landMark: z.string().optional(),
    city: z.string().nonempty("City is required"),
    pinCode: z.string().nonempty("Pincode is required"),
    billingCheck: z.boolean(),
    billing_Country: z.string().optional(),
    billing_State: z.string().optional(),
    billing_Address1: z.string().optional(),
    billing_Address2: z.string().optional(),
    billing_Landmark: z.string().optional(),
    billing_City: z.string().optional(),
    billing_Pincode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.billingCheck) {
      if (!data.billing_Country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Country is required",
          path: ["billing_Country"],
        });
      }
      if (!data.billing_State) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required",
          path: ["billing_State"],
        });
      }
      if (!data.billing_Address1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address 1 is required",
          path: ["billing_Address1"],
        });
      }
      if (!data.billing_Address2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address 2 is required",
          path: ["billing_Address2"],
        });
      }
      if (!data.billing_City) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is Required",
          path: ["billing_City"],
        });
      }
      if (!data.billing_Pincode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PinCode Is Required",
          path: ["billing_Pincode"],
        });
      }
    }
  });

export const personalDataDefaultValue = {
  fname: "",
  lname: "",
  mobile: "",
  email: "",
  country: "",
  state: "",
  address1: "",
  address2: "",
  landMark: "",
  city: "",
  pinCode: "",
  billingCheck: true,
  billing_Country: "",
  billing_State: "",
  billing_Address1: "",
  billing_Address2: "",
  billing_Landmark: "",
  billing_City: "",
  billing_Pincode: "",
};

const ProductSchema = z.object({
  item_name: z.string().nonempty("Product name is required"),
  item_sku: z.string().optional(),
  item_hsn: z.coerce.number().refine((val) => val.toString().length === 8, {
    message: "HSN must be exactly 8 digits",
  }),
  item_qty: z.coerce.number().min(1, "Quantity must not be Zero"),
  item_unit_price: z.coerce.number().min(1, "Unit Price must not be Zero"),
  item_igst: z.string().nonempty("Select IGST"),
});

export const ShipmentinfoSchema = z.object({
  invoice_date: z.date(),
  invoice_currency: z.string().nonempty("Select currency"),
  invoice_number: z.string().nonempty("Please enter invoice number"),
  order_id: z.string().optional(),
  ioss_number: z.string().optional(),
  dead_weight: z.coerce
    .number()
    .min(0.001, "Weight must be atleast 0.01 KG")
    .max(10, "Weight cannot be more than 10 KG"),
  pro_length: z.coerce
    .number()
    .min(1, "Length must be atleast 1 cm")
    .max(120, "Length cannot be more than 120 cm"),
  pro_breadth: z.coerce
    .number()
    .min(1, "Breadth must be atleast 1 cm")
    .max(120, "Length cannot be more than 120 cm"),
  pro_height: z.coerce
    .number()
    .min(1, "Height must be atleast 1 cm")
    .max(120, "Breadth cannot be more than 120 cm"),
  products: z
    .array(ProductSchema)
    .min(1, "At least one product is required")
    .max(25, "Maximux 25 Product add Details"),
});

export const ShipmentinfoDefaultValues = {
  invoice_date: new Date(),
  invoice_currency: "",
  invoice_number: "",
  order_id: "",
  ioss_number: "",
  dead_weight: 0,
  pro_length: 0,
  pro_breadth: 0,
  pro_height: 0,
  products: [
    {
      item_name: "",
      item_sku: "",
      item_hsn: 0,
      item_qty: 1,
      item_unit_price: 1,
      item_igst: "",
    },
  ],
};
