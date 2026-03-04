import Hero from "../components/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Trending from "../components/Trending";
import Creators from "../components/Creators";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

export default function Home() {
  const { revealed, reg } = useScrollReveal();

  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
        <main>
          <Hero revealed={revealed} reg={reg} />
          <Stats revealed={revealed} reg={reg} />
          <Features revealed={revealed} reg={reg} />
          <Trending revealed={revealed} reg={reg} />
          <Creators revealed={revealed} reg={reg} />
          <CTA revealed={revealed} reg={reg} />
        </main>
      </div>
    </>
  );
}
