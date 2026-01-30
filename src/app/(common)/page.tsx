import { FeaturedMeals } from "@/components/common/home/FeaturedMeals";
import { HomeCategories } from "@/components/common/home/HomeCategories";
import { HomeHero } from "@/components/common/home/HomeHero";
import { HowItWorks } from "@/components/common/home/HowItWorks";

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
