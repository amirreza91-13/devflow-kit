import test from "node:test";
import assert from "node:assert/strict";
import * as c from "../src/core.js";

test("JSON formatting validates and formats",()=>{assert.equal(c.formatJSON('{"a":1}'),'{\n  "a": 1\n}');assert.throws(()=>c.formatJSON("{oops}"))});
test("URL encode/decode round-trip Unicode",()=>{const s="سلام & hello";assert.equal(c.decodeURL(c.encodeURL(s)),s)});
test("JWT decoding reads UTF-8 JSON and makes no verification claim",()=>{const enc=o=>Buffer.from(JSON.stringify(o)).toString("base64url");const token=[enc({alg:"none"}),enc({sub:"سلام"}),"signature"].join(".");assert.deepEqual(c.decodeJWT(token).payload,{sub:"سلام"});assert.throws(()=>c.decodeJWT("bad"))});
test("UUID generation returns UUID v4 shape",()=>{const ids=c.generateUUIDs(4);assert.equal(ids.length,4);for(const id of ids)assert.match(id,/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i)});
test("Base64 UTF-8 round-trip",()=>{const s="Hello 🌱 فارسی";assert.equal(c.decodeBase64UTF8(c.encodeBase64UTF8(s)),s);assert.throws(()=>c.decodeBase64UTF8("%%%"))});
test("timestamp supports seconds and milliseconds",()=>{assert.equal(c.convertTimestamp("0","s").iso,"1970-01-01T00:00:00.000Z");assert.equal(c.convertTimestamp("0","ms").milliseconds,0);assert.throws(()=>c.convertTimestamp("nope"))});
test("case converter handles common styles",()=>{assert.equal(c.convertCase("hello world","camel"),"helloWorld");assert.equal(c.convertCase("hello-world","pascal"),"HelloWorld");assert.equal(c.convertCase("HelloWorld","snake"),"hello_world");assert.equal(c.convertCase("hello world","constant"),"HELLO_WORLD")});
test("regex matches captures and rejects invalid syntax",()=>{assert.equal(c.findRegexMatches("(a)(b)","g","ab ab").matches.length,2);assert.throws(()=>c.findRegexMatches("[","g","x"))});
test("line diff identifies additions and removals",()=>{assert.deepEqual(c.diffLines("a\nb","a\nc").map(x=>x.type),["same","removed","added"])});
test("HTML entities round-trip supported characters",()=>{const s="<tag a='x'>&";assert.equal(c.decodeHTMLEntities(c.encodeHTMLEntities(s)),s)});
test("color converter supports short hex and rgb",()=>{assert.deepEqual(c.parseColor("#fff"),{hex:"#FFFFFF",rgb:"rgb(255, 255, 255)",hsl:"hsl(0, 0%, 100%)"});assert.equal(c.parseColor("rgb(0, 0, 0)").hex,"#000000");assert.throws(()=>c.parseColor("#ggg"))});
test("markdown preview strips formatting without interpreting HTML",()=>{assert.equal(c.markdownToPlainPreview("# **Hello**"),"Hello");assert.equal(c.markdownToPlainPreview("<script>alert(1)</script>"),"<script>alert(1)</script>")});
test("HTTP reference contains common codes",()=>{assert.ok(c.HTTP_STATUS.some(x=>x[0]===404));assert.ok(c.HTTP_STATUS.some(x=>x[0]===429))});
test("regex handles zero-length global matches without looping forever",()=>{const result=c.findRegexMatches("(?=a)","g","aaa");assert.equal(result.matches.length,3);assert.deepEqual(result.matches.map(x=>x.index),[0,1,2])});
test("regex enforces input limits and rejects invalid flags",()=>{assert.throws(()=>c.findRegexMatches("a".repeat(501),"","x"),/500/);assert.throws(()=>c.findRegexMatches("a","","x".repeat(100001)),/100,000/);assert.throws(()=>c.findRegexMatches("a","gg","a"))});
test("timestamp rejects blank and out-of-range values",()=>{assert.throws(()=>c.convertTimestamp("   "));assert.throws(()=>c.convertTimestamp("1e100","ms"))});
test("color converter rejects out-of-range RGB channels",()=>{assert.throws(()=>c.parseColor("rgb(256, 0, 0)"),/0–255/);assert.throws(()=>c.parseColor("rgb(-1, 0, 0)"))});
test("line diff enforces its work limit",()=>{assert.throws(()=>c.diffLines(Array(250).fill("a").join("\n"),Array(250).fill("b").join("\n")),/too large/i)});

test("color converter accepts HSL, wraps hue, and normalizes grayscale",()=>{assert.equal(c.parseColor("hsl(0, 100%, 50%)").hex,"#FF0000");assert.equal(c.parseColor("hsl(120, 100%, 25%)").hex,"#008000");assert.equal(c.parseColor("hsl(240, 100%, 50%)").hex,"#0000FF");assert.equal(c.parseColor("hsl(360, 100%, 50%)").hex,"#FF0000");assert.equal(c.parseColor("hsl(0, 0%, 50%)").hex,"#808080")});
test("color converter rejects invalid HSL ranges and syntax",()=>{assert.throws(()=>c.parseColor("hsl(0, 101%, 50%)"),/HSL/);assert.throws(()=>c.parseColor("hsl(0, 50%, -1%)"));assert.throws(()=>c.parseColor("hsl(nope, 50%, 50%)"),/Use #RGB/);assert.throws(()=>c.parseColor("rgb(9999, 0, 0)"))});
