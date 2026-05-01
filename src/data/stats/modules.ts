import type { ModuleData } from '../types';

export const modules: ModuleData[] = [
  {
    id: "stats-combinatorics",
    title: "Combinatorics",
    icon: "Hash",
    description: "Permutations and combinations — counting arrangements and selections where order matters or doesn't.",
    lessons: [
      {
        title: "Permutations — Order Matters",
        content: "A permutation is an arrangement of objects where the order is important. Selecting A then B is different from selecting B then A.",
        formulas: [
          {
            formula: "P(n, r) = n! / (n - r)! — arrangements of r items from n",
            description: "n total items, r positions to fill, order matters",
            explanation: "Example: How many ways to arrange 3 people from 5 in a line? P(5,3) = 5!/(5-3)! = 120/2 = 60. The first position has 5 choices, second has 4, third has 3: 5 × 4 × 3 = 60."
          },
          {
            formula: "With repetition: n^r — each position can be any of n items",
            description: "Items can be reused in the arrangement",
            explanation: "Example: 3-digit codes using digits 0-9. Each digit has 10 choices: 10³ = 1000 possible codes. Repetition allowed — 111 is valid."
          }
        ]
      },
      {
        title: "Combinations — Order Doesn't Matter",
        content: "A combination is a selection of objects where order is irrelevant. Selecting {A, B} is the same as selecting {B, A}.",
        formulas: [
          {
            formula: "C(n, r) = n! / (r! × (n - r)!) — selections of r items from n",
            description: "n total items, r to select, order doesn't matter",
            explanation: "Example: Choose 3 people from 5 for a team. C(5,3) = 5!/(3!×2!) = 10. {Alice, Bob, Carol} is the same team as {Carol, Bob, Alice}."
          },
          {
            formula: "Key insight: C(n, r) = P(n, r) / r! — divide out the orderings",
            description: "Combinations = Permutations ÷ ways to reorder the selection",
            explanation: "P(5,3) = 60 counts every ordering. But {A,B,C} appears 3! = 6 times (ABC, ACB, BAC, BCA, CAB, CBA). So C(5,3) = 60/6 = 10."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "How many ways can you arrange 4 books from a shelf of 7?",
        options: ["35", "210", "840", "5040"],
        correctIndex: 2,
        explanation: "P(7,4) = 7!/(7-4)! = 7×6×5×4 = 840."
      },
      {
        question: "How many ways to choose 3 students from a class of 10?",
        options: ["720", "120", "100", "30"],
        correctIndex: 1,
        explanation: "C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 120."
      },
      {
        question: "How many 4-digit PINs can be made using digits 0-9 with repetition?",
        options: ["5040", "10000", "6561", "4096"],
        correctIndex: 1,
        explanation: "With repetition: 10⁴ = 10,000 possible PINs."
      },
      {
        question: "What is the key difference between permutations and combinations?",
        options: [
          "Permutations are faster to calculate",
          "Order matters in permutations but not in combinations",
          "Combinations use larger numbers",
          "They are the same thing"
        ],
        correctIndex: 1,
        explanation: "Permutations count arrangements (order matters). Combinations count selections (order doesn't matter)."
      },
      {
        question: "C(n, r) equals which expression?",
        options: [
          "n! / (n-r)!",
          "n! / (r! × (n-r)!)",
          "n^r",
          "r! / n!"
        ],
        correctIndex: 1,
        explanation: "C(n,r) = n! / (r! × (n-r)!) — the standard combination formula."
      }
    ],
    sampleData: {
      "Permutation vs Combination Examples": [
        ["Scenario", "Type", "Formula", "Answer"],
        ["Arrange 3 from 5 people in a line", "Permutation", "P(5,3)", "60"],
        ["Choose 3 from 5 for a team", "Combination", "C(5,3)", "10"],
        ["4-digit PIN with repetition", "Permutation (rep)", "10⁴", "10,000"],
        ["Pick 2 cards from a deck", "Combination", "C(52,2)", "1,326"],
      ]
    }
  },
  {
    id: "stats-probability-fundamentals",
    title: "Probability Fundamentals",
    icon: "Dices",
    description: "Sample spaces, events, axioms, addition and multiplication rules — the foundation of probability theory.",
    lessons: [
      {
        title: "Sample Space, Events & Random Variables",
        content: "Probability starts with defining all possible outcomes and the events we care about.",
        formulas: [
          {
            formula: "Sample Space (S): Set of all possible outcomes",
            description: "Example: Rolling a die → S = {1, 2, 3, 4, 5, 6}",
            explanation: "The sample space lists every outcome that could possibly occur. For a coin flip: S = {Heads, Tails}. For two dice: S has 36 outcomes."
          },
          {
            formula: "Event (E): A subset of the sample space",
            description: "Example: Rolling an even number → E = {2, 4, 6}",
            explanation: "An event is any collection of outcomes. 'Rolling a 6' is an event with one outcome. 'Rolling less than 4' is an event with three outcomes: {1, 2, 3}."
          },
          {
            formula: "Random Variable: A function that maps outcomes to numbers",
            description: "Discrete (countable values) or Continuous (any value in a range)",
            explanation: "Discrete: number of heads in 3 coin flips (0, 1, 2, 3). Continuous: the exact height of a randomly chosen person (any real number in a range)."
          }
        ]
      },
      {
        title: "Probability Rules",
        content: "The axioms and rules that govern how probabilities combine.",
        formulas: [
          {
            formula: "Axioms: 0 ≤ P(E) ≤ 1, P(S) = 1, P(∅) = 0",
            description: "Probability is always between 0 and 1; something must happen",
            explanation: "P(E) = 0 means impossible. P(E) = 1 means certain. The total probability of all outcomes sums to 1."
          },
          {
            formula: "Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
            description: "Subtract the overlap to avoid double-counting",
            explanation: "If A and B can both happen, P(A) + P(B) counts the overlap twice. Subtract P(A ∩ B) to fix this. If A and B are mutually exclusive: P(A ∪ B) = P(A) + P(B)."
          },
          {
            formula: "Multiplication Rule: P(A ∩ B) = P(A) × P(B|A)",
            description: "Probability both happen = P(first) × P(second given first)",
            explanation: "Independent events: P(A ∩ B) = P(A) × P(B). Example: P(Heads on coin) × P(6 on die) = 1/2 × 1/6 = 1/12. Dependent: must use conditional probability."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the sample space for flipping two coins?",
        options: [
          "{Heads, Tails}",
          "{HH, HT, TH, TT}",
          "{0, 1, 2}",
          "{H, T, H, T}"
        ],
        correctIndex: 1,
        explanation: "Two coins produce 4 outcomes: HH, HT, TH, TT."
      },
      {
        question: "If P(A) = 0.3, P(B) = 0.5, and P(A ∩ B) = 0.1, what is P(A ∪ B)?",
        options: ["0.8", "0.7", "0.6", "0.9"],
        correctIndex: 1,
        explanation: "P(A ∪ B) = 0.3 + 0.5 - 0.1 = 0.7."
      },
      {
        question: "If A and B are independent, P(A) = 0.4, P(B) = 0.6, what is P(A ∩ B)?",
        options: ["1.0", "0.24", "0.10", "0.60"],
        correctIndex: 1,
        explanation: "P(A ∩ B) = P(A) × P(B) = 0.4 × 0.6 = 0.24."
      },
      {
        question: "What does P(S) = 1 mean?",
        options: [
          "The sample space has 1 outcome",
          "Something in the sample space must happen",
          "All events are equally likely",
          "Probability is always 1"
        ],
        correctIndex: 1,
        explanation: "P(S) = 1 means the total probability of all possible outcomes is 1 — something must occur."
      },
      {
        question: "Which type of random variable is 'the exact temperature at noon'?",
        options: ["Discrete", "Continuous", "Binary", "Categorical"],
        correctIndex: 1,
        explanation: "Temperature can take any real value in a range, making it a continuous random variable."
      }
    ],
    sampleData: {
      "Probability Examples": [
        ["Experiment", "Sample Space", "Event", "Probability"],
        ["Roll a die", "{1,2,3,4,5,6}", "Roll > 4", "2/6 = 1/3"],
        ["Flip 2 coins", "{HH,HT,TH,TT}", "Exactly 1 Head", "2/4 = 1/2"],
        ["Draw a card", "52 cards", "Draw an Ace", "4/52 = 1/13"],
        ["Roll 2 dice", "36 outcomes", "Sum = 7", "6/36 = 1/6"],
      ]
    }
  },
  {
    id: "stats-bayes-theorem",
    title: "Conditional Probability & Bayes' Theorem",
    icon: "GitBranch",
    description: "How to update probabilities when new information arrives — the foundation of statistical inference.",
    lessons: [
      {
        title: "Conditional Probability",
        content: "Conditional probability answers: given that one event has occurred, what is the probability of another?",
        formulas: [
          {
            formula: "P(B|A) = P(A ∩ B) / P(A) — probability of B given A occurred",
            description: "Restricts the sample space to only outcomes where A happened",
            explanation: "Example: P(Rain|Cloudy) = P(Rain and Cloudy) / P(Cloudy). If 30% of days are cloudy and rainy, and 50% are cloudy: P(Rain|Cloudy) = 0.3/0.5 = 0.6."
          },
          {
            formula: "P(A|B) ≠ P(B|A) — the order matters!",
            description: "Common mistake: confusing P(disease|positive test) with P(positive test|disease)",
            explanation: "P(positive|disease) = 0.99 (test accuracy). P(disease|positive) depends on how rare the disease is. This is why Bayes' Theorem is needed."
          }
        ]
      },
      {
        title: "Bayes' Theorem",
        content: "Bayes' Theorem reverses conditional probabilities — it lets us compute P(A|B) from P(B|A).",
        formulas: [
          {
            formula: "P(A|B) = P(B|A) × P(A) / P(B)",
            description: "Posterior = Likelihood × Prior / Evidence",
            explanation: "P(A) = prior belief. P(B|A) = how likely the evidence is if A is true. P(B) = total probability of the evidence. P(A|B) = updated belief after seeing evidence."
          },
          {
            formula: "Extended: P(Aᵢ|B) = P(B|Aᵢ) × P(Aᵢ) / Σ P(B|Aⱼ) × P(Aⱼ)",
            description: "When there are multiple possible causes A₁, A₂, ..., Aₙ",
            explanation: "Example: A patient tests positive. Could be Disease A (1% prevalence, 95% accurate), Disease B (5% prevalence, 80% accurate), or healthy. Bayes computes the probability of each cause."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does P(B|A) represent?",
        options: [
          "Probability of A given B",
          "Probability of B given A has occurred",
          "Probability of both A and B",
          "Probability of A or B"
        ],
        correctIndex: 1,
        explanation: "P(B|A) is the conditional probability of B occurring, given that A has already occurred."
      },
      {
        question: "In Bayes' Theorem, what is the 'prior'?",
        options: [
          "P(B|A) — the likelihood",
          "P(A) — the initial belief before seeing evidence",
          "P(B) — the total evidence",
          "P(A|B) — the posterior"
        ],
        correctIndex: 1,
        explanation: "P(A) is the prior probability — what we believe about A before observing any evidence."
      },
      {
        question: "If P(A) = 0.2, P(B|A) = 0.8, P(B) = 0.4, what is P(A|B)?",
        options: ["0.16", "0.4", "0.8", "0.2"],
        correctIndex: 1,
        explanation: "P(A|B) = P(B|A) × P(A) / P(B) = 0.8 × 0.2 / 0.4 = 0.4."
      },
      {
        question: "Why is P(disease|positive test) different from P(positive test|disease)?",
        options: [
          "They are always the same",
          "The base rate (prevalence) of the disease affects the posterior",
          "Tests are never accurate",
          "Probability doesn't work that way"
        ],
        correctIndex: 1,
        explanation: "Even with a highly accurate test, if the disease is rare, most positive results will be false positives. Bayes' Theorem accounts for the base rate."
      },
      {
        question: "What is the 'posterior' in Bayes' Theorem?",
        options: [
          "The initial probability",
          "The updated probability after seeing evidence — P(A|B)",
          "The probability of the evidence",
          "The likelihood function"
        ],
        correctIndex: 1,
        explanation: "The posterior P(A|B) is the revised probability of A after incorporating the new evidence B."
      }
    ],
    sampleData: {
      "Bayes' Theorem — Medical Test Example": [
        ["Parameter", "Value", "Meaning"],
        ["P(Disease)", "0.01", "1% of population has the disease"],
        ["P(Positive|Disease)", "0.95", "Test is 95% sensitive"],
        ["P(Positive|No Disease)", "0.05", "5% false positive rate"],
        ["P(Disease|Positive)", "0.161", "Only 16.1% chance you have it if positive!"],
      ]
    }
  },
  {
    id: "stats-distributions",
    title: "Probability Distributions",
    icon: "BarChart3",
    description: "Binomial, Poisson, Normal, Exponential, Uniform, and Gamma — the distributions that model real-world randomness.",
    lessons: [
      {
        title: "Discrete Distributions",
        content: "Discrete distributions model random variables that take countable values — like the number of successes in a series of trials.",
        formulas: [
          {
            formula: "Binomial: P(X=x) = C(n,x) × pˣ × (1-p)ⁿ⁻ˣ",
            description: "n fixed trials, binary outcome (success/failure), probability p",
            explanation: "Example: 10 coin flips, probability of exactly 7 heads. n=10, p=0.5, x=7. P(X=7) = C(10,7) × 0.5⁷ × 0.5³ = 120 × 0.000977 = 0.117."
          },
          {
            formula: "Poisson: P(X=x) = e⁻ᵐ × λˣ / x!",
            description: "Rare events over a fixed interval, average rate λ",
            explanation: "Example: A call center receives 3 calls per minute on average. P(exactly 5 calls) = e⁻³ × 3⁵ / 5! = 0.0498 × 243 / 120 = 0.101."
          }
        ]
      },
      {
        title: "Continuous Distributions",
        content: "Continuous distributions model variables that can take any value in a range — like height, weight, or time.",
        formulas: [
          {
            formula: "Normal: f(x) = (1/σ√2π) × e^(-(x-μ)²/2σ²)",
            description: "Bell-shaped, symmetric, defined by mean μ and std deviation σ",
            explanation: "68% of data within 1σ, 95% within 2σ, 99.7% within 3σ. The most important distribution in statistics — many natural phenomena follow it."
          },
          {
            formula: "Standard Normal: Z = (X - μ) / σ",
            description: "Convert any normal distribution to Z ~ N(0, 1)",
            explanation: "Z-score tells you how many standard deviations X is from the mean. Z = 2 means X is 2σ above the mean. Use Z-tables to find probabilities."
          },
          {
            formula: "Exponential: f(x) = λe⁻ᵐˣ for x ≥ 0",
            description: "Waiting time between events in a Poisson process",
            explanation: "Example: Time between customer arrivals at a store. If λ = 2 per minute, P(wait < 1 min) = 1 - e⁻² = 0.865."
          },
          {
            formula: "Uniform: f(x) = 1/(b-a) for a ≤ x ≤ b",
            description: "All outcomes in [a, b] are equally likely",
            explanation: "Example: Random number generator producing values between 0 and 1. Every value has equal probability density."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Which distribution models the number of successes in n fixed trials?",
        options: ["Poisson", "Normal", "Binomial", "Exponential"],
        correctIndex: 2,
        explanation: "The Binomial distribution models the count of successes in n independent trials with probability p."
      },
      {
        question: "What percentage of normal distribution data falls within 2 standard deviations?",
        options: ["68%", "95%", "99.7%", "50%"],
        correctIndex: 1,
        explanation: "The empirical rule: ~95% of data falls within μ ± 2σ."
      },
      {
        question: "What does the Z-score formula Z = (X - μ) / σ do?",
        options: [
          "Calculates the mean",
          "Standardizes any normal distribution to N(0,1)",
          "Calculates variance",
          "Finds the median"
        ],
        correctIndex: 1,
        explanation: "Z-score converts any normal variable to the standard normal (mean=0, std=1) for easy probability lookup."
      },
      {
        question: "The Poisson distribution is used for:",
        options: [
          "Continuous measurements",
          "Counting rare events over a fixed interval",
          "Binary outcomes",
          "Uniform random selection"
        ],
        correctIndex: 1,
        explanation: "Poisson models the count of events occurring in a fixed interval of time or space, given an average rate λ."
      },
      {
        question: "What does the Exponential distribution model?",
        options: [
          "Number of trials until success",
          "Waiting time between events",
          "Sum of many random variables",
          "Binary outcomes"
        ],
        correctIndex: 1,
        explanation: "The Exponential distribution models the time between events in a Poisson process."
      }
    ],
    sampleData: {
      "Distribution Parameters": [
        ["Distribution", "Parameters", "Mean", "Variance"],
        ["Binomial", "n, p", "np", "np(1-p)"],
        ["Poisson", "λ", "λ", "λ"],
        ["Normal", "μ, σ", "μ", "σ²"],
        ["Exponential", "λ", "1/λ", "1/λ²"],
        ["Uniform", "a, b", "(a+b)/2", "(b-a)²/12"],
      ]
    }
  },
  {
    id: "stats-inferential",
    title: "Inferential Statistics",
    icon: "TrendingUp",
    description: "Central Limit Theorem, confidence intervals, and how we make population inferences from samples.",
    lessons: [
      {
        title: "Central Limit Theorem",
        content: "The CLT is the most important theorem in statistics — it explains why the normal distribution appears everywhere.",
        formulas: [
          {
            formula: "CLT: Sample mean distribution → Normal as n ≥ 30",
            description: "Regardless of the population distribution, the sampling distribution of the mean becomes normal",
            explanation: "Even if the population is skewed or uniform, take many samples of size n ≥ 30, compute each sample mean, and those means will form a normal distribution with mean μ and standard error σ/√n."
          },
          {
            formula: "Standard Error: SE = σ / √n",
            description: "How much sample means vary from sample to sample",
            explanation: "Larger samples → smaller SE → more precise estimates. If σ = 10 and n = 100, SE = 10/10 = 1. The sample mean will typically be within ±1 of the true mean."
          }
        ]
      },
      {
        title: "Confidence Intervals",
        content: "A confidence interval gives a range of plausible values for a population parameter, based on sample data.",
        formulas: [
          {
            formula: "CI for mean (large sample): x̄ ± z(α/2) × σ/√n",
            description: "95% CI uses z = 1.96, 99% CI uses z = 2.576",
            explanation: "Example: Sample mean = 50, σ = 10, n = 100. 95% CI = 50 ± 1.96 × 1 = [48.04, 51.96]. We are 95% confident the true population mean lies in this range."
          },
          {
            formula: "CI for mean (small sample, σ unknown): x̄ ± t(α/2, df) × s/√n",
            description: "Use t-distribution with df = n-1 when σ is unknown and n < 30",
            explanation: "The t-distribution has heavier tails than normal, accounting for uncertainty in estimating σ from the sample. As n increases, t approaches z."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does the Central Limit Theorem state?",
        options: [
          "All data is normally distributed",
          "Sample means approach normal distribution as sample size increases",
          "The population mean equals the sample mean",
          "Variance decreases with sample size"
        ],
        correctIndex: 1,
        explanation: "CLT: The sampling distribution of the mean approaches normal as n increases, regardless of the population distribution."
      },
      {
        question: "What is the standard error of the mean?",
        options: [
          "The standard deviation of the population",
          "σ/√n — how much sample means vary",
          "The margin of error",
          "The sample standard deviation"
        ],
        correctIndex: 1,
        explanation: "SE = σ/√n measures the variability of sample means around the population mean."
      },
      {
        question: "For a 95% confidence interval, what is the z-value?",
        options: ["1.645", "1.96", "2.576", "2.00"],
        correctIndex: 1,
        explanation: "z(0.025) = 1.96 for a 95% confidence interval (two-tailed)."
      },
      {
        question: "When should you use the t-distribution instead of the z-distribution?",
        options: [
          "When n > 30",
          "When σ is unknown and n < 30",
          "When the data is categorical",
          "Never"
        ],
        correctIndex: 1,
        explanation: "Use t-distribution when the population standard deviation is unknown and the sample size is small (n < 30)."
      },
      {
        question: "What does a 95% confidence interval mean?",
        options: [
          "95% of data falls in the interval",
          "If we repeated the study many times, 95% of intervals would contain the true parameter",
          "There's a 95% chance the true value is in this specific interval",
          "The interval is 95% accurate"
        ],
        correctIndex: 1,
        explanation: "The correct interpretation is about the procedure: 95% of intervals constructed this way would capture the true parameter."
      }
    ],
    sampleData: {
      "Confidence Interval Examples": [
        ["Scenario", "x̄", "σ", "n", "95% CI"],
        ["Test scores", "75", "12", "100", "75 ± 2.35 = [72.65, 77.35]"],
        ["Product weight", "500g", "8g", "64", "500 ± 1.96 = [498.04, 501.96]"],
        ["Response time", "2.3s", "0.5s", "36", "2.3 ± 0.16 = [2.14, 2.46]"],
      ]
    }
  },
  {
    id: "stats-hypothesis-testing",
    title: "Hypothesis Testing",
    icon: "FlaskConical",
    description: "Z-test, T-test, Chi-Square test, p-values — how to make data-driven decisions with statistical rigor.",
    lessons: [
      {
        title: "Hypotheses & Errors",
        content: "Hypothesis testing is a formal procedure for evaluating claims about population parameters using sample data.",
        formulas: [
          {
            formula: "Null Hypothesis (H₀): The default assumption — no effect, no difference",
            description: "Example: 'The new drug has no effect' or 'μ = 100'",
            explanation: "H₀ is what we assume true until evidence proves otherwise. We never 'accept' H₀ — we either reject it or fail to reject it."
          },
          {
            formula: "Type I Error: Reject H₀ when it's actually true (false positive)",
            description: "Probability = α (significance level, typically 0.05)",
            explanation: "Example: Concluding a drug works when it doesn't. Controlled by α — setting α = 0.05 means we accept a 5% risk of false positive."
          },
          {
            formula: "Type II Error: Fail to reject H₀ when it's actually false (false negative)",
            description: "Probability = β. Power = 1 - β",
            explanation: "Example: Missing a real drug effect. Power is the probability of correctly detecting a real effect. Higher power = better test."
          }
        ]
      },
      {
        title: "Statistical Tests",
        content: "Different tests for different scenarios — choosing the right test depends on sample size, known parameters, and data type.",
        formulas: [
          {
            formula: "Z-Test: Z = (x̄ - μ) / (σ/√n) — n > 30, σ known",
            description: "Reject H₀ if |Z| > 1.96 at α = 0.05 (two-tailed)",
            explanation: "Example: Test if mean height differs from 170cm. Sample: x̄ = 172, σ = 8, n = 100. Z = (172-170)/(8/10) = 2.5. Since 2.5 > 1.96, reject H₀."
          },
          {
            formula: "T-Test: t = (x̄ - μ) / (s/√n) — n ≤ 30, σ unknown, df = n-1",
            description: "Use t-table with df = n-1 to find critical value",
            explanation: "Same as Z-test but uses sample standard deviation s and t-distribution. For n = 15, df = 14, critical t at α = 0.05 (two-tailed) = 2.145."
          },
          {
            formula: "Chi-Square: χ² = Σ(O - E)² / E — test for categorical data",
            description: "O = observed frequency, E = expected frequency",
            explanation: "Example: Test if a die is fair. Roll 60 times, expect 10 per face. If face 1 shows 20 times: (20-10)²/10 = 10. Sum all faces, compare to χ² critical value with df = 5."
          },
          {
            formula: "p-value: If p ≤ α, reject H₀",
            description: "Probability of observing data this extreme if H₀ were true",
            explanation: "p = 0.03 means: if H₀ were true, there's only a 3% chance of seeing data this extreme. Since 0.03 < 0.05, we reject H₀."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the null hypothesis (H₀)?",
        options: [
          "The research hypothesis",
          "The default assumption of no effect or no difference",
          "The alternative hypothesis",
          "The probability of error"
        ],
        correctIndex: 1,
        explanation: "H₀ is the default position — there is no effect, no difference, or no relationship."
      },
      {
        question: "What is a Type I error?",
        options: [
          "Failing to detect a real effect",
          "Rejecting H₀ when it is actually true (false positive)",
          "Using the wrong test",
          "Having too small a sample"
        ],
        correctIndex: 1,
        explanation: "Type I error = false positive = rejecting a true null hypothesis. Probability = α."
      },
      {
        question: "When do you use a t-test instead of a z-test?",
        options: [
          "When n > 30",
          "When σ is unknown and n ≤ 30",
          "When data is categorical",
          "When testing proportions"
        ],
        correctIndex: 1,
        explanation: "T-test is used when the population standard deviation is unknown and the sample is small (n ≤ 30)."
      },
      {
        question: "What does a p-value of 0.03 mean?",
        options: [
          "H₀ is 97% likely to be true",
          "If H₀ were true, there's a 3% chance of seeing data this extreme",
          "The effect size is 3%",
          "The test is 97% accurate"
        ],
        correctIndex: 1,
        explanation: "p-value = probability of observing data at least this extreme, assuming H₀ is true."
      },
      {
        question: "In a Chi-Square test, what does O represent?",
        options: [
          "The expected frequency",
          "The observed frequency",
          "The total sample size",
          "The degrees of freedom"
        ],
        correctIndex: 1,
        explanation: "O = Observed frequency (what we actually counted). E = Expected frequency (what we'd expect if H₀ were true)."
      }
    ],
    sampleData: {
      "Hypothesis Test Decision Guide": [
        ["Scenario", "Test", "Formula", "Critical Value (α=0.05)"],
        ["n > 30, σ known", "Z-Test", "Z = (x̄-μ)/(σ/√n)", "|Z| > 1.96"],
        ["n ≤ 30, σ unknown", "T-Test", "t = (x̄-μ)/(s/√n)", "|t| > t(α/2, n-1)"],
        ["Categorical data", "Chi-Square", "χ² = Σ(O-E)²/E", "χ² > χ²(α, df)"],
        ["Compare two means", "Two-sample t", "t = (x̄₁-x̄₂)/SE", "|t| > t(α/2, df)"],
      ]
    }
  }
];
