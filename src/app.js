import * as core from "./core.js";
const tools=[
["json","{}","Format","JSON Formatter","Format, validate, or compact JSON."],
["url","↗","Encode","URL Encoder / Decoder","Encode or decode a URL component."],
["jwt","JWT","Inspect","JWT Decoder","Read a token header and payload without trusting it."],
["uuid","◇","Generate","UUID Generator","Generate UUID v4 identifiers using secure browser randomness."],
["base64","64","Encode","Base64 Encoder / Decoder","Convert UTF-8 text to and from Base64."],
["time","◷","Convert","Unix Timestamp","Convert seconds or milliseconds into readable dates."],
["case","Aa","Convert","Text Case Converter","Convert text into common programming naming styles."],
["regex",".*","Inspect","Regex Tester","Find matches and capture groups for a pattern."],
["diff","±","Compare","Text Diff","Compare two texts line by line."],
["html","<>","Encode","HTML Entity Converter","Encode or decode common HTML entities."],
["color","#","Convert","CSS Color Converter","Convert HEX or RGB input to HEX, RGB and HSL."],
["markdown","M↓","Preview","Markdown Preview","Preview a safe, deliberately small Markdown subset."],
["http","↔","Reference","HTTP Status Codes","Search a curated list of common HTTP response codes."]
].map(([id,icon,group,name,desc])=>({id,icon,group,name,desc}));
const $=id=>document.getElementById(id);let active="json";
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function field(label,id,value="",area=true){return '<div class="field"><label for="'+id+'">'+label+'</label>'+(area?'<textarea id="'+id+'">'+escapeHTML(value)+'</textarea>':'<input id="'+id+'" value="'+escapeHTML(value)+'">')+'</div>'}
function select(label,id,opts){return '<div class="field"><label for="'+id+'">'+label+'</label><select id="'+id+'">'+opts.map(o=>'<option value="'+o[0]+'">'+o[1]+'</option>').join("")+'</select></div>'}
function actions(items){return '<div class="actions">'+items.map(([id,label,primary])=>'<button type="button" class="button '+(primary?'primary':'')+'" id="'+id+'">'+label+'</button>').join("")+'</div>'}
function result(){return '<div class="output-top"><label>Output</label><button type="button" class="button" id="copy-output">Copy</button></div><pre id="output" class="result" tabindex="0">Your result will appear here.</pre>'}
function notice(s){return '<p class="notice">'+s+'</p>'}
function renderNav(){const q=$("tool-search").value.toLowerCase();const filtered=tools.filter(t=>(t.name+" "+t.group+" "+t.desc).toLowerCase().includes(q));let last="";$("tool-nav").innerHTML=filtered.map(t=>(last!==t.group?(last=t.group,'<div class="nav-section">'+escapeHTML(t.group.toUpperCase())+'</div>'):"")+'<button class="nav-button '+(t.id===active?'active':'')+'" data-tool="'+t.id+'"><span class="nav-icon">'+escapeHTML(t.icon)+'</span><span>'+escapeHTML(t.name)+'</span></button>').join("")||'<div class="empty-state">No utilities match that search.</div>'; $("tool-nav").querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.tool;renderNav();renderTool()}))}
function renderTool(){const t=tools.find(x=>x.id===active);let body="",warning="";
switch(active){
case"json":body=field("JSON input","input",'{"name":"DevFlow Kit","tools":["format","convert"],"openSource":true}')+actions([["format","Format JSON",true],["minify","Minify"]])+result();break;
case"url":body=field("Text or encoded component","input","Hello world & DevFlow!")+actions([["encode","Encode",true],["decode","Decode"]])+result();break;
case"jwt":body=field("JWT token","input","")+actions([["decode","Decode token",true]])+result();warning="Decoding is not validation. The signature, issuer, audience, expiry and authenticity are not verified. Never trust decoded claims by themselves.";break;
case"uuid":body=select("Quantity","count",[[1,"1 UUID"],[5,"5 UUIDs"],[10,"10 UUIDs"],[25,"25 UUIDs"],[100,"100 UUIDs"]])+actions([["generate","Generate UUIDs",true]])+result();break;
case"base64":body=field("Text or Base64 input","input","Hello, world! 🌱")+actions([["encode","Encode UTF-8",true],["decode","Decode UTF-8"]])+result();break;
case"time":body=field("Unix timestamp","input",String(Math.floor(Date.now()/1000)),false)+select("Unit","unit",[["s","Seconds"],["ms","Milliseconds"]])+actions([["convert","Convert timestamp",true],["now","Use current time"]])+result();break;
case"case":body=field("Text","input","hello world_devflow-kit",false)+select("Naming style","style",[["camel","camelCase"],["pascal","PascalCase"],["snake","snake_case"],["kebab","kebab-case"],["constant","CONSTANT_CASE"]])+actions([["convert","Convert text",true]])+result();break;
case"regex":body=field("Regular expression","pattern","\\b(dev|flow)\\b",false)+field("Test text","input","Build with DevFlow. Keep your flow.")+field("Flags","flags","gi",false)+actions([["test","Find matches",true]])+result();warning="Runs in an isolated Web Worker with a 250 ms timeout and input limits. Complex patterns may time out; use simpler patterns and smaller test inputs.";break;
case"diff":body=field("Original text","left","one\ntwo\nthree")+field("Changed text","right","one\n2\nthree\nfour")+actions([["compare","Compare lines",true]])+result();break;
case"html":body=field("Text / entities","input","<hello & goodbye>",false)+actions([["encode","Encode entities",true],["decode","Decode entities"]])+result();break;
case"color":body=field("HEX or RGB color","input","#A6F36B",false)+actions([["convert","Convert color",true]])+result();break;
case"markdown":body=field("Markdown source","input","# Hello\n\nWrite **clear** docs.\n\n- Keep it simple\n- Ship carefully")+actions([["preview","Create safe preview",true]])+result();warning="This is a small plain-text preview, not a full Markdown renderer. Raw HTML is not rendered or executed.";break;
case"http":body=field("Search status code or phrase","query","",false)+'<div id="status-results" class="result"></div>';break;
}
$("tool-panel").innerHTML='<div class="tool-heading"><div class="tool-title-wrap"><span class="tool-large-icon">'+escapeHTML(t.icon)+'</span><div><h2>'+escapeHTML(t.name)+'</h2><p>'+escapeHTML(t.desc)+'</p></div></div><span class="tool-category">'+escapeHTML(t.group.toUpperCase())+'</span></div>'+body+(warning?notice('<strong>Safety note</strong> · '+escapeHTML(warning)):"");
const show=(value,error=false)=>{const el=$("output");el.textContent=typeof value==="string"?value:JSON.stringify(value,null,2);el.classList.toggle("error",error)};
const run=(id,fn)=>{const b=$(id);if(b)b.addEventListener("click",()=>{try{show(fn())}catch(e){show(e.message||String(e),true)}})};
run("format",()=>core.formatJSON($("input").value));run("minify",()=>core.formatJSON($("input").value,true));
if(active==="url"||active==="base64"||active==="html"){
run("encode",()=>active==="url"?core.encodeURL($("input").value):active==="base64"?core.encodeBase64UTF8($("input").value):core.encodeHTMLEntities($("input").value));
run("decode",()=>active==="url"?core.decodeURL($("input").value):active==="base64"?core.decodeBase64UTF8($("input").value):core.decodeHTMLEntities($("input").value));
}
if(active==="jwt")run("decode",()=>{const v=core.decodeJWT($("input").value);return "HEADER\n"+JSON.stringify(v.header,null,2)+"\n\nPAYLOAD\n"+JSON.stringify(v.payload,null,2)+"\n\nSIGNATURE\n"+v.signature+"\n\nNot verified."});
run("generate",()=>core.generateUUIDs(Number($("count").value)).join("\n"));
run("convert",()=>active==="time"?core.convertTimestamp($("input").value,$("unit").value):active==="case"?core.convertCase($("input").value,$("style").value):core.parseColor($("input").value));
run("now",()=>{ $("input").value=$("unit").value==="s"?Math.floor(Date.now()/1000):Date.now();return core.convertTimestamp($("input").value,$("unit").value)});
const regexButton=$("test");
if(regexButton)regexButton.addEventListener("click",()=>{
  const pattern=$("pattern").value,flags=$("flags").value,textValue=$("input").value;
  if(pattern.length>500||textValue.length>100000){show("Pattern limit: 500 characters. Input limit: 100,000 characters.",true);return}
  regexButton.disabled=true;regexButton.textContent="Testing…";
  const worker=new Worker(new URL("./regex-worker.js",import.meta.url),{type:"module"});
  let finished=false;
  const finish=(value,error=false)=>{if(finished)return;finished=true;clearTimeout(timer);worker.terminate();regexButton.disabled=false;regexButton.textContent="Find matches";show(value,error)};
  const timer=setTimeout(()=>finish("Regex evaluation timed out (250 ms). Try a simpler pattern or smaller input.",true),250);
  worker.onmessage=e=>finish(e.data.error?e.data.error:e.data.result,Boolean(e.data.error));
  worker.onerror=()=>finish("Regex worker failed. Check the pattern and try again.",true);
  worker.postMessage({pattern,flags,text:textValue});
});
run("compare",()=>core.diffLines($("left").value,$("right").value).map(x=>({same:"  ",added:"+ ",removed:"- "}[x.type]+x.text)).join("\n"));
run("preview",()=>core.markdownToPlainPreview($("input").value));
if(active==="http"){const update=()=>{const q=$("query").value.toLowerCase();const rows=core.HTTP_STATUS.filter(([c,n,d])=>(c+" "+n+" "+d).toLowerCase().includes(q));$("status-results").innerHTML=rows.length?rows.map(([c,n,d])=>'<div class="status-item"><span class="status-code">'+c+'</span><span><span>'+escapeHTML(n)+'</span><span class="status-desc">'+escapeHTML(d)+'</span></span></div>').join(""):'No matching status codes.'};$("query").addEventListener("input",update);update()}
const copy=$("copy-output");if(copy)copy.addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("output").textContent);copy.textContent="Copied";setTimeout(()=>copy.textContent="Copy",1200)}catch{copy.textContent="Copy unavailable";setTimeout(()=>copy.textContent="Copy",1500)}});
}
$("tool-search").addEventListener("input",renderNav);document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();$("tool-search").focus()}});
renderNav();renderTool();