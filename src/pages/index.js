import PublicLayout from "@/components/Auth/PublicLayout";
import TopContent from "@/components/Home/TopContent";
import PromoSection from "@/components/Home/PromoSection";
import PropertyList from "@/components/Properties/PropertyList";
export default function Home() {
  return (
    <div className="mx-10 my-10">
      <TopContent />
      <PromoSection />
      <PropertyList />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>;
};
