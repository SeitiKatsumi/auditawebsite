import type { Metadata } from "next";
export { default } from "./home-clara/page";

export const metadata: Metadata = {
  title: "IA Audita | Clareza para suas decisões",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { images: [{ url: "/images/home-clara-marca.png", width: 1254, height: 1254 }] },
  twitter: { images: ["/images/home-clara-marca.png"] },
};
