import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { blogPostsData } from '../data/blogPosts';
import { t } from '../data/translations';
import DismissibleAd from '../components/Blog/DismissibleAd';
import FAQSchema from '../components/Blog/FAQSchema';
import NotFoundPage from './NotFoundPage';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useAppContext();
  const post = blogPostsData.find(p => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const contentParts = post.content[language].split('[AD_SLOT]');
  const pageTitle = `${post.title[language]} | Hesabati Blog`;
  const canonicalUrl = `https://hesabati.com/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={post.excerpt[language]} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hreflang="en" href={`https://hesabati.com/en/blog/${post.slug}`} />
        <link rel="alternate" hreflang="ar" href={`https://hesabati.com/ar/blog/${post.slug}`} />
        <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={post.excerpt[language]} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={post.excerpt[language]} />
        <meta name="twitter:image" content={post.featuredImage} />
      </Helmet>
      <FAQSchema post={post} />

      <article className="bg-white dark:bg-gray-900 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <header className="mb-8 text-center">
              <div className="mb-4">
                <Link to={`/tools/${post.relatedTool}`} className="text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wider text-sm">
                  {t(post.relatedTool.split('-')[0], language)} Guide
                </Link>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title[language]}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} {t('readTime', language)}</span>
                </div>
              </div>
            </header>

            <img loading="lazy" src={post.featuredImage} alt={post.title[language]} className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-lg mb-8" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:underline"
          >
            {contentParts.map((part, index) => (
              <Fragment key={index}>
                <div dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br />') }} />
                {index < contentParts.length - 1 && <DismissibleAd adId={`${slug}-article-${index}`} type="in-article" />}
              </Fragment>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 rounded-r-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'جرب الأداة بنفسك!' : 'Try the Tool Yourself!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {language === 'ar' ? 'هل أنت مستعد لتطبيق ما تعلمته؟ انتقل مباشرة إلى حاسبتنا التفاعلية.' : 'Ready to apply what you\'ve learned? Go straight to our interactive calculator.'}
            </p>
            <Link to={`/tools/${post.relatedTool}`} className="inline-flex items-center space-x-2 rtl:space-x-reverse font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              <span>{language === 'ar' ? 'افتح الحاسبة' : 'Open Calculator'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
