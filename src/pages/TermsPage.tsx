import React from 'react';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';

const TermsPage: React.FC = () => {
  const { language } = useAppContext();

  const content = {
    en: {
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully before using our service.',
      lastUpdated: 'Last Updated: July 26, 2025',
      sections: [
        { title: '1. Acceptance of Terms', text: 'By accessing and using Hesabati (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.' },
        { title: '2. Disclaimer of Liability', text: 'The calculators, converters, and information on this Service are provided for general informational purposes only. We make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information or calculation on the site. <strong>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information or calculation provided.</strong> Your use of the site and your reliance on any information is solely at your own risk.' },
        { title: '3. User Responsibility', text: 'You are responsible for verifying the accuracy of any results obtained from the calculators. The Service is not a substitute for professional financial, medical, or legal advice. Always consult with a qualified professional before making any decisions based on the information provided by this Service.' },
        { title: '4. Advertising and Third-Party Links', text: 'The Service is supported by advertising (Google AdSense) and may contain links to other websites or content belonging to or originating from third parties. We are not responsible for the content, accuracy, or opinions expressed in such websites, and such websites are not investigated, monitored, or checked for accuracy or completeness by us.' },
        { title: '5. Intellectual Property', text: 'The Service and its original content, features, and functionality are and will remain the exclusive property of Hesabati. The content is protected by copyright and other laws. Our trademarks may not be used in connection with any product or service without our prior written consent.' },
        { title: '6. Changes to Terms', text: 'We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new terms.' },
      ],
    },
    ar: {
      title: 'شروط الخدمة',
      subtitle: 'يرجى قراءة هذه الشروط بعناية قبل استخدام خدمتنا.',
      lastUpdated: 'آخر تحديث: 26 يوليو 2025',
      sections: [
        { title: '1. قبول الشروط', text: 'من خلال الوصول إلى حسابتي ("الخدمة") واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذا الاتفاق. إذا كنت لا توافق على الالتزام بهذه الشروط، يرجى عدم استخدام هذه الخدمة.' },
        { title: '2. إخلاء المسؤولية', text: 'يتم توفير الحاسبات والمحولات والمعلومات الموجودة في هذه الخدمة لأغراض إعلامية عامة فقط. نحن لا نقدم أي تعهد أو ضمان من أي نوع، صريحًا أو ضمنيًا، فيما يتعلق بدقة أو كفاية أو صلاحية أو موثوقية أو اكتمال أي معلومات أو حسابات على الموقع. <strong>تحت أي ظرف من الظروف، لن نتحمل أي مسؤولية تجاهك عن أي خسارة أو ضرر من أي نوع يحدث نتيجة لاستخدام الموقع أو الاعتماد على أي معلومات أو حسابات مقدمة.</strong> استخدامك للموقع واعتمادك على أي معلومات هو على مسؤوليتك الخاصة فقط.' },
        { title: '3. مسؤولية المستخدم', text: 'أنت مسؤول عن التحقق من دقة أي نتائج تم الحصول عليها من الحاسبات. الخدمة ليست بديلاً عن المشورة المهنية المالية أو الطبية أو القانونية. استشر دائمًا متخصصًا مؤهلاً قبل اتخاذ أي قرارات بناءً على المعلومات المقدمة من هذه الخدمة.' },
        { title: '4. الإعلانات وروابط الطرف الثالث', text: 'الخدمة مدعومة بالإعلانات (Google AdSense) وقد تحتوي على روابط لمواقع ويب أخرى أو محتوى يخص أو ينشأ من أطراف ثالثة. نحن لسنا مسؤولين عن المحتوى أو الدقة أو الآراء المعبر عنها في مثل هذه المواقع، ولا يتم التحقيق في هذه المواقع أو مراقبتها أو التحقق من دقتها أو اكتمالها من قبلنا.' },
        { title: '5. الملكية الفكرية', text: 'الخدمة ومحتواها الأصلي وميزاتها ووظائفها هي وستبقى ملكية حصرية لـ حسابتي. المحتوى محمي بموجب حقوق النشر والقوانين الأخرى. لا يجوز استخدام علاماتنا التجارية فيما يتعلق بأي منتج أو خدمة دون موافقتنا الخطية المسبقة.' },
        { title: '6. التغييرات على الشروط', text: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإعلامك بأي تغييرات عن طريق نشر شروط الخدمة الجديدة على هذه الصفحة. استمرارك في استخدام الخدمة بعد أي تغييرات من هذا القبيل يشكل قبولك للشروط الجديدة.' },
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

export default TermsPage;
