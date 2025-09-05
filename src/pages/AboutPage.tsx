import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';

const AboutPage: React.FC = () => {
  const { language } = useAppContext();

  const content = {
    en: {
      title: 'About Hesabati',
      subtitle: 'Empowering smarter decisions with free, accessible, and accurate tools for everyone.',
      visionTitle: 'Our Vision',
      visionText: 'In a world full of complex information, our vision is to be the most trusted and user-friendly online resource for everyday calculations. We believe everyone deserves access to high-quality tools that simplify decisions related to finance, health, and more, regardless of their language or background.',
      whatWeDoTitle: 'What We Do',
      whatWeDoText: 'Hesabati offers a suite of over 24 meticulously crafted calculators and converters, supported by a comprehensive blog. Our tools cover three main categories: Finance, Health, and Conversions. Each tool is designed to be intuitive, fast, and reliable, providing you with instant answers and clear explanations.',
      commitmentTitle: 'Our Commitment to You',
      trustTitle: 'Trust and Accuracy',
      trustText: 'While our tools are rigorously tested, they are intended for informational purposes. We encourage users to verify critical calculations and consult with professionals for financial or medical advice.',
      transparencyTitle: 'Transparency',
      transparencyText: 'We are committed to being transparent about how our site operates. Hesabati is a free service supported by advertising (via Google AdSense). This model allows us to maintain and expand our platform without charging our users.',
      privacyTitle: 'Privacy',
      privacyText: 'Your privacy is paramount. We do not store any personal data you enter into our calculators. All calculations happen in your browser, ensuring your information remains yours. Read our full Privacy Policy for more details.',
    },
    ar: {
      title: 'عن حسابتي',
      subtitle: 'تمكين قرارات أذكى بأدوات مجانية، سهلة الوصول، ودقيقة للجميع.',
      visionTitle: 'رؤيتنا',
      visionText: 'في عالم مليء بالمعلومات المعقدة، تتمثل رؤيتنا في أن نكون المورد الإلكتروني الأكثر ثقة وسهولة في الاستخدام للحسابات اليومية. نؤمن بأن الجميع يستحق الوصول إلى أدوات عالية الجودة تبسط القرارات المتعلقة بالمالية والصحة وغيرها، بغض النظر عن لغتهم أو خلفيتهم.',
      whatWeDoTitle: 'ماذا نفعل',
      whatWeDoText: 'يقدم حسابتي مجموعة تضم أكثر من 24 آلة حاسبة ومحولاً تم تصميمها بدقة، مدعومة بمدونة شاملة. تغطي أدواتنا ثلاث فئات رئيسية: المالية، الصحة، والتحويلات. تم تصميم كل أداة لتكون بديهية وسريعة وموثوقة، مما يوفر لك إجابات فورية وشروحات واضحة.',
      commitmentTitle: 'التزامنا تجاهكم',
      trustTitle: 'الثقة والدقة',
      trustText: 'بينما يتم اختبار أدواتنا بدقة، إلا أنها مخصصة للأغراض المعلوماتية. نشجع المستخدمين على التحقق من الحسابات الهامة والتشاور مع المتخصصين للحصول على مشورة مالية أو طبية.',
      transparencyTitle: 'الشفافية',
      transparencyText: 'نحن ملتزمون بالشفافية حول كيفية عمل موقعنا. حسابتي هي خدمة مجانية مدعومة بالإعلانات (عبر Google AdSense). يتيح لنا هذا النموذج الحفاظ على منصتنا وتوسيعها دون فرض رسوم على مستخدمينا.',
      privacyTitle: 'الخصوصية',
      privacyText: 'خصوصيتك أمر بالغ الأهمية. نحن لا نخزن أي بيانات شخصية تدخلها في حاسباتنا. تتم جميع الحسابات في متصفحك، مما يضمن بقاء معلوماتك ملكًا لك. اقرأ سياسة الخصوصية الكاملة لمزيد من التفاصيل.',
    },
  };

  const currentContent = content[language];

  const commitments = [
    { title: currentContent.trustTitle, text: currentContent.trustText, icon: Shield },
    { title: currentContent.transparencyTitle, text: currentContent.transparencyText, icon: Eye },
    { title: currentContent.privacyTitle, text: currentContent.privacyText, icon: Target },
  ];

  return (
    <PageWrapper title={currentContent.title} subtitle={currentContent.subtitle}>
      <h2>{currentContent.visionTitle}</h2>
      <p>{currentContent.visionText}</p>
      
      <h2>{currentContent.whatWeDoTitle}</h2>
      <p>{currentContent.whatWeDoText}</p>

      <h2 className="text-center mt-16">{currentContent.commitmentTitle}</h2>
      <div className="grid md:grid-cols-3 gap-8 mt-8 not-prose">
        {commitments.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
