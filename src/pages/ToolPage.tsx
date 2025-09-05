import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toolsData } from '../data/tools';
import { useAppContext } from '../context/AppContext';
import NotFoundPage from './NotFoundPage';
import * as Calculators from '../components/Tools/Calculators';
import { ArrowRight } from 'lucide-react';

const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useAppContext();
  const tool = toolsData.find(t => t.slug === slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  const getCalculatorComponent = (id: string) => {
    switch (id) {
      case 'loan-calculator': return <Calculators.LoanCalculator />;
      case 'mortgage-calculator': return <Calculators.MortgageCalculator />;
      case 'investment-return': return <Calculators.InvestmentReturnCalculator />;
      case 'retirement-planner': return <Calculators.RetirementPlanner />;
      case 'budget-planner': return <Calculators.BudgetPlanner />;
      case 'tax-calculator': return <Calculators.TaxCalculator />;
      case 'currency-converter': return <Calculators.CurrencyConverter />;
      case 'debt-payoff': return <Calculators.DebtPayoff />;
      case 'bmi-calculator': return <Calculators.BmiCalculator />;
      case 'calorie-calculator': return <Calculators.CalorieCalculator />;
      case 'water-intake': return <Calculators.WaterIntake />;
      case 'body-fat': return <Calculators.BodyFat />;
      case 'heart-rate': return <Calculators.HeartRate />;
      case 'sleep-calculator': return <Calculators.SleepCalculator />;
      case 'pregnancy-calculator': return <Calculators.PregnancyCalculator />;
      case 'blood-pressure': return <Calculators.BloodPressure />;
      case 'unit-converter': return <Calculators.UnitConverter />;
      case 'time-zone': return <Calculators.TimeZone />;
      case 'color-converter': return <Calculators.ColorConverter />;
      case 'text-converter': return <Calculators.TextConverter />;
      case 'number-base': return <Calculators.NumberBase />;
      case 'date-calculator': return <Calculators.DateCalculator />;
      case 'qr-generator': return <Calculators.QrCodeGenerator />;
      case 'password-generator': return <Calculators.PasswordGenerator />;
      default: return <p>Calculator not found.</p>;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {tool.title[language]}
              </h1>
              {getCalculatorComponent(tool.id)}
            </div>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert"
          >
            <h2>{language === 'ar' ? 'عن هذه الأداة' : 'About This Tool'}</h2>
            <p>{tool.description[language]}</p>
            
            <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 rounded-r-lg not-prose">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'تعلم المزيد' : 'Learn More'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === 'ar' ? 'اقرأ مقالنا المفصل للحصول على رؤى أعمق ونصائح الخبراء.' : 'Read our detailed article for deeper insights and expert tips.'}
              </p>
              <Link to={`/blog/${tool.slug.replace(/-calculator$/, '')}`} className="inline-flex items-center space-x-2 rtl:space-x-reverse font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                <span>{language === 'ar' ? 'اذهب إلى المقال' : 'Go to Article'}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
