import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR REAL SUPABASE KEYS FROM SETTINGS -> API
const supabaseUrl = 'https://rwhbremnxjboznwlfhmx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3aGJyZW1ueGpib3pud2xmaG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzE4MzIsImV4cCI6MjA5NzgwNzgzMn0.3GswPyvldxR-ukr1pZEgQbF3KSsH5SCQKlWmApGEGpA';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const CATEGORIES = [
  { id: "all", label: "All Hymns", color: "#7C5CBF", bg: "#EDE7F6" },
  { id: "health", label: "Health & Healing", color: "#2E7D32", bg: "#E8F5E9" },
  { id: "prosperity", label: "Prosperity", color: "#F57F17", bg: "#FFF8E1" },
  { id: "peace", label: "Peace & Harmony", color: "#1565C0", bg: "#E3F2FD" },
  { id: "protection", label: "Protection", color: "#B71C1C", bg: "#FFEBEE" },
  { id: "nature", label: "Nature & Cosmos", color: "#00695C", bg: "#E0F2F1" },
  { id: "ritual", label: "Ritual & Devotion", color: "#E65100", bg: "#FBE9E7" },
  { id: "philosophy", label: "Philosophy", color: "#2E86AB", bg: "#E1F5FE" },
];

export const kandas = Array.from({length:20},(_,i)=> ({
    id: i + 1, 
    name: `Kanda ${i + 1}`,
    hymns: 0, // This will be dynamic once you add data
    theme: "General"
}));

export const themeColors = {
  health:"#4CAF8A", protection:"#E07B39", cosmology:"#7C5CBF", nature:"#5A9E44", 
  philosophy:"#2E86AB", ritual:"#C4772C", prosperity:"#D4A017", peace:"#1565C0"
};