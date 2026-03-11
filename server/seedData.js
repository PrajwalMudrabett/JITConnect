import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Job from './models/Job.js';
import Announcement from './models/Announcement.js';
import connectDB from './config/db.js';

dotenv.config();

const sampleUsers = [
  {
    name: 'Dr. N. Sathisha',
    email: 'principal@jyothyit.ac.in',
    password: 'jit2024',
    role: 'faculty',
    department: 'Principal Office',
    designation: 'Principal',
    experience: '25 years',
    bio: 'Principal of Jyothy Institute of Technology. Leading the institution towards excellence in engineering education and research.'
  },
  {
    name: 'Training & Placement Cell',
    email: 'placement@jyothyit.ac.in',
    password: 'jit2024',
    role: 'department',
    deptName: 'Training & Placement Cell',
    deptDescription: 'Dedicated to ensuring excellent placement opportunities for JIT students in top companies.'
  },
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@jyothyit.ac.in',
    password: 'jit2024',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    designation: 'Professor & HOD',
    experience: '18 years',
    bio: 'Head of CSE Department. Research interests: AI, Machine Learning, Data Science.'
  },
  {
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@jyothyit.ac.in',
    password: 'jit2024',
    role: 'faculty',
    department: 'Electronics & Communication',
    designation: 'Associate Professor',
    experience: '15 years',
    bio: 'Passionate about VLSI Design and Embedded Systems. Published 30+ research papers.'
  },
  {
    name: 'Atal Incubation Centre - JIT',
    email: 'aic@jyothyit.ac.in',
    password: 'jit2024',
    role: 'department',
    deptName: 'AIC-JIT Foundation',
    deptDescription: 'Centre for Incubation, Innovation, Research & Consultancy. Supporting startups and entrepreneurship.'
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@alumni.jit.ac.in',
    password: 'jit2024',
    role: 'alumni',
    batch: '2019',
    branch: 'CSE',
    company: 'Amazon',
    designation: 'Software Development Engineer II',
    bio: 'JIT CSE 2019 graduate. Currently working at Amazon Web Services, Bangalore.'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@alumni.jit.ac.in',
    password: 'jit2024',
    role: 'alumni',
    batch: '2018',
    branch: 'ISE',
    company: 'Microsoft',
    designation: 'Senior Product Manager',
    bio: 'Product Manager at Microsoft. Passionate about building products that impact millions.'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@jit.ac.in',
    password: 'jit2024',
    role: 'student',
    usn: '1JT21CS045',
    branch: 'CSE',
    year: '4th',
    bio: 'Final year CSE student. Interested in Full Stack Development and Cloud Computing.'
  },
  {
    name: 'Arjun Reddy',
    email: 'arjun.reddy@alumni.jit.ac.in',
    password: 'jit2024',
    role: 'alumni',
    batch: '2020',
    branch: 'CSE',
    company: 'Google',
    designation: 'Senior Software Engineer',
    bio: 'Working at Google Cloud. Love mentoring students and contributing to open source.'
  },
  {
    name: 'Karthik Menon',
    email: 'karthik.menon@jit.ac.in',
    password: 'jit2024',
    role: 'student',
    usn: '1JT22CS089',
    branch: 'CSE',
    year: '3rd',
    bio: 'Third year CSE student. Passionate about AI/ML and competitive programming.'
  }
];

