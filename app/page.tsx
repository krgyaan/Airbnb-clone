import Navbar from "@/components/base/Navbar";
import Categories from "@/components/common/Categories";
import Toast from "@/components/common/Toast";

export default async function Home() {
  return (
    <div>
      <Toast />
      <Navbar />
      <Categories />
    </div>
  )
}
