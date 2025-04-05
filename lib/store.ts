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
import RealWeddingSlice from "./features/venue/RealWeddingSlice";
import VenueImageSlice from "./features/venue/VenueImageSlice";
import VenueThemeSlice from "./features/venue/VenueThemeSlice";
import GlobalPresenceSlice from "./features/contact/GlobalPresenceSlice";
import ContactFooterSlice from "./features/contact/ContactFooterSlice";
import EventsSlice from "./features/EventsSlice";
import VenueHeaderImageSlice from "./features/venue/VenueHeaderImageSlice";
import LoadingSlice from "./features/LoadingSlice";
    
const rootReducer = combineReducers({
    "EventSlice": EventSlice,
    "TestimonialSlice": TestimonialSlice,
    "GallerySlice": GallerySlice,
    "AboutGallerySlice": AboutGallerySlice,
    "AwardSlice": AwardSlice,
    "TeamSlice": TeamSlice,
    "RealWeddingSlice": RealWeddingSlice,
    "VenueImageSlice": VenueImageSlice,
    "VenueThemeSlice": VenueThemeSlice,
    "GlobalPresenceSlice": GlobalPresenceSlice,
    "ContactFooterSlice": ContactFooterSlice,
    "EventsSlice": EventsSlice,
    "VenueHeaderImageSlice": VenueHeaderImageSlice,
    "LoadingSlice": LoadingSlice
})

export const store = configureStore({
    reducer: rootReducer
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;