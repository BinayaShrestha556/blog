import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Binaya Shrestha's Blog",
    short_name: "Binaya's Blog",
    description: "Explore the latest in technology, web development, and programming insights on Binaya Shrestha's blog.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["technology", "education", "lifestyle"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
