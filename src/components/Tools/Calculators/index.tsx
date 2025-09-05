import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import imageCompression from 'browser-image-compression';
import jsPDF from 'jspdf';
import { useAppContext } from '../../../context/AppContext';
import ToolInput from '../UI/ToolInput';
import ToolSelect from '../UI/ToolSelect';
import ResultCard from '../UI/ResultCard';
import ProgressBar from '../UI/ProgressBar';
import { unitCategories } from '../../../data/units';

// --- TIMEZONES for Time Zone Converter ---
const timeZones = [
  { label: '(GMT-12:00) International Date Line West', value: 'Etc/GMT+12' },
  { label: '(GMT-11:00) Midway Island, Samoa', value: 'Pacific/Samoa' },
  { label: '(GMT-10:00) Hawaii', value: 'Pacific/Honolulu' },
  { label: '(GMT-09:00) Alaska', value: 'America/Anchorage' },
  { label: '(GMT-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
  { label: '(GMT-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
  { label: '(GMT-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
  { label: '(GMT-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
  { label: '(GMT-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
  { label: '(GMT-03:30) Newfoundland', value: 'America/St_Johns' },
  { label: '(GMT-03:00) Buenos Aires, Georgetown', value: 'America/Argentina/Buenos_Aires' },
  { label: '(GMT-02:00) Mid-Atlantic', value: 'Etc/GMT+2' },
  { label: '(GMT-01:00) Azores, Cape Verde Is.', value: 'Atlantic/Azores' },
  { label: '(GMT+00:00) London, Dublin, Lisbon', value: 'Europe/London' },
  { label: '(GMT+01:00) Amsterdam, Berlin, Rome, Paris', value: 'Europe/Paris' },
  { label: '(GMT+02:00) Cairo, Athens, Istanbul', value: 'Europe/Athens' },
  { label: '(GMT+03:00) Moscow, St. Petersburg, Riyadh', value: 'Europe/Moscow' },
  { label: '(GMT+03:30) Tehran', value: 'Asia/Tehran' },
  { label: '(GMT+04:00) Abu Dhabi, Muscat, Dubai', value: 'Asia/Dubai' },
  { label: '(GMT+04:30) Kabul', value: 'Asia/Kabul' },
  { label: '(GMT+05:00) Islamabad, Karachi, Tashkent', value: 'Asia/Karachi' },
  { label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: 'Asia/Kolkata' },
  { label: '(GMT+05:45) Kathmandu', value: 'Asia/Kathmandu' },
  { label: '(GMT+06:00) Almaty, Novosibirsk', value: 'Asia/Almaty' },
  { label: '(GMT+07:00) Bangkok, Hanoi, Jakarta', value: 'Asia/Bangkok' },
  { label: '(GMT+08:00) Beijing, Perth, Singapore, Hong Kong', value: 'Asia/Hong_Kong' },
  { label: '(GMT+09:00) Tokyo, Seoul, Osaka, Sapporo', value: 'Asia/Tokyo' },
  { label: '(GMT+09:30) Adelaide, Darwin', value: 'Australia/Darwin' },
  { label: '(GMT+10:00) Sydney, Melbourne, Guam', value: 'Australia/Sydney' },
  { label: '(GMT+11:00) Magadan, Solomon Is., New Caledonia', value: 'Pacific/Guadalcanal' },
  { label: '(GMT+12:00) Auckland, Wellington, Fiji', value: 'Pacific/Auckland' },
];

const currencies = {
  USD: { name: 'US Dollar', rate: 1 },
  EUR: { name: 'Euro', rate: 0.92 },
  JPY: { name: 'Japanese Yen', rate: 157.0 },
  GBP: { name: 'British Pound', rate: 0.78 },
  AUD: { name: 'Australian Dollar', rate: 1.5 },
  CAD: { name: 'Canadian Dollar', rate: 1.37 },
  CHF: { name: 'Swiss Franc', rate: 0.9 },
  CNY: { name: 'Chinese Yuan', rate: 7.24 },
  INR: { name: 'Indian Rupee', rate: 83.5 },
  SAR: { name: 'Saudi Riyal', rate: 3.75 },
};

// --- FINANCE CALCULATORS ---

export const LoanCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState('5');
  const [term, setTerm] = useState('5');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (p > 0 && r >= 0 && n > 0) {
      if (r === 0) { // Handle 0% interest rate
        const monthly = p / n;
        setResult({ monthly, total: p, interest: 0 });
      } else {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = monthly * n;
        const interest = total - p;
        setResult({ monthly, total, interest });
      }
      trackToolUsage('loan-calculator');
    }
  };

  useEffect(() => { calculate(); }, [amount, rate, term]);

  return (
    <div className="space-y-4">
      <ToolInput label="Loan Amount ($)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <ToolInput label="Annual Interest Rate (%)" type="number" value={rate} onChange={e => setRate(e.target.value)} />
      <ToolInput label="Loan Term (Years)" type="number" value={term} onChange={e => setTerm(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Loan Summary">
          <p>Monthly Payment: <strong>${result.monthly.toFixed(2)}</strong></p>
          <p>Total Payment: <strong>${result.total.toFixed(2)}</strong></p>
          <p>Total Interest: <strong>${result.interest.toFixed(2)}</strong></p>
        </ResultCard>
      )}
    </div>
  );
};

export const MortgageCalculator: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [homePrice, setHomePrice] = useState('300000');
    const [downPayment, setDownPayment] = useState('60000');
    const [interestRate, setInterestRate] = useState('4.5');
    const [loanTerm, setLoanTerm] = useState('30');
    const [propertyTax, setPropertyTax] = useState('1.2');
    const [homeInsurance, setHomeInsurance] = useState('1200');
    const [result, setResult] = useState<{ monthlyPayment: number; principalAndInterest: number; tax: number; insurance: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(homePrice) - parseFloat(downPayment);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;
        const monthlyTax = (parseFloat(homePrice) * (parseFloat(propertyTax) / 100)) / 12;
        const monthlyInsurance = parseFloat(homeInsurance) / 12;

        if (p > 0 && r >= 0 && n > 0) {
            const principalAndInterest = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;
            setResult({ monthlyPayment, principalAndInterest, tax: monthlyTax, insurance: monthlyInsurance });
            trackToolUsage('mortgage-calculator');
        }
    };

    useEffect(() => { calculate(); }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, homeInsurance]);

    return (
        <div className="space-y-4">
            <ToolInput label="Home Price ($)" type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)} />
            <ToolInput label="Down Payment ($)" type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
            <ToolInput label="Loan Term (Years)" type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
            <ToolInput label="Annual Interest Rate (%)" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
            <ToolInput label="Annual Property Tax (%)" type="number" value={propertyTax} onChange={e => setPropertyTax(e.target.value)} />
            <ToolInput label="Annual Home Insurance ($)" type="number" value={homeInsurance} onChange={e => setHomeInsurance(e.target.value)} />
            <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
            {result && (
                <ResultCard title="Mortgage Summary (PITI)">
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">${result.monthlyPayment.toFixed(2)}<span className="text-lg font-normal">/mo</span></p>
                    <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <p>Principal & Interest: <strong>${result.principalAndInterest.toFixed(2)}</strong></p>
                        <p>Property Tax: <strong>${result.tax.toFixed(2)}</strong></p>
                        <p>Home Insurance: <strong>${result.insurance.toFixed(2)}</strong></p>
                    </div>
                </ResultCard>
            )}
        </div>
    );
};

