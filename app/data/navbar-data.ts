import { Contact, Fullscreen, GemIcon, Globe2, LayoutDashboard, Lightbulb, MapPin, MapPinHouse, MapPlusIcon, SearchCheckIcon, StarHalf, User2, UtensilsCrossed, Wind } from "lucide-react";

export const menuItems = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "About", href: "/about", icon: User2 },
    { name: "Contact", href: "/contact", icon: Contact },
    { name: "Destination", href: "/destination", icon: MapPin },
    { name: "Venue", href: "/venue", icon: MapPinHouse },
    { name: "Real Wedding", href: "/real-wedding", icon: GemIcon },
    { name: "Venue Search Page", href: "/search-venue", icon: SearchCheckIcon },
    { name: "Experience", href: "/experience", icon: Lightbulb },
    { name: "Location", href: "/location", icon: MapPlusIcon },
    { name: "Capacity", href: "/capacity", icon: Fullscreen },
    { name: "Catering", href: "/catering", icon: UtensilsCrossed },
    { name: "AQI", href: "/aqi", icon: Wind },
    { name: "Google Rating", href: "/google-rating", icon: StarHalf },
    { name: "States", href: "/states", icon: Globe2 },
];