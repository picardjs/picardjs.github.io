import { defineConfig } from "vitepress";
import { OramaPlugin } from "@orama/plugin-vitepress";

export default defineConfig({
  title: "Picard.js",
  description:
    "The captain for the next generation of micro frontends federation.",

  srcExclude: ["**/README.md"],

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/picard-logo-mini.png" }],
    ["meta", { name: "theme-color", content: "#5f67ee" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      {
        property: "og:title",
        content: "Picard.js | Orchestrator for Micro Frontends",
      },
    ],
    ["meta", { property: "og:site_name", content: "Picard.js" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://picard.js.org/picard-og.jpg",
      },
    ],
    ["meta", { property: "og:url", content: "https://picard.js.org/" }],
  ],

  lastUpdated: true,
  cleanUrls: true,

  sitemap: {
    hostname: "https://picard.js.org",
  },

  themeConfig: {
    logo: { src: "/picard-logo-mini.png", width: 24, height: 24 },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present smapiot GmbH",
    },

    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      {
        text: "0.3.0",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/picardjs/picard/blob/main/CHANGELOG.md",
          },
          {
            text: "Contributing",
            link: "https://github.com/picardjs/picard/blob/main/.github/CONTRIBUTING.md",
          },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/" },
            { text: "Why Picard.js?", link: "/guide/why" },
            { text: "Features", link: "/guide/features" },
            { text: "Comparisons", link: "/guide/comparisons" },
            { text: "FAQ", link: "/guide/faq" },
          ],
        },
        {
          text: "Web Components",
          items: [
            { text: "pi-component", link: "/guide/components/pi-component" },
            { text: "pi-slot", link: "/guide/components/pi-slot" },
            { text: "pi-part", link: "/guide/components/pi-part" },
          ],
        },
        {
          text: "Variants",
          items: [
            { text: "Browser", link: "/guide/variants/browser" },
            { text: "Client", link: "/guide/variants/client" },
            { text: "Node.js", link: "/guide/variants/node" },
            { text: "Electron", link: "/guide/variants/electron" },
          ],
        },
        {
          text: "Formats",
          items: [
            {
              text: "Module Federation",
              link: "/guide/formats/module-federation",
            },
            {
              text: "Native Federation",
              link: "/guide/formats/native-federation",
            },
            { text: "Pilet", link: "/guide/formats/pilet-v2" },
          ],
        },
        {
          text: "Frameworks",
          items: [
            { text: "Default", link: "/guide/frameworks/default" },
            { text: "HTML", link: "/guide/frameworks/html" },
            { text: "single-spa", link: "/guide/frameworks/single-spa" },
            {
              text: "Web Components",
              link: "/guide/frameworks/web-components",
            },
          ],
        },
      ],
      "/api/": [
        {
          text: "API",
          items: [{ text: "Overview", link: "/api/" }],
        },
        {
          text: "Web Components",
          items: [
            { text: "pi-component", link: "/api/components/pi-component" },
            { text: "pi-slot", link: "/api/components/pi-slot" },
            { text: "pi-part", link: "/api/components/pi-part" },
          ],
        },
        {
          text: "Usage",
          items: [{ text: "Routing", link: "/api/usage/routing" }],
        },
        {
          text: "Service Endpoints",
          items: [{ text: "Fragment", link: "/api/endpoints/fragment" }],
        },
        {
          text: "Configuration",
          items: [
            {
              text: "Initialization Options",
              link: "/api/configuration/options",
            },
            { text: "Runtime Services", link: "/api/configuration/services" },
          ],
        },
        {
          text: "Discovery Services",
          items: [
            {
              text: "Piral Feed Service",
              link: "/api/discovery/piral-feed-service",
            },
            {
              text: "Discovery Schema",
              link: "/api/discovery/discovery-schema",
            },
            {
              text: "Native Federation Manifest",
              link: "/api/discovery/native-federation-manifest",
            },
          ],
        },
        {
          text: "Lifecycle",
          items: [{ text: "Generic Lifecycle", link: "/api/lifecycle/" }],
        },
      ],
    },

    editLink: {
      pattern: "https://github.com/picardjs/picardjs.github.io/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      {
        icon: "discord",
        link: "https://discord.gg/kKJ2FZmK8t",
        ariaLabel: "Discord",
      },
      {
        icon: "github",
        link: "https://github.com/picardjs/picard",
        ariaLabel: "GitHub",
      },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/picard-js",
        ariaLabel: "npm",
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JSR</title><path d="M3.692 5.538v3.693H0v7.384h7.385v1.847h12.923v-3.693H24V7.385h-7.385V5.538Zm1.846 1.847h1.847v7.384H1.846v-3.692h1.846v1.846h1.846zm3.693 0h5.538V9.23h-3.692v1.846h3.692v5.538H9.231V14.77h3.692v-1.846H9.231Zm7.384 1.846h5.539v3.692h-1.846v-1.846h-1.846v5.538h-1.847z"/></svg>',
        },
        link: "https://jsr.io/@picard/js",
        ariaLabel: "JSR",
      },
    ],
  },

  extends: {
    vite: {
      // @ts-ignore
      plugins: [OramaPlugin()],
    },
  },
});
