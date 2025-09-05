export const unitCategories = {
  length: {
    name: { en: 'Length', ar: 'الطول' },
    baseUnit: 'meter',
    units: {
      meter: { name: { en: 'Meter', ar: 'متر' }, value: 1 },
      kilometer: { name: { en: 'Kilometer', ar: 'كيلومتر' }, value: 1000 },
      centimeter: { name: { en: 'Centimeter', ar: 'سنتيمتر' }, value: 0.01 },
      millimeter: { name: { en: 'Millimeter', ar: 'مليمتر' }, value: 0.001 },
      mile: { name: { en: 'Mile', ar: 'ميل' }, value: 1609.34 },
      yard: { name: { en: 'Yard', ar: 'ياردة' }, value: 0.9144 },
      foot: { name: { en: 'Foot', ar: 'قدم' }, value: 0.3048 },
      inch: { name: { en: 'Inch', ar: 'بوصة' }, value: 0.0254 },
    },
  },
  weight: {
    name: { en: 'Weight', ar: 'الوزن' },
    baseUnit: 'kilogram',
    units: {
      kilogram: { name: { en: 'Kilogram', ar: 'كيلوجرام' }, value: 1 },
      gram: { name: { en: 'Gram', ar: 'جرام' }, value: 0.001 },
      milligram: { name: { en: 'Milligram', ar: 'مليجرام' }, value: 0.000001 },
      ton: { name: { en: 'Metric Ton', ar: 'طن متري' }, value: 1000 },
      pound: { name: { en: 'Pound', ar: 'رطل' }, value: 0.453592 },
      ounce: { name: { en: 'Ounce', ar: 'أونصة' }, value: 0.0283495 },
    },
  },
  temperature: {
    name: { en: 'Temperature', ar: 'درجة الحرارة' },
    baseUnit: 'celsius',
    units: {
      celsius: { name: { en: 'Celsius', ar: 'مئوية' }, toBase: (c: number) => c, fromBase: (c: number) => c },
      fahrenheit: { name: { en: 'Fahrenheit', ar: 'فهرنهايت' }, toBase: (f: number) => (f - 32) * 5 / 9, fromBase: (c: number) => (c * 9 / 5) + 32 },
      kelvin: { name: { en: 'Kelvin', ar: 'كلفن' }, toBase: (k: number) => k - 273.15, fromBase: (c: number) => c + 273.15 },
    },
  },
  volume: {
    name: { en: 'Volume', ar: 'الحجم' },
    baseUnit: 'liter',
    units: {
      liter: { name: { en: 'Liter', ar: 'لتر' }, value: 1 },
      milliliter: { name: { en: 'Milliliter', ar: 'مليلتر' }, value: 0.001 },
      gallon: { name: { en: 'US Gallon', ar: 'جالون أمريكي' }, value: 3.78541 },
      quart: { name: { en: 'US Quart', ar: 'كوارت أمريكي' }, value: 0.946353 },
      pint: { name: { en: 'US Pint', ar: 'باينت أمريكي' }, value: 0.473176 },
      cup: { name: { en: 'US Cup', ar: 'كوب أمريكي' }, value: 0.24 },
      fluid_ounce: { name: { en: 'US Fluid Ounce', ar: 'أونصة سائلة أمريكية' }, value: 0.0295735 },
    },
  },
};
