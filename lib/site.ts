/**
 * Site-wide content for Ferny Hills Physiotherapy.
 * All copy below is reproduced verbatim from https://fernyhillsphysiotherapy.com.au/
 */

export const site = {
  name: "Ferny Hills Physiotherapy",
  centreName: "Ferny Hills Physiotherapy Centre",
  phone: "07 3351 5177",
  phoneHref: "tel:0733515177",
  email: "info@fernyhillsphysiotherapy.com.au",
  emailHref: "mailto:info@fernyhillsphysiotherapy.com.au",
  address: "170 Patricks Road Ferny Hills QLD 4055",
  hours: "Appts available now 7am – 6pm",
  bookingUrl:
    "http://bookings.ppmp.com.au/?ver=9IEGaMIPbqIHiUJMOUSEAx5lOeMhUUqjm0PlgMYSgK7xxBijrsm7tArnQ2AJFYbBbn6W1cVC3UkOlIJpK0zNV/8SQ==",
  yellowPagesUrl:
    "https://www.yellowpages.com.au/qld/ferny-hills/ferny-hills-physiotherapy-12076332-listing.html",
  privacyPolicyUrl: "https://fernyhillsphysiotherapy.com.au/privacy-policy/",
  footerAbout:
    "Ferny Hills Physiotherapy is a physiotherapy clinic located at 170 Patricks Road, Ferny Hills QLD, Australia, offering services such as sports rehabilitation, arthritis treatment, back pain management, and hydrotherapy.",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Arthritis Treatment", href: "/arthritis-treatment" },
  { label: "Sports Physio Rehabilitation", href: "/sports-physio-rehabilitation" },
  { label: "Back Pain", href: "/back-pain" },
  { label: "Hydrotherapy", href: "/hydrotherapy" },
  { label: "Contact", href: "/contact-us" },
] as const;

const SUBURB_BASE = "https://fernyhillsphysiotherapy.com.au/physiotherapist-in-";

/** "Areas We Service" list, in original order (duplicates preserved as on the live site). */
export const serviceAreas = [
  ["Everton Hills", "everton-hills"],
  // The live site links this "Samford" entry to the Stafford page; corrected to the Samford page here.
  ["Samford", "samford"],
  ["Everton Park", "everton-park"],
  ["Stafford", "stafford"],
  ["Samford", "samford"],
  ["Arana Hills", "arana-hills"],
  ["Bunya", "bunya"],
  ["Ferny Grove", "ferny-grove"],
  ["Keperra", "keperra"],
  ["Alderley", "alderley"],
  ["Everton Park", "everton-park"],
  ["Everton Hills", "everton-hills"],
  ["Albany Creek", "albany-creek"],
  ["McDowall", "mcdowall"],
  ["Draper", "draper"],
  ["The Gap", "the-gap"],
  ["Mitchelton", "mitchelton"],
  ["Stafford Heights", "stafford-heights"],
  ["Upper Kedron", "upper-kedron"],
  ["Enoggera", "enoggera"],
].map(([name, slug]) => ({ name, href: `${SUBURB_BASE}${slug}/` }));

export const healthFunds = [
  { name: "Bupa", src: "/images/bupa.webp" },
  { name: "Medibank", src: "/images/medibank.webp" },
  { name: "HCF", src: "/images/hcf.webp" },
  { name: "nib", src: "/images/nib.webp" },
];
