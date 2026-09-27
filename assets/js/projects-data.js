/**
 * LEAV SIS - PORTFOLIO PROJECTS DATA
 * Authoritative Project Data Source
 */

const PROJECTS_DATA = [
    {
        id: "pnt-palace-hotel",
        number: "01",
        name: "PNT Palace Hotel",
        tagline: "Online Room Reservation System",
        category: "web",
        categoryLabel: "Web Platform",
        image: "assets/images/pnt_palace.png",
        technologies: ["Laravel", "PHP", "MySQL", "TailwindCSS", "JavaScript"],
        summary: "A comprehensive hospitality management and online booking platform designed for streamlined room reservations, payment verification, and automated administrative operations.",
        features: [
            "Online room & suite booking engine with date picker",
            "Meeting room & conference venue reservation module",
            "Real-time room availability checking & status updates",
            "Comprehensive booking lifecycle management",
            "Customer payment proof upload & verification system",
            "Automated PDF invoice generation & billing receipts",
            "Analytics reports on occupancy rates & revenue metrics",
            "Role-based administrative control panel"
        ],
        githubUrl: "#",
        demoUrl: "#"
    },
    {
        id: "agriconnect-cambodia",
        number: "02",
        name: "AgriConnect Cambodia",
        tagline: "Agriculture Social Platform",
        category: "mobile",
        categoryLabel: "Mobile & Web",
        image: "assets/images/agriconnect.png",
        technologies: ["Flutter", "Dart", "Node.js", "Express.js", "PostgreSQL", "Socket.IO"],
        summary: "A digital social platform connecting farmers, agricultural students, domain experts, and researchers across Cambodia for real-time knowledge sharing and community growth.",
        features: [
            "Community feed for agricultural discussions & crop updates",
            "Direct Q&A forum with agronomist experts and researchers",
            "Real-time instant messaging powered by Socket.IO",
            "Interactive crop catalog & disease diagnostic advice",
            "Farmer & student networking hub across Cambodian provinces",
            "Market price updates & agricultural news ticker",
            "Multi-language support with native Cambodian Khmer localization",
            "Cross-platform mobile client for iOS and Android"
        ],
        githubUrl: "#",
        demoUrl: "#"
    },
    {
        id: "ls-store-pos",
        number: "03",
        name: "LS STORE",
        tagline: "Point of Sale & Inventory Management",
        category: "enterprise",
        categoryLabel: "Enterprise Solution",
        image: "assets/images/ls_store.png",
        technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
        summary: "An enterprise-grade Point of Sale (POS) and inventory control solution built to streamline retail transactions, stock tracking, and sales analytics.",
        features: [
            "Fast checkout sales terminal with discount & tax calculations",
            "Product catalog management with categories & variant options",
            "Barcode reader integration for instant item scanning",
            "Real-time inventory level monitoring & low-stock alerts",
            "Sales transaction history with receipt printing support",
            "Daily, monthly, and annual revenue analytics reports",
            "Multi-user staff cash control & session tracking",
            "Customer relationship data management"
        ],
        githubUrl: "#",
        demoUrl: "#"
    },
    {
        id: "help-desk-system",
        number: "04",
        name: "Help Desk Management System",
        tagline: "IT Ticket & Issue Tracking Platform",
        category: "web",
        categoryLabel: "Management System",
        image: "assets/images/helpdesk.png",
        technologies: ["Laravel", "PHP", "MySQL", "TailwindCSS", "JavaScript"],
        summary: "A centralized IT support service desk platform enabling organizations to manage user tickets, assign agents, and monitor issue resolution lifecycles efficiently.",
        features: [
            "User self-service portal for ticket submission & status tracking",
            "Support Agent dashboard for ticket triage and response",
            "Categorized issue priority handling (Low, Medium, High, Urgent)",
            "Internal staff comments & file attachment capabilities",
            "Role-based user management (Users, Support Agents, Admins)",
            "Automated email & system notifications on ticket updates",
            "SLA performance reporting & ticket resolution analytics",
            "Filterable issue logs and historical audit search"
        ],
        githubUrl: "#",
        demoUrl: "#"
    }
];

// Export to global scope
window.PROJECTS_DATA = PROJECTS_DATA;
