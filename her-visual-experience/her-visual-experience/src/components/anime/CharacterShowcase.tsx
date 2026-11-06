import {ReactNode,useState,CSSProperties} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'framer-motion';
import ArtImage from '../ArtImage';
export interface CharacterShowcaseProps{src?:string;name:string;subtitle:string;background?:string;decoration?:ReactNode;from?:'left'|'right'|'bottom';intensity?:0|1|2|3;imageStyle?:CSSProperties;height?:number|string;needed?:string;burst?:string}
export default function CharacterShowcase({src,name,subtitle,background='linear-gradient(160deg,#a9cbe8,#c3b4dc)',decoration,from='bottom',intensity=1,imageStyle,height=420,needed,burst='✦'}:CharacterShowcaseProps){
const rm=useReducedMotion();const k=rm?0:intensity;
const {scrollYProgress}=useScroll();const py=useTransform(scrollYProgress,[0,1],[0,-40*k]);
const [b,setB]=useState<number[]>([]);
const init=from==='left'?{x:-200,opacity:0}:from==='right'?{x:200,opacity:0}:{y:160,opacity:0};
return <div className="hve-char" style={{background,height}}>
<div style={{position:'absolute',inset:0,zIndex:1}}>{decoration}</div>
<motion.div className="hve-char-fig" style={{y:py}} initial={rm?false:init} whileInView={{x:0,y:0,opacity:1}} viewport={{once:true}} transition={{type:'spring',stiffness:60,damping:16}} onClick={()=>setB(a=>[...a,Date.now()].slice(-6))}>
<motion.div animate={k?{y:[0,-6*k,0],rotate:[-.6*k,.6*k,-.6*k]}:{}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}>
<ArtImage src={src} alt={name} needed={needed??`${name} cutout (transparent PNG/WebP)`} style={{minHeight:260,...imageStyle}}/></motion.div></motion.div>
{b.map(id=>[0,1,2].map(i=><motion.span key={id+'-'+i} className="hve-burst" initial={{opacity:1,left:'50%',top:'60%'}} animate={{opacity:0,left:`${50+(i-1)*20}%`,top:'25%'}} transition={{duration:1}}>{burst}</motion.span>))}
<div className="hve-char-cap"><b>{name}</b><span>{subtitle}</span></div></div>}
