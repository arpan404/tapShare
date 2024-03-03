type ACTION = {
  setProgress: (progress: number) => void;
  setLoading: (isLoading: boolean) => void;
  setIsReceiverValid: (isValid: boolean) => void;
  setReceiverEmail: (email: string) => void;
  setFiles: (files: Array<string>) => void;
  setIpAddress: (ip: string) => void;
  setShowFireButton: (toShow: boolean) => void;
};
type STATE = {
  loading: boolean;
  progress: number;
  showFireButton: boolean;
  files: Array<string>;
  ipAddress: string | null;
  receiverEmail: Array<string>;
  isReceiverValid: boolean;
};
export { type ACTION, type STATE };
