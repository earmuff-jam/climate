import PublicLayout from "@/components/Auth/PublicLayout";
import PromoSection from "@/components/Home/PromoSection";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack>
      <PromoSection />
    </Stack>
  );
}

Home.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>;
};
