import type { FormulaExample, Lesson, QuizQuestion, ModuleData } from '../types';

export const modules: ModuleData[] = [
  {
    id: "data-entry",
    title: "Data Entry & Table Structure",
    icon: "Table",
    description: "Learn to create structured tables with labeled columns, input constraints, and proper data organization.",
    lessons: [
      {
        title: "Creating Structured Tables",
        content: "Every Excel table has rows (records) and columns (attributes). Each column should have a clear header. For example, an employee table has columns: EmpID, Name, Department, Wage, Hours. Each row represents one employee record.",
        formulas: [
          {
            formula: "Column Headers: A1=EmpID, B1=Name, C1=Department, D1=Wage, E1=Hours",
            description: "Set up column headers in row 1",
            explanation: "Headers define what each column stores. Row 1 is reserved for labels. Data starts from row 2."
          }
        ]
      },
      {
        title: "Input Constraints & Validation",
        content: "Excel lets you restrict what users can enter. For example, wage must be between 120-600, department must be one of: HR, IT, Finance, Sales. This prevents bad data from entering your table.",
        formulas: [
          {
            formula: "Data Validation: Wage >= 120 AND Wage <= 600",
            description: "Numeric range constraint on wage column",
            explanation: "Ensures no employee has wage below 120 or above 600. Prevents data entry errors."
          },
          {
            formula: "Data Validation: Department IN (HR, IT, Finance, Sales)",
            description: "Category constraint using dropdown list",
            explanation: "User can only select from predefined departments. Prevents typos like 'Hr' or 'finace'."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "In an Excel table, what do rows represent?",
        options: ["Column headers", "Individual records", "Formulas", "Data types"],
        correctIndex: 1,
        explanation: "Each row represents one record (e.g., one employee, one transaction)."
      },
      {
        question: "Where should column headers be placed?",
        options: ["Row 2", "Row 1", "Column A only", "Last row"],
        correctIndex: 1,
        explanation: "Column headers go in row 1. Data starts from row 2."
      }
    ],
    sampleData: {
      "Employee Table": [
        ["EmpID", "Name", "Department", "Wage", "Hours"],
        ["E001", "John Smith", "HR", "250", "40"],
        ["E002", "Jane Doe", "IT", "350", "45"],
        ["E003", "Bob Wilson", "Finance", "300", "38"],
        ["E004", "Alice Brown", "Sales", "200", "42"],
        ["E005", "Charlie Davis", "IT", "400", "50"],
      ]
    }
  },
  {
    id: "basic-formulas",
    title: "Basic Formulas",
    icon: "Calculator",
    description: "Learn arithmetic formulas, cell referencing, and how to drag formulas down to apply them across rows.",
    lessons: [
      {
        title: "Multiplication Formula",
        content: "To calculate total pay, multiply wage by hours. If wage is in column D and hours in column E, the formula in column F would be =D2*E2. When you drag this formula down, it automatically becomes =D3*E3, =D4*E4, etc.",
        formulas: [
          {
            formula: "=D2 * E2",
            description: "Multiply wage (D2) by hours (E2) to get total pay",
            explanation: "Excel takes the value in cell D2, multiplies it by the value in E2, and shows the result. Drag down and references shift: D3*E3, D4*E4, etc."
          },
          {
            formula: "=250 * 40 = 10000",
            description: "Example: John's wage 250 x 40 hours",
            explanation: "250 (wage) multiplied by 40 (hours) equals 10,000 total pay."
          }
        ]
      },
      {
        title: "Addition Formula",
        content: "To combine values from two cells, use the + operator. For example, if basic pay is in H2 and overtime pay is in J2, total salary = H2+J2.",
        formulas: [
          {
            formula: "=H2 + J2",
            description: "Add basic pay (H2) and overtime pay (J2)",
            explanation: "Excel adds the two cell values. Drag down and it becomes H3+J3, H4+J4, etc."
          }
        ]
      },
      {
        title: "Auto-Fill (Drag Formula Down)",
        content: "After typing a formula in one cell, click the small square at the bottom-right corner and drag down. Excel copies the formula to each row, adjusting cell references automatically. This is called relative referencing.",
        formulas: [
          {
            formula: "F2: =D2*E2 → F3: =D3*E3 → F4: =D4*E4",
            description: "Dragging formula down shifts row numbers",
            explanation: "Excel detects the pattern: each row down increases the row number by 1. This is relative referencing in action."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "If D2=250 and E2=40, what does =D2*E2 return?",
        options: ["290", "10000", "6.25", "25040"],
        correctIndex: 1,
        explanation: "250 multiplied by 40 equals 10,000."
      },
      {
        question: "What happens when you drag =D2*E2 down one row?",
        options: ["=D2*E2 (stays same)", "=D3*E3", "=E2*F2", "=D1*E1"],
        correctIndex: 1,
        explanation: "Relative references shift: D2 becomes D3, E2 becomes E3."
      }
    ],
    sampleData: {
      "Salary Calculation": [
        ["EmpID", "Name", "Wage", "Hours", "Total Pay (=C*D)"],
        ["E001", "John", "250", "40", "=250*40=10000"],
        ["E002", "Jane", "350", "45", "=350*45=15750"],
        ["E003", "Bob", "300", "38", "=300*38=11400"],
        ["E004", "Alice", "200", "42", "=200*42=8400"],
      ]
    }
  },
  {
    id: "cell-referencing",
    title: "Cell Referencing",
    description: "Understand relative, absolute, and mixed cell references. Learn when to use $ to lock rows or columns.",
    icon: "Link",
    lessons: [
      {
        title: "Relative References",
        content: "By default, Excel uses relative references. When you copy or drag a formula, references change based on direction. A2 dragged down becomes A3. A2 dragged right becomes B2.",
        formulas: [
          {
            formula: "A2 → drag down → A3 → drag down → A4",
            description: "Row number increases when dragged down",
            explanation: "Excel adjusts the row reference relative to the direction of movement. Down = +1 row."
          },
          {
            formula: "A2 → drag right → B2 → drag right → C2",
            description: "Column letter increases when dragged right",
            explanation: "Excel adjusts the column reference relative to the direction. Right = +1 column."
          }
        ]
      },
      {
        title: "Absolute References ($)",
        content: "Use $ to lock a reference so it doesn't change when dragged. $N$1 means both column N and row 1 are fixed. This is essential for constants like tax rates, overtime thresholds, or bonus percentages stored in a single cell.",
        formulas: [
          {
            formula: "$N$1",
            description: "Both column and row locked — never changes",
            explanation: "Drag anywhere and it stays $N$1. Use for constants: tax rate, threshold, bonus %."
          },
          {
            formula: "$A2",
            description: "Column A locked, row shifts",
            explanation: "Drag down: $A3, $A4. Drag right: still $A2. Useful when you always want column A."
          },
          {
            formula: "A$2",
            description: "Row 2 locked, column shifts",
            explanation: "Drag down: still A$2. Drag right: B$2, C$2. Useful when you always want row 2."
          }
        ]
      },
      {
        title: "Practical Example: Overtime Threshold",
        content: "Store the overtime threshold (e.g., 40 hours) in cell N1. Use $N$1 in your formula so every row references the same threshold. If the threshold changes, update N1 once and all formulas update automatically.",
        formulas: [
          {
            formula: "=IF(E2>$N$1, (E2-$N$1)*D2*1.5, 0)",
            description: "If hours exceed threshold, calculate overtime pay at 1.5x",
            explanation: "E2 (hours) is relative — changes per row. $N$1 (threshold) is absolute — stays fixed. This combines both reference types."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does $N$1 mean?",
        options: ["Column N shifts, row 1 locked", "Both column N and row 1 are locked", "Neither is locked", "Only row 1 shifts"],
        correctIndex: 1,
        explanation: "$ before column locks the column, $ before row locks the row. $N$1 locks both."
      },
      {
        question: "If you drag =A2+B2 down one row, what does it become?",
        options: ["=A2+B2", "=A3+B3", "=$A$2+$B$2", "=A1+B1"],
        correctIndex: 1,
        explanation: "Relative references shift: A2→A3, B2→B3."
      }
    ]
  },
  {
    id: "logical-functions",
    title: "Logical Functions (IF, Nested IF)",
    icon: "GitBranch",
    description: "Master conditional logic with IF statements. Build decision trees for salary classification, grading, and attendance status.",
    lessons: [
      {
        title: "Basic IF Function",
        content: "The IF function evaluates a condition and returns one value if TRUE and another if FALSE. Syntax: =IF(condition, value_if_true, value_if_false). Excel checks the condition first, then returns the appropriate result.",
        formulas: [
          {
            formula: "=IF(G2>50000, \"High\", \"Low\")",
            description: "Classify salary as High or Low based on 50K threshold",
            explanation: "Step 1: Check if G2 > 50000. Step 2: If TRUE, return 'High'. Step 3: If FALSE, return 'Low'."
          },
          {
            formula: "=IF(E2>=40, \"Present\", \"Absent\")",
            description: "Mark attendance based on hours worked",
            explanation: "Step 1: Check if hours >= 40. Step 2: If TRUE, show 'Present'. Step 3: If FALSE, show 'Absent'."
          }
        ]
      },
      {
        title: "Nested IF — Grading System",
        content: "Nest IF functions inside each other for multiple conditions. Excel evaluates top-to-bottom and stops at the first TRUE. Order matters: check highest values first.",
        formulas: [
          {
            formula: "=IF(H2>=90, \"A\", IF(H2>=75, \"B\", IF(H2>=50, \"C\", \"Fail\")))",
            description: "Assign grades: A (90+), B (75-89), C (50-74), Fail (<50)",
            explanation: "Step 1: Is marks >= 90? Yes → 'A'. No → Step 2: Is marks >= 75? Yes → 'B'. No → Step 3: Is marks >= 50? Yes → 'C'. No → 'Fail'."
          },
          {
            formula: "=IF(G2>80000, \"Very High\", IF(G2>50000, \"High\", IF(G2>30000, \"Medium\", \"Low\")))",
            description: "Salary classification: Very High, High, Medium, Low",
            explanation: "Four-tier classification. Each IF checks a threshold. Order from highest to lowest ensures correct categorization."
          }
        ]
      },
      {
        title: "Attendance Status with Nested IF",
        content: "Combine multiple conditions to determine if a student is allowed for exams. Check attendance percentage and other criteria.",
        formulas: [
          {
            formula: "=IF(I2>=75, \"Allowed\", IF(I2>=60, \"CNG\", \"TNG\"))",
            description: "Allowed (75%+), CNG (60-74%), TNG (<60%)",
            explanation: "Step 1: Is attendance >= 75%? Yes → 'Allowed'. No → Step 2: Is attendance >= 60%? Yes → 'CNG' (Condoned). No → 'TNG' (Termed Not Granted)."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does =IF(100>90, \"A\", \"B\") return?",
        options: ["A", "B", "TRUE", "100"],
        correctIndex: 0,
        explanation: "100 > 90 is TRUE, so it returns the second argument: 'A'."
      },
      {
        question: "In nested IF, what happens if marks = 80 in =IF(H2>=90,\"A\",IF(H2>=75,\"B\",\"C\"))?",
        options: ["A", "B", "C", "Error"],
        correctIndex: 1,
        explanation: "80 >= 90 is FALSE, so it checks next: 80 >= 75 is TRUE, returns 'B'."
      }
    ],
    sampleData: {
      "Grading System": [
        ["Student", "Marks", "Grade"],
        ["Alice", "95", "=IF(B2>=90,\"A\",IF(B2>=75,\"B\",IF(B2>=50,\"C\",\"Fail\")))=A"],
        ["Bob", "78", "=IF(B3>=90,\"A\",IF(B3>=75,\"B\",IF(B3>=50,\"C\",\"Fail\")))=B"],
        ["Charlie", "62", "=IF(B4>=90,\"A\",IF(B4>=75,\"B\",IF(B4>=50,\"C\",\"Fail\")))=C"],
        ["Diana", "45", "=IF(B5>=90,\"A\",IF(B5>=75,\"B\",IF(B5>=50,\"C\",\"Fail\")))=Fail"],
      ]
    }
  },
  {
    id: "text-functions",
    title: "Text Functions",
    icon: "Type",
    description: "Extract, combine, and manipulate text data using LEFT, RIGHT, MID, and concatenation.",
    lessons: [
      {
        title: "LEFT Function",
        content: "LEFT extracts characters from the start (left side) of a text string. Syntax: =LEFT(text, num_chars). Useful for extracting codes, prefixes, or initials.",
        formulas: [
          {
            formula: "=LEFT(\"EMP001John\", 6)",
            description: "Extract first 6 characters",
            explanation: "Returns 'EMP001'. Counts 6 characters from the left: E-M-P-0-0-1."
          },
          {
            formula: "=LEFT(A2, 3)",
            description: "Extract first 3 characters from cell A2",
            explanation: "If A2 contains 'IT-Department', returns 'IT-'. If A2 contains 'Finance', returns 'Fin'."
          }
        ]
      },
      {
        title: "RIGHT and MID Functions",
        content: "RIGHT extracts from the end. MID extracts from any position. MID needs a starting position and number of characters.",
        formulas: [
          {
            formula: "=RIGHT(\"EMP001John\", 4)",
            description: "Extract last 4 characters",
            explanation: "Returns 'John'. Counts 4 characters from the right: J-o-h-n."
          },
          {
            formula: "=MID(\"EMP001John\", 7, 4)",
            description: "Extract 4 characters starting at position 7",
            explanation: "Position 7 is 'J'. Extracts 4 chars: 'John'. Positions: E(1)M(2)P(3)0(4)0(5)1(6)J(7)o(8)h(9)n(10)."
          }
        ]
      },
      {
        title: "Concatenation with &",
        content: "Join text from multiple cells using the & operator. Add spaces, dashes, or any separator between parts.",
        formulas: [
          {
            formula: "=A2 & \" \" & B2",
            description: "Join first name and last name with a space",
            explanation: "If A2='John' and B2='Doe', returns 'John Doe'. The \" \" adds a space between."
          },
          {
            formula: "=LEFT(A2,3) & \"-\" & RIGHT(A2,4)",
            description: "Create employee code from name",
            explanation: "If A2='JohnDoe', LEFT gives 'Joh', RIGHT gives 'nDoe', result: 'Joh-nDoe'."
          },
          {
            formula: "=\"EMP\" & TEXT(ROW()-1,\"000\")",
            description: "Auto-generate employee codes: EMP001, EMP002...",
            explanation: "ROW() returns current row number. TEXT formats it as 3 digits. 'EMP' + '001' = 'EMP001'."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does =LEFT(\"Hello World\", 5) return?",
        options: ["World", "Hello", "Hello ", "o Wor"],
        correctIndex: 1,
        explanation: "LEFT extracts 5 characters from the start: H-e-l-l-o."
      },
      {
        question: "What does =\"A\" & \"-\" & \"B\" return?",
        options: ["A & - & B", "A-B", "AB", "Error"],
        correctIndex: 1,
        explanation: "& joins text: 'A' + '-' + 'B' = 'A-B'."
      }
    ]
  },
  {
    id: "aggregate-functions",
    title: "Aggregate Functions",
    icon: "Sigma",
    description: "Calculate totals, counts, and averages using SUM, COUNT, and AVERAGE.",
    lessons: [
      {
        title: "SUM Function",
        content: "SUM adds all numeric values in a range. Syntax: =SUM(range). It ignores text and blank cells. Use it for totals: total salary, total hours, total expenses.",
        formulas: [
          {
            formula: "=SUM(D2:D10)",
            description: "Add all values from D2 to D10",
            explanation: "Excel adds D2+D3+D4+...+D10. If any cell contains text, it's skipped. Blank cells are treated as 0."
          },
          {
            formula: "=SUM(D2,D5,D8)",
            description: "Add specific cells only",
            explanation: "Adds only D2, D5, and D8. Useful for non-contiguous cells."
          }
        ]
      },
      {
        title: "COUNT Function",
        content: "COUNT counts how many cells in a range contain numbers. It ignores text, blanks, and errors. Use it to know how many numeric entries exist.",
        formulas: [
          {
            formula: "=COUNT(D2:D10)",
            description: "Count numeric cells in D2:D10",
            explanation: "If D2:D10 has 7 numbers and 2 text cells, COUNT returns 7. Only numbers are counted."
          },
          {
            formula: "=COUNTA(D2:D10)",
            description: "Count all non-empty cells (numbers + text)",
            explanation: "COUNTA counts everything that's not blank. If 7 numbers + 2 text = 9 non-empty cells, returns 9."
          }
        ]
      },
      {
        title: "AVERAGE Function",
        content: "AVERAGE calculates the mean: sum of values divided by count of numeric cells. Ignores text and blanks.",
        formulas: [
          {
            formula: "=AVERAGE(D2:D10)",
            description: "Calculate average of D2 through D10",
            explanation: "Step 1: Sum all numeric values. Step 2: Count how many numeric cells. Step 3: Divide sum by count."
          },
          {
            formula: "=SUM(D2:D10)/COUNT(D2:D10)",
            description: "Manual average calculation (same as AVERAGE)",
            explanation: "This is what AVERAGE does internally. Sum divided by count. Both ignore text and blanks."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "If D2:D5 contains 10, 20, \"text\", 30 — what does =SUM(D2:D5) return?",
        options: ["60", "Error", "1020text30", "0"],
        correctIndex: 0,
        explanation: "SUM ignores text. 10+20+30 = 60."
      },
      {
        question: "If D2:D5 contains 10, 20, 30, 40 — what does =AVERAGE(D2:D5) return?",
        options: ["100", "25", "40", "10"],
        correctIndex: 1,
        explanation: "(10+20+30+40)/4 = 100/4 = 25."
      }
    ],
    sampleData: {
      "Attendance Totals": [
        ["Subject", "Present Days", "Total Days", "Percentage"],
        ["Math", "42", "50", "=B2/C2*100=84%"],
        ["Science", "38", "50", "=B3/C3*100=76%"],
        ["English", "45", "50", "=B4/C4*100=90%"],
        ["TOTAL", "=SUM(B2:B4)=125", "=SUM(C2:C4)=150", "=AVERAGE(D2:D4)=83.3%"],
      ]
    }
  },
  {
    id: "conditional-functions",
    title: "Conditional Functions",
    icon: "Filter",
    description: "Count, sum, and average based on conditions using COUNTIF, AVERAGEIF, SUMIF, and SUMIFS.",
    lessons: [
      {
        title: "COUNTIF Function",
        content: "COUNTIF counts cells that match a condition. Syntax: =COUNTIF(range, condition). The condition can be a number, text, or comparison operator.",
        formulas: [
          {
            formula: "=COUNTIF(E2:E100, \">50000\")",
            description: "Count salaries above 50,000",
            explanation: "Step 1: Check each cell in E2:E100. Step 2: Is value > 50000? Step 3: Count how many are TRUE."
          },
          {
            formula: "=COUNTIF(C2:C100, \"IT\")",
            description: "Count employees in IT department",
            explanation: "Step 1: Check each cell in C2:C100. Step 2: Does it equal 'IT'? Step 3: Count matches."
          },
          {
            formula: "=COUNTIF(D2:D100, \">=40\")",
            description: "Count employees working 40+ hours",
            explanation: ">= means greater than or equal. Counts all cells with value 40 or higher."
          }
        ]
      },
      {
        title: "AVERAGEIF Function",
        content: "AVERAGEIF averages values where a condition is met. Syntax: =AVERAGEIF(range, condition, avg_range). It filters first, then averages.",
        formulas: [
          {
            formula: "=AVERAGEIF(C2:C100, \"HR\", D2:D100)",
            description: "Average salary of HR employees only",
            explanation: "Step 1: Find all rows where column C = 'HR'. Step 2: Take corresponding salary values from column D. Step 3: Average those salaries."
          },
          {
            formula: "=AVERAGEIF(E2:E100, \">40\")",
            description: "Average of hours worked above 40",
            explanation: "When avg_range is omitted, it averages the cells in range that meet the condition. Only values > 40 are included."
          }
        ]
      },
      {
        title: "SUMIF Function",
        content: "SUMIF adds values where a condition is met. Syntax: =SUMIF(range, condition, sum_range). Filter first, then sum.",
        formulas: [
          {
            formula: "=SUMIF(C2:C100, \"Finance\", D2:D100)",
            description: "Total salary of Finance department",
            explanation: "Step 1: Find rows where column C = 'Finance'. Step 2: Sum the corresponding salary values from column D."
          },
          {
            formula: "=SUMIF(E2:E100, \">=40\", D2:D100)",
            description: "Total pay for employees working 40+ hours",
            explanation: "Step 1: Find rows where hours >= 40. Step 2: Sum their pay values from column D."
          }
        ]
      },
      {
        title: "SUMIFS — Multiple Conditions",
        content: "SUMIFS adds values where ALL conditions are met. Syntax: =SUMIFS(sum_range, range1, cond1, range2, cond2, ...). Note: sum_range comes FIRST, unlike SUMIF.",
        formulas: [
          {
            formula: "=SUMIFS(D2:D100, C2:C100, \"IT\", D2:D100, \">40000\")",
            description: "Sum salaries where dept=IT AND salary>40K",
            explanation: "Step 1: Find rows where C='IT'. Step 2: From those, find where D>40000. Step 3: Sum matching salaries. ALL conditions must be true."
          },
          {
            formula: "=SUMIFS(D2:D100, C2:C100, \"Sales\", E2:E100, \">=40\", D2:D100, \"<50000\")",
            description: "Sum Sales dept salaries where hours>=40 AND salary<50K",
            explanation: "Three conditions: dept=Sales, hours>=40, salary<50K. Only rows meeting ALL three are summed."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does =COUNTIF(A1:A5, \">10\") count?",
        options: ["Cells equal to 10", "Cells greater than 10", "Cells less than 10", "All cells"],
        correctIndex: 1,
        explanation: "\">10\" means greater than 10. Only values above 10 are counted."
      },
      {
        question: "In SUMIFS, where does the sum_range go?",
        options: ["Last", "Second", "First", "Anywhere"],
        correctIndex: 2,
        explanation: "SUMIFS puts sum_range FIRST, then pairs of range+condition. This is different from SUMIF."
      }
    ],
    sampleData: {
      "Department Analysis": [
        ["EmpID", "Department", "Salary", "Hours"],
        ["E001", "HR", "45000", "40"],
        ["E002", "IT", "65000", "45"],
        ["E003", "Finance", "55000", "38"],
        ["E004", "IT", "72000", "50"],
        ["E005", "HR", "48000", "42"],
        ["E006", "Sales", "38000", "40"],
        ["", "", "", ""],
        ["IT Count", "=COUNTIF(B2:B7,\"IT\")=2", "", ""],
        ["IT Avg Salary", "=AVERAGEIF(B2:B7,\"IT\",C2:C7)=68500", "", ""],
        ["HR Total Salary", "=SUMIF(B2:B7,\"HR\",C2:C7)=93000", "", ""],
      ]
    }
  },
  {
    id: "lookup-functions",
    title: "Lookup Functions (VLOOKUP & HLOOKUP)",
    icon: "Search",
    description: "Search and retrieve data from reference tables using VLOOKUP (vertical) and HLOOKUP (horizontal).",
    lessons: [
      {
        title: "VLOOKUP — Vertical Lookup",
        content: "VLOOKUP searches for a value in the FIRST COLUMN of a table, then returns a value from another column in the same row. Think of it like looking up a word in a dictionary: find the word (first column), then read the definition (another column).",
        formulas: [
          {
            formula: "=VLOOKUP(lookup_value, table_range, col_index, FALSE)",
            description: "Basic VLOOKUP syntax",
            explanation: "lookup_value = what to find. table_range = where to search (first column must contain lookup values). col_index = which column number to return (1=first, 2=second). FALSE = exact match."
          },
          {
            formula: "=VLOOKUP(\"IT\", G2:H5, 2, FALSE)",
            description: "Find IT department's bonus from reference table",
            explanation: "Step 1: Search for 'IT' in column G (first column of G2:H5). Step 2: Found in row 3. Step 3: Move to column 2 of range (column H). Step 4: Return the bonus value from H3."
          },
          {
            formula: "=VLOOKUP(A2, $G$2:$H$5, 2, FALSE)",
            description: "Look up department from cell A2, return bonus",
            explanation: "A2 contains the department name. $G$2:$H$5 is the locked reference table. Column 2 returns the bonus. FALSE ensures exact match."
          }
        ]
      },
      {
        title: "VLOOKUP — Step by Step Animation",
        content: "Watch how VLOOKUP works: it scans down the first column until it finds a match, then moves right to the specified column, and returns that value.",
        formulas: [
          {
            formula: "Reference Table: G2=HR,H2=5000 | G3=IT,H3=8000 | G4=Finance,H4=7000 | G5=Sales,H5=6000",
            description: "Department-to-bonus mapping table",
            explanation: "This is the lookup table. Column G has departments, column H has bonus amounts. VLOOKUP searches column G, returns from column H."
          },
          {
            formula: "=VLOOKUP(\"Finance\", G2:H5, 2, FALSE) → 7000",
            description: "Lookup Finance bonus",
            explanation: "Step 1: Search 'Finance' in G2:G5. Step 2: Found at G4. Step 3: Move to column 2 (H4). Step 4: Return 7000."
          }
        ]
      },
      {
        title: "HLOOKUP — Horizontal Lookup",
        content: "HLOOKUP searches for a value in the FIRST ROW of a table, then returns a value from another row in the same column. Use when your reference data is arranged horizontally (across columns) instead of vertically.",
        formulas: [
          {
            formula: "=HLOOKUP(lookup_value, table_range, row_index, FALSE)",
            description: "Basic HLOOKUP syntax",
            explanation: "lookup_value = what to find. table_range = where to search (first row must contain lookup values). row_index = which row number to return (1=first, 2=second). FALSE = exact match."
          },
          {
            formula: "=HLOOKUP(\"Q2\", B1:E4, 3, FALSE)",
            description: "Find Q2 data from horizontal table",
            explanation: "Step 1: Search for 'Q2' in row 1 (B1:E1). Step 2: Found at C1. Step 3: Move down to row 3 of range (row 3). Step 4: Return value from C3."
          },
          {
            formula: "=HLOOKUP(\"Sales\", B1:F3, 2, FALSE)",
            description: "Find Sales figure from horizontal layout",
            explanation: "Step 1: Search 'Sales' in B1:F1. Step 2: Found at column D. Step 3: Move to row 2 of range. Step 4: Return value from D2."
          }
        ]
      },
      {
        title: "VLOOKUP vs HLOOKUP — When to Use Which",
        content: "VLOOKUP is used 95% of the time because data is usually arranged vertically (rows = records). Use HLOOKUP only when your lookup values are in the first row and data extends downward.",
        formulas: [
          {
            formula: "VLOOKUP: Search DOWN first column → return from column to the RIGHT",
            description: "Vertical search pattern",
            explanation: "Best for: employee lists, product catalogs, department tables — anything where lookup values are in a column."
          },
          {
            formula: "HLOOKUP: Search ACROSS first row → return from row BELOW",
            description: "Horizontal search pattern",
            explanation: "Best for: quarterly reports, monthly summaries, time-series data — anything where headers are in a row."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "In =VLOOKUP(\"IT\", A1:D10, 3, FALSE), which column does it search?",
        options: ["Column A", "Column C", "Column D", "Column B"],
        correctIndex: 0,
        explanation: "VLOOKUP always searches the FIRST column of the range. A1:D10's first column is A."
      },
      {
        question: "What does the '3' mean in =VLOOKUP(\"IT\", A1:D10, 3, FALSE)?",
        options: ["Search row 3", "Return from 3rd column of range", "Find value 3", "Check 3 cells"],
        correctIndex: 1,
        explanation: "col_index=3 means return the value from the 3rd column of the range A1:D10, which is column C."
      },
      {
        question: "HLOOKUP searches in which direction?",
        options: ["Down the first column", "Across the first row", "Diagonally", "Random"],
        correctIndex: 1,
        explanation: "HLOOKUP searches horizontally across the first row of the range."
      }
    ],
    sampleData: {
      "VLOOKUP Reference Table": [
        ["Department", "Bonus"],
        ["HR", "5000"],
        ["IT", "8000"],
        ["Finance", "7000"],
        ["Sales", "6000"],
      ],
      "HLOOKUP Reference Table": [
        ["Quarter", "Q1", "Q2", "Q3", "Q4"],
        ["Revenue", "100K", "150K", "120K", "180K"],
        ["Expenses", "60K", "80K", "70K", "90K"],
      ]
    }
  },
  {
    id: "filtering",
    title: "Filtering Data",
    icon: "Funnel",
    description: "Filter datasets using Auto Filter and Advanced Filter to extract specific records based on conditions.",
    lessons: [
      {
        title: "Auto Filter",
        content: "Auto Filter adds dropdown arrows to column headers. Click a dropdown to filter by specific values, text conditions, or number ranges. Only matching rows are shown.",
        formulas: [
          {
            formula: "Filter: Department = \"IT\"",
            description: "Show only IT department employees",
            explanation: "Step 1: Click dropdown on Department column. Step 2: Uncheck 'Select All'. Step 3: Check only 'IT'. Step 4: Only IT rows remain visible."
          },
          {
            formula: "Filter: Salary > 50000",
            description: "Show only high-salary employees",
            explanation: "Step 1: Click dropdown on Salary column. Step 2: Choose 'Number Filters' > 'Greater Than'. Step 3: Enter 50000. Step 4: Only rows with salary > 50K shown."
          }
        ]
      },
      {
        title: "Advanced Filter",
        content: "Advanced Filter handles multiple conditions across different columns. Set up a criteria range with column headers and conditions below them.",
        formulas: [
          {
            formula: "Criteria: Department=IT AND Salary>60000",
            description: "Filter IT employees earning above 60K",
            explanation: "Set up criteria range: Row 1 has headers (Department, Salary). Row 2 has conditions (IT, >60000). Both must be true (AND logic)."
          },
          {
            formula: "Criteria: Department=IT OR Department=HR",
            description: "Filter IT or HR employees",
            explanation: "Put IT on one row, HR on the next row in the criteria range. Different rows = OR logic. Same row = AND logic."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "In Advanced Filter, conditions on the same row use which logic?",
        options: ["OR", "AND", "NOT", "XOR"],
        correctIndex: 1,
        explanation: "Conditions on the same row must ALL be true (AND logic)."
      },
      {
        question: "To filter for IT OR HR, where do you place the conditions?",
        options: ["Same row", "Different rows", "Same cell", "Different columns"],
        correctIndex: 1,
        explanation: "Conditions on different rows use OR logic — either condition can be true."
      }
    ]
  },
  {
    id: "pivot-tables",
    title: "Pivot Tables",
    icon: "Grid3X3",
    description: "Summarize large datasets by dragging fields into Rows, Columns, Values, and Filters areas.",
    lessons: [
      {
        title: "What is a Pivot Table?",
        content: "A Pivot Table summarizes data without formulas. You drag fields into four areas: Rows (grouping), Columns (sub-grouping), Values (calculations), and Filters (narrowing). Excel automatically aggregates the data.",
        formulas: [
          {
            formula: "Rows: Department | Values: SUM(Salary)",
            description: "Total salary by department",
            explanation: "Step 1: Drag 'Department' to Rows. Step 2: Drag 'Salary' to Values. Step 3: Excel groups by department and sums salaries. Result: HR=93K, IT=137K, Finance=55K, Sales=38K."
          },
          {
            formula: "Rows: Department | Columns: Quarter | Values: SUM(Revenue)",
            description: "Revenue by department per quarter",
            explanation: "Step 1: Department in Rows creates row groups. Step 2: Quarter in Columns creates column groups. Step 3: Revenue in Values fills the intersection cells with sums."
          }
        ]
      },
      {
        title: "Pivot Table Field Areas",
        content: "Four areas control how data is summarized. Rows and Columns define the structure. Values define the calculation. Filters narrow the dataset.",
        formulas: [
          {
            formula: "Rows = Grouping dimension (what to group by)",
            description: "Creates row labels in the pivot",
            explanation: "Example: Drag 'Department' to Rows → each department gets its own row."
          },
          {
            formula: "Columns = Sub-grouping dimension (cross-tabulation)",
            description: "Creates column headers in the pivot",
            explanation: "Example: Drag 'Quarter' to Columns → each quarter gets its own column."
          },
          {
            formula: "Values = What to calculate (SUM, COUNT, AVERAGE)",
            description: "The numbers in the pivot cells",
            explanation: "Example: Drag 'Salary' to Values → defaults to SUM. Can change to COUNT, AVERAGE, MAX, MIN."
          },
          {
            formula: "Filters = Dataset-wide filter",
            description: "Narrow the entire pivot to specific values",
            explanation: "Example: Drag 'Year' to Filters → choose 2024 → pivot shows only 2024 data."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Which Pivot Table area defines the row labels?",
        options: ["Columns", "Values", "Rows", "Filters"],
        correctIndex: 2,
        explanation: "The Rows area creates row labels — each unique value gets its own row."
      },
      {
        question: "What calculation does Pivot Table use by default for numeric Values?",
        options: ["AVERAGE", "COUNT", "SUM", "MAX"],
        correctIndex: 2,
        explanation: "Pivot Tables default to SUM for numeric fields and COUNT for text fields."
      }
    ],
    sampleData: {
      "Sales Data for Pivot": [
        ["Region", "Category", "Quarter", "Revenue", "Payment"],
        ["North", "Electronics", "Q1", "50000", "Credit"],
        ["South", "Clothing", "Q1", "30000", "Cash"],
        ["North", "Clothing", "Q2", "45000", "Credit"],
        ["East", "Electronics", "Q2", "60000", "UPI"],
        ["South", "Electronics", "Q3", "55000", "Credit"],
        ["West", "Clothing", "Q3", "35000", "Cash"],
      ]
    }
  },
  {
    id: "charts",
    title: "Charts & Visualization",
    icon: "BarChart3",
    description: "Create column, line, pie, scatter, histogram, and combo charts to visualize data patterns and trends.",
    lessons: [
      {
        title: "Column Chart — Comparison",
        content: "Column charts compare values across categories. Each category gets a vertical bar. Height represents the value. Best for comparing departments, products, or regions.",
        formulas: [
          {
            formula: "Data: HR=93K, IT=137K, Finance=55K, Sales=38K → Column Chart",
            description: "Compare department salaries visually",
            explanation: "Each department gets a column. IT's column is tallest (137K), Sales is shortest (38K). Easy to see differences at a glance."
          }
        ]
      },
      {
        title: "Line Chart — Trends Over Time",
        content: "Line charts show how values change over time. Points are connected by lines. Best for revenue trends, attendance patterns, or any time-series data.",
        formulas: [
          {
            formula: "Data: Q1=100K, Q2=150K, Q3=120K, Q4=180K → Line Chart",
            description: "Show revenue trend across quarters",
            explanation: "X-axis = quarters (time). Y-axis = revenue. Line goes up from Q1 to Q2, dips at Q3, peaks at Q4. Shows growth pattern."
          }
        ]
      },
      {
        title: "Pie Chart — Proportions",
        content: "Pie charts show parts of a whole. Each slice represents a percentage of the total. Best for market share, budget allocation, or distribution.",
        formulas: [
          {
            formula: "Data: HR=25%, IT=35%, Finance=20%, Sales=20% → Pie Chart",
            description: "Show department distribution",
            explanation: "Total = 100%. IT gets the largest slice (35%), HR gets 25%, Finance and Sales each get 20%. Shows relative proportions."
          }
        ]
      },
      {
        title: "Scatter Chart — Relationships",
        content: "Scatter charts plot individual data points on X-Y axes. Shows relationships between two variables. Best for study hours vs marks, advertising spend vs sales.",
        formulas: [
          {
            formula: "X=Study Hours, Y=Marks → Scatter Plot",
            description: "Show correlation between study time and grades",
            explanation: "Each dot = one student. X-axis = hours studied. Y-axis = marks scored. If dots trend upward, more study = better marks (positive correlation)."
          }
        ]
      },
      {
        title: "Histogram — Distribution",
        content: "Histograms show how values are distributed across ranges (bins). Unlike column charts, histograms group continuous data into ranges.",
        formulas: [
          {
            formula: "Salary ranges: 30-40K, 40-50K, 50-60K, 60-70K, 70-80K → Histogram",
            description: "Show salary distribution",
            explanation: "Each bar = a salary range. Height = number of employees in that range. Shows if salaries cluster at certain levels."
          }
        ]
      },
      {
        title: "Combo Chart — Dual Axis",
        content: "Combo charts combine two chart types on one graph. Use different Y-axes for different scales. Best for comparing revenue (bars) with growth rate (line).",
        formulas: [
          {
            formula: "Bars=Revenue (left axis), Line=Growth% (right axis)",
            description: "Show revenue and growth rate together",
            explanation: "Left Y-axis = revenue (large numbers, bars). Right Y-axis = growth % (small numbers, line). Two scales, one chart."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Which chart type is best for showing trends over time?",
        options: ["Pie Chart", "Column Chart", "Line Chart", "Scatter Chart"],
        correctIndex: 2,
        explanation: "Line charts connect data points over time, making trends easy to see."
      },
      {
        question: "What does a scatter chart show?",
        options: ["Parts of a whole", "Trends over time", "Relationship between two variables", "Category comparison"],
        correctIndex: 2,
        explanation: "Scatter charts plot X-Y pairs to show correlations and relationships."
      }
    ],
    sampleData: {
      "Study Hours vs Marks": [
        ["Student", "Hours/Day", "Marks %"],
        ["A", "2", "45"],
        ["B", "4", "62"],
        ["C", "6", "78"],
        ["D", "8", "85"],
        ["E", "10", "92"],
      ],
      "Quarterly Revenue": [
        ["Quarter", "Revenue", "Growth %"],
        ["Q1", "100000", "5"],
        ["Q2", "150000", "12"],
        ["Q3", "120000", "-8"],
        ["Q4", "180000", "15"],
      ]
    }
  },
  {
    id: "dashboard",
    title: "Dashboard System",
    icon: "LayoutDashboard",
    description: "Combine charts, summary metrics, and filters to build interactive business dashboards.",
    lessons: [
      {
        title: "Dashboard Components",
        content: "A dashboard combines multiple visual elements: KPI cards (key numbers), charts (visual trends), filters/slicers (interactive controls), and tables (detailed data). All elements update together when filters change.",
        formulas: [
          {
            formula: "KPI Cards: Total Revenue, Total Employees, Avg Salary, Top Department",
            description: "Summary metrics at the top of dashboard",
            explanation: "KPI cards show the most important numbers at a glance. Calculated using SUM, COUNT, AVERAGE, and MAX functions."
          },
          {
            formula: "Slicer: Department Filter → All charts update",
            description: "Interactive filter controls the entire dashboard",
            explanation: "Select 'IT' in the slicer → all charts, tables, and KPIs show only IT data. One filter controls everything."
          }
        ]
      },
      {
        title: "Building a Sales Dashboard",
        content: "Combine revenue chart, department breakdown, regional analysis, and date filters into one view. Use slicers for interactive filtering.",
        formulas: [
          {
            formula: "Dashboard Layout: [KPI Row] [Chart 1 | Chart 2] [Chart 3 | Slicer]",
            description: "Standard dashboard grid layout",
            explanation: "Top row: 4 KPI cards. Middle: two charts side by side. Bottom: one chart and a slicer panel. Clean, organized layout."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is a slicer in Excel?",
        options: ["A chart type", "An interactive filter button", "A formula", "A cell format"],
        correctIndex: 1,
        explanation: "Slicers are visual filter buttons that update all connected charts and tables."
      }
    ]
  },
  {
    id: "formula-auditing",
    title: "Formula Auditing",
    icon: "Bug",
    description: "Debug formulas using Trace Precedents, Trace Dependents, and error checking tools.",
    lessons: [
      {
        title: "Trace Precedents",
        content: "Trace Precedents shows which cells feed INTO a formula. Blue arrows point from source cells to the formula cell. Helps you understand what data a formula depends on.",
        formulas: [
          {
            formula: "Formula: =D2*E2 → Arrows from D2 and E2 point to formula cell",
            description: "See which cells the formula reads from",
            explanation: "Click 'Trace Precedents' → Excel draws arrows from D2 and E2 to the cell containing the formula. Shows the formula's inputs."
          }
        ]
      },
      {
        title: "Trace Dependents",
        content: "Trace Dependents shows which cells USE the current cell's value. Blue arrows point from the current cell to cells that reference it. Helps you understand the impact of changing a cell.",
        formulas: [
          {
            formula: "Cell N1 (tax rate) → Arrows to all cells using $N$1",
            description: "See which formulas depend on this cell",
            explanation: "Click 'Trace Dependents' on N1 → arrows to every cell that references $N$1. Changing N1 affects all those cells."
          }
        ]
      },
      {
        title: "Common Errors",
        content: "Excel shows error codes when something goes wrong. Understanding these helps you fix formulas quickly.",
        formulas: [
          {
            formula: "#VALUE! — Wrong data type (e.g., =A2+\"text\")",
            description: "Can't perform math on text",
            explanation: "Fix: Check that all cells in the formula contain numbers, not text. Use ISNUMBER() to verify."
          },
          {
            formula: "#REF! — Broken reference (deleted cell/range)",
            description: "Formula refers to a cell that no longer exists",
            explanation: "Fix: Undo the deletion, or update the formula to reference valid cells."
          },
          {
            formula: "#N/A — VLOOKUP can't find the value",
            description: "Lookup value doesn't exist in the first column",
            explanation: "Fix: Check spelling, use TRIM() to remove extra spaces, or wrap in IFERROR: =IFERROR(VLOOKUP(...), \"Not Found\")."
          },
          {
            formula: "#DIV/0! — Division by zero",
            description: "Denominator is 0 or blank",
            explanation: "Fix: =IF(B2=0, 0, A2/B2) — check denominator before dividing."
          },
          {
            formula: "#NAME? — Excel doesn't recognize the function name",
            description: "Typo in function name or missing quotes around text",
            explanation: "Fix: Check spelling of function names. Ensure text values are in quotes: =IF(A1>5, \"Yes\", \"No\")."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does #REF! error mean?",
        options: ["Wrong data type", "Broken cell reference", "Division by zero", "Value not found"],
        correctIndex: 1,
        explanation: "#REF! means a formula refers to a cell that has been deleted or is invalid."
      },
      {
        question: "How do you handle #N/A in VLOOKUP gracefully?",
        options: ["Ignore it", "Use IFERROR wrapper", "Delete the formula", "Change to HLOOKUP"],
        correctIndex: 1,
        explanation: "=IFERROR(VLOOKUP(...), \"Not Found\") replaces #N/A with a friendly message."
      }
    ]
  },
  {
    id: "multi-sheet",
    title: "Multi-Sheet System",
    icon: "Sheet",
    description: "Organize data across multiple sheets and create summary sheets that aggregate results.",
    lessons: [
      {
        title: "Organizing Data Across Sheets",
        content: "Use separate sheets for different datasets. For example, a semester attendance system has one sheet per subject (Math, Science, English, etc.) and a summary sheet that aggregates all results.",
        formulas: [
          {
            formula: "Sheet1=Math, Sheet2=Science, Sheet3=English, Sheet4=Summary",
            description: "One sheet per subject, one summary sheet",
            explanation: "Each subject sheet tracks attendance for that subject. The summary sheet pulls data from all subject sheets to calculate overall attendance."
          }
        ]
      },
      {
        title: "Cross-Sheet References",
        content: "Reference cells from other sheets using SheetName!CellReference. This allows the summary sheet to pull data from all subject sheets.",
        formulas: [
          {
            formula: "=Math!B2 + Science!B2 + English!B2",
            description: "Sum present days from all subject sheets",
            explanation: "Math!B2 gets cell B2 from the Math sheet. Science!B2 from Science sheet. Add them together for total present days."
          },
          {
            formula: "=SUM(Math!B2:B50, Science!B2:B50, English!B2:B50)",
            description: "Sum all present days across all sheets",
            explanation: "SUM can reference multiple sheets. Each range is SheetName!Range. Adds all present days from all subjects."
          },
          {
            formula: "Attendance % = Total Present / Total Days * 100",
            description: "Calculate overall attendance percentage",
            explanation: "Step 1: Sum present days from all sheets. Step 2: Sum total days from all sheets. Step 3: Divide and multiply by 100."
          },
          {
            formula: "=IF(Overall%>=75, \"Allowed\", IF(Overall%>=60, \"CNG\", \"TNG\"))",
            description: "Determine exam eligibility based on overall attendance",
            explanation: "Uses the same nested IF logic but with the aggregated attendance percentage from all subjects."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "How do you reference cell B2 from a sheet named 'Math'?",
        options: ["B2!Math", "Math!B2", "Math.B2", "Math->B2"],
        correctIndex: 1,
        explanation: "Cross-sheet references use SheetName!CellReference format."
      },
      {
        question: "What attendance percentage is typically required to be 'Allowed' for exams?",
        options: ["50%", "60%", "75%", "90%"],
        correctIndex: 2,
        explanation: "75% is the standard threshold. 60-74% = CNG (Condoned), below 60% = TNG."
      }
    ]
  }
];

export function getModuleById(id: string): ModuleData | undefined {
  return modules.find(m => m.id === id);
}

export function getAllModuleIds(): string[] {
  return modules.map(m => m.id);
}