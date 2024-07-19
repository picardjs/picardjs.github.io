import{_ as s,c as i,o as t,a3 as a}from"./chunks/framework.Bp5TMMxn.js";const e="/assets/orchestrator.C7bCd-ig.svg",u=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md","lastUpdated":1721400242000}'),n={name:"guide/index.md"},p=a('<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h1><p>Picard.js is a micro frontend orchestrator. This means, that the job of Picard.js is to load micro frontends, run them, and mount, update, unmount the components exposed by the micro frontends.</p><p><img src="'+e+`" alt="Orchestrator"></p><p>Picard.js exists as a drop-in script for your website, as well as a module that you can include in your application.</p><p>Here is how to include the drop-in script in your website:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://unpkg.com/picard-js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>This will automatically set up and run Picard.js on your website.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Alternatively, if you don&#39;t like unpkg you can also use jsdelivr:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/picard-js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>In fact, any CDN that uses npm as a source will work.</p></div><p>Now start creating regions in the HTML for the components of the micro frontends you&#39;d like to display:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pi-component</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyComponent&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://yourcompany.com/example/remoteEntry.js&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;module&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  remote-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;example&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pi-component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>The <code>pi-component</code> web component acts as a container element to display the content brought in by the component (in this case <code>MyComponent</code>) of the referenced micro frontend (specified by its <code>source</code>, <code>format</code>, and - necessary in this case - <code>remote-name</code>).</p><p>Since Picard.js only exposes web components you can always safely write them in your HTML. Worst thing that can happen is that nothing renders.</p><p>That&#39;s it for the basics 🎉!</p><p>Let&#39;s go into more details.</p>`,14),o=[p];function h(l,r,d,c,k,g){return t(),i("div",null,o)}const m=s(n,[["render",h]]);export{u as __pageData,m as default};