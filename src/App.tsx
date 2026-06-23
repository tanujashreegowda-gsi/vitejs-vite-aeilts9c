import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Play, Pause, ChevronDown, ChevronUp, BookOpen, Home, User, Volume2, Send, Search, Filter, Globe } from "lucide-react";
import { CATEGORIES, shlokas as importedShlokas, kandas, themeColors, supabase } from "./database";

const P = {
  saffron: "#FF6B1A", gold: "#D4A017", deepGold: "#B8860B",
  cream: "#FFF8E7", offWhite: "#FAF3E0", warmBrown: "#5C3D1E",
  deepBrown: "#3B2008", mutedGold: "#C9A84C", lightSaffron: "#FFE0C0", earthen: "#8B6914",
};

const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
];

function AudioPlayer({ audioUrl }: { audioUrl?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<any>(null);

  const toggle = () => {
    if (playing) {
      if (audioUrl && audioRef.current) audioRef.current.pause();
      clearInterval(intervalRef.current);
      setPlaying(false);
    } else {
      if (audioUrl && audioRef.current) audioRef.current.play();
      setPlaying(true);
      intervalRef.current = setInterval(()=>setProgress(p=>{if(p>=100){clearInterval(intervalRef.current);setPlaying(false);return 0;}return p+0.5;}), 80);
    }
  };

  useEffect(()=>()=>clearInterval(intervalRef.current),[]);

  return (
    <div style={{background:"linear-gradient(135deg,#3B2008,#5C3D1E)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
      {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => {setPlaying(false); clearInterval(intervalRef.current); setProgress(0);}} style={{ display: 'none' }} />}
      <button onClick={toggle} style={{background:P.gold,border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        {playing ? <Pause size={14} color="#3B2008"/> : <Play size={14} color="#3B2008"/>}
      </button>
      <Volume2 size={13} color={P.mutedGold} style={{flexShrink:0}}/>
      <div style={{flex:1,background:"rgba(255,255,255,0.15)",borderRadius:99,height:5}}>
        <div style={{width: `${progress}%`, background:`linear-gradient(90deg,${P.gold},${P.saffron})`,borderRadius:99,height:"100%",transition: "width 0.1s"}}/>
      </div>
      <span style={{color:P.mutedGold,fontSize:10,flexShrink:0}}>{playing ? "Chanting…" : "Listen"}</span>
    </div>
  );
}

function LangDropdown({translations}: any) {
  const [open,setOpen]=useState(false);
  const [lang,setLang]=useState("en");
  const cur=LANGS.find(l=>l.code===lang)!;
  return(
    <div style={{position:"relative",marginTop:12}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,background:P.offWhite,border:`1.5px solid ${P.gold}`,borderRadius:10,padding:"8px 14px",cursor:"pointer",width:"100%",justifyContent:"space-between",color:P.warmBrown,fontWeight:600,fontSize:13}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><Globe size={14} color={P.saffron}/><span>{cur.flag} {cur.label}</span></div>
        {open?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:`1.5px solid ${P.gold}`,borderRadius:10,zIndex:50,overflow:"hidden",boxShadow:"0 8px 24px rgba(60,32,8,0.15)"}}>
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>{setLang(l.code);setOpen(false);}} style={{width:"100%",background:lang===l.code?P.lightSaffron:"white",border:"none",padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,color:lang===l.code?P.saffron:P.warmBrown,fontWeight:lang===l.code?700:400,fontSize:13,textAlign:"left"}}>
              <span>{l.flag}</span><span>{l.label}</span>{lang===l.code&&<span style={{marginLeft:"auto",color:P.saffron}}>✓</span>}
            </button>
          ))}
        </div>
      )}
      <div style={{background:`linear-gradient(135deg,#FFF8E7,#FFE0C0)`,borderRadius:"0 0 12px 12px",padding:"14px 16px",borderTop:`2px solid ${P.gold}`,marginTop:0}}>
        <p style={{color:P.deepBrown,lineHeight:1.8,margin:0,fontSize:14}}>
          <span style={{color:P.saffron,fontWeight:700,marginRight:6}}>॥</span>
          {translations[lang]||translations.en}
          <span style={{color:P.saffron,fontWeight:700,marginLeft:6}}>॥</span>
        </p>
      </div>
    </div>
  );
}