const createSamplePosts = (users) => {
  const placementDept = users.find(u => u.email === 'placement@jyothyit.ac.in');
  const rajesh = users.find(u => u.email === 'rajesh.kumar@jyothyit.ac.in');
  const priya = users.find(u => u.email === 'priya.sharma@jit.ac.in');
  const aicJit = users.find(u => u.email === 'aic@jyothyit.ac.in');
  const arjun = users.find(u => u.email === 'arjun.reddy@alumni.jit.ac.in');
  const ananya = users.find(u => u.email === 'ananya.iyer@alumni.jit.ac.in');
  const vikram = users.find(u => u.email === 'vikram.singh@alumni.jit.ac.in');
  const principal = users.find(u => u.email === 'principal@jyothyit.ac.in');

  return [
    {
      user: placementDept._id,
      content: '🎉 RECORD BREAKING PLACEMENTS 2024! 250+ students placed in top companies including Amazon, Microsoft, Google, Infosys, TCS, and Wipro. Average package: 8.5 LPA | Highest package: 45 LPA at Amazon. Proud moment for Jyothy Institute of Technology! #JITPlacement2024 #ProudJIT',
      category: 'placement',
      likes: [],
      comments: []
    },
    {
      user: rajesh._id,
      content: 'Thrilled to announce that our research paper on "AI-Driven Healthcare Solutions using Deep Learning" has been accepted at IEEE International Conference on Artificial Intelligence 2024! Congratulations to the entire research team from JIT CSE Department. Innovation drives us forward! 🚀 #JITResearch #Innovation #AI',
      category: 'research',
      likes: [],
      comments: []
    },
    {
      user: priya._id,
      content: 'Dreams do come true! 🎯 Selected for Software Engineering Internship at Microsoft Bangalore! Grateful to JIT faculty, especially Prof. Rajesh Kumar for mentorship and guidance. The journey from classroom to corporate starts here! Special thanks to Training & Placement Cell for their support. #JITToMicrosoft #Internship2024 #Grateful',
      category: 'internship',
      likes: [],
      comments: []
    },
    {
      user: aicJit._id,
      content: '🚀 STARTUP LAUNCH ALERT! Congratulations to Team InnoTech for successfully launching their EdTech startup "LearnSphere" from AIC-JIT Foundation. From idea to execution in 6 months with seed funding of ₹25 Lakhs. This is what innovation looks like! Apply for incubation at aic-jit.in #StartupIndia #JITIncubation #Entrepreneurship',
      category: 'event',
      likes: [],
      comments: []
    },
    {
      user: arjun._id,
      content: 'From JIT CSE 2020 batch to Senior Software Engineer at Google Cloud! The foundation I built at Jyothy Institute of Technology shaped my career. Forever grateful to my professors and peers. Happy to mentor current JIT students - DM me for career guidance, interview prep, or just a chat about tech! 💼 #JITAlumni #GoogleLife #Mentorship',
      category: 'general',
      likes: [],
      comments: []
    },
    {
      user: principal._id,
      content: '🏆 Proud to announce that Jyothy Institute of Technology has been ranked among TOP 100 Engineering Colleges in India by NIRF 2024! This achievement is a testament to our dedicated faculty, brilliant students, and world-class infrastructure. We continue our journey towards excellence in engineering education and research. #JITExcellence #NIRF2024 #EngineeringEducation',
      category: 'general',
      likes: [],
      comments: []
    },
    {
      user: ananya._id,
      content: 'Attending AWS re:Invent 2024 in Las Vegas! 🌟 Representing Amazon and proud to be a JIT alumna. The technical skills and problem-solving mindset I developed at JIT have been instrumental in my journey. To all current students: Keep learning, stay curious, and never stop building! #AWS #JITAlumni #TechConference',
      category: 'general',
      likes: [],
      comments: []
    },
    {
      user: vikram._id,
      content: 'Just launched a new feature at Microsoft that will impact 100M+ users! 🚀 Journey from JIT ISE 2018 to Product Management at Microsoft has been incredible. Key learning: Technical education + business acumen = powerful combination. Thank you JIT for the strong foundation! Open to connecting with JIT students interested in Product Management. #Microsoft #ProductManagement #JITAlumni',
      category: 'general',
      likes: [],
      comments: []
    }
  ];
};

