import {useState,CSSProperties} from 'react';
export interface ArtImageProps{src?:string;alt:string;needed?:string;style?:CSSProperties;className?:string}
/** Shows image; if src missing/broken shows an editable placeholder naming the file needed. */
export default function ArtImage({src,alt,needed,style,className}:ArtImageProps){
const [bad,setBad]=useState(false);
if(!src||bad)return <div className={`hve-slot ${className??''}`} style={style} role="img" aria-label={alt}>Image needed:<br/>{needed??alt}</div>;
return <img className={`hve-img ${className??''}`} src={src} alt={alt} loading="lazy" decoding="async" style={style} onError={()=>setBad(true)}/>}
