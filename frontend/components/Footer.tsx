"use client";

// React/Next.js imports
import Link from "next/link";

// Third-party library imports
import { Twitter, Linkedin, Facebook, Instagram, Github } from "lucide-react";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - components
import { Button } from "./ui/button";

// Internal imports - assets
import Logo from "@/public/svg/logo_extended";
import LogoExtended from "@/public/svg/logo_extended";

// Footer data structure - easy to edit
const footerData = {
  brand: {
    logo: Logo,
    tagline: "Advanced AI search for serious researchers.",
  },
  navigation: [
    {
      heading: "Company",
      links: [
        { text: "Overview", href: "/", bold: true },
        { text: "Features", href: "/" },
        { text: "Solutions", href: "/" },
        { text: "Tutorials", href: "/" },
        { text: "Pricing", href: "/" },
      ],
    },
    {
      heading: "Product",
      links: [
        { text: "About Us", href: "/", bold: true },
        { text: "Careers", href: "/" },
        { text: "News", href: "/" },
        { text: "Media Kit", href: "/" },
        { text: "Contact", href: "/" },
      ],
    },
    {
      heading: "Resource",
      links: [
        { text: "Blog", href: "/", bold: true },
        { text: "Help Center", href: "/" },
        { text: "Tutorials", href: "/" },
        { text: "Support", href: "/" },
        { text: "Cookies", href: "/" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { text: "Terms and conditions", href: "/", bold: true },
        { text: "Privacy Policy", href: "/" },
      ],
    },
  ],
  socialMedia: [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ],
  copyright: `© DeepSearch ${new Date().getFullYear()} All Rights Reserved.`,
};

const Footer = () => {
  return (
    <footer
      className={`relative w-full ${styles.padding} !pt-24 overflow-hidden `}
    >
      <div className={`relative mx-auto max-w-6xl  `}>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 ">
          {/* Brand Section */}
          <div className="flex flex-col gap-2 items-start">
            <footerData.brand.logo className=" h-8 w-auto" />

            <p className={`${styles.small} text-muted-foreground font-normal`}>
              {footerData.brand.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
            {footerData.navigation.map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col gap-6">
                <h3 className={`${styles.Xsmall} text-muted-foreground `}>
                  {section.heading}
                </h3>
                <div className="flex flex-col gap-4">
                  {section.links.map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className={`${styles.link} text-primary font-semibold whitespace-nowrap `}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between md:items-center gap-4 pt-12 md:pt-24 ">
          <p className={`${styles.Xsmall} text-muted-foreground font-normal`}>
            {footerData.copyright}
          </p>

          <div className="flex items-center gap-4">
            {footerData.socialMedia.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Button size="icon">
                  <social.icon />
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <LogoExtended className="absolute w-auto h-[300px] bottom-[-148px] right-1/2 translate-x-1/2 z-[-1] text-primary opacity-5" />
      </div>
    </footer>
  );
};

export default Footer;