const createSampleJobs = (users) => {
  const ananya = users.find(u => u.email === 'ananya.iyer@alumni.jit.ac.in');
  const vikram = users.find(u => u.email === 'vikram.singh@alumni.jit.ac.in');
  const arjun = users.find(u => u.email === 'arjun.reddy@alumni.jit.ac.in');
  const rajesh = users.find(u => u.email === 'rajesh.kumar@jyothyit.ac.in');

  return [
    {
      title: 'Software Development Engineer - Intern',
      company: 'Amazon',
      type: 'internship',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'Amazon is looking for talented software engineering interns to join our team. You will work on real-world projects that impact millions of customers worldwide. This is a 6-month internship with potential for full-time conversion.',
      requirements: 'Currently pursuing B.Tech/B.E in Computer Science or related field. Strong programming skills in Java, Python, or C++. Good understanding of data structures and algorithms. Problem-solving mindset and ability to work in a fast-paced environment.',
      salary: '₹80,000/month',
      experience: '0 years (Students)',
      skills: ['Java', 'Python', 'Data Structures', 'Algorithms', 'Problem Solving'],
      applicationEmail: 'campus-hiring@amazon.com',
      postedBy: ananya._id,
      isActive: true,
      deadline: new Date('2024-12-31')
    },
    {
      title: 'Product Management Intern',
      company: 'Microsoft',
      type: 'internship',
      location: 'Hyderabad, Telangana',
      workMode: 'hybrid',
      description: 'Join Microsoft as a Product Management Intern and work on products used by millions globally. You will collaborate with engineering, design, and business teams to define product strategy and roadmap.',
      requirements: 'Final year students from any engineering branch. Strong analytical and communication skills. Passion for technology and user experience. Prior internship experience is a plus.',
      salary: '₹75,000/month',
      experience: '0 years (Students)',
      skills: ['Product Strategy', 'Data Analysis', 'Communication', 'User Research', 'Agile'],
      applicationLink: 'https://careers.microsoft.com/students',
      postedBy: vikram._id,
      isActive: true,
      deadline: new Date('2024-12-25')
    },
    {
      title: 'Cloud Engineer',
      company: 'Google Cloud',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'Google Cloud is seeking talented engineers to build and maintain cloud infrastructure. You will work on cutting-edge cloud technologies and help customers migrate to the cloud.',
      requirements: 'B.Tech/B.E in Computer Science with 0-2 years of experience. Strong understanding of cloud computing concepts. Experience with AWS, Azure, or GCP. Knowledge of Linux, networking, and scripting languages.',
      salary: '₹18-25 LPA',
      experience: '0-2 years',
      skills: ['Cloud Computing', 'AWS', 'GCP', 'Linux', 'Python', 'Networking', 'Docker', 'Kubernetes'],
      applicationEmail: 'cloud-hiring@google.com',
      postedBy: arjun._id,
      isActive: true,
      deadline: new Date('2025-01-15')
    },
    {
      title: 'Frontend Developer',
      company: 'Flipkart',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'hybrid',
      description: 'Flipkart is looking for passionate frontend developers to build amazing user experiences. You will work on high-traffic e-commerce platform serving millions of users daily.',
      requirements: 'B.Tech/B.E in Computer Science or related field. Strong proficiency in React.js, JavaScript, HTML, CSS. Experience with responsive design and modern frontend tools. Understanding of REST APIs and state management.',
      salary: '₹12-18 LPA',
      experience: '0-2 years',
      skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Redux', 'TypeScript', 'REST API'],
      applicationLink: 'https://www.flipkartcareers.com',
      postedBy: ananya._id,
      isActive: true,
      deadline: new Date('2025-01-10')
    },
    {
      title: 'Data Scientist',
      company: 'Walmart Global Tech',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'hybrid',
      description: 'Join Walmart Global Tech as a Data Scientist and work on solving complex business problems using data and machine learning. You will build predictive models and drive data-driven decision making.',
      requirements: 'B.Tech/M.Tech in Computer Science, Statistics, or related field. Strong programming skills in Python/R. Experience with machine learning frameworks like TensorFlow, PyTorch. Knowledge of SQL and data visualization tools.',
      salary: '₹15-22 LPA',
      experience: '0-2 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics', 'Data Visualization', 'Pandas'],
      applicationEmail: 'tech-hiring@walmart.com',
      postedBy: rajesh._id,
      isActive: true,
      deadline: new Date('2025-01-20')
    },
    {
      title: 'Backend Developer - Node.js',
      company: 'Razorpay',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'Razorpay is hiring backend developers to build scalable payment solutions. You will design and develop APIs, microservices, and work on high-performance systems.',
      requirements: 'B.Tech in Computer Science with strong programming fundamentals. Proficiency in Node.js, Express.js, and MongoDB. Understanding of RESTful APIs, microservices architecture. Experience with payment systems is a plus.',
      salary: '₹10-16 LPA',
      experience: '0-2 years',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Microservices', 'JavaScript', 'Redis'],
      applicationLink: 'https://razorpay.com/jobs',
      postedBy: vikram._id,
      isActive: true,
      deadline: new Date('2025-01-05')
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Swiggy',
      type: 'internship',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'Swiggy is looking for full stack developer interns to work on food delivery platform. You will get hands-on experience building features used by millions of users.',
      requirements: 'Currently in final year of B.Tech/B.E. Knowledge of React.js, Node.js, and databases. Passion for building user-centric products. Good problem-solving skills.',
      salary: '₹50,000/month',
      experience: '0 years (Students)',
      skills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
      applicationEmail: 'internships@swiggy.in',
      postedBy: arjun._id,
      isActive: true,
      deadline: new Date('2024-12-20')
    },
    {
      title: 'DevOps Engineer',
      company: 'Atlassian',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'hybrid',
      description: 'Atlassian is seeking DevOps engineers to manage and automate infrastructure. You will work on CI/CD pipelines, cloud infrastructure, and monitoring systems.',
      requirements: 'B.Tech in Computer Science or related field. Experience with Docker, Kubernetes, Jenkins. Knowledge of AWS/Azure cloud platforms. Understanding of infrastructure as code (Terraform, Ansible).',
      salary: '₹14-20 LPA',
      experience: '0-2 years',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Linux', 'CI/CD', 'Git'],
      applicationLink: 'https://www.atlassian.com/company/careers',
      postedBy: ananya._id,
      isActive: true,
      deadline: new Date('2025-01-25')
    },
    {
      title: 'Mobile App Developer - Android',
      company: 'PhonePe',
      type: 'full-time',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'PhonePe is hiring Android developers to build India\'s leading digital payments app. You will work on features used by 400M+ users.',
      requirements: 'B.Tech in Computer Science with strong Android development skills. Proficiency in Kotlin/Java. Experience with Android SDK, REST APIs. Understanding of Material Design principles.',
      salary: '₹12-18 LPA',
      experience: '0-2 years',
      skills: ['Android', 'Kotlin', 'Java', 'REST API', 'Material Design', 'Git', 'MVVM'],
      applicationEmail: 'careers@phonepe.com',
      postedBy: vikram._id,
      isActive: true,
      deadline: new Date('2025-01-12')
    },
    {
      title: 'AI/ML Research Intern',
      company: 'NVIDIA',
      type: 'internship',
      location: 'Bangalore, Karnataka',
      workMode: 'on-site',
      description: 'NVIDIA is looking for AI/ML research interns to work on cutting-edge deep learning projects. You will collaborate with world-class researchers and engineers.',
      requirements: 'Currently pursuing M.Tech/B.Tech in Computer Science with focus on AI/ML. Strong understanding of deep learning, neural networks. Experience with PyTorch/TensorFlow. Published research papers is a plus.',
      salary: '₹1,00,000/month',
      experience: '0 years (Students)',
      skills: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Python', 'Computer Vision', 'NLP', 'CUDA'],
      applicationLink: 'https://www.nvidia.com/en-in/about-nvidia/careers',
      postedBy: rajesh._id,
      isActive: true,
      deadline: new Date('2024-12-30')
    }
  ];
};

