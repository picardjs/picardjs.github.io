import{_ as e,c as i,o as a,a3 as s}from"./chunks/framework.Bp5TMMxn.js";const g=JSON.parse('{"title":"Referencing Pilets","description":"","frontmatter":{},"headers":[],"relativePath":"guide/formats/pilet-v2.md","filePath":"guide/formats/pilet-v2.md","lastUpdated":1722107741000}'),t={name:"guide/formats/pilet-v2.md"},n=s(`<h1 id="referencing-pilets" tabindex="-1">Referencing Pilets <a class="header-anchor" href="#referencing-pilets" aria-label="Permalink to &quot;Referencing Pilets&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>Pilets are the building blocks of microfrontends in Piral, a framework for creating modular web applications. Each pilet represents an independently developed and deployable feature, enabling seamless integration and dynamic loading within a Piral instance. This approach promotes a highly scalable and maintainable architecture, allowing teams to work autonomously on different features and deploy updates without affecting the entire application. Pilets streamline the development process, enhance flexibility, and ensure a cohesive user experience across diverse components.</p><h2 id="using-pilets" tabindex="-1">Using Pilets <a class="header-anchor" href="#using-pilets" aria-label="Permalink to &quot;Using Pilets&quot;">​</a></h2><p>Pilets can be used either as part of a discovery service response or directly by referencing a component using a <code>source</code> with <code>format</code> set to <code>pilet</code>. Depending on the pilet specification more parameters might be necessary.</p><h3 id="pilet-v2" tabindex="-1">Pilet v2 <a class="header-anchor" href="#pilet-v2" aria-label="Permalink to &quot;Pilet v2&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pi-component</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyComponent&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://yourcompany.com/example/index.meta.json&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pilet&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pi-component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>Required:</p><ul><li><code>format</code> has to be set to <code>pilet</code></li></ul>`,9),l=[n];function o(r,p,h,c,d,k){return a(),i("div",null,l)}const m=e(t,[["render",o]]);export{g as __pageData,m as default};