interface DELIVERY_OPTIONS {
  to: string;
  subject?: string;
  text: string;
}

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
export { type DELIVERY_OPTIONS, type MulterFile };
