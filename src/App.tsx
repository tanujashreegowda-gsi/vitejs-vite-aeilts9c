import { useState, useEffect } from "react";
import { supabase } from "./database";
import { Play, Pause, Volume2, ChevronDown, ChevronUp, Globe } from "lucide-react";

const P = {
  saffron: "#FF6B1A", gold: "#D4A017", offWhite: "#FAF3E0", 
  warmBrown: "#5C3D1E", deepBrown: "#3B2008", cream: "#FFF8E7"
};

// Component to handle the audio and translations
function ShlokCard({ s }: { s: any }) {
  const [showTrans, setShowTrans] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ background: 'white', padding: 20, marginBottom: 15, borderRadius: 12, border: `1px solid ${P.gold}` }}>
      <h3>{s.number}</h3>
      <p style={{ fontFamily: 'serif', fontSize: 18 }}>{s.sanskrit}</p>
      
      {/* Audio Button */}
      <button onClick={() => setPlaying(!playing)} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
        {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Pause" : "Listen"}
      </button>

      {/* Translation Toggle */}
      <button onClick={() => setShowTrans(!showTrans)} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', background: 'none', border: 'none', color: P.saffron }}>
        {showTrans ? "Hide Translations" : "Show Translations"} {showTrans ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>

      {showTrans && (
        <div style={{ marginTop: 10, padding: 10, background: P.offWhite, borderRadius: 8 }}>
          <p><strong>English:</strong> {s.translations.en}</p>
          <p><strong>Tamil:</strong> {s.translations.ta}</p>
          <p><strong>Telugu:</strong> {s.translations.te}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [shlokas, setShlokas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('atharva_veda').select('*');
      if (data) {
        const formatted = data.map((r: any) => ({
          id: r.id,
          number: r.hymn_number,
          sanskrit: r.sanskrit,
          category: r.category,
          translations: { en: r.trans_en, ta: r.trans_ta, te: r.trans_te }
        }));
        setShlokas(formatted);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = shlokas.filter((s) => 
    s.sanskrit.toLowerCase().includes(search.toLowerCase()) || 
    s.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, background: P.cream, minHeight: '100vh' }}>
      <h1>AtharvaVāṇī Hymns</h1>
      <input 
        placeholder="Search by number or text..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: 20, borderRadius: 8 }}
      />
      {loading ? <p>Loading...</p> : filtered.map((s) => <ShlokCard key={s.id} s={s} />)}
    </div>
  );
}