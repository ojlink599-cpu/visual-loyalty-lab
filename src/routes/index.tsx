import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Hero } from "@/components/landing/Hero";
import { SmartPaste, Financial, AssetData, Marketing, CRM, InvestorExperience, Enterprise } from "@/components/landing/Features";
import { ReportStudio, Pricing, Faq, FinalCta, Footer } from "@/components/landing/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عقاري AI — من بيانات العقار إلى قرار استثماري أوضح" },
      { name: "description", content: "الصق إعلان العقار واحصل على تحليل مالي وتقرير استثماري بهوية مكتبك ورابط مستثمر تفاعلي. يدعم الريال والجنيه." },
      { property: "og:title", content: "عقاري AI — ذكاء عقاري للمسوقين والمكاتب" },
      { property: "og:description", content: "تحليل مالي، تقارير PDF احترافية، ورابط مستثمر بدون حساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SmartPaste />
        <Financial />
        <AssetData />
        <Marketing />
        <CRM />
        <ReportStudio />
        <InvestorExperience />
        <Enterprise />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
