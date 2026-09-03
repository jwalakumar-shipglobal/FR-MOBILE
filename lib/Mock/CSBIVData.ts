import { KeyboardTypeOptions } from "react-native";

type AddressFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isRequired?: boolean;
  keyBoardType?: KeyboardTypeOptions;
};

const ADDRESS_FIELDS: AddressFieldProps[] = [
  {
    name: "address1",
    label: "Address 1",
    placeholder: "Enter Address 1 ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "address2",
    label: "Address 2",
    placeholder: "Enter Address 2 ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "landMark",
    label: "Landmark",
    placeholder: "Enter Landmark ...",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter City ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "pinCode",
    label: "Pincode",
    placeholder: "Enter Pincode ...",
    type: "text",
    isRequired: true,
  },
];

export default ADDRESS_FIELDS;

export const BILLING_FIELDS: AddressFieldProps[] = [
  {
    name: "billing_Address1",
    label: "Address 1",
    placeholder: "Enter Address 1 ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "billing_Address2",
    label: "Address 2",
    placeholder: "Enter Address 2 ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "billing_Landmark",
    label: "Landmark",
    placeholder: "Enter Landmark ...",
    type: "text",
  },
  {
    name: "billing_City",
    label: "City",
    placeholder: "Enter City ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "billing_Pincode",
    label: "Pincode",
    placeholder: "Enter Pincode ...",
    type: "text",
    isRequired: true,
  },
];

type PersonalDetailsProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isRequired?: boolean;
  keyBoardType?: KeyboardTypeOptions;
};

export const PERSONAL_DETAILS: PersonalDetailsProps[] = [
  {
    name: "fname",
    label: "First Name",
    placeholder: "Enter First Name ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "lname",
    label: "Last Name",
    placeholder: "Enter Last Name ...",
    type: "text",
    isRequired: true,
  },
  {
    name: "mobile",
    label: "Mobile Number",
    placeholder: "Enter Mobile Number ...",
    type: "tel",
    keyBoardType: "phone-pad",
    isRequired: true,
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter Email ...",
    type: "email",
    keyBoardType: "email-address",
    isRequired: true,
  },
];

export const SHIPMENT_DETAILS: any = [
  {
    name: "invoice_number",
    label: "Invoice Number",
    placeholder: "Enter Invoice Number ...",
    type: "tel",
    keyBoardType: "number-pad",
  },
  {
    name: "order_id",
    label: "Order/Reference ID",
    placeholder: "Enter Order/Reference ID ...",
    type: "tel",
    isRequired: true,
    keyBoardType: "default",
  },
  {
    name: "ioss_number",
    label: "IOSS Number",
    placeholder: "Enter IOSS Number ...",
    type: "tel",
    isRequired: true,
    keyBoardType: "number-pad",
  },
];

interface ShipmentSizeProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  stxt?: string;
  keyBoardType?: KeyboardTypeOptions;
  isRequired?: boolean;
}

export const SHIPMENT_SIZE: ShipmentSizeProps[] = [
  {
    name: "dead_weight",
    label: "Dead Weight ",
    placeholder: "Eg. 1.25",
    type: "number",
    stxt: "Kg",
    keyBoardType: "number-pad",
    isRequired: false,
  },
  {
    name: "pro_length",
    label: "Length ",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
    keyBoardType: "number-pad",
  },
  {
    name: "pro_breadth",
    label: "Breadth ",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
    keyBoardType: "number-pad",
  },
  {
    name: "pro_height",
    label: "Height",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
    keyBoardType: "number-pad",
  },
];

export const SHIPMENT_PRODUCT = [
  {
    name: "item_name",
    label: "Product Name",
    placeholder: "Enter Product Name",
    type: "text",
  },
  {
    name: "item_sku",
    label: "SKU",
    placeholder: "Enter SKU ...",
    type: "tel",
    isRequired: true,
  },
  {
    name: "item_hsn",
    label: "HSN",
    placeholder: "Enter HSN ...",
    type: "tel",
    keyBoardType: "number-pad",
  },
  {
    name: "item_qty",
    label: "Qty",
    placeholder: "Enter Qty ...",
    type: "tel",
    keyBoardType: "number-pad",
  },
  {
    name: "item_unit_price",
    label: "Unit Price (INR)",
    placeholder: "Enter Unit Price ...",
    type: "tel",
    keyBoardType: "number-pad",
  },
];
