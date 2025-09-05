import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';
import Accordion from '../components/UI/Accordion';

const FAQPage: React.FC = () => {
  const { language } = useAppContext();

  const faqs = {
    en: [
      { question: 'Is Hesabati completely free to use?', answer: 'Yes, all our tools, calculators, and articles are 100% free. The website is supported by advertisements to keep it free for everyone.' },
      { question: 'How accurate are the calculators?', answer: 'Our calculators are designed and rigorously tested to provide accurate estimates for informational purposes. However, they should not be used as a substitute for professional advice. Please verify any critical calculations.' },
      { question: 'Is my data safe and private?', answer: 'Absolutely. We do not store any personal or financial data you enter into the calculators. All calculations are processed in your browser, and the data is gone when you close the page. Please see our Privacy Policy for more details.' },
      { question: 'Why do I see ads on the website?', answer: 'We use Google AdSense to display ads. The revenue generated from these ads helps us cover the costs of running, maintaining, and developing new tools for the website, ensuring it remains a free resource.' },
      { question: 'How can I switch the language or theme?', answer: 'You can change the language (English/Arabic) and theme (Light/Dark) using the toggle buttons located in the top-right corner of the website header.' },
      { question: 'Can I suggest a new tool or feature?', answer: 'Yes, we would love to hear your ideas! Please use the form on our Contact Us page to send us your suggestions.' },
      { question: 'Who is behind Hesabati?', answer: 'Hesabati is developed and maintained by a small team of passionate developers and content creators dedicated to making complex calculations simple and accessible to a global audience.' },
      { question: 'How can I export or share my calculation results?', answer: 'Many of our tools include "Copy", "Share", or "Export" buttons. These allow you to easily copy the results to your clipboard or share a link to the tool.' },
      { question: 'Where can I learn more about the topics in the calculators?', answer: 'Each of our tools is linked to a detailed article on our Blog. These articles provide in-depth explanations, guides, and answers to frequently asked questions about the topic.' },
      { question: 'What should I do if I find an error?', answer: 'If you believe you have found an error in a calculation or a bug on the site, please report it to us via our Contact Us page. We appreciate your help in improving our service.' },
    ],
    ar: [
      { question: 'هل استخدام حسابتي مجاني تمامًا؟', answer: 'نعم، جميع أدواتنا وحاسباتنا ومقالاتنا مجانية 100٪. يتم دعم الموقع عن طريق الإعلانات لإبقائه مجانيًا للجميع.' },
      { question: 'ما مدى دقة الحاسبات؟', answer: 'تم تصميم حاسباتنا واختبارها بدقة لتقديم تقديرات دقيقة للأغراض المعلوماتية. ومع ذلك، لا ينبغي استخدامها كبديل للمشورة المهنية. يرجى التحقق من أي حسابات هامة.' },
      { question: 'هل بياناتي آمنة وخصوصية؟', answer: 'بالتأكيد. نحن لا نخزن أي بيانات شخصية أو مالية تدخلها في الحاسبات. تتم معالجة جميع الحسابات في متصفحك، وتختفي البيانات عند إغلاق الصفحة. يرجى الاطلاع على سياسة الخصوصية لمزيد من التفاصيل.' },
      { question: 'لماذا أرى إعلانات على الموقع؟', answer: 'نحن نستخدم Google AdSense لعرض الإعلانات. تساعدنا الإيرادات الناتجة عن هذه الإعلانات على تغطية تكاليف تشغيل وصيانة وتطوير أدوات جديدة للموقع، مما يضمن بقاءه موردًا مجانيًا.' },
      { question: 'كيف يمكنني تغيير اللغة أو المظهر؟', answer: 'يمكنك تغيير اللغة (الإنجليزية/العربية) والمظهر (فاتح/داكن) باستخدام أزرار التبديل الموجودة في الزاوية العلوية اليمنى من رأس الموقع.' },
      { question: 'هل يمكنني اقتراح أداة أو ميزة جديدة؟', answer: 'نعم، نود أن نسمع أفكارك! يرجى استخدام النموذج الموجود في صفحة اتصل بنا لإرسال اقتراحاتك إلينا.' },
      { question: 'من يقف وراء حسابتي؟', answer: 'تم تطوير وصيانة حسابتي بواسطة فريق صغير من المطورين ومنشئي المحتوى الشغوفين المكرسين لجعل الحسابات المعقدة بسيطة ومتاحة لجمهور عالمي.' },
      { question: 'كيف يمكنني تصدير أو مشاركة نتائج حساباتي؟', answer: 'تتضمن العديد من أدواتنا أزرار "نسخ" أو "مشاركة" أو "تصدير". تتيح لك هذه الأزرار نسخ النتائج بسهولة إلى الحافظة أو مشاركة رابط إلى الأداة.' },
      { question: 'أين يمكنني معرفة المزيد عن الموضوعات في الحاسبات؟', answer: 'ترتبط كل أداة من أدواتنا بمقال مفصل في مدونتنا. تقدم هذه المقالات شروحات وأدلة متعمقة وإجابات على الأسئلة المتداولة حول الموضوع.' },
      { question: 'ماذا أفعل إذا وجدت خطأ؟', answer: 'إذا كنت تعتقد أنك وجدت خطأ في عملية حسابية أو خللًا في الموقع، فيرجى إبلاغنا بذلك عبر صفحة اتصل بنا. نحن نقدر مساعدتك في تحسين خدمتنا.' },
    ],
  };

  const currentFaqs = faqs[language];
  const pageTitle = language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions';
  const pageSubtitle = language === 'ar' ? 'لديك أسئلة؟ لدينا إجابات. اعثر على ما تحتاجه أدناه.' : 'Have questions? We have answers. Find what you need below.';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentFaqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Hesabati`}</title>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <PageWrapper title={pageTitle} subtitle={pageSubtitle}>
        <div className="not-prose">
          <Accordion items={currentFaqs} />
        </div>
      </PageWrapper>
    </>
  );
};

export default FAQPage;
