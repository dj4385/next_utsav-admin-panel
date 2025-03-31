import { Contact, LayoutDashboard, Lightbulb, MapPin, MapPinHouse, MapPlusIcon, User2 } from "lucide-react";

export const menuItems = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "About", href: "/about", icon: User2 },
    { name: "Contact", href: "/contact", icon: Contact },
    { name: "Destination", href: "/destination", icon: MapPin },
    { name: "Venue", href: "/venue", icon: MapPinHouse },
    { name: "Experience", href: "/experience", icon: Lightbulb },
    { name: "Location", href: "/location", icon: MapPlusIcon }
];