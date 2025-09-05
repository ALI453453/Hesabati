import React from 'react';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';

const PrivacyPage: React.FC = () => {
  const { language } = useAppContext();

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us. This policy explains what data we collect and why.',
      lastUpdated: 'Last Updated: July 26, 2025',
      sections: [
        { title: 'Introduction', text: 'Welcome to Hesabati ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our website (hesabati.com).' },
        { title: 'Information We Collect', text: 'We collect information in two ways: <br/> 1. <strong>Information you provide:</strong> When you use our contact form, you may provide us with personal information like your name and email address. <br/> 2. <strong>Information collected automatically:</strong> We use analytics tools (like Google Analytics) to collect non-personal information about your device and usage, such as your IP address, browser type, and pages visited. This helps us improve our service.' },
        { title: 'How We Use Your Information', text: 'We use the information we collect to: <br/> - Provide, operate, and maintain our website. <br/> - Improve, personalize, and expand our website. <br/> - Understand and analyze how you use our website. <br/> - Respond to your comments or questions submitted through the contact form.' },
        { title: 'Data Entered into Calculators', text: '<strong>We do not collect, store, or transmit any personal or financial data you enter into our calculators.</strong> All calculations are performed within your browser (client-side), and the data is discarded when you leave the page.' },
        { title: 'Cookies and Web Beacons', text: 'Like any other website, Hesabati uses \'cookies\'. These cookies are used to store information including visitors\' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users\' experience by customizing our web page content based on visitors\' browser type and/or other information.' },
        { title: 'Google AdSense & DoubleClick DART Cookie', text: 'Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>' },
        { title: 'Your Data Protection Rights (GDPR)', text: 'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: <br/> - The right to access <br/> - The right to rectification <br/> - The right to erasure <br/> - The right to restrict processing <br/> - The right to object to processing <br/> - The right to data portability. <br/> If you would like to exercise any of these rights, please contact us.' },
        { title: 'Changes to This Policy', text: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.' },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'خصوصيتك تهمنا. توضح هذه السياسة البيانات التي نجمعها ولماذا.',
      lastUpdated: 'آخر تحديث: 26 يوليو 2025',
      sections: [
        { title: 'مقدمة', text: 'مرحبًا بك في حسابتي ("نحن"، "لنا"، أو "خاصتنا"). نحن ملتزمون بحماية معلوماتك الشخصية وحقك في الخصوصية. تنطبق سياسة الخصوصية هذه على جميع المعلومات التي يتم جمعها من خلال موقعنا الإلكتروني (hesabati.com).' },
        { title: 'المعلومات التي نجمعها', text: 'نجمع المعلومات بطريقتين: <br/> 1. <strong>المعلومات التي تقدمها:</strong> عند استخدام نموذج الاتصال الخاص بنا، قد تزودنا بمعلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني. <br/> 2. <strong>المعلومات التي يتم جمعها تلقائيًا:</strong> نستخدم أدوات تحليلية (مثل Google Analytics) لجمع معلومات غير شخصية حول جهازك واستخدامك، مثل عنوان IP ونوع المتصفح والصفحات التي تمت زيارتها. هذا يساعدنا على تحسين خدمتنا.' },
        { title: 'كيف نستخدم معلوماتك', text: 'نستخدم المعلومات التي نجمعها من أجل: <br/> - توفير وتشغيل وصيانة موقعنا. <br/> - تحسين وتخصيص وتوسيع موقعنا. <br/> - فهم وتحليل كيفية استخدامك لموقعنا. <br/> - الرد على تعليقاتك أو أسئلتك المقدمة من خلال نموذج الاتصال.' },
        { title: 'البيانات المدخلة في الحاسبات', text: '<strong>نحن لا نجمع أو نخزن أو ننقل أي بيانات شخصية أو مالية تدخلها في حاسباتنا.</strong> تتم جميع الحسابات داخل متصفحك (من جانب العميل)، ويتم التخلص من البيانات عند مغادرة الصفحة.' },
        { title: 'ملفات تعريف الارتباط وإشارات الويب', text: 'مثل أي موقع آخر، يستخدم حسابتي "ملفات تعريف الارتباط". تُستخدم هذه الملفات لتخزين المعلومات بما في ذلك تفضيلات الزوار، والصفحات التي وصل إليها الزائر أو زارها على الموقع. تُستخدم المعلومات لتحسين تجربة المستخدمين من خلال تخصيص محتوى صفحة الويب الخاصة بنا بناءً على نوع متصفح الزوار و/أو معلومات أخرى.' },
        { title: 'Google AdSense و DoubleClick DART Cookie', text: 'جوجل هي إحدى بائعي الطرف الثالث على موقعنا. كما أنها تستخدم ملفات تعريف الارتباط، المعروفة باسم ملفات تعريف الارتباط DART، لخدمة الإعلانات لزوار موقعنا بناءً على زيارتهم لموقع www.website.com ومواقع أخرى على الإنترنت. ومع ذلك، يمكن للزوار اختيار رفض استخدام ملفات تعريف الارتباط DART عن طريق زيارة سياسة خصوصية شبكة إعلانات ومحتوى جوجل على الرابط التالي – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>' },
        { title: 'حقوق حماية البيانات الخاصة بك (GDPR)', text: 'نود أن نتأكد من أنك على دراية تامة بجميع حقوق حماية البيانات الخاصة بك. يحق لكل مستخدم ما يلي: <br/> - الحق في الوصول <br/> - الحق في التصحيح <br/> - الحق في المسح <br/> - الحق في تقييد المعالجة <br/> - الحق في الاعتراض على المعالجة <br/> - الحق في نقل البيانات. <br/> إذا كنت ترغب في ممارسة أي من هذه الحقوق، يرجى الاتصال بنا.' },
        { title: 'التغييرات على هذه السياسة', text: 'قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة. يُنصح بمراجعة سياسة الخصوصية هذه بشكل دوري لأي تغييرات.' },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <PageWrapper title={currentContent.title} subtitle={currentContent.subtitle}>
      <p className="text-sm text-gray-500">{currentContent.lastUpdated}</p>
      {currentContent.sections.map((section, index) => (
        <div key={index} className="mt-8">
          <h2>{section.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: section.text }}></p>
        </div>
      ))}
    </PageWrapper>
  );
};

export default PrivacyPage;
