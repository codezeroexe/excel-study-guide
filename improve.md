# UI/UX Improvement Log

## Change 1 — Home Page Subject Colour
- **Problem:** Home page subject cards have no colour distinction
- **Fix:** Apply subject colour (green/blue/purple/amber/rose) to subject cards on home page
- **Files affected:** `src/app/page.tsx`, `src/lib/subject-ui.tsx`
- **Status:** ✅ Done

## Change 2 — Quiz "Check Answer" Button Colour
- **Problem:** "Check Answer" button colour too muted across all quizzes
- **Fix:** Use subject colour for the button (green → Excel, blue → ML/DL, purple → DSA, amber → OS, rose → Stats)
- **Files affected:** `src/components/QuizCard.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 3 — Excel Module 3 Cell Reference Visualiser Highlight
- **Problem:** Interactive cell reference visualiser uses grey for highlighting buttons
- **Fix:** Change highlight colour to subject colour (green for Excel)
- **Files affected:** `src/components/ReferenceToggle.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 4 — Excel Module 7 Condition Builder Button Colour
- **Problem:** Interactive condition builder uses gray buttons
- **Fix:** Change button colour to subject colour (green for Excel)
- **Files affected:** `src/components/ConditionBuilder.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 5 — Excel VLOOKUP Animation Colour
- **Problem:** VLOOKUP animation uses grey/muted colours
- **Fix:** Apply subject colour (green for Excel) to animation elements
- **Files affected:** `src/components/LookupAnimator.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 6 — Pivot Table Builder Drag Bug
- **Problem:** Pivot table builder elements aren't actually draggable when a drag bar is present
- **Fix:** Fix drag functionality — ensure elements with drag bar are draggable
- **Files affected:** `src/components/PivotBuilder.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 7 — Excel Module 11 Charts & Visualization Colours
- **Problem:** Charts and visualization elements need different colours to actually work/be distinguishable
- **Fix:** Apply proper distinct colours to chart elements and visualization components
- **Files affected:** `src/components/ChartRenderer.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 8 — ML/DL Scaling Sandbox Readability
- **Problem:** Scaling sandbox is too muted and hard to read
- **Fix:** Apply subject colour (blue for ML/DL) to improve readability
- **Files affected:** `src/components/ScalingSandbox.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 9 — ML/DL Best Fit Line Adjuster Colours
- **Problem:** Best fit line adjuster needs proper colours to be distinguishable (same issue as charts)
- **Fix:** Apply distinct colours to line adjuster elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/BestFitLine.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 10 — ML/DL Confusion Matrix Calculator Colours
- **Problem:** Confusion Matrix Calculator needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to matrix elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/ConfusionMatrixCalc.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 11 — ML/DL Neural Network Visualizer Neuron Hover
- **Problem:** Neural Network Visualizer neuron hover colour is not subject colour
- **Fix:** Apply subject colour (blue for ML/DL) to neuron hover state
- **Files affected:** `src/components/NeuralNetworkViz.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 12 — DSA Time & Space Complexity Grapher Colours
- **Problem:** Interactive Time & Space Complexity Grapher needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to graph elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/ComplexityGrapher.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 13 — DSA Infix to Postfix Stack Simulator Convert Button
- **Problem:** Infix to Postfix Stack Simulator's "Convert" button is not subject colour
- **Fix:** Apply subject colour (purple for DSA) to the Convert button
- **Files affected:** `src/components/InfixPostfixSimulator.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 14 — DSA Sorting Algorithm Race Colours
- **Problem:** Interactive Sorting Algorithm Race needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to race elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/SortingRace.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 15 — DSA Binary Search Tree Builder Colours & Insert Button
- **Problem:** Binary Search Tree Builder needs proper colours to be distinguishable, and insert button not subject colour
- **Fix:** Apply distinct colours to tree elements + subject colour (purple for DSA) to insert button
- **Files affected:** `src/components/BSTBuilder.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 16 — DSA Graph Traversal & Pathfinding Colours
- **Problem:** Interactive Graph Traversal & Pathfinding needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to graph elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/GraphTraversalGrid.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 17 — OS Process State Machine Colours
- **Problem:** Interactive Process State Machine needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to state machine elements so they're distinguishable, not muted/grey
- **Files affected:** `src/data/os/modules.ts` → Process State Machine component (TBD)
- **Status:** ✅ Done

## Change 18 — OS CPU Scheduling Gantt Chart Colours
- **Problem:** Interactive CPU Scheduling Gantt Chart needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to Gantt chart elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/GanttChartGenerator.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 19 — OS Memory Fragmentation Sandbox Colours
- **Problem:** Interactive Memory Fragmentation Sandbox needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to sandbox elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/MemoryFragmentationSandbox.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 20 — Stats Permutation & Combination Calculator Colours
- **Problem:** Interactive Permutation & Combination Calculator needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to calculator elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/CombinatoricsCalculator.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 21 — Stats Practice Worksheet Generator Colours
- **Problem:** Practice Worksheet Generator needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to worksheet elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/WorksheetGenerator.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 22 — Stats Bayes' Theorem Calculator Colours
- **Problem:** Interactive Bayes' Theorem Calculator needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to calculator elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/BayesTheoremCalc.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 23 — Stats Probability Distribution Visualizer Colours
- **Problem:** Interactive Probability Distribution Visualizer needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to visualizer elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/DistributionVisualizer.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

## Change 24 — Stats Hypothesis Test Calculator Colours
- **Problem:** Interactive Hypothesis Test Calculator needs proper colours to be distinguishable
- **Fix:** Apply distinct colours to calculator elements so they're distinguishable, not muted/grey
- **Files affected:** `src/components/HypothesisTestCalc.tsx`, `src/app/[subject]/module/[id]/page.tsx`
- **Status:** ✅ Done

---

## How to Add Changes
Format:
```
## Change N — Title
- **Problem:** ...
- **Fix:** ...
- **Files affected:** ...
- **Status:** Planned / In Progress / Done
```
