"use client";

import React from "react";
import { Provider } from "react-redux";
import { AddNewLandFormContent } from "./features/AddNewLandForm";
import { ImageFilesProvider } from "./features/ImageFilesContext";
import { store } from "./features/store";

export default function AddNewLandPage() {
  return (
    <Provider store={store}>
      <ImageFilesProvider>
        <div className="bg-white flex flex-col pb-12">
          <AddNewLandFormContent />
        </div>
      </ImageFilesProvider>
    </Provider>
  );
}
