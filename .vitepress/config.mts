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
    // guidance for AI assistants (see /guide/ai-assistants)
    [
      "link",
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "llms.txt" },
    ],
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
      message:
        'Released under the MIT License. Using an AI assistant? Point it to <a href="/llms.txt" target="_blank">llms.txt</a>.',
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
            text: "llms.txt",
            link: "/llms.txt",
            target: "_blank",
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
            { text: "Samples", link: "/guide/samples" },
            { text: "AI Assistants", link: "/guide/ai-assistants" },
            { text: "FAQ", link: "/guide/faq" },
          ],
        },
        {
          text: "Integrations",
          items: [
            { text: "Single-Page Apps", link: "/guide/integrations/spa" },
            {
              text: "Server-Side Rendering",
              link: "/guide/integrations/ssr",
            },
            { text: "Desktop & Mobile Apps", link: "/guide/integrations/apps" },
            { text: "Testing", link: "/guide/integrations/testing" },
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
            { text: "Islands", link: "/guide/variants/islands" },
            { text: "Electron", link: "/guide/variants/electron" },
            { text: "Native", link: "/guide/variants/native" },
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
    ],
  },

  extends: {
    vite: {
      // @ts-ignore
      plugins: [OramaPlugin()],
    },
  },
});
