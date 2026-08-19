import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { IMEIForm } from "@/components/IMEIForm";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Phone Authenticity by IMEI — TruePhone" },
      {
        name: "description",
        content:
          "Enter a 15-digit IMEI or serial number to check whether a phone is an original device and see its warranty status.",
      },
      { property: "og:title", content: "Verify Phone Authenticity by IMEI — TruePhone" },
      {
        property: "og:description",
        content: "Check any handset's IMEI for authenticity and warranty coverage.",
      },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" /> Authenticity checker
        </span>
        <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
          Check if a phone is original
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Enter the 15-digit IMEI or serial number printed on the box or shown by dialing *#06#.
        </p>
      </div>

      <div className="mt-10">
        <IMEIForm />
      </div>
    </div>
  );
}
