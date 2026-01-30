import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BlogList from "@/components/BlogList";
import Projects from "@/components/Projects";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { getPosts } from "@/lib/notion";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const posts = await getPosts();

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main" role="main">
        <Hero />
        <BlogList posts={posts} />
        <Projects />
        <ContactSection />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
