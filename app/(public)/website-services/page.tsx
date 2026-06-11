import { ServicePage } from "@/components/service-page";
import { WEBSITE_SERVICE } from "@/lib/services";

export const metadata = {
  title: "Website Services — N7 Technologies",
  description:
    "Websites that work — built, improved, and tested. N7 Technologies designs, builds, optimizes, and hardens fast, modern websites. Starting at $499.",
};

export default function WebsiteServicesPage() {
  return <ServicePage service={WEBSITE_SERVICE} />;
}
