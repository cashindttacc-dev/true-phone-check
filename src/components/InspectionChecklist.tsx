import { useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ClipboardCheck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type ChecklistItem = {
  id: string;
  label: string;
  critical?: boolean;
};

export type ChecklistSection = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

const SECTIONS: ChecklistSection[] = [
  {
    id: "identity",
    title: "Identity & Authenticity",
    items: [
      {
        id: "imei-match",
        label:
          "Dial *#06# and verify the IMEI matches the box and SIM tray.",
        critical: true,
      },
      {
        id: "warranty-check",
        label:
          "Run the IMEI through the manufacturer's official warranty checker to confirm the model.",
        critical: true,
      },
    ],
  },
  {
    id: "physical",
    title: "Physical Condition",
    items: [
      {
        id: "screen-check",
        label:
          "Inspect the screen for dead pixels, uneven backlights, and smooth touch response.",
      },
      {
        id: "repair-signs",
        label:
          "Check screws and the charging port for scratches (signs of unauthorized repair).",
      },
      {
        id: "frame-flat",
        label:
          "Verify the phone sits completely flat (no bent frame or swollen battery).",
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Battery",
    items: [
      {
        id: "battery-health",
        label:
          "Check Battery Health in settings (should ideally be 80%+ for used phones).",
      },
      {
        id: "cameras-mic-speaker",
        label:
          "Test both front/back cameras, microphone, and speakers.",
      },
      {
        id: "charge-data",
        label:
          "Ensure it charges and can transfer data when plugged into a computer.",
      },
    ],
  },
  {
    id: "software",
    title: "Software & Security",
    items: [
      {
        id: "account-lock",
        label:
          "Ensure no iCloud (Activation Lock) or Google Account (FRP) is tied to the device. Have the seller factory reset it in front of you.",
        critical: true,
      },
      {
        id: "storage-test",
        label:
          "Perform the 'Storage Test': Transfer a few large video files and play them back. (Fake phones often report 512GB but corrupt files past 32GB).",
      },
    ],
  },
];

/** Confidence-inspiring interactive phone inspection checklist. */
export function InspectionChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["identity"]));
  const [showWarning, setShowWarning] = useState(false);

  const totalItems = useMemo(
    () => SECTIONS.reduce((sum, section) => sum + section.items.length, 0),
    [],
  );

  const progress = Math.round((checked.size / totalItems) * 100);
  const isComplete = checked.size === totalItems;

  const criticalIds = useMemo(
    () =>
      SECTIONS.flatMap((section) =>
        section.items.filter((item) => item.critical).map((item) => item.id),
      ),
    [],
  );

  const criticalUnchecked = criticalIds.filter((id) => !checked.has(id));

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setShowWarning(false);
  };

  const toggleSection = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearAll = () => {
    setChecked(new Set());
    setShowWarning(false);
  };

  const handleCompleteClick = () => {
    if (criticalUnchecked.length > 0) {
      setShowWarning(true);
      // Expand sections with missing critical items so the user sees them.
      const sectionsWithMissingCritical = SECTIONS.filter((section) =>
        section.items.some((item) => item.critical && !checked.has(item.id)),
      ).map((section) => section.id);
      setExpanded((prev) => {
        const next = new Set<string>(prev);
        sectionsWithMissingCritical.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sticky progress header */}
      <div className="sticky top-[4rem] z-30 -mx-4 rounded-2xl border border-border bg-card/95 px-4 py-4 shadow-card backdrop-blur-sm sm:mx-0 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground sm:text-base">
              Inspection Progress
            </h2>
          </div>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="mt-3">
          <Progress value={progress} className="h-2.5" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {checked.size} of {totalItems} checks completed
        </p>
      </div>

      {/* Critical warning */}
      {showWarning && criticalUnchecked.length > 0 && (
        <div
          role="alert"
          className="animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 px-5 py-4 text-warning"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">Critical checks missing</p>
            <p className="mt-1 text-sm opacity-90">
              Please complete the highlighted critical items before finishing the inspection.
            </p>
          </div>
        </div>
      )}

      {/* Success banner */}
      {isComplete && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-start gap-4 rounded-2xl border border-success/40 bg-success/10 px-5 py-5 text-success">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-success">
                Inspection Complete: Device is Safe to Buy!
              </h3>
              <p className="mt-1 text-sm text-success/90">
                All identity, physical, hardware and software checks passed. You can proceed with confidence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist sections as accordions */}
      <div className="space-y-4">
        {SECTIONS.map((section) => {
          const sectionChecked = section.items.filter((item) => checked.has(item.id)).length;
          const sectionTotal = section.items.length;
          const isOpen = expanded.has(section.id);
          const hasMissingCritical = section.items.some(
            (item) => item.critical && !checked.has(item.id) && showWarning,
          );

          return (
            <div
              key={section.id}
              className={`overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 ${
                hasMissingCritical ? "border-destructive/50 ring-1 ring-destructive/20" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {sectionChecked} of {sectionTotal} completed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {sectionChecked === sectionTotal && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-success text-success-foreground">
                      <Check className="size-3.5" />
                    </span>
                  )}
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-1 border-t border-border px-5 py-4">
                    {section.items.map((item) => {
                      const isChecked = checked.has(item.id);
                      const isCriticalMissing = item.critical && !isChecked && showWarning;

                      return (
                        <label
                          key={item.id}
                          htmlFor={item.id}
                          className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all duration-200 ${
                            isChecked
                              ? "border-success/40 bg-success/5"
                              : isCriticalMissing
                                ? "border-destructive/40 bg-destructive/5"
                                : "border-transparent bg-transparent hover:bg-accent/40"
                          }`}
                        >
                          <Checkbox
                            id={item.id}
                            checked={isChecked}
                            onCheckedChange={() => toggleItem(item.id)}
                            className="mt-0.5 shrink-0"
                          />
                          <div className="flex-1">
                            <p
                              className={`text-sm leading-relaxed transition-colors ${
                                isChecked ? "text-foreground/80 line-through" : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </p>
                            {item.critical && (
                              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-semibold text-warning">
                                <ShieldCheck className="size-3" /> Critical
                              </span>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={clearAll}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-6"
        >
          <RotateCcw className="size-4" /> Clear Checklist
        </Button>
        <Button
          type="button"
          onClick={handleCompleteClick}
          disabled={isComplete}
          className="inline-flex h-11 flex-1 items-center gap-2 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
        >
          <ShieldCheck className="size-4" />
          {isComplete ? "Inspection Complete" : "Complete Inspection"}
        </Button>
      </div>
    </div>
  );
}
