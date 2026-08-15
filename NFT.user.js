// ==UserScript==
// @name NFT - Nest of Fluffy Treasures
// @namespace https://www.bondageprojects.com/
// @version 1.5.0
// @description NFT - Nest of Fluffy Treasures (multilingual EN/DE/FR/RU/CN/TW/UA): Save and load ItemHandheld / ItemMisc items with full appearance, crafter and property restore.
// @author Nicole, Felix, Tifa
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://bondageprojects.com/*
// @match https://www.bondageprojects.com/*
// @icon  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASsSURBVFhH1VdbKKVrGHbKOJ/lUExyKkIuMBnnw4TIWc6liCKRwQUmp2YuZESKQhFCTnGDkuKCC0JciJRDMVJcGIqw3t3z1r9a659/MbPbbXs/9dW//u973+95z/9Sk8lkhzKZ7OqN1qGaTCb7SW8E3A0CV+KNfwu4+/9H4MePHzQ9PU0NDQ1UWFhIBQUFVF1dTf39/bS/vy8+/iL+iMD6+jplZWWRrq4uqampqVxhYWE0MzMjFpfEbxG4v7+n0tJS+QXm5uaUlpZG3d3dNDs7S3Nzc9Tb28uesLW1lZ+Lj4+ns7MzsTolvErg+vqaPn78yApheUpKCo2MjPDe0dERnZ+f08PDg/z87e0tdXV1kYWFBcvY29vT7u6ugkZlvEgAln/48EFuUXJyMo2NjdHKygptbW2RgYEBffv2jfLy8ujx8VFJ9uTkhPz8/FjO2tqaf0vhRQJFRUWs4N27d5STk0NNTU2cdIuLi+Tj48OhgFfwLIWbmxvy9PRkHf7+/vT8/Cw+oprA6uqq3HJnZ2fy8vIiOzs7Ojw85BDgfXFxMRkaGpK+vr7KWO/t7ZGOjg6fR86IoZJATEyMnICbmxtZWVnx5YODg/T+/Xt+D2/ExsaSsbExBQcHQ5lYDUNIYMgp5gsgSeD09JS0tLRYCCUFD6Dmv3z5QiEhIaStrU2amppkampKNjY2FBcXRw4ODlRbW6uoRo6dnR1SV1dnfQsLC0p7kgSGh4f5sKWlJeXn55Oenh6lp6ezxZ8+fWJCcD2sr6mpYZK5ubm8JwXEHgSh8/Pnz0p7kgTQ1XA4OjqaAgMD2VokU1VVFZWVlbEXhPDA9QkJCfyMXDg+PlZUJYcgExUVpfRekgCsxuHU1FQKDQ1lAgEBAXw5KsDV1ZX30Wjq6uo4xiCKd8j2u7s7RXWM8PBw3hdXjCQBdDThgpKSEtLQ0KCgoCB2Hyz09vbmjoeyjIiI4PaMUCAEkEPFoIoU4eLiwnu+vr5K7yUJIJlwODIyklpbW9kDiDtCMDAwQPX19dwbTExMOCEzMzM5RwQvIOHQmgVgQEEH9pCwipAkMD4+zocdHR156pmZmbEXUAlIuKurK+6COOPh4cEyFxcX1NfXR42Njb90vfLycnnOwFOKkCSAcQsLIbC8vMyhwHNGRgYvkFpaWuJ3OAevqMLm5iZ7SSAAfYqQJAAkJSWxABIRl6Hlwo1tbW2cydvb2zQ1NcVhgGeksLa2xg1MuBxhFM8MlQQ2NjbkgkNDQzQ6OsrPGCyILwZTe3s7hwtdE6ulpYUmJiaop6eHEhMTuVegSwpNCB8sYqgkAKDsIAjrMQGF6kBj6ujooObmZsrOzuZkFchiIT/QQ7AnjGWUsxReJAB3CQ0EJL5//85LGLP4TkCVYD6ge8JTyIfOzk6uDGEIYQYgr6TwIgEAIxWZL1iHuscF+A4AOSMjI7YYzcnd3V0p5lhOTk50cHAgVivHqwSAp6cnqqys5FIUFGMQob8jCRUvVFz4bLu8vBSrU8JvERCAzMfXjxBXqYVQodmIp54q/BEBAWhE8/PzHP+KigpuNF+/fqXJyclfmtBr+FsE/kn8Zwi8+Z/TN/17/heq/Kgp31FL5AAAAABJRU5ErkJggg==
// @grant none
// @run-at document-end
// ==/UserScript==

setTimeout(() => {
    import(
    `https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js?v=${(Date.now() / 10000).toFixed(0)}`
)
.then(() => console.log("NFT: Successfully loaded from GitLab Pages!"))
.catch(err => console.error("NFT: If you see this, the Pages build is still running.", err));
}, 10000);
