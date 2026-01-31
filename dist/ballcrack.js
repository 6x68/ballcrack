<<<<<<< HEAD
(()=>{var p={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>{t(e)})},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){if(this._game)return this._game;{let r=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;return this._game=r,this._game}},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(){p.emit("beforeTick");let e=r._fixedUpdate.apply(this,arguments);return p.emit("afterTick"),e}}};var l=class{#e={};name;category;options;bind;isEnabled=!1;modes={};constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.bind=i,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}beforeTick(){}afterTick(){}onSettingUpdate(e,t){}onChunkAdded(){}onChunkRemoved(){}listenToEvent(e,t){this.#e[e]=t,p.on(e,t)}enable(){this.isEnabled=!0,p.emit("module.update",this),p.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,p.emit("module.update",this),p.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable();for(let[e,t]of Object.entries(this.#e))p.remove(e,t),delete this.#e[e]}toggle(){this.isEnabled?this.disable():this.enable()}};var Y={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var k=class extends l{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":"true"}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];afterTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=this.options["Auto Block"];a.game.world.loadedEntityList.forEach(o=>{let i=Y.distanceBetween(o.pos,a.game.player.pos);a.game.player.id!==o.id&&i<14&&!this.ignoreEntities.includes(o.constructor.name)&&(e=!0,t&&this.unblock(),a.game.controller.objectMouseOver.hitVec=o.pos.clone(),a.game.controller.attackEntity(o),t&&this.block())}),e||t&&this.unblock()}};var v=class extends l{constructor(){super("NoFall","Misc")}afterTick(){a.game.player.motion.y<-.5&&!a.game.player.jumping&&(a.game.player.onGround=!0,a.game.player.sendPositionAndRotation(),a.game.player.onGround=!1)}};var C=class extends l{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var E=class extends l{constructor(){super("Airjump","Movement",null)}beforeTick(){a.game.player.jumping&&(a.game.player.onGround=!0)}};var B=class extends l{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var f={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:function(){return{equals:function(o){return t=o,!0}}}})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:function(e){r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var $=34,J=1,L=class extends l{constructor(){super("Jesus","Movement",null)}onEnable(){let e=f.fromBlockStateId($).manager,t=f.fromBlockStateId(J).manager.block.constructor;this.waterBlock||(this.waterBlock=e.block),e.block=new t,e.block.id=$,e.block.isReplaceable=!0,e.block.transparent=!0,e.block.fullBlock=!1}onDisable(){let e=f.fromBlockStateId($).manager;e.block=this.waterBlock}};var M=class extends l{warned=!1;ticks=0;constructor(){super("InfiniteFly","Movement",{"Vertical Speed":2,"Reduce Vertical Movement":!0})}get reduceVerticalMovement(){return this.options["Render Vertical Movement"]}onDisable(){this.ticks=0}onEnable(){this.warned||(a.game.chat.addChat({text:`Infinite Fly only works on servers using the old ac
(KitPvP, Skywars, Eggwars, Bridge Duels,
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`}),this.warned=!0),this.listenToEvent("tick",()=>{if(this.ticks++,this.ticks<6){a.game.player.motion.y=0;return}(!this.reduceVerticalMovement||this.ticks%2===0)&&(a.game.player.motion.y=.18)})}};var S=class extends l{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var W={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:function(){return{getBlock:function(){return{onBlockActivated:function(){}}}}}},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var D=class extends l{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new f.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),W.placeBlock(n,1,{x:0,y:0,z:0}))}afterTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend);for(let c=1;c<=s;c++){let h=Math.floor(t.x+i*c+.5),m=t.y-1,g=Math.floor(t.z+n*c+.5);this.tryPlace(h,m,g)}}};var P=class extends l{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var z=class extends l{constructor(){super("Spider","Movement",{"Climb Speed":.2})}afterTick(){a.game.player.isCollidedHorizontally&&(a.game.player.motion.y=parseFloat(this.options["Climb Speed"]))}};var T=class extends l{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var d={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var x={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(c=>c+c).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var A=class extends l{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(d.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),c=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${x.hexToRGBA(n[0],s,h)}, ${x.hexToRGBA(n[1],s+.2,h+.2)})`,i.style.backdropFilter=`blur(${m}px) brightness(${c})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,i.appendChild(g),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>{this.arraylistContainer.appendChild(i)})}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",d.wrapper.appendChild(this.arraylistContainer),p.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e==="ClickGUI"||e==="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(c=>{c.style.background=`linear-gradient(to right, ${x.hexToRGBA(t[0],o,n)}, ${x.hexToRGBA(t[1],o+.2,n+.2)})`,c.style.backdropFilter=`blur(${s}px) brightness(${i})`,c.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var I=class extends l{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(...o){for(let i in this.meshes)this.meshes[i].material.depthTest=!1,this.meshes[i].renderOrder=3;for(let i in this.armorMesh)this.armorMesh[i].material.depthTest=!1,this.armorMesh[i].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let i of this.hatMesh.children[0].children)i.material&&(i.material.depthTest=!1,i.renderOrder=4);return t._renderPlayers.apply(this,o)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var N=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes?.[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes?.[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{d.wrapper.contains(t)&&d.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!Number.isNaN(s)&&s!==""&&(this.module.options[e]=s,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(Number.isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),p.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let c=document.createElement("input");c.type="color",c.className="gui-color-input",c.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),c.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(c),n.appendChild(s),i.appendChild(n),i.appendChild(h),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let c=document.createElement("div");c.className="gui-dropdown-selected",c.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(c),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&d.wrapper.contains(u)&&d.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},U=()=>{m()},j=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",i.forEach(y=>{let w=document.createElement("div");w.className="gui-dropdown-option mode-option",y===this.module.options[e]&&w.classList.add("selected"),w.textContent=y,w.addEventListener("click",q=>{q.stopPropagation(),c.textContent=y,this.module.options[e]=y,p.emit("setting.update",{moduleName:this.module.name,setting:e,value:y}),m()}),u.appendChild(w)}),d.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=`${b.width}px`,u.style.position="fixed";let K=window.innerHeight-b.bottom,V=Math.min(i.length*30,150);K<V&&b.top>V?(u.style.bottom=`${window.innerHeight-b.top}px`,u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=`${b.bottom}px`,u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=`${b.left}px`,u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:U},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",U,!0),window.addEventListener("resize",U,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():j()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),i=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=`${o.width}px`,t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=`${o.height}px`,t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=`${o.height}px`,t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>i.right){let c=t.getBoundingClientRect().right-i.right;t.style.left=`${-c}px`}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1],10),i=parseInt(t[2],10),n=parseInt(t[3],10);return`#${((1<<24)+(o<<16)+(i<<8)+n).toString(16).slice(1)}`}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var F=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),d.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=`${o.clientX-t.x}px`,this.panel.style.top=`${o.clientY-t.y}px`)}),document.addEventListener("mouseup",()=>{e=!1})}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new N(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var O=class extends l{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?d.wrapper.classList.add("with-animations"):d.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),d.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),d.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),d.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),d.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),d.wrapper.style.setProperty("--text-color",this.options["Text Color"]),d.wrapper.style.setProperty("--glow-color",x.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",d.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel?.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new F(o.title,o.position);this.panels.push(i)});let t={};Object.values(H.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(c=>c.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",d.wrapper.appendChild(s),i.sort((c,h)=>{s.textContent=c.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),i.forEach(c=>{n.addButton(c)})})}setupEventListeners(){p.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>{e.show()}),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>{e.hide()}),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var R=class extends l{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),d.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var G=class{modules={};waitingForBind=!1;addModules(...e){for(let t of e){let o=new t;this.modules[o.name]=o}}addModule(e){this.modules[e.name]=e}handleKeyPress(e){for(let t in this.modules){let o=this.modules[t];this.waitingForBind?(o.bind=e,this.waitingForBind=!1):e&&o.bind===e&&o.toggle()}}init(){this.addModules(R,O,A,I,E,B,M,S,P,T,D,z,L,k,C,v),p.on("render",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onRender()}),p.on("beforeTick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].beforeTick()}),p.on("afterTick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].afterTick()}),p.on("keydown",this.handleKeyPress.bind(this)),p.on("setting.update",e=>{for(let t in this.modules)(this.modules[t].isEnabled||e.moduleName===t)&&this.modules[t].onSettingUpdate(e.setting,e.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}},H=new G;var _=`:host {
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
(()=>{var c={listeners:{},activeKeys:new Set,on:function(i,e){this.listeners[i]||(this.listeners[i]=[]),this.listeners[i].push(e)},remove:function(i,e){this.listeners[i]&&(this.listeners[i]=this.listeners[i].filter(t=>t!==e))},emit:function(i,e){this.listeners[i]&&this.listeners[i].forEach(t=>t(e))},trackKey:function(i,e,t){i==="keydown"&&moduleManager.handleKeyPress(t),i==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),i==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){return this._game?this._game:this._game=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game},hookOnTick(){let i=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(){let e=i._fixedUpdate.apply(this,arguments);return c.emit("tick"),e}}};var G={normalizeVector(i){let e=i.x*i.x+i.y*i.y+i.z*i.z;if(e>0){let t=1/Math.sqrt(e);return[i.x*t,i.y*t,i.z*t]}return i},distanceBetween(i,e){let t=e.x-i.x,o=e.y-i.y,r=e.z-i.z;return t*t+o*o+r*r},distanceBetweenSqrt(i,e){return Math.sqrt(this.distanceBetween(i,e))}};var p=class{constructor(e,t,o,r){this.name=e,this.category=t,this.options=o,this.keybind=r,this.waitingForBind=!1,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}onTick(){}onSettingUpdate(){}onChunkAdded(){}onChunkRemoved(){}onGameEntered(){}onGameExited(){}onNoaTick(){}enable(){this.isEnabled=!0,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable()}toggle(){this.isEnabled?this.disable():this.enable()}};var w=class extends p{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":!0}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];onTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=this.options["Auto Block"];a.game.world.loadedEntityList.forEach(o=>{let r=G.distanceBetween(o.pos,a.game.player.pos);a.game.player.id!==o.id&&r<14&&!this.ignoreEntities.includes(o.constructor.name)&&(e=!0,t&&this.unblock(),a.game.controller.objectMouseOver.hitVec=o.pos.clone(),a.game.controller.attackEntity(o),t&&this.block())}),e||t&&this.unblock()}};var k=class extends p{constructor(){super("NoFall","Misc")}onTick(){a.game.player.fallDistance>=2.5&&(a.game.player.fallDistance=0,a.game.player.onGround=!0,a.game.player.sendPositionAndRotation())}};var v=class extends p{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var C=class extends p{constructor(){super("Airjump","Movement",null)}onEnable(){a.game.player.__defineGetter__("onGround",()=>!0),a.game.player.__defineSetter__("onGround",()=>!0)}onDisable(){delete a.game.player.onGround,a.game.player.onGround=!1}};var E=class extends p{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var B=class extends p{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var H={fromBlockStateId(i){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:function(){return{equals:function(o){return t=o,!0}}}})(0,i),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let i={};return a.game.world.setAirXYZ.bind({setBlockState:function(e){i=e}})(0,0,0),this._cBlockPos=i.constructor,this._cBlockPos}};var O={placeBlock(i,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:function(){return{getBlock:function(){return{onBlockActivated:function(){}}}}}},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},i,{toProto:()=>e},t)}};var L=class extends p{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let r=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new H.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,r),O.placeBlock(n,1,{x:0,y:0,z:0}))}onTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,r=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend);for(let l=1;l<=s;l++){let h=Math.floor(t.x+r*l+.5),m=t.y-1,g=Math.floor(t.z+n*l+.5);this.tryPlace(h,m,g)}}};var M=class extends p{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var S=class extends p{constructor(){super("Spider","Movement",{"Climb Speed":.2})}onTick(){a.game.player.isCollidedHorizontally&&(a.game.player.motion.y=parseFloat(this.options["Climb Speed"]))}};var D=class extends p{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var f={parseRGBString(i){let e=i.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(i){return i?i.r<=1&&i.g<=1&&i.b<=1?i:{r:i.r/255,g:i.g/255,b:i.b/255}:{r:1,g:1,b:1}},hexToRGBA(i,e=1,t=1){let o=i.startsWith("#")?i.substring(1):i;o.length===3&&(o=o.split("").map(l=>l+l).join(""));let r=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(r)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(i){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var d={instance:null,get wrapper(){if(!this.instance){let i=document.createElement("iframe");document.body.appendChild(i);let e=i.contentWindow.Element.prototype.attachShadow;i.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var z=class extends p{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(d.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let r=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),l=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);r.style.background=`linear-gradient(to right, ${f.hexToRGBA(n[0],s,h)}, ${f.hexToRGBA(n[1],s+.2,h+.2)})`,r.style.backdropFilter=`blur(${m}px) brightness(${l})`,r.style.color="white",r.style.padding="2px 10px",r.style.display="flex",r.style.alignItems="center",r.style.boxSizing="border-box",r.style.margin="0",r.style.lineHeight="1",r.style.gap="0",r.style.fontFamily="'Product Sans', sans-serif",r.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",r.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",r.style.overflow="hidden",r.style.maxHeight="0",r.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,r.appendChild(g),this.arraylistContainer.appendChild(r),setTimeout(()=>{r.style.maxHeight="50px",r.style.opacity="1"},1),this.namesMap[e]=r}}else if(this.namesMap[e]){let r=this.namesMap[e];r.style.maxHeight="0",r.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(r)&&this.arraylistContainer.removeChild(r),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((r,n)=>this.measureElementWidth(n)-this.measureElementWidth(r));this.arraylistContainer.innerHTML="",o.forEach(r=>this.arraylistContainer.appendChild(r))}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",d.wrapper.appendChild(this.arraylistContainer),c.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e=="ClickGUI"||e=="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),r=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(l=>{l.style.background=`linear-gradient(to right, ${f.hexToRGBA(t[0],o,n)}, ${f.hexToRGBA(t[1],o+.2,n+.2)})`,l.style.backdropFilter=`blur(${s}px) brightness(${r})`,l.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var P=class extends p{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(){for(let o in this.meshes)this.meshes[o].material.depthTest=!1,this.meshes[o].renderOrder=3;for(let o in this.armorMesh)this.armorMesh[o].material.depthTest=!1,this.armorMesh[o].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let o of this.hatMesh.children[0].children)o.material&&(o.material.depthTest=!1,o.renderOrder=4);return t._renderPlayers.apply(this,arguments)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var A=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let r=this.module.options[o],n=typeof r;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes&&this.module.modes[o]?t.mode.push(o):n==="boolean"||r==="true"||r==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],r=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes&&this.module.modes[t]?this.addModeSelector(t):r==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):r==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{d.wrapper.contains(t)&&d.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let r=document.createElement("div");r.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!isNaN(s)&&s!==""&&(this.module.options[e]=s,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),r.appendChild(n),t.appendChild(o),t.appendChild(r),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let r=document.createElement("div");r.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),r.appendChild(n),t.appendChild(o),t.appendChild(r),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let r=document.createElement("div");r.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),r.appendChild(n),t.appendChild(o),t.appendChild(r),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let r=document.createElement("div");r.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let l=document.createElement("input");l.type="color",l.className="gui-color-input",l.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),l.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(l),n.appendChild(s),r.appendChild(n),r.appendChild(h),t.appendChild(o),t.appendChild(r),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let r=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let l=document.createElement("div");l.className="gui-dropdown-selected",l.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(l),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&d.wrapper.contains(u)&&d.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},R=()=>{m()},_=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",r.forEach(x=>{let y=document.createElement("div");y.className="gui-dropdown-option mode-option",x===this.module.options[e]&&y.classList.add("selected"),y.textContent=x,y.addEventListener("click",V=>{V.stopPropagation(),l.textContent=x,this.module.options[e]=x,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:x}),m()}),u.appendChild(y)}),d.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=b.width+"px",u.style.position="fixed";let Y=window.innerHeight-b.bottom,W=Math.min(r.length*30,150);Y<W&&b.top>W?(u.style.bottom=window.innerHeight-b.top+"px",u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=b.bottom+"px",u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=b.left+"px",u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:R},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",R,!0),window.addEventListener("resize",R,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():_()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),r=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=o.width+"px",t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=o.height+"px",t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=o.height+"px",t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>r.right){let l=t.getBoundingClientRect().right-r.right;t.style.left=-l+"px"}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1]),r=parseInt(t[2]),n=parseInt(t[3]);return"#"+((1<<24)+(o<<16)+(r<<8)+n).toString(16).slice(1)}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var N=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),d.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=o.clientX-t.x+"px",this.panel.style.top=o.clientY-t.y+"px")}),document.addEventListener("mouseup",()=>e=!1)}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let r=new A(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),r.initialize(),r.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var T=class extends p{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?d.wrapper.classList.add("with-animations"):d.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),d.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),d.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),d.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),d.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),d.wrapper.style.setProperty("--text-color",this.options["Text Color"]),d.wrapper.style.setProperty("--glow-color",f.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",d.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel&&o.panel.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let r=new N(o.title,o.position);this.panels.push(r)});let t={};Object.values(I.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,r])=>{let n=this.panels.find(l=>l.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",d.wrapper.appendChild(s),r.sort((l,h)=>{s.textContent=l.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),r.forEach(l=>n.addButton(l))})}setupEventListeners(){c.on("module.update",e=>{let t=this.panels.find(r=>r.header.textContent===e.category);if(!t)return;let o=t.buttons.find(r=>r.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>e.show()),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>e.hide()),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var F=class extends p{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),d.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var I={modules:{},addModules:function(...i){for(let e of i){let t=new e;this.modules[t.name]=t}},addModule:function(i){this.modules[i.name]=i},handleKeyPress:function(i){for(let e in this.modules){let t=this.modules[e];t.waitingForBind?(t.keybind=i,t.waitingForBind=!1):i&&t.keybind==i&&t.toggle()}},init(){this.addModules(F,T,z,P,C,B,D,E,M,L,S,w,v,k),c.on("render",()=>{for(let i in this.modules)this.modules[i].isEnabled&&this.modules[i].onRender()}),c.on("tick",()=>{for(let i in this.modules)this.modules[i].isEnabled&&this.modules[i].onTick()}),c.on("keydown",this.handleKeyPress.bind(this)),c.on("setting.update",i=>{for(let e in this.modules)(this.modules[e].isEnabled||i.moduleName===e)&&this.modules[e].onSettingUpdate(i.moduleName,i.setting,i.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}};var U=`:host {\r
    --Ballcrack-accent-color: linear-gradient(90deg, rgb(64, 190, 255) 0%, rgb(129, 225, 255) 100%);\r
    --Ballcrack-accent-color: linear-gradient(90deg, rgb(64, 190, 255) 0%, rgb(129, 225, 255) 100%);\r
    --button-color: rgb(40, 40, 40, 0.9);\r
    --hover-color: rgb(50, 50, 50, 0.9);\r
    --panel-bg: rgb(18, 18, 18, 0.95);\r
    --header-bg: rgb(0, 0, 0, 0.85);\r
    --text-color: #ffffff;\r
    --header-text-size: 24px;\r
    --button-text-size: 18px;\r
    --setting-text-size: 15px;\r
    --animation-scale: 1;\r
    --border-radius: 6px;\r
    --shadow-color: rgba(0, 0, 0, 0.5);\r
    --transition-timing: cubic-bezier(0.19, 1, 0.22, 1);\r
    --spring-easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);\r
    --bounce-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);\r
    --elastic-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
    --standard-easing: cubic-bezier(0.4, 0, 0.2, 1);\r
    --decelerate-easing: cubic-bezier(0, 0, 0.2, 1);\r
    --accelerate-easing: cubic-bezier(0.4, 0, 1, 1);\r
    --hover-transition-duration: 120ms;\r
    --panel-appear-duration: 300ms;\r
    --button-appear-duration: 200ms;\r
    --setting-appear-duration: 200ms;\r
    --background-appear-duration: 250ms;\r
    --glow-color: rgba(64, 190, 255, 0.4);\r
    --scroller-size: 4px;\r
    --blur-intensity: 10px;\r
\r
    text-shadow: none; /* miniblox global css override */\r
}\r
\r
.gui-panel {\r
    position: fixed;\r
    z-index: 1000;\r
    width: 215px;\r
    border-radius: var(--border-radius);\r
    background-color: var(--panel-bg);\r
    box-shadow: 0 8px 24px var(--shadow-color),\r
                0 0 0 1px rgba(255, 255, 255, 0.05),\r
                0 0 40px rgba(0, 0, 0, 0.2);\r
    transform-style: preserve-3d;\r
    font-family: 'Inter', sans-serif;\r
    color: var(--text-color);\r
    overflow: hidden;\r
    border: 1px solid rgba(255, 255, 255, 0.05);\r
    backdrop-filter: blur(var(--blur-intensity));\r
    will-change: transform, opacity;\r
    transform: perspective(1200px);\r
    backface-visibility: hidden;\r
    user-select: none;\r
    -webkit-user-select: none;\r
    -moz-user-select: none;\r
    -ms-user-select: none;\r
}\r
\r
.gui-panel.dragging {\r
    animation: none !important;\r
    transition: none !important;\r
    will-change: transform;\r
}\r
\r
.with-animations .gui-panel.dragging {\r
    transition: transform 0.2s ease, box-shadow 0.2s ease;\r
    transform: scale(1.05);\r
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);\r
}\r
\r
.gui-header {\r
    background-color: var(--header-bg);\r
    height: 40px;\r
    font-weight: 600;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    font-size: var(--header-text-size);\r
    cursor: grab;\r
    backdrop-filter: blur(5px);\r
    position: relative;\r
    letter-spacing: 0.5px;\r
    will-change: transform;\r
}\r
\r
.gui-header:active {\r
    cursor: grabbing;\r
}\r
\r
.gui-button {\r
    height: 35px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    box-sizing: border-box;\r
    cursor: pointer;\r
    font-size: var(--button-text-size);\r
    font-weight: 400;\r
    outline: none;\r
    background: var(--button-color);\r
    color: var(--text-color);\r
    position: relative;\r
    overflow: hidden;\r
    letter-spacing: 0.3px;\r
    will-change: transform, background-color, box-shadow;\r
    transition: transform var(--hover-transition-duration) var(--spring-easing),\r
                background-color var(--hover-transition-duration) var(--standard-easing),\r
                box-shadow var(--hover-transition-duration) var(--standard-easing);\r
}\r
\r
.gui-button.enabled {\r
    background: var(--Ballcrack-accent-color);\r
    font-weight: 500;\r
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\r
    box-shadow: 0 0 16px var(--glow-color);\r
}\r
\r
.gui-button:not(.enabled):hover {\r
    background: var(--hover-color);\r
    transform: none;\r
    box-shadow: none;\r
}\r
\r
.gui-background {\r
    position: fixed;\r
    left: 0;\r
    top: 0;\r
    z-index: 999;\r
    height: 100%;\r
    width: 100%;\r
    backdrop-filter: blur(0px);\r
    background: rgba(0, 0, 0, 0);\r
    transition: backdrop-filter 300ms var(--decelerate-easing),\r
                background-color 300ms var(--decelerate-easing);\r
    will-change: backdrop-filter, background-color;\r
    pointer-events: auto;\r
}\r
\r
.gui-button-container {\r
    background-color: var(--panel-bg);\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.gui-setting-container {\r
    margin-bottom: 12px;\r
    padding: 10px;\r
    background: rgba(30, 30, 30, 0.4);\r
    border-radius: 4px;\r
    width: 100%;\r
    box-sizing: border-box;\r
    transition: background 0.2s ease;\r
}\r
\r
.gui-setting-container:hover {\r
    background: rgba(35, 35, 35, 0.5);\r
}\r
\r
.gui-setting-container .gui-setting-label {\r
    font-size: 14px;\r
    font-weight: 500;\r
    color: rgba(255, 255, 255, 0.85);\r
    margin-bottom: 6px;\r
}\r
\r
.setting-boolean {\r
    display: flex;\r
    flex-direction: row;\r
    align-items: center;\r
    justify-content: space-between;\r
    cursor: pointer;\r
    padding: 10px 12px;\r
}\r
\r
.setting-boolean .gui-setting-label {\r
    margin-bottom: 0;\r
    flex: 1;\r
}\r
\r
.checkbox-container {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    position: relative;\r
}\r
\r
.gui-checkbox {\r
    position: relative;\r
    width: 22px;\r
    height: 22px;\r
    border-radius: 6px;\r
    background: linear-gradient(145deg, #2a2a2a, #222222);\r
    cursor: pointer;\r
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), \r
                inset 0 -1px 3px rgba(0, 0, 0, 0.2);\r
    transition: all 0.3s var(--spring-easing);\r
    overflow: hidden;\r
}\r
\r
.gui-checkbox:hover {\r
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2),\r
                0 2px 6px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-checkbox.enabled {\r
    background: var(--Ballcrack-accent-color);\r
    transform: scale(1.05);\r
    box-shadow: 0 0 12px var(--glow-color),\r
                inset 0 -1px 3px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-checkbox.enabled::after {\r
    content: '';\r
    position: absolute;\r
    display: block;\r
    width: 6px;\r
    height: 12px;\r
    border: solid white;\r
    border-width: 0 2px 2px 0;\r
    top: 2px;\r
    left: 7px;\r
    transform: rotate(45deg);\r
    animation: checkmark-pulse 0.5s var(--spring-easing) forwards;\r
}\r
\r
.gui-checkbox.enabled::before {\r
    content: "";\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 120%;\r
    height: 120%;\r
    background: radial-gradient(\r
        circle,\r
        rgba(255, 255, 255, 0.5),\r
        transparent 80%\r
    );\r
    transform: translate(-50%, -50%) scale(0);\r
    opacity: 0;\r
    border-radius: 50%;\r
    animation: checkbox-sparkle 0.6s ease-out forwards;\r
}\r
\r
@keyframes checkmark-pulse {\r
    0% {\r
        transform: scale(0) rotate(45deg);\r
        opacity: 0;\r
    }\r
    70% {\r
        transform: scale(1.1) rotate(45deg);\r
        opacity: 1;\r
    }\r
    100% {\r
        transform: scale(1) rotate(45deg);\r
        opacity: 1;\r
    }\r
}\r
\r
@keyframes checkbox-sparkle {\r
    0% {\r
        transform: translate(-50%, -50%) scale(0);\r
        opacity: 0.5;\r
    }\r
    70% {\r
        transform: translate(-50%, -50%) scale(1);\r
        opacity: 0.8;\r
    }\r
    100% {\r
        transform: translate(-50%, -50%) scale(0);\r
        opacity: 0;\r
    }\r
}\r
\r
.setting-string, .setting-number {\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.string-input-container, .number-input-container {\r
    width: 100%;\r
}\r
\r
.gui-text-input {\r
    width: 100%;\r
    height: 30px;\r
    background: rgba(40, 40, 40, 0.9);\r
    border: 1px solid rgba(60, 60, 60, 0.8);\r
    border-radius: 4px;\r
    color: rgba(255, 255, 255, 0.9);\r
    padding: 0 10px;\r
    font-size: 13px;\r
    box-sizing: border-box;\r
    transition: all 0.2s ease;\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-text-input:hover {\r
    border-color: rgba(80, 80, 80, 0.9);\r
    background: rgba(45, 45, 45, 0.9);\r
}\r
\r
.gui-text-input:focus {\r
    border-color: rgba(100, 100, 100, 1);\r
    background: rgba(50, 50, 50, 0.9);\r
    outline: none;\r
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.setting-color {\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.gui-color-row {\r
    display: flex;\r
    width: 100%;\r
    gap: 8px;\r
}\r
\r
.color-picker-container {\r
    position: relative;\r
    width: 40px;\r
    height: 30px;\r
}\r
\r
.gui-color-picker {\r
    width: 100%;\r
    height: 100%;\r
    border-radius: 4px;\r
    position: relative;\r
    cursor: pointer;\r
    border: 1px solid rgba(60, 60, 60, 0.8);\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r
    transition: border-color 0.2s ease, box-shadow 0.2s ease;\r
}\r
\r
.gui-color-picker:hover {\r
    border-color: rgba(80, 80, 80, 0.9);\r
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-color-input {\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    opacity: 0;\r
    cursor: pointer;\r
}\r
\r
.color-text-input {\r
    flex: 1;\r
}\r
\r
.module-settings-wrapper {\r
    display: none;\r
    background-color: rgba(20, 20, 20, 0.9);\r
    border-radius: 5px;\r
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
    margin-top: 5px;\r
    padding: 0 8px;\r
    box-sizing: border-box;\r
    max-height: 0;\r
    overflow: hidden;\r
    opacity: 0;\r
    transition: max-height 500ms linear, \r
                opacity 500ms linear, \r
                padding 500ms linear;\r
    will-change: max-height, opacity, padding;\r
}\r
\r
.module-settings-wrapper.module-settings-open {\r
    display: block;\r
    max-height: 400px;\r
    opacity: 1;\r
    padding: 8px;\r
}\r
\r
.module-settings {\r
    overflow-y: auto;\r
    overflow-x: hidden;\r
    scroll-behavior: smooth;\r
    -webkit-overflow-scrolling: touch;\r
    scrollbar-width: none;\r
    -ms-overflow-style: none;\r
}\r
\r
.module-settings::-webkit-scrollbar {\r
    display: none;\r
    width: 0;\r
    height: 0;\r
}\r
\r
.gui-text-input:focus, \r
.gui-color-picker:focus,\r
.gui-dropdown:focus {\r
    outline: none;\r
    box-shadow: 0 0 0 1px rgba(80, 80, 80, 1), 0 0 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.scrollable-container {\r
    scrollbar-width: thin;\r
    scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1);\r
}\r
\r
.scrollable-container::-webkit-scrollbar {\r
    width: var(--scroller-size);\r
    height: var(--scroller-size);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-track {\r
    background: rgba(0, 0, 0, 0.1);\r
    border-radius: 10px;\r
}\r
\r
.scrollable-container::-webkit-scrollbar-thumb {\r
    background: rgba(255, 255, 255, 0.1);\r
    border-radius: 10px;\r
    transition: background 300ms var(--standard-easing);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-thumb:hover {\r
    background: rgba(255, 255, 255, 0.2);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-corner {\r
    background: transparent;\r
}\r
\r
.with-animations .gui-panel:not(.dragging) {\r
    animation: panelAppear var(--panel-appear-duration) var(--standard-easing) both;\r
    transform-origin: center center;\r
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);\r
}\r
\r
@keyframes panelAppear {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(30px) scale(0.95);\r
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0) scale(1);\r
        box-shadow: 0 8px 24px var(--shadow-color),\r
                    0 0 0 1px rgba(255, 255, 255, 0.05),\r
                    0 0 40px rgba(0, 0, 0, 0.2);\r
    }\r
}\r
\r
.with-animations .gui-background {\r
    animation: backgroundFadeIn var(--background-appear-duration) var(--standard-easing) forwards;\r
}\r
\r
@keyframes backgroundFadeIn {\r
    0% { \r
        opacity: 0; \r
        backdrop-filter: blur(0px); \r
        background: rgba(0, 0, 0, 0);\r
    }\r
    100% { \r
        opacity: 1; \r
        backdrop-filter: blur(8px); \r
        background: rgba(0, 0, 0, 0.4);\r
    }\r
}\r
\r
.with-animations .gui-setting-container {\r
    animation: settingReveal var(--setting-appear-duration) var(--standard-easing) both;\r
}\r
\r
@keyframes settingReveal {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(10px);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0);\r
    }\r
}\r
\r
.module-settings {\r
    max-height: 300px;\r
    overflow-y: auto;\r
    overflow-x: hidden;\r
    padding: 4px 5px;\r
    cursor: default;\r
    background: var(--panel-bg);\r
    border-radius: 4px;\r
    margin-top: 2px;\r
    will-change: transform, scroll-position;\r
    perspective: 1000px;\r
    backface-visibility: hidden;\r
}\r
\r
.module-settings-container {\r
    position: relative;\r
    padding: 0;\r
    background: var(--panel-bg);\r
    border-radius: 4px;\r
}\r
\r
.gui-dropdown {\r
    position: relative;\r
    width: 100%;\r
    height: 28px;\r
    background: rgba(30, 30, 30, 0.95);\r
    border-radius: 3px;\r
    border: 1px solid rgba(60, 60, 60, 0.7);\r
    cursor: pointer;\r
    transition: all 0.2s ease;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
}\r
\r
.gui-dropdown:hover {\r
    background: rgba(40, 40, 40, 1);\r
    border-color: rgba(60, 60, 60, 0.9);\r
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-dropdown-selected {\r
    display: flex;\r
    align-items: center;\r
    height: 100%;\r
    padding: 0 8px;\r
    color: white;\r
    font-size: 13px;\r
    box-sizing: border-box;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    user-select: none;\r
}\r
\r
.gui-dropdown-arrow {\r
    width: 0;\r
    height: 0;\r
    margin-right: 10px;\r
    border-left: 4px solid transparent;\r
    border-right: 4px solid transparent;\r
    border-top: 5px solid rgba(255, 255, 255, 0.7);\r
    pointer-events: none;\r
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
\r
.gui-dropdown.open .gui-dropdown-arrow {\r
    transform: rotate(180deg);\r
    border-top-color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.gui-dropdown.open {\r
    background: rgba(40, 40, 40, 1);\r
    border-color: rgba(70, 70, 70, 1);\r
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-dropdown-options {\r
    position: fixed;\r
    z-index: 9999;\r
    background: rgba(35, 35, 35, 1);\r
    border-radius: 3px;\r
    width: 100%;\r
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);\r
    border: 1px solid rgba(70, 70, 70, 0.9);\r
    max-height: 150px;\r
    overflow-y: auto;\r
    scrollbar-width: none;\r
    -ms-overflow-style: none;\r
    transform-origin: top center;\r
    animation: dropdown-appear 180ms var(--spring-easing) forwards;\r
    will-change: transform, opacity;\r
}\r
\r
@keyframes dropdown-appear {\r
    from {\r
        opacity: 0;\r
        transform: translateY(-5px) scaleY(0.95);\r
    }\r
    to {\r
        opacity: 1;\r
        transform: translateY(0) scaleY(1);\r
    }\r
}\r
\r
.gui-dropdown-options::-webkit-scrollbar {\r
    display: none;\r
}\r
\r
.gui-dropdown-option {\r
    padding: 8px 10px;\r
    color: white;\r
    font-size: 13px;\r
    cursor: pointer;\r
    transition: background 0.15s ease, color 0.15s ease;\r
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\r
}\r
\r
.gui-dropdown-option:last-child {\r
    border-bottom: none;\r
}\r
\r
.gui-dropdown-option:hover {\r
    background: rgba(50, 50, 50, 0.9);\r
    color: rgba(255, 255, 255, 1);\r
}\r
\r
.gui-dropdown-option.selected {\r
    background: rgba(55, 55, 55, 0.9);\r
    color: rgba(255, 255, 255, 1);\r
    font-weight: 500;\r
}\r
\r
.gui-dropdown-option.selected:hover {\r
    background: rgba(60, 60, 60, 0.95);\r
}\r
\r
.dropdown-up {\r
    bottom: calc(100% + 1px);\r
    top: auto !important;\r
    transform-origin: bottom center;\r
    animation: dropdown-appear-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\r
}\r
\r
@keyframes dropdown-appear-up {\r
    from {\r
        opacity: 0;\r
        transform: translateY(5px) scaleY(0.95);\r
    }\r
    to {\r
        opacity: 1;\r
        transform: translateY(0) scaleY(1);\r
    }\r
}\r
\r
.with-animations .gui-button {\r
    animation: buttonReveal var(--button-appear-duration) var(--standard-easing) both;\r
}\r
\r
@keyframes buttonReveal {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(8px);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0);\r
    }\r
}\r
\r
@keyframes gui-panel-hide {\r
    0% {\r
        opacity: 1;\r
        transform: perspective(1200px) scale(1) translateY(0);\r
    }\r
    100% {\r
        opacity: 0;\r
        transform: perspective(1200px) scale(0.97) translateY(8px);\r
    }\r
}\r
\r
@keyframes gui-background-hide {\r
    0% {\r
        opacity: 1; \r
        backdrop-filter: blur(8px);\r
        background: rgba(0, 0, 0, 0.4);\r
    }\r
    100% { \r
        opacity: 0; \r
        backdrop-filter: blur(0px);\r
        background: rgba(0, 0, 0, 0);\r
    }\r
}\r
\r
input, textarea, [contenteditable="true"], .module-settings-wrapper {\r
    user-select: text !important;\r
    -webkit-user-select: text !important;\r
}\r
\r
.gui-button-container {\r
    user-select: none;\r
}`;function j(i){let e=document.createElement("style");e.textContent=i,d.wrapper.appendChild(e)}var K=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});K.load().then(i=>document.fonts.add(i));var q=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});q.load().then(i=>document.fonts.add(i));j(U);I.init();a.hookOnTick();document.addEventListener("keydown",i=>{c.emit("keydown",i.code)});setInterval(()=>{c.emit("render")},1e3/60);var X=!0;X&&(window.ballcrack={hooks:a,shadowWrapper:d,moduleManager:I,interactionUtils:O,blockUtils:H});})();
=======
(()=>{var d={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>{t(e)})},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){if(this._game)return this._game;{let r=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;return this._game=r,this._game}},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(...e){let t=r._fixedUpdate.apply(this,e);return d.emit("tick"),t}}};var p=class{#e={};name;category;options;bind;isEnabled=!1;modes={};constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.bind=i,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}onTick(){}onSettingUpdate(e,t){}listenToEvent(e,t){this.#e[e]=t,d.on(e,t)}enable(){this.isEnabled=!0,d.emit("module.update",this),d.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,d.emit("module.update",this),d.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable();for(let[e,t]of Object.entries(this.#e))d.remove(e,t),delete this.#e[e]}toggle(){this.isEnabled?this.disable():this.enable()}};var $={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var w=class extends p{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":!0}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];onTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=this.options["Auto Block"];a.game.world.loadedEntityList.forEach(o=>{let i=$.distanceBetween(o.pos,a.game.player.pos);a.game.player.id!==o.id&&i<14&&!this.ignoreEntities.includes(o.constructor.name)&&(e=!0,t&&this.unblock(),a.game.controller.objectMouseOver.hitVec=o.pos.clone(),a.game.controller.attackEntity(o),t&&this.block())}),e||t&&this.unblock()}};var k=class extends p{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var v=class extends p{constructor(){super("Airjump","Movement",null)}onEnable(){a.game.player.__defineGetter__("onGround",()=>!0),a.game.player.__defineSetter__("onGround",()=>!0)}onDisable(){delete a.game.player.onGround,a.game.player.onGround=!1}};var C=class extends p{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var E=class extends p{warned=!1;ticks=0;constructor(){super("InfiniteFly","Movement",{"Vertical Speed":2,"Reduce Vertical Movement":!0})}get reduceVerticalMovement(){return this.options["Render Vertical Movement"]}onDisable(){this.ticks=0}onEnable(){this.warned||(a.game.chat.addChat({text:`Infinite Fly only works on servers using the old ac
=======
(()=>{var c={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>{t(e)})},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){if(this._game)return this._game;{let r=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;return this._game=r,this._game}},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(...e){let t=r._fixedUpdate.apply(this,e);return c.emit("tick"),t}}};var p=class{#e={};name;category;options;bind;isEnabled=!1;modes={};constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.bind=i,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}onTick(){}onSettingUpdate(e,t){}listenToEvent(e,t){this.#e[e]=t,c.on(e,t)}enable(){this.isEnabled=!0,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable();for(let[e,t]of Object.entries(this.#e))c.remove(e,t),delete this.#e[e]}toggle(){this.isEnabled?this.disable():this.enable()}};var $={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var w=class extends p{constructor(){super("Killaura","Combat",{"Y Offset":1.62,Reach:10,Delay:100}),this.lastExecutionTime=null}onTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}tryKill(){a.game.world.loadedEntityList.forEach(e=>{let t=$.distanceBetween(e.pos,a.game.player.pos);a.game.player.id!==e.id&&t<this.options.Reach&&(a.game.controller.objectMouseOver.hitVec=e.pos.clone(),a.game.controller.attackEntity(e))})}};var v=class extends p{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var k=class extends p{constructor(){super("Airjump","Movement",null)}onEnable(){a.game.player.__defineGetter__("onGround",()=>!0),a.game.player.__defineSetter__("onGround",()=>!0)}onDisable(){delete a.game.player.onGround,a.game.player.onGround=!1}};var C=class extends p{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var E=class extends p{warned=!1;ticks=0;constructor(){super("InfiniteFly","Movement",{"Vertical Speed":2,"Reduce Vertical Movement":!0})}get reduceVerticalMovement(){return this.options["Render Vertical Movement"]}onDisable(){this.ticks=0}onEnable(){this.warned||(a.game.chat.addChat({text:`Infinite Fly only works on servers using the old ac
>>>>>>> 2fa2a0d (fix: it work)
=======
(()=>{var d={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>{t(e)})},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){if(this._game)return this._game;{let r=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;return this._game=r,this._game}},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(...e){let t=r._fixedUpdate.apply(this,e);return d.emit("tick"),t}}};var p=class{#e={};name;category;options;bind;isEnabled=!1;modes={};constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.bind=i,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}onTick(){}onSettingUpdate(e,t){}listenToEvent(e,t){this.#e[e]=t,d.on(e,t)}enable(){this.isEnabled=!0,d.emit("module.update",this),d.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,d.emit("module.update",this),d.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable();for(let[e,t]of Object.entries(this.#e))d.remove(e,t),delete this.#e[e]}toggle(){this.isEnabled?this.disable():this.enable()}};var $={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var w=class extends p{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":!0}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];onTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=this.options["Auto Block"];a.game.world.loadedEntityList.forEach(o=>{let i=$.distanceBetween(o.pos,a.game.player.pos);a.game.player.id!==o.id&&i<14&&!this.ignoreEntities.includes(o.constructor.name)&&(e=!0,t&&this.unblock(),a.game.controller.objectMouseOver.hitVec=o.pos.clone(),a.game.controller.attackEntity(o),t&&this.block())}),e||t&&this.unblock()}};var k=class extends p{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var v=class extends p{constructor(){super("Airjump","Movement",null)}onEnable(){a.game.player.__defineGetter__("onGround",()=>!0),a.game.player.__defineSetter__("onGround",()=>!0)}onDisable(){delete a.game.player.onGround,a.game.player.onGround=!1}};var C=class extends p{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var E=class extends p{warned=!1;ticks=0;constructor(){super("InfiniteFly","Movement",{"Vertical Speed":2,"Reduce Vertical Movement":!0})}get reduceVerticalMovement(){return this.options["Render Vertical Movement"]}onDisable(){this.ticks=0}onEnable(){this.warned||(a.game.chat.addChat({text:`Infinite Fly only works on servers using the old ac
>>>>>>> 4bfae9d (a)
(KitPvP, Skywars, Eggwars, Bridge Duels,
<<<<<<< HEAD
<<<<<<< HEAD
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`}),this.warned=!0)}onTick(){if(this.ticks++,this.ticks<6){a.game.player.motion.y=0;return}(!this.reduceVerticalMovement||this.ticks%2===0)&&(a.game.player.motion.y=.18)}};var B=class extends p{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var F={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:()=>({equals:o=>(t=o,!0)})})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:e=>{r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var O={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:()=>({getBlock:()=>({onBlockActivated:()=>{}})})},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var L=class extends p{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new F.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),O.placeBlock(n,1,{x:0,y:0,z:0}))}onTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend,10);for(let l=1;l<=s;l++){let h=Math.floor(t.x+i*l+.5),m=t.y-1,g=Math.floor(t.z+n*l+.5);this.tryPlace(h,m,g)}}};var M=class extends p{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var S=class extends p{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var d={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var f={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(l=>l+l).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var D=class extends p{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(d.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),l=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${f.hexToRGBA(n[0],s,h)}, ${f.hexToRGBA(n[1],s+.2,h+.2)})`,i.style.backdropFilter=`blur(${m}px) brightness(${l})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,i.appendChild(g),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>{this.arraylistContainer.appendChild(i)})}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",d.wrapper.appendChild(this.arraylistContainer),c.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e==="ClickGUI"||e==="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(l=>{l.style.background=`linear-gradient(to right, ${f.hexToRGBA(t[0],o,n)}, ${f.hexToRGBA(t[1],o+.2,n+.2)})`,l.style.backdropFilter=`blur(${s}px) brightness(${i})`,l.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var P=class extends p{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(...o){for(let i in this.meshes)this.meshes[i].material.depthTest=!1,this.meshes[i].renderOrder=3;for(let i in this.armorMesh)this.armorMesh[i].material.depthTest=!1,this.armorMesh[i].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let i of this.hatMesh.children[0].children)i.material&&(i.material.depthTest=!1,i.renderOrder=4);return t._renderPlayers.apply(this,o)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var z=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes?.[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes?.[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{d.wrapper.contains(t)&&d.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!Number.isNaN(s)&&s!==""&&(this.module.options[e]=s,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(Number.isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let l=document.createElement("input");l.type="color",l.className="gui-color-input",l.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),l.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(l),n.appendChild(s),i.appendChild(n),i.appendChild(h),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let l=document.createElement("div");l.className="gui-dropdown-selected",l.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(l),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&d.wrapper.contains(u)&&d.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},H=()=>{m()},_=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",i.forEach(x=>{let y=document.createElement("div");y.className="gui-dropdown-option mode-option",x===this.module.options[e]&&y.classList.add("selected"),y.textContent=x,y.addEventListener("click",V=>{V.stopPropagation(),l.textContent=x,this.module.options[e]=x,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:x}),m()}),u.appendChild(y)}),d.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=`${b.width}px`,u.style.position="fixed";let U=window.innerHeight-b.bottom,W=Math.min(i.length*30,150);U<W&&b.top>W?(u.style.bottom=`${window.innerHeight-b.top}px`,u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=`${b.bottom}px`,u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=`${b.left}px`,u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:H},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",H,!0),window.addEventListener("resize",H,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():_()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),i=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=`${o.width}px`,t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=`${o.height}px`,t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=`${o.height}px`,t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>i.right){let l=t.getBoundingClientRect().right-i.right;t.style.left=`${-l}px`}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1],10),i=parseInt(t[2],10),n=parseInt(t[3],10);return`#${((1<<24)+(o<<16)+(i<<8)+n).toString(16).slice(1)}`}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var A=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),d.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=`${o.clientX-t.x}px`,this.panel.style.top=`${o.clientY-t.y}px`)}),document.addEventListener("mouseup",()=>{e=!1})}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new z(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var T=class extends p{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?d.wrapper.classList.add("with-animations"):d.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),d.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),d.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),d.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),d.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),d.wrapper.style.setProperty("--text-color",this.options["Text Color"]),d.wrapper.style.setProperty("--glow-color",f.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",d.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel?.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new A(o.title,o.position);this.panels.push(i)});let t={};Object.values(N.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(l=>l.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",d.wrapper.appendChild(s),i.sort((l,h)=>{s.textContent=l.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),i.forEach(l=>{n.addButton(l)})})}setupEventListeners(){c.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>{e.show()}),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>{e.hide()}),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var I=class extends p{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),d.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var R=class{modules={};waitingForBind=!1;addModules(...e){for(let t of e){let o=new t;this.modules[o.name]=o}}addModule(e){this.modules[e.name]=e}handleKeyPress(e){for(let t in this.modules){let o=this.modules[t];this.waitingForBind?(o.bind=e,this.waitingForBind=!1):e&&o.bind===e&&o.toggle()}}init(){this.addModules(I,T,D,P,k,C,E,B,M,S,L,w,v),c.on("render",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onRender()}),c.on("tick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onTick()}),c.on("keydown",this.handleKeyPress.bind(this)),c.on("setting.update",e=>{for(let t in this.modules)(this.modules[t].isEnabled||e.moduleName===t)&&this.modules[t].onSettingUpdate(e.setting,e.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}},N=new R;var G=`:host {
>>>>>>> dd77c5f (fix: it work)
=======
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`}),this.warned=!0)}onTick(){this.ticks<6?a.game.player.motion.y=0:(!this.reduceVerticalMovement||this.ticks%2===0)&&(a.game.player.motion.y=.18),this.ticks++}};var B=class extends p{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var F={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:()=>({equals:o=>(t=o,!0)})})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:e=>{r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var O={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:()=>({getBlock:()=>({onBlockActivated:()=>{}})})},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var L=class extends p{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new F.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),O.placeBlock(n,1,{x:0,y:0,z:0}))}onTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend,10);for(let l=1;l<=s;l++){let h=Math.floor(t.x+i*l+.5),m=t.y-1,g=Math.floor(t.z+n*l+.5);this.tryPlace(h,m,g)}}};var M=class extends p{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var S=class extends p{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var d={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var f={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(l=>l+l).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var D=class extends p{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(d.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),l=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${f.hexToRGBA(n[0],s,h)}, ${f.hexToRGBA(n[1],s+.2,h+.2)})`,i.style.backdropFilter=`blur(${m}px) brightness(${l})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,i.appendChild(g),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>{this.arraylistContainer.appendChild(i)})}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",d.wrapper.appendChild(this.arraylistContainer),c.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e==="ClickGUI"||e==="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(l=>{l.style.background=`linear-gradient(to right, ${f.hexToRGBA(t[0],o,n)}, ${f.hexToRGBA(t[1],o+.2,n+.2)})`,l.style.backdropFilter=`blur(${s}px) brightness(${i})`,l.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var P=class extends p{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(...o){for(let i in this.meshes)this.meshes[i].material.depthTest=!1,this.meshes[i].renderOrder=3;for(let i in this.armorMesh)this.armorMesh[i].material.depthTest=!1,this.armorMesh[i].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let i of this.hatMesh.children[0].children)i.material&&(i.material.depthTest=!1,i.renderOrder=4);return t._renderPlayers.apply(this,o)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var z=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes?.[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes?.[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{d.wrapper.contains(t)&&d.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!Number.isNaN(s)&&s!==""&&(this.module.options[e]=s,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(Number.isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),c.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let l=document.createElement("input");l.type="color",l.className="gui-color-input",l.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),l.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(l),n.appendChild(s),i.appendChild(n),i.appendChild(h),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let l=document.createElement("div");l.className="gui-dropdown-selected",l.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(l),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&d.wrapper.contains(u)&&d.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},H=()=>{m()},_=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",i.forEach(x=>{let y=document.createElement("div");y.className="gui-dropdown-option mode-option",x===this.module.options[e]&&y.classList.add("selected"),y.textContent=x,y.addEventListener("click",V=>{V.stopPropagation(),l.textContent=x,this.module.options[e]=x,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:x}),m()}),u.appendChild(y)}),d.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=`${b.width}px`,u.style.position="fixed";let U=window.innerHeight-b.bottom,W=Math.min(i.length*30,150);U<W&&b.top>W?(u.style.bottom=`${window.innerHeight-b.top}px`,u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=`${b.bottom}px`,u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=`${b.left}px`,u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:H},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",H,!0),window.addEventListener("resize",H,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():_()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),i=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=`${o.width}px`,t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=`${o.height}px`,t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=`${o.height}px`,t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>i.right){let l=t.getBoundingClientRect().right-i.right;t.style.left=`${-l}px`}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1],10),i=parseInt(t[2],10),n=parseInt(t[3],10);return`#${((1<<24)+(o<<16)+(i<<8)+n).toString(16).slice(1)}`}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var A=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),d.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=`${o.clientX-t.x}px`,this.panel.style.top=`${o.clientY-t.y}px`)}),document.addEventListener("mouseup",()=>{e=!1})}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new z(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var T=class extends p{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?d.wrapper.classList.add("with-animations"):d.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color",e),d.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),d.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),d.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--button-color",this.options["Button Color"]),d.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),d.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),d.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),d.wrapper.style.setProperty("--text-color",this.options["Text Color"]),d.wrapper.style.setProperty("--glow-color",f.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",d.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel?.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new A(o.title,o.position);this.panels.push(i)});let t={};Object.values(N.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(l=>l.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",d.wrapper.appendChild(s),i.sort((l,h)=>{s.textContent=l.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),i.forEach(l=>{n.addButton(l)})})}setupEventListeners(){c.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>{e.show()}),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>{e.hide()}),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var I=class extends p{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),d.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var R=class{modules={};waitingForBind=!1;addModules(...e){for(let t of e){let o=new t;this.modules[o.name]=o}}addModule(e){this.modules[e.name]=e}handleKeyPress(e){for(let t in this.modules){let o=this.modules[t];this.waitingForBind?(o.bind=e,this.waitingForBind=!1):e&&o.bind===e&&o.toggle()}}init(){this.addModules(I,T,D,P,k,C,E,B,M,S,L,w,v),c.on("render",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onRender()}),c.on("tick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onTick()}),c.on("keydown",this.handleKeyPress.bind(this)),c.on("setting.update",e=>{for(let t in this.modules)(this.modules[t].isEnabled||e.moduleName===t)&&this.modules[t].onSettingUpdate(e.setting,e.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}},N=new R;var G=`:host {
>>>>>>> 8e42362 (test)
=======
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`}),this.warned=!0)}onTick(){this.ticks<6?a.game.player.motion.y=0:(!this.reduceVerticalMovement||this.ticks%2===0)&&(a.game.player.motion.y=.18),this.ticks++}};var B=class extends p{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var F={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:()=>({equals:o=>(t=o,!0)})})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:e=>{r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var O={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:()=>({getBlock:()=>({onBlockActivated:()=>{}})})},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var L=class extends p{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new F.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),O.placeBlock(n,1,{x:0,y:0,z:0}))}onTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let s=parseInt(this.options.Extend,10);for(let l=1;l<=s;l++){let h=Math.floor(t.x+i*l+.5),m=t.y-1,g=Math.floor(t.z+n*l+.5);this.tryPlace(h,m,g)}}};var M=class extends p{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var S=class extends p{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var c={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var f={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(l=>l+l).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,s=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(s)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var D=class extends p{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(c.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),s=parseFloat(this.options["Background Opacity"]),l=parseFloat(this.options["Darkness Multiplier"]),h=parseFloat(this.options["Accent Darkness"]),m=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${f.hexToRGBA(n[0],s,h)}, ${f.hexToRGBA(n[1],s+.2,h+.2)})`,i.style.backdropFilter=`blur(${m}px) brightness(${l})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let g=document.createElement("span");g.style.fontWeight="800",g.style.fontSize="16px",g.style.backgroundImage="var(--Ballcrack-accent-color)",g.style.color="transparent",g.style.backgroundClip="text",g.style.webkitBackgroundClip="text",g.innerHTML=e,i.appendChild(g),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>{this.arraylistContainer.appendChild(i)})}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",c.wrapper.appendChild(this.arraylistContainer),d.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e==="ClickGUI"||e==="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),s=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(l=>{l.style.background=`linear-gradient(to right, ${f.hexToRGBA(t[0],o,n)}, ${f.hexToRGBA(t[1],o+.2,n+.2)})`,l.style.backdropFilter=`blur(${s}px) brightness(${i})`,l.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var P=class extends p{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(...o){for(let i in this.meshes)this.meshes[i].material.depthTest=!1,this.meshes[i].renderOrder=3;for(let i in this.armorMesh)this.armorMesh[i].material.depthTest=!1,this.armorMesh[i].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let i of this.hatMesh.children[0].children)i.material&&(i.material.depthTest=!1,i.renderOrder=4);return t._renderPlayers.apply(this,o)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var z=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes?.[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes?.[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen&&this.settingsWrapper?.classList?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):this.settingsWrapper?.classList&&(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){if(!this.settingsWrapper)return;let e=this.settingsWrapper.getBoundingClientRect(),t=window.innerHeight;if(e.bottom>t){let o=e.bottom-t;this.settingsWrapper.style.maxHeight=`${e.height-o-10}px`}}cleanup(){this.closeAllDropdowns(),this.isOpen=!1,this.settingsWrapper&&this.settingsWrapper.classList.remove("module-settings-open")}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(t=>{c.wrapper.contains(t)&&c.wrapper.removeChild(t)}),this.currentOptionsList&&(this.currentOptionsList=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown.optionsListElement&&(this.activeDropdown.optionsListElement=null),this.activeDropdown=null),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="number-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input number-input",n.value=this.module.options[e],n.addEventListener("input",()=>{let s=n.value.trim();!Number.isNaN(s)&&s!==""&&(this.module.options[e]=s,d.emit("setting.update",{moduleName:this.module.name,setting:e,value:s}))}),n.addEventListener("blur",()=>{(Number.isNaN(n.value)||n.value.trim()==="")&&(n.value=this.module.options[e])}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="string-input-container";let n=document.createElement("input");n.type="text",n.className="gui-text-input string-input",n.value=this.module.options[e],n.addEventListener("input",()=>{this.module.options[e]=n.value,d.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.value})}),n.addEventListener("keydown",s=>{s.key==="Enter"&&n.blur()}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="checkbox-container";let n=document.createElement("div");n.className="gui-checkbox",(this.module.options[e]===!0||this.module.options[e]==="true")&&n.classList.add("enabled"),t.addEventListener("click",()=>{let s=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=s.toString(),s?n.classList.add("enabled"):n.classList.remove("enabled"),d.emit("setting.update",{moduleName:this.module.name,setting:e,value:s.toString()})}),i.appendChild(n),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-row";let n=document.createElement("div");n.className="color-picker-container";let s=document.createElement("div");s.className="gui-color-picker",s.style.background=this.module.options[e];let l=document.createElement("input");l.type="color",l.className="gui-color-input",l.value=this.rgbToHex(this.module.options[e]);let h=document.createElement("input");h.type="text",h.className="gui-text-input color-text-input",h.value=this.formatColor(this.module.options[e]),l.addEventListener("input",m=>{let g=m.target.value;s.style.background=g,h.value=g,this.module.options[e]=g,d.emit("setting.update",{moduleName:this.module.name,setting:e,value:g})}),h.addEventListener("blur",()=>{try{let m=h.value;s.style.background=m,this.module.options[e]=m,d.emit("setting.update",{moduleName:this.module.name,setting:e,value:m})}catch{h.value=this.formatColor(this.module.options[e])}}),h.addEventListener("keydown",m=>{m.key==="Enter"&&h.blur()}),s.appendChild(l),n.appendChild(s),i.appendChild(n),i.appendChild(h),t.appendChild(o),t.appendChild(i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=this.module.modes?.[e]||[],n=this.module.options[e],s=document.createElement("div");s.className="gui-dropdown mode-dropdown";let l=document.createElement("div");l.className="gui-dropdown-selected",l.textContent=n;let h=document.createElement("div");h.className="gui-dropdown-arrow",s.appendChild(l),s.appendChild(h);let m=()=>{if(!s.classList.contains("open"))return;let u=s.optionsListElement;u&&c.wrapper.contains(u)&&c.wrapper.removeChild(u),this.currentOptionsList===u&&(this.currentOptionsList=null),this.activeDropdown===s&&(this.activeDropdown=null),s.classList.remove("open"),s.optionsListElement=null,this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null)},g=u=>{let b=s.optionsListElement;!s.contains(u.target)&&(!b||!b.contains(u.target))&&m()},H=()=>{m()},U=()=>{this.closeAllDropdowns();let u=document.createElement("div");u.className="gui-dropdown-options mode-options",i.forEach(x=>{let y=document.createElement("div");y.className="gui-dropdown-option mode-option",x===this.module.options[e]&&y.classList.add("selected"),y.textContent=x,y.addEventListener("click",V=>{V.stopPropagation(),l.textContent=x,this.module.options[e]=x,d.emit("setting.update",{moduleName:this.module.name,setting:e,value:x}),m()}),u.appendChild(y)}),c.wrapper.appendChild(u),s.optionsListElement=u;let b=s.getBoundingClientRect();u.style.width=`${b.width}px`,u.style.position="fixed";let _=window.innerHeight-b.bottom,W=Math.min(i.length*30,150);_<W&&b.top>W?(u.style.bottom=`${window.innerHeight-b.top}px`,u.style.top="auto",u.classList.add("dropdown-up")):(u.style.top=`${b.bottom}px`,u.style.bottom="auto",u.classList.remove("dropdown-up")),u.style.left=`${b.left}px`,u.style.zIndex="1001",s.classList.add("open"),this.activeDropdown=s,this.currentOptionsList=u,this.activeDropdownListeners={dropdown:s,outsideClickHandler:g,hideDropdown:H},setTimeout(()=>{this.activeDropdown===s&&this.activeDropdownListeners&&this.activeDropdownListeners.dropdown===s&&(document.addEventListener("click",g),window.addEventListener("scroll",H,!0),window.addEventListener("resize",H,!0))},0)};s.addEventListener("click",u=>{u.stopPropagation(),s.classList.contains("open")?m():U()}),t.appendChild(o),t.appendChild(s),this.settingsContainer.appendChild(t),this.components.push(t)}positionDropdown(e,t){let o=e.getBoundingClientRect(),i=this.settingsWrapper.getBoundingClientRect();t.style.position="absolute",t.style.width=`${o.width}px`,t.style.left="0";let n=window.innerHeight-o.bottom,s=t.clientHeight||150;if(n<s&&o.top>s?(t.style.bottom=`${o.height}px`,t.style.top="auto",t.classList.add("dropdown-up")):(t.style.top=`${o.height}px`,t.style.bottom="auto",t.classList.remove("dropdown-up")),t.getBoundingClientRect().right>i.right){let l=t.getBoundingClientRect().right-i.right;t.style.left=`${-l}px`}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);if(!t)return"#000000";let o=parseInt(t[1],10),i=parseInt(t[2],10),n=parseInt(t[3],10);return`#${((1<<24)+(o<<16)+(i<<8)+n).toString(16).slice(1)}`}formatColor(e){return e?e.startsWith("rgb")?this.rgbToHex(e):e:"#000000"}};var A=class{constructor(e,t={top:"200px",left:"200px"}){this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),c.wrapper.appendChild(this.panel),this.buttons=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=`${o.clientX-t.x}px`,this.panel.style.top=`${o.clientY-t.y}px`)}),document.addEventListener("mouseup",()=>{e=!1})}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new z(e,t);return o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),n.key==="Escape"?e.keybind=null:e.keybind=String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var I=class extends p{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?c.wrapper.classList.add("with-animations"):c.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;c.wrapper.style.setProperty("--Ballcrack-accent-color",e),c.wrapper.style.setProperty("--Ballcrack-accent-color",e),c.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),c.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),c.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),c.wrapper.style.setProperty("--button-color",this.options["Button Color"]),c.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),c.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),c.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),c.wrapper.style.setProperty("--text-color",this.options["Text Color"]),c.wrapper.style.setProperty("--glow-color",f.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",c.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel?.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new A(o.title,o.position);this.panels.push(i)});let t={};Object.values(T.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(l=>l.header.textContent===o);if(!n)return;let s=document.createElement("span");s.style.visibility="hidden",s.style.position="absolute",s.style.font="'Product Sans', sans-serif",c.wrapper.appendChild(s),i.sort((l,h)=>{s.textContent=l.name;let m=s.getBoundingClientRect().width;return s.textContent=h.name,s.getBoundingClientRect().width-m}),s.remove(),i.forEach(l=>{n.addButton(l)})})}setupEventListeners(){d.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>{e.show()}),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>{e.hide()}),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var N=class extends p{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),c.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var R=class{modules={};waitingForBind=!1;addModules(...e){for(let t of e){let o=new t;this.modules[o.name]=o}}addModule(e){this.modules[e.name]=e}handleKeyPress(e){for(let t in this.modules){let o=this.modules[t];this.waitingForBind?(o.bind=e,this.waitingForBind=!1):e&&o.bind===e&&o.toggle()}}init(){this.addModules(N,I,D,P,v,C,E,B,M,S,L,w,k),d.on("render",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onRender()}),d.on("tick",()=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onTick()}),d.on("keydown",this.handleKeyPress.bind(this)),d.on("setting.update",e=>{for(let t in this.modules)(this.modules[t].isEnabled||e.moduleName===t)&&this.modules[t].onSettingUpdate(e.setting,e.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}},T=new R;var G=`:host {
>>>>>>> a146afa (a)
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
<<<<<<< HEAD
<<<<<<< HEAD
`;function Q(r){let e=document.createElement("style");e.textContent=r,d.wrapper.appendChild(e)}var Z=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});Z.load().then(r=>document.fonts.add(r));var ee=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});ee.load().then(r=>document.fonts.add(r));Q(_);H.init();a.hookOnTick();document.addEventListener("keydown",r=>{p.emit("keydown",r.code)});setInterval(()=>{p.emit("render")},1e3/60);var te=!0;te&&(window.ballcrack={hooks:a,shadowWrapper:d,moduleManager:H,interactionUtils:W,blockUtils:f});})();
=======
<<<<<<< HEAD
=======
>>>>>>> a146afa (a)
`;function j(r){let e=document.createElement("style");e.textContent=r,c.wrapper.appendChild(e)}var K=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});K.load().then(r=>document.fonts.add(r));var q=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});q.load().then(r=>document.fonts.add(r));j(G);T.init();a.hookOnTick();document.addEventListener("keydown",r=>{d.emit("keydown",r.code)});setInterval(()=>{d.emit("render")},1e3/60);var J=!0;J&&(window.ballcrack={hooks:a,shadowWrapper:c,moduleManager:T,interactionUtils:O,blockUtils:F});})();
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cba9665 (draft: stuff)
=======
=======
`;function j(r){let e=document.createElement("style");e.textContent=r,d.wrapper.appendChild(e)}var K=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});K.load().then(r=>document.fonts.add(r));var q=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});q.load().then(r=>document.fonts.add(r));j(G);N.init();a.hookOnTick();document.addEventListener("keydown",r=>{c.emit("keydown",r.code)});setInterval(()=>{c.emit("render")},1e3/60);var J=!0;J&&(window.ballcrack={hooks:a,shadowWrapper:d,moduleManager:N,interactionUtils:O,blockUtils:F});})();
>>>>>>> a041526 (fix: it work)
>>>>>>> 2fa2a0d (fix: it work)
<<<<<<< HEAD
>>>>>>> dd77c5f (fix: it work)
=======
=======
>>>>>>> 4bfae9d (a)
>>>>>>> a146afa (a)
