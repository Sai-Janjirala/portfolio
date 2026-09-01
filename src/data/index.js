import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import shruviqImg from '../assets/projects/shruviq.jpg';
import academizerImg from '../assets/projects/academizer.jpg';
import ecommerceImg from '../assets/projects/ecommerce.jpg';

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
        image: shruviqImg
    },
    {
        id: 2,
        title: "Academizer – AI Academic Management",
        description: "AI-powered academic management platform to reduce teacher administrative workload. Built student record analytics, attendance tracking, AI insights, and automated PDF reports. CRAFTATHON 2026 – Finalist.",
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "SQL"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: academizerImg
    },
    {
        id: 3,
        title: "MERN E-Commerce Platform",
        description: "Full-stack MERN e-commerce application featuring JWT authentication, product CRUD, advanced search & filtering, cart management, and administrative product controls.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: ecommerceImg
    },
    {
        id: 4,
        title: "Marvel Studios Clone",
        description: "A custom Marvel Studios website featuring dynamic layouts and interactive elements.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://mediaa-search.netlify.app/",
        github: "https://github.com/Sai-Janjirala/javascript/tree/Main/modern%20webpage",
        image: "https://i.pinimg.com/1200x/5a/80/a6/5a80a6086e028cedf49061152a9792a3.jpg"
    },
    {
        id: 5,
        title: "Snake Game",
        description: "A classic snake game with modern UI and smooth gameplay.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://sai-snakegame.netlify.app/",
        github: "https://github.com/Sai-Janjirala/javascript/tree/Main/snakegame",
        image: "https://i.pinimg.com/736x/a7/d1/8c/a7d18ca3395aefdc09f1e6acd88bfce7.jpg"
    },
    {
        id: 6,
        title: "Web Gallery",
        description: "A custom web gallery featuring dynamic photo and video media elements.",
        tech: ["React.js", "Tailwind CSS"],
        link: "https://web-galleryy.netlify.app/",
        github: "https://github.com/Sai-Janjirala/react-js/tree/Main/gallery",
        image: "https://i.pinimg.com/736x/66/bf/ea/66bfeaa804739e6172081c6e59c631cd.jpg"
    },
    {
        id: 7,
        title: "Nike Store",
        description: "A custom Nike store website featuring dynamic layouts and interactive elements.",
        tech: ["React.js", "Tailwind CSS"],
        link: "https://nikee-storee.netlify.app/",
        github: "https://github.com/Sai-Janjirala/react-js/tree/Main/project_1",
        image: "https://i.pinimg.com/1200x/15/36/a8/1536a86a6be93707cb8a103dfad53a4f.jpg"
    },
    {
        id: 8,
        title: "Notes App",
        description: "A custom notes application featuring dynamic layouts, search, and intuitive note management.",
        tech: ["React.js", "Tailwind CSS"],
        link: "https://notesss-app.netlify.app/",
        github: "https://github.com/Sai-Janjirala/react-js/tree/Main/notes-app",
        image: "https://i.pinimg.com/736x/de/79/1b/de791bd00cb1aec78474674f084abc1d.jpg"
    }
];

export const CERTIFICATIONS = [
    {
        id: 1,
        title: "ICETAI 2026 – Research Paper Presentation",
        issuer: "Rai University, Ahmedabad (Certificate No: ICETAI/2026/063)",
        date: "July 30-31, 2026",
        description: "Presented research paper titled 'MedSentry: Lightweight XAI-Powered Intrusion Detection System for Internet of Medical Things (IoMT)' at the International Conference on Emerging Trends in AI–ML & Innovation.",
        image: "/certificates/icetai_cert.jpg"
    },
    {
        id: 2,
        title: "Solutions Architecture Job Simulation",
        issuer: "AWS & Forage",
        date: "Feb 2026",
        description: "Completed practical tasks in designing simple, scalable hosting architectures on AWS. Learned how to leverage cloud services to optimize application deployments visually.",
        image: "/certificates/aws_forage.png"
    },
    {
        id: 3,
        title: "HackTheSpring '26 Participation",
        issuer: "Government Engineering College (GEC), Gandhinagar",
        date: "Feb 2026",
        description: "Participated in the state-level 36-hour HackTheSpring '26 hackathon at GEC Gandhinagar, constructing full-stack data loop models.",
        image: "/certificates/hack_the_spring.jpg"
    },
    {
        id: 4,
        title: "Odoo x Adani Hackathon '26",
        issuer: "Adani University & Unstop",
        date: "2026",
        description: "Contributed to building real-world software solutions during the Odoo x Adani Hackathon. Successfully navigated complex problem statements and pitched a functional application.",
        image: "/certificates/adani_hackathon.png"
    }
];

export const SOCIALS = [
    { name: "GitHub", url: "https://github.com/Sai-Janjirala", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sai-janjirala-5704a6394/", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter },
    { name: "Youtube", url: "https://www.youtube.com/@Saii-Janjirala", icon: Youtube },
    { name: "LeetCode", url: "https://leetcode.com/u/sai_janjirala/", icon: SiLeetcode },
];
