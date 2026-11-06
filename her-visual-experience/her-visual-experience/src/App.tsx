import {useState} from 'react';
import CharacterShowcase from './components/anime/CharacterShowcase';
import {FlowerGarden,CountrysideWorld} from './components/environments/Scenes';
import {ArtistShowcase,SongVisualCard,FloatingMusicDecorations} from './components/music';
import {FallingPetals,SparkleField,DecorativeButterfly,FloatingFlower,FloatingCat,ScrapbookSticker,HandwrittenText,PaperReveal} from './components/decorations';
const T={petals:'Petals',sparkles:'Sparkles',notes:'Music notes',butterfly:'Butterfly',cat:'Cat',flower:'Flower',grain:'Film grain',motion:'Scene motion'};
type K=keyof typeof T;
export default function App(){
const [on,set]=useState<Record<K,boolean>>({petals:true,sparkles:true,notes:true,butterfly:true,cat:true,flower:true,grain:true,motion:true});
const A=['Olivia Rodrigo','Taylor Swift','Ariana Grande','The Fray','The Script'];
return <div className="hve hve-demo">
{on.grain&&<div className="hve-grain"/>}
<h1>Her Visual Experience</h1><HandwrittenText text="a scrapbook of blue flowers, cats & songs"/>
<div className="hve-panel">{(Object.keys(T) as K[]).map(k=><label key={k}><input type="checkbox" checked={on[k]} onChange={()=>set(s=>({...s,[k]:!s[k]}))}/> {T[k]}</label>)}</div>
<h2>A · Characters</h2>
<div className="hve-grid">
<CharacterShowcase name="Maomao" subtitle="The Apothecary Diaries" src="/characters/maomao.png" from="left" intensity={1} background="linear-gradient(160deg,#a9cbe8,#f6efe0)" burst="🌿" decoration={<SparkleField visible={on.sparkles} count={8}/>}/>
<CharacterShowcase name="Toji Fushiguro" subtitle="Jujutsu Kaisen" src="/characters/toji.png" from="bottom" intensity={2} background="linear-gradient(200deg,#1b2a4a,#c3b4dc)" decoration={<FloatingMusicDecorations visible={on.notes}/>}/>
<CharacterShowcase name="Seiroku Sakamoto" subtitle="Sparks of Tomorrow" src="/characters/sakamoto.png" from="right" intensity={1} background="linear-gradient(120deg,#e3b5c0,#f6efe0)" burst="✿" decoration={<FloatingFlower visible={on.flower} style={{left:'10%',top:'15%'}}/>}/></div>
<h2>B · Environments</h2>
<div className="hve-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))'}}>
<div style={{position:'relative'}}><FlowerGarden animate={on.motion}/><FallingPetals visible={on.petals} style={{inset:0}}/>{on.butterfly&&<DecorativeButterfly style={{left:'20%',top:'30%'}}/>}</div>
<CountrysideWorld animate={on.motion}/></div>
<h2>C · Music</h2>
<ArtistShowcase featured name={A[0]} albums={[{title:'SOUR',year:'2021'},{title:'GUTS',year:'2023'}]}/>
<div className="hve-grid" style={{marginTop:18}}>{A.slice(1).map(n=><ArtistShowcase key={n} name={n} accent="#a9cbe8" albums={[{title:'Album slot'}]}/>)}</div>
<div style={{marginTop:18}}><SongVisualCard title="Song title" artist="Artist"/></div>
<h2>D · Decorations</h2>
<PaperReveal><div style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center',position:'relative',minHeight:140}}><ScrapbookSticker>blue flowers</ScrapbookSticker><ScrapbookSticker rotate={5} color="#e3b5c0">cats</ScrapbookSticker>{on.cat&&<FloatingCat style={{position:'relative'}}/>}<SparkleField visible={on.sparkles}/></div></PaperReveal>
</div>}
