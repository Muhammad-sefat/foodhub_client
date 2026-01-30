import { FeaturedMeals } from "@/components/home/FeaturedMeals";
import { HomeCategories } from "@/components/home/HomeCategories";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <FeaturedMeals />
      <HowItWorks />
    </>
  );
}
