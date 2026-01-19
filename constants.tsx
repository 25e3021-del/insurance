import React from 'react';

export const COMPANIES = [
  { id: '1', name: 'LIC', logo: 'fa-university', description: 'Life Insurance Corporation of India - The Trust of India', rating: 4.9, established: '1956', color: '#0054A6' },
  { id: '2', name: 'HDFC Life', logo: 'fa-chart-line', description: 'HDFC Life Insurance - Sar Utha Ke Jiyo', rating: 4.7, established: '2000', color: '#004B8D' },
  { id: '3', name: 'Star Health', logo: 'fa-heartbeat', description: 'Star Health - The Health Insurance Specialist', rating: 4.6, established: '2006', color: '#00AEEF' },
  { id: '4', name: 'Tata AIG', logo: 'fa-shield-alt', description: 'Tata AIG - With You Always', rating: 4.5, established: '2001', color: '#0033A0' },
  { id: '5', name: 'ICICI Lombard', logo: 'fa-car', description: 'ICICI Lombard - Nibhaye Vaade', rating: 4.6, established: '2001', color: '#FF6B00' },
  { id: '8', name: 'HDFC ERGO', logo: 'fa-hospital-user', description: 'HDFC ERGO - Take It Easy', rating: 4.8, established: '2002', color: '#ED1C24' },
];