export const InvestmentReturnCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [initial, setInitial] = useState('1000');
  const [monthly, setMonthly] = useState('100');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{ futureValue: number; totalContribution: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(initial);
    const M = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (P >= 0 && M >= 0 && r >= 0 && n > 0) {
      const futureValuePrincipal = P * Math.pow(1 + r, n);
      const futureValueContributions = M * ((Math.pow(1 + r, n) - 1) / r);
      const futureValue = futureValuePrincipal + futureValueContributions;
      const totalContribution = P + (M * n);
      const totalInterest = futureValue - totalContribution;
      setResult({ futureValue, totalContribution, totalInterest });
      trackToolUsage('investment-return');
    }
  };

  useEffect(() => { calculate(); }, [initial, monthly, rate, years]);

  return (
    <div className="space-y-4">
      <ToolInput label="Initial Investment ($)" type="number" value={initial} onChange={e => setInitial(e.target.value)} />
      <ToolInput label="Monthly Contribution ($)" type="number" value={monthly} onChange={e => setMonthly(e.target.value)} />
      <ToolInput label="Estimated Annual Return (%)" type="number" value={rate} onChange={e => setRate(e.target.value)} />
      <ToolInput label="Investment Period (Years)" type="number" value={years} onChange={e => setYears(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Investment Projection">
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">${result.futureValue.toFixed(2)}</p>
          <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <p>Total Contributions: <strong>${result.totalContribution.toFixed(2)}</strong></p>
            <p>Total Interest Earned: <strong>${result.totalInterest.toFixed(2)}</strong></p>
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export const RetirementPlanner: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [currentAge, setCurrentAge] = useState('30');
  const [retireAge, setRetireAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [result, setResult] = useState<{ retirementNestEgg: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(currentSavings);
    const M = parseFloat(monthlyContribution);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = (parseFloat(retireAge) - parseFloat(currentAge)) * 12;

    if (n > 0 && r >= 0) {
      const futureValuePrincipal = P * Math.pow(1 + r, n);
      const futureValueContributions = M * ((Math.pow(1 + r, n) - 1) / r);
      const retirementNestEgg = futureValuePrincipal + futureValueContributions;
      setResult({ retirementNestEgg });
      trackToolUsage('retirement-planner');
    }
  };

  useEffect(() => { calculate(); }, [currentAge, retireAge, currentSavings, monthlyContribution, annualReturn]);

  return (
    <div className="space-y-4">
      <ToolInput label="Current Age" type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
      <ToolInput label="Retirement Age" type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} />
      <ToolInput label="Current Savings ($)" type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
      <ToolInput label="Monthly Contribution ($)" type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
      <ToolInput label="Estimated Annual Return (%)" type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Retirement Projection">
          <p>Estimated Nest Egg at Retirement:</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">${result.retirementNestEgg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </ResultCard>
      )}
    </div>
  );
};

