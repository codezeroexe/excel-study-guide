import type { ModuleData } from '../types';

export const modules: ModuleData[] = [
  {
    id: "os-evolution-types",
    title: "OS Evolution & Types",
    icon: "History",
    description: "From punch cards to modern GUIs. Learn how operating systems evolved and the different types that exist today.",
    lessons: [
      {
        title: "Evolution of Operating Systems",
        content: "Operating systems evolved from simple manual controls to complex multi-user, multi-tasking systems. Each generation brought new capabilities that made computers more powerful and accessible.",
        formulas: [
          {
            formula: "1st Gen (1940s-50s): No OS — manual switches and punch cards",
            description: "Programmers physically wired circuits and fed punch cards",
            explanation: "No operating system existed. The programmer was the operator. Each program required manual setup of switches and loading via punch cards. Only one program could run at a time."
          },
          {
            formula: "2nd Gen (1955-65): Batch Processing — jobs grouped and run sequentially",
            description: "Similar jobs collected into batches, no user interaction",
            explanation: "Jobs with similar needs were grouped together and run as a batch. The operator collected jobs throughout the day, then ran them all at night. No interaction while running — you got results the next day."
          },
          {
            formula: "3rd & 4th Gen: Multiprogramming, UNIX, GUIs, Personal Computers",
            description: "Multiple programs in memory, interactive computing, graphical interfaces",
            explanation: "Multiprogramming: keep multiple programs in memory, switch to another when one waits for I/O. UNIX introduced multi-user, multi-tasking. GUIs (Windows, Mac) made computers accessible to everyone."
          }
        ]
      },
      {
        title: "Types of Operating Systems",
        content: "Different types of OS are designed for different use cases — from batch processing payroll to real-time missile guidance systems.",
        formulas: [
          {
            formula: "Batch OS: Groups similar jobs, executes sequentially (e.g., payroll)",
            description: "No user interaction — jobs run in batches",
            explanation: "All jobs with similar requirements are collected and run together. Example: end-of-month payroll processing where all employee records are processed in one batch."
          },
          {
            formula: "Multiprogramming: Multiple programs in memory, CPU switches during I/O wait",
            description: "Maximizes CPU utilization by never letting it sit idle",
            explanation: "When Program A waits for disk I/O, the CPU switches to Program B. When B waits for keyboard input, switch to C. The CPU is always busy — utilization jumps from 20% to 80%+."
          },
          {
            formula: "Multiprocessing: Multiple CPUs running simultaneously for parallel computing",
            description: "True parallel execution, not just time-sharing",
            explanation: "Two or more CPUs share memory and work together. Different from multitasking — here, multiple programs actually run at the exact same time on different processors."
          },
          {
            formula: "Multitasking: Time-slicing allows multiple tasks to run concurrently",
            description: "Each task gets a small time slice, creating illusion of parallelism",
            explanation: "The CPU gives each task 10-20ms, then switches to the next. Fast enough that it feels like everything runs simultaneously. This is how your laptop runs browser + music + editor at once."
          },
          {
            formula: "Real-Time OS: Strict time limits — medical imaging, missile guidance",
            description: "Missing a deadline = system failure",
            explanation: "RTOS guarantees response within a specific time. Hard RTOS: missing deadline = catastrophic (airbag deployment). Soft RTOS: occasional misses acceptable (video streaming)."
          },
          {
            formula: "Distributed/Network OS: Shared resources across multiple computers",
            description: "Multiple machines appear as a single system",
            explanation: "Network OS: centralized server manages resources (file servers, print servers). Distributed OS: multiple independent computers work together, appearing as one system to the user."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Which generation introduced multiprogramming?",
        options: ["1st Gen", "2nd Gen", "3rd & 4th Gen", "5th Gen"],
        correctIndex: 2,
        explanation: "3rd and 4th generation introduced multiprogramming, UNIX, GUIs, and personal computers."
      },
      {
        question: "What is the key difference between multiprocessing and multitasking?",
        options: [
          "They are the same thing",
          "Multiprocessing uses multiple CPUs for true parallel execution; multitasking uses time-slicing on one CPU",
          "Multitasking is faster",
          "Multiprocessing is only for servers"
        ],
        correctIndex: 1,
        explanation: "Multiprocessing = multiple CPUs running truly in parallel. Multitasking = one CPU switching between tasks rapidly."
      },
      {
        question: "What does a Real-Time OS guarantee?",
        options: [
          "The fastest possible performance",
          "Response within a specific time limit",
          "The most secure environment",
          "The best graphical interface"
        ],
        correctIndex: 1,
        explanation: "RTOS guarantees that operations complete within a strict time deadline. Missing the deadline can mean system failure."
      },
      {
        question: "In batch processing, when does the user get results?",
        options: [
          "Immediately",
          "After the batch completes (often hours later)",
          "In real-time",
          "Never"
        ],
        correctIndex: 1,
        explanation: "Batch processing collects jobs and runs them together. Users submit jobs and get results later — often the next day."
      },
      {
        question: "What is the main advantage of multiprogramming?",
        options: [
          "Faster individual programs",
          "Maximizes CPU utilization by switching during I/O waits",
          "Better security",
          "Simpler programming"
        ],
        correctIndex: 1,
        explanation: "Multiprogramming keeps the CPU busy by switching to another program when one waits for I/O, boosting utilization from ~20% to 80%+."
      }
    ],
    sampleData: {
      "OS Evolution Timeline": [
        ["Generation", "Era", "Key Feature", "Example"],
        ["1st", "1940s-50s", "No OS, manual operation", "ENIAC, UNIVAC"],
        ["2nd", "1955-65", "Batch processing", "IBM 7094"],
        ["3rd", "1965-80", "Multiprogramming, UNIX", "IBM System/360"],
        ["4th", "1980-present", "GUIs, Personal Computers", "Windows, macOS, Linux"],
      ]
    }
  },
  {
    id: "process-management",
    title: "Process Management",
    icon: "Cpu",
    description: "Processes, PCB, context switching, IPC, and race conditions — how the OS manages running programs.",
    lessons: [
      {
        title: "What is a Process?",
        content: "A process is a program in execution. It's more than just code — it includes the current activity, memory, and resources. Each process has its own address space and execution context.",
        formulas: [
          {
            formula: "Process = Text (code) + Data (globals) + Heap (dynamic) + Stack (local)",
            description: "Four memory segments that make up a process",
            explanation: "Text: the compiled program code (read-only). Data: global and static variables. Heap: dynamically allocated memory (malloc/new). Stack: local variables, function parameters, return addresses."
          },
          {
            formula: "Process States: New → Ready → Running → Waiting → Terminated",
            description: "A process moves through these states during its lifetime",
            explanation: "New: being created. Ready: waiting for CPU. Running: executing on CPU. Waiting: blocked for I/O or event. Terminated: finished execution. The OS scheduler moves processes between these states."
          },
          {
            formula: "PCB (Process Control Block): OS data structure tracking each process",
            description: "Contains PID, state, program counter, registers, memory limits",
            explanation: "The PCB is the OS's 'file' on each process. It stores: Process ID, current state, program counter (next instruction), CPU registers, memory limits, open files, and scheduling info."
          }
        ]
      },
      {
        title: "Context Switching",
        content: "Context switching is the mechanism that enables multitasking. The OS saves the state of the current process and loads the state of the next process, allowing multiple programs to share the CPU.",
        formulas: [
          {
            formula: "Context Switch = Save current PCB → Load next PCB → Resume execution",
            description: "The OS swaps process states to enable multitasking",
            explanation: "Step 1: Save current process's registers, program counter, and state to its PCB. Step 2: Select next process from ready queue. Step 3: Load next process's PCB into CPU registers. Step 4: Resume execution."
          },
          {
            formula: "Overhead: Context switching takes time — pure overhead, no useful work",
            description: "Typical context switch: 1-10 microseconds on modern systems",
            explanation: "During a context switch, the CPU does no useful work — it's just saving and loading state. Too many switches waste CPU time. Too few switches make the system feel unresponsive. The OS balances this."
          }
        ]
      },
      {
        title: "Inter-Process Communication (IPC)",
        content: "Processes need to communicate and share data. IPC provides mechanisms for processes to exchange information and synchronize their actions.",
        formulas: [
          {
            formula: "Shared Memory: Processes access a common memory region — fast but needs synchronization",
            description: "Fastest IPC — direct memory access",
            explanation: "The OS creates a shared memory segment that multiple processes can read and write. Very fast (memory speed) but prone to race conditions — two processes writing simultaneously can corrupt data."
          },
          {
            formula: "Message Passing: Processes send/receive messages through OS-managed queues",
            description: "Slower but safer — OS handles the communication",
            explanation: "Processes use send() and receive() system calls. The OS manages message queues (FIFO). Slower than shared memory (system call overhead) but safer — no race conditions if used correctly."
          },
          {
            formula: "Race Condition: Multiple processes access shared data simultaneously → unpredictable results",
            description: "The outcome depends on the timing of process execution",
            explanation: "Example: Two processes read a counter (value=5), both increment to 6, both write 6. The counter should be 7 but is 6. Prevention: Mutex (only one process accesses at a time), Semaphores, Atomic Operations."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What are the four memory segments of a process?",
        options: [
          "Code, Cache, Heap, Stack",
          "Text (code), Data (globals), Heap (dynamic), Stack (local)",
          "RAM, ROM, Cache, Register",
          "Input, Output, Memory, CPU"
        ],
        correctIndex: 1,
        explanation: "A process consists of Text (compiled code), Data (global variables), Heap (dynamic memory), and Stack (local variables and function calls)."
      },
      {
        question: "What does the PCB (Process Control Block) store?",
        options: [
          "Only the process name",
          "PID, state, program counter, registers, memory limits, and more",
          "Only the CPU registers",
          "Only the memory address"
        ],
        correctIndex: 1,
        explanation: "The PCB stores comprehensive process information: PID, state, program counter, CPU registers, memory limits, open files, and scheduling data."
      },
      {
        question: "What is context switching?",
        options: [
          "Changing the CPU",
          "Saving current process state and loading the next process state",
          "Deleting a process",
          "Creating a new process"
        ],
        correctIndex: 1,
        explanation: "Context switching saves the current process's state to its PCB and loads the next process's state, enabling multitasking."
      },
      {
        question: "Which IPC method is faster?",
        options: ["Message Passing", "Shared Memory", "Both are equal", "Neither works"],
        correctIndex: 1,
        explanation: "Shared Memory is faster because processes access memory directly. Message Passing requires system calls and OS involvement."
      },
      {
        question: "What causes a race condition?",
        options: [
          "A process running too fast",
          "Multiple processes accessing shared data simultaneously without synchronization",
          "A CPU overheating",
          "Too many context switches"
        ],
        correctIndex: 1,
        explanation: "Race conditions occur when multiple processes access and modify shared data at the same time, leading to unpredictable results."
      }
    ],
    sampleData: {
      "Process State Transitions": [
        ["From State", "To State", "Trigger"],
        ["New", "Ready", "OS admits process to ready queue"],
        ["Ready", "Running", "Scheduler picks process (dispatch)"],
        ["Running", "Ready", "Time quantum expires (preemption)"],
        ["Running", "Waiting", "Process requests I/O or event"],
        ["Waiting", "Ready", "I/O completes or event occurs"],
        ["Running", "Terminated", "Process finishes or is killed"],
      ]
    }
  },
  {
    id: "cpu-scheduling",
    title: "CPU Scheduling",
    icon: "Clock",
    description: "FCFS, SJF, SRTF, Priority, Round Robin, and MLFQ — how the OS decides which process runs next.",
    lessons: [
      {
        title: "Types of Schedulers",
        content: "The OS uses three types of schedulers to manage processes at different levels — from loading jobs from disk to selecting which process gets the CPU right now.",
        formulas: [
          {
            formula: "Long-Term Scheduler: Selects jobs from disk → loads into memory",
            description: "Controls the degree of multiprogramming",
            explanation: "Decides which programs are admitted to the system. Runs infrequently (seconds/minutes). Balances I/O-bound and CPU-bound processes. Also called the 'Job Scheduler'."
          },
          {
            formula: "Short-Term Scheduler: Selects from Ready Queue → assigns to CPU",
            description: "Runs every few milliseconds — the most frequent scheduler",
            explanation: "Also called the 'CPU Scheduler'. Decides which ready process gets the CPU next. Must be extremely fast (microseconds). This is where scheduling algorithms (FCFS, RR, SJF) apply."
          },
          {
            formula: "Medium-Term Scheduler: Swaps processes between memory and disk",
            description: "Reduces multiprogramming degree when system is overloaded",
            explanation: "Removes a process from memory (swaps out to disk) to free up RAM. Later swaps it back in. Used when too many processes are competing for limited memory."
          }
        ]
      },
      {
        title: "FCFS & SJF Scheduling",
        content: "First Come First Serve is the simplest algorithm. Shortest Job First optimizes waiting time by running shorter processes first.",
        formulas: [
          {
            formula: "FCFS: Execute processes in arrival order — simple but unfair",
            description: "Non-preemptive, uses a FIFO queue",
            explanation: "First process to arrive gets the CPU first. Problem: Convoy Effect — if a long process arrives first, all short processes wait behind it. Average waiting time can be very high."
          },
          {
            formula: "SJF: Execute the process with shortest CPU burst first",
            description: "Optimal for minimizing average waiting time",
            explanation: "Always picks the process with the shortest next CPU burst. Mathematically optimal for minimum average waiting time. Problem: Can cause starvation — long processes may never run if short ones keep arriving."
          },
          {
            formula: "SRTF: Preemptive SJF — if a shorter process arrives, preempt current",
            description: "More responsive than SJF but more context switches",
            explanation: "If a new process arrives with a shorter burst than the remaining time of the current process, the OS preempts (interrupts) the current process and runs the shorter one."
          }
        ]
      },
      {
        title: "Priority & Round Robin",
        content: "Priority scheduling assigns importance levels. Round Robin ensures fairness by giving each process a fixed time slice.",
        formulas: [
          {
            formula: "Priority Scheduling: Execute highest priority process first",
            description: "Can be preemptive or non-preemptive",
            explanation: "Each process gets a priority number. The CPU runs the highest priority process. Problem: Starvation — low priority processes may never run. Solution: Aging — gradually increase priority of waiting processes."
          },
          {
            formula: "Round Robin: Each process gets a fixed time quantum (e.g., 10ms)",
            description: "Preemptive, fair, designed for time-sharing systems",
            explanation: "Processes are arranged in a circular queue. Each gets the CPU for one time quantum. If not finished, it goes to the back of the queue. Quantum too large → behaves like FCFS. Too small → too many context switches."
          },
          {
            formula: "MLFQ: Multiple priority queues — processes move between queues based on behavior",
            description: "Combines benefits of all algorithms",
            explanation: "Multiple queues with different priorities. New processes start at highest priority. If a process uses its full quantum, it drops to a lower queue. If it yields early (I/O bound), it stays high. Self-adjusting."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "Which scheduler controls the degree of multiprogramming?",
        options: ["Short-Term", "Long-Term", "Medium-Term", "None"],
        correctIndex: 1,
        explanation: "The Long-Term Scheduler decides which jobs are admitted to memory, controlling how many processes are in the system."
      },
      {
        question: "What is the Convoy Effect in FCFS?",
        options: [
          "All processes run fast",
          "Short processes wait behind a long process, increasing average waiting time",
          "Processes run in parallel",
          "The CPU overheats"
        ],
        correctIndex: 1,
        explanation: "In FCFS, if a long process arrives first, all subsequent short processes must wait, creating a 'convoy' and high average waiting time."
      },
      {
        question: "Which scheduling algorithm gives the minimum average waiting time?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correctIndex: 1,
        explanation: "SJF (Shortest Job First) is mathematically optimal for minimizing average waiting time."
      },
      {
        question: "What happens if the Round Robin time quantum is too large?",
        options: [
          "Too many context switches",
          "It behaves like FCFS",
          "Processes starve",
          "The system crashes"
        ],
        correctIndex: 1,
        explanation: "If the quantum is larger than any process's burst time, every process finishes in one turn — effectively FCFS."
      },
      {
        question: "How does MLFQ prevent starvation?",
        options: [
          "It doesn't",
          "Processes that wait long enough get priority boosts",
          "It uses random selection",
          "It only runs one process"
        ],
        correctIndex: 1,
        explanation: "MLFQ can implement priority aging — processes that wait too long in lower queues get moved up, ensuring they eventually run."
      }
    ],
    sampleData: {
      "Scheduling Algorithm Comparison": [
        ["Algorithm", "Preemptive?", "Starvation?", "Overhead", "Best For"],
        ["FCFS", "No", "No", "Low", "Simple systems"],
        ["SJF", "No", "Yes (long jobs)", "Low", "Minimizing wait time"],
        ["SRTF", "Yes", "Yes (long jobs)", "Medium", "Responsive systems"],
        ["Priority", "Both", "Yes (low priority)", "Low", "Important tasks first"],
        ["Round Robin", "Yes", "No", "High (many switches)", "Time-sharing"],
        ["MLFQ", "Yes", "No (with aging)", "Medium", "General purpose"],
      ]
    }
  },
  {
    id: "memory-management",
    title: "Memory Management",
    icon: "HardDrive",
    description: "Logical vs physical addresses, paging, segmentation, virtual memory, and fragmentation.",
    lessons: [
      {
        title: "Logical vs Physical Addresses",
        content: "Programs work with logical (virtual) addresses. The actual data lives at physical addresses in RAM. The MMU translates between them.",
        formulas: [
          {
            formula: "Logical Address: Generated by CPU — what the program sees",
            description: "Also called virtual address — program's view of memory",
            explanation: "When your program accesses variable x at address 1000, that's a logical address. The program doesn't know (or care) where this actually lives in physical RAM."
          },
          {
            formula: "Physical Address: Actual location in RAM hardware",
            description: "Where the data really lives in memory chips",
            explanation: "The MMU translates logical address 1000 to physical address 52000. The program never sees 52000 — it only works with logical addresses."
          },
          {
            formula: "MMU (Memory Management Unit): Hardware that translates logical → physical",
            description: "Uses page tables to map virtual to physical addresses",
            explanation: "Every memory access goes through the MMU. It looks up the logical address in the page table, finds the corresponding physical frame, and returns the data. This happens billions of times per second."
          }
        ]
      },
      {
        title: "Memory Allocation Techniques",
        content: "How the OS assigns memory to processes. Contiguous allocation gives each process one continuous block. Non-contiguous splits processes across memory.",
        formulas: [
          {
            formula: "Contiguous Allocation: Each process gets one continuous block of memory",
            description: "Simple but causes fragmentation",
            explanation: "Process A gets addresses 0-999, Process B gets 1000-1999. Problem: When A finishes, its 1000-unit gap may be too small for a new 1500-unit process. This is external fragmentation."
          },
          {
            formula: "Paging: Memory divided into fixed-size frames; processes divided into pages",
            description: "Non-contiguous — pages can be scattered across frames",
            explanation: "Memory is split into fixed-size frames (e.g., 4KB). Each process is split into pages of the same size. Pages can go into any available frame — no need for contiguous space. Eliminates external fragmentation."
          },
          {
            formula: "Segmentation: Process divided into variable-sized logical segments (code, data, stack)",
            description: "Reflects the program's logical structure",
            explanation: "Instead of fixed-size pages, segmentation divides the process into meaningful units: code segment, data segment, stack segment. Each segment can be a different size. More intuitive but causes external fragmentation."
          }
        ]
      },
      {
        title: "Virtual Memory",
        content: "Virtual memory creates the illusion of more memory than physically available by using disk space as an extension of RAM.",
        formulas: [
          {
            formula: "Virtual Memory = RAM + Disk Space — illusion of larger memory",
            description: "Only active parts of a program need to be in RAM",
            explanation: "A 4GB program doesn't need all 4GB in RAM at once. Only the currently used pages are in RAM. The rest live on disk. When a needed page isn't in RAM, a page fault occurs and the OS loads it from disk."
          },
          {
            formula: "Page Fault: Required page not in RAM → OS loads it from disk",
            description: "The OS handles page faults transparently",
            explanation: "Step 1: CPU accesses a page not in RAM. Step 2: MMU triggers page fault. Step 3: OS finds the page on disk. Step 4: OS loads it into a free frame (or swaps out another page). Step 5: Resume execution."
          },
          {
            formula: "Thrashing: Too many page faults → system spends more time swapping than executing",
            description: "System becomes extremely slow",
            explanation: "When too many processes compete for limited RAM, pages are constantly swapped in and out. The CPU spends most of its time handling page faults instead of doing useful work. Solution: reduce multiprogramming degree."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What does the MMU do?",
        options: [
          "Manages CPU scheduling",
          "Translates logical addresses to physical addresses",
          "Manages file systems",
          "Controls I/O devices"
        ],
        correctIndex: 1,
        explanation: "The Memory Management Unit translates the logical (virtual) addresses used by programs into physical addresses in RAM."
      },
      {
        question: "What is external fragmentation?",
        options: [
          "Wasted space inside an allocated block",
          "Free memory scattered in small chunks that can't be used",
          "Memory corruption",
          "A type of virus"
        ],
        correctIndex: 1,
        explanation: "External fragmentation occurs when free memory is split into small, non-contiguous blocks. Total free space may be enough, but no single block is large enough for a new process."
      },
      {
        question: "How does paging eliminate external fragmentation?",
        options: [
          "It doesn't",
          "Pages can go into any available frame — no need for contiguous space",
          "It compresses memory",
          "It uses larger blocks"
        ],
        correctIndex: 1,
        explanation: "Since pages are fixed-size and can go into any frame, there's no need for contiguous allocation. Any free frame can hold any page."
      },
      {
        question: "What is a page fault?",
        options: [
          "A hardware error",
          "When a required page is not in RAM and must be loaded from disk",
          "A programming bug",
          "When memory is full"
        ],
        correctIndex: 1,
        explanation: "A page fault occurs when a program accesses a page that isn't currently in RAM. The OS handles it by loading the page from disk."
      },
      {
        question: "What is thrashing?",
        options: [
          "Deleting files rapidly",
          "Too many page faults causing the system to spend more time swapping than executing",
          "A type of malware",
          "Overclocking the CPU"
        ],
        correctIndex: 1,
        explanation: "Thrashing occurs when the system spends more time handling page faults (swapping pages in/out) than executing actual processes."
      }
    ],
    sampleData: {
      "Paging Example — 4KB Pages": [
        ["Page #", "Logical Address Range", "Frame #", "Physical Address Range"],
        ["0", "0 – 4,095", "5", "20,480 – 24,575"],
        ["1", "4,096 – 8,191", "2", "8,192 – 12,287"],
        ["2", "8,192 – 12,287", "8", "32,768 – 36,863"],
        ["3", "12,288 – 16,383", "1", "4,096 – 8,191"],
      ]
    }
  },
  {
    id: "file-systems",
    title: "File Systems",
    icon: "FolderOpen",
    description: "File system architecture, access methods, directory structures, and common file system types.",
    lessons: [
      {
        title: "File System Architecture",
        content: "File systems are layered — from the user's logical view down to the physical storage blocks on disk.",
        formulas: [
          {
            formula: "Logical File System: Handles metadata — file names, permissions, attributes",
            description: "What the user and applications interact with",
            explanation: "When you open a file, the logical file system checks permissions, finds the file's metadata (size, creation date, owner), and passes the request down the stack."
          },
          {
            formula: "Virtual File System (VFS): Abstract layer supporting multiple file system types",
            description: "Bridge between logical and physical — OS-agnostic interface",
            explanation: "VFS lets the OS support NTFS, ext4, FAT32 simultaneously. Applications use the same open/read/write calls regardless of the underlying file system type."
          },
          {
            formula: "Physical File System: Manages actual disk blocks and free space",
            description: "Directly interacts with storage hardware",
            explanation: "Knows the physical layout of the disk. Allocates blocks, manages free space, handles read/write operations to specific sectors. The lowest layer of the file system stack."
          }
        ]
      },
      {
        title: "File System Types",
        content: "Different operating systems use different file systems, each with its own features and limitations.",
        formulas: [
          {
            formula: "FAT (File Allocation Table): Older, simple, compatible across all OS",
            description: "Used in USB drives, SD cards — no permissions or journaling",
            explanation: "Simple table-based structure. Maximum file size: 4GB (FAT32). No file permissions, no journaling. Universally compatible — works on Windows, Mac, Linux, cameras, game consoles."
          },
          {
            formula: "NTFS (Windows): Secure, journaling, supports large files and permissions",
            description: "Default Windows file system since XP",
            explanation: "Journaling: tracks changes before writing (prevents corruption on crash). File permissions: ACLs control who can access what. Supports files larger than 16TB. Encryption and compression built in."
          },
          {
            formula: "ext4 (Linux): Journaling, extents, backward compatible with ext3",
            description: "Default Linux file system — reliable and fast",
            explanation: "Extents: contiguous block allocation reduces fragmentation. Journaling: prevents corruption. Supports files up to 16TB. Fast fsck (file system check). Used by most Linux distributions."
          },
          {
            formula: "APFS (Apple): Optimized for SSDs, encryption, snapshots",
            description: "Default macOS file system since High Sierra",
            explanation: "Copy-on-write: changes are written to new blocks, preserving old data. Snapshots: point-in-time copies of the file system. Optimized for flash/SSD storage. Native encryption."
          }
        ]
      },
      {
        title: "File Access & Directory Structures",
        content: "How programs read files and how the OS organizes them into directories.",
        formulas: [
          {
            formula: "Sequential Access: Read records one after another (like a tape)",
            description: "Simple but slow for random access",
            explanation: "Start at the beginning, read record 1, then 2, then 3... To reach record 100, you must read records 1-99 first. Used in log files, streaming data."
          },
          {
            formula: "Random (Direct) Access: Jump directly to any block or record",
            description: "Fast — used by databases and most applications",
            explanation: "Specify the block number or offset, and the OS reads it directly. No need to read preceding blocks. Databases use random access to quickly find specific records."
          },
          {
            formula: "Tree-Structured Directory: Hierarchical folders — the standard today",
            description: "Organized as a tree with root at the top",
            explanation: "/home/user/documents/report.txt — each level is a directory. Solves name collisions (two users can have 'report.txt' in their own folders). Easy to navigate and organize."
          }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the role of the Virtual File System (VFS)?",
        options: [
          "Store files on disk",
          "Provide a unified interface for multiple file system types",
          "Compress files",
          "Encrypt data"
        ],
        correctIndex: 1,
        explanation: "VFS provides an abstract layer that lets the OS support multiple file system types (NTFS, ext4, FAT32) through a single interface."
      },
      {
        question: "Which file system is the default for Windows?",
        options: ["FAT32", "ext4", "NTFS", "APFS"],
        correctIndex: 2,
        explanation: "NTFS has been the default Windows file system since Windows XP, offering journaling, permissions, and large file support."
      },
      {
        question: "What is journaling in a file system?",
        options: [
          "Writing a diary of file changes",
          "Tracking changes before writing to prevent corruption on crash",
          "Compressing files",
          "Encrypting data"
        ],
        correctIndex: 1,
        explanation: "Journaling records intended changes in a log before applying them. If the system crashes, the journal can replay or undo incomplete operations."
      },
      {
        question: "What is the advantage of random access over sequential access?",
        options: [
          "It's simpler",
          "You can jump directly to any block without reading preceding data",
          "It uses less memory",
          "It's more secure"
        ],
        correctIndex: 1,
        explanation: "Random access lets you read any block directly by specifying its address, without having to read all preceding blocks."
      },
      {
        question: "Which directory structure solves name collisions?",
        options: [
          "Single-Level",
          "Two-Level",
          "Tree-Structured",
          "Flat"
        ],
        correctIndex: 2,
        explanation: "Tree-structured directories allow different users to have files with the same name in different directories (e.g., /user1/report.txt and /user2/report.txt)."
      }
    ],
    sampleData: {
      "File System Comparison": [
        ["Feature", "FAT32", "NTFS", "ext4", "APFS"],
        ["Max File Size", "4 GB", "16 TB", "16 TB", "8 EB"],
        ["Journaling", "No", "Yes", "Yes", "Yes"],
        ["Permissions", "No", "Yes (ACL)", "Yes", "Yes"],
        ["Encryption", "No", "Yes", "Yes (optional)", "Yes (native)"],
        ["Best For", "USB drives", "Windows", "Linux", "macOS/SSDs"],
      ]
    }
  }
];
