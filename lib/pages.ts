/**
 * Inner-page content, reproduced verbatim from the live site.
 * Layout is described as a list of blocks rendered by <PageBlocks />.
 */

export type CtaKind = "contact" | "call" | "book";
export type Cta = { label: string; kind: CtaKind };

export type Block =
  | {
      type: "split";
      eyebrow?: string;
      heading?: string;
      paragraphs: string[];
      cta?: Cta;
      image: string;
      reverse?: boolean;
    }
  | { type: "banner"; heading: string; cta: Cta; image: string }
  /** line: small scroll-drawn hairline transition between two sections */
  | { type: "line" }
  /** spine: scroll transition where a row of vertebrae settles into a straight line */
  | { type: "spine" }
  /** wave: scroll transition where soft water waves roll sideways and rise like a filling pool */
  | { type: "wave" }
  | { type: "cta"; heading: string; paragraphs: string[]; cta: Cta }
  | {
      type: "conditions";
      heading: string;
      intro: string;
      /** tab: short name for the tab row above the slider; href: the condition's own page, if it has one (otherwise Contact) */
      items: { title: string; tab: string; image: string; href?: string }[];
    }
  | {
      /** Scroll-driven story: steps pin in place and their line art draws as you scroll */
      type: "journey";
      eyebrow: string;
      heading: string;
      steps: { label: string; title: string; text: string; art: JourneyArt }[];
      note: string;
      cta: Cta;
      image: string;
    }
  | {
      /** Interactive body map: tap a joint to see its common signs and how physio helps */
      type: "joints";
      eyebrow: string;
      heading: string;
      intro: string;
      joints: Joint[];
      cta: Cta;
    };

export type JointId = "neck" | "shoulder" | "hip" | "knee" | "foot";
export type Joint = {
  id: JointId;
  name: string;
  signs: string;
  helps: string[];
  /** Photo shown while this joint is selected */
  image: string;
  /** Optional related page, e.g. hydrotherapy */
  link?: { label: string; href: string };
};

export type JourneyArt = "assess" | "team" | "treat" | "recover";

export type PageContent = {
  slug: string;
  title: string;
  /** imagePosition: CSS object-position for the banner photo, to keep its subject in frame */
  hero: { eyebrow: string; title: string; image: string; imagePosition?: string; cta?: Cta };
  blocks: Block[];
};

const contact = (label: string): Cta => ({ label, kind: "contact" });
const call = (label: string): Cta => ({ label, kind: "call" });