export const BudgetPlanner: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [income, setIncome] = useState([{ name: 'Salary', amount: '3000' }]);
  const [expenses, setExpenses] = useState([{ name: 'Rent', amount: '1200' }, { name: 'Groceries', amount: '400' }]);
  
  const totalIncome = income.reduce((acc, item) => acc + parseFloat(item.amount || '0'), 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + parseFloat(item.amount || '0'), 0);
  const balance = totalIncome - totalExpenses;

  const handleIncomeChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newIncome = [...income];
    newIncome[index][field] = value;
    setIncome(newIncome);
  };

  const handleExpenseChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };
  
  const addIncome = () => setIncome([...income, { name: '', amount: '' }]);
  const addExpense = () => setExpenses([...expenses, { name: '', amount: '' }]);

  useEffect(() => { trackToolUsage('budget-planner'); }, [income, expenses]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Income</h3>
        {income.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <ToolInput label="" placeholder="Income Source" value={item.name} onChange={e => handleIncomeChange(index, 'name', e.target.value)} />
            <ToolInput label="" placeholder="Amount" type="number" value={item.amount} onChange={e => handleIncomeChange(index, 'amount', e.target.value)} />
          </div>
        ))}
        <button onClick={addIncome} className="text-sm text-primary-600">+ Add Income Source</button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Expenses</h3>
        {expenses.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <ToolInput label="" placeholder="Expense" value={item.name} onChange={e => handleExpenseChange(index, 'name', e.target.value)} />
            <ToolInput label="" placeholder="Amount" type="number" value={item.amount} onChange={e => handleExpenseChange(index, 'amount', e.target.value)} />
          </div>
        ))}
        <button onClick={addExpense} className="text-sm text-primary-600">+ Add Expense</button>
      </div>
      <ResultCard title="Budget Summary">
        <p>Total Income: <strong className="text-green-600">${totalIncome.toFixed(2)}</strong></p>
        <p>Total Expenses: <strong className="text-red-600">${totalExpenses.toFixed(2)}</strong></p>
        <p>Balance: <strong style={{ color: balance >= 0 ? '#22c55e' : '#ef4444' }}>${balance.toFixed(2)}</strong></p>
      </ResultCard>
    </div>
  );
};

export const TaxCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [income, setIncome] = useState('60000');
  const [result, setResult] = useState<{ effectiveRate: number; taxAmount: number } | null>(null);

  const calculate = () => {
    const inc = parseFloat(income);
    if (inc > 0) {
      let tax = 0;
      if (inc > 578125) tax += (inc - 578125) * 0.37;
      if (inc > 231250) tax += (Math.min(inc, 578125) - 231250) * 0.35;
      if (inc > 95375) tax += (Math.min(inc, 231250) - 95375) * 0.32;
      if (inc > 44725) tax += (Math.min(inc, 95375) - 44725) * 0.24;
      if (inc > 11000) tax += (Math.min(inc, 44725) - 11000) * 0.22;
      if (inc > 0) tax += Math.min(inc, 11000) * 0.10;
      const effectiveRate = (tax / inc) * 100;
      setResult({ taxAmount: tax, effectiveRate });
      trackToolUsage('tax-calculator');
    }
  };

  useEffect(() => { calculate(); }, [income]);

  return (
    <div className="space-y-4">
      <ToolInput label="Annual Gross Income ($)" type="number" value={income} onChange={e => setIncome(e.target.value)} />
      <p className="text-xs text-gray-500">Simplified US federal tax for a single filer (2023 rates). For estimation only.</p>
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Estimated Tax">
          <p>Estimated Tax Owed: <strong>${result.taxAmount.toFixed(2)}</strong></p>
          <p>Effective Tax Rate: <strong>{result.effectiveRate.toFixed(2)}%</strong></p>
        </ResultCard>
      )}
    </div>
  );
};

export const CurrencyConverter: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState('');

  const convert = () => {
    const amt = parseFloat(amount);
    if (amt > 0) {
      const fromRate = (currencies as any)[from].rate;
      const toRate = (currencies as any)[to].rate;
      const converted = (amt / fromRate) * toRate;
      setResult(converted.toFixed(2));
      trackToolUsage('currency-converter');
    }
  };

  useEffect(() => { convert(); }, [amount, from, to]);

  return (
    <div className="space-y-4">
      <ToolInput label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <ToolSelect label="From" value={from} onChange={e => setFrom(e.target.value)}>
          {Object.entries(currencies).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}
        </ToolSelect>
        <ToolSelect label="To" value={to} onChange={e => setTo(e.target.value)}>
          {Object.entries(currencies).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}
        </ToolSelect>
      </div>
      <p className="text-xs text-gray-500">Rates are for demonstration and not live.</p>
      {result && (
        <ResultCard title="Converted Amount">
          <p className="text-2xl font-bold">{result} {to}</p>
        </ResultCard>
      )}
    </div>
  );
};

