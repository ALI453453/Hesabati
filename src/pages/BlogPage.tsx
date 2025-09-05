import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import { t } from '../data/translations';
import { blogPostsData } from '../data/blogPosts';
import BlogPostCard from '../components/Blog/BlogPostCard';

const BlogPage: React.FC = () => {
  const { language } = useAppContext();

  const pageTitle = `${t('blog', language)} | Hesabati`;
  const pageDescription = language === 'ar'
    ? 'مقالات وأدلة مفيدة حول الأدوات المالية والصحية والتحويلية لمساعدتك على اتخاذ قرارات أفضل.'
    : 'Helpful articles and guides on finance, health, and conversion tools to help you make better decisions.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://hesabati.com/blog" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <div className="bg-gray-50 dark:bg-gray-900 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('latestPosts', language)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPostsData.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
