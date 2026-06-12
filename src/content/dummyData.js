export const dummyLeaves = [
  {
    count: '08',
    type: 'sick leaves',
    color: 'green-100',
  },
  {
    count: 14,
    type: 'casual leaves',
    color: 'purple-100',
  },
  {
    count: '06',
    type: 'earned leaves',
    color: 'pink-100',
  },
  {
    count: '07',
    type: 'Marriage leaves',
    color: 'blue-100',
  },
  {
    count: '14',
    type: 'Paternity leaves',
    color: 'yellow-100',
  },
  {
    count: '2',
    type: 'Comp Off leaves',
    color: 'amber-100',
  },
]

export const dummyLeaveRequests = [
  {
    id: 1,
    type: 'Casual Leave',
    from: '18/04/2026',
    to: '19/04/2026',
    days: 2,
    reason: 'Going home',
    approved_by: 'Reporting Manager',
    status: 'rejected',
  },
  {
    id: 2,
    type: 'Sick Leave',
    from: '05/04/2026',
    to: '06/04/2026',
    days: 2,
    reason: 'Fever and cold',
    approved_by: 'Reporting Manager',
    status: 'approved',
  },
  {
    id: 3,
    type: 'Earned Leave',
    from: '10/04/2026',
    to: '15/04/2026',
    days: 6,
    reason: 'Family trip',
    approved_by: 'Reporting Manager',
    status: 'pending',
  },
  {
    id: 4,
    type: 'Casual Leave',
    from: '22/04/2026',
    to: '22/04/2026',
    days: 1,
    reason: 'Personal work',
    approved_by: 'Reporting Manager',
    status: 'approved',
  },
  {
    id: 5,
    type: 'Sick Leave',
    from: '12/04/2026',
    to: '14/04/2026',
    days: 3,
    reason: 'Medical rest',
    approved_by: 'Reporting Manager',
    status: 'rejected',
  },
  {
    id: 6,
    type: 'Earned Leave',
    from: '25/04/2026',
    to: '30/04/2026',
    days: 6,
    reason: 'Vacation',
    approved_by: 'Reporting Manager',
    status: 'pending',
  },
  {
    id: 7,
    type: 'Casual Leave',
    from: '02/04/2026',
    to: '03/04/2026',
    days: 2,
    reason: 'Family function',
    approved_by: 'Reporting Manager',
    status: 'approved',
  },
  {
    id: 8,
    type: 'Sick Leave',
    from: '16/04/2026',
    to: '17/04/2026',
    days: 2,
    reason: 'Headache',
    approved_by: 'Reporting Manager',
    status: 'pending',
  },
];

export const dummyActivities = [
  {
    id: 1,
    type: 'created',
    user: 'Rahul',
    message: 'created task "Prepare salary report"',
    task: 'task-1',
    time: '2 mins ago',
  },
  {
    id: 2,
    type: 'moved',
    user: 'Anita',
    message: 'moved task to In Progress',
    time: '10 mins ago',
    task: 'task-2',
  },
  {
    id: 3,
    type: 'deleted',
    user: 'Rohit',
    message: 'moved task to In Progress',
    time: '10 mins ago',
    task: 'task-3',
  },
];


// admin dummy data \\
export const employees = [
  {
    name: 'Alice Johnson',
    role: 'Senior Developer',
    email: 'alice.j@company.com',
    phone: '+1 (555) 234-5678',
    performance: '90',
    attendance: '70'
  },
  {
    name: 'Michael Brown',
    role: 'Project Manager',
    email: 'michael.b@company.com',
    phone: '+1 (555) 345-6789',
    performance: '88',
    attendance: '92'
  },
  {
    name: 'Sophia Davis',
    role: 'UI/UX Designer',
    email: 'sophia.d@company.com',
    phone: '+1 (555) 456-7890',
    performance: '95',
    attendance: '89'
  },
  {
    name: 'James Wilson',
    role: 'QA Engineer',
    email: 'james.w@company.com',
    phone: '+1 (555) 567-8901',
    performance: '82',
    attendance: '94'
  },
  {
    name: 'Emma Taylor',
    role: 'Business Analyst',
    email: 'emma.t@company.com',
    phone: '+1 (555) 678-9012',
    performance: '91',
    attendance: '87'
  },
  {
    name: 'Daniel Martinez',
    role: 'DevOps Engineer',
    email: 'daniel.m@company.com',
    phone: '+1 (555) 789-0123',
    performance: '86',
    attendance: '96'
  },
  {
    name: 'Olivia Anderson',
    role: 'Product Owner',
    email: 'olivia.a@company.com',
    phone: '+1 (555) 890-1234',
    performance: '93',
    attendance: '90'
  },
  {
    name: 'William Thomas',
    role: 'Backend Developer',
    email: 'william.t@company.com',
    phone: '+1 (555) 901-2345',
    performance: '84',
    attendance: '85'
  },
  {
    name: 'Ava Moore',
    role: 'Frontend Developer',
    email: 'ava.m@company.com',
    phone: '+1 (555) 012-3456',
    performance: '89',
    attendance: '91'
  },
  {
    name: 'Ethan Clark',
    role: 'Data Engineer',
    email: 'ethan.c@company.com',
    phone: '+1 (555) 123-4567',
    performance: '97',
    attendance: '88'
  }
];

export const fieldEmployees = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Sales Executive',
    location: 'Andheri East, Mumbai',
    updated: '2 min ago',
    distance: '12.5 km from office',
    visits: 4,
    total: '45.2 km',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Field Engineer',
    location: 'Goregaon West, Mumbai',
    updated: '5 min ago',
    distance: '8.2 km from office',
    visits: 2,
    total: '18.7 km',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Field Engineer',
    location: 'Goregaon West, Mumbai',
    updated: '5 min ago',
    distance: '8.2 km from office',
    visits: 2,
    total: '18.7 km',
    status: 'Active'
  }
];

export const branches = [
    {
        id: "BR001",
        name: "Delhi Main Branch",
        state: "Delhi",
        city: "New Delhi",
        status: "active",
    },
    {
        id: "BR002",
        name: "Mumbai Central Branch",
        state: "Maharashtra",
        city: "Mumbai",
        status: "inactive",
    },
    {
        id: "BR003",
        name: "Bangalore Tech Park Branch",
        state: "Karnataka",
        city: "Bengaluru",
        status: "active",
    },
    {
        id: "BR004",
        name: "Hyderabad Corporate Branch",
        state: "Telangana",
        city: "Hyderabad",
        status: "inactive",
    },
];