//sitemap array
siteMap = [];
const dateModified = new Date(
  new Date().toString().split("GMT")[0] + " UTC"
).toISOString();

function siteMapGenerator() {
  const anchor = document.querySelectorAll("a");
  //siteMAp Head
  siteHead = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  siteMap.push(siteHead);
  //Sitemap head end

  // siteMap body
  anchor.forEach((e) => {
    let link = e.href;
    siteBody = `
    <url>
        <loc>${link} </loc>
        <lastmod>${dateModified}</lastmod>
        <priority>1.00</priority>
    </url>
`;
    siteMap.push(siteBody);
  });
  //Sitemap body end

  //sitemap foot
  siteFoot = `</urlset>`;
  siteMap.push(siteFoot);
  //Sitemap foot end

  // sitemap built and making a downloadable file
  const blob = new Blob(siteMap);
  const downloadURL = URL.createObjectURL(blob);

  // injecting styling in targeted page

  if (
    !document.body.contains(
      document.querySelector(".xmlsitemapcontainertodisplaycontaineronsite")
    )
  ) {
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";

    //Style.css is hosted on cloud to pull and append in the head
    link.href = "https://optimistic-mclean-535ff2.netlify.app/style.css";
    head.appendChild(link);

    const downloadContainer = document.createElement("div");
    downloadContainer.classList.add(
      "xmlsitemapcontainertodisplaycontaineronsite"
    );

    const downloadLink = document.createElement("a");
    downloadLink.classList.add("xmlsitemaplinktodownloadsitemapofsite");
    downloadLink.setAttribute("download", `sitemap.xml`);
    downloadLink.textContent = "Download Sitemap!!🔥🔥🎉";

    downloadLink.href = downloadURL;
    downloadContainer.appendChild(downloadLink);
    document.body.appendChild(downloadContainer);
    setTimeout(() => {
      downloadContainer.style.display = "none";
    }, 5000);
  } else {
    const alreadyDisplayedContainer = document.querySelector(
      ".xmlsitemapcontainertodisplaycontaineronsite"
    );
    alreadyDisplayedContainer.style.display = "grid";
    setTimeout(() => {
      alreadyDisplayedContainer.style.display = "none";
    }, 5000);
  }
}

chrome.runtime.onMessage.addListener((data, sender) => {
  if (data.message === "btn-clicked") {
    siteMapGenerator();
  }
});