export const DebtPayoff: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [debts, setDebts] = useState([{ name: 'Credit Card', balance: '5000', rate: '18', min: '100' }]);
  const [extraPayment, setExtraPayment] = useState('200');
  const [result, setResult] = useState<{ snowball: string; avalanche: string } | null>(null);

  const calculate = () => {
    // This is a simplified simulation. A real one is much more complex.
    const totalMinPayment = debts.reduce((acc, d) => acc + parseFloat(d.min), 0);
    const totalPayment = totalMinPayment + parseFloat(extraPayment);
    const totalDebt = debts.reduce((acc, d) => acc + parseFloat(d.balance), 0);
    const avgRate = debts.reduce((acc, d) => acc + parseFloat(d.rate), 0) / debts.length / 100;
    
    if (totalPayment > 0 && totalDebt > 0 && avgRate > 0) {
      // Simplified calculation
      const months = Math.log(totalPayment / (totalPayment - totalDebt * (avgRate / 12))) / Math.log(1 + (avgRate / 12));
      const years = (months / 12).toFixed(1);
      setResult({ snowball: `${years} years`, avalanche: `${(parseFloat(years) * 0.95).toFixed(1)} years` });
      trackToolUsage('debt-payoff');
    }
  };

  return (
    <div className="space-y-4">
       <p className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">This is a simplified demonstration. Full functionality coming soon.</p>
      <ToolInput label="Extra Monthly Payment ($)" type="number" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Estimated Payoff Time">
          <p>Snowball Method: ~<strong>{result.snowball}</strong></p>
          <p>Avalanche Method: ~<strong>{result.avalanche}</strong></p>
        </ResultCard>
      )}
    </div>
  );
};

// --- HEALTH CALCULATORS ---

export const BmiCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [height, setHeight] = useState('180');
  const [weight, setWeight] = useState('75');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      let color = '';
      if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
      else if (bmi < 25) { category = 'Normal weight'; color = '#22c55e'; }
      else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
      else { category = 'Obesity'; color = '#ef4444'; }
      setResult({ bmi, category, color });
      trackToolUsage('bmi-calculator');
    }
  };
  
  useEffect(() => { calculate(); }, [height, weight]);

  return (
    <div className="space-y-4">
      <ToolInput label="Height (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
      <ToolInput label="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Your BMI">
          <p className="text-3xl font-bold" style={{ color: result.color }}>{result.bmi.toFixed(1)}</p>
          <p className="font-semibold" style={{ color: result.color }}>{result.category}</p>
          <ProgressBar value={result.bmi} max={40} color={result.color} />
        </ResultCard>
      )}
    </div>
  );
};

export const CalorieCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [activity, setActivity] = useState('1.375');
  const [result, setResult] = useState<{ maintenance: number; lose: number; gain: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (w > 0 && h > 0 && a > 0) {
      let bmr = 0;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      const maintenance = bmr * act;
      setResult({ maintenance, lose: maintenance - 500, gain: maintenance + 500 });
      trackToolUsage('calorie-calculator');
    }
  };

  useEffect(() => { calculate(); }, [age, gender, weight, height, activity]);

  return (
    <div className="space-y-4">
      <ToolInput label="Age" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <ToolSelect label="Gender" value={gender} onChange={e => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </ToolSelect>
      <ToolInput label="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      <ToolInput label="Height (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
      <ToolSelect label="Activity Level" value={activity} onChange={e => setActivity(e.target.value)}>
        <option value="1.2">Sedentary</option>
        <option value="1.375">Lightly Active</option>
        <option value="1.55">Moderately Active</option>
        <option value="1.725">Very Active</option>
      </ToolSelect>
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Daily Calorie Needs">
          <p>Maintenance: <strong>{result.maintenance.toFixed(0)} kcal</strong></p>
          <p>Weight Loss (0.5kg/week): <strong>{result.lose.toFixed(0)} kcal</strong></p>
          <p>Weight Gain (0.5kg/week): <strong>{result.gain.toFixed(0)} kcal</strong></p>
        </ResultCard>
      )}
    </div>
  );
};

export const WaterIntake: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [weight, setWeight] = useState('75');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const wKg = parseFloat(weight);
    if (wKg > 0) {
      const liters = wKg * 0.033;
      setResult(liters.toFixed(2));
      trackToolUsage('water-intake');
    }
  };

  useEffect(() => { calculate(); }, [weight]);

  return (
    <div className="space-y-4">
      <ToolInput label="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      <p className="text-xs text-gray-500">Based on a general recommendation of 33ml per kg of body weight.</p>
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Recommended Daily Water Intake">
          <p className="text-2xl font-bold">{result} Liters</p>
        </ResultCard>
      )}
    </div>
  );
};

