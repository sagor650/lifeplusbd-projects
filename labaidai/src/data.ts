export type ProductId =
  | "luna"
  | "retina-flve"
  | "digital-rm"
  | "medpac"
  | "teleicu"
  | "pacman"
  | "interface-board";

export type Month = "PRIOR" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER";

export type Product = {
  id: ProductId;
  name: string;
  division: "Software" | "Hardware";
  description: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  visual?: "oem" | "face-scan";
  accent: string;
  ink: string;
  wash: string;
};

export type Milestone = {
  slug: string;
  productId: ProductId;
  month: Month;
  exactDate: string;
  version?: string;
  title: string;
  kpi: string;
  status: "Verified" | "Committed" | "Target" | "Proposed" | "Gated" | "External gate";
  release?: true;
};

export const months: Month[] = ["PRIOR", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

export const products: Product[] = [
  {
    id: "luna",
    name: "LUNA",
    division: "Software",
    description: "Patient-facing healthcare AI assistant",
    image: "/luna-avatar.png",
    imageAlt: "LUNA assistant avatar",
    imagePosition: "50% 22%",
    accent: "#2f80ed",
    ink: "#123f78",
    wash: "#eaf4ff",
  },
  {
    id: "retina-flve",
    name: "Retina-FLVE",
    division: "Software",
    description: "Face liveness, verification + eKYC for Labaid InsureTech",
    visual: "face-scan",
    accent: "#dc7a1f",
    ink: "#7c420d",
    wash: "#fff2e5",
  },
  {
    id: "digital-rm",
    name: "DigitalRM",
    division: "Software",
    description: "Aria · universal personal digital employee",
    image: "/digitalrm-workspace.png",
    imageAlt: "DigitalRM personal digital employee workspace",
    imagePosition: "38% 12%",
    accent: "#8759e8",
    ink: "#4f278e",
    wash: "#f2ecff",
  },
  {
    id: "medpac",
    name: "MedPAC",
    division: "Software",
    description: "Medical imaging and reporting workflow",
    image: "/medpac-workspace.png",
    imageAlt: "MedPAC reporting workspace",
    imagePosition: "50% 25%",
    accent: "#23a36d",
    ink: "#145d40",
    wash: "#e8f8ef",
  },
  {
    id: "teleicu",
    name: "TeleICU",
    division: "Software",
    description: "Remote critical-care monitoring",
    image: "/teleicu-monitoring.jpg",
    imageAlt: "Clinical bedside monitoring equipment",
    imagePosition: "50% 45%",
    accent: "#d94b8b",
    ink: "#812a55",
    wash: "#ffedf6",
  },
  {
    id: "pacman",
    name: "PacMan Node",
    division: "Hardware",
    description: "MedPAC DICOM sync node · OEM delivered",
    image: "/pacman-logo.png",
    imageAlt: "PacMan DICOM Sync product logo",
    imagePosition: "50% 36%",
    accent: "#5570dc",
    ink: "#30458d",
    wash: "#edf0ff",
  },
  {
    id: "interface-board",
    name: "Interface Board",
    division: "Hardware",
    description: "Chinese OEM development and delivery",
    visual: "oem",
    accent: "#168f91",
    ink: "#0b5f61",
    wash: "#e7f8f7",
  },
];

export const milestones: Milestone[] = [
  {
    slug: "luna-live-launch",
    productId: "luna",
    month: "AUGUST",
    exactDate: "August 1, 2026",
    version: "Launch",
    title: "Web, iOS, Android + training",
    kpi: "Production access opened",
    status: "Verified",
    release: true,
  },
  {
    slug: "luna-akhil-prism",
    productId: "luna",
    month: "AUGUST",
    exactDate: "August 15, 2026",
    title: "AKHIL API + Prism dashboard",
    kpi: "Usage and operating cost visible",
    status: "Committed",
  },
  {
    slug: "luna-doctors-edition",
    productId: "luna",
    month: "SEPTEMBER",
    exactDate: "September 15, 2026",
    title: "Doctors edition",
    kpi: "Clinician pilot usable",
    status: "Target",
  },
  {
    slug: "luna-reports-erx",
    productId: "luna",
    month: "OCTOBER",
    exactDate: "October 15, 2026",
    title: "Reports + e-prescription",
    kpi: "Report and e-prescription journeys connected",
    status: "Target",
  },
  {
    slug: "retina-flve-ekyc-delivered",
    productId: "retina-flve",
    month: "PRIOR",
    exactDate: "January 15, 2026",
    version: "Version 1.0",
    title: "Delivered · Labaid InsureTech eKYC",
    kpi: "Production eKYC delivered",
    status: "Verified",
    release: true,
  },
  {
    slug: "retina-flve-ekyc-v11",
    productId: "retina-flve",
    month: "SEPTEMBER",
    exactDate: "September 10, 2026",
    version: "Version 1.1",
    title: "eKYC upgrade",
    kpi: "Upgrade accepted by Labaid InsureTech",
    status: "Target",
    release: true,
  },
  {
    slug: "digital-rm-v01",
    productId: "digital-rm",
    month: "SEPTEMBER",
    exactDate: "September 1, 2026",
    version: "Version 0.1",
    title: "Initial personal assistant release",
    kpi: "100% pilot tasks captured",
    status: "Target",
    release: true,
  },
  {
    slug: "digital-rm-v02",
    productId: "digital-rm",
    month: "OCTOBER",
    exactDate: "October 1, 2026",
    version: "Version 0.2",
    title: "Follow-up + handoff release",
    kpi: "≥90% follow-ups logged",
    status: "Target",
    release: true,
  },
  {
    slug: "digital-rm-v03",
    productId: "digital-rm",
    month: "NOVEMBER",
    exactDate: "November 1, 2026",
    version: "Version 0.3",
    title: "Intelligence + analytics release",
    kpi: "≥80% priority coverage",
    status: "Target",
    release: true,
  },
  {
    slug: "digital-rm-v10",
    productId: "digital-rm",
    month: "DECEMBER",
    exactDate: "December 1, 2026",
    version: "Version 1.0",
    title: "Pilot rollout release",
    kpi: "≥90% UAT pass",
    status: "Target",
    release: true,
  },
  {
    slug: "medpac-srs-architecture",
    productId: "medpac",
    month: "AUGUST",
    exactDate: "August 10–31, 2026",
    title: "SRS + architecture approval",
    kpi: "Scope baseline approved",
    status: "Target",
  },
  {
    slug: "medpac-v10-readiness",
    productId: "medpac",
    month: "AUGUST",
    exactDate: "August 10–September 30, 2026",
    version: "Version 1.0",
    title: "Release readiness",
    kpi: "14 external gates closed",
    status: "Gated",
  },
  {
    slug: "medpac-v10-release",
    productId: "medpac",
    month: "OCTOBER",
    exactDate: "October 1, 2026",
    version: "Version 1.0",
    title: "Early-site release",
    kpi: "Release gate accepted",
    status: "External gate",
    release: true,
  },
  {
    slug: "medpac-v11",
    productId: "medpac",
    month: "NOVEMBER",
    exactDate: "November 1, 2026",
    version: "Version 1.1",
    title: "AI, storage + signatures",
    kpi: "Three workflow upgrades accepted",
    status: "Target",
    release: true,
  },
  {
    slug: "medpac-v12-his",
    productId: "medpac",
    month: "DECEMBER",
    exactDate: "December 1, 2026",
    version: "Version 1.2",
    title: "HIS connection",
    kpi: "Patient-to-image journey reconciled",
    status: "Target",
    release: true,
  },
  {
    slug: "teleicu-define",
    productId: "teleicu",
    month: "SEPTEMBER",
    exactDate: "September 28–October 9, 2026",
    title: "Clinical + device definition",
    kpi: "Pilot boundary agreed",
    status: "Proposed",
  },
  {
    slug: "teleicu-gateway-alpha",
    productId: "teleicu",
    month: "OCTOBER",
    exactDate: "October 10–25, 2026",
    version: "Alpha",
    title: "Gateway + dashboard",
    kpi: "Representative device signals visible",
    status: "Proposed",
  },
  {
    slug: "teleicu-alert-context",
    productId: "teleicu",
    month: "OCTOBER",
    exactDate: "October 26–November 8, 2026",
    title: "Alerts + patient/device context",
    kpi: "Actionable alert path works",
    status: "Proposed",
  },
  {
    slug: "teleicu-lab-uat",
    productId: "teleicu",
    month: "NOVEMBER",
    exactDate: "November 9–20, 2026",
    title: "Integrated lab + clinical UAT",
    kpi: "Core scenarios pass safely",
    status: "Proposed",
  },
  {
    slug: "teleicu-pilot-mvp",
    productId: "teleicu",
    month: "DECEMBER",
    exactDate: "December 1, 2026",
    version: "MVP",
    title: "Pilot-ready release",
    kpi: "Limited pilot can start",
    status: "Target",
    release: true,
  },
  {
    slug: "pacman-spec-partner",
    productId: "pacman",
    month: "AUGUST",
    exactDate: "August 1–31, 2026",
    title: "Specification + OEM partner",
    kpi: "OEM development and delivery agreement signed",
    status: "Target",
  },
  {
    slug: "pacman-evt-units",
    productId: "pacman",
    month: "SEPTEMBER",
    exactDate: "September 1–October 15, 2026",
    version: "EVT stage",
    title: "Units + software image",
    kpi: "Representative units boot and run",
    status: "Target",
  },
  {
    slug: "pacman-live-site-trial",
    productId: "pacman",
    month: "OCTOBER",
    exactDate: "October 15–November 20, 2026",
    title: "Live-site trial",
    kpi: "Site workload remains stable",
    status: "Target",
  },
  {
    slug: "pacman-mfg-ready",
    productId: "pacman",
    month: "DECEMBER",
    exactDate: "December 1, 2026",
    title: "Manufacturing-ready package",
    kpi: "Repeatable OEM build pack released",
    status: "Target",
    release: true,
  },
  {
    slug: "board-interface-spec",
    productId: "interface-board",
    month: "SEPTEMBER",
    exactDate: "September 28–October 9, 2026",
    title: "Interface + electrical specification",
    kpi: "Device boundary frozen with OEM partner",
    status: "Proposed",
  },
  {
    slug: "board-evt1",
    productId: "interface-board",
    month: "OCTOBER",
    exactDate: "October 5–30, 2026",
    version: "EVT 1",
    title: "Schematic, PCB, firmware + build",
    kpi: "EVT 1 boards delivered by OEM",
    status: "Proposed",
  },
  {
    slug: "board-bring-up",
    productId: "interface-board",
    month: "OCTOBER",
    exactDate: "October 26–November 13, 2026",
    title: "Bring-up + bench checks",
    kpi: "Critical interfaces pass",
    status: "Proposed",
  },
  {
    slug: "board-integrated-lab",
    productId: "interface-board",
    month: "NOVEMBER",
    exactDate: "November 9–20, 2026",
    title: "Integrated hardware/software lab",
    kpi: "End-to-end device path repeatable",
    status: "Proposed",
  },
  {
    slug: "board-pilot-ready",
    productId: "interface-board",
    month: "DECEMBER",
    exactDate: "December 1, 2026",
    version: "EVT pilot",
    title: "Pilot-ready package",
    kpi: "Controlled OEM pilot pack delivered",
    status: "Target",
    release: true,
  },
];

export const productById = Object.fromEntries(products.map((product) => [product.id, product])) as Record<ProductId, Product>;
export const milestoneBySlug = Object.fromEntries(milestones.map((milestone) => [milestone.slug, milestone])) as Record<string, Milestone>;
