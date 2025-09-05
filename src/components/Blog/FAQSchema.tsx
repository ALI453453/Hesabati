import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface FAQSchemaProps {
  post: BlogPost;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ post }) => {
  const { language } = useAppContext();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(item => ({
      "@type": "Question",
      "name": item.question[language],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer[language]
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default FAQSchema;
