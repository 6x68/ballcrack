(()=>{var p={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>{t(e)})},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){if(this._game)return this._game;{let r=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;return this._game=r,this._game}},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(){p.emit("beforeTick");let e=r._fixedUpdate.apply(this,arguments);return p.emit("afterTick"),e}}};var l=class{#e={};name;category;options;bind;isEnabled=!1;modes={};constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.bind=i,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}beforeTick(){}afterTick(){}onSettingUpdate(e,t){}onChunkAdded(){}onChunkRemoved(){}listenToEvent(e,t){this.#e[e]=t,p.on(e,t)}enable(){this.isEnabled=!0,p.emit("module.update",this),p.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,p.emit("module.update",this),p.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable();for(let[e,t]of Object.entries(this.#e))p.remove(e,t),delete this.#e[e]}toggle(){this.isEnabled?this.disable():this.enable()}};var Y={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var k=class extends l{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":"true"}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];afterTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=this.options["Auto Block"];a.game.world.loadedEntityList.forEach(o=>{let i=Y.distanceBetween(o.pos,a.game.player.pos);a.game.player.id!==o.id&&i<14&&!this.ignoreEntities.includes(o.constructor.name)&&(e=!0,t&&this.unblock(),a.game.controller.objectMouseOver.hitVec=o.pos.clone(),a.game.controller.attackEntity(o),t&&this.block())}),e||t&&this.unblock()}};var v=class extends l{constructor(){super("NoFall","Misc")}afterTick(){a.game.player.motion.y<-.5&&!a.game.player.jumping&&(a.game.player.onGround=!0,a.game.player.sendPositionAndRotation(),a.game.player.onGround=!1)}};var C=class extends l{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var E=class extends l{constructor(){super("Airjump","Movement",null)}beforeTick(){a.game.player.jumping&&(a.game.player.onGround=!0)}};var B=class extends l{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var f={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:function(){return{equals:function(o){return t=o,!0}}}})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:function(e){r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var $=34,J=1,L=class extends l{constructor(){super("Jesus","Movement",null)}onEnable(){let e=f.fromBlockStateId($).manager,t=f.fromBlockStateId(J).manager.block.constructor;this.waterBlock||(this.waterBlock=e.block),e.block=new t,e.block.id=$,e.block.isReplaceable=!0,e.block.transparent=!0,e.block.fullBlock=!1}onDisable(){let e=f.fromBlockStateId($).manager;e.block=this.waterBlock}};var M=class extends l{warned=!1;ticks=0;constructor(){super("InfiniteFly","Movement",{"Vertical Speed":2,"Reduce Vertical Movement":!0})}get reduceVerticalMovement(){return this.options["Render Vertical Movement"]}onDisable(){this.ticks=0}onEnable(){this.warned||(a.game.chat.addChat({text:`Infinite Fly only works on servers using the old ac
(KitPvP, Skywars, Eggwars, Bridge Duels,
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`}),this.warned=!0),this.listenToEvent("tick",()=>{if(this.ticks++,this.ticks<6){a.game.player.motion.y=0;return}(!this.reduceVerticalMovement||this.ticks%2===0)&&(a.game.player.motion.y=.18)})}};var S=class extends l{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var W={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:function(){return{getBlock:function(){return{onBlockActivated:function(){}}}}}},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var D=class extends l{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new f.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),W.placeBlock(n,1,{x:0,y:0,z:0}))}afterTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend);for(let c=1;c<=s;c++){let h=Math.floor(t.x+i*c+.5),m=t.y-1,g=Math.floor(t.z+n*c+.5);this.tryPlace(h,m,g)}}};var P=class extends l{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var z=class extends l{constructor(){super("Spider","Movement",{"Climb Speed":.2})}afterTick(){a.game.player.isCollidedHorizontally&&(a.game.player.motion.y=parseFloat(this.options["Climb Speed"]))}};var T=class extends l{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var d={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var x={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(c=>c+c).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var A=class extends l{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(d.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),c=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${x.hexToRGBA(n[0],s,h)}, ${x.hexToRGBA(n[1],s+.2,h+.2)})`,i.style.backdropFilter=`blur(${m}px) brightness(${c})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,i.appendChild(g),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>{this.arraylistContainer.appendChild(i)})}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",d.wrapper.appendChild(this.arraylistContainer),p.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e==="ClickGUI"||e==="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(c=>{c.style.background=`linear-gradient(to right, ${x.hexToRGBA(t[0],o,n)}, ${x.hexToRGBA(t[1],o+.2,n+.2)})`,c.style.backdropFilter=`blur(${s}px) brightness(${i})`,c.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var I=class extends l{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(...o){for(let i in this.meshes)this.meshes[i].material.depthTest=!1,this.meshes[i].renderOrder=3;for(let i in this.armorMesh)this.armorMesh[i].material.depthTest=!1,this.armorMesh[i].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let i of this.hatMesh.children[0].children)i.material&&(i.material.depthTest=!1,i.renderOrder=4);return t._renderPlayers.apply(this,o)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var N=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes?.[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes?.[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{d.wrapper.contains(t)&&d.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!Number.isNaN(s)&&s!==""&&(this.module.options[e]=s,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(Number.isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),p.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let c=document.createElement("input");c.type="color",c.className="gui-color-input",c.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),c.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(c),n.appendChild(s),i.appendChild(n),i.appendChild(h),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let c=document.createElement("div");c.className="gui-dropdown-selected",c.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(c),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&d.wrapper.contains(u)&&d.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},U=()=>{m()},j=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",i.forEach(y=>{let w=document.createElement("div");w.className="gui-dropdown-option mode-option",y===this.module.options[e]&&w.classList.add("selected"),w.textContent=y,w.addEventListener("click",q=>{q.stopPropagation(),c.textContent=y,this.module.options[e]=y,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:y}),m()}),u.appendChild(w)}),d.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=`${b.width}px`,u.style.position="fixed";let K=window.innerHeight-b.bottom,V=Math.min(i.length*30,150);K<V&&b.top>V?(u.style.bottom=`${window.innerHeight-b.top}px`,u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=`${b.bottom}px`,u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=`${b.left}px`,u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:U},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",U,!0),window.addEventListener("resize",U,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():j()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),i=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=`${o.width}px`,t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=`${o.height}px`,t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=`${o.height}px`,t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>i.right){let c=t.getBoundingClientRect().right-i.right;t.style.left=`${-c}px`}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1],10),i=parseInt(t[2],10),n=parseInt(t[3],10);return`#${((1<<24)+(o<<16)+(i<<8)+n).toString(16).slice(1)}`}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var F=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),d.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=`${o.clientX-t.x}px`,this.panel.style.top=`${o.clientY-t.y}px`)}),document.addEventListener("mouseup",()=>{e=!1})}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new N(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var O=class extends l{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?d.wrapper.classList.add("with-animations"):d.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),d.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),d.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),d.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),d.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),d.wrapper.style.setProperty("--text-color",this.options["Text Color"]),d.wrapper.style.setProperty("--glow-color",x.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",d.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel?.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new F(o.title,o.position);this.panels.push(i)});let t={};Object.values(H.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(c=>c.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",d.wrapper.appendChild(s),i.sort((c,h)=>{s.textContent=c.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),i.forEach(c=>{n.addButton(c)})})}setupEventListeners(){p.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>{e.show()}),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>{e.hide()}),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var R=class extends l{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),d.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var G=class{modules={};waitingForBind=!1;addModules(...e){for(let t of e){let o=new t;this.modules[o.name]=o}}addModule(e){this.modules[e.name]=e}handleKeyPress(e){for(let t in this.modules){let o=this.modules[t];this.waitingForBind?(o.bind=e,this.waitingForBind=!1):e&&o.bind===e&&o.toggle()}}init(){this.addModules(R,O,A,I,E,B,M,S,P,T,D,z,L,k,C,v),p.on("render",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onRender()}),p.on("beforeTick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].beforeTick()}),p.on("afterTick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].afterTick()}),p.on("keydown",this.handleKeyPress.bind(this)),p.on("setting.update",e=>{for(let t in this.modules)(this.modules[t].isEnabled||e.moduleName===t)&&this.modules[t].onSettingUpdate(e.setting,e.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}},H=new G;var _=`:host {
	--Ballcrack-accent-color: linear-gradient(
		90deg,
		rgb(64, 190, 255) 0%,
		rgb(129, 225, 255) 100%
	);
	--Ballcrack-accent-color: linear-gradient(
		90deg,
		rgb(64, 190, 255) 0%,
		rgb(129, 225, 255) 100%
	);
	--button-color: rgb(40, 40, 40, 0.9);
	--hover-color: rgb(50, 50, 50, 0.9);
	--panel-bg: rgb(18, 18, 18, 0.95);
	--header-bg: rgb(0, 0, 0, 0.85);
	--text-color: #ffffff;
	--header-text-size: 24px;
	--button-text-size: 18px;
	--setting-text-size: 15px;
	--animation-scale: 1;
	--border-radius: 6px;
	--shadow-color: rgba(0, 0, 0, 0.5);
	--transition-timing: cubic-bezier(0.19, 1, 0.22, 1);
	--spring-easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	--bounce-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	--elastic-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
	--standard-easing: cubic-bezier(0.4, 0, 0.2, 1);
	--decelerate-easing: cubic-bezier(0, 0, 0.2, 1);
	--accelerate-easing: cubic-bezier(0.4, 0, 1, 1);
	--hover-transition-duration: 120ms;
	--panel-appear-duration: 300ms;
	--button-appear-duration: 200ms;
	--setting-appear-duration: 200ms;
	--background-appear-duration: 250ms;
	--glow-color: rgba(64, 190, 255, 0.4);
	--scroller-size: 4px;
	--blur-intensity: 10px;

	text-shadow: none; /* miniblox global css override */
}

.gui-panel {
	position: fixed;
	z-index: 1000;
	width: 215px;
	border-radius: var(--border-radius);
	background-color: var(--panel-bg);
	box-shadow:
		0 8px 24px var(--shadow-color),
		0 0 0 1px rgba(255, 255, 255, 0.05),
		0 0 40px rgba(0, 0, 0, 0.2);
	transform-style: preserve-3d;
	font-family: "Inter", sans-serif;
	color: var(--text-color);
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(var(--blur-intensity));
	will-change: transform, opacity;
	transform: perspective(1200px);
	backface-visibility: hidden;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.gui-panel.dragging {
	animation: none;
	transition: none;
	will-change: transform;
}

.with-animations .gui-panel.dragging {
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
	transform: scale(1.05);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.gui-header {
	background-color: var(--header-bg);
	height: 40px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: var(--header-text-size);
	cursor: grab;
	backdrop-filter: blur(5px);
	position: relative;
	letter-spacing: 0.5px;
	will-change: transform;
}

.gui-header:active {
	cursor: grabbing;
}

.gui-button {
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	cursor: pointer;
	font-size: var(--button-text-size);
	font-weight: 400;
	outline: none;
	background: var(--button-color);
	color: var(--text-color);
	position: relative;
	overflow: hidden;
	letter-spacing: 0.3px;
	will-change: transform, background-color, box-shadow;
	transition:
		transform var(--hover-transition-duration) var(--spring-easing),
		background-color var(--hover-transition-duration) var(--standard-easing),
		box-shadow var(--hover-transition-duration) var(--standard-easing);
}

.gui-button.enabled {
	background: var(--Ballcrack-accent-color);
	font-weight: 500;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	box-shadow: 0 0 16px var(--glow-color);
}

.gui-button:not(.enabled):hover {
	background: var(--hover-color);
	transform: none;
	box-shadow: none;
}

.gui-background {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	height: 100%;
	width: 100%;
	backdrop-filter: blur(0px);
	background: rgba(0, 0, 0, 0);
	transition:
		backdrop-filter 300ms var(--decelerate-easing),
		background-color 300ms var(--decelerate-easing);
	will-change: backdrop-filter, background-color;
	pointer-events: auto;
}

.gui-button-container {
	background-color: var(--panel-bg);
	display: flex;
	flex-direction: column;
}

.gui-setting-container {
	margin-bottom: 12px;
	padding: 10px;
	background: rgba(30, 30, 30, 0.4);
	border-radius: 4px;
	width: 100%;
	box-sizing: border-box;
	transition: background 0.2s ease;
}

.gui-setting-container:hover {
	background: rgba(35, 35, 35, 0.5);
}

.gui-setting-container .gui-setting-label {
	font-size: 14px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.85);
	margin-bottom: 6px;
}

.setting-boolean {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 10px 12px;
}

.setting-boolean .gui-setting-label {
	margin-bottom: 0;
	flex: 1;
}

.checkbox-container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.gui-checkbox {
	position: relative;
	width: 22px;
	height: 22px;
	border-radius: 6px;
	background: linear-gradient(145deg, #2a2a2a, #222222);
	cursor: pointer;
	box-shadow:
		0 2px 6px rgba(0, 0, 0, 0.3),
		inset 0 -1px 3px rgba(0, 0, 0, 0.2);
	transition: all 0.3s var(--spring-easing);
	overflow: hidden;
}

.gui-checkbox:hover {
	box-shadow:
		0 0 10px rgba(255, 255, 255, 0.2),
		0 2px 6px rgba(0, 0, 0, 0.3);
}

.gui-checkbox.enabled {
	background: var(--Ballcrack-accent-color);
	transform: scale(1.05);
	box-shadow:
		0 0 12px var(--glow-color),
		inset 0 -1px 3px rgba(0, 0, 0, 0.2);
}

.gui-checkbox.enabled::after {
	content: "";
	position: absolute;
	display: block;
	width: 6px;
	height: 12px;
	border: solid white;
	border-width: 0 2px 2px 0;
	top: 2px;
	left: 7px;
	transform: rotate(45deg);
	animation: checkmark-pulse 0.5s var(--spring-easing) forwards;
}

.gui-checkbox.enabled::before {
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	width: 120%;
	height: 120%;
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 0.5),
		transparent 80%
	);
	transform: translate(-50%, -50%) scale(0);
	opacity: 0;
	border-radius: 50%;
	animation: checkbox-sparkle 0.6s ease-out forwards;
}

@keyframes checkmark-pulse {
	0% {
		transform: scale(0) rotate(45deg);
		opacity: 0;
	}
	70% {
		transform: scale(1.1) rotate(45deg);
		opacity: 1;
	}
	100% {
		transform: scale(1) rotate(45deg);
		opacity: 1;
	}
}

@keyframes checkbox-sparkle {
	0% {
		transform: translate(-50%, -50%) scale(0);
		opacity: 0.5;
	}
	70% {
		transform: translate(-50%, -50%) scale(1);
		opacity: 0.8;
	}
	100% {
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
	}
}

.setting-string,
.setting-number {
	display: flex;
	flex-direction: column;
}

.string-input-container,
.number-input-container {
	width: 100%;
}

.gui-text-input {
	width: 100%;
	height: 30px;
	background: rgba(40, 40, 40, 0.9);
	border: 1px solid rgba(60, 60, 60, 0.8);
	border-radius: 4px;
	color: rgba(255, 255, 255, 0.9);
	padding: 0 10px;
	font-size: 13px;
	box-sizing: border-box;
	transition: all 0.2s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.gui-text-input:hover {
	border-color: rgba(80, 80, 80, 0.9);
	background: rgba(45, 45, 45, 0.9);
}

.gui-text-input:focus {
	border-color: rgba(100, 100, 100, 1);
	background: rgba(50, 50, 50, 0.9);
	outline: none;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.setting-color {
	display: flex;
	flex-direction: column;
}

.gui-color-row {
	display: flex;
	width: 100%;
	gap: 8px;
}

.color-picker-container {
	position: relative;
	width: 40px;
	height: 30px;
}

.gui-color-picker {
	width: 100%;
	height: 100%;
	border-radius: 4px;
	position: relative;
	cursor: pointer;
	border: 1px solid rgba(60, 60, 60, 0.8);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	transition:
		border-color 0.2s ease,
		box-shadow 0.2s ease;
}

.gui-color-picker:hover {
	border-color: rgba(80, 80, 80, 0.9);
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.gui-color-input {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}

.color-text-input {
	flex: 1;
}

.module-settings-wrapper {
	display: none;
	background-color: rgba(20, 20, 20, 0.9);
	border-radius: 5px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	margin-top: 5px;
	padding: 0 8px;
	box-sizing: border-box;
	max-height: 0;
	overflow: hidden;
	opacity: 0;
	transition:
		max-height 500ms linear,
		opacity 500ms linear,
		padding 500ms linear;
	will-change: max-height, opacity, padding;
}

.module-settings-wrapper.module-settings-open {
	display: block;
	max-height: 400px;
	opacity: 1;
	padding: 8px;
}

.module-settings {
	overflow-y: auto;
	overflow-x: hidden;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.module-settings::-webkit-scrollbar {
	display: none;
	width: 0;
	height: 0;
}

.gui-text-input:focus,
.gui-color-picker:focus,
.gui-dropdown:focus {
	outline: none;
	box-shadow:
		0 0 0 1px rgba(80, 80, 80, 1),
		0 0 5px rgba(0, 0, 0, 0.3);
}

.scrollable-container {
	scrollbar-width: thin;
	scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1);
}

.scrollable-container::-webkit-scrollbar {
	width: var(--scroller-size);
	height: var(--scroller-size);
}

.scrollable-container::-webkit-scrollbar-track {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}

.scrollable-container::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	transition: background 300ms var(--standard-easing);
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.2);
}

.scrollable-container::-webkit-scrollbar-corner {
	background: transparent;
}

.with-animations .gui-panel:not(.dragging) {
	animation: panelAppear var(--panel-appear-duration) var(--standard-easing)
		both;
	transform-origin: center center;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

@keyframes panelAppear {
	0% {
		opacity: 0;
		transform: translateY(30px) scale(0.95);
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
	}
	100% {
		opacity: 1;
		transform: translateY(0) scale(1);
		box-shadow:
			0 8px 24px var(--shadow-color),
			0 0 0 1px rgba(255, 255, 255, 0.05),
			0 0 40px rgba(0, 0, 0, 0.2);
	}
}

.with-animations .gui-background {
	animation: backgroundFadeIn var(--background-appear-duration)
		var(--standard-easing) forwards;
}

@keyframes backgroundFadeIn {
	0% {
		opacity: 0;
		backdrop-filter: blur(0px);
		background: rgba(0, 0, 0, 0);
	}
	100% {
		opacity: 1;
		backdrop-filter: blur(8px);
		background: rgba(0, 0, 0, 0.4);
	}
}

.with-animations .gui-setting-container {
	animation: settingReveal var(--setting-appear-duration) var(--standard-easing)
		both;
}

@keyframes settingReveal {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.module-settings {
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 4px 5px;
	cursor: default;
	background: var(--panel-bg);
	border-radius: 4px;
	margin-top: 2px;
	will-change: transform, scroll-position;
	perspective: 1000px;
	backface-visibility: hidden;
}

.module-settings-container {
	position: relative;
	padding: 0;
	background: var(--panel-bg);
	border-radius: 4px;
}

.gui-dropdown {
	position: relative;
	width: 100%;
	height: 28px;
	background: rgba(30, 30, 30, 0.95);
	border-radius: 3px;
	border: 1px solid rgba(60, 60, 60, 0.7);
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.gui-dropdown:hover {
	background: rgba(40, 40, 40, 1);
	border-color: rgba(60, 60, 60, 0.9);
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.gui-dropdown-selected {
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 8px;
	color: white;
	font-size: 13px;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	user-select: none;
}

.gui-dropdown-arrow {
	width: 0;
	height: 0;
	margin-right: 10px;
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-top: 5px solid rgba(255, 255, 255, 0.7);
	pointer-events: none;
	transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gui-dropdown.open .gui-dropdown-arrow {
	transform: rotate(180deg);
	border-top-color: rgba(255, 255, 255, 0.9);
}

.gui-dropdown.open {
	background: rgba(40, 40, 40, 1);
	border-color: rgba(70, 70, 70, 1);
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.gui-dropdown-options {
	position: fixed;
	z-index: 9999;
	background: rgba(35, 35, 35, 1);
	border-radius: 3px;
	width: 100%;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
	border: 1px solid rgba(70, 70, 70, 0.9);
	max-height: 150px;
	overflow-y: auto;
	scrollbar-width: none;
	-ms-overflow-style: none;
	transform-origin: top center;
	animation: dropdown-appear 180ms var(--spring-easing) forwards;
	will-change: transform, opacity;
}

@keyframes dropdown-appear {
	from {
		opacity: 0;
		transform: translateY(-5px) scaleY(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scaleY(1);
	}
}

.gui-dropdown-options::-webkit-scrollbar {
	display: none;
}

.gui-dropdown-option {
	padding: 8px 10px;
	color: white;
	font-size: 13px;
	cursor: pointer;
	transition:
		background 0.15s ease,
		color 0.15s ease;
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.gui-dropdown-option:last-child {
	border-bottom: none;
}

.gui-dropdown-option:hover {
	background: rgba(50, 50, 50, 0.9);
	color: rgba(255, 255, 255, 1);
}

.gui-dropdown-option.selected {
	background: rgba(55, 55, 55, 0.9);
	color: rgba(255, 255, 255, 1);
	font-weight: 500;
}

.gui-dropdown-option.selected:hover {
	background: rgba(60, 60, 60, 0.95);
}

.dropdown-up {
	bottom: calc(100% + 1px);
	top: auto;
	transform-origin: bottom center;
	animation: dropdown-appear-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes dropdown-appear-up {
	from {
		opacity: 0;
		transform: translateY(5px) scaleY(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scaleY(1);
	}
}

.with-animations .gui-button {
	animation: buttonReveal var(--button-appear-duration) var(--standard-easing)
		both;
}

@keyframes buttonReveal {
	0% {
		opacity: 0;
		transform: translateY(8px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes gui-panel-hide {
	0% {
		opacity: 1;
		transform: perspective(1200px) scale(1) translateY(0);
	}
	100% {
		opacity: 0;
		transform: perspective(1200px) scale(0.97) translateY(8px);
	}
}

@keyframes gui-background-hide {
	0% {
		opacity: 1;
		backdrop-filter: blur(8px);
		background: rgba(0, 0, 0, 0.4);
	}
	100% {
		opacity: 0;
		backdrop-filter: blur(0px);
		background: rgba(0, 0, 0, 0);
	}
}

input,
textarea,
[contenteditable="true"],
.module-settings-wrapper {
	user-select: text;
	-webkit-user-select: text;
}

.gui-button-container {
	user-select: none;
}
`;function Q(r){let e=document.createElement("style");e.textContent=r,d.wrapper.appendChild(e)}var Z=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});Z.load().then(r=>document.fonts.add(r));var ee=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});ee.load().then(r=>document.fonts.add(r));Q(_);H.init();a.hookOnTick();document.addEventListener("keydown",r=>{p.emit("keydown",r.code)});setInterval(()=>{p.emit("render")},1e3/60);var te=!0;te&&(window.ballcrack={hooks:a,shadowWrapper:d,moduleManager:H,interactionUtils:W,blockUtils:f});})();