export const BodyFat: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('180');
  const [waist, setWaist] = useState('85');
  const [neck, setNeck] = useState('40');
  const [hip, setHip] = useState('90');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const p = parseFloat(hip);
    if (h > 0 && w > 0 && n > 0) {
      let bfp = 0;
      if (gender === 'male') {
        bfp = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else if (p > 0) {
        bfp = 495 / (1.29579 - 0.35004 * Math.log10(w + p - n) + 0.22100 * Math.log10(h)) - 450;
      }
      if (bfp > 0) {
        setResult(bfp.toFixed(1));
        trackToolUsage('body-fat');
      }
    }
  };
  
  useEffect(() => { calculate(); }, [gender, height, waist, neck, hip]);

  return (
    <div className="space-y-4">
      <ToolSelect label="Gender" value={gender} onChange={e => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </ToolSelect>
      <ToolInput label="Height (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
      <ToolInput label="Waist (cm)" type="number" value={waist} onChange={e => setWaist(e.target.value)} />
      <ToolInput label="Neck (cm)" type="number" value={neck} onChange={e => setNeck(e.target.value)} />
      {gender === 'female' && (
        <ToolInput label="Hip (cm)" type="number" value={hip} onChange={e => setHip(e.target.value)} />
      )}
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Estimated Body Fat">
          <p className="text-2xl font-bold">{result}%</p>
        </ResultCard>
      )}
    </div>
  );
};

export const HeartRate: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [age, setAge] = useState('30');
  const [result, setResult] = useState<{ max: number; moderate: string; vigorous: string } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    if (a > 0) {
      const max = 220 - a;
      const moderate = `${(max * 0.5).toFixed(0)} - ${(max * 0.7).toFixed(0)}`;
      const vigorous = `${(max * 0.7).toFixed(0)} - ${(max * 0.85).toFixed(0)}`;
      setResult({ max, moderate, vigorous });
      trackToolUsage('heart-rate');
    }
  };

  useEffect(() => { calculate(); }, [age]);

  return (
    <div className="space-y-4">
      <ToolInput label="Age" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Target Heart Rate Zones (bpm)">
          <p>Max Heart Rate: <strong>{result.max}</strong></p>
          <p>Moderate Intensity (50-70%): <strong>{result.moderate}</strong></p>
          <p>Vigorous Intensity (70-85%): <strong>{result.vigorous}</strong></p>
        </ResultCard>
      )}
    </div>
  );
};