export const services: PageContent = {
  slug: "services",
  title: "Services",
  hero: {
    eyebrow: "Women's Health Physiotherapist for Ferny Grove & Samford",
    title: "We Ensure Lasting Rehabilitation",
    image: "/images/services/hero.webp",
  },
  blocks: [
    {
      type: "split",
      heading: "We Believe in Customised Care",
      paragraphs: [
        "At Ferny Hills Physiotherapy Centre, we don't see you as just another patient. We understand that your body and your circumstances are highly unique, which is why we provide distinctive treatment to each client that will most benefit the individual. We want your treatment experience to be positive and effective.",
      ],
      cta: contact("Let's talk"),
      image: "/images/services/customised-care.jpg",
    },
    {
      type: "conditions",
      heading: "How We Can Help",
      intro: "We treat for the following conditions:",
      items: [
        { title: "Spinal Injuries", tab: "Spinal Injuries", image: "/images/services/spinal-injuries.jpg" },
        {
          title: "Neck and back pain",
          tab: "Neck & Back Pain",
          image: "/images/services/neck-back-pain.jpg",
          href: "/back-pain/",
        },
        { title: "Arthritis", tab: "Arthritis", image: "/images/services/arthritis.jpg", href: "/arthritis-treatment/" },
        {
          title: "Upper and lower limb injuries and conditions",
          tab: "Limb Injuries",
          image: "/images/services/limb-injuries.jpg",
        },
        {
          title: "Sporting injuries",
          tab: "Sporting Injuries",
          image: "/images/services/sporting-injuries.jpg",
          href: "/sports-physio-rehabilitation/",
        },
        { title: "Work injuries", tab: "Work Injuries", image: "/images/services/work-injuries.jpg" },
        { title: "Whiplash", tab: "Whiplash", image: "/images/services/whiplash.jpg" },
        { title: "Chronic pain", tab: "Chronic Pain", image: "/images/services/chronic-pain.jpg" },
        {
          title: "Rehabilitation after surgery and more",
          tab: "Rehab After Surgery",
          image: "/images/services/post-operative.jpg",
        },
      ],
    },
    {
      type: "journey",
      eyebrow: "Your recovery, step by step",
      heading: "Our Personalised Treatment Approach",
      steps: [
        {
          label: "Assessment",
          title: "We start by understanding you",
          text: "Our treatment plan for you begins with a comprehensive assessment and physical exam to diagnose your condition.",
          art: "assess",
        },
        {
          label: "Collaboration",
          title: "We build your plan together",
          text: "We then communicate with you and other health professionals to collaborate on a treatment and recovery plan to get you back on your feet.",
          art: "team",
        },
        {
          label: "Treatment",
          title: "Personal care for your goal",
          text: "When we have determined your health goal, we will begin treatment which involves manual mobilisation and soft tissue techniques.",
          art: "treat",
        },
        {
          label: "Recovery",
          title: "You leave stronger",
          text: "Once your initial complaint is treated, we will teach you to manage your pain and aid your recovery.",
          art: "recover",
        },
      ],
      note: "All of our treatment techniques are based on scientific research and clinical experience. We are always adapting to new treatment methods and advances in technology so you receive the latest care.",
      cta: contact("Let's talk"),
      image: "/images/services/treatment-approach.jpg",
    },
    {
      type: "split",
      heading: "Specialised equipment",
      paragraphs: [
        "At Ferny Hills Physiotherapy, we use the best possible diagnostic and treatment equipment. This includes our Vibro Trainer for advanced muscle training and our Gaitscan™ biomechanical footprint scanner to identify abnormalities and prescribe custom orthotics. We also supply equipment that aids in rehabilitation and injury prevention such as supportive braces, therapeutic sandals and contoured pillows.",
        "Our staff is happy to help you obtain these materials to promote your speedy recovery.",
      ],
      cta: contact("Let's talk"),
      image: "/images/equipment.jpg",
    },
    {
      type: "cta",
      heading: "Contact us today",
      paragraphs: [
        "If you or someone you love is suffering from one of these debilitating ailments, stop by our clinic to find out how we can help.",
      ],
      cta: contact("Contact us"),
    },
  ],
};

