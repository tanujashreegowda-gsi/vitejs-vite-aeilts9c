import { useState, useEffect } from "react";
import { supabase, CATEGORIES } from "./database";

export default function App() {
  const [shlokas, setShlokas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from Supabase...");
        const { data, error } = await supabase.from('atharva_veda').select('*');
        
        if (error) {
          console.error("Supabase Error:", error);
          setError(error.message);
        } else {
          console.log("Data received:", data);
          setShlokas(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>AtharvaVāṇī Hymns</h1>
      {shlokas.map((s: any) => (
        <div key={s.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3>{s.hymn_number}</h3>
          <p>{s.sanskrit}</p>
        </div>
      ))}
    </div>
  );
}