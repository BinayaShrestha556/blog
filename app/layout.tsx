import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import { AuthProvider } from "@/lib/auth-context";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Binaya Shrestha's Blog - Tech Insights & Development",
    template: "%s | Binaya Shrestha's Blog"
  },
  description: "Explore the latest in technology, web development, and programming insights on Binaya Shrestha's blog. Discover tutorials, tips, and industry trends.",
  keywords: [
    "blog",
    "technology",
    "web development",
    "programming",
    "tutorials",
    "tech insights",
    "software development",
    "coding",
    "binaya shrestha"
  ],
  authors: [{ name: "Binaya Shrestha" }],
  creator: "Binaya Shrestha",
  publisher: "Binaya Shrestha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://blog.binayashrestha0.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.binayashrestha0.com.np",
    siteName: "Binaya Shrestha's Blog",
    title: "Binaya Shrestha's Blog - Tech Insights & Development",
    description: "Explore the latest in technology, web development, and programming insights on Binaya Shrestha's blog. Discover tutorials, tips, and industry trends.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Binaya Shrestha's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binaya Shrestha's Blog - Tech Insights & Development",
    description: "Explore the latest in technology, web development, and programming insights on Binaya Shrestha's blog. Discover tutorials, tips, and industry trends.",
    images: ["/og-image.jpg"],
    creator: "@binayashrestha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B3TE7KLJT4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B3TE7KLJT4');
            `,
          }}
        />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={`${rubik.className} antialiased`}>
        <AuthProvider>
          <Navbar />
          <div className="h-14" />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
