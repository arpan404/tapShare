type ACTION = {
  setProgress: (progress: STATE["progress"]) => void;
  setLoading: (loading: STATE["loading"]) => void;
  setIsReceiverValid: (isReceiverValid: STATE["isReceiverValid"]) => void;
  setReceiverEmail: (email: string) => void;
  setFiles: (files: STATE["files"]) => void;
  setIpAddress: (ip: STATE["ipAddress"]) => void;
  setShowFireButton: (toShow: STATE["showFireButton"]) => void;
  setToasterData: (data: STATE["toasterData"]) => void;
  setCurrentReceiverEmail: (email: string) => void;
};
type STATE = {
  loading: boolean;
  progress: number;
  showFireButton: boolean;
  files: Array<File>;
  ipAddress: string | null;
  receiverEmail: Array<string>;
  isReceiverValid: boolean;
  toasterData: {
    open: boolean;
    message: string;
    severity: "warning"|undefined;
  };
  currentReceiverEmail: string;
};
export { type ACTION, type STATE };