export const SleepCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    const [hours, minutes] = wakeUpTime.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const wakeUpDate = new Date();
      wakeUpDate.setHours(hours, minutes, 0, 0);
      
      const bedtimes = [];
      for (let i = 6; i >= 3; i--) {
        const bedtime = new Date(wakeUpDate.getTime() - (i * 90 * 60 * 1000));
        bedtimes.push(bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      setResult(bedtimes);
      trackToolUsage('sleep-calculator');
    }
  };

  useEffect(() => { calculate(); }, [wakeUpTime]);

  return (
    <div className="space-y-4">
      <ToolInput label="I want to wake up at:" type="time" value={wakeUpTime} onChange={e => setWakeUpTime(e.target.value)} />
      <p className="text-xs text-gray-500">Based on 90-minute sleep cycles.</p>
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result.length > 0 && (
        <ResultCard title="Recommended Bedtimes">
          <p>Go to bed at one of the following times:</p>
          <div className="flex flex-wrap gap-2">
            {result.map(time => <span key={time} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full font-semibold">{time}</span>)}
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export const PregnancyCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [lmp, setLmp] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const lmpDate = new Date(lmp);
    if (!isNaN(lmpDate.getTime())) {
      lmpDate.setDate(lmpDate.getDate() + 280); // Add 280 days
      setResult(lmpDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      trackToolUsage('pregnancy-calculator');
    }
  };

  useEffect(() => { calculate(); }, [lmp]);

  return (
    <div className="space-y-4">
      <ToolInput label="First Day of Last Menstrual Period" type="date" value={lmp} onChange={e => setLmp(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Estimated Due Date">
          <p className="text-2xl font-bold">{result}</p>
        </ResultCard>
      )}
    </div>
  );
};

export const BloodPressure: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [result, setResult] = useState<{ category: string; color: string } | null>(null);

  const calculate = () => {
    const sys = parseInt(systolic, 10);
    const dia = parseInt(diastolic, 10);
    if (sys > 0 && dia > 0) {
      let category = '', color = '';
      if (sys < 120 && dia < 80) { category = 'Normal'; color = '#22c55e'; }
      else if (sys < 130 && dia < 80) { category = 'Elevated'; color = '#f59e0b'; }
      else if (sys < 140 || dia < 90) { category = 'Hypertension Stage 1'; color = '#f97316'; }
      else if (sys < 180 || dia < 120) { category = 'Hypertension Stage 2'; color = '#ef4444'; }
      else { category = 'Hypertensive Crisis'; color = '#be123c'; }
      setResult({ category, color });
      trackToolUsage('blood-pressure');
    }
  };

  useEffect(() => { calculate(); }, [systolic, diastolic]);

  return (
    <div className="space-y-4">
      <ToolInput label="Systolic (Top Number)" type="number" value={systolic} onChange={e => setSystolic(e.target.value)} />
      <ToolInput label="Diastolic (Bottom Number)" type="number" value={diastolic} onChange={e => setDiastolic(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Blood Pressure Category">
          <p className="text-2xl font-bold" style={{ color: result.color }}>{result.category}</p>
        </ResultCard>
      )}
    </div>
  );
};

// --- CONVERSION CALCULATORS ---

export const UnitConverter: React.FC = () => {
    const { trackToolUsage, language } = useAppContext();
    const [category, setCategory] = useState<keyof typeof unitCategories>('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('foot');
    const [value, setValue] = useState('1');
    const [result, setResult] = useState('');

    const handleConversion = () => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setResult('');
            return;
        }

        const cat = unitCategories[category];
        let baseValue: number;

        if (category === 'temperature') {
            const from = (cat.units as any)[fromUnit];
            baseValue = from.toBase(numValue);
        } else {
            const from = (cat.units as any)[fromUnit];
            baseValue = numValue * from.value;
        }
        
        let finalResult: number;
        if (category === 'temperature') {
            const to = (cat.units as any)[toUnit];
            finalResult = to.fromBase(baseValue);
        } else {
            const to = (cat.units as any)[toUnit];
            finalResult = baseValue / to.value;
        }

        setResult(finalResult.toFixed(4));
        trackToolUsage('unit-converter');
    };

    useEffect(() => {
        handleConversion();
    }, [value, fromUnit, toUnit, category]);
    
    useEffect(() => {
        const newCat = unitCategories[category];
        const newUnits = Object.keys(newCat.units);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
    }, [category]);

    return (
        <div className="space-y-4">
            <ToolSelect label="Category" value={category} onChange={e => setCategory(e.target.value as any)}>
                {Object.entries(unitCategories).map(([key, val]) => (
                    <option key={key} value={key}>{val.name[language]}</option>
                ))}
            </ToolSelect>
            <ToolInput label="Value" type="number" value={value} onChange={e => setValue(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
                <ToolSelect label="From" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
                    {Object.entries(unitCategories[category].units).map(([key, val]) => (
                        <option key={key} value={key}>{(val as any).name[language]}</option>
                    ))}
                </ToolSelect>
                <ToolSelect label="To" value={toUnit} onChange={e => setToUnit(e.target.value)}>
                     {Object.entries(unitCategories[category].units).map(([key, val]) => (
                        <option key={key} value={key}>{(val as any).name[language]}</option>
                    ))}
                </ToolSelect>
            </div>
            {result && (
                <ResultCard title="Result">
                    <p className="text-2xl font-bold">{result}</p>
                </ResultCard>
            )}
        </div>
    );
};

export const TimeZoneConverter: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [fromZone, setFromZone] = useState('America/New_York');
    const [toZone, setToZone] = useState('Europe/London');
    const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [result, setResult] = useState('');

    const convert = () => {
        try {
            const date = new Date(dateTime);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', timeZoneName: 'short',
                timeZone: toZone
            };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            
            setResult(formatter.format(date));
            trackToolUsage('time-zone-converter');
        } catch (e) {
            setResult('Invalid date or time zone.');
        }
    };
    
    useEffect(() => {
        if(dateTime) convert();
    }, [dateTime, fromZone, toZone]);

    return (
        <div className="space-y-4">
            <ToolInput label="Date and Time" type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
            <ToolSelect label="From Time Zone" value={fromZone} onChange={e => setFromZone(e.target.value)}>
                {timeZones.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
            </ToolSelect>
            <ToolSelect label="To Time Zone" value={toZone} onChange={e => setToZone(e.target.value)}>
                {timeZones.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
            </ToolSelect>
            {result && (
                <ResultCard title="Converted Time">
                    <p className="text-xl font-semibold">{result}</p>
                </ResultCard>
            )}
        </div>
    );
};

export const ColorConverter: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');
  const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };
  
  // Add handlers for RGB and HSL if needed, for now, HEX is the master
  useEffect(() => { trackToolUsage('color-converter'); }, [hex]);

  return (
    <div className="space-y-4">
      <ToolInput label="Color Picker" type="color" value={hex} onChange={e => handleHexChange(e.target.value)} className="h-12"/>
      <ToolInput label="HEX" value={hex} onChange={e => handleHexChange(e.target.value)} />
      <ToolInput label="RGB" value={rgb} readOnly />
      <ToolInput label="HSL" value={hsl} readOnly />
    </div>
  );
};

// Color conversion helpers
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const TextConverter: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [text, setText] = useState('Hello World');

  const toUpper = () => { setText(text.toUpperCase()); trackToolUsage('text-converter'); };
  const toLower = () => { setText(text.toLowerCase()); trackToolUsage('text-converter'); };
  const toTitleCase = () => { setText(text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())); trackToolUsage('text-converter'); };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={5} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
      <div className="grid grid-cols-3 gap-2">
        <button onClick={toUpper} className="bg-gray-200 dark:bg-gray-700 py-2 rounded-lg">UPPERCASE</button>
        <button onClick={toLower} className="bg-gray-200 dark:bg-gray-700 py-2 rounded-lg">lowercase</button>
        <button onClick={toTitleCase} className="bg-gray-200 dark:bg-gray-700 py-2 rounded-lg">Title Case</button>
      </div>
    </div>
  );
};