export const arthritis: PageContent = {
  slug: "arthritis-treatment",
  title: "Arthritis Treatment",
  hero: {
    eyebrow: "Arthritis Treatment Available in Ferny Hills",
    title: "Our friendly staff is here for you",
    image: "/images/pages/arthritis-hero.webp",
  },
  blocks: [
    {
      type: "split",
      heading: "Treatment to relieve your suffering",
      paragraphs: [
        "Do you struggle to climb the stairs in your own home because your joints are screaming at you in protest? You aren’t alone. There are over 100 different kinds of arthritis, and it afflicts all age groups. Commonly, it is accompanied by pain, swelling, stiffness and decreased range of motion in the joints. Worst of all, it can cause permanent changes in your joints.",
        "We want to put an end to the pain causing the struggle in your everyday tasks.",
      ],
      cta: call("Call today"),
      image: "/images/pages/arthritis-relief.jpg",
    },
    {
      type: "joints",
      eyebrow: "Where does it hurt?",
      heading: "We personalise treatment to your joints",
      intro: "Arthritis feels different in every joint. Tap a joint to see the common signs and how our physiotherapists can help.",
      joints: [
        {
          id: "knee",
          image: "/images/clinic-6.jpg",
          name: "Knees",
          signs: "Stiffness on the stairs, trouble getting up from a chair, and swelling after a long walk.",
          helps: [
            "Thigh and hip strengthening to take load off the knee",
            "Manual mobilisation to ease stiffness",
            "Braces or Gaitscan™ custom orthotics where alignment adds strain",
          ],
          link: { label: "Gentle exercise in hydrotherapy", href: "/hydrotherapy/" },
        },
        {
          id: "hip",
          image: "/images/clinic-5.jpg",
          name: "Hips",
          signs: "An ache in the groin or outer hip, and stiffness putting on shoes and socks.",
          helps: [
            "Graded strengthening for the glutes and core",
            "Stretching to restore range of motion",
            "Advice on walking aids and pacing your day",
          ],
          link: { label: "Take the weight off with hydrotherapy", href: "/hydrotherapy/" },
        },
        {
          id: "shoulder",
          image: "/images/clinic-2.jpg",
          name: "Shoulders",
          signs: "Pain reaching overhead or behind your back, and an ache at night.",
          helps: [
            "Soft tissue and mobilisation techniques",
            "Strengthening around the shoulder blade",
            "A home program to keep the movement you gain",
          ],
        },
        {
          id: "neck",
          image: "/images/back-pain.jpg",
          name: "Neck & back",
          signs: "Morning stiffness and an ache that eases once you get moving.",
          helps: [
            "Mobility and core strength exercises",
            "Advice on posture and sleeping positions",
            "Manual therapy and heat to settle painful flares",
          ],
          link: { label: "Back pain treatment", href: "/back-pain/" },
        },
        {
          id: "foot",
          image: "/images/equipment.jpg",
          name: "Ankles & feet",
          signs: "Painful first steps in the morning and soreness on hard ground.",
          helps: [
            "Gaitscan™ footprint scan and custom orthotics",
            "Supportive footwear, including therapeutic sandals",
            "Balance and strength work to steady each step",
          ],
        },
      ],
      cta: contact("Book an assessment"),
    },
    {
      type: "split",
      heading: "How we can help",
      paragraphs: [
        "A physiotherapist can get you moving again and that’s where we come in. We focus on strengthening your body to support your joints, getting them moving again and improving your overall ability to move. Our goal is to get you back to your daily activities without the suffering.",
        "In order to get you to this point, we come up with an individualised exercise plan for you to increase your strength and flexibility. Our hope is that you will come away from your visits with an increased knowledge of how to perform exercises independently so you can do them even when we aren’t around.",
        "In addition to these exercises, we may recommend using devices to assist you such as walkers, braces, orthotics, splints, and other such materials for easing your pain and making your day easier.",
      ],
      cta: contact("Let's talk"),
      image: "/images/pages/arthritis-help.jpg",
      reverse: true,
    },
    {
      type: "cta",
      heading: "Live better",
      paragraphs: ["Stop living with arthritis pain. Give us a call and let us help you enjoy life again."],
      cta: contact("Start healing today"),
    },
  ],
};

export const sports: PageContent = {
  slug: "sports-physio-rehabilitation",
  title: "Sports Physio Rehabilitation",
  hero: {
    eyebrow: "Serving Samford",
    title: "Sports Injury Rehabilitation Services in Ferny Hills",
    image: "/images/pages/sports-hero.webp",
    imagePosition: "30% 12%",
  },
  blocks: [
    {
      type: "split",
      heading: "Quality treatment",
      paragraphs: [
        "Sports injuries affect bones, muscles, tissues and cartilage and are detrimental to normal daily activities, not just athletic performance. They can happen to a professional athlete or a father playing ball with his children in the park. If your active lifestyle has been hindered by a sports injury, our physiotherapists have an extensive knowledge of the musculoskeletal system that will get you back to doing what you love.",
      ],
      cta: contact("Enquire now"),
      image: "/images/pages/sports-quality.jpg",
    },
    { type: "line" },
    {
      type: "split",
      heading: "Prevent injuries",
      paragraphs: [
        "If you have been injured or you lead an active life where you are prone to injury, we recommend seeing a physiotherapist sooner rather than later. Waiting to be rehabilitated may end up worsening your injury. Sports injuries require supervision and time to heal safely.",
        "Our staff can help you heal quickly, improve athletic performance and even prevent injuries before they even happen through a custom plan balancing stretching, exercise and rest.",
      ],
      cta: contact("Let's talk"),
      image: "/images/pages/sports-prevent.jpg",
      reverse: true,
    },
    {
      type: "cta",
      heading: "Start healing",
      paragraphs: [
        "Every injury is unique and everyone heals differently. Ferny Hills specialists will identify the cause for your specific injury, create a program and help you prevent injury in the future. But don’t wait until you’re injured. Call us today so we can help optimise your sports performance and help you play safely.",
      ],
      cta: contact("Start healing today"),
    },
  ],
};

export const backPain: PageContent = {
  slug: "back-pain",
  title: "Back Pain",
  hero: {
    eyebrow: "Back Pain Management at Ferny Hills Physiotherapy Centre",
    title: "Our specialists want to help relieve your back pain",
    image: "/images/pages/back-pain-hero.webp",
    imagePosition: "0% 45%",
  },
  blocks: [
    {
      type: "split",
      heading: "Listen to this",
      paragraphs: [
        "Statistics indicate that 90% of people will experience back pain at least once in their life. Back pain can travel to other areas of the body and become progressively worse. Physiotherapy for back pain is a less risky alternative to surgery and is often equally as effective without the undesirable complications that accompany surgery.",
      ],
      cta: contact("Learn more"),
      image: "/images/pages/back-pain-listen.jpg",
    },
    { type: "spine" },
    {
      type: "split",
      eyebrow: "Prevent injuries",
      heading: "Treat the pain source",
      paragraphs: [
        "Ferny Hills Physiotherapy will perform an evaluation to determine the cause of your back pain. We will review your health history and ask questions about your symptoms to pinpoint any behaviours that may be contributing factors to your pain. We will decide upon a course of action and treat you with manual therapy, exercises and use of heat or ice to relieve pain.",
        "We also teach you to maintain proper posture throughout the day and help you learn to listen to your body’s signals that your body mechanics are misaligned. This includes training for proper lifting, sitting, and bending and proper sleeping positions. We can prescribe you the ongoing exercises we see fit for your condition and change them when necessary.",
      ],
      cta: contact("Let's talk"),
      image: "/images/pages/back-pain-source.jpg",
      reverse: true,
    },
    {
      type: "cta",
      heading: "Get started",
      paragraphs: ["See us today to get started with physiotherapy so that you can have a life without back pain."],
      cta: call("Call us"),
    },
  ],
};

export const hydrotherapy: PageContent = {
  slug: "hydrotherapy",
  title: "Hydrotherapy",
  hero: {
    eyebrow: "Hydrotherapy in Ferny Hills",
    title: "Reduce sudden or lasting pain",
    image: "/images/pages/hydro-hero.webp",
    imagePosition: "50% 42%",
  },
  blocks: [
    {
      type: "split",
      heading: "What is Hydrotherapy?",
      paragraphs: [
        "Hydrotherapy, also called “water cure,” is a gentle, natural way of treating pain and maintaining overall health without invasive procedures. It has shown to be one of the safest treatment methods for back pain and arthritis. We also use it in aiding muscle pain, nerve problems and relaxation.",
      ],
      cta: contact("More information"),
      image: "/images/pages/hydro-what.jpg",
    },
    { type: "wave" },
    {
      type: "split",
      heading: "How it works",
      paragraphs: [
        "We use hydrotherapy to make your treatment relaxing and even enjoyable. The warm water is both soothing and pleasant while it increases circulation and causes the muscles to loosen, allowing for easier exercise.",
        "Research suggests that hydrotherapy reduces injury by stimulating circulation and reducing swelling. It is also particularly useful in taking the weight off of a sore joint and providing resistance by utilising the physical properties of water.",
        "Hydrotherapy is often confused with aqua aerobics, which is generally a strenuous exercise. Quite to the contrary, hydrotherapy focuses on slow and controlled movements that lead to relaxation. At the same time, pushing against the water helps improve muscle strength. Studies have shown that hydrotherapy can improve general fitness in those with arthritis.",
      ],
      cta: contact("Let's talk"),
      image: "/images/pages/hydro-how.jpg",
      reverse: true,
    },
    {
      type: "cta",
      heading: "Start Hydrotherapy",
      paragraphs: [
        "Our hydrotherapy sessions can be tailored to your individual needs. You can begin slowly and gradually build up your strength and flexibility as you increase resistance. If you can’t swim, don’t worry. Our staff will always be present to assist you and help you exercise in the right depth for you. Call us today to see if hydrotherapy is right for you.",
      ],
      cta: call("Call us today"),
    },
  ],
};
