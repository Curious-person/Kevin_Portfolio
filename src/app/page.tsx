import { getProjects, getCaseStudies, getDesigns, getStats } from "@/app/actions/portfolio";
import { HomeClient } from "@/components/home-client";

// Revalidate cache every hour (or set to 0 to disable cache/always fetch fresh)
export const revalidate = 3600; 

const skills = [
  "USER RESEARCH",
  "USABILITY TESTING",
  "LANDING PAGE DESIGN",
  "FRONTEND DEVELOPMENT",
  "BACKEND DEVELOPMENT",
  "REST API INTEGRATION",
  "AUTHENTICATION",
];

/**
 * Portfolio homepage Server Component.
 * Fetches all necessary data from Supabase at render time in parallel,
 * then passes it to the interactive Client Component wrapper.
 */
export default async function HomePage() {
  // Fetch data in parallel on the server
  const [projects, caseStudies, designs, stats] = await Promise.all([
    getProjects(),
    getCaseStudies(),
    getDesigns(),
    getStats(),
  ]);

  return (
    <HomeClient
      projects={projects}
      caseStudies={caseStudies}
      designs={designs}
      stats={stats}
      skills={skills}
    />
  );
}
