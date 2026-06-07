import { Truck, Trash2, Hammer, Server, Car, Anchor, ChevronsUp, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
  features: string[];
  image?: string;
}

export const services: Service[] = [
  {
    id: "plant-hire",
    title: "Plant Hire",
    shortDescription: "Excavators, dumpers, mixers — UK plant hire with ISO 19650 + CPCS compliance built in.",
    description: "PlantHire.ai is the umbrella platform for UK plant hire operators. Booking, fleet management, BIM/CDE alignment, CHAS readiness — all in one place.",
    icon: Truck,
    href: "https://planthire.ai",
    external: true,
    features: [
      "Equipment booking + fleet management",
      "ISO 19650 BIM maturity checker",
      "CPCS card verification + lift plans",
      "CHAS / SSIP elite-prep workflows",
      "LOLER thorough exam tracking",
      "Direct API via paired MCP servers",
    ],
  },
  {
    id: "grab-hire",
    title: "Grab Hire",
    shortDescription: "UK grab-truck logistics with DVSA + waste-carrier compliance baked into every quote.",
    description: "GrabHire.ai is the umbrella platform for UK grab-truck operators. Instant quoting, route optimisation, DVSA roadside readiness, waste-carrier registration checks.",
    icon: Hammer,
    href: "https://grabhire.ai",
    external: true,
    features: [
      "Instant grab-hire quoting",
      "DVSA roadside risk scoring",
      "Operator licence + tachograph audit",
      "Drivers' hours calculator",
      "Waste-carrier registration lookup",
      "WhatsApp + email + phone CTAs",
    ],
  },
  {
    id: "muckaway",
    title: "Muckaway",
    shortDescription: "AI spoil classification, weighbridge OCR, NRSWA + landfill-tax compliance. The big SaaS.",
    description: "MuckAway.ai is the full-fledged operator SaaS — driver portal, weighbridge OCR, AI spoil classification, Stripe-powered payments, GDPR-compliant data handling.",
    icon: Trash2,
    href: "https://muckaway.ai",
    external: true,
    features: [
      "AI spoil classification (EWC codes)",
      "Weighbridge OCR + ticket capture",
      "NRSWA S50 / S74 compliance",
      "Stripe checkout + customer portal",
      "Driver app via Capacitor (iOS/Android)",
      "Real-time mapbox tracking",
    ],
  },
  {
    id: "car-transport",
    title: "Car Transport",
    shortDescription: "Vehicle delivery, recovery + EV battery transport — BVRLA, DVSA, ADR class 9 compliance.",
    description: "CarTransport.ai (coming soon) for UK car-carrier operators and vehicle recovery firms. POD photo standards, NAMA damage forms, lithium-battery ADR rules, BVRLA Code of Conduct — automated.",
    icon: Car,
    href: "/mcps#car-transport",
    features: [
      "POD + damage photo capture (NAMA standard)",
      "BVRLA Code of Conduct workflows",
      "ADR class 9 (UN3480/3481) EV battery rules",
      "DVSA O-licence + tacho integration",
      "Vehicle recovery code of practice",
      "Auction-to-dealer routing automation",
    ],
  },
  {
    id: "crane-hire",
    title: "Crane Hire",
    shortDescription: "Mobile + tower + crawler cranes — BS 7121, LOLER, CPA contract-lift, AP cert verification.",
    description: "CraneHire.ai (coming soon) for UK crane operators. AI lift-plan generation, Appointed Person cert verification, CPA Contract-Lift vs Hire legal flagging, ground-bearing pressure calcs.",
    icon: Anchor,
    href: "/mcps#crane-hire",
    features: [
      "AI lift-plan generation (BS 7121 compliant)",
      "Appointed Person cert + CPCS card verify",
      "CPA Contract-Lift vs Hire liability flag",
      "LOLER 6/12 month thorough exam tracking",
      "Ground bearing pressure + outrigger pads",
      "Wind cutoff + exclusion zone calculator",
    ],
  },
  {
    id: "hiab-hire",
    title: "Hiab Hire",
    shortDescription: "Lorry-loader + brick-grab — ALLMI Thorough Exam, BS 7121-4, CPCS A36, slinger A40.",
    description: "HiabHire.ai (coming soon) for UK lorry-loader operators. ALLMI cert checks, brick-grab POD capture, BS 7121-4 lorry-loader code automation, contract-lift trigger detection.",
    icon: ChevronsUp,
    href: "/mcps#hiab-hire",
    features: [
      "ALLMI Thorough Examination tracking",
      "BS 7121-4 lorry-loader code compliance",
      "CPCS A36 hiab + A40 slinger verify",
      "Brick-grab/block-grab POD capture",
      "Contract-lift trigger detection",
      "Builders-merchant integration ready",
    ],
  },
  {
    id: "general-haulage",
    title: "General Haulage",
    shortDescription: "HGV freight + pallet networks — DVSA O-licence, smart-tacho-2, CPC, FORS, CLOCS, DVS.",
    description: "The flagship general-haulage compliance stack. DVSA O-licence audit, Gen-2 smart-tachograph compliance, drivers' CPC tracking, FORS Bronze/Silver/Gold prep, CLOCS construction-logistics, London DVS 3+ star.",
    icon: Route,
    href: "/mcps#general-haulage",
    features: [
      "DVSA O-licence + OCRS audit",
      "Gen-2 smart-tachograph compliance (post-Aug-2025)",
      "Drivers' Hours + CPC tracker (35h/5yr)",
      "FORS Bronze/Silver/Gold readiness",
      "CLOCS + TfL DVS 3+ star prep",
      "Earned Recognition data feed",
    ],
  },
  {
    id: "mcps",
    title: "Compliance MCPs",
    shortDescription: "21+ PyPI-published MCP servers shipping signed compliance attestations for UK trades.",
    description: "Each trade vertical comes with its own MCP servers — install via pip, get callable tools for licence checks, certification audits, and compliance attestations.",
    icon: Server,
    href: "/mcps",
    features: [
      "9 launch MCPs (DVSA, NRSWA, CHAS, ISO 19650, CPCS, CPA, EWC, BIM, LOLER)",
      "12 new for car-transport, crane, hiab, haulage",
      "All MIT-licensed, all on PyPI",
      "Signed attestations via meok-attestation-api",
      "Pro tier bundles every MCP at £79/mo",
      "Enterprise SLA + custom verticals",
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
