import assetVaultImg from "../../imports/asset-vault.png";
import digitalRmImg from "../../imports/digital-rm.png";
import digitalTwinImg from "../../imports/digital-twin.png";
import medpacImg from "../../imports/medpac.png";
import udbLogo from "../../imports/udb_logo.svg";
import lifeplusHubImg from "../../imports/lifeplus-hub.png";
import optiPanelImg from "../../imports/opti-panel.png";
import pmsImg from "../../imports/pms.png";
import virtuState from "../../imports/virtu-state.png";
import virtuTour from "../../imports/virtu-tour.png";

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  logoInitial: string;
  logo: string;
  logoColor: string;
  accentColor: string;
  cardBg: string;
  year: string;
  duration: string;
  role: string; // "team" / discipline label in the UI
  overview: string;
  problem: string;
  process: { title: string; description: string }[];
  features: { title: string; description: string }[];
  metrics: { label: string; value: string; change: string }[];
  tags: string[];
  mockupBg: string;
  mockupPattern: string;
  pdfUrl?: string; // path to PDF in /public/pdf/
  siteUrl?: string;
}

export const projects: Project[] = [
  {
    id: "asset-vault",
    name: "Asset Vault",
    category: "Enterprise · Data Security",
    tagline: "Secure digital asset storage for enterprise organizations",
    logoInitial: "AV",
    logo: assetVaultImg,
    logoColor: "#0776BD",
    accentColor: "#0776BD",
    cardBg: "linear-gradient(135deg, #EEF4FF 0%, #DBEAFE 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "Product & Engineering",
    overview:
      "Asset Vault is a secure digital asset storage solution designed for industrial and corporate organizations to manage, organize, and retrieve valuable digital resources in a centralized system.",
    problem:
      "Enterprises struggle with fragmented storage systems, making it difficult to securely manage and retrieve critical digital assets across teams and departments.",
    process: [
      {
        title: "Requirement Analysis",
        description:
          "Worked with enterprise clients to understand secure storage needs and compliance requirements for sensitive digital assets.",
      },
      {
        title: "System Architecture",
        description:
          "Designed a scalable and secure architecture for centralized asset management with role-based access control.",
      },
      {
        title: "Security Implementation",
        description:
          "Implemented encryption, access policies, and audit logging to ensure enterprise-grade data protection.",
      },
    ],
    features: [
      {
        title: "Centralized Asset Storage",
        description:
          "Single platform to store, manage, and retrieve all digital assets securely.",
      },
      {
        title: "Role-Based Access Control",
        description:
          "Granular permissions for teams, departments, and external stakeholders.",
      },
      {
        title: "Secure Audit Logs",
        description:
          "Track every asset interaction for compliance and security monitoring.",
      },
    ],
    metrics: [],
    tags: ["Enterprise", "Security", "Data Management"],
    mockupBg: "#EEF4FF",
    mockupPattern: "data",
    pdfUrl: "/pdf/Lifeplus_Asset_Management_Doc.pdf",
    siteUrl: "",
  },

  {
    id: "opti-panel",
    name: "Opti Panel",
    category: "Industrial · SCADA System",
    tagline: "Centralized SCADA system for industrial automation",
    logoInitial: "OP",
    logo: optiPanelImg,
    logoColor: "#8B5CF6",
    accentColor: "#8B5CF6",
    cardBg: "linear-gradient(135deg, #F5F0FF 0%, #EDE9FE 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "Industrial Software Engineering",
    overview:
      "Opti Panel is an industrial SCADA system that provides real-time monitoring and control for large-scale manufacturing operations.",
    problem:
      "Manufacturing industries often rely on fragmented control systems, leading to inefficiencies and delayed operational responses.",
    process: [
      {
        title: "Industrial Workflow Study",
        description:
          "Analyzed manufacturing operations to identify automation and monitoring gaps.",
      },
      {
        title: "Control System Design",
        description:
          "Built a centralized SCADA architecture for real-time machine and process control.",
      },
      {
        title: "Integration Layer",
        description:
          "Connected hardware systems with software interfaces for seamless communication.",
      },
    ],
    features: [
      {
        title: "Real-Time Monitoring",
        description: "Live tracking of industrial machines and processes.",
      },
      {
        title: "Central Control Hub",
        description: "Unified dashboard for managing factory operations.",
      },
      {
        title: "Alert System",
        description: "Instant alerts for system failures and anomalies.",
      },
    ],
    metrics: [],
    tags: ["SCADA", "Industrial", "Automation"],
    mockupBg: "#F5F0FF",
    mockupPattern: "industrial",
    pdfUrl: "/pdf/optipanel-scada-feature-brief.pdf",
    siteUrl: "https://opti.lifeplusbd.tech/",
  },

  {
    id: "digital-twin",
    name: "medpac",
    category: "Healthcare · PACS + AI",
    tagline: "PACS with a built-in AI second opinion",
    logoInitial: "MP",
    logo: medpacImg,
    logoColor: "#D11F3C",
    accentColor: "#D11F3C",
    cardBg: "linear-gradient(135deg, #FFF1F3 0%, #FFE4E8 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "Medical Imaging & Full-Stack Engineering",
    overview:
      "medpac is a PACS (Picture Archiving & Communication System) for medical imaging with an AI second-opinion engine built in — clinicians review DICOM studies in the browser while an integrated AI model delivers an automated second read alongside.",
    problem:
      "Radiology teams are overloaded and second opinions are slow and costly, while legacy PACS stay vendor-locked and desktop-bound.",
    process: [
      {
        title: "PACS & Archive",
        description:
          "Vendor-neutral archive and DICOMweb services that ingest and store studies from any modality.",
      },
      {
        title: "AI Second Opinion",
        description:
          "Integrated AI models that analyze each study and draft a structured second-read report.",
      },
    ],
    features: [
      {
        title: "Browser DICOM Viewer",
        description: "Zero-install web viewer for CT/MR/CR review on any device.",
      },
      {
        title: "AI Second Opinion",
        description: "Automated AI analysis and report drafting alongside the radiologist.",
      },
    ],
    metrics: [],
    tags: ["PACS", "DICOM", "AI"],
    mockupBg: "#FFF1F3",
    mockupPattern: "health",
    pdfUrl: "/pdf/medpac-VNA-PACS.pdf",
    siteUrl: "https://medpac.lifeplusbd.tech/",
  },

  {
    id: "digital-rm",
    name: "DigitalRM",
    category: "AI · Digital Employee",
    tagline: "Agentic AI digital employee (Aria)",
    logoInitial: "RM",
    logo: digitalRmImg,
    logoColor: "#F59E0B",
    accentColor: "#F59E0B",
    cardBg: "linear-gradient(135deg, #FFF8ED 0%, #FEF3C7 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "AI Product Engineering",
    overview:
      "DigitalRM is an AI digital employee — Aria — that runs enterprise relationship-management workflows with explicit agentic reasoning (plan → act → observe → reflect) over a typed datastore, reachable through webchat and WhatsApp.",
    problem:
      "Organizations carry high operational costs and slow turnaround in manual relationship-management and support workflows.",
    process: [
      {
        title: "Agentic Engine",
        description:
          "Built a plan → act → observe → reflect reasoning runtime over tiered models.",
      },
      {
        title: "Typed Memory & Audit",
        description:
          "Grounded the agent on a typed gRPC datastore for durable memory, auth, and an audit trail.",
      },
    ],
    features: [
      {
        title: "Multi-Channel",
        description: "One agent reachable via webchat and WhatsApp.",
      },
      {
        title: "Proactive Reminders",
        description: "Schedules tasks and follows up without being asked.",
      },
    ],
    metrics: [],
    tags: ["AI", "Agent", "Automation"],
    mockupBg: "#FFF8ED",
    mockupPattern: "ai",
    pdfUrl: "/pdf/digitalrm-employee-brief.pdf",
    siteUrl: "",
  },

  {
    id: "pms",
    name: "PMS",
    category: "Healthcare · Pharmacy System",
    tagline: "Pharmacy management and billing automation system",
    logoInitial: "PM",
    logo: pmsImg,
    logoColor: "#10B981",
    accentColor: "#10B981",
    cardBg: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    year: "2023",
    duration: "Ongoing",
    role: "Backend & Product Engineering",
    overview:
      "PMS automates pharmacy inventory, prescription tracking, and billing operations for healthcare retail businesses.",
    problem:
      "Pharmacies often struggle with manual inventory tracking and billing errors.",
    process: [
      {
        title: "System Design",
        description:
          "Designed pharmacy-focused data model for inventory and sales tracking.",
      },
      {
        title: "Billing Engine",
        description: "Built automated billing and invoice generation system.",
      },
    ],
    features: [
      {
        title: "Inventory Management",
        description: "Real-time stock tracking of medicines.",
      },
      {
        title: "Prescription Tracking",
        description: "Digital prescription records and history.",
      },
    ],
    metrics: [],
    tags: ["Healthcare", "Pharmacy", "ERP"],
    mockupBg: "#ECFDF5",
    mockupPattern: "health",
    pdfUrl: "/pdf/Lifeplus_Model_Pharma_Doc_White.pdf",
    siteUrl: "",
  },

  {
    id: "lifeplus-hub",
    name: "Lifeplus Hub",
    category: "Media · Communication Platform",
    tagline: "Centralized media and brand communication hub",
    logoInitial: "LH",
    logo: lifeplusHubImg,
    logoColor: "#3B82F6",
    accentColor: "#3B82F6",
    cardBg: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "Full-Stack Engineering",
    overview:
      "Lifeplus Hub is a centralized platform for managing media content, branding materials, and digital communication streams.",
    problem:
      "Organizations lack unified systems to manage media assets and brand communication.",
    process: [
      {
        title: "Content Architecture",
        description:
          "Designed structured media management system for scalable content handling.",
      },
      {
        title: "Integration System",
        description: "Unified multiple media channels into a single platform.",
      },
    ],
    features: [
      {
        title: "Media Management",
        description: "Centralized storage for multimedia assets.",
      },
      {
        title: "Brand Communication Tools",
        description: "Streamlined communication across teams.",
      },
    ],
    metrics: [],
    tags: ["Media", "Communication", "Enterprise"],
    mockupBg: "#EFF6FF",
    mockupPattern: "media",
    pdfUrl: "/pdf/Lifeplus_Broadcast_System_Doc.pdf",
    siteUrl: "",
  },

  {
    id: "virtustate",
    name: "VirtuState",
    category: "Real Estate · Property Tech",
    tagline: "Smart digital platform for real estate management",
    logoInitial: "LE",
    logo: virtuState,
    logoColor: "#EC4899",
    accentColor: "#EC4899",
    cardBg: "linear-gradient(135deg, #FFF0F7 0%, #FCE7F3 100%)",
    year: "2023",
    duration: "Ongoing",
    role: "Product & Engineering",
    overview:
      "Life Estate provides digital solutions for property management, listings, and real estate business automation.",
    problem:
      "Real estate businesses struggle with inefficient property tracking and customer management.",
    process: [
      {
        title: "Market Research",
        description:
          "Studied real estate workflows and pain points in property management.",
      },
      {
        title: "Platform Development",
        description:
          "Built listing and property management system with admin tools.",
      },
    ],
    features: [
      {
        title: "Property Listings",
        description: "Digital catalog of available properties.",
      },
      {
        title: "Client Management",
        description: "Track leads and property buyers.",
      },
    ],
    metrics: [],
    tags: ["Real Estate", "PropTech", "CRM"],
    mockupBg: "#FFF0F7",
    mockupPattern: "realestate",
    pdfUrl: "/pdf/Virtual_Estate_Overview.pdf",
    siteUrl: "https://estate.lifeplusbd.tech/",
  },

  {
    id: "virtutour",
    name: "VirtuTour",
    category: "VR . Platform",
    tagline: "Smart VR travel planning and booking system",
    logoInitial: "LT",
    logo: virtuTour,
    logoColor: "#14B8A6",
    accentColor: "#14B8A6",
    cardBg: "linear-gradient(135deg, #EDFAFA 0%, #CCFBF1 100%)",
    year: "2023",
    duration: "Ongoing",
    role: "Product & Engineering",
    overview:
      "VirtuTour is a travel platform offering smart booking, itinerary planning, and tourism service management.",
    problem:
      "Travel planning is fragmented across multiple platforms, making it inefficient for users.",
    process: [
      {
        title: "Travel Flow Design",
        description:
          "Designed end-to-end booking and itinerary planning system.",
      },
      {
        title: "Service Integration",
        description:
          "Integrated hotels, tours, and transport providers into one platform.",
      },
    ],
    features: [
      {
        title: "Smart Booking",
        description: "Unified travel booking system.",
      },
      {
        title: "Itinerary Planner",
        description: "Personalized travel planning experience.",
      },
    ],
    metrics: [],
    tags: ["Travel", "Tourism", "Booking"],
    mockupBg: "#EDFAFA",
    mockupPattern: "travel",
    pdfUrl: "/pdf/file-sample_150kB.pdf",
    siteUrl: "https://tourism.lifeplusbd.tech/",
  },

  {
    id: "udb",
    name: "udb",
    category: "Infrastructure · Data Broker",
    tagline: "One typed gRPC API over many databases",
    logoInitial: "UDB",
    logo: udbLogo,
    logoColor: "#0EA5E9",
    accentColor: "#0EA5E9",
    cardBg: "linear-gradient(135deg, #EEF7FF 0%, #E0F2FE 100%)",
    year: "2024",
    duration: "Ongoing",
    role: "Platform & Systems Engineering",
    overview:
      "UDB (Universal Data Broker) is a proto-driven broker that exposes one typed gRPC API over 18+ databases — define entities in protobuf and get auth, audit, CDC, migrations and multi-backend SQL compilation. The live demo runs the real parser, catalog and IR compiler in your browser via WebAssembly.",
    problem:
      "Teams glue many databases together with bespoke, untyped code — no unified auth, audit, schema control or portability across backends.",
    process: [
      {
        title: "Proto-Driven Catalog",
        description:
          "Define entities once in protobuf; UDB derives schema, migrations and a typed API across every backend.",
      },
      {
        title: "Portable Engine (WASM)",
        description:
          "The parser, AST/IR compiler and checksum engine compile to WebAssembly to run anywhere — even the browser.",
      },
    ],
    features: [
      {
        title: "One Typed API",
        description: "gRPC over 18+ SQL, NoSQL, vector and object backends.",
      },
      {
        title: "In-Browser Playground",
        description: "Real IR-compiled SQL and manifest generation via WASM.",
      },
    ],
    metrics: [],
    tags: ["gRPC", "Protobuf", "Databases"],
    mockupBg: "#EEF7FF",
    mockupPattern: "logistics",
    pdfUrl: "/pdf/udb-protocol-plus-product-overview.pdf",
    siteUrl: "https://udb.lifeplusbd.tech/",
  },
];
