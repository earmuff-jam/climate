import PublicLayout from "@/components/Auth/PublicLayout";
import PromoSection from "@/components/Home/PromoSection";
export default function Home() {
  return (
    <>
      <PromoSection />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>;
};
