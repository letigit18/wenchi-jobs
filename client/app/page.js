import Image from "next/image";
import Hero from "@/components/Hero/page";
import Category from "@/components/Category/page";
import Services from "@/components/Services/page";
export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Services />
    </>
  );
}
