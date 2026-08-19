/**
 * Mock data layer for TruePhone.
 * Replace these arrays with real API calls when a backend is added.
 */

export type Phone = {
  id: string;
  name: string;
  brand: string;
  os: "iOS" | "Android";
  year: number;
  priceUsd: number;
  /** Approximate local price, derived from the USD figure. */
  price: number;
  storage: string;
  display: string;
  verified: boolean;
  /** Token-free hue used for the placeholder artwork. */
  accent: string;
  /** Realistic placeholder artwork URL. */
  image: string;
};

export const BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "Redmi",
  "Poco",
  "OnePlus",
  "Sony",
  "Motorola",
  "Asus",
  "Nothing",
] as const;

export const OPERATING_SYSTEMS = ["iOS", "Android"] as const;

/** Naira per USD used for the mock catalog pricing. */
export const USD_TO_NGN = 1550;

const BRAND_HUE: Record<string, string> = {
  Apple: 250,
  Samsung: 240,
  Google: 120,
  Xiaomi: 35,
  Redmi: 25,
  Poco: 65,
  OnePlus: 20,
  Sony: 200,
  Motorola: 175,
  Asus: 300,
  Nothing: 285,
} as unknown as Record<string, string>;

type Raw = [name: string, year: number, usd: number, storage: string, display: string];

function build(brand: string, os: Phone["os"], rows: Raw[]): Phone[] {
  return rows.map(([name, year, usd, storage, display]) => {
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return {
      id,
      name,
      brand,
      os,
      year,
      priceUsd: usd,
      price: usd * USD_TO_NGN,
      storage,
      display,
      verified: true,
      accent: BRAND_HUE[brand] ?? "220",
      image: `https://placehold.co/640x480/0f172a/ffffff/png?text=${encodeURIComponent(name)}`,
    };
  });
}

const APPLE = build("Apple", "iOS", [
  ["iPhone X", 2017, 320, "64GB", '5.8" Super Retina'],
  ["iPhone XR", 2018, 280, "64GB", '6.1" Liquid Retina'],
  ["iPhone XS", 2018, 340, "64GB", '5.8" Super Retina'],
  ["iPhone XS Max", 2018, 400, "256GB", '6.5" Super Retina'],
  ["iPhone 11", 2019, 380, "128GB", '6.1" Liquid Retina'],
  ["iPhone 11 Pro", 2019, 460, "256GB", '5.8" Super Retina XDR'],
  ["iPhone 11 Pro Max", 2019, 520, "256GB", '6.5" Super Retina XDR'],
  ["iPhone SE (2020)", 2020, 220, "64GB", '4.7" Retina HD'],
  ["iPhone 12 Mini", 2020, 380, "128GB", '5.4" Super Retina XDR'],
  ["iPhone 12", 2020, 450, "128GB", '6.1" Super Retina XDR'],
  ["iPhone 12 Pro", 2020, 540, "128GB", '6.1" Super Retina XDR'],
  ["iPhone 12 Pro Max", 2020, 620, "256GB", '6.7" Super Retina XDR'],
  ["iPhone 13 Mini", 2021, 450, "128GB", '5.4" Super Retina XDR'],
  ["iPhone 13", 2021, 530, "128GB", '6.1" Super Retina XDR'],
  ["iPhone 13 Pro", 2021, 660, "256GB", '6.1" ProMotion XDR'],
  ["iPhone 13 Pro Max", 2021, 740, "256GB", '6.7" ProMotion XDR'],
  ["iPhone SE (2022)", 2022, 260, "64GB", '4.7" Retina HD'],
  ["iPhone 14", 2022, 620, "128GB", '6.1" Super Retina XDR'],
  ["iPhone 14 Plus", 2022, 690, "128GB", '6.7" Super Retina XDR'],
  ["iPhone 14 Pro", 2022, 830, "256GB", '6.1" ProMotion XDR'],
  ["iPhone 14 Pro Max", 2022, 920, "256GB", '6.7" ProMotion XDR'],
  ["iPhone 15", 2023, 730, "128GB", '6.1" Super Retina XDR'],
  ["iPhone 15 Plus", 2023, 820, "128GB", '6.7" Super Retina XDR'],
  ["iPhone 15 Pro", 2023, 980, "256GB", '6.1" ProMotion XDR'],
  ["iPhone 15 Pro Max", 2023, 1150, "256GB", '6.7" ProMotion XDR'],
]);

