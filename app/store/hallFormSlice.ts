import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HallFormState {
  name: string;
  reason: string;
  customReason: string;
  mobileNumber: string;
  otp: string;
  isSubmitting: boolean;
  isOtpSent: boolean;
  isOtpVerified: boolean;
}

const initialState: HallFormState = {
  name: "",
  reason: "",
  customReason: "",
  mobileNumber: "",
  otp: "",
  isSubmitting: false,
  isOtpSent: false,
  isOtpVerified: false,
};

const hallFormSlice = createSlice({
  name: "hallForm",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setReason: (state, action: PayloadAction<string>) => {
      state.reason = action.payload;
      if (action.payload !== "Others") state.customReason = "";
    },
    setCustomReason: (state, action: PayloadAction<string>) => {
      state.customReason = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobileNumber = action.payload.replace(/\D/g, "").slice(0, 10);
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setIsOtpSent: (state, action: PayloadAction<boolean>) => {
      state.isOtpSent = action.payload;
    },
    setIsOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.isOtpVerified = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setName,
  setReason,
  setCustomReason,
  setMobileNumber,
  setOtp,
  setIsSubmitting,
  setIsOtpSent,
  setIsOtpVerified,
  resetForm,
} = hallFormSlice.actions;

export default hallFormSlice.reducer;
