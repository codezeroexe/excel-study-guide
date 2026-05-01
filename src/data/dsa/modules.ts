import type { ModuleData } from '../types';

export const modules: ModuleData[] = [
  {
    id: "intro-dsa",
    title: "Introduction to DS & Algorithm Analysis",
    icon: "BookOpen",
    description: "What are data structures and algorithms? Learn Big O, time/space complexity, and how arrays work in memory.",
    lessons: [
      {
        title: "What are Data Structures & Algorithms?",
        content: "A data structure is a way of organizing data in memory along with the operations you can perform on it. An algorithm is a finite, step-by-step list of instructions to solve a specific problem. Together, they form the foundation of efficient software.",
        formulas: [
          {
            formula: "Data Structure = Organized Data + Allowed Operations",
            description: "Every data structure defines what you can do with the data",
            explanation: "Example: An array stores elements in order and allows access by index. A stack only allows push (add to top) and pop (remove from top). The structure determines which operations are fast and which are slow."
          },
          {
            formula: "Algorithm = Finite Step-by-Step Instructions → Correct Output",
            description: "A good algorithm is correct, efficient, and clear",
            explanation: "Three qualities of a good algorithm: (1) Produces correct outputs for all valid inputs. (2) Executes efficiently — uses fewest steps and least memory. (3) Is easy to understand and modify."
          },
          {
            formula: "Real Example: Google Search = Index (data structure) + Ranking (algorithm)",
            description: "Data structures and algorithms power everything you use",
            explanation: "Google stores web pages in an inverted index (data structure). When you search, a ranking algorithm scores and sorts results. The right combination makes billions of searches fast."
          }
        ]
      },
      {
        title: "Arrays & Memory Layout",
        content: "An array is a collection of elements stored at contiguous (adjacent) memory locations. This contiguous layout makes array access fast — O(1) — but insertion and deletion slow — O(n) — because elements must be shifted.",
        formulas: [
          {
            formula: "Address of arr[i] = Base Address + (i × Size of Element)",
            description: "How the computer calculates where each element lives in memory",
            explanation: "If base address is 1000 and each int is 4 bytes: arr[0] is at 1000, arr[1] at 1004, arr[2] at 1008. This formula enables O(1) random access."
          },
          {
            formula: "Row Major Order: arr[row][col] → rows stored sequentially (C/C++)",
            description: "2D arrays stored row by row in memory",
            explanation: "arr[0][0], arr[0][1], arr[0][2], then arr[1][0], arr[1][1]... All elements of row 0 come first, then row 1. Used in C, C++, Python."
          },
          {
            formula: "Column Major Order: arr[row][col] → columns stored sequentially (Fortran, MATLAB)",
            description: "2D arrays stored column by column in memory",
            explanation: "arr[0][0], arr[1][0], arr[2][0], then arr[0][1], arr[1][1]... All elements of column 0 come first. Used in Fortran and MATLAB."
          },
          {
            formula: "Insert/Delete in Array = O(n) — must shift all subsequent elements",
            description: "Inserting at index 0 requires shifting every element right",
            explanation: "To insert at position 0: move arr[0]→arr[1], arr[1]→arr[2], etc. Then place new value at arr[0]. This takes n steps for n elements."
          }
        ]
      },
      {
        title: "Time Complexity — Big O Notation",
        content: "Time complexity measures how an algorithm's runtime grows as input size increases. We use Big O notation to describe the worst-case growth rate, ignoring constant factors and lower-order terms.",
        formulas: [
          {
            formula: "O(1) — Constant Time: Array access, hash table lookup",
            description: "Runtime doesn't change with input size",
            explanation: "arr[5] takes the same time whether the array has 10 elements or 10 million. The memory address calculation is always one step."
          },
          {
            formula: "O(n) — Linear Time: Traversing an array, linear search",
            description: "Runtime grows proportionally with input size",
            explanation: "If you need to check every element once, doubling the input doubles the time. Example: finding a name in an unsorted list."
          },
          {
            formula: "O(log n) — Logarithmic Time: Binary search on sorted data",
            description: "Each step halves the remaining work",
            explanation: "Binary search: check middle, discard half, repeat. For 1 million elements, only ~20 steps needed. Extremely efficient."
          },
          {
            formula: "O(n²) — Quadratic Time: Nested loops, bubble sort, selection sort",
            description: "Runtime grows with the square of input size",
            explanation: "For each element, you compare with every other element. 100 elements = 10,000 operations. 1000 elements = 1,000,000 operations. Scales poorly."
          },
          {
            formula: "O(n log n) — Linearithmic: Merge sort, quick sort (average)",
            description: "Divide-and-conquer algorithms achieve this sweet spot",
            explanation: "Split the problem in half (log n levels), do linear work at each level (n). Much better than O(n²) for large inputs."
          }
        ]
      },
      {
        title: "Space Complexity",
        content: "Space complexity measures the total memory an algorithm uses, including input data and auxiliary (extra) space. Some algorithms trade more memory for faster execution.",
        formulas: [
          {
            formula: "O(1) Space: Bubble Sort, Selection Sort, Insertion Sort — in-place",
            description: "These sorts rearrange elements without extra memory",
            explanation: "They swap elements within the original array. No additional arrays or data structures needed. Memory usage stays constant regardless of input size."
          },
          {
            formula: "O(n) Space: Merge Sort — needs temporary array for merging",
            description: "Merge sort creates new arrays during the merge step",
            explanation: "When merging two sorted halves, you need a temporary array to hold the combined result. This extra space is proportional to the input size."
          },
          {
            formula: "O(log n) Space: Quick Sort — recursion stack depth",
            description: "Quick sort uses stack frames for recursive calls",
            explanation: "Each recursive call adds a frame to the call stack. With good pivot choices, the stack depth is log n. Worst case (bad pivots) can reach O(n)."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What are the two components of a data structure?",
        options: [
          "Data and algorithms",
          "Organized data and allowed operations",
          "Memory and CPU",
          "Input and output"
        ],
        correctIndex: 1,
        explanation: "A data structure consists of how data is organized AND what operations are allowed on it."
      },
      {
        question: "What is the time complexity of accessing an array element by index?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correctIndex: 2,
        explanation: "Array access by index is O(1) — the computer calculates the memory address directly using a formula."
      },
      {
        question: "Which notation describes the worst-case time complexity?",
        options: ["Omega (Ω)", "Theta (Θ)", "Big O (O)", "Delta (Δ)"],
        correctIndex: 2,
        explanation: "Big O describes the upper bound (worst case). Omega is best case. Theta is tight bound (average case)."
      },
      {
        question: "Why is insertion in an array O(n)?",
        options: [
          "Arrays are slow",
          "Elements after the insertion point must be shifted",
          "Memory allocation takes time",
          "The array needs to be sorted first"
        ],
        correctIndex: 1,
        explanation: "To insert at position i, all elements from i onwards must shift one position right, taking O(n) time."
      },
      {
        question: "Which sorting algorithm uses O(n) extra space?",
        options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        correctIndex: 2,
        explanation: "Merge sort needs a temporary array for the merge step, using O(n) extra space. The others sort in-place with O(1) space."
      },
      {
        question: "What does O(n log n) complexity mean?",
        options: [
          "The algorithm is very slow",
          "It divides the problem (log n) and does linear work at each level (n)",
          "It uses nested loops",
          "It runs in constant time"
        ],
        correctIndex: 1,
        explanation: "O(n log n) means the algorithm splits the problem log n times and does O(n) work at each level — typical of divide-and-conquer sorts."
      }
    ],
    sampleData: {
      "Time Complexity Comparison": [
        ["Input Size (n)", "O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"],
        ["10", "1", "3", "10", "33", "100"],
        ["100", "1", "7", "100", "664", "10,000"],
        ["1,000", "1", "10", "1,000", "9,966", "1,000,000"],
        ["10,000", "1", "13", "10,000", "132,877", "100,000,000"],
        ["1,000,000", "1", "20", "1,000,000", "19,931,569", "1,000,000,000,000"],
      ]
    }
  },
  {
    id: "linear-data-structures",
    title: "Linear Data Structures",
    icon: "Layers",
    description: "Stacks (LIFO), Queues (FIFO), and Linked Lists — the building blocks of sequential data processing.",
    lessons: [
      {
        title: "Stacks — Last In, First Out (LIFO)",
        content: "A stack is a linear data structure where insertions and deletions happen only at one end called the 'Top'. Think of a stack of plates — you add and remove from the top only.",
        formulas: [
          {
            formula: "push(x) — Add element x to the top of the stack",
            description: "Insertion operation, O(1) time",
            explanation: "The new element becomes the top. All previous elements stay below it. Like placing a new plate on top of a stack."
          },
          {
            formula: "pop() — Remove and return the top element",
            description: "Deletion operation, O(1) time",
            explanation: "Removes the most recently added element. If the stack is empty, this causes an 'underflow' error."
          },
          {
            formula: "peek()/top() — View the top element without removing it",
            description: "Read-only access to the top, O(1) time",
            explanation: "Returns the value at the top without changing the stack. Useful for checking what's next without committing to removal."
          },
          {
            formula: "Applications: Undo/Redo, Browser back/forward, Recursion, Expression evaluation",
            description: "Stacks are everywhere in computing",
            explanation: "Undo: each action is pushed; undo pops the last action. Recursion: each function call is pushed onto the call stack. Browser: each page visit is pushed; back button pops."
          }
        ]
      },
      {
        title: "Queues — First In, First Out (FIFO)",
        content: "A queue is a linear structure where additions happen at the Rear and removals happen at the Front. Like a line at a store — first person in line gets served first.",
        formulas: [
          {
            formula: "enqueue(x) — Add element x at the rear of the queue",
            description: "Insertion at the back, O(1) time",
            explanation: "The new element joins the end of the line. Everyone already in the queue stays ahead of it."
          },
          {
            formula: "dequeue() — Remove and return the front element",
            description: "Deletion from the front, O(1) time",
            explanation: "Removes the element that has been waiting the longest. If the queue is empty, this causes an 'underflow' error."
          },
          {
            formula: "isEmpty() / isFull() — Check queue state",
            description: "Utility operations to prevent errors",
            explanation: "isEmpty(): returns true if no elements (front == rear). isFull(): relevant for array-based queues with fixed size."
          },
          {
            formula: "Applications: Print spooling, CPU scheduling, BFS, Message queues",
            description: "Queues manage ordered processing",
            explanation: "Print queue: documents print in order received. CPU scheduling: processes wait in queue. BFS: neighbors are enqueued level by level."
          }
        ]
      },
      {
        title: "Linked Lists — Dynamic Sequential Storage",
        content: "A linked list is a chain of nodes where each node contains data and a pointer to the next node. Unlike arrays, linked lists don't require contiguous memory, making insertions and deletions fast.",
        formulas: [
          {
            formula: "Node = { data, next → } — Each node holds value + pointer to next",
            description: "The basic building block of a linked list",
            explanation: "data: the actual value stored. next: a reference (pointer) to the next node in the chain. The last node's next points to NULL."
          },
          {
            formula: "Singly Linked List: Each node → next node only (one direction)",
            description: "Simplest form — forward traversal only",
            explanation: "You can only move forward through the list. To find the 5th element, you must traverse from the head through elements 1-4."
          },
          {
            formula: "Doubly Linked List: Each node ↔ prev and next (both directions)",
            description: "Two pointers per node enable backward traversal",
            explanation: "Each node has a 'prev' pointer in addition to 'next'. You can traverse forward and backward. Uses more memory (extra pointer per node) but more flexible."
          },
          {
            formula: "Circular Linked List: Last node → first node (no NULL)",
            description: "The chain forms a complete loop",
            explanation: "The last node's next points back to the head instead of NULL. Useful for round-robin scheduling, music playlists, and game turn systems."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does LIFO stand for?",
        options: [
          "Last In First Out",
          "Linear Integrated Function Object",
          "List In File Out",
          "Linked Index For Operations"
        ],
        correctIndex: 0,
        explanation: "LIFO = Last In First Out. The last element added is the first one removed — like a stack of plates."
      },
      {
        question: "In a queue, where does enqueue happen?",
        options: ["At the front", "At the rear", "In the middle", "Anywhere"],
        correctIndex: 1,
        explanation: "enqueue() adds elements at the rear (back) of the queue. dequeue() removes from the front."
      },
      {
        question: "What is the advantage of a doubly linked list over a singly linked list?",
        options: [
          "It uses less memory",
          "It allows traversal in both directions",
          "It is faster to search",
          "It doesn't need a head pointer"
        ],
        correctIndex: 1,
        explanation: "Doubly linked lists have both 'prev' and 'next' pointers, enabling forward and backward traversal."
      },
      {
        question: "Which data structure is used for implementing recursion?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctIndex: 1,
        explanation: "The call stack stores function calls during recursion. Each recursive call is pushed; each return pops."
      },
      {
        question: "What does the last node in a singly linked list point to?",
        options: ["The first node", "The previous node", "NULL", "Itself"],
        correctIndex: 2,
        explanation: "In a singly linked list, the last node's 'next' pointer is NULL, marking the end of the list."
      },
      {
        question: "Which linked list type is ideal for a music playlist on repeat?",
        options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Array"],
        correctIndex: 2,
        explanation: "Circular linked lists loop back to the start, perfect for playlists that repeat from the beginning after the last song."
      }
    ],
    sampleData: {
      "Stack Operations — Expression Evaluation": [
        ["Operation", "Stack Content (Top →)", "Action"],
        ["push(3)", "[3]", "Push 3 onto empty stack"],
        ["push(5)", "[5, 3]", "Push 5 on top"],
        ["push(2)", "[2, 5, 3]", "Push 2 on top"],
        ["pop()", "[5, 3]", "Remove 2 (top)"],
        ["peek()", "[5, 3]", "View 5 without removing"],
        ["pop()", "[3]", "Remove 5"],
      ],
      "Queue Operations — Print Spooler": [
        ["Operation", "Queue (Front → Rear)", "Action"],
        ["enqueue('Doc A')", "[Doc A]", "First document joins"],
        ["enqueue('Doc B')", "[Doc A, Doc B]", "Second document joins"],
        ["enqueue('Doc C')", "[Doc A, Doc B, Doc C]", "Third document joins"],
        ["dequeue()", "[Doc B, Doc C]", "Doc A printed (removed from front)"],
        ["dequeue()", "[Doc C]", "Doc B printed"],
      ]
    }
  },
  {
    id: "searching-sorting",
    title: "Searching & Sorting Algorithms",
    icon: "ArrowUpDown",
    description: "Linear vs Binary search. Bubble, Selection, Insertion, Merge, and Quick sort — with complexity analysis.",
    lessons: [
      {
        title: "Searching — Linear vs Binary",
        content: "Searching finds a target value in a collection. Linear search checks every element one by one. Binary search works only on sorted data but is dramatically faster — it halves the search space with each step.",
        formulas: [
          {
            formula: "Linear Search: Check each element → O(n) time",
            description: "Simple but slow — works on any data (sorted or unsorted)",
            explanation: "Start at index 0, compare with target. If not found, move to index 1. Repeat until found or end of array. For 1 million elements, worst case = 1 million comparisons."
          },
          {
            formula: "Binary Search: Check middle → halve → repeat → O(log n) time",
            description: "Fast but requires sorted data",
            explanation: "Compare target with middle element. If target < middle, search left half. If target > middle, search right half. Repeat. For 1 million elements, only ~20 comparisons needed."
          },
          {
            formula: "Binary Search: mid = (low + high) / 2",
            description: "Calculate the middle index at each step",
            explanation: "low starts at 0, high at n-1. After each comparison, update low or high to narrow the range. Stop when low > high (not found) or arr[mid] == target (found)."
          }
        ]
      },
      {
        title: "Bubble Sort",
        content: "Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they're in the wrong order. Larger elements 'bubble up' to the end with each pass.",
        formulas: [
          {
            formula: "Compare arr[i] and arr[i+1] → Swap if arr[i] > arr[i+1]",
            description: "The core operation — compare and swap adjacent pairs",
            explanation: "Pass 1: compare (0,1), (1,2), (2,3)... The largest element reaches the end. Pass 2: repeat but skip the last (already sorted) element. Continue until no swaps needed."
          },
          {
            formula: "Time: O(n²) worst/average, O(n) best (already sorted). Space: O(1)",
            description: "Quadratic time, constant space — simple but inefficient",
            explanation: "Two nested loops: outer runs n times, inner runs n-i times. Total comparisons ≈ n²/2. Best case O(n) if you add a 'swapped' flag and the array is already sorted."
          }
        ]
      },
      {
        title: "Selection Sort",
        content: "Selection sort finds the minimum element in the unsorted portion and swaps it with the first unsorted element. It builds the sorted array from left to right, one element at a time.",
        formulas: [
          {
            formula: "Find min in unsorted portion → Swap with first unsorted position",
            description: "Select the smallest, place it correctly, repeat",
            explanation: "Pass 1: find minimum in entire array, swap with index 0. Pass 2: find minimum in indices 1..n-1, swap with index 1. Continue until sorted."
          },
          {
            formula: "Time: O(n²) always. Space: O(1). Swaps: exactly n-1",
            description: "Always quadratic — even if already sorted",
            explanation: "Unlike bubble sort, selection sort always scans the entire unsorted portion regardless of order. It makes exactly n-1 swaps (minimum possible), which can be an advantage when writes are expensive."
          }
        ]
      },
      {
        title: "Insertion Sort",
        content: "Insertion sort builds the sorted array one element at a time. It takes each element (the 'key') and inserts it into the correct position among the already-sorted elements to its left.",
        formulas: [
          {
            formula: "Pick key = arr[i] → Shift larger elements right → Insert key in correct spot",
            description: "Like sorting playing cards in your hand",
            explanation: "Start with arr[0] as 'sorted'. Take arr[1], compare with arr[0], insert in correct position. Take arr[2], compare with sorted portion, insert correctly. Continue for all elements."
          },
          {
            formula: "Time: O(n²) worst, O(n) best (already sorted). Space: O(1)",
            description: "Efficient for small or nearly-sorted arrays",
            explanation: "Best case O(n): if already sorted, each element is already in place — just one comparison per element. Works well for small arrays (n < 20) or nearly-sorted data."
          }
        ]
      },
      {
        title: "Merge Sort — Divide and Conquer",
        content: "Merge sort divides the array in half, recursively sorts each half, then merges the two sorted halves back together. It guarantees O(n log n) performance regardless of input order.",
        formulas: [
          {
            formula: "Divide → Sort left half → Sort right half → Merge",
            description: "Split until single elements, then merge back in order",
            explanation: "Base case: array of 1 element is already sorted. Merge step: compare the front of each sorted half, take the smaller, repeat. The merge produces a sorted combined array."
          },
          {
            formula: "Time: O(n log n) always. Space: O(n) for temporary arrays",
            description: "Consistent performance, but needs extra memory",
            explanation: "log n levels of recursion (halving each time). At each level, merging takes O(n) total work. The trade-off: needs O(n) extra space for the temporary merge arrays."
          }
        ]
      },
      {
        title: "Quick Sort — Partition and Recurse",
        content: "Quick sort picks a 'pivot' element, partitions the array so smaller elements go left and larger go right, then recursively sorts the two halves. It's the most widely used sorting algorithm in practice.",
        formulas: [
          {
            formula: "Pick pivot → Partition: [smaller] pivot [larger] → Recurse on both sides",
            description: "The pivot ends up in its final sorted position after partitioning",
            explanation: "After partition, the pivot is exactly where it belongs in the final sorted array. Elements left of pivot are all smaller; elements right are all larger. Recursively apply to each side."
          },
          {
            formula: "Time: Avg O(n log n), Worst O(n²) (sorted array + bad pivot). Space: O(log n)",
            description: "Fast in practice, but worst case is quadratic",
            explanation: "Average case: good pivot choices give balanced partitions → O(n log n). Worst case: already sorted + first element as pivot → O(n²). Random pivot or median-of-three avoids worst case."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Binary search requires the array to be:",
        options: ["Unsorted", "Sorted", "Of even length", "Stored in a linked list"],
        correctIndex: 1,
        explanation: "Binary search relies on the sorted order to eliminate half the search space at each step."
      },
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correctIndex: 2,
        explanation: "Binary search halves the search space each step, giving O(log n) time complexity."
      },
      {
        question: "Which sorting algorithm has the best worst-case time complexity?",
        options: ["Bubble Sort O(n²)", "Selection Sort O(n²)", "Merge Sort O(n log n)", "Insertion Sort O(n²)"],
        correctIndex: 2,
        explanation: "Merge sort guarantees O(n log n) in all cases. The others have O(n²) worst case."
      },
      {
        question: "How does Bubble Sort work?",
        options: [
          "Finds minimum and swaps",
          "Inserts elements one by one",
          "Compares and swaps adjacent elements repeatedly",
          "Divides array in half"
        ],
        correctIndex: 2,
        explanation: "Bubble sort compares adjacent pairs and swaps them if out of order, causing larger elements to 'bubble' to the end."
      },
      {
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctIndex: 2,
        explanation: "Merge sort needs O(n) extra space for temporary arrays during the merge step."
      },
      {
        question: "When is Insertion Sort most efficient?",
        options: [
          "For large random arrays",
          "For small or nearly-sorted arrays",
          "For reverse-sorted arrays",
          "It's never efficient"
        ],
        correctIndex: 1,
        explanation: "Insertion sort runs in O(n) time for already-sorted data and is efficient for small arrays (n < 20)."
      },
      {
        question: "What makes Quick Sort fast in practice?",
        options: [
          "It always picks the perfect pivot",
          "It has O(n log n) worst case",
          "Good average-case performance with low constant factors and in-place partitioning",
          "It uses extra memory for speed"
        ],
        correctIndex: 2,
        explanation: "Quick sort is fast because it sorts in-place (low memory), has good cache performance, and average O(n log n) with small constants."
      }
    ],
    sampleData: {
      "Sorting Algorithm Comparison": [
        ["Algorithm", "Best Time", "Avg Time", "Worst Time", "Space", "Stable?"],
        ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes"],
        ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)", "No"],
        ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes"],
        ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "Yes"],
        ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "No"],
      ],
      "Binary Search Example — Finding 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]": [
        ["Step", "Low", "High", "Mid", "arr[mid]", "Action"],
        ["1", "0", "9", "4", "16", "23 > 16 → search right (low = 5)"],
        ["2", "5", "9", "7", "56", "23 < 56 → search left (high = 6)"],
        ["3", "5", "6", "5", "23", "Found! Index 5"],
      ]
    }
  },
  {
    id: "trees",
    title: "Non-Linear Data Structures (Trees)",
    icon: "TreePine",
    description: "Binary trees, BSTs, and tree traversals — hierarchical data structures for efficient searching and organizing.",
    lessons: [
      {
        title: "Tree Terminology",
        content: "A tree is a hierarchical data structure with parent-child relationships. Unlike linear structures (arrays, lists), trees branch out, enabling efficient searching, sorting, and organization.",
        formulas: [
          {
            formula: "Root: The topmost node — has no parent",
            description: "Every tree has exactly one root",
            explanation: "The root is the starting point for all tree operations. All other nodes are descendants of the root."
          },
          {
            formula: "Leaf: A node with no children (terminal node)",
            description: "Leaves are the endpoints of the tree",
            explanation: "Leaf nodes have no children. In a binary tree, a leaf has both left and right pointers as NULL."
          },
          {
            formula: "Degree: Number of children a node has",
            description: "Measures how many branches come from a node",
            explanation: "A node with 2 children has degree 2. A leaf has degree 0. The degree of the tree is the maximum degree of any node."
          },
          {
            formula: "Height: Longest path from root to a leaf (number of edges)",
            description: "Measures the depth of the tree",
            explanation: "A single node has height 0. A root with two leaf children has height 1. Height determines the worst-case search time."
          },
          {
            formula: "Subtree: A node and all its descendants form a subtree",
            description: "Every node is the root of its own subtree",
            explanation: "Trees are recursive structures. The left child of the root is itself the root of a left subtree. This property enables recursive algorithms."
          }
        ]
      },
      {
        title: "Binary Trees",
        content: "A binary tree is a tree where each node has at most 2 children — a left child and a right child. This constraint enables efficient algorithms for searching, insertion, and traversal.",
        formulas: [
          {
            formula: "Each node: { data, left →, right → } — max 2 children",
            description: "The binary tree node structure",
            explanation: "left: pointer to the left child (or NULL). right: pointer to the right child (or NULL). A node can have 0, 1, or 2 children."
          },
          {
            formula: "Max nodes at level l = 2ˡ (level 0 = root = 1 node)",
            description: "Binary trees double in capacity at each level",
            explanation: "Level 0: 1 node. Level 1: 2 nodes. Level 2: 4 nodes. Level 3: 8 nodes. A complete binary tree of height h has 2^(h+1) - 1 total nodes."
          },
          {
            formula: "Full Binary Tree: Every node has 0 or 2 children",
            description: "No node has exactly 1 child",
            explanation: "Also called a proper binary tree. Every internal node has exactly 2 children. Leaves have 0 children."
          }
        ]
      },
      {
        title: "Binary Search Trees (BST)",
        content: "A BST is a binary tree with an ordering property: for every node, all values in its left subtree are less than the node, and all values in its right subtree are greater than or equal to the node.",
        formulas: [
          {
            formula: "Left child < Root ≤ Right child — the BST property",
            description: "This ordering enables efficient O(log n) search",
            explanation: "To search for a value: compare with root. If smaller, go left. If larger, go right. Repeat until found or reach NULL. Each comparison eliminates half the remaining tree."
          },
          {
            formula: "Inorder traversal of BST → Sorted order (ascending)",
            description: "Left → Root → Right visits nodes in sorted order",
            explanation: "This is a key property of BSTs. Visiting left subtree first (all smaller), then root, then right subtree (all larger) produces elements in ascending order."
          },
          {
            formula: "BST Search: O(log n) balanced, O(n) skewed (degenerate)",
            description: "Performance depends on tree balance",
            explanation: "A balanced BST has height ≈ log n → fast searches. A skewed BST (all nodes on one side, like a linked list) has height n → slow searches. Self-balancing trees (AVL, Red-Black) maintain balance automatically."
          }
        ]
      },
      {
        title: "Tree Traversals",
        content: "Tree traversal means visiting every node in a systematic order. There are two main approaches: Depth-First (go deep before going wide) and Breadth-First (go level by level).",
        formulas: [
          {
            formula: "Preorder: Root → Left → Right",
            description: "Visit root first, then subtrees",
            explanation: "Use case: creating a copy of the tree, or getting prefix expression of an expression tree. The root is always visited before its children."
          },
          {
            formula: "Inorder: Left → Root → Right",
            description: "Visit left subtree, then root, then right",
            explanation: "Use case: BST inorder gives sorted output. Also used for infix expression from expression trees."
          },
          {
            formula: "Postorder: Left → Right → Root",
            description: "Visit children first, then root",
            explanation: "Use case: deleting a tree (delete children before parent), or getting postfix expression. The root is always visited last."
          },
          {
            formula: "Level Order (BFS): Visit nodes level by level, left to right",
            description: "Breadth-first traversal using a queue",
            explanation: "Use case: finding shortest path in unweighted tree, printing tree level by level. Uses a queue: enqueue root, then repeatedly dequeue and enqueue children."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the maximum number of children a binary tree node can have?",
        options: ["1", "2", "3", "Unlimited"],
        correctIndex: 1,
        explanation: "By definition, each node in a binary tree has at most 2 children — left and right."
      },
      {
        question: "In a BST, where are values smaller than the root stored?",
        options: ["Right subtree", "Left subtree", "Both subtrees", "At the root"],
        correctIndex: 1,
        explanation: "BST property: all values in the left subtree are less than the root, all values in the right subtree are greater than or equal."
      },
      {
        question: "Which traversal of a BST produces sorted output?",
        options: ["Preorder", "Postorder", "Inorder", "Level Order"],
        correctIndex: 2,
        explanation: "Inorder traversal (Left → Root → Right) of a BST visits nodes in ascending sorted order."
      },
      {
        question: "What is the worst-case search time in a BST?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctIndex: 2,
        explanation: "In a skewed BST (essentially a linked list), search takes O(n) time. A balanced BST gives O(log n)."
      },
      {
        question: "Which traversal is used to delete a tree?",
        options: ["Preorder", "Inorder", "Postorder", "Level Order"],
        correctIndex: 2,
        explanation: "Postorder visits children before the parent, so you can safely delete child nodes before deleting their parent."
      },
      {
        question: "Level Order traversal uses which data structure?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        correctIndex: 1,
        explanation: "Level Order (BFS) uses a queue to process nodes level by level — enqueue root, then dequeue and enqueue children."
      }
    ],
    sampleData: {
      "BST Insertion — Inserting [50, 30, 70, 20, 40, 60, 80]": [
        ["Step", "Insert", "Comparison Path", "Position"],
        ["1", "50", "Root (empty tree)", "Root"],
        ["2", "30", "30 < 50 → go left", "Left of 50"],
        ["3", "70", "70 > 50 → go right", "Right of 50"],
        ["4", "20", "20 < 50 → left, 20 < 30 → left", "Left of 30"],
        ["5", "40", "40 < 50 → left, 40 > 30 → right", "Right of 30"],
        ["6", "60", "60 > 50 → right, 60 < 70 → left", "Left of 70"],
        ["7", "80", "80 > 50 → right, 80 > 70 → right", "Right of 70"],
      ],
      "Traversal Results for BST [50, 30, 70, 20, 40, 60, 80]": [
        ["Traversal", "Order", "Use Case"],
        ["Preorder", "50, 30, 20, 40, 70, 60, 80", "Tree copy, prefix expression"],
        ["Inorder", "20, 30, 40, 50, 60, 70, 80", "Sorted output ✓"],
        ["Postorder", "20, 40, 30, 60, 80, 70, 50", "Tree deletion, postfix"],
        ["Level Order", "50, 30, 70, 20, 40, 60, 80", "Level-by-level processing"],
      ]
    }
  },
  {
    id: "graphs-traversals",
    title: "Graphs & Traversals",
    icon: "Network",
    description: "Vertices, edges, directed vs undirected graphs. DFS and BFS — the two fundamental graph traversal algorithms.",
    lessons: [
      {
        title: "Graph Fundamentals",
        content: "A graph is a collection of vertices (nodes) connected by edges (links). Graphs model relationships — social networks, road maps, web pages, and more.",
        formulas: [
          {
            formula: "Graph G = (V, E) — set of Vertices and set of Edges",
            description: "The mathematical definition of a graph",
            explanation: "V = {A, B, C, D} are the vertices (nodes). E = {(A,B), (B,C), (C,D)} are the edges (connections). A graph can have any number of vertices and edges."
          },
          {
            formula: "Undirected Graph: Edge (A,B) = Edge (B,A) — no direction",
            description: "Connections work both ways",
            explanation: "Like a friendship on Facebook — if A is friends with B, B is friends with A. Edges have no arrows."
          },
          {
            formula: "Directed Graph (Digraph): Edge A→B ≠ Edge B→A — one-way",
            description: "Connections have direction",
            explanation: "Like following on Twitter — A can follow B without B following A. Edges are arrows pointing from source to destination."
          },
          {
            formula: "Weighted Graph: Each edge has a numeric weight (cost, distance, time)",
            description: "Edges carry additional information",
            explanation: "Road map: vertices = cities, edges = roads, weights = distances. Social network: vertices = people, edges = relationships, weights = strength of connection."
          }
        ]
      },
      {
        title: "Graph Representations",
        content: "There are two main ways to represent a graph in code: Adjacency Matrix (2D array) and Adjacency List (array of lists). Each has trade-offs in space and operation speed.",
        formulas: [
          {
            formula: "Adjacency Matrix: matrix[i][j] = 1 if edge exists, 0 otherwise",
            description: "2D array where rows and columns are vertices",
            explanation: "Space: O(V²). Check if edge exists: O(1). Find all neighbors of a vertex: O(V). Best for dense graphs (many edges)."
          },
          {
            formula: "Adjacency List: array[vertex] → list of neighbors",
            description: "Each vertex maps to a list of its connected vertices",
            explanation: "Space: O(V + E). Check if edge exists: O(degree). Find all neighbors: O(degree). Best for sparse graphs (few edges). More space-efficient in practice."
          }
        ]
      },
      {
        title: "Depth First Search (DFS)",
        content: "DFS explores as far as possible along each branch before backtracking. It goes deep into the graph, visiting unvisited neighbors recursively, and backtracks when it hits a dead end.",
        formulas: [
          {
            formula: "DFS: Visit → Mark visited → Recurse on unvisited neighbors",
            description: "Go deep, backtrack when stuck",
            explanation: "Start at a vertex. Mark it visited. For each unvisited neighbor, recursively call DFS. When all neighbors are visited, backtrack to the previous vertex."
          },
          {
            formula: "Implementation: Uses a Stack (or recursion call stack)",
            description: "The call stack naturally handles the depth-first behavior",
            explanation: "Each recursive call pushes a new frame onto the stack. When a vertex has no unvisited neighbors, the function returns (pops), backtracking to the previous vertex."
          },
          {
            formula: "Time: O(V + E). Space: O(V) for visited array + recursion stack",
            description: "Visits every vertex and edge once",
            explanation: "Each vertex is visited once (marked). Each edge is examined once (from each endpoint). Total work proportional to vertices plus edges."
          },
          {
            formula: "Applications: Cycle detection, maze solving, topological sort, connected components",
            description: "DFS is the foundation for many graph algorithms",
            explanation: "Cycle detection: if you reach an already-visited vertex (not the parent), there's a cycle. Maze solving: DFS explores all paths until it finds the exit."
          }
        ]
      },
      {
        title: "Breadth First Search (BFS)",
        content: "BFS explores all neighbors at the current depth before moving to the next level. It visits vertices level by level, like ripples spreading outward from a stone dropped in water.",
        formulas: [
          {
            formula: "BFS: Visit → Enqueue neighbors → Dequeue → Repeat",
            description: "Process level by level using a queue",
            explanation: "Start at a vertex. Mark it visited. Enqueue it. While queue is not empty: dequeue a vertex, visit all its unvisited neighbors, mark them visited, enqueue them."
          },
          {
            formula: "Implementation: Uses a Queue (FIFO)",
            description: "Queue ensures level-by-level processing",
            explanation: "The queue naturally processes vertices in the order they were discovered. All vertices at distance 1 are processed before any at distance 2, and so on."
          },
          {
            formula: "Time: O(V + E). Space: O(V) for visited array + queue",
            description: "Same time complexity as DFS, different exploration order",
            explanation: "Every vertex and edge is processed once. The queue can hold at most V vertices. BFS and DFS have the same time complexity but very different behavior."
          },
          {
            formula: "Applications: Shortest path in unweighted graphs, peer-to-peer networks, web crawling",
            description: "BFS finds the shortest path by level order",
            explanation: "Since BFS visits level by level, the first time it reaches a target vertex, it has found the shortest path (fewest edges). This is why BFS is used for shortest path in unweighted graphs."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does G = (V, E) represent?",
        options: [
          "Graph with Values and Elements",
          "Graph with Vertices and Edges",
          "Grid with Vectors and Edges",
          "Graph with Variables and Equations"
        ],
        correctIndex: 1,
        explanation: "A graph G is defined as a set of vertices V and a set of edges E connecting them."
      },
      {
        question: "Which graph representation is more space-efficient for sparse graphs?",
        options: [
          "Adjacency Matrix",
          "Adjacency List",
          "Both are equal",
          "Neither works for sparse graphs"
        ],
        correctIndex: 1,
        explanation: "Adjacency List uses O(V + E) space, which is much less than O(V²) for the matrix when edges are few."
      },
      {
        question: "DFS uses which data structure?",
        options: ["Queue", "Stack", "Array", "Hash Table"],
        correctIndex: 1,
        explanation: "DFS uses a stack (or the recursion call stack) to go deep and backtrack."
      },
      {
        question: "BFS finds the shortest path in which type of graph?",
        options: [
          "Weighted graphs",
          "Unweighted graphs",
          "Only directed graphs",
          "Only complete graphs"
        ],
        correctIndex: 1,
        explanation: "BFS finds the shortest path (fewest edges) in unweighted graphs because it explores level by level."
      },
      {
        question: "What is the time complexity of both DFS and BFS?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
        correctIndex: 2,
        explanation: "Both visit every vertex once and examine every edge once, giving O(V + E) time."
      },
      {
        question: "In a directed graph, edge A→B means:",
        options: [
          "A and B are connected both ways",
          "There is a one-way connection from A to B",
          "A and B are the same vertex",
          "There is no connection"
        ],
        correctIndex: 1,
        explanation: "In a directed graph, A→B means you can go from A to B but not necessarily from B to A."
      }
    ],
    sampleData: {
      "DFS vs BFS Traversal Order": [
        ["Algorithm", "Starting Vertex", "Traversal Order", "Data Structure"],
        ["DFS", "A", "A → B → D → E → C → F", "Stack"],
        ["BFS", "A", "A → B → C → D → E → F", "Queue"],
      ],
      "Adjacency List Example": [
        ["Vertex", "Neighbors", "Degree"],
        ["A", "B, C", "2"],
        ["B", "A, D, E", "3"],
        ["C", "A, F", "2"],
        ["D", "B", "1"],
        ["E", "B, F", "2"],
        ["F", "C, E", "2"],
      ]
    }
  },
  {
    id: "advanced-graphs",
    title: "Advanced Graph Algorithms",
    icon: "GitBranch",
    description: "Minimum Spanning Trees (Kruskal's & Prim's) and Dijkstra's shortest path algorithm.",
    lessons: [
      {
        title: "Minimum Spanning Trees (MST)",
        content: "An MST is a subgraph that connects all vertices with the minimum possible total edge weight, without any cycles. It's like finding the cheapest way to connect all cities with roads.",
        formulas: [
          {
            formula: "MST: Connects all V vertices with exactly V-1 edges, minimum total weight, no cycles",
            description: "The spanning tree with the lowest cost",
            explanation: "A spanning tree visits every vertex using exactly V-1 edges (minimum needed to connect V vertices). The MST is the one with the smallest sum of edge weights."
          },
          {
            formula: "Real Example: Connecting 5 cities with minimum road cost",
            description: "MST solves real-world optimization problems",
            explanation: "Given costs to build roads between every pair of cities, MST finds which roads to build so all cities are connected at minimum total cost."
          }
        ]
      },
      {
        title: "Kruskal's Algorithm",
        content: "Kruskal's algorithm builds the MST by sorting all edges by weight and adding them one by one, skipping any edge that would create a cycle. It uses a greedy approach.",
        formulas: [
          {
            formula: "Sort all edges by weight → Add smallest edge if no cycle → Repeat until V-1 edges",
            description: "Greedy: always pick the cheapest available edge",
            explanation: "Step 1: Sort all edges from smallest to largest weight. Step 2: Take the smallest edge. Step 3: If adding it doesn't create a cycle, include it in MST. Step 4: Repeat until you have V-1 edges."
          },
          {
            formula: "Cycle detection: Use Union-Find (Disjoint Set) data structure",
            description: "Union-Find efficiently checks if two vertices are already connected",
            explanation: "Before adding an edge (u, v), check if u and v are in the same set. If yes, adding would create a cycle — skip it. If no, union their sets and add the edge."
          },
          {
            formula: "Time: O(E log E) or O(E log V) — dominated by sorting edges",
            description: "Sorting edges is the bottleneck",
            explanation: "Sorting takes O(E log E). Union-Find operations are nearly O(1) each. Since E ≤ V², log E ≤ 2 log V, so O(E log E) = O(E log V)."
          }
        ]
      },
      {
        title: "Prim's Algorithm",
        content: "Prim's algorithm grows the MST from a starting vertex. At each step, it adds the minimum-weight edge that connects a visited vertex to an unvisited vertex.",
        formulas: [
          {
            formula: "Start at arbitrary vertex → Add min-weight edge to unvisited vertex → Repeat",
            description: "Grow the MST one vertex at a time",
            explanation: "Step 1: Pick any starting vertex, mark it visited. Step 2: Find the cheapest edge connecting a visited vertex to an unvisited one. Step 3: Add that edge and mark the new vertex visited. Repeat until all vertices are visited."
          },
          {
            formula: "Implementation: Priority Queue (Min-Heap) for efficient edge selection",
            description: "A min-heap quickly finds the cheapest connecting edge",
            explanation: "Store all edges from visited to unvisited vertices in a min-heap. Extract the minimum (cheapest edge). Add its unvisited endpoint. Add new edges from that endpoint to the heap."
          },
          {
            formula: "Time: O((V + E) log V) with binary heap",
            description: "Each vertex and edge is processed with heap operations",
            explanation: "Each vertex is extracted from the heap once: O(V log V). Each edge may trigger a heap update: O(E log V). Total: O((V + E) log V)."
          }
        ]
      },
      {
        title: "Dijkstra's Shortest Path Algorithm",
        content: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It's the algorithm behind GPS navigation.",
        formulas: [
          {
            formula: "Initialize: source distance = 0, all others = ∞",
            description: "Start with unknown distances (infinity) except the source",
            explanation: "The source vertex has distance 0 (distance to itself). All other vertices start at infinity (unknown). As the algorithm progresses, these distances get updated to shorter values."
          },
          {
            formula: "Relaxation: if dist[u] + weight(u,v) < dist[v], update dist[v]",
            description: "If going through u gives a shorter path to v, update v's distance",
            explanation: "For each neighbor v of the current vertex u: calculate the path length through u. If this is shorter than v's current known distance, update v's distance and record u as v's predecessor."
          },
          {
            formula: "Greedy: Always pick the unvisited vertex with the smallest known distance",
            description: "Process vertices in order of increasing distance from source",
            explanation: "At each step, select the unvisited vertex with the minimum distance. This vertex's distance is now final (shortest path confirmed). Update all its neighbors. Repeat until all vertices are visited."
          },
          {
            formula: "Time: O((V + E) log V) with priority queue. Space: O(V)",
            description: "Efficient for sparse and dense graphs",
            explanation: "Using a min-heap, extracting the minimum-distance vertex takes O(log V). Each edge may trigger a decrease-key operation: O(log V). Total: O((V + E) log V)."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is a Minimum Spanning Tree?",
        options: [
          "The shortest path between two vertices",
          "A subgraph connecting all vertices with minimum total edge weight and no cycles",
          "A tree with the minimum number of vertices",
          "The smallest connected component"
        ],
        correctIndex: 1,
        explanation: "An MST connects all vertices using the minimum total edge weight without forming any cycles."
      },
      {
        question: "How does Kruskal's algorithm choose edges?",
        options: [
          "Randomly",
          "By sorting edges by weight and adding smallest first (no cycles)",
          "By starting from a vertex and growing outward",
          "By using BFS order"
        ],
        correctIndex: 1,
        explanation: "Kruskal's sorts all edges by weight and greedily adds the smallest edge that doesn't create a cycle."
      },
      {
        question: "What data structure does Prim's algorithm use for efficiency?",
        options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Array"],
        correctIndex: 2,
        explanation: "Prim's uses a min-heap to efficiently find the minimum-weight edge connecting visited to unvisited vertices."
      },
      {
        question: "Dijkstra's algorithm finds:",
        options: [
          "The MST of a graph",
          "The shortest path from source to all other vertices",
          "The longest path in a graph",
          "Whether a graph has a cycle"
        ],
        correctIndex: 1,
        explanation: "Dijkstra's computes the shortest path distances from a source vertex to every other vertex in the graph."
      },
      {
        question: "What is the 'relaxation' step in Dijkstra's algorithm?",
        options: [
          "Removing edges from the graph",
          "Updating a vertex's distance if a shorter path is found through the current vertex",
          "Sorting vertices by distance",
          "Marking a vertex as visited"
        ],
        correctIndex: 1,
        explanation: "Relaxation checks if going through the current vertex gives a shorter path to a neighbor, and updates the neighbor's distance if so."
      },
      {
        question: "Dijkstra's algorithm does NOT work with:",
        options: [
          "Undirected graphs",
          "Directed graphs",
          "Negative edge weights",
          "Weighted graphs"
        ],
        correctIndex: 2,
        explanation: "Dijkstra's assumes non-negative edge weights. Negative weights can cause the greedy approach to fail. Use Bellman-Ford for graphs with negative weights."
      }
    ],
    sampleData: {
      "Dijkstra's Algorithm — Shortest Path from A": [
        ["Step", "Visited", "dist[A]", "dist[B]", "dist[C]", "dist[D]", "dist[E]"],
        ["Init", "{}", "0", "∞", "∞", "∞", "∞"],
        ["Pick A (0)", "{A}", "0", "4", "2", "∞", "∞"],
        ["Pick C (2)", "{A,C}", "0", "3", "2", "5", "∞"],
        ["Pick B (3)", "{A,C,B}", "0", "3", "2", "5", "7"],
        ["Pick D (5)", "{A,C,B,D}", "0", "3", "2", "5", "6"],
        ["Pick E (6)", "{A,C,B,D,E}", "0", "3", "2", "5", "6"],
      ],
      "Kruskal's Algorithm — Edge Selection": [
        ["Step", "Edge", "Weight", "Action", "MST Edges"],
        ["1", "(A,C)", "2", "Add (no cycle)", "(A,C)"],
        ["2", "(B,C)", "3", "Add (no cycle)", "(A,C), (B,C)"],
        ["3", "(A,B)", "4", "Skip (cycle A-B-C-A)", "(A,C), (B,C)"],
        ["4", "(C,D)", "5", "Add (no cycle)", "(A,C), (B,C), (C,D)"],
        ["5", "(D,E)", "6", "Add (no cycle)", "(A,C), (B,C), (C,D), (D,E)"],
      ]
    }
  }
];
