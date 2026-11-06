import {useState,ReactNode} from 'react';
export interface Hotspot{x:number;y:number;note:string}
export interface SceneProps{animate?:boolean;hotspots?:Hotspot[]}
const Cloud=({y,d,s}:{y:number;d:number;s:number})=><g transform={`translate(0 ${y}) scale(${s})`}><g className="hve-cloud" style={{animationDuration:`${d}s`,animationDelay:`-${d/2}s`}}><ellipse rx="60" ry="20" fill="#fff"/><ellipse cx="-30" cy="-12" rx="30" ry="18" fill="#fff"/><ellipse cx="25" cy="-16" rx="34" ry="20" fill="#fff"/></g></g>;
const Cat=({x,y,s=1}:{x:number;y:number;s?:number})=><g transform={`translate(${x} ${y}) scale(${s})`} fill="#1b2a4a"><ellipse rx="22" ry="14"/><circle cx="20" cy="-12" r="11"/><path d="M12 -20l3-12 6 9zM22 -21l7-10 2 12z"/><path className="hve-tail" d="M-20 0q-22-4-18-26" stroke="#1b2a4a" strokeWidth="5" fill="none" strokeLinecap="round"/></g>;
function Wrap({children,hotspots,animate=true}:{children:ReactNode;hotspots:Hotspot[];animate?:boolean}){
const [n,setN]=useState<string|null>(null);
return <div className="hve-scene" data-paused={!animate}>{children}
{hotspots.map((h,i)=><button key={i} aria-label="Open hidden note" className="hve-spot" style={{left:`${h.x}%`,top:`${h.y}%`}} onClick={()=>setN(h.note)}/>)}
{n&&<div className="hve-note hve-hand" role="dialog" onClick={()=>setN(null)}>{n}<div style={{fontSize:'.8rem'}}>(tap to close)</div></div>}</div>}
export function FlowerGarden({animate=true,hotspots=[{x:30,y:72,note:'A note tucked under the blue flowers.'}]}:SceneProps){
const fl=Array.from({length:26},(_,i)=>({x:20+i*30+(i%3)*7,h:60+(i*37)%50,d:3+(i%5)*.6}));
return <Wrap hotspots={hotspots} animate={animate}><svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fbfe6"/><stop offset="1" stopColor="#f6efe0"/></linearGradient><radialGradient id="sun"><stop offset="0" stopColor="#fff6c8"/><stop offset="1" stopColor="#fff6c800"/></radialGradient></defs>
<rect width="800" height="500" fill="url(#g1)"/><circle cx="640" cy="90" r="150" fill="url(#sun)"/>
<Cloud y={80} d={70} s={1.2}/><Cloud y={150} d={95} s={.8}/>
<path d="M0 300q120-80 250-20t260-30 290 20v230H0z" fill="#a8c6b0"/>
{[90,300,560,720].map((x,i)=><g key={x}><rect x={x} y={250-i%2*10} width="8" height="50" fill="#6b5a6e"/><circle cx={x+4} cy={235-i%2*10} r="34" fill="#7fae95"/></g>)}
<path d="M0 360q200-40 400 0t400-10v150H0z" fill="#8fbf9d"/>
{fl.map((f,i)=><g key={i} transform={`translate(${f.x} 470)`}><g className="hve-sway" style={{animationDuration:`${f.d}s`,animationDelay:`-${i*.3}s`}}><rect x="-1.5" y={-f.h} width="3" height={f.h} fill="#4f8a6a"/>{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy={-f.h-9} rx="5" ry="10" fill={i%4?'#6d9be0':'#a9cbe8'} transform={`rotate(${a} 0 ${-f.h})`}/>)}<circle cy={-f.h} r="4" fill="#f6efe0"/></g></g>)}
<Cat x={470} y={462} s={1.2}/>
{Array.from({length:7},(_,i)=><ellipse key={i} className="hve-float" cx={80+i*105} cy={200+(i*53)%160} rx="4" ry="2.5" fill="#f3c9d4" style={{animationDuration:`${3+i*.4}s`}}/>)}
</svg></Wrap>}
export function CountrysideWorld({animate=true,hotspots=[{x:62,y:55,note:'Someone left the lamp on for you.'}]}:SceneProps){
return <Wrap hotspots={hotspots} animate={animate}><svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa8dc"/><stop offset="1" stopColor="#f3e3d0"/></linearGradient></defs>
<rect width="800" height="500" fill="url(#g2)"/><Cloud y={70} d={80} s={1.3}/><Cloud y={140} d={60} s={.9}/><Cloud y={40} d={110} s={.7}/>
<path d="M0 280q150-90 300-10t300-30 200 20v240H0z" fill="#b5cfb0"/>
<path d="M0 350q200-70 400-10t400-20v180H0z" fill="#8fbf9d"/>
<g transform="translate(500 290)"><rect width="90" height="60" fill="#f0e2cc"/><path d="M-10 0L45-45 100 0z" fill="#c97b84"/><rect x="12" y="20" width="22" height="40" fill="#6b5a6e"/><rect x="52" y="16" width="22" height="20" fill="#a9cbe8"/><rect x="70" y="-40" width="12" height="30" fill="#8a6f6a"/>{[0,1,2].map(i=><circle key={i} className="hve-smoke" cx="76" cy="-48" r="6" fill="#fff" style={{animationDelay:`${i*1.3}s`}}/>)}</g>
<path d="M0 420q250-40 500-10t300-20v110H0z" fill="#79ad88"/>
{[120,220,700].map((x,i)=><g key={x}><rect x={x} y={340-i*8} width="8" height="46" fill="#6b5a6e"/><circle className="hve-sway" cx={x+4} cy={325-i*8} r="32" fill="#6fa583"/></g>)}
<Cat x={330} y={410} s={.9}/>
{Array.from({length:6},(_,i)=><circle key={i} className="hve-twinkle" cx={40+i*140} cy={190+(i*47)%150} r="2.5" fill="#fff" style={{animationDuration:`${1.5+i*.3}s`}}/>)}
</svg></Wrap>}
