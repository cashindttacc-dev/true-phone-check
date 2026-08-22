import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { InspectionChecklist } from "@/components/InspectionChecklist";

export const Route = createFileRoute("/inspect")({
  head: () => ({
    meta: [
      { title: "Phone Inspection Checklist — T-Phones" },
      {
        name: "description",
        content:
          "Run through a step-by-step phone inspection checklist before buying a used device. Verify IMEI, physical condition, battery, cameras and security locks.",
      },
      { property: "og:title", content: "Phone Inspection Checklist — T-Phones" },
      {
        property: "og:description",
        content:
          "Don't get scammed. Check IMEI, physical condition, battery health, cameras and account locks before you pay.",
      },
    ],
  }),
  component: InspectPage,
});

function InspectPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <ClipboardCheck className="size-3.5 text-success" /> Pre-purchase checklist
        </span>
        <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
          Phone Inspection Checklist
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Tick every box before handing over money. Critical items must be completed for a safe purchase.
        </p>
      </div>

      <div className="mt-10">
        <InspectionChecklist />
      </div>
    </div>
  );
}
