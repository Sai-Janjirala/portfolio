import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

export const SKILL_CATEGORIES = [
    {
        category: "Frontend",
        color: "cyan",
        skills: [
            { name: "HTML5", level: "Advanced" },
            { name: "CSS3", level: "Advanced" },
            { name: "JavaScript", level: "Advanced" },
            { name: "TypeScript", level: "Intermediate" },
            { name: "React.js", level: "Advanced" },
            { name: "Next.js", level: "Intermediate" },
            { name: "Tailwind CSS", level: "Advanced" },
            { name: "Redux", level: "Intermediate" }
        ]
    },
    {
        category: "Backend",
        color: "purple",
        skills: [
            { name: "Node.js", level: "Intermediate" },
            { name: "Express.js", level: "Intermediate" },
            { name: "REST APIs", level: "Intermediate" },
            { name: "Python", level: "Intermediate" },
            { name: "C/C++", level: "Intermediate" }
        ]
    },
    {
        category: "Database",
        color: "emerald",
        skills: [
            { name: "MongoDB", level: "Intermediate" },
            { name: "SQL", level: "Intermediate" }
        ]
    },
    {
        category: "DevOps & Tools",
        color: "amber",
        skills: [
            { name: "JWT", level: "Intermediate" },
            { name: "Git", level: "Advanced" },
            { name: "GitHub", level: "Advanced" },
            { name: "Docker", level: "Intermediate" },
            { name: "Postman", level: "Intermediate" },
            { name: "Netlify", level: "Intermediate" },
            { name: "Vercel", level: "Intermediate" },
            { name: "npm", level: "Advanced" }
        ]
    },
    {
        category: "Design",
        color: "pink",
        skills: [
            { name: "Figma", level: "Intermediate" },
            { name: "Canva", level: "Advanced" },
            { name: "Responsive Design", level: "Advanced" },
            { name: "UI/UX Principles", level: "Intermediate" }
        ]
    },
];

// Keep backward-compatible flat list
export const TOOLS = SKILL_CATEGORIES.flatMap(cat => cat.skills);

export const PROJECTS = [
    {
        id: 1,
        title: "Shruviq – AI Customer Experience Platform",
        description: "AI-powered customer experience platform converting text & voice feedback into insights. Built sentiment analytics dashboard using Groq, Llama 3.3, and Whisper. Hack-Aarambh 2026 – 2nd Runner-Up.",
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Groq", "Whisper", "Llama 3.3"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: "/projects/shruviq.jpg"
    },
    {
        id: 2,
        title: "Academizer – AI Academic Management",
        description: "AI-powered academic management platform to reduce teacher administrative workload. Built student record analytics, attendance tracking, AI insights, and automated PDF reports. CRAFTATHON 2026 – Finalist.",
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "SQL"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: "/projects/academizer.jpg"
    },
    {
        id: 3,
        title: "MERN E-Commerce Platform",
        description: "Full-stack MERN e-commerce application featuring JWT authentication, product CRUD, advanced search & filtering, cart management, and administrative product controls.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: "/projects/ecommerce.jpg"
    },
    {
        id: 4,
        title: "MERN Service Booking Platform",
        description: "Freelance production client application for service booking workflows, real-time availability, secure user authentication, database operations, and admin management.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "SQL", "REST APIs"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Marvel Studios Clone",
        description: "A custom Marvel Studios website featuring dynamic layouts and interactive elements.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://mediaa-search.netlify.app/",
        github: "https://github.com/Sai-Janjirala/javascript/tree/Main/modern%20webpage",
        image: "https://i.pinimg.com/1200x/5a/80/a6/5a80a6086e028cedf49061152a9792a3.jpg"
    },
    {
        id: 6,
        title: "Snake Game",
        description: "A classic snake game with modern UI and smooth gameplay.",
        tech: ["HTML", "CSS", "javascript"],
        link: "https://sai-snakegame.netlify.app/",
        github: "https://github.com/Sai-Janjirala/javascript/tree/Main/snakegame",
        image: "https://i.pinimg.com/736x/a7/d1/8c/a7d18ca3395aefdc09f1e6acd88bfce7.jpg"
    }
];

export const CERTIFICATIONS = [
    {
        id: 1,
        title: "Solutions Architecture Job Simulation",
        issuer: "AWS & Forage",
        date: "Feb 2026",
        description: "Completed practical tasks in designing simple, scalable hosting architectures on AWS. Learned how to leverage cloud services to optimize application deployments visually.",
        image: "/certificates/aws_forage.png"
    },
    {
        id: 2,
        title: "Odoo x Adani Hackathon '26",
        issuer: "Adani University & Unstop",
        date: "2026",
        description: "Contributed to building real-world software solutions during the Odoo x Adani Hackathon. Successfully navigated complex problem statements and pitched a functional application.",
        image: "/certificates/adani_hackathon.png"
    },
    {
        id: 3,
        title: "ICETAI 2026 Certificate of Participation",
        issuer: "ICETAI 2026 Conference",
        date: "2026",
        description: "Earned Certificate of Participation as a core team member of the MedSentry research project presented at ICETAI 2026.",
        image: "/certificates/hack_the_spring.jpg"
    }
];

export const SOCIALS = [
    { name: "GitHub", url: "https://github.com/Sai-Janjirala", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sai-janjirala-5704a6394/", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter },
    { name: "Youtube", url: "https://www.youtube.com/@Saii-Janjirala", icon: Youtube },
    { name: "LeetCode", url: "https://leetcode.com/u/sai_janjirala/", icon: SiLeetcode },
];