const SAMSUNG = build("Samsung", "Android", [
  ["Galaxy S10e", 2019, 220, "128GB", '5.8" Dynamic AMOLED'],
  ["Galaxy S10", 2019, 260, "128GB", '6.1" Dynamic AMOLED'],
  ["Galaxy S10+", 2019, 300, "256GB", '6.4" Dynamic AMOLED'],
  ["Galaxy Note 10", 2019, 330, "256GB", '6.3" Dynamic AMOLED'],
  ["Galaxy Note 10+", 2019, 380, "256GB", '6.8" Dynamic AMOLED'],
  ["Galaxy S20", 2020, 340, "128GB", '6.2" Dynamic AMOLED 2X'],
  ["Galaxy S20+", 2020, 400, "128GB", '6.7" Dynamic AMOLED 2X'],
  ["Galaxy S20 Ultra", 2020, 480, "256GB", '6.9" Dynamic AMOLED 2X'],
  ["Galaxy Note 20", 2020, 430, "256GB", '6.7" Super AMOLED Plus'],
  ["Galaxy Note 20 Ultra", 2020, 540, "256GB", '6.9" Dynamic AMOLED 2X'],
  ["Galaxy S21", 2021, 420, "128GB", '6.2" Dynamic AMOLED 2X'],
  ["Galaxy S21+", 2021, 500, "256GB", '6.7" Dynamic AMOLED 2X'],
  ["Galaxy S21 Ultra", 2021, 620, "256GB", '6.8" QHD+ AMOLED'],
  ["Galaxy Z Flip 3", 2021, 400, "128GB", '6.7" Foldable AMOLED'],
  ["Galaxy Z Fold 3", 2021, 700, "256GB", '7.6" Foldable AMOLED'],
  ["Galaxy S22", 2022, 490, "128GB", '6.1" Dynamic AMOLED 2X'],
  ["Galaxy S22+", 2022, 580, "256GB", '6.6" Dynamic AMOLED 2X'],
  ["Galaxy S22 Ultra", 2022, 720, "256GB", '6.8" QHD+ AMOLED'],
  ["Galaxy A53 5G", 2022, 230, "128GB", '6.5" Super AMOLED'],
  ["Galaxy Z Flip 4", 2022, 520, "256GB", '6.7" Foldable AMOLED'],
  ["Galaxy Z Fold 4", 2022, 900, "256GB", '7.6" Foldable AMOLED'],
  ["Galaxy S23", 2023, 640, "256GB", '6.1" Dynamic AMOLED 2X'],
  ["Galaxy S23+", 2023, 760, "256GB", '6.6" Dynamic AMOLED 2X'],
  ["Galaxy S23 Ultra", 2023, 950, "512GB", '6.8" QHD+ AMOLED'],
  ["Galaxy A54 5G", 2023, 280, "128GB", '6.4" Super AMOLED'],
  ["Galaxy Z Flip 5", 2023, 700, "256GB", '6.7" Foldable AMOLED'],
  ["Galaxy Z Fold 5", 2023, 1100, "256GB", '7.6" Foldable AMOLED'],
  ["Galaxy S24", 2024, 780, "256GB", '6.2" Dynamic AMOLED 2X'],
  ["Galaxy S24+", 2024, 900, "256GB", '6.7" QHD+ AMOLED'],
  ["Galaxy S24 Ultra", 2024, 1200, "512GB", '6.8" QHD+ AMOLED'],
  ["Galaxy A55 5G", 2024, 330, "128GB", '6.6" Super AMOLED'],
]);

const GOOGLE = build("Google", "Android", [
  ["Pixel 4", 2019, 190, "64GB", '5.7" OLED'],
  ["Pixel 4 XL", 2019, 230, "128GB", '6.3" QHD+ OLED'],
  ["Pixel 4a", 2020, 170, "128GB", '5.8" OLED'],
  ["Pixel 5", 2020, 260, "128GB", '6.0" OLED'],
  ["Pixel 5a", 2021, 240, "128GB", '6.34" OLED'],
  ["Pixel 6", 2021, 320, "128GB", '6.4" AMOLED'],
  ["Pixel 6 Pro", 2021, 430, "256GB", '6.7" LTPO AMOLED'],
  ["Pixel 6a", 2022, 250, "128GB", '6.1" OLED'],
  ["Pixel 7", 2022, 400, "128GB", '6.3" AMOLED'],
  ["Pixel 7 Pro", 2022, 540, "256GB", '6.7" LTPO AMOLED'],
  ["Pixel 7a", 2023, 340, "128GB", '6.1" OLED'],
  ["Pixel 8", 2023, 560, "128GB", '6.2" Actua OLED'],
  ["Pixel 8 Pro", 2023, 780, "256GB", '6.7" Super Actua'],
  ["Pixel 8a", 2024, 430, "128GB", '6.1" Actua OLED'],
]);

const XIAOMI = build("Xiaomi", "Android", [
  ["Xiaomi 11T Pro", 2021, 300, "256GB", '6.67" AMOLED'],
  ["Xiaomi 12", 2022, 380, "256GB", '6.28" AMOLED'],
  ["Xiaomi 12 Pro", 2022, 500, "256GB", '6.73" LTPO AMOLED'],
  ["Xiaomi 13", 2023, 560, "256GB", '6.36" LTPO AMOLED'],
  ["Xiaomi 13 Pro", 2023, 780, "512GB", '6.73" LTPO AMOLED'],
  ["Xiaomi 13T Pro", 2023, 600, "512GB", '6.67" AMOLED'],
  ["Xiaomi 14", 2024, 720, "256GB", '6.36" LTPO AMOLED'],
  ["Xiaomi 14 Ultra", 2024, 1050, "512GB", '6.73" LTPO AMOLED'],
]);

const REDMI = build("Redmi", "Android", [
  ["Redmi Note 11", 2022, 150, "128GB", '6.43" AMOLED'],
  ["Redmi Note 12", 2023, 170, "128GB", '6.67" AMOLED'],
  ["Redmi Note 12 Pro", 2023, 230, "256GB", '6.67" AMOLED'],
  ["Redmi Note 13", 2024, 200, "128GB", '6.67" AMOLED'],
  ["Redmi Note 13 Pro", 2024, 280, "256GB", '6.67" AMOLED'],
  ["Redmi Note 13 Pro+", 2024, 380, "256GB", '6.67" AMOLED'],
]);

const POCO = build("Poco", "Android", [
  ["Poco X4 Pro", 2022, 180, "128GB", '6.67" AMOLED'],
  ["Poco F4", 2022, 250, "256GB", '6.67" AMOLED'],
  ["Poco X5 Pro", 2023, 240, "256GB", '6.67" AMOLED'],
  ["Poco F5", 2023, 330, "256GB", '6.67" AMOLED'],
  ["Poco F5 Pro", 2023, 430, "256GB", '6.67" AMOLED'],
  ["Poco X6 Pro", 2024, 320, "256GB", '6.67" AMOLED'],
]);

const ONEPLUS = build("OnePlus", "Android", [
  ["OnePlus 8", 2020, 250, "128GB", '6.55" Fluid AMOLED'],
  ["OnePlus 8 Pro", 2020, 330, "256GB", '6.78" QHD+ AMOLED'],
  ["OnePlus 9", 2021, 320, "128GB", '6.55" Fluid AMOLED'],
  ["OnePlus 9 Pro", 2021, 430, "256GB", '6.7" LTPO AMOLED'],
  ["OnePlus 10 Pro", 2022, 500, "256GB", '6.7" LTPO AMOLED'],
  ["OnePlus Nord 2T", 2022, 260, "128GB", '6.43" AMOLED'],
  ["OnePlus 11", 2023, 620, "256GB", '6.7" LTPO AMOLED'],
  ["OnePlus Nord 3", 2023, 340, "256GB", '6.74" AMOLED'],
  ["OnePlus 12", 2024, 800, "256GB", '6.82" ProXDR LTPO'],
  ["OnePlus 12R", 2024, 500, "256GB", '6.78" ProXDR'],
  ["OnePlus Nord 4", 2024, 430, "256GB", '6.74" AMOLED'],
]);

