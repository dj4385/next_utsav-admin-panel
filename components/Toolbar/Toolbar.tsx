
import { useScrollTop } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProfileDropdown from "../ProfileDropDown/ProfileDropDown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { menuItems } from "@/app/data/navbar-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/logo-circle.webp"


const Toolbar = () => {

    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 bg-purple-700 text-white fixed top-0 flex items-center w-full px-4",
                scrolled && "border-b shadow-lg",
            )}
        >
            <div className="relative flex flex-row md:p-4 p-2 item-center justify-between xl:w-[82%] lg:w-[75%] md:w-[65%] w-full my-auto">
                <div className="flex items-center justify-center">
                    <div className="md:hidden flex flex-row items-center">
                        <MobileSideNavbar />
                        <div className="flex flex-row gap-2 items-center">
                            <div className="flex items-center justify-center">
                                <Image src={logo} alt="Utsav Logo" className="rounded h-4 w-4 animateLogo" />
                            </div>
                            <h2>Utsav</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <ProfileDropdown />
                </div>
            </div>
        </div>
    )
}

const MobileSideNavbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <>
            {/* Mobile Menu Button */}
            < div className="md:hidden p-2" >
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>

                        {/* <Button variant="outline"> */}
                        <Menu className="w-6 h-6" />
                        {/* </Button> */}
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 bg-gray-900 text-white">
                        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                        <nav className="space-y-2 overflow-y-auto pr-4 max-h-[calc(100vh-120px)] mobile-custom-scrollbar">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"
                                        }`}
                                    onClick={() => setOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div >
        </>
    )
}

export default Toolbar;