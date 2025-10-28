import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "vz968uhd",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Enable CDN caching for better performance
  perspective: "published", // Only fetch published content
});
