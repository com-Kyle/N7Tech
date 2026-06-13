import { ServicePage } from "@/components/service-page";
import { APP_SERVICE } from "@/lib/services";

export const metadata = {
  title: "App Services — N7 Technologies",
  description:
    "Apps, end to end — built, improved, and tested. N7 Technologies designs, builds, refactors, and hardens web and mobile apps on a modern, AI-native stack. Starting at $2,500.",
};

export default function AppServicesPage() {
  return <ServicePage service={APP_SERVICE} />;
}
