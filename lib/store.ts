"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EventSlice from "./features/home/EventSlice";
import TestimonialSlice from "./features/home/TestimonialSlice";
import GallerySlice from "./features/home/GallerySlice";
import AboutGallerySlice from "./features/about/AboutGallerySlice";
import AwardSlice from "./features/about/AwardSlice";
import TeamSlice from "./features/about/TeamSlice";

const rootReducer = combineReducers({
    "EventSlice": EventSlice,
    "TestimonialSlice": TestimonialSlice,
    "GallerySlice": GallerySlice,
    "AboutGallerySlice": AboutGallerySlice,
    "AwardSlice": AwardSlice,
    "TeamSlice": TeamSlice,
})

export const store = configureStore({
    reducer: rootReducer
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;