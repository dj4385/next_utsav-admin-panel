// components/Loader.tsx
'use client';
import { useAppSelector } from '@/lib/store';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from "@/public/images/logo-circle.webp"
import Image from 'next/image';

export default function Loader() {
    const loading = useAppSelector((state: any) => state.LoadingSlice.isLoading);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (loading) {
            setShow(true);
        } else {
            // Delay to avoid flicker on fast responses
            setTimeout(() => setShow(false), 1000);
        }
    }, [loading]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center">
            <div className="p-4 rounded-lg flex flex-col items-center gap-2">
                <Image src={logo} alt="logo" width={100} height={100} className="animate-spin" />
                {/* <Loader2 className="h-8 w-8 animate-spin text-purple-600" />*/}
                <p className="text-sm text-white">Loading...</p> 
            </div>
        </div>
    );
}
