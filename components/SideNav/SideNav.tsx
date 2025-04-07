"use client"

import { menuItems } from "@/app/data/navbar-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/logo-circle.webp"

const SideNav = () => {
    const pathname = usePathname();

    return (
        <div className="flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 h-screen bg-purple-700 text-white p-5">
                <div className="flex flex-row gap-2 items-center mb-5">
                    <div className="flex items-center justify-center">
                        <Image src={logo} alt="Utsav Logo" className="rounded h-10 w-10 animateLogo" />
                    </div>
                    <h2>Utsav - Dashboard</h2>
                </div>
                <nav className="space-y-2 overflow-y-auto pr-4 max-h-[calc(100vh-120px)] custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname.includes(item.href) ? "bg-purple-800" : "hover:bg-purple-800"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    )
}

export default SideNav;