const createSampleAnnouncements = (users) => {
  const principal = users.find(u => u.email === 'principal@jyothyit.ac.in');

  return [
    {
      title: 'Campus Placement Drive - Amazon',
      content: 'Amazon will be conducting an on-campus placement drive on December 15-16, 2024. Eligible students: CSE, ISE, ECE (2025 batch). Package: 18-45 LPA. Register at placement portal by December 10th.',
      priority: 'urgent',
      createdBy: principal._id,
      isActive: true
    },
    {
      title: 'Winter Break Schedule',
      content: 'College will be closed for winter break from December 24, 2024 to January 2, 2025. Classes will resume on January 3, 2025. Hostel facilities will remain open.',
      priority: 'high',
      createdBy: principal._id,
      isActive: true
    },
    {
      title: 'Technical Fest - TechnoVision 2024',
      content: 'Annual technical fest TechnoVision 2024 will be held on December 20-21. Register your teams for coding competitions, hackathons, and technical workshops. Prizes worth ₹5 Lakhs!',
      priority: 'medium',
      createdBy: principal._id,
      isActive: true
    }
  ];
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Job.deleteMany({});
    await Announcement.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(sampleUsers);
    console.log('✅ Created sample users:', createdUsers.length);

    // Create posts
    const samplePosts = createSamplePosts(createdUsers);
    const createdPosts = await Post.create(samplePosts);
    console.log('✅ Created sample posts:', createdPosts.length);

    // Create jobs
    const sampleJobs = createSampleJobs(createdUsers);
    const createdJobs = await Job.create(sampleJobs);
    console.log('✅ Created sample jobs:', createdJobs.length);

    // Create announcements
    const sampleAnnouncements = createSampleAnnouncements(createdUsers);
    const createdAnnouncements = await Announcement.create(sampleAnnouncements);
    console.log('✅ Created sample announcements:', createdAnnouncements.length);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: principal@jyothyit.ac.in | Password: jit2024');
    console.log('Email: placement@jyothyit.ac.in | Password: jit2024');
    console.log('Email: rajesh.kumar@jyothyit.ac.in | Password: jit2024');
    console.log('Email: priya.sharma@jit.ac.in | Password: jit2024');
    console.log('Email: arjun.reddy@alumni.jit.ac.in | Password: jit2024');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
