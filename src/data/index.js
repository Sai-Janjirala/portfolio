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
            { name: "Redux", level: "Intermediate" },
            { name: "Tailwind CSS", level: "Advanced" }
        ]
    },
    {
        category: "Backend",
        color: "purple",
        skills: [
            { name: "Node.js", level: "Intermediate" },
            { name: "Express.js", level: "Intermediate" },
            { name: "REST APIs", level: "Intermediate" },
            { name: "C/C++", level: "Intermediate" }
        ]
    },
    {
        category: "Database",
        color: "emerald",
        skills: [
            { name: "MongoDB", level: "Intermediate" }
        ]
    },
    {
        category: "DevOps & Tools",
        color: "amber",
        skills: [
            { name: "Git", level: "Advanced" },
            { name: "GitHub", level: "Advanced" },
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
        title: "media search",
        description: "A custom media search website featuring dynamic photos and videos elements.",
        tech: ["tailwind css", "redux", "react"],
        link: "",
        github: "https://github.com/Sai-Janjirala",
        image: "https://images.unsplash.com/photo-1696041760189-d9296026e1c8?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "Marvel Studios Clone",
        description: "A custom Marvel Studios website featuring dynamic layouts and interactive elements.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://mediaa-search.netlify.app/",
        github: "https://github.com/Sai-Janjirala",
        image: "https://i.pinimg.com/1200x/5a/80/a6/5a80a6086e028cedf49061152a9792a3.jpg"
    },
    {
        id: 3,
        title: "Snake Game",
        description: "A classic snake game with modern UI and smooth gameplay.",
        tech: ["HTML", "CSS", "javascript"],
        link: "https://sai-snakegame.netlify.app/",
        github: "https://github.com/Sai-Janjirala",
        image: "https://i.pinimg.com/736x/a7/d1/8c/a7d18ca3395aefdc09f1e6acd88bfce7.jpg"
    },
    {
        id: 4,
        title: "web gallery",
        description: "A custom web gallery featuring dynamic photos and videos elements.",
        tech: ["tailwind css", "react"],
        link: "web-galleryy.netlify.app",
        github: "https://github.com/Sai-Janjirala",
        image: "https://i.pinimg.com/736x/66/bf/ea/66bfeaa804739e6172081c6e59c631cd.jpg"
    },
    {
        id: 5,
        title: "nike store",
        description: "A custom nike store website featuring dynamic layouts and interactive elements.",
        tech: ["react", " tailwind CSS"],
        link: "nikee-storee.netlify.app",
        github: "https://github.com/Sai-Janjirala",
        image: "https://i.pinimg.com/1200x/15/36/a8/1536a86a6be93707cb8a103dfad53a4f.jpg"
    },
    {
        id: 6,
        title: "notes app",
        description: "A custom notes app featuring dynamic layouts and interactive elements.",
        tech: ["tailwind CSS", "react"],
        link: "https://notesss-app.netlify.app/",
        github: "https://github.com/Sai-Janjirala",
        image: "https://i.pinimg.com/736x/de/79/1b/de791bd00cb1aec78474674f084abc1d.jpg"
    }
];

export const CERTIFICATIONS = [
    {
        id: 1,
        title: "HackTheSpring '26 Participation",
        issuer: "Hack.X at GEC, Gandhinagar",
        date: "Feb 2026",
        description: "Participated and showcased innovative solutions at the HackTheSpring '26 state-level hackathon. Gained hands-on experience in rapid prototyping and teamwork under pressure.",
        image: "/certificates/hack_the_spring.jpg"
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
        title: "Solutions Architecture Job Simulation",
        issuer: "AWS & Forage",
        date: "Feb 2026",
        description: "Completed practical tasks in designing simple, scalable hosting architectures on AWS. Learned how to leverage cloud services to optimize application deployments visually.",
        image: "/certificates/aws_forage.png"
    }
];

export const SOCIALS = [
    { name: "GitHub", url: "https://github.com/Sai-Janjirala", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sai-janjirala-5704a6394/", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter },
    { name: "Youtube", url: "https://www.youtube.com/@Saii-Janjirala", icon: Youtube },
    { name: "LeetCode", url: "https://leetcode.com/u/sai_janjirala/", icon: SiLeetcode },
];