export const NumberBaseConverter: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [number, setNumber] = useState('1010');
    const [fromBase, setFromBase] = useState('2');
    const [toBase, setToBase] = useState('10');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const baseRegex: { [key: string]: RegExp } = {
        '2': /^[01]+$/,
        '8': /^[0-7]+$/,
        '10': /^[0-9]+$/,
        '16': /^[0-9a-fA-F]+$/,
    };

    const convert = () => {
        if (!baseRegex[fromBase].test(number)) {
            setError(`Invalid number for base ${fromBase}.`);
            setResult('');
            return;
        }
        setError('');
        try {
            const decimalValue = parseInt(number, parseInt(fromBase, 10));
            setResult(decimalValue.toString(parseInt(toBase, 10)).toUpperCase());
            trackToolUsage('number-base-converter');
        } catch (e) {
            setError('Conversion failed. Please check your input.');
            setResult('');
        }
    };
    
    useEffect(() => {
        convert();
    }, [number, fromBase, toBase]);

    return (
        <div className="space-y-4">
            <ToolInput label="Number" type="text" value={number} onChange={e => setNumber(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
                <ToolSelect label="From Base" value={fromBase} onChange={e => setFromBase(e.target.value)}>
                    <option value="2">Binary</option>
                    <option value="8">Octal</option>
                    <option value="10">Decimal</option>
                    <option value="16">Hexadecimal</option>
                </ToolSelect>
                <ToolSelect label="To Base" value={toBase} onChange={e => setToBase(e.target.value)}>
                    <option value="2">Binary</option>
                    <option value="8">Octal</option>
                    <option value="10">Decimal</option>
                    <option value="16">Hexadecimal</option>
                </ToolSelect>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && (
                <ResultCard title="Converted Value">
                    <p className="font-mono text-2xl break-all">{result}</p>
                </ResultCard>
            )}
        </div>
    );
};

export const DateCalculator: React.FC = () => {
  const { trackToolUsage } = useAppContext();
  const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setResult(`${diffDays} days`);
      trackToolUsage('date-calculator');
    }
  };

  useEffect(() => { calculate(); }, [date1, date2]);

  return (
    <div className="space-y-4">
      <ToolInput label="Start Date" type="date" value={date1} onChange={e => setDate1(e.target.value)} />
      <ToolInput label="End Date" type="date" value={date2} onChange={e => setDate2(e.target.value)} />
      <button onClick={calculate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Calculate</button>
      {result && (
        <ResultCard title="Difference">
          <p className="text-2xl font-bold">{result}</p>
        </ResultCard>
      )}
    </div>
  );
};

export const ImageCompressor: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string>('');
    const [compressedPreview, setCompressedPreview] = useState<string>('');
    const [isCompressing, setIsCompressing] = useState(false);
    const [options, setOptions] = useState({ maxSizeMB: 1, maxWidthOrHeight: 1920 });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setOriginalFile(e.target.files[0]);
            setOriginalPreview(URL.createObjectURL(e.target.files[0]));
            setCompressedFile(null);
            setCompressedPreview('');
        }
    };

    const handleCompress = async () => {
        if (!originalFile) return;
        setIsCompressing(true);
        try {
            const compressed = await imageCompression(originalFile, options);
            setCompressedFile(compressed);
            setCompressedPreview(URL.createObjectURL(compressed));
            trackToolUsage('image-compressor');
        } catch (error) {
            console.error(error);
        } finally {
            setIsCompressing(false);
        }
    };

    return (
        <div className="space-y-4">
            <ToolInput label="Select Image" type="file" accept="image/*" onChange={handleFileChange} />
            {originalFile && (
                <>
                    <button onClick={handleCompress} disabled={isCompressing} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400">
                        {isCompressing ? 'Compressing...' : 'Compress Image'}
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div>
                            <h4 className="font-semibold mb-2">Original</h4>
                            <img src={originalPreview} alt="Original" className="rounded-lg mx-auto max-h-64" />
                            <p className="text-sm mt-2">Size: {(originalFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {compressedFile && (
                            <div>
                                <h4 className="font-semibold mb-2">Compressed</h4>
                                <img src={compressedPreview} alt="Compressed" className="rounded-lg mx-auto max-h-64" />
                                <p className="text-sm mt-2">Size: {(compressedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                <p className="text-sm font-bold text-green-600">
                                    Reduction: {(((originalFile.size - compressedFile.size) / originalFile.size) * 100).toFixed(0)}%
                                </p>
                                <a href={compressedPreview} download={compressedFile.name} className="mt-2 inline-block text-primary-600 hover:underline">Download</a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export const ImageConverter: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [toFormat, setToFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/jpeg');
    const [convertedUrl, setConvertedUrl] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
            setConvertedUrl('');
        }
    };

    const handleConvert = () => {
        if (!file || !preview) return;
        const img = new Image();
        img.src = preview;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(toFormat, 0.9);
            setConvertedUrl(dataUrl);
            trackToolUsage('image-converter');
        };
    };
    
    return (
        <div className="space-y-4">
            <ToolInput label="Select Image" type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
                 <>
                    <img src={preview} alt="Preview" className="rounded-lg mx-auto max-h-64" />
                    <ToolSelect label="Convert To" value={toFormat} onChange={e => setToFormat(e.target.value as any)}>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                    </ToolSelect>
                    <button onClick={handleConvert} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Convert</button>
                    {convertedUrl && (
                        <ResultCard title="Converted Image">
                            <img src={convertedUrl} alt="Converted" className="rounded-lg mx-auto max-h-64" />
                            <a href={convertedUrl} download={`converted.${toFormat.split('/')[1]}`} className="mt-2 inline-block text-primary-600 hover:underline">Download</a>
                        </ResultCard>
                    )}
                </>
            )}
        </div>
    );
};

export const PdfConverter: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [files, setFiles] = useState<FileList | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleConvert = async () => {
        if (!files || files.length === 0) return;
        setIsConverting(true);
        const doc = new jsPDF();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            await new Promise<void>(resolve => {
                reader.onload = (e) => {
                    const imgData = e.target?.result as string;
                    const img = new Image();
                    img.src = imgData;
                    img.onload = () => {
                        const imgProps = doc.getImageProperties(imgData);
                        const pdfWidth = doc.internal.pageSize.getWidth();
                        const pdfHeight = doc.internal.pageSize.getHeight();
                        const ratio = imgProps.width / imgProps.height;
                        let imgWidth = pdfWidth;
                        let imgHeight = imgWidth / ratio;
                        if (imgHeight > pdfHeight) {
                            imgHeight = pdfHeight;
                            imgWidth = imgHeight * ratio;
                        }
                        const x = (pdfWidth - imgWidth) / 2;
                        const y = (pdfHeight - imgHeight) / 2;
                        if (i > 0) doc.addPage();
                        doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
                        resolve();
                    };
                };
                reader.readAsDataURL(file);
            });
        }
        doc.save('hesabati-converted.pdf');
        setIsConverting(false);
        trackToolUsage('pdf-converter');
    };

    return (
        <div className="space-y-4">
            <ToolInput label="Select Images" type="file" accept="image/*" multiple onChange={handleFileChange} />
            {files && <p>{files.length} image(s) selected.</p>}
            <button onClick={handleConvert} disabled={isConverting || !files} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400">
                {isConverting ? 'Converting...' : 'Convert to PDF'}
            </button>
        </div>
    );
};


export const QrCodeGenerator: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [text, setText] = useState('https://hesabati.com');
    const [qrValue, setQrValue] = useState('https://hesabati.com');

    const generate = () => {
        setQrValue(text);
        trackToolUsage('qr-generator');
    };

    useEffect(() => { generate(); }, [text]);

    return (
        <div className="space-y-4">
            <ToolInput label="Text or URL" type="text" value={text} onChange={e => setText(e.target.value)} />
            <button onClick={generate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Generate</button>
            {qrValue && (
                <ResultCard title="Your QR Code">
                    <div className="flex justify-center p-4 bg-white rounded-lg">
                        <QRCodeCanvas value={qrValue} size={256} />
                    </div>
                </ResultCard>
            )}
        </div>
    );
};

export const PasswordGenerator: React.FC = () => {
    const { trackToolUsage } = useAppContext();
    const [length, setLength] = useState(16);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');

    const generate = () => {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let charSet = lower;
        if (includeUpper) charSet += upper;
        if (includeNumbers) charSet += numbers;
        if (includeSymbols) charSet += symbols;

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }
        setPassword(newPassword);
        trackToolUsage('password-generator');
    };
    
    useEffect(() => {
        generate();
    }, [length, includeUpper, includeNumbers, includeSymbols]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label>Password Length: {length}</label>
              <ToolInput label="" type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value, 10))} />
            </div>
            <div className="flex justify-between items-center">
                <label>Include Uppercase</label>
                <input type="checkbox" checked={includeUpper} onChange={e => setIncludeUpper(e.target.checked)} className="h-5 w-5 rounded"/>
            </div>
            <div className="flex justify-between items-center">
                <label>Include Numbers</label>
                <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="h-5 w-5 rounded"/>
            </div>
            <div className="flex justify-between items-center">
                <label>Include Symbols</label>
                <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} className="h-5 w-5 rounded"/>
            </div>
            <button onClick={generate} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">Generate</button>
            {password && (
                <ResultCard title="Generated Password">
                    <p className="font-mono text-lg break-all">{password}</p>
                </ResultCard>
            )}
        </div>
    );
};

// --- PLACEHOLDERS ---
export const PlaceholderCalculator: React.FC<{ name: string }> = ({ name }) => (
    <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500">This calculator is under construction.</p>
    </div>
);
