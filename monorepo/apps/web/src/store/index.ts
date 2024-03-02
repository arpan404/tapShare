import { create } from "zustand";
import { ACTION, STATE } from "../types/store";
export const useStore = create<ACTION & STATE>((set) => ({
  loading: false,
  progress: 0,
  showFireButton: false,
  files: [],
  emailData: [],
  receiverEmail: [],
  isReceiverValid: false,
  validEmailToAdd: false,
  ipAddress: null,
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  setValidEmailToAdd: (isValid: boolean) => set({ validEmailToAdd: isValid }),
  setEmailData: (email: { email: string; type: string }) =>
    setEmailData((set) => ({
      email: {
        ...set.emailData,
        ...email,
      },
    })),
  replaceReceiverEmail: (email) =>
    set(() => ({
      receiverEmail: email,
    })),
  setFiles: (files) => set({ files }),
  setIpAddress: (ip) => set({ ipAddress: ip }),
  setIsReceiverValid: (isValid) => set({ isReceiverValid: isValid }),
  setProgress: (progress) => set({ progress }),
  setReceiverEmail: (email) =>
    set((state) => ({
      receiverEmail: [...state.receiverEmail, email],
    })),
}));
