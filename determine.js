// Determine applicable configuration files based on current page, URL, or host
export async function determineConfigFiles(config) {
  const currentUrl = window.location.pathname.replace(/\.[^\/]+$/, "");
  const currentHost = window.location.hostname;
  let applicableFiles = [];

  // Check for page-based config (You can define your page logic here)
  if (config.datasource.pages) {
    // Example: Determine page type from the current URL or other logic
    // This is just a placeholder. Replace with your actual page determination logic.
    const pageType = Object.keys(config.datasource.pages).find((page) =>
      currentUrl.includes(page)
    );
    if (pageType) {
      const pageConfig = config.datasource.pages[pageType];
      if (Array.isArray(pageConfig)) {
        applicableFiles.push(...pageConfig);
      } else {
        applicableFiles.push(pageConfig);
      }
    }
  }

  // Check for URL-based config
  if (config.datasource.urls && config.datasource.urls[currentUrl]) {
    const urlConfig = config.datasource.urls[currentUrl];
    if (Array.isArray(urlConfig)) {
      applicableFiles.push(...urlConfig);
    } else {
      applicableFiles.push(urlConfig);
    }
  }

  // Check for host-based config
  if (config.datasource.hosts && config.datasource.hosts[currentHost]) {
    applicableFiles.push(config.datasource.hosts[currentHost]);
  }
  return applicableFiles;
}