function ShlokCard({shloka}: any) {
  const [liked,setLiked]=useState(false);
  const [likeCount,setLikeCount]=useState(shloka.likes);
  const [showTrans,setShowTrans]=useState(false);
  const cat=CATEGORIES.find(c=>c.id===shloka.category)||CATEGORIES[0];
  
  return(
    <div style={{background:"white",borderRadius:20,boxShadow:"0 4px 24px rgba(60,32,8,0.1)",marginBottom:28,border:`1px solid ${P.lightSaffron}`}}>
      <div style={{position:"relative",height:180, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow:"hidden"}}>
        <img src={shloka.image} alt={shloka.category} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 30%,rgba(59,32,8,0.88))"}}/>
        <div style={{position:"absolute",bottom:14,left:16,right:16,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
          <div>
            <span style={{background:cat.color,color:"white",borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:700,display:"inline-flex",alignItems:"center",gap:4,marginBottom:4}}>{cat.icon}{cat.label}</span>
            <h3 style={{color:"white",margin:0,fontSize:17,fontWeight:700,textShadow:"0 1px 4px rgba(0,0,0,0.5)"}}>{shloka.number}</h3>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <Heart size={14} color={liked?P.saffron:"rgba(255,255,255,0.6)"} fill={liked?P.saffron:"none"}/>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:12}}>{likeCount}</span>
          </div>
        </div>
      </div>
      <div style={{padding:"18px 20px"}}>
        <div style={{background:P.offWhite,borderLeft:`4px solid ${P.gold}`,borderRadius:"0 10px 10px 0",padding:"14px 16px",marginBottom:12}}>
          <p style={{fontFamily:"serif",fontSize:18,lineHeight:1.9,color:P.deepBrown,margin:0,whiteSpace:"pre-line"}}>{shloka.sanskrit}</p>
        </div>
        <p style={{color:P.earthen,fontStyle:"italic",fontSize:13,lineHeight:1.7,margin:"0 0 12px",whiteSpace:"pre-line"}}>{shloka.transliteration}</p>
        <div style={{marginBottom:12}}><AudioPlayer audioUrl={shloka.audioUrl} /></div>
        <button onClick={()=>setShowTrans(s=>!s)} style={{width:"100%",background:showTrans?`linear-gradient(135deg,${P.gold},${P.saffron})`:P.offWhite,border:`1.5px solid ${P.gold}`,borderRadius:10,padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",color:showTrans?"white":P.warmBrown,fontWeight:600,fontSize:13,transition:"all 0.3s"}}>
          <span>✦ Translation & Meaning</span>{showTrans?<ChevronUp size={15}/>:<ChevronDown size={15}/>}
        </button>
        {showTrans&&<LangDropdown translations={shloka.translations}/>}
      </div>
    </div>
  );
}

function KandasPage({ selCat, setSelCat, shlokas }: any) {
  const [selKanda,setSelKanda]=useState<any>(null);
  const [search,setSearch]=useState("");
  const filtered=shlokas.filter((s:any)=>{
    const catOk=selCat==="all"||s.category===selCat;
    const kandaOk=selKanda===null||s.kanda===selKanda;
    const q=search.toLowerCase();
    const searchOk=!q||s.sanskrit.toLowerCase().includes(q)||s.transliteration.toLowerCase().includes(q)||s.number.toLowerCase().includes(q);
    return catOk&&kandaOk&&searchOk;
  });
  return(
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",minHeight:"80vh"}}>
      <div style={{background:`linear-gradient(180deg,${P.deepBrown},#4A2C10)`,padding:"20px 0",overflowY:"auto",maxHeight:"80vh"}}>
        <div style={{padding:"0 14px 14px",borderBottom:"1px solid rgba(212,160,23,0.2)"}}>
          <h3 style={{color:P.gold,margin:"0 0 10px",fontFamily:"serif",fontSize:14}}>✦ Twenty Kandas</h3>
          <button onClick={()=>setSelKanda(null)} style={{width:"100%",background:selKanda===null?`rgba(212,160,23,0.2)`:"transparent",border:selKanda===null?`1px solid ${P.gold}`:"1px solid transparent",borderRadius:8,padding:"7px 10px",color:selKanda===null?P.gold:"rgba(255,240,200,0.6)",fontSize:12,cursor:"pointer",textAlign:"left",fontWeight:selKanda===null?700:400}}>All Kandas</button>
        </div>
        <div style={{overflowY:"auto"}}>
          {kandas.map(k=>(
            <button key={k.id} onClick={()=>setSelKanda(k.id)} style={{width:"100%",background:selKanda===k.id?`linear-gradient(90deg,rgba(212,160,23,0.18),transparent)`:"transparent",border:"none",borderLeft:selKanda===k.id?`3px solid ${P.gold}`:"3px solid transparent",padding:"10px 14px",textAlign:"left",cursor:"pointer"}}>
              <div style={{color:selKanda===k.id?P.gold:"rgba(255,240,200,0.75)",fontWeight:selKanda===k.id?700:400,fontSize:13}}>{k.name}</div>
              <div style={{color:(themeColors as any)[k.theme.toLowerCase()]||P.mutedGold,fontSize:10,marginTop:2}}>{k.theme} · {k.hymns} Hymns</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{background:P.cream,overflowY:"auto",maxHeight:"80vh"}}>
        <div style={{background:"white",padding:"16px 20px",borderBottom:`1px solid ${P.lightSaffron}`,position:"sticky",top:0,zIndex:10}}>
          <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"center"}}>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:P.offWhite,border:`1.5px solid ${P.gold}`,borderRadius:99,padding:"8px 14px"}}>
              <Search size={14} color={P.earthen}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search verses..." style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:P.deepBrown,width:"100%"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,color:P.earthen,fontSize:12}}><Filter size={14}/><span>{filtered.length} hymns</span></div>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
            {CATEGORIES.map(c=>(
              <button key={c.id} onClick={()=>setSelCat(c.id)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:5,background:selCat===c.id?c.color:c.bg,border:`1.5px solid ${selCat===c.id?c.color:"transparent"}`,borderRadius:99,padding:"6px 12px",cursor:"pointer",color:selCat===c.id?"white":c.color,fontWeight:600,fontSize:12,transition:"all 0.2s"}}>
                {c.icon}{c.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:"24px 20px"}}>
          {filtered.length===0?(
            <div style={{textAlign:"center",padding:"60px 24px"}}>
              <div style={{fontSize:40,marginBottom:12}}>🕉</div>
              <h3 style={{color:P.warmBrown,fontFamily:"serif"}}>No verses found</h3>
            </div>
          ):filtered.map((s:any)=><ShlokCard key={s.id} shloka={s}/>)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selCat, setSelCat] = useState("all");
  const [shlokas, setShlokas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVedas() {
      const { data, error } = await supabase.from('atharva_veda').select('*').order('kanda', { ascending: true });
      if (data) {
        setShlokas(data.map((r:any) => ({
          id: r.id, number: r.hymn_number, kanda: r.kanda, category: r.category,
          audioUrl: r.audio_url, image: r.image_url, sanskrit: r.sanskrit,
          transliteration: r.transliteration, translations: {en:r.trans_en,ta:r.trans_ta,te:r.trans_te,kn:r.trans_kn,hi:r.trans_hi,ml:r.trans_ml},
          likes: r.likes
        })));
      }
      setLoading(false);
    }
    fetchVedas();
  }, []);

  if (loading) return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:P.cream}}>🕉 Loading Ancient Wisdom...</div>;

  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:P.cream,minHeight:"100vh"}}>
      <nav style={{background:"linear-gradient(90deg,#3B2008,#5C3D1E)",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setPage("home")}>
          <span style={{fontSize:22}}>🕉</span>
          <div style={{color:P.gold,fontFamily:"serif",fontSize:17,fontWeight:700}}>AtharvaVāṇī</div>
        </div>
        <div style={{display:"flex",gap:3}}>
          {[{id:"home",label:"Home",icon:<Home size={15}/>},{id:"kandas",label:"Kandas",icon:<BookOpen size={15}/>}].map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{background:page===n.id?`linear-gradient(135deg,${P.gold},${P.saffron})`:"transparent",border:"none",borderRadius:99,padding:"7px 16px",color:page===n.id?"white":"rgba(255,240,200,0.8)",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
              {n.icon}{n.label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        {page==="home"? <div style={{padding:"60px",textAlign:"center"}}><h1>Welcome to AtharvaVāṇī</h1><button onClick={()=>{setPage("kandas");setSelCat("all")}} style={{padding:"15px 30px",background:P.gold,color:"white",border:"none",borderRadius:99,cursor:"pointer",fontWeight:700}}>Explore Hymns</button></div> : <KandasPage selCat={selCat} setSelCat={setSelCat} shlokas={shlokas}/>}
      </main>
    </div>
  );
}