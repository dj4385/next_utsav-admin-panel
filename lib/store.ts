"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EventSlice from "./features/EventSlice";
import TestimonialSlice from "./features/TestimonialSlice";
import GallerySlice from "./features/GallerySlice";

const rootReducer = combineReducers({
    "EventSlice": EventSlice,
    "TestimonialSlice": TestimonialSlice,
    "GallerySlice": GallerySlice
})

export const store = configureStore({
    reducer: rootReducer
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;