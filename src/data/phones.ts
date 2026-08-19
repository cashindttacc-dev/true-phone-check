/**
 * Mock data layer for TruePhone.
 * Replace these arrays with real API calls when a backend is added.
 */

export type Phone = {
  id: string;
  name: string;
  brand: string;
  os: "iOS" | "Android";
  price: number;
  storage: string;
  display: string;
  verified: boolean;
  accent: string; // token-free hue used for the placeholder artwork
};

export const PHONES: Phone[] = [
  { id: "iphone-15", name: "iPhone 15", brand: "Apple", os: "iOS", price: 1250000, storage: "128GB", display: "6.1\" Super Retina XDR", verified: true, accent: "215" },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", brand: "Apple", os: "iOS", price: 1875000, storage: "256GB", display: "6.7\" LTPO OLED", verified: true, accent: "265" },
  { id: "galaxy-s24", name: "Samsung Galaxy S24", brand: "Samsung", os: "Android", price: 1345000, storage: "256GB", display: "6.2\" Dynamic AMOLED", verified: true, accent: "190" },
  { id: "galaxy-s24-ultra", name: "Samsung Galaxy S24 Ultra", brand: "Samsung", os: "Android", price: 2030000, storage: "512GB", display: "6.8\" QHD+ AMOLED", verified: true, accent: "150" },
  { id: "pixel-8", name: "Google Pixel 8", brand: "Google", os: "Android", price: 1095000, storage: "128GB", display: "6.2\" Actua OLED", verified: true, accent: "95" },
  { id: "pixel-8-pro", name: "Google Pixel 8 Pro", brand: "Google", os: "Android", price: 1565000, storage: "256GB", display: "6.7\" Super Actua", verified: true, accent: "60" },
  { id: "oneplus-12", name: "OnePlus 12", brand: "OnePlus", os: "Android", price: 1250000, storage: "256GB", display: "6.82\" ProXDR", verified: true, accent: "20" },
  { id: "xiaomi-14", name: "Xiaomi 14", brand: "Xiaomi", os: "Android", price: 1170000, storage: "256GB", display: "6.36\" LTPO OLED", verified: true, accent: "35" },
  { id: "iphone-13", name: "iPhone 13", brand: "Apple", os: "iOS", price: 825000, storage: "128GB", display: "6.1\" Super Retina", verified: true, accent: "240" },
  { id: "galaxy-a55", name: "Samsung Galaxy A55", brand: "Samsung", os: "Android", price: 590000, storage: "128GB", display: "6.6\" Super AMOLED", verified: true, accent: "175" },
  { id: "pixel-7a", name: "Google Pixel 7a", brand: "Google", os: "Android", price: 545000, storage: "128GB", display: "6.1\" OLED", verified: true, accent: "120" },
  { id: "oneplus-nord-4", name: "OnePlus Nord 4", brand: "OnePlus", os: "Android", price: 700000, storage: "256GB", display: "6.74\" AMOLED", verified: true, accent: "300" },
];

export const BRANDS = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"] as const;
export const OPERATING_SYSTEMS = ["iOS", "Android"] as const;

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
