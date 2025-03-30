"use client"

import { ReduxProvider } from "@/components/context/ReduxContext";
import AboutGalleryModal from "@/components/Modals/AboutGalleryModal";
import AwardModal from "@/components/Modals/AwardModal";
import EventModal from "@/components/Modals/EventModal";
import GalleryModal from "@/components/Modals/GalleryModal";
import TeamModal from "@/components/Modals/TeamModal";
import TestimonialModal from "@/components/Modals/TestimonialModal";
import ProtectedRoute from "@/components/ProtectedRoutes/ProtectedRoutes";
import SideNav from "@/components/SideNav/SideNav";
import Toolbar from "@/components/Toolbar/Toolbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  // const { isAuthenticated, isLoading } = useConvexAuth();

  // if (isLoading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return redirect("/");
  // }

  return (
    <div className="h-full flex">
      <SideNav />
      <main className="flex-1 h-screen overflow-y-auto relative">
        <Toolbar />
        <div className="p-6 mt-16">
          <ReduxProvider>
            <ProtectedRoute>
              <EventModal />
              <GalleryModal />
              <TestimonialModal />
              <AboutGalleryModal />
              <AwardModal />
              <TeamModal />
              {children}
            </ProtectedRoute>
          </ReduxProvider>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;