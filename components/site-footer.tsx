import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTiktok,
} from "@/components/icons";
import { listingsSearchUrl, siteConfig } from "@/lib/site-config";

const footerCities = [
  "Raleigh",
  "Cary",
  "Durham",
  "Chapel Hill",
  "Wake Forest",
  "Apex",
  "Holly Springs",
  "Clayton",
];

export function SiteFooter() {
  const { social } = siteConfig;
  const socials = [
    { href: social.facebook, label: "Facebook", icon: <IconFacebook /> },
    { href: social.instagram, label: "Instagram", icon: <IconInstagram /> },
    { href: social.tiktok, label: "TikTok", icon: <IconTiktok /> },
    { href: social.linkedin, label: "LinkedIn", icon: <IconLinkedin /> },
  ].filter((item) => item.href);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a href="/" className="site-footer__logo">
          <span className="site-footer__mark">FD</span>
          <span className="site-footer__name">Fatima Diallo</span>
          <span className="site-footer__tag">Real Estate</span>
        </a>
        <nav className="site-footer__cities" aria-label="Cities">
          {footerCities.map((city) => (
            <a key={city} href={listingsSearchUrl(city)}>
              {city}
            </a>
          ))}
        </nav>
        <div className="site-footer__row">
          <a className="site-footer__text-link" href={listingsSearchUrl()}>
            Browse Homes
          </a>
          <ul className="site-footer__social">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
          <a className="site-footer__text-link" href="#contact">
            Connect with us
          </a>
        </div>
        <div className="site-footer__meta">
          <div>
            <p>Phone: {siteConfig.phone}</p>
            <p>
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>{siteConfig.address}</p>
          </div>
          <p>Choice Residential Real Estate</p>
        </div>
      </div>
    </footer>
  );
}
