const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){e.start(),t.startBtn.setAttribute("disabled","")})),t.stopBtn.addEventListener("click",(function(){e.stop(),t.startBtn.removeAttribute("disabled","")}));const e={intervalId:null,start(){this.intervalId=setInterval(n,1e3)},stop(){clearInterval(this.intervalId)}};function n(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.aba25065.js.map
