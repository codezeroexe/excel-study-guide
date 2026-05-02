import type { ModuleData } from '../types';

const modules: ModuleData[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals & The ML Lifecycle",
    icon: "Brain",
    description: "Understand what AI is, its evolution, and the 8-step machine learning lifecycle.",
    lessons: [
      {
        title: "What is Artificial Intelligence?",
        content: "AI is the science of creating machines capable of perceiving environments, learning from data, reasoning logically, and taking actions. It's not just one technology — it's a broad field encompass many approaches to making machines \"intelligent.\"",
        formulas: [
          {
            formula: "AI = Perception + Learning + Reasoning + Action",
            description: "The four pillars of artificial intelligence",
            explanation: "Perception: sensing the environment (cameras, sensors, text). Learning: improving from data over time. Reasoning: making logical decisions. Action: executing decisions in the real world."
          }
        ]
      },
      {
        title: "Evolution of AI",
        content: "AI has evolved through distinct eras, each building on the previous. Understanding this timeline helps you see why modern AI works the way it does.",
        formulas: [
          {
            formula: "Classical AI (1950s) → Machine Learning (1990s) → Deep Learning (2010s) → Generative AI (2021) → Agentic AI",
            description: "The timeline of AI evolution",
            explanation: "Classical AI: Rule-based systems, logic programming. ML: Learning from data instead of hard-coded rules. DL: Neural networks with many layers. GenAI: Creating new content (text, images). Agentic AI: Autonomous agents that plan and act."
          }
        ]
      },
      {
        title: "AI Ecosystem — The Hierarchy",
        content: "AI, ML, and DL are not synonyms. They form a nested hierarchy. Understanding this distinction is critical for choosing the right approach to any problem.",
        formulas: [
          {
            formula: "AI (umbrella) ⊃ Machine Learning (data-driven) ⊃ Deep Learning (neural networks)",
            description: "The nested relationship between AI, ML, and DL",
            explanation: "AI is the broadest term — any technique enabling machines to mimic human intelligence. ML is a subset of AI that learns from data. DL is a subset of ML using deep neural networks with many layers."
          }
        ]
      },
      {
        title: "The 8-Step ML Lifecycle",
        content: "Every ML project follows a structured lifecycle. Skipping steps leads to poor models. The lifecycle ensures you build reliable, deployable systems.",
        formulas: [
          {
            formula: "Step 1: Define the Problem → Classification, Regression, or Clustering?",
            description: "Identify what type of prediction you need",
            explanation: "Classification: predict categories (spam/not spam). Regression: predict numbers (house price). Clustering: find groups (customer segments). This decision shapes everything that follows."
          },
          {
            formula: "Step 2: Data Collection → Sensors, databases, APIs",
            description: "Gather the raw data your model will learn from",
            explanation: "Data is the fuel. Collect from databases, APIs, sensors, web scraping, or existing datasets. Quality and quantity of data directly impact model performance."
          },
          {
            formula: "Step 3: Data Preparation & Cleaning → Handle missing values, outliers, encoding",
            description: "The most crucial step — garbage in, garbage out",
            explanation: "Clean missing values (fill with mean/median/mode). Remove duplicates. Handle outliers. Encode categorical text to numbers. This step typically takes 60-80% of project time."
          },
          {
            formula: "Step 4: Choose a Model → Linear Regression, Decision Tree, Neural Network, etc.",
            description: "Select the algorithm that fits your problem type",
            explanation: "Regression problems → Linear Regression, Random Forest. Classification → Logistic Regression, SVM, KNN. Clustering → K-Means, DBSCAN. Deep learning for complex patterns."
          },
          {
            formula: "Step 5: Train the Model → Feed data, let the algorithm learn patterns",
            description: "The model learns relationships between inputs and outputs",
            explanation: "Training = feeding data to the algorithm so it adjusts its internal parameters. The model iteratively improves by minimizing prediction error on the training data."
          },
          {
            formula: "Step 6: Evaluate → Test on unseen data to measure real-world performance",
            description: "Check how well the model generalizes to new data",
            explanation: "Split data into train/test sets. Test on data the model has never seen. Metrics: Accuracy, Precision, Recall, F1-Score, RMSE. A model that works only on training data is overfitting."
          },
          {
            formula: "Step 7: Hyperparameter Tuning → Optimize model settings for best performance",
            description: "Fine-tune the knobs that control how the model learns",
            explanation: "Hyperparameters are settings you choose before training (learning rate, tree depth, K in KNN). Grid search, random search, or Bayesian optimization find the best combination."
          },
          {
            formula: "Step 8: Deploy & Predict → Put the model into production for real-world use",
            description: "Make the model available to make predictions on new data",
            explanation: "Deploy as an API, embed in an app, or integrate into a pipeline. Monitor performance over time. Retrain when data drifts or accuracy drops."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the relationship between AI, ML, and Deep Learning?",
        options: [
          "They are the same thing",
          "AI ⊃ ML ⊃ Deep Learning (nested hierarchy)",
          "Deep Learning ⊃ ML ⊃ AI",
          "ML and AI are unrelated"
        ],
        correctIndex: 1,
        explanation: "AI is the broadest field. ML is a subset of AI. Deep Learning is a subset of ML using neural networks."
      },
      {
        question: "Which step of the ML lifecycle typically takes 60-80% of project time?",
        options: ["Model Training", "Data Preparation & Cleaning", "Deployment", "Hyperparameter Tuning"],
        correctIndex: 1,
        explanation: "Data preparation and cleaning is the most time-consuming step. Garbage in, garbage out — clean data is essential."
      },
      {
        question: "Predicting house prices is what type of ML problem?",
        options: ["Classification", "Clustering", "Regression", "Reinforcement Learning"],
        correctIndex: 2,
        explanation: "House prices are continuous numerical values, making this a regression problem."
      },
      {
        question: "What era of AI introduced learning from data instead of hard-coded rules?",
        options: ["Classical AI (1950s)", "Machine Learning (1990s)", "Deep Learning (2010s)", "Generative AI (2021)"],
        correctIndex: 1,
        explanation: "Machine Learning (1990s) shifted from rule-based systems to algorithms that learn patterns from data."
      },
      {
        question: "What is the purpose of Step 6 (Evaluation) in the ML lifecycle?",
        options: [
          "Collect more data",
          "Test the model on unseen data to measure real-world performance",
          "Deploy the model to production",
          "Choose the algorithm"
        ],
        correctIndex: 1,
        explanation: "Evaluation tests the model on data it hasn't seen during training to check how well it generalizes."
      }
    ],
    sampleData: {
      "ML Problem Types": [
        ["Problem Type", "Input", "Output", "Example"],
        ["Classification", "Features", "Category", "Spam vs Not Spam"],
        ["Regression", "Features", "Number", "House Price Prediction"],
        ["Clustering", "Features", "Group", "Customer Segmentation"],
      ]
    }
  },
  {
    id: "data-preprocessing",
    title: "Data Pre-Processing",
    icon: "Settings",
    description: "Clean, encode, scale, and transform raw data into model-ready features.",
    lessons: [
      {
        title: "Data Cleaning",
        content: "Raw data is messy. Missing values, duplicates, and inconsistencies must be handled before any model can learn from the data. This is the foundation of all ML pipelines.",
        formulas: [
          {
            formula: "Missing Values → Mean Imputation: fill with average of column",
            description: "Replace missing numeric values with the column mean",
            explanation: "If a column has values [10, 20, ?, 40], the mean is (10+20+40)/3 = 23.3. Replace ? with 23.3. Simple but can distort distribution."
          },
          {
            formula: "Missing Values → Median Imputation: fill with middle value",
            description: "Replace missing values with the column median",
            explanation: "Better for skewed data with outliers. Median is the middle value when sorted. Less affected by extreme values than mean."
          },
          {
            formula: "Missing Values → Mode Imputation: fill with most frequent value",
            description: "Replace missing categorical values with the most common category",
            explanation: "For text/categorical columns, use the most frequent value. If colors are [Red, Blue, Red, Green, ?], fill ? with Red."
          },
          {
            formula: "Remove Duplicates → Keep first occurrence, drop rest",
            description: "Eliminate identical rows that would bias the model",
            explanation: "Duplicate rows make the model over-weight certain patterns. Remove them to ensure each data point contributes equally."
          }
        ]
      },
      {
        title: "Outlier Treatment",
        content: "Outliers are extreme values that can skew model training. Two common methods to detect and handle them: Z-Score and Interquartile Range (IQR).",
        formulas: [
          {
            formula: "Z-Score = (X - μ) / σ",
            description: "Measure how many standard deviations a value is from the mean",
            explanation: "Step 1: Calculate mean (μ) of the column. Step 2: Calculate standard deviation (σ). Step 3: For each value X, compute (X - μ) / σ. Values with |Z| > 3 are outliers."
          },
          {
            formula: "IQR = Q3 - Q1 | Outliers: values < Q1 - 1.5×IQR or > Q3 + 1.5×IQR",
            description: "Detect outliers using the interquartile range",
            explanation: "Step 1: Find Q1 (25th percentile) and Q3 (75th percentile). Step 2: IQR = Q3 - Q1. Step 3: Any value below Q1-1.5×IQR or above Q3+1.5×IQR is an outlier."
          }
        ]
      },
      {
        title: "Encoding Categorical Data",
        content: "ML models only understand numbers. Text categories must be converted to numeric form. Two main approaches: Label Encoding and One-Hot Encoding.",
        formulas: [
          {
            formula: "Label Encoding: Red→0, Green→1, Blue→2",
            description: "Assign a unique number to each category",
            explanation: "Simple and space-efficient. But creates false ordering: model might think Blue(2) > Red(0). Only use for ordinal data (Low < Medium < High)."
          },
          {
            formula: "One-Hot Encoding: Red→[1,0,0], Green→[0,1,0], Blue→[0,0,1]",
            description: "Create a binary column for each category",
            explanation: "Each category gets its own column with 0 or 1. No false ordering. But creates many columns (curse of dimensionality) if there are many categories."
          }
        ]
      },
      {
        title: "Feature Engineering",
        content: "Create new, more informative features from existing ones. This is where domain knowledge shines. A good feature can outperform a complex model.",
        formulas: [
          {
            formula: "New Feature: Age = Current Year - Birth Year",
            description: "Derive age from birth year",
            explanation: "Raw birth year is less useful than age. Creating age gives the model a direct, meaningful signal."
          },
          {
            formula: "New Feature: BMI = Weight(kg) / Height(m)²",
            description: "Combine weight and height into a single health metric",
            explanation: "BMI is more predictive of health outcomes than weight or height alone. Feature engineering creates composite metrics."
          }
        ]
      },
      {
        title: "Min-Max Normalization",
        content: "Rescales all features to a fixed range [0, 1]. Preserves the relative distances between values. Essential when features have different scales (e.g., age 0-100 vs income 0-1,000,000).",
        formulas: [
          {
            formula: "x' = (x - x_min) / (x_max - x_min)",
            description: "Min-Max Normalization formula",
            explanation: "Step 1: Find min and max of the column. Step 2: Subtract min from each value. Step 3: Divide by (max - min). Result: all values between 0 and 1. Example: if x=50, min=0, max=100 → x' = (50-0)/(100-0) = 0.5"
          },
          {
            formula: "Example: [10, 20, 30, 40, 50] → [0, 0.25, 0.5, 0.75, 1.0]",
            description: "Min=10, Max=50, range=40",
            explanation: "(10-10)/40=0, (20-10)/40=0.25, (30-10)/40=0.5, (40-10)/40=0.75, (50-10)/40=1.0. All values now on the same 0-1 scale."
          }
        ]
      },
      {
        title: "Z-Score Standardization",
        content: "Rescales features to have mean=0 and standard deviation=1. Unlike Min-Max, it doesn't bound values to a range. Better when data has outliers or doesn't follow a uniform distribution.",
        formulas: [
          {
            formula: "Z = (X - μ) / σ",
            description: "Z-Score Standardization formula",
            explanation: "Step 1: Calculate mean (μ) of the column. Step 2: Calculate standard deviation (σ). Step 3: For each value X, compute (X - μ) / σ. Result: mean=0, std=1. Values above mean are positive, below are negative."
          },
          {
            formula: "Example: [10, 20, 30, 40, 50] → μ=30, σ=15.8 → Z = [-1.26, -0.63, 0, 0.63, 1.26]",
            description: "Standardized values centered around 0",
            explanation: "30 (the mean) becomes 0. Values below 30 are negative, above 30 are positive. The spread is measured in standard deviations."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "When should you use Median imputation instead of Mean?",
        options: [
          "When data is normally distributed",
          "When data has outliers or is skewed",
          "When data is categorical",
          "When there are no missing values"
        ],
        correctIndex: 1,
        explanation: "Median is robust to outliers. Mean gets pulled by extreme values, making it unreliable for skewed data."
      },
      {
        question: "What Z-Score threshold is commonly used to identify outliers?",
        options: ["|Z| > 1", "|Z| > 2", "|Z| > 3", "|Z| > 5"],
        correctIndex: 2,
        explanation: "|Z| > 3 means the value is more than 3 standard deviations from the mean — statistically rare and likely an outlier."
      },
      {
        question: "When should you use One-Hot Encoding instead of Label Encoding?",
        options: [
          "When categories have a natural order",
          "When categories are nominal (no order)",
          "When there are too many categories",
          "When the data is numeric"
        ],
        correctIndex: 1,
        explanation: "One-Hot Encoding avoids creating false ordering. Label Encoding implies 2 > 1 > 0, which is wrong for categories like Red, Green, Blue."
      },
      {
        question: "What does Min-Max Normalization produce?",
        options: [
          "Values with mean=0 and std=1",
          "Values in the range [0, 1]",
          "Values in the range [-1, 1]",
          "Binary values (0 or 1)"
        ],
        correctIndex: 1,
        explanation: "Min-Max rescales all values to fall between 0 and 1, preserving relative distances."
      },
      {
        question: "If x=75, min=50, max=100, what is the Min-Max normalized value?",
        options: ["0.25", "0.5", "0.75", "0.15"],
        correctIndex: 1,
        explanation: "x' = (75-50)/(100-50) = 25/50 = 0.5"
      }
    ],
    sampleData: {
      "Raw Dataset": [
        ["Age", "Income", "Department", "Score"],
        ["25", "50000", "IT", "85"],
        ["30", "60000", "HR", "92"],
        ["?", "55000", "IT", "78"],
        ["35", "70000", "Finance", "88"],
        ["28", "?", "HR", "95"],
      ],
      "Min-Max Scaling Demo": [
        ["Original", "Min-Max (Age)", "Z-Score (Age)"],
        ["25", "0.00", "-1.07"],
        ["30", "0.50", "0.27"],
        ["35", "1.00", "1.60"],
      ]
    }
  },
  {
    id: "supervised-learning",
    title: "Supervised Learning (Regression & Classification)",
    icon: "Target",
    description: "Learn from labeled data — predict numbers with regression and categories with classification.",
    lessons: [
      {
        title: "What is Supervised Learning?",
        content: "Supervised learning is the most common type of machine learning. The model learns from labeled training data — pairs of inputs (features, X) and correct outputs (labels, y). Think of it like a student learning with a teacher: the teacher provides examples with answers, and the student learns the pattern so they can answer new questions on their own.",
        formulas: [
          {
            formula: "Training Data: {(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)}",
            description: "Each example has an input x and a known output y",
            explanation: "The model sees both the question (x) and the answer (y) during training. It learns the relationship between them."
          },
          {
            formula: "Prediction: ŷ = f(x) — the learned function maps new inputs to outputs",
            description: "After training, the model applies f() to unseen data",
            explanation: "ŷ (y-hat) is the predicted value. The goal is to make ŷ as close to the true y as possible."
          },
          {
            formula: "Two Types: Regression (predict numbers) vs Classification (predict categories)",
            description: "The type of output determines which approach to use",
            explanation: "Regression: house price, temperature, salary. Classification: spam/not spam, cat/dog, approve/deny loan."
          }
        ]
      },
      {
        title: "Simple Linear Regression",
        content: "Linear regression finds the straight line that best fits the data. It predicts a continuous output y from a single input x using the equation y = b₁x + b₀. The model learns the best values for b₁ (slope) and b₀ (intercept) by minimizing the error between predictions and actual values.",
        formulas: [
          {
            formula: "y = b₁x + b₀",
            description: "The line equation — slope and intercept define the prediction",
            explanation: "b₁ (slope): how much y changes per unit increase in x. b₀ (intercept): the value of y when x = 0. Example: y = 5000x + 20000 means each year of experience adds $5K to a $20K base salary."
          },
          {
            formula: "MSE = (1/n) × Σ(yᵢ - ŷᵢ)²",
            description: "Mean Squared Error — the cost function the model minimizes",
            explanation: "For each data point, find the difference between actual y and predicted ŷ. Square it (penalizes large errors more). Average all squared errors. The model adjusts b₁ and b₀ to make MSE as small as possible."
          },
          {
            formula: "Residual = yᵢ - ŷᵢ (actual minus predicted)",
            description: "The error for each individual data point",
            explanation: "Positive residual = model underpredicted. Negative = overpredicted. A good model has residuals scattered randomly around zero with no pattern."
          },
          {
            formula: "R² = 1 - (SS_res / SS_tot) — how well the line explains the data",
            description: "R-squared: proportion of variance explained by the model",
            explanation: "R² = 1 means perfect fit. R² = 0 means the line is no better than just predicting the average. Higher is better. Values below 0.5 usually indicate a weak model."
          }
        ]
      },
      {
        title: "Multiple Linear Regression",
        content: "Real-world problems rarely depend on just one factor. Multiple linear regression extends simple linear regression to use multiple input features (x₁, x₂, x₃, ...) to predict the output.",
        formulas: [
          {
            formula: "y = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ",
            description: "Each feature has its own coefficient (weight)",
            explanation: "Example: House Price = 50000 + 3000×(sqft/100) - 2000×(age) + 10000×(bedrooms). Each coefficient shows how much that feature contributes, holding others constant."
          },
          {
            formula: "Overfitting: Model memorizes training data but fails on new data",
            description: "Too many features or too complex a model causes poor generalization",
            explanation: "Signs: very high training accuracy but low test accuracy. Solutions: reduce features, use regularization, get more data."
          }
        ]
      },
      {
        title: "K-Nearest Neighbors (KNN)",
        content: "KNN is a simple but powerful algorithm. Instead of learning a model during training, it memorizes all training data. When predicting, it finds the K closest training examples to the new input and uses them to make a decision.",
        formulas: [
          {
            formula: "Euclidean Distance: d = √((x₂-x₁)² + (y₂-y₁)²)",
            description: "Straight-line distance between two points in 2D space",
            explanation: "For multi-dimensional data, extend to more terms: d = √(Σ(xᵢ - xⱼ)²). This works for any number of features."
          },
          {
            formula: "K=5 → Find 5 nearest → Majority vote → Predicted class",
            description: "Classification by majority vote of closest neighbors",
            explanation: "Example: New email arrives. KNN finds 5 most similar emails in training data. 4 are spam, 1 is not. Prediction: SPAM."
          },
          {
            formula: "Choosing K: Small K (1-3) = sensitive to noise. Large K (10+) = oversmooths boundaries",
            description: "K is a hyperparameter — you choose it before training",
            explanation: "K=1: every outlier matters, creates jagged boundaries. K=15: smooth boundaries but may miss local patterns. Rule of thumb: K = √n (square root of training samples), rounded to nearest odd number."
          },
          {
            formula: "KNN for Regression: Average the K nearest values instead of majority vote",
            description: "Same algorithm, different aggregation for numeric output",
            explanation: "Example: Predict house price. Find 5 nearest houses. Average their prices: ($200K + $220K + $190K + $210K + $230K) / 5 = $210K."
          }
        ]
      },
      {
        title: "Decision Trees",
        content: "Decision trees learn a series of If-Then rules from data. They split the data recursively based on feature values, creating a tree structure. Each path from root to leaf represents a decision rule.",
        formulas: [
          {
            formula: "Root → Internal Nodes (splits) → Leaf Nodes (predictions)",
            description: "Tree structure: start at top, follow branches based on feature values",
            explanation: "Root: the first and most important split. Internal nodes: subsequent questions. Leaves: final predictions. Example: Is Age > 30? Yes → Is Income > 50K? Yes → Approve Loan."
          },
          {
            formula: "Gini Impurity: Measures how 'mixed' a node is. Lower = purer = better split",
            description: "The algorithm chooses splits that create the purest child nodes",
            explanation: "Gini = 0 means all samples in the node belong to one class (perfect). Gini = 0.5 means a 50/50 split (worst for binary). The tree picks the feature and threshold that reduce Gini the most."
          },
          {
            formula: "Overfitting Prevention: Max depth, Min samples per leaf, Pruning",
            description: "Unlimited trees memorize data — constraints force generalization",
            explanation: "Max depth: limit how many splits deep the tree can grow. Min samples per leaf: require at least N samples in each leaf. Pruning: remove branches that don't improve accuracy on validation data."
          }
        ]
      },
      {
        title: "Regression vs Classification — When to Use Which",
        content: "Choosing the right approach depends entirely on your output variable. If you're predicting a number that can take any value on a scale, use regression. If you're predicting a category or label from a fixed set, use classification.",
        formulas: [
          {
            formula: "Regression Examples: Price, Temperature, Age, Salary, Distance",
            description: "Continuous numeric output — infinite possible values",
            explanation: "Key question: 'How much?' or 'How many?' If the answer is a number that could be 3.14, 3.15, 3.151... it's regression."
          },
          {
            formula: "Classification Examples: Spam/Not, Cat/Dog, Yes/No, A/B/C/D",
            description: "Discrete categorical output — finite set of labels",
            explanation: "Key question: 'Which one?' or 'Is it X or Y?' Binary classification = 2 classes. Multi-class = 3+ classes."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the key difference between regression and classification?",
        options: [
          "Regression uses more data",
          "Regression predicts continuous values, classification predicts discrete labels",
          "Classification is always more accurate",
          "Regression requires neural networks"
        ],
        correctIndex: 1,
        explanation: "Regression outputs numbers on a continuous scale (price, temperature). Classification outputs categories from a fixed set (spam/not spam, yes/no)."
      },
      {
        question: "In the equation y = b₁x + b₀, what does b₁ represent?",
        options: ["The intercept", "The slope (rate of change)", "The error term", "The input variable"],
        correctIndex: 1,
        explanation: "b₁ is the slope — it tells you how much y changes for each unit increase in x."
      },
      {
        question: "What does MSE (Mean Squared Error) measure?",
        options: [
          "How many data points there are",
          "The average squared difference between actual and predicted values",
          "The correlation between features",
          "The number of features in the model"
        ],
        correctIndex: 1,
        explanation: "MSE = average of (actual - predicted)². Lower MSE means predictions are closer to actual values."
      },
      {
        question: "Why is KNN called a 'lazy learner'?",
        options: [
          "It doesn't learn at all",
          "It stores all training data and only computes at prediction time",
          "It's the slowest algorithm",
          "It uses lazy evaluation"
        ],
        correctIndex: 1,
        explanation: "KNN doesn't build a model during training — it just memorizes data. All computation happens when you ask for a prediction."
      },
      {
        question: "What does a Gini Impurity of 0 mean in a decision tree node?",
        options: [
          "The node is empty",
          "All samples in the node belong to the same class (pure)",
          "The node has maximum entropy",
          "The split was invalid"
        ],
        correctIndex: 1,
        explanation: "Gini = 0 means perfect purity — every sample in that node is the same class. This is the ideal split."
      },
      {
        question: "If R² = 0.85 for a regression model, what does this mean?",
        options: [
          "The model is 85% accurate",
          "85% of the variance in y is explained by the model",
          "The model has 85% error",
          "You need 85% more data"
        ],
        correctIndex: 1,
        explanation: "R² = 0.85 means the model explains 85% of the variation in the output. This is generally considered a strong fit."
      },
      {
        question: "What happens if you set K=1 in KNN?",
        options: [
          "The model becomes very smooth",
          "Every single outlier directly affects predictions (highly sensitive to noise)",
          "The model can't make predictions",
          "It becomes a regression model"
        ],
        correctIndex: 1,
        explanation: "K=1 means the prediction is based on just the single nearest neighbor. One noisy or mislabeled data point can completely change the prediction."
      },
      {
        question: "Which technique prevents decision tree overfitting?",
        options: [
          "Increasing tree depth",
          "Setting a maximum depth limit",
          "Using more features",
          "Removing the root node"
        ],
        correctIndex: 1,
        explanation: "Limiting max depth prevents the tree from growing too complex and memorizing training data. Other techniques include min samples per leaf and pruning."
      }
    ],
    sampleData: {
      "Linear Regression — Salary Prediction": [
        ["Experience (yrs)", "Salary ($K)", "Predicted", "Residual"],
        ["1", "26", "25.0", "+1.0"],
        ["2", "34", "30.0", "+4.0"],
        ["3", "38", "35.0", "+3.0"],
        ["4", "42", "40.0", "+2.0"],
        ["5", "48", "45.0", "+3.0"],
        ["6", "52", "50.0", "+2.0"],
        ["7", "58", "55.0", "+3.0"],
        ["8", "62", "60.0", "+2.0"],
      ],
      "KNN Classification — Email Spam Detection": [
        ["Email", "Word Count", "! Count", "Link Count", "Class"],
        ["A", "45", "0", "1", "Not Spam"],
        ["B", "120", "5", "8", "Spam"],
        ["C", "30", "1", "0", "Not Spam"],
        ["D", "200", "12", "15", "Spam"],
        ["E", "55", "2", "2", "Not Spam"],
        ["New?", "95", "4", "6", "?"],
      ]
    }
  },
  {
    id: "evaluation-metrics",
    title: "Performance Evaluation Metrics",
    icon: "BarChart3",
    description: "Measure model performance using confusion matrix, accuracy, precision, recall, and F1-score.",
    lessons: [
      {
        title: "The Confusion Matrix",
        content: "A confusion matrix is a 2×2 table that shows how many predictions were correct and how many were wrong. It breaks down predictions into four categories, giving a complete picture of model performance.",
        formulas: [
          {
            formula: "True Positive (TP): Predicted Positive, Actually Positive ✓",
            description: "Model correctly identified a positive case",
            explanation: "Example: Model predicts 'spam' and the email IS spam. This is a correct positive prediction."
          },
          {
            formula: "True Negative (TN): Predicted Negative, Actually Negative ✓",
            description: "Model correctly identified a negative case",
            explanation: "Example: Model predicts 'not spam' and the email IS not spam. This is a correct negative prediction."
          },
          {
            formula: "False Positive (FP): Predicted Positive, Actually Negative ✗ (Type I Error)",
            description: "False alarm — model wrongly flagged something as positive",
            explanation: "Example: Model predicts 'spam' but the email is NOT spam. A legitimate email got blocked. Also called Type I Error."
          },
          {
            formula: "False Negative (FN): Predicted Negative, Actually Positive ✗ (Type II Error)",
            description: "Missed detection — model failed to catch a positive case",
            explanation: "Example: Model predicts 'not spam' but the email IS spam. Spam got through. Also called Type II Error. Often more dangerous than FP."
          }
        ]
      },
      {
        title: "Accuracy",
        content: "Accuracy measures overall correctness — what fraction of all predictions were right? It's intuitive but can be misleading with imbalanced datasets.",
        formulas: [
          {
            formula: "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
            description: "Fraction of correct predictions out of total",
            explanation: "Step 1: Add correct predictions (TP + TN). Step 2: Add all predictions (TP + TN + FP + FN). Step 3: Divide. Example: TP=80, TN=90, FP=10, FN=20 → Accuracy = 170/200 = 85%."
          },
          {
            formula: "Warning: 99% accuracy on 99% negative data = useless model",
            description: "Accuracy is misleading with imbalanced data",
            explanation: "If 99% of emails are not spam, a model that always predicts 'not spam' gets 99% accuracy but catches ZERO spam. Always check precision and recall too."
          }
        ]
      },
      {
        title: "Precision",
        content: "Precision answers: Of all the positive predictions the model made, how many were actually correct? High precision means few false alarms.",
        formulas: [
          {
            formula: "Precision = TP / (TP + FP)",
            description: "Of predicted positives, how many were truly positive?",
            explanation: "Step 1: Count true positives. Step 2: Count all positive predictions (TP + FP). Step 3: Divide. Example: TP=80, FP=20 → Precision = 80/100 = 80%. Of 100 spam predictions, 80 were correct."
          }
        ]
      },
      {
        title: "Recall (Sensitivity)",
        content: "Recall answers: Of all the actual positive cases, how many did the model catch? High recall means few missed detections.",
        formulas: [
          {
            formula: "Recall = TP / (TP + FN)",
            description: "Of actual positives, how many were detected?",
            explanation: "Step 1: Count true positives. Step 2: Count all actual positives (TP + FN). Step 3: Divide. Example: TP=80, FN=20 → Recall = 80/100 = 80%. Of 100 actual spam emails, 80 were caught."
          }
        ]
      },
      {
        title: "F1-Score",
        content: "F1-Score is the harmonic mean of Precision and Recall. It balances both metrics into a single number. Use F1 when you need to consider both false alarms and missed detections.",
        formulas: [
          {
            formula: "F1 = 2 × (Precision × Recall) / (Precision + Recall)",
            description: "Harmonic mean balancing precision and recall",
            explanation: "Step 1: Multiply precision × recall. Step 2: Multiply by 2. Step 3: Divide by (precision + recall). Example: Precision=0.8, Recall=0.8 → F1 = 2×(0.64)/(1.6) = 0.8. F1 is high only when BOTH precision and recall are high."
          },
          {
            formula: "When to use which: Accuracy (balanced data), Precision (few false alarms OK), Recall (few misses OK), F1 (need balance)",
            description: "Choosing the right metric for your use case",
            explanation: "Cancer detection: prioritize Recall (don't miss any cases). Spam filter: prioritize Precision (don't block legit emails). General purpose: use F1-Score."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is a False Positive (Type I Error)?",
        options: [
          "Model predicted negative but it was actually positive",
          "Model predicted positive but it was actually negative",
          "Model predicted correctly",
          "Model refused to predict"
        ],
        correctIndex: 1,
        explanation: "False Positive = model said 'yes' but the answer was 'no'. A false alarm."
      },
      {
        question: "If TP=90, FP=10, what is Precision?",
        options: ["0.90", "0.85", "0.95", "0.80"],
        correctIndex: 0,
        explanation: "Precision = TP/(TP+FP) = 90/(90+10) = 90/100 = 0.90"
      },
      {
        question: "If TP=80, FN=20, what is Recall?",
        options: ["0.60", "0.70", "0.80", "0.90"],
        correctIndex: 2,
        explanation: "Recall = TP/(TP+FN) = 80/(80+20) = 80/100 = 0.80"
      },
      {
        question: "Which metric is best for cancer detection where missing a case is dangerous?",
        options: ["Accuracy", "Precision", "Recall", "F1-Score"],
        correctIndex: 2,
        explanation: "Recall ensures we catch as many actual positive cases as possible. Missing a cancer case (FN) is far worse than a false alarm (FP)."
      }
    ],
    sampleData: {
      "Confusion Matrix Example": [
        ["", "Predicted Spam", "Predicted Not Spam"],
        ["Actual Spam", "TP = 80", "FN = 20"],
        ["Actual Not Spam", "FP = 10", "TN = 90"],
      ],
      "Metrics Calculation": [
        ["Metric", "Formula", "Value"],
        ["Accuracy", "(80+90)/(80+90+10+20)", "85%"],
        ["Precision", "80/(80+10)", "88.9%"],
        ["Recall", "80/(80+20)", "80%"],
        ["F1-Score", "2×(0.889×0.80)/(0.889+0.80)", "84.2%"],
      ]
    }
  },
  {
    id: "probability-naive-bayes",
    title: "Probability & Naive Bayes",
    icon: "Calculator",
    description: "Understand Bayes Theorem and how Naive Bayes classifies text for spam filtering and sentiment analysis.",
    lessons: [
      {
        title: "Bayes Theorem",
        content: "Bayes Theorem calculates the probability of an event given evidence. It flips conditional probability: instead of P(evidence|event), it computes P(event|evidence). This is the foundation of probabilistic reasoning.",
        formulas: [
          {
            formula: "P(A|B) = P(B|A) × P(A) / P(B)",
            description: "Bayes Theorem formula",
            explanation: "P(A|B): probability of A given B (what we want). P(B|A): probability of B given A (likelihood). P(A): prior probability of A. P(B): total probability of B. The theorem updates our belief about A after observing B."
          },
          {
            formula: "Example: P(Spam|'free') = P('free'|Spam) × P(Spam) / P('free')",
            description: "Probability an email is spam given it contains 'free'",
            explanation: "Step 1: How often does 'free' appear in spam emails? P('free'|Spam). Step 2: What fraction of all emails are spam? P(Spam). Step 3: How often does 'free' appear overall? P('free'). Step 4: Apply Bayes formula."
          }
        ]
      },
      {
        title: "Naive Bayes Classifier",
        content: "Naive Bayes applies Bayes Theorem to classification, assuming all features are independent given the class. Despite this 'naive' assumption, it works remarkably well for text classification.",
        formulas: [
          {
            formula: "P(C|X) ∝ P(C) × P(x₁|C) × P(x₂|C) × ... × P(xₙ|C)",
            description: "Naive Bayes classification formula",
            explanation: "Step 1: Calculate prior probability of each class P(C). Step 2: For each feature xᵢ, calculate P(xᵢ|C) — how often this feature appears in class C. Step 3: Multiply all together. Step 4: Choose the class with highest probability."
          },
          {
            formula: "Why 'Naive'? → Assumes features are independent (often false but works well)",
            description: "The independence assumption simplifies computation",
            explanation: "In reality, words in an email are not independent ('free' and 'winner' often appear together). But the classifier still works because the relative probabilities are usually correct even if absolute probabilities aren't."
          },
          {
            formula: "Use Cases: Spam filtering, sentiment analysis, document categorization",
            description: "Where Naive Bayes excels",
            explanation: "Spam: classify emails as spam/not spam based on word frequencies. Sentiment: classify reviews as positive/negative. Documents: categorize articles by topic."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does Bayes Theorem calculate?",
        options: [
          "The mean of a dataset",
          "The probability of an event given evidence",
          "The distance between two points",
          "The slope of a line"
        ],
        correctIndex: 1,
        explanation: "Bayes Theorem computes P(A|B) — the probability of A given that we've observed B."
      },
      {
        question: "Why is Naive Bayes called 'naive'?",
        options: [
          "It's a simple algorithm",
          "It assumes all features are independent given the class",
          "It doesn't use training data",
          "It only works with numbers"
        ],
        correctIndex: 1,
        explanation: "The 'naive' assumption is that features are conditionally independent — often false in reality, but the classifier still performs well."
      },
      {
        question: "Which is a common use case for Naive Bayes?",
        options: ["Image segmentation", "Spam filtering", "Clustering", "Dimensionality reduction"],
        correctIndex: 1,
        explanation: "Naive Bayes is widely used for text classification tasks like spam filtering, sentiment analysis, and document categorization."
      }
    ]
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning & Dimensionality Reduction",
    icon: "Layers",
    description: "Find hidden patterns in unlabeled data with clustering and reduce dimensions with PCA.",
    lessons: [
      {
        title: "The Curse of Dimensionality",
        content: "As the number of features (dimensions) increases, data becomes sparse, computation grows exponentially, and models overfit more easily. Dimensionality reduction addresses this problem.",
        formulas: [
          {
            formula: "More features → More data needed → More computation → Higher overfitting risk",
            description: "Why high dimensions are problematic",
            explanation: "Each new feature doubles the space the model must cover. With 100 features, you need 2^100 data points to fill the space — impossible. Reduction techniques compress information."
          }
        ]
      },
      {
        title: "Feature Selection vs Feature Extraction",
        content: "Feature Selection picks the most important existing features. Feature Extraction creates new, compressed features from the original ones. Both reduce dimensionality but in different ways.",
        formulas: [
          {
            formula: "Feature Selection: Filter, Wrapper, Embedded methods",
            description: "Choose a subset of original features",
            explanation: "Filter: rank features by statistical measures (correlation, chi-square). Wrapper: try different subsets and evaluate model performance. Embedded: feature selection happens during model training (Lasso, Ridge)."
          },
          {
            formula: "Feature Extraction: PCA (linear), t-SNE/UMAP (non-linear)",
            description: "Create new features that capture the essence of original data",
            explanation: "PCA finds directions of maximum variance and projects data onto them. t-SNE and UMAP preserve local structure for visualization. LDA finds directions that best separate classes."
          }
        ]
      },
      {
        title: "Principal Component Analysis (PCA)",
        content: "PCA finds the directions (principal components) in which the data varies the most. It projects data onto these directions, reducing dimensions while preserving as much information as possible.",
        formulas: [
          {
            formula: "PCA: Find directions of maximum variance → Project data onto them",
            description: "Linear dimensionality reduction",
            explanation: "Step 1: Standardize the data. Step 2: Compute covariance matrix. Step 3: Find eigenvectors (directions) and eigenvalues (importance). Step 4: Keep top K eigenvectors. Step 5: Project data onto these K components."
          }
        ]
      },
      {
        title: "K-Means Clustering",
        content: "K-Means partitions unlabeled data into K clusters. Each cluster is represented by its centroid (mean point). The algorithm iteratively assigns points to nearest centroid and updates centroids until convergence.",
        formulas: [
          {
            formula: "Step 1: Choose K → Step 2: Initialize K centroids randomly",
            description: "Set up the clustering",
            explanation: "K is the number of clusters you want. Choose based on domain knowledge or use the Elbow Method. Centroids are initial cluster centers, placed randomly."
          },
          {
            formula: "Step 3: Assign each point to nearest centroid (Euclidean distance)",
            description: "Group data points by proximity",
            explanation: "For each data point, calculate distance to all K centroids. Assign the point to the closest centroid's cluster."
          },
          {
            formula: "Step 4: Update centroids → New centroid = mean of all points in cluster",
            description: "Move centroids to the center of their clusters",
            explanation: "Recalculate each centroid as the average (mean) of all points assigned to it. This moves the centroid to the true center of its cluster."
          },
          {
            formula: "Step 5: Repeat steps 3-4 until centroids stop moving (convergence)",
            description: "Iterate until stable clusters",
            explanation: "Keep assigning and updating until no points change clusters. The algorithm has converged — clusters are optimal for the given K."
          },
          {
            formula: "WCSS = Σ(distance from each point to its centroid)² → Minimize this",
            description: "Within-Cluster Sum of Squares — the objective function",
            explanation: "WCSS measures how tight the clusters are. Lower WCSS = tighter clusters. K-Means minimizes WCSS by iteratively improving centroid positions."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the 'Curse of Dimensionality'?",
        options: [
          "Having too little data",
          "High dimensions increase sparsity, computation, and overfitting risk",
          "Having too many models",
          "Data being too clean"
        ],
        correctIndex: 1,
        explanation: "More dimensions mean data becomes sparse, computation grows exponentially, and models are more likely to overfit."
      },
      {
        question: "What does PCA (Principal Component Analysis) do?",
        options: [
          "Classifies data into categories",
          "Finds directions of maximum variance and projects data onto them",
          "Clusters data into groups",
          "Removes outliers from data"
        ],
        correctIndex: 1,
        explanation: "PCA finds the directions (principal components) where data varies most and projects data onto fewer dimensions while preserving information."
      },
      {
        question: "In K-Means, what happens in Step 4 (Update Centroids)?",
        options: [
          "Centroids are deleted",
          "New centroid = mean of all points in the cluster",
          "Centroids are moved randomly",
          "K is increased"
        ],
        correctIndex: 1,
        explanation: "Each centroid is recalculated as the mean (average) of all points assigned to its cluster, moving it to the true center."
      },
      {
        question: "What does WCSS measure in K-Means?",
        options: [
          "Number of clusters",
          "How tight the clusters are (sum of squared distances to centroids)",
          "The accuracy of the model",
          "The number of data points"
        ],
        correctIndex: 1,
        explanation: "WCSS (Within-Cluster Sum of Squares) measures cluster tightness. Lower WCSS means points are closer to their centroids."
      }
    ],
    sampleData: {
      "K-Means Iteration 1": [
        ["Point", "X", "Y", "Nearest Centroid", "Cluster"],
        ["A", "1", "2", "C1(2,3)", "1"],
        ["B", "2", "3", "C1(2,3)", "1"],
        ["C", "8", "9", "C2(7,8)", "2"],
        ["D", "9", "8", "C2(7,8)", "2"],
      ],
      "Dimensionality Reduction": [
        ["Method", "Type", "Purpose"],
        ["PCA", "Linear", "Maximize variance in fewer dimensions"],
        ["LDA", "Supervised", "Maximize class separation"],
        ["t-SNE", "Non-linear", "Visualize high-dim data in 2D/3D"],
        ["UMAP", "Non-linear", "Preserve local and global structure"],
      ]
    }
  },
  {
    id: "deep-learning-foundations",
    title: "Deep Learning Foundations",
    icon: "Cpu",
    description: "Neural networks, activation functions, backpropagation, CNNs, RNNs, and overfitting remedies.",
    lessons: [
      {
        title: "The Paradigm Shift: ML vs Deep Learning",
        content: "Traditional ML requires manual feature engineering — humans decide what aspects of data matter. Deep Learning automates feature learning through layers of neurons, discovering patterns directly from raw data.",
        formulas: [
          {
            formula: "ML: Manual features → Model → Prediction",
            description: "Traditional ML pipeline",
            explanation: "Humans extract features (edges, textures, word frequencies) and feed them to the model. The model's performance depends heavily on feature quality."
          },
          {
            formula: "Deep Learning: Raw data → Layers (auto features) → Prediction",
            description: "Deep Learning pipeline",
            explanation: "Raw data goes in. Each layer automatically learns features: early layers detect edges, middle layers detect shapes, later layers detect objects. No manual feature engineering needed."
          }
        ]
      },
      {
        title: "Neurons, Weights & Biases",
        content: "A neuron is the basic unit of a neural network. It receives inputs, multiplies each by a weight, adds a bias, and produces an output. Weights determine input importance; biases set the activation threshold.",
        formulas: [
          {
            formula: "z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b",
            description: "Weighted sum + bias",
            explanation: "Each input xᵢ is multiplied by its weight wᵢ. All products are summed together. Bias b is added. This weighted sum z is the neuron's raw output before activation."
          },
          {
            formula: "Weight (w): Controls importance of each input",
            description: "Higher weight = more influence on output",
            explanation: "If w₁=0.9 and w₂=0.1, input x₁ has 9× more influence than x₂. During training, weights are adjusted to minimize prediction error."
          },
          {
            formula: "Bias (b): Minimum threshold for the neuron to fire",
            description: "Shifts the activation function left or right",
            explanation: "Without bias, a neuron can only learn patterns that pass through the origin. Bias allows the neuron to activate even when all inputs are zero."
          }
        ]
      },
      {
        title: "Activation Functions",
        content: "Activation functions introduce non-linearity, allowing neural networks to learn complex patterns. Without them, a neural network is just a linear regression model, no matter how many layers it has.",
        formulas: [
          {
            formula: "Sigmoid: σ(z) = 1 / (1 + e⁻ᶻ) → Output range (0, 1)",
            description: "Squashes values between 0 and 1",
            explanation: "Good for binary classification output layer. Problem: vanishing gradient for large positive/negative values — gradients become near zero, slowing learning in deep networks."
          },
          {
            formula: "ReLU: max(0, z) → Output: z if z>0, else 0",
            description: "Zero out negative values, keep positive values",
            explanation: "Most common activation function. Simple and fast. Solves vanishing gradient problem. Problem: 'dying ReLU' — neurons can get stuck outputting 0 if weights become negative."
          },
          {
            formula: "Softmax: eᶻⁱ / Σ(eᶻʲ) → Outputs sum to 1 (probabilities)",
            description: "Converts raw scores to probabilities for multi-class classification",
            explanation: "Used in the output layer for multi-class problems. Each output is a probability between 0 and 1, and all outputs sum to 1. The highest probability determines the predicted class."
          }
        ]
      },
      {
        title: "Loss Functions & Optimizers",
        content: "Loss functions measure how wrong the model's predictions are. Optimizers adjust weights to minimize this loss. The training loop alternates between forward pass (predict), loss calculation, and backpropagation (adjust weights).",
        formulas: [
          {
            formula: "MSE (Mean Squared Error): Σ(actual - predicted)² / n → For regression",
            description: "Average of squared prediction errors",
            explanation: "Step 1: For each data point, find the difference between actual and predicted. Step 2: Square each difference. Step 3: Average them. Lower MSE = better predictions."
          },
          {
            formula: "Cross-Entropy Loss: -Σ(y × log(ŷ)) → For classification",
            description: "Measures difference between predicted and actual probability distributions",
            explanation: "Penalizes confident wrong predictions heavily. If the model predicts 0.99 for the wrong class, the loss is very high. Encourages the model to be confident and correct."
          },
          {
            formula: "Training Loop: Forward Pass → Loss → Backpropagation → Update Weights → Repeat",
            description: "The iterative training process",
            explanation: "Forward Pass: compute predictions. Loss: measure error. Backpropagation: calculate how much each weight contributed to the error. Update: adjust weights using the optimizer (SGD, Adam). Repeat for many epochs."
          },
          {
            formula: "Optimizers: SGD (basic), RMSprop (adaptive learning rate), Adam (best overall)",
            description: "Algorithms that update weights to minimize loss",
            explanation: "SGD: simple gradient descent. RMSprop: adjusts learning rate per parameter. Adam: combines momentum and adaptive learning rates — most commonly used optimizer."
          }
        ]
      },
      {
        title: "Neural Network Architectures",
        content: "Different architectures are designed for different data types. Choosing the right architecture is critical for model performance.",
        formulas: [
          {
            formula: "Feedforward (FNN): Standard multi-layer perceptron → Tabular data",
            description: "Basic neural network with input, hidden, and output layers",
            explanation: "Data flows in one direction: input → hidden layers → output. Good for structured/tabular data. Each neuron in one layer connects to all neurons in the next layer."
          },
          {
            formula: "CNN (Convolutional Neural Network): Convolution + Pooling + FC layers → Images",
            description: "Specialized for spatial data (images, video)",
            explanation: "Convolutional layers detect features (edges, textures, shapes) using filters. Pooling layers reduce spatial dimensions. Fully Connected layers make final predictions. Preserves spatial relationships."
          },
          {
            formula: "RNN/LSTM: Sequential processing with memory → Time-series, text",
            description: "Designed for sequential/temporal data",
            explanation: "RNNs process sequences step by step, maintaining a hidden state (memory). LSTMs add gates (input, forget, output) to retain long-range context. Good for text, speech, time-series."
          }
        ]
      },
      {
        title: "Overfitting & Remedies",
        content: "Overfitting occurs when a model memorizes training data instead of learning general patterns. It performs well on training data but poorly on new data. Several techniques prevent overfitting.",
        formulas: [
          {
            formula: "Causes: Model too complex, insufficient data, too many training epochs",
            description: "Why models overfit",
            explanation: "Complex models have enough capacity to memorize every training example. Small datasets don't provide enough variety. Too many epochs = the model keeps fitting noise."
          },
          {
            formula: "Early Stopping: Stop training when validation loss starts increasing",
            description: "Prevent overfitting by halting training at the right time",
            explanation: "Monitor validation loss during training. When it stops decreasing and starts increasing, the model is overfitting. Stop training at that point."
          },
          {
            formula: "Dropout: Randomly deactivate neurons during training (e.g., 20-50%)",
            description: "Force the network to learn redundant representations",
            explanation: "During each training step, randomly turn off a percentage of neurons. This prevents the network from relying on specific neurons and forces it to learn robust features."
          },
          {
            formula: "L2 Regularization: Add penalty for large weights to the loss function",
            description: "Discourage the model from becoming too complex",
            explanation: "Add λ × Σ(w²) to the loss. Large weights are penalized, encouraging the model to use smaller, more distributed weights. This simplifies the model and reduces overfitting."
          },
          {
            formula: "Data Augmentation: Create variations of training data (rotate, flip, noise)",
            description: "Increase effective dataset size",
            explanation: "For images: rotate, flip, crop, add noise. For text: synonym replacement, back-translation. More diverse data = better generalization."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the key difference between ML and Deep Learning?",
        options: [
          "DL is slower",
          "DL automates feature learning while ML requires manual feature engineering",
          "ML uses neural networks, DL doesn't",
          "They are the same"
        ],
        correctIndex: 1,
        explanation: "Deep Learning automatically learns features from raw data through layers. Traditional ML requires humans to extract and select features."
      },
      {
        question: "What does the ReLU activation function do?",
        options: [
          "Outputs values between 0 and 1",
          "Returns z if z>0, else 0",
          "Outputs probabilities that sum to 1",
          "Squares the input"
        ],
        correctIndex: 1,
        explanation: "ReLU = max(0, z). It zeros out negative values and passes positive values unchanged. Simple, fast, and solves vanishing gradient."
      },
      {
        question: "Which architecture is best for image data?",
        options: ["Feedforward Neural Network", "CNN (Convolutional Neural Network)", "RNN", "K-Means"],
        correctIndex: 1,
        explanation: "CNNs are designed for spatial data. Convolutional layers detect visual features (edges, textures, shapes) while preserving spatial relationships."
      },
      {
        question: "What does Dropout do to prevent overfitting?",
        options: [
          "Increases the learning rate",
          "Randomly deactivates neurons during training",
          "Adds more layers to the network",
          "Reduces the dataset size"
        ],
        correctIndex: 1,
        explanation: "Dropout randomly turns off a percentage of neurons during each training step, forcing the network to learn robust, redundant features."
      },
      {
        question: "Which loss function is used for classification?",
        options: ["Mean Squared Error", "Cross-Entropy Loss", "MAE", "WCSS"],
        correctIndex: 1,
        explanation: "Cross-Entropy Loss measures the difference between predicted and actual probability distributions. It's the standard loss for classification tasks."
      }
    ],
    sampleData: {
      "Activation Functions Comparison": [
        ["Input (z)", "Sigmoid", "ReLU", "Softmax (example)"],
        ["-2", "0.12", "0", "0.01"],
        ["0", "0.50", "0", "0.09"],
        ["1", "0.73", "1", "0.25"],
        ["2", "0.88", "2", "0.65"],
      ],
      "Network Architecture Selection": [
        ["Data Type", "Best Architecture", "Why"],
        ["Tabular/Structured", "FNN / Decision Tree", "Simple feature relationships"],
        ["Images", "CNN", "Preserves spatial logic"],
        ["Text/Time-series", "RNN / LSTM / Transformer", "Handles sequences"],
        ["Highly regulated tabular", "Decision Tree", "Requires interpretability"],
      ]
    }
  }
];

export { modules };