export const POLICIES = [
  // --- LIC (Life Insurance Corporation of India) ---
  {
    id: 'lic_tt', company: 'LIC', name: 'LIC Tech Term', type: 'Term',
    description: 'A pure protection online term plan providing high financial security at low cost.',
    detailed_info: 'Available strictly via online mode. Provides a lump sum payment to the family in the event of the policyholder\'s death.',
    eligibility: 'Age: 18-65. Minimum Sum Assured: ₹50 Lakhs.',
    tax_benefits: '80C premium deduction and 10(10D) tax-free death benefit.',
    is_popular: true, rating: 4.9,
    features: ['Lowest Premium', 'Non-Smoker Rates', 'Accidental Rider', 'Online Direct']
  },
  {
    id: 'lic_ja', company: 'LIC', name: 'LIC Jeevan Anand', type: 'Endowment',
    description: 'Double benefit of protection and savings with lifelong risk cover.',
    detailed_info: 'A participating endowment plan that pays sum assured plus bonus at maturity, while the life cover continues for life.',
    eligibility: 'Age: 18-50. Term: 15-35 years.',
    tax_benefits: 'EEE status (80C & 10(10D)).',
    is_popular: true, rating: 4.8,
    features: ['Lifelong Cover', 'Maturity Bonus', 'Loan Facility', 'Double Death Benefit']
  },
  {
    id: 'lic_nja', company: 'LIC', name: 'LIC New Jeevan Amar', type: 'Term',
    description: 'Flexible offline term plan for comprehensive family protection.',
    detailed_info: 'Provides high life cover with flexibility to choose between Level and Increasing Sum Assured.',
    eligibility: 'Age: 18-65. Policy Term: 10-40 years.',
    tax_benefits: 'Full 80C benefits.',
    is_popular: false, rating: 4.7,
    features: ['Offline Flexibility', 'Women Specific Rates', 'Sum Assured Increase', 'Death Benefit in Installments']
  },
  {
    id: 'lic_siip', company: 'LIC', name: 'LIC SIIP', type: 'ULIP',
    description: 'Systematic Investment and Insurance Plan with market-linked returns.',
    detailed_info: 'A unit-linked plan that offers the dual benefit of life cover and wealth creation via four fund types.',
    eligibility: 'Age: 90 days to 65 years.',
    tax_benefits: 'Wealth creation under 80C tax limits.',
    is_popular: false, rating: 4.5,
    features: ['Market Growth', 'Partial Withdrawal', 'Fund Switching', 'Mortality Charge Refund']
  },
  {
    id: 'lic_cancer', company: 'LIC', name: 'LIC Cancer Cover Plan', type: 'Health',
    description: 'Fixed benefit health plan for all stages of cancer.',
    detailed_info: 'Provides financial stability upon diagnosis of specified cancer stages during the policy term.',
    eligibility: 'Age: 18-65. Sum Assured: ₹10-50 Lakhs.',
    tax_benefits: '80D medical premium deduction.',
    is_popular: true, rating: 4.6,
    features: ['Lump Sum Payout', 'Premium Waiver', 'Income Benefit', 'No Medical Test']
  },
  {
    id: 'lic_bj', company: 'LIC', name: 'LIC Bima Jyoti', type: 'Savings',
    description: 'Guaranteed additions plan for disciplined and safe wealth creation.',
    detailed_info: 'Provides fixed guaranteed additions of ₹50 per thousand of sum assured annually.',
    eligibility: 'Age: 90 days to 60 years. Term: 15-20 years.',
    tax_benefits: 'Standard Life Insurance tax exemptions.',
    is_popular: true, rating: 4.7,
    features: ['Fixed Returns', 'Limited Premium', 'Loan Facility', 'Liquidity']
  },

  // --- HDFC LIFE ---
  {
    id: 'hdfc_c2p', company: 'HDFC Life', name: 'HDFC Life Click 2 Protect Life', type: 'Term',
    description: 'Modern term insurance with Life and Critical Illness rebalancing.',
    detailed_info: 'Automatically manages your cover by increasing CI protection as you age. Includes terminal illness cover.',
    eligibility: 'Age: 18-65. Max maturity age: 80.',
    tax_benefits: '80C (Life) and 80D (CI Riders).',
    is_popular: true, rating: 4.9,
    features: ['CI Rebalance', 'Return of Premium', 'Whole Life Option', 'Terminal Illness']
  },
  {
    id: 'hdfc_sp', company: 'HDFC Life', name: 'HDFC Life Sanchay Plus', type: 'Savings',
    description: 'Non-linked plan offering 100% guaranteed regular income.',
    detailed_info: 'Provides fixed income for life or specific terms like 10, 25, or 30 years.',
    eligibility: 'Age: 5-60 years. Flexible premiums.',
    tax_benefits: 'Tax-free maturity and payouts under 10(10D).',
    is_popular: true, rating: 4.8,
    features: ['Guaranteed Income', 'Lifelong Payouts', 'Zero Risk', 'Lump Sum Option']
  },
  {
    id: 'hdfc_scp', company: 'HDFC Life', name: 'HDFC Life Sampoorn Cancer Plan', type: 'Health',
    description: 'Comprehensive cancer protection with financial assistance at every stage.',
    detailed_info: 'Covers Carcinoma-in-situ and Early Stage Cancers with staged lump sum payouts.',
    eligibility: 'Age: 18-65. Healthy individuals.',
    tax_benefits: '80D deductions.',
    is_popular: false, rating: 4.7,
    features: ['Stage-wise Payout', 'Premium Waiver', 'Income for 5 Years', 'Increasing Cover']
  },
  {
    id: 'hdfc_pgp', company: 'HDFC Life', name: 'HDFC Life Pension Guaranteed Plan', type: 'Retirement',
    description: 'Immediate annuity plan for a secure and worry-free retirement.',
    detailed_info: 'Single premium investment that yields lifelong guaranteed income for self or joint with spouse.',
    eligibility: 'Age: 30-85 years. One-time payment.',
    tax_benefits: 'Annuity income is taxable; purchase amount is exempt.',
    is_popular: true, rating: 4.7,
    features: ['Lifetime Income', 'Joint Life Protection', 'Return of Principal', 'Immediate Payout']
  },
  {
    id: 'hdfc_swp', company: 'HDFC Life', name: 'HDFC Life Smart Women Plan', type: 'Child/Women',
    description: 'Investment plan focused on women\'s major life events.',
    detailed_info: 'Covers pregnancy complications and provides for child education goals with premium waiver benefits.',
    eligibility: 'Women only. Age 18-50.',
    tax_benefits: 'Standard 80C benefits.',
    is_popular: false, rating: 4.6,
    features: ['Pregnancy Cover', 'Child Education', 'Premium Waiver', 'Market Linked']
  },

  // --- STAR HEALTH ---
  {
    id: 'star_comp', company: 'Star Health', name: 'Star Comprehensive Health Insurance', type: 'Health',
    description: 'All-in-one health protection for families including maternity.',
    detailed_info: 'Covers maternity, newborn baby from day 1, and OPD expenses with zero room rent capping.',
    eligibility: 'Age: 18-75. Family Floater up to 6 members.',
    tax_benefits: 'Full 80D tax relief.',
    is_popular: true, rating: 4.8,
    features: ['Maternity Cover', 'OPD Consultations', 'Air Ambulance', '100% Restoration']
  },
  {
    id: 'star_rc', company: 'Star Health', name: 'Star Senior Citizens Red Carpet', type: 'Health',
    description: 'No medical screening for seniors aged 60 to 75.',
    detailed_info: 'Specifically for seniors. Covers pre-existing diseases after just 12 months. OPD consultations included.',
    eligibility: 'Age: 60-75 years.',
    tax_benefits: '₹50,000 deduction under 80D.',
    is_popular: true, rating: 4.7,
    features: ['No Medical Tests', 'Fast Cashless', 'Senior Specific', 'Annual Checkup']
  },
  {
    id: 'star_ci', company: 'Star Health', name: 'Star Critical Illness Multi-Benefit', type: 'Health',
    description: 'Lump sum payment for 37 major critical illnesses.',
    detailed_info: 'Provides a safety net on diagnosis of heart attack, stroke, or cancer to help with debt and recovery.',
    eligibility: 'Age: 18-65 years.',
    tax_benefits: 'Section 80D savings.',
    is_popular: false, rating: 4.6,
    features: ['37 Major Diseases', 'Lump Sum Payout', 'Medical Opinion', 'Income Protect']
  },
  {
    id: 'star_ds', company: 'Star Health', name: 'Star Diabetes Safe Insurance Plan', type: 'Health',
    description: 'Focused cover for Type 1 and Type 2 diabetic complications.',
    detailed_info: 'Covers kidney damage, retinal issues, and other diabetic results from day 1.',
    eligibility: 'Diabetics. Age 18-65.',
    tax_benefits: 'Standard 80D benefits.',
    is_popular: false, rating: 4.5,
    features: ['Day 1 Complications', 'Dialysis Support', 'Wellness Rewards', 'Home Hospitalization']
  },
  {
    id: 'star_cc', company: 'Star Health', name: 'Star Cardiac Care Insurance Plan', type: 'Health',
    description: 'Specialized health cover for existing heart patients.',
    detailed_info: 'Designed for those who have had PTCA/CABG (heart surgery) in the past. Reliable for heart history.',
    eligibility: 'Age: 10-75. Post-heart surgery history.',
    tax_benefits: '80D health insurance.',
    is_popular: false, rating: 4.6,
    features: ['Heart Surgery Cover', 'Post-Op Care', 'Modern Treatment', 'Network Support']
  },

  // --- ICICI LOMBARD ---
  {
    id: 'icici_ha', company: 'ICICI Lombard', name: 'ICICI Lombard Health AdvantEdge', type: 'Health',
    description: 'Premium health plan with international cover and wellness points.',
    detailed_info: 'Covers consumables, global emergency medical, and provides air ambulance services.',
    eligibility: 'Age: 18-65. Individual or Family.',
    tax_benefits: '80D tax deductions.',
    is_popular: true, rating: 4.8,
    features: ['Global Cover', 'Consumables', 'Health Rewards', 'No Room Rent Cap']
  },
  {
    id: 'icici_ch', company: 'ICICI Lombard', name: 'ICICI Lombard Complete Health Insurance', type: 'Health',
    description: 'Reliable comprehensive health cover with fast cashless approvals.',
    detailed_info: 'The flagship health product from ICICI Lombard known for 30-minute cashless processing.',
    eligibility: 'Age: 18-65. Children from 91 days.',
    tax_benefits: 'Standard 80D relief.',
    is_popular: true, rating: 4.7,
    features: ['30-min Cashless', 'AYUSH Treatment', 'Donor Expenses', 'Maternity Option']
  },
  {
    id: 'icici_car', company: 'ICICI Lombard', name: 'ICICI Lombard Car Insurance (Private)', type: 'Motor',
    description: 'Full protection for your vehicle against theft, accident, and liability.',
    detailed_info: 'Extensive garage network and unique add-ons like Return to Invoice and Engine Protect.',
    eligibility: 'Private vehicle owners.',
    tax_benefits: 'N/A for individuals.',
    is_popular: true, rating: 4.6,
    features: ['Zero Dep Add-on', 'Roadside Assist', '6000+ Garages', 'Quick Payout']
  },
  {
    id: 'icici_2w', company: 'ICICI Lombard', name: 'ICICI Lombard Two Wheeler Insurance', type: 'Motor',
    description: 'Quick insurance for bikes and scooters with multi-year options.',
    detailed_info: 'Protection against legal liability and damage to the two-wheeler.',
    eligibility: 'Two-wheeler owners.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.5,
    features: ['Multi-year Policy', 'Personal Accident', 'Theft Protection', 'NCB Transfer']
  },
  {
    id: 'icici_travel', company: 'ICICI Lombard', name: 'ICICI Lombard Travel Insurance', type: 'Travel',
    description: 'Comprehensive international cover for business, students, and tourists.',
    detailed_info: 'Covers medical emergencies abroad, passport loss, and trip delays.',
    eligibility: 'Travelers up to age 85.',
    tax_benefits: 'N/A.',
    is_popular: true, rating: 4.7,
    features: ['Overseas Cashless', 'Study Interruption', 'Baggage Loss', 'Trip Delay']
  },
  {
    id: 'icici_home', company: 'ICICI Lombard', name: 'ICICI Lombard Home Insurance', type: 'Home',
    description: 'Security for your house structure and all internal contents.',
    detailed_info: 'Protects against fire, theft, natural disasters, and mechanical breakdown of electronics.',
    eligibility: 'Homeowners or Tenants.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.4,
    features: ['Burglary Cover', 'Natural Disaster', 'Jewelry Protection', 'Public Liability']
  },

  // --- HDFC ERGO ---
  {
    id: 'ergo_hs', company: 'HDFC ERGO', name: 'HDFC ERGO Health Suraksha', type: 'Health',
    description: 'Affordable health insurance with no room rent or disease sub-limits.',
    detailed_info: 'A solid base health plan with lifetime renewability and cumulative bonus.',
    eligibility: 'Age: 18-65.',
    tax_benefits: 'Section 80D deduction.',
    is_popular: true, rating: 4.7,
    features: ['No Sub-limits', 'Day Care Procedures', 'Tax Savings', 'Wide Network']
  },
  {
    id: 'ergo_mhm', company: 'HDFC ERGO', name: 'My:Health Medisure Super Top-up', type: 'Health',
    description: 'High-value health cover booster at a fraction of the cost.',
    detailed_info: 'Works alongside your base policy to cover large medical bills beyond a set limit.',
    eligibility: 'Existing policyholders. Age 18-65.',
    tax_benefits: '80D available.',
    is_popular: true, rating: 4.9,
    features: ['Low Premium', 'High Sum Insured', 'No Medical < 55', 'Family Options']
  },
  {
    id: 'ergo_mot', company: 'HDFC ERGO', name: 'HDFC ERGO Motor Insurance (Comprehensive)', type: 'Motor',
    description: 'Reliable car insurance with 24x7 emergency roadside assistance.',
    detailed_info: 'Covers personal accident, third-party liability, and own damage.',
    eligibility: 'Vehicle owners.',
    tax_benefits: 'N/A.',
    is_popular: true, rating: 4.8,
    features: ['Overnight Repair', '7600+ Garages', 'Zero Dep', 'Invoice Cover']
  },
  {
    id: 'ergo_2w', company: 'HDFC ERGO', name: 'HDFC ERGO Two Wheeler Insurance', type: 'Motor',
    description: 'Instant bike insurance with paperless online process.',
    detailed_info: 'Coverage for scooters and motorcycles against accidental damage and theft.',
    eligibility: 'Two-wheeler owners.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.5,
    features: ['Instant Policy', 'Long Term Plans', 'Paperless', 'Claim Support']
  },
  {
    id: 'ergo_travel', company: 'HDFC ERGO', name: 'HDFC ERGO Travel Insurance', type: 'Travel',
    description: 'International travel cover including medical and financial emergencies.',
    detailed_info: 'Emergency medical expenses and repatriation while traveling globally.',
    eligibility: 'Travelers up to 70 years.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.6,
    features: ['Medical Cashless', 'Passport Loss', 'Flight Delay', '24x7 Help']
  },
  {
    id: 'ergo_home', company: 'HDFC ERGO', name: 'HDFC ERGO Home Insurance', type: 'Home',
    description: 'Shield your building and valuables from fire and burglary.',
    detailed_info: 'Complete protection for your property and internal belongings.',
    eligibility: 'Property owners.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.5,
    features: ['Fire Protection', 'Burglary', 'Earthquake Cover', 'Appliance Breakdown']
  },

  // --- TATA AIG ---
  {
    id: 'tata_mc', company: 'Tata AIG', name: 'Tata AIG Medicare', type: 'Health',
    description: 'The global standard in health cover with consumables and worldwide assist.',
    detailed_info: 'Covers medical consumables and provides air ambulance and global critical illness support.',
    eligibility: 'Age: 18-65.',
    tax_benefits: '80D deduction.',
    is_popular: true, rating: 4.8,
    features: ['Global Assist', 'Consumables', 'Air Ambulance', '100% Restore']
  },
  {
    id: 'tata_mcp', company: 'Tata AIG', name: 'Tata AIG MediCare Prime', type: 'Health',
    description: 'Premium healthcare for HNI families with wellness rewards.',
    detailed_info: 'Includes annual checkups, high sum insured, and maternity benefits.',
    eligibility: 'Age: 18-65. HNIs.',
    tax_benefits: 'Maximum 80D savings.',
    is_popular: true, rating: 4.9,
    features: ['OPD Benefit', 'Checkups', 'High NCB', 'Premium Service']
  },
  {
    id: 'tata_ci', company: 'Tata AIG', name: 'Tata AIG Critical Illness Insurance Plan', type: 'Health',
    description: 'Lump sum benefit for 15+ major illnesses for total stability.',
    detailed_info: 'Provides financial backup when diagnosed with major life-altering diseases.',
    eligibility: 'Age: 18-65.',
    tax_benefits: '80D available.',
    is_popular: false, rating: 4.6,
    features: ['15 Major Diseases', 'Lump Sum', 'Quick Payout', 'Survival Benefit']
  },
  {
    id: 'tata_sc', company: 'Tata AIG', name: 'Tata AIG Senior Citizen Health Insurance', type: 'Health',
    description: 'Quality healthcare support focused on elderly parents.',
    detailed_info: 'Includes home nursing, organ donor cover, and AYUSH treatments.',
    eligibility: 'Age: 61+.',
    tax_benefits: '₹50,000 deduction.',
    is_popular: true, rating: 4.7,
    features: ['AYUSH Cover', 'Home Nursing', 'No Medical (Up to 70)', 'Organ Donor']
  },
  {
    id: 'tata_car', company: 'Tata AIG', name: 'Tata AIG Private Car Insurance', type: 'Motor',
    description: 'Comprehensive car cover backed by Tata legacy and wide network.',
    detailed_info: 'Covers accidental damage, theft, and third-party liabilities with 12+ add-ons.',
    eligibility: 'Car owners.',
    tax_benefits: 'N/A.',
    is_popular: true, rating: 4.7,
    features: ['Tata Network', 'Key Replacement', 'Tyre Secure', 'Engine Protect']
  },
  {
    id: 'tata_2w', company: 'Tata AIG', name: 'Tata AIG Two-Wheeler Insurance', type: 'Motor',
    description: 'Complete protection for bikes with multi-year plans.',
    detailed_info: 'Coverage against theft and collision for motorcycles and scooters.',
    eligibility: 'Two-wheeler owners.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.5,
    features: ['Multi-year', 'Liability Cover', 'Own Damage', 'Personal Accident']
  },
  {
    id: 'tata_tg', company: 'Tata AIG', name: 'Tata AIG Travel Guard', type: 'Travel',
    description: 'Worldwide assistance for tourists and business travelers.',
    detailed_info: 'Medical and financial emergency cover during international travel.',
    eligibility: 'Travelers up to 85 years.',
    tax_benefits: 'N/A.',
    is_popular: true, rating: 4.8,
    features: ['Medical Cashless', 'Passport Loss', 'Baggage Loss', 'Trip Delay']
  },
  {
    id: 'tata_stu', company: 'Tata AIG', name: 'Tata AIG Student Travel Insurance', type: 'Travel',
    description: 'Specialized international cover for Indian students abroad.',
    detailed_info: 'Includes study interruption, sponsor protection, and compassionate visit.',
    eligibility: 'Students aged 16-35.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.7,
    features: ['Study Interruption', 'Sponsor Protect', 'Bail Bond', 'Health Cover']
  },
  {
    id: 'tata_hp', company: 'Tata AIG', name: 'Tata AIG Home Insurance (Protector Plan)', type: 'Home',
    description: 'Superior safety for building, contents, and public liability.',
    detailed_info: 'Comprehensive plan covering the home structure and residents\' valuables.',
    eligibility: 'Homeowners.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.5,
    features: ['Public Liability', 'Fire Cover', 'Jewelry Protection', 'Residents Cover']
  },
  {
    id: 'tata_pa', company: 'Tata AIG', name: 'Tata AIG Personal Accident Insurance', type: 'Health',
    description: 'Fixed compensation for accidental death or permanent disability.',
    detailed_info: 'Provides financial stability during unexpected accidental events.',
    eligibility: 'Age: 18-70.',
    tax_benefits: 'N/A.',
    is_popular: false, rating: 4.6,
    features: ['Accidental Death', 'Permanent Disability', 'Education Bonus', 'Income Protect']
  },
  {
    id: 'tata_corp', company: 'Tata AIG', name: 'Tata AIG Corporate/Business Insurance Solutions', type: 'Corporate',
    description: 'Commercial cover for factories, offices, and group health.',
    detailed_info: 'Tailored solutions for business liabilities, group medical, and transit risks.',
    eligibility: 'Registered Businesses.',
    tax_benefits: 'Business Expense Deduction.',
    is_popular: false, rating: 4.8,
    features: ['Group Health', 'Marine Transit', 'Liability Protection', 'Fire/MSME Cover']
  }
];

export const SERVICE_TYPES = [
  'Policy Purchase',
  'Policy Renewal',
  'Claim Assistance',
  'Address/Contact Change',
  'Nominee Update',
  'Premium Payment Query',
  'Consultation Request',
  'Maturity/Survival Benefit Claim',
  'Home Visit Request',
  'Other'
];