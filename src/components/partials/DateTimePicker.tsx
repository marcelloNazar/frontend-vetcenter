import React, { useState } from "react";
import DatePicker from "react-datepicker";
impo
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, Controller } from "react-hook-form";


export const DateTimePiker = () => {
  return (
    <DatePicker selected={new Date()} onChange={(date: Date) => {}} />
  );
};