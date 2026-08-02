import { useEffect, useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import MainNavbar from "./components/navigation/MainNavbar";
import NavigationTransition from "./components/navigation/NavigationTransition";
import SectionNavigation from "./components/navigation/SectionNavigation";

import ProjectCategoryPage from "./pages/ProjectCategoryPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import ProjectSectionDoor from "./sections/ProjectSectionDoor";
import ServicesSection from "./sections/ServicesSection";

interface HomeLocationState {
  scrollTo?: string;
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />

        <Route path="/projects/:categoryId" element={<ProjectCategoryPage />} />

        <Route
          path="/projects/:categoryId/:projectId"
          element={<ProjectDetailPage />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isNavigating, setIsNavigating] = useState(false);

  const navigationTimeoutRef = useRef<number | null>(null);

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Không tìm thấy section id="${sectionId}"`);
      return;
    }

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    setIsNavigating(true);

    window.setTimeout(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    navigationTimeoutRef.current = window.setTimeout(() => {
      setIsNavigating(false);
      navigationTimeoutRef.current = null;
    }, 720);
  };

  /*
    Khi đóng trang category, location state sẽ chứa:

    {
      scrollTo: 'projects'
    }

    HomePage sẽ tự cuộn về đúng phần Projects.
  */
  useEffect(() => {
    const state = location.state as HomeLocationState | null;

    if (!state?.scrollTo) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(state.scrollTo!);

      target?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      // Xóa state để refresh không tự cuộn lại.
      navigate("/", {
        replace: true,
        state: null,
      });
    }, 80);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [location.state, navigate]);

  return (
    <>
      <MainNavbar onNavigate={handleNavigate} />

      <SectionNavigation onNavigate={handleNavigate} />

      <NavigationTransition visible={isNavigating} />

      <main>
        <HeroSection onNavigate={handleNavigate} />

        <MarqueeSection />

        <AboutSection />

        <ServicesSection />

        <ProjectSectionDoor />

        <ContactSection />
      </main>
    </>
  );
}