const OTHERS = [
  ...build("Sony", "Android", [
    ["Xperia 1 II", 2020, 400, "256GB", '6.5" 4K OLED'],
    ["Xperia 1 III", 2021, 520, "256GB", '6.5" 4K 120Hz OLED'],
    ["Xperia 1 IV", 2022, 700, "256GB", '6.5" 4K OLED'],
    ["Xperia 1 V", 2023, 950, "256GB", '6.5" 4K OLED'],
    ["Xperia 5 V", 2023, 800, "128GB", '6.1" FHD+ OLED'],
  ]),
  ...build("Motorola", "Android", [
    ["Motorola Edge 20 Pro", 2021, 280, "256GB", '6.7" OLED'],
    ["Motorola Edge 30 Ultra", 2022, 420, "256GB", '6.67" pOLED'],
    ["Motorola Razr 2022", 2022, 500, "256GB", '6.7" Foldable pOLED'],
    ["Motorola Edge 40 Pro", 2023, 600, "256GB", '6.67" pOLED'],
    ["Motorola Razr 40 Ultra", 2023, 800, "256GB", '6.9" Foldable pOLED'],
  ]),
  ...build("Asus", "Android", [
    ["ROG Phone 5", 2021, 450, "256GB", '6.78" AMOLED 144Hz'],
    ["ROG Phone 6", 2022, 600, "256GB", '6.78" AMOLED 165Hz'],
    ["Zenfone 9", 2022, 500, "128GB", '5.9" AMOLED'],
    ["ROG Phone 7", 2023, 750, "512GB", '6.78" AMOLED 165Hz'],
    ["Zenfone 10", 2023, 650, "256GB", '5.9" AMOLED'],
  ]),
  ...build("Nothing", "Android", [
    ["Nothing Phone (1)", 2022, 300, "128GB", '6.55" OLED'],
    ["Nothing Phone (2)", 2023, 500, "256GB", '6.7" LTPO OLED'],
    ["Nothing Phone (2a)", 2024, 320, "128GB", '6.7" AMOLED'],
  ]),
];

export const PHONES: Phone[] = [
  ...APPLE,
  ...SAMSUNG,
  ...GOOGLE,
  ...XIAOMI,
  ...REDMI,
  ...POCO,
  ...ONEPLUS,
  ...OTHERS,
].sort((a, b) => b.year - a.year || a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));

/** Release-year buckets used by the catalog filters. */
export const YEAR_RANGES = [
  { id: "2023-2024", label: "2023 – 2024", min: 2023, max: 2100 },
  { id: "2021-2022", label: "2021 – 2022", min: 2021, max: 2022 },
  { id: "pre-2021", label: "Pre-2021", min: 0, max: 2020 },
] as const;

/** Price tiers, expressed in USD. */
export const PRICE_TIERS = [
  { id: "budget", label: "Budget (under $300)", min: 0, max: 299 },
  { id: "mid", label: "Mid-range ($300 – $699)", min: 300, max: 699 },
  { id: "flagship", label: "Flagship ($700+)", min: 700, max: Infinity },
] as const;

export function formatNaira(price: number): string {
  return `₦${Math.round(price).toLocaleString()}`;
}

export type VerificationResult = {
  imei: string;
  brand: string;
  model: string;
  storage: string;
  purchaseRegion: string;
  warranty: "Active" | "Expired";
  warrantyUntil: string;
  authentic: boolean;
};

/**
 * Simulated IMEI lookup. A valid input is exactly 15 digits.
 * The mock record is derived deterministically from the IMEI so the same
 * number always returns the same "device", like a real registry would.
 */
export function verifyImei(raw: string): Promise<VerificationResult> {
  const imei = raw.replace(/\D/g, "");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (imei.length !== 15) {
        reject(new Error("Enter a valid 15-digit IMEI or serial number."));
        return;
      }
      const device = PHONES[Number(imei.slice(-2)) % PHONES.length]!;
      resolve({
        imei,
        brand: device.brand,
        model: device.name,
        storage: device.storage,
        purchaseRegion: ["Global", "EU", "US", "Africa"][Number(imei[0]) % 4]!,
        warranty: "Active",
        warrantyUntil: "12 Mar 2027",
        authentic: true,
      });
    }, 2000);
  });
}
