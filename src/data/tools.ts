import { Tool } from '../types';

export const toolsData: Tool[] = [
  // Finance Tools
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    title: {
      en: 'Loan Calculator',
      ar: 'حاسبة القروض'
    },
    description: {
      en: 'Calculate monthly payments, total interest, and amortization schedule for any loan',
      ar: 'احسب الأقساط الشهرية والفوائد الإجمالية وجدول الإطفاء لأي قرض'
    },
    category: 'finance',
    icon: 'Calculator',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['loan', 'mortgage', 'payment', 'interest', 'amortization'],
      ar: ['قرض', 'رهن', 'قسط', 'فائدة', 'إطفاء']
    }
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    title: {
      en: 'Mortgage Calculator',
      ar: 'حاسبة الرهن العقاري'
    },
    description: {
      en: 'Calculate mortgage payments, down payment, and total cost of home ownership',
      ar: 'احسب أقساط الرهن العقاري والدفعة المقدمة والتكلفة الإجمالية لملكية المنزل'
    },
    category: 'finance',
    icon: 'Home',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['mortgage', 'home', 'property', 'down payment', 'real estate'],
      ar: ['رهن عقاري', 'منزل', 'عقار', 'دفعة مقدمة', 'عقارات']
    }
  },
  {
    id: 'investment-return',
    slug: 'investment-return-calculator',
    title: {
      en: 'Investment Return Calculator',
      ar: 'حاسبة عائد الاستثمار'
    },
    description: {
      en: 'Calculate compound interest, ROI, and future value of your investments',
      ar: 'احسب الفائدة المركبة وعائد الاستثمار والقيمة المستقبلية لاستثماراتك'
    },
    category: 'finance',
    icon: 'TrendingUp',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['investment', 'ROI', 'compound', 'return', 'portfolio'],
      ar: ['استثمار', 'عائد', 'فائدة مركبة', 'محفظة', 'ربح']
    }
  },
  {
    id: 'retirement-planner',
    slug: 'retirement-planning-calculator',
    title: {
      en: 'Retirement Planning Calculator',
      ar: 'حاسبة تخطيط التقاعد'
    },
    description: {
      en: 'Plan your retirement savings and calculate how much you need to save monthly',
      ar: 'خطط لمدخرات التقاعد واحسب المبلغ الذي تحتاج لادخاره شهريًا'
    },
    category: 'finance',
    icon: 'PiggyBank',
    usageCount: 0,
    difficulty: 'advanced',
    keywords: {
      en: ['retirement', 'pension', 'savings', 'future', 'planning'],
      ar: ['تقاعد', 'معاش', 'مدخرات', 'مستقبل', 'تخطيط']
    }
  },
  {
    id: 'budget-planner',
    slug: 'budget-planning-calculator',
    title: {
      en: 'Budget Planning Calculator',
      ar: 'حاسبة تخطيط الميزانية'
    },
    description: {
      en: 'Create and manage your monthly budget with income and expense tracking',
      ar: 'أنشئ وأدر ميزانيتك الشهرية مع تتبع الدخل والمصروفات'
    },
    category: 'finance',
    icon: 'Wallet',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['budget', 'expenses', 'income', 'money', 'planning'],
      ar: ['ميزانية', 'مصروفات', 'دخل', 'مال', 'تخطيط']
    }
  },
  {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    title: {
      en: 'Tax Calculator',
      ar: 'حاسبة الضرائب'
    },
    description: {
      en: 'Calculate income tax, deductions, and net salary for various tax brackets',
      ar: 'احسب ضريبة الدخل والخصومات والراتب الصافي لشرائح ضريبية مختلفة'
    },
    category: 'finance',
    icon: 'Receipt',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['tax', 'income', 'deduction', 'salary', 'net pay'],
      ar: ['ضريبة', 'دخل', 'خصم', 'راتب', 'صافي الأجر']
    }
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    title: {
      en: 'Currency Converter',
      ar: 'محول العملات'
    },
    description: {
      en: 'Convert between currencies with real-time exchange rates',
      ar: 'حول بين العملات بأسعار صرف فورية'
    },
    category: 'finance',
    icon: 'DollarSign',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['currency', 'exchange', 'conversion', 'money', 'forex'],
      ar: ['عملة', 'صرف', 'تحويل', 'مال', 'فوركس']
    }
  },
  {
    id: 'debt-payoff',
    slug: 'debt-payoff-calculator',
    title: {
      en: 'Debt Payoff Calculator',
      ar: 'حاسبة سداد الديون'
    },
    description: {
      en: 'Create a debt payoff strategy and calculate time to become debt-free',
      ar: 'أنشئ استراتيجية سداد الديون واحسب الوقت للتخلص من الديون'
    },
    category: 'finance',
    icon: 'CreditCard',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['debt', 'payoff', 'credit card', 'strategy', 'free'],
      ar: ['دين', 'سداد', 'بطاقة ائتمان', 'استراتيجية', 'حر']
    }
  },

  // Health Tools
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    title: {
      en: 'BMI Calculator',
      ar: 'حاسبة مؤشر كتلة الجسم'
    },
    description: {
      en: 'Calculate your Body Mass Index and understand your weight status',
      ar: 'احسب مؤشر كتلة جسمك وافهم حالة وزنك'
    },
    category: 'health',
    icon: 'Activity',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['BMI', 'weight', 'height', 'body mass', 'health'],
      ar: ['مؤشر كتلة الجسم', 'وزن', 'طول', 'كتلة', 'صحة']
    }
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-needs-calculator',
    title: {
      en: 'Daily Calorie Needs Calculator',
      ar: 'حاسبة احتياج السعرات اليومية'
    },
    description: {
      en: 'Calculate your daily calorie needs based on activity level and goals',
      ar: 'احسب احتياجك اليومي من السعرات حسب مستوى النشاط والأهداف'
    },
    category: 'health',
    icon: 'Zap',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['calories', 'diet', 'nutrition', 'weight loss', 'metabolism'],
      ar: ['سعرات', 'حمية', 'تغذية', 'فقدان وزن', 'أيض']
    }
  },
  {
    id: 'water-intake',
    slug: 'water-intake-calculator',
    title: {
      en: 'Water Intake Calculator',
      ar: 'حاسبة احتياج الماء'
    },
    description: {
      en: 'Calculate how much water you should drink daily based on your body and activity',
      ar: 'احسب كمية الماء التي يجب شربها يوميًا حسب جسمك ونشاطك'
    },
    category: 'health',
    icon: 'Droplets',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['water', 'hydration', 'intake', 'daily', 'health'],
      ar: ['ماء', 'ترطيب', 'استهلاك', 'يومي', 'صحة']
    }
  },
  {
    id: 'body-fat',
    slug: 'body-fat-percentage-calculator',
    title: {
      en: 'Body Fat Percentage Calculator',
      ar: 'حاسبة نسبة دهون الجسم'
    },
    description: {
      en: 'Estimate your body fat percentage using various measurement methods',
      ar: 'قدر نسبة دهون جسمك باستخدام طرق قياس مختلفة'
    },
    category: 'health',
    icon: 'Target',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['body fat', 'percentage', 'measurement', 'fitness', 'composition'],
      ar: ['دهون الجسم', 'نسبة', 'قياس', 'لياقة', 'تركيب']
    }
  },
  {
    id: 'heart-rate',
    slug: 'target-heart-rate-calculator',
    title: {
      en: 'Target Heart Rate Calculator',
      ar: 'حاسبة معدل ضربات القلب المستهدف'
    },
    description: {
      en: 'Calculate your target heart rate zones for different exercise intensities',
      ar: 'احسب نطاقات معدل ضربات القلب المستهدفة لشدة تمارين مختلفة'
    },
    category: 'health',
    icon: 'Heart',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['heart rate', 'cardio', 'exercise', 'fitness', 'training'],
      ar: ['معدل ضربات القلب', 'كارديو', 'تمرين', 'لياقة', 'تدريب']
    }
  },
  {
    id: 'sleep-calculator',
    slug: 'optimal-sleep-time-calculator',
    title: {
      en: 'Optimal Sleep Time Calculator',
      ar: 'حاسبة وقت النوم الأمثل'
    },
    description: {
      en: 'Find the best bedtime and wake-up time based on sleep cycles',
      ar: 'اعثر على أفضل وقت للنوم والاستيقاظ حسب دورات النوم'
    },
    category: 'health',
    icon: 'Moon',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['sleep', 'bedtime', 'wake up', 'cycles', 'rest'],
      ar: ['نوم', 'وقت النوم', 'استيقاظ', 'دورات', 'راحة']
    }
  },
  {
    id: 'pregnancy-calculator',
    slug: 'pregnancy-due-date-calculator',
    title: {
      en: 'Pregnancy Due Date Calculator',
      ar: 'حاسبة موعد الولادة'
    },
    description: {
      en: 'Calculate your pregnancy due date and track pregnancy milestones',
      ar: 'احسب موعد ولادتك وتتبع معالم الحمل'
    },
    category: 'health',
    icon: 'Baby',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['pregnancy', 'due date', 'baby', 'trimester', 'maternal'],
      ar: ['حمل', 'موعد ولادة', 'طفل', 'ثلث', 'أمومة']
    }
  },
  {
    id: 'blood-pressure',
    slug: 'blood-pressure-calculator',
    title: {
      en: 'Blood Pressure Calculator',
      ar: 'حاسبة ضغط الدم'
    },
    description: {
      en: 'Analyze your blood pressure readings and understand health implications',
      ar: 'حلل قراءات ضغط دمك وافهم الآثار الصحية'
    },
    category: 'health',
    icon: 'Activity',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['blood pressure', 'hypertension', 'systolic', 'diastolic', 'cardiovascular'],
      ar: ['ضغط الدم', 'ارتفاع ضغط', 'انقباضي', 'انبساطي', 'قلبي وعائي']
    }
  },

  // Conversion Tools
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    title: {
      en: 'Universal Unit Converter',
      ar: 'محول الوحدات الشامل'
    },
    description: {
      en: 'Convert between length, weight, temperature, and volume units',
      ar: 'حول بين وحدات الطول والوزن والحرارة والحجم'
    },
    category: 'conversion',
    icon: 'RefreshCw',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['unit', 'conversion', 'metric', 'imperial', 'measure'],
      ar: ['وحدة', 'تحويل', 'متري', 'إمبراطوري', 'قياس']
    }
  },
  {
    id: 'time-zone',
    slug: 'time-zone-converter',
    title: {
      en: 'Time Zone Converter',
      ar: 'محول المناطق الزمنية'
    },
    description: {
      en: 'Convert time between different time zones around the world',
      ar: 'حول الوقت بين المناطق الزمنية المختلفة حول العالم'
    },
    category: 'conversion',
    icon: 'Clock',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['time zone', 'UTC', 'GMT', 'world time', 'global'],
      ar: ['منطقة زمنية', 'توقيت عالمي', 'وقت عالمي', 'عالمي']
    }
  },
  {
    id: 'color-converter',
    slug: 'color-code-converter',
    title: {
      en: 'Color Code Converter',
      ar: 'محول أكواد الألوان'
    },
    description: {
      en: 'Convert between HEX, RGB, HSL, and other color formats',
      ar: 'حول بين HEX وRGB وHSL وصيغ ألوان أخرى'
    },
    category: 'conversion',
    icon: 'Palette',
    usageCount: 0,
    difficulty: 'medium',
    keywords: {
      en: ['color', 'hex', 'rgb', 'hsl', 'design'],
      ar: ['لون', 'هيكس', 'أر جي بي', 'تصميم', 'ألوان']
    }
  },
  {
    id: 'text-converter',
    slug: 'text-case-converter',
    title: {
      en: 'Text Case Converter',
      ar: 'محول حالة النص'
    },
    description: {
      en: 'Convert text between uppercase, lowercase, title case, and more',
      ar: 'حول النص بين الأحرف الكبيرة والصغيرة وحالة العنوان وأكثر'
    },
    category: 'conversion',
    icon: 'Type',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['text', 'case', 'uppercase', 'lowercase', 'format'],
      ar: ['نص', 'حالة', 'أحرف كبيرة', 'أحرف صغيرة', 'تنسيق']
    }
  },
  {
    id: 'number-base',
    slug: 'number-base-converter',
    title: {
      en: 'Number Base Converter',
      ar: 'محول أساس الأرقام'
    },
    description: {
      en: 'Convert numbers between binary, decimal, hexadecimal, and octal',
      ar: 'حول الأرقام بين الثنائي والعشري والسادس عشر والثماني'
    },
    category: 'conversion',
    icon: 'Binary',
    usageCount: 0,
    difficulty: 'advanced',
    keywords: {
      en: ['binary', 'decimal', 'hexadecimal', 'octal', 'programming'],
      ar: ['ثنائي', 'عشري', 'سادس عشر', 'ثماني', 'برمجة']
    }
  },
  {
    id: 'date-calculator',
    slug: 'date-difference-calculator',
    title: {
      en: 'Date Difference Calculator',
      ar: 'حاسبة الفرق بين التواريخ'
    },
    description: {
      en: 'Calculate the difference between two dates in days, weeks, months, and years',
      ar: 'احسب الفرق بين تاريخين بالأيام والأسابيع والشهور والسنوات'
    },
    category: 'conversion',
    icon: 'Calendar',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['date', 'difference', 'age', 'duration', 'calendar'],
      ar: ['تاريخ', 'فرق', 'عمر', 'مدة', 'تقويم']
    }
  },
  {
    id: 'qr-generator',
    slug: 'qr-code-generator',
    title: {
      en: 'QR Code Generator',
      ar: 'مولد رمز الاستجابة السريعة'
    },
    description: {
      en: 'Generate QR codes for text, URLs, WiFi credentials, and more',
      ar: 'أنشئ رموز QR للنصوص والروابط وبيانات الواي فاي وأكثر'
    },
    category: 'conversion',
    icon: 'QrCode',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['QR code', 'barcode', 'generator', 'scanner', 'mobile'],
      ar: ['رمز QR', 'باركود', 'مولد', 'ماسح', 'موبايل']
    }
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    title: {
      en: 'Secure Password Generator',
      ar: 'مولد كلمات مرور آمنة'
    },
    description: {
      en: 'Generate strong, secure passwords with customizable options',
      ar: 'أنشئ كلمات مرور قوية وآمنة مع خيارات قابلة للتخصيص'
    },
    category: 'conversion',
    icon: 'Shield',
    usageCount: 0,
    difficulty: 'easy',
    keywords: {
      en: ['password', 'security', 'generator', 'strong', 'encryption'],
      ar: ['كلمة مرور', 'أمان', 'مولد', 'قوي', 'تشفير']
    }
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    title: { en: 'Image Compressor', ar: 'ضاغط الصور' },
    description: { en: 'Reduce the file size of your images without losing quality.', ar: 'قلل حجم ملف صورك دون فقدان الجودة.' },
    category: 'conversion',
    icon: 'Minimize2',
    usageCount: 0,
    difficulty: 'easy',
    keywords: { en: ['image', 'compress', 'optimizer', 'jpeg', 'png'], ar: ['صورة', 'ضغط', 'محسن', 'jpeg', 'png'] }
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    title: { en: 'Image Converter', ar: 'محول الصور' },
    description: { en: 'Convert images to different formats like JPG, PNG, and WebP.', ar: 'حول الصور إلى صيغ مختلفة مثل JPG و PNG و WebP.' },
    category: 'conversion',
    icon: 'ImageIcon',
    usageCount: 0,
    difficulty: 'easy',
    keywords: { en: ['image', 'convert', 'jpg', 'png', 'webp', 'format'], ar: ['صورة', 'تحويل', 'jpg', 'png', 'webp', 'صيغة'] }
  },
  {
    id: 'pdf-converter',
    slug: 'pdf-converter',
    title: { en: 'Image to PDF Converter', ar: 'محول الصور إلى PDF' },
    description: { en: 'Combine multiple images into a single, easy-to-share PDF file.', ar: 'اجمع عدة صور في ملف PDF واحد سهل المشاركة.' },
    category: 'conversion',
    icon: 'FileText',
    usageCount: 0,
    difficulty: 'easy',
    keywords: { en: ['pdf', 'image to pdf', 'converter', 'jpg to pdf', 'png to pdf'], ar: ['pdf', 'صورة إلى pdf', 'محول', 'jpg إلى pdf', 'png إلى pdf'] }
  }
];
