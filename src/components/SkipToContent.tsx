/**
 * WCAG 2.2 AA — Skip-to-content link.
 *
 * Hidden by default; appears on first Tab focus. Lets keyboard + screen-reader
 * users skip past the header straight to the main content.
 */
const SkipToContent = () => {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-display focus:text-sm focus:shadow-lg"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
