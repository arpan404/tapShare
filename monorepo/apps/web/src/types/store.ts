type ACTION = {
  setEmailData: (email: {
    email:string,
    type:string
  }) => void;
  setProgress: (progress: number) => void;
  setLoading: (isLoading: boolean) => void;
  setIsReceiverValid: (isValid: boolean) => void;
  setReceiverEmail: (email: string) => void;
  replaceReceiverEmail: (email: string) => void;
  setFiles: (files: Array<string>) => void;
  setIpAddress: (ip: string) => void;
};
type STATE = {
  loading: boolean;
  progress: number;
  showFireButton: boolean;
  files: Array<string>;
  ipAddress: string | null;
  emailData: Array<{
    value: string;
    type: string;
  }>;
  receiverEmail: Array<string>;
  isReceiverValid: boolean;
  validEmailToAdd: boolean;
};
export { type ACTION, type STATE };