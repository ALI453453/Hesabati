import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { t } from '../../data/translations';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const { language } = useAppContext();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group h-full flex flex-col"
    >
      <a href={`/blog/${post.slug}`} className="block h-full flex flex-col">
        <img
          loading="lazy"
          src={post.featuredImage}
          alt={post.title[language]}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} {t('readTime', language)}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 flex-grow">
            {post.title[language]}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {post.excerpt[language]}
          </p>
          <div className="mt-auto flex items-center justify-between text-primary-600 dark:text-primary-400 font-semibold">
            <span>{t('readMore', language)}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default React.memo(BlogPostCard);
