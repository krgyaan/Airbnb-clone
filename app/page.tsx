import Navbar from "@/components/base/Navbar";
import Categories from "@/components/common/Categories";
import Toast from "@/components/base/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HomeCard from "@/components/common/HomeCard";

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const supabase = createServerComponentClient({ cookies });
  const query = supabase
    .from('homes')
    .select('id, title, city, image, price, country, users(metadata -> name)');
  if (searchParams?.location) {
    query.ilike("location", `%${searchParams?.location}%`)
  }
  const { data:homes } = query
  // console.log(homes)
  return (
    <div>
      <Toast />
      <Navbar />
      <Categories />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
        {
          homes && homes.length > 0 && homes.map((home: any) => <HomeCard key={home.id} home={home} />)
        }
      </div>

    </div>
  )
}
