import React from 'react';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';
import { Users, Target, BarChart3, Mail } from 'lucide-react';

const AdvertisePage: React.FC = () => {
  const { language } = useAppContext();

  const content = {
    en: {
      title: 'Advertise with Hesabati',
      subtitle: 'Reach a global, engaged audience interested in finance, health, and productivity tools.',
      whyAdvertiseTitle: 'Why Advertise With Us?',
      stats: [
        { icon: Users, label: 'Monthly Visitors', value: '500,000+' },
        { icon: BarChart3, label: 'Tool Interactions', value: '2 Million+' },
        { icon: Target, label: 'Engaged Audience', value: 'Finance & Health Enthusiasts' },
      ],
      offerTitle: 'What We Offer',
      offers: [
        'Strategic banner placements (header, footer, in-content).',
        'Sponsored blog posts and tool integrations.',
        'Custom campaigns tailored to your brand\'s goals.',
        'Access to a bilingual (English & Arabic) user base.',
      ],
      contactTitle: 'Get in Touch',
      contactText: 'We are excited to partner with brands that align with our mission of providing valuable tools to a global audience. For our media kit, rates, and custom advertising solutions, please contact our partnership team.',
      contactEmail: 'partnerships@hesabati.com',
    },
    ar: {
      title: 'أعلن مع حسابتي',
      subtitle: 'صل إلى جمهور عالمي متفاعل مهتم بأدوات التمويل والصحة والإنتاجية.',
      whyAdvertiseTitle: 'لماذا تعلن معنا؟',
      stats: [
        { icon: Users, label: 'زائر شهريًا', value: '+500,000' },
        { icon: BarChart3, label: 'تفاعل مع الأدوات', value: '+2 مليون' },
        { icon: Target, label: 'جمهور متفاعل', value: 'عشاق التمويل والصحة' },
      ],
      offerTitle: 'ماذا نقدم',
      offers: [
        'مواضع لافتات إعلانية استراتيجية (رأس الصفحة، التذييل، داخل المحتوى).',
        'منشورات مدونة ومكاملات أدوات برعاية.',
        'حملات مخصصة مصممة لأهداف علامتك التجارية.',
        'الوصول إلى قاعدة مستخدمين ثنائية اللغة (الإنجليزية والعربية).',
      ],
      contactTitle: 'تواصل معنا',
      contactText: 'نحن متحمسون للشراكة مع العلامات التجارية التي تتماشى مع مهمتنا المتمثلة في توفير أدوات قيمة لجمهور عالمي. للحصول على مجموعة الوسائط والأسعار وحلول الإعلانات المخصصة، يرجى الاتصال بفريق الشراكات لدينا.',
      contactEmail: 'partnerships@hesabati.com',
    },
  };

  const currentContent = content[language];

  return (
    <PageWrapper title={currentContent.title} subtitle={currentContent.subtitle}>
      <h2 className="text-center">{currentContent.whyAdvertiseTitle}</h2>
      <div className="grid md:grid-cols-3 gap-8 my-8 not-prose">
        {currentContent.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <h2>{currentContent.offerTitle}</h2>
      <ul className="list-disc list-inside space-y-2">
        {currentContent.offers.map((offer, index) => (
          <li key={index}>{offer}</li>
        ))}
      </ul>

      <div className="mt-12 text-center p-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
        <h2>{currentContent.contactTitle}</h2>
        <p>{currentContent.contactText}</p>
        <a href={`mailto:${currentContent.contactEmail}`} className="inline-flex items-center gap-3 mt-4 text-xl font-semibold text-primary-600 dark:text-primary-400 hover:underline">
          <Mail className="w-6 h-6" />
          <span>{currentContent.contactEmail}</span>
        </a>
      </div>
    </PageWrapper>
  );
};

export default AdvertisePage;
