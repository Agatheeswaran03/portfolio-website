const mongoose = require('mongoose');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Experience = require('./models/Experience');
require('dotenv').config();

const projects = [
    {
        title: "AI-Powered Task Manager",
        desc: "Smart application that uses OpenAI to prioritize daily tasks based on urgency and complexity.",
        tags: ["Python", "OpenAI", "React"],
        status: "Dev",
        features: [
            "Natural Language Processing to understand task context",
            "Automatic priority sorting based on Eisenhower Matrix",
            "Dark mode support and mobile-responsive design",
            "Real-time sync across devices"
        ]
    },
    {
        title: "Premium Portfolio",
        desc: "The website you are looking at! Built with React, Tailwind CSS and Framer Motion concepts.",
        tags: ["React", "Tailwind", "UX/UI"],
        status: "Live",
        features: [
            "Glassmorphism design system",
            "Interactive 3D hover effects using Framer Motion",
            "Mobile-first responsive layout",
            "Performance optimized assets"
        ]
    },
    {
        title: "Data Analysis Dashboard",
        desc: "Interactive dashboard for visualizing large datasets using D3.js and MERN stack.",
        tags: ["MongoDB", "Express", "React", "Node.js"],
        status: "Prototype",
        features: [
            "Real-time data visualization with D3.js",
            "Customizable widgets and reporting tools",
            "Role-based access control (RBAC)",
            "Export data to PDF and Excel formats"
        ]
    }
];

const certificates = [
    {
        title: "Full Stack Web Development",
        issuer: "EDU TANTR",
        date: "Dec 10, 2025",
        type: "Internship",
        image: "/image/cert-edutantr.png"
    },
    {
        title: "Full Stack Web Development Internship",
        issuer: "Pantech Solutions",
        date: "July 2025",
        type: "Internship",
        image: "/image/cert-pantech.jpg"
    },
    {
        title: "MongoDB Basics",
        issuer: "MongoDB Inc.",
        date: "Aug 16, 2025",
        type: "Backend",
        image: "/image/cert-mongo.jpg"
    },
    {
        title: "Introduction to HTML",
        issuer: "Simplilearn",
        date: "Sep 24, 2025",
        type: "Frontend",
        image: "/image/cert-html.jpg"
    },
    {
        title: "Python Programming",
        issuer: "GUVI",
        date: "April 23, 2025",
        type: "Programming",
        image: "/image/cert-python.jpg"
    },
    {
        title: "ChatGPT for Everyone",
        issuer: "GUVI",
        date: "April 23, 2025",
        type: "AI / ML",
        image: "/image/cert-chatgpt.jpg"
    },
    {
        title: "AI Tools Workshop",
        issuer: "be10x",
        date: "May 4, 2025",
        type: "Workshop",
        image: "/image/cert-ai.jpg"
    }
];

const experience = [
    {
        title: "Full Stack Web Development Intern",
        company: "EDU TANTR",
        period: "Sep 2025 - Dec 2025",
        description: "Successfully completed internship program focusing on Full Stack Web Development. Actively participated in assigned tasks and gained practical exposure to professional work settings.",
        type: "Internship",
        certificateImage: "/image/cert-edutantr.png"
    },
    {
        title: "Full Stack Web Development Intern",
        company: "Pantech Solutions",
        period: "July 2025 - Present",
        description: "Currently spearheading the development of scalable web applications using the MERN stack. Collaborating with cross-functional teams to integrate AI features into traditional web architectures.",
        type: "Internship",
        certificateImage: "/image/cert-pantech.jpg"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolioDB');
        console.log("Connected to MongoDB");

        await Project.deleteMany({});
        await Certificate.deleteMany({});
        await Experience.deleteMany({});

        await Project.insertMany(projects);
        await Certificate.insertMany(certificates);
        await Experience.insertMany(experience);

        console.log("Database seeded successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
