"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";

// Dynamically import react-notion-x to avoid SSR issues
const NotionRendererClient = dynamic(
  () => import("react-notion-x").then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

const NotionRenderer = ({ recordMap }: NotionRendererProps) => {
  return (
    <div className="notion-renderer">
      <NotionRendererClient
        recordMap={recordMap}
        fullPage={false}
        darkMode={true}
        disableHeader={true}
        components={{
          // You can customize components here
        }}
      />
      <style jsx global>{`
        .notion-renderer .notion-page {
          padding: 0;
        }
        
        .notion-renderer .notion-text {
          color: var(--muted-foreground);
          line-height: 1.8;
        }
        
        .notion-renderer .notion-h1,
        .notion-renderer .notion-h2,
        .notion-renderer .notion-h3 {
          color: var(--foreground);
          font-weight: 500;
        }
        
        .notion-renderer .notion-h1 {
          font-size: 2rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        
        .notion-renderer .notion-h2 {
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        
        .notion-renderer .notion-h3 {
          font-size: 1.25rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .notion-renderer .notion-code {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 1rem;
        }
        
        .notion-renderer .notion-inline-code {
          background: var(--secondary);
          color: var(--foreground);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: var(--font-mono);
          font-size: 0.875em;
        }
        
        .notion-renderer .notion-link {
          color: var(--foreground);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        
        .notion-renderer .notion-link:hover {
          color: var(--muted-foreground);
        }
        
        .notion-renderer .notion-list {
          color: var(--muted-foreground);
        }
        
        .notion-renderer .notion-quote {
          border-left: 3px solid var(--border);
          padding-left: 1rem;
          color: var(--muted-foreground);
          font-style: italic;
        }
        
        .notion-renderer .notion-callout {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 1rem;
        }
        
        .notion-renderer .notion-divider {
          border-color: var(--border);
          margin: 2rem 0;
        }
        
        .notion-renderer .notion-image {
          border-radius: 0.5rem;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotionRenderer;
