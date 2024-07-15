import{_ as e,c as t,o as d,a3 as o}from"./chunks/framework.Bp5TMMxn.js";const f=JSON.parse('{"title":"Generic Component Lifecycle API","description":"","frontmatter":{},"headers":[],"relativePath":"api/lifecycle/index.md","filePath":"api/lifecycle/index.md","lastUpdated":1721050773000}'),c={name:"api/lifecycle/index.md"},r=o('<h1 id="generic-component-lifecycle-api" tabindex="-1">Generic Component Lifecycle API <a class="header-anchor" href="#generic-component-lifecycle-api" aria-label="Permalink to &quot;Generic Component Lifecycle API&quot;">​</a></h1><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><table><thead><tr><th>Name</th><th>Region</th><th>Arguments</th><th>Returns</th></tr></thead><tbody><tr><td><code>load</code></td><td>Client</td><td></td><td><code>Promise&lt;void&gt;</code></td></tr><tr><td><code>unload</code></td><td>Client</td><td></td><td><code>Promise&lt;void&gt;</code></td></tr><tr><td><code>mount</code></td><td>Client</td><td><code>container</code> (HTMLElement), <code>props</code> (1), <code>locals</code> (2)</td><td><code>void</code></td></tr><tr><td><code>unmount</code></td><td>Client</td><td><code>container</code> (HTMLElement), <code>locals</code> (2)</td><td><code>void</code></td></tr><tr><td><code>update</code></td><td>Client</td><td><code>props</code> (1), <code>locals</code> (2)</td><td><code>void</code></td></tr><tr><td><code>bootstrap</code></td><td>Server</td><td></td><td><code>Promise&lt;void&gt;</code></td></tr><tr><td><code>stringify</code></td><td>Server</td><td><code>props</code> (1)</td><td><code>Promise&lt;string&gt;</code></td></tr></tbody></table><p>(1) the <code>props</code> are the deserialized object from the <code>data</code> property</p><p>(2) the <code>locals</code> is an (initially) empty object that can be used at will to transport information between the different lifecycle methods; it is created per component instance</p>',5),a=[r];function i(n,l,s,p,h,m){return d(),t("div",null,a)}const u=e(c,[["render",i]]);export{f as __pageData,u as default};
