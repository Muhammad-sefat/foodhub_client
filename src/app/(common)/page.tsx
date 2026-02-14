export const dynamic = "force-dynamic";
import { FeaturedMeals } from "@/components/common/home/FeaturedMeals";
import { HomeCategories } from "@/components/common/home/HomeCategories";
import { HomeHero } from "@/components/common/home/HomeHero";
import { HowItWorks } from "@/components/common/home/HowItWorks";
import { CategoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();
  const categories = await CategoryService.getAll();
  return (
    <>
      <HomeHero user={data?.user ?? null} />
      <HomeCategories categories={categories} />
      <FeaturedMeals />
      <HowItWorks />
    </>
  );
}
