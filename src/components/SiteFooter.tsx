const SiteFooter = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 glass-nav">
      <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted text-sm">
          {new Date().getFullYear()}. Crafted by Park Sehyun
        </p>
        <p className="text-muted text-xs">
          Built with Next.js & Notion
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
