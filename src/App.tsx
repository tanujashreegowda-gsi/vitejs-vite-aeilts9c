import { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Home,
  User,
  Volume2,
  Send,
  Star,
  Flame,
  Leaf,
  Sun,
  Droplets,
  Shield,
  Coins,
  Wind,
  Search,
  Filter,
  Globe,
} from 'lucide-react';

const P = {
  saffron: '#FF6B1A',
  gold: '#D4A017',
  deepGold: '#B8860B',
  cream: '#FFF8E7',
  offWhite: '#FAF3E0',
  warmBrown: '#5C3D1E',
  deepBrown: '#3B2008',
  mutedGold: '#C9A84C',
  lightSaffron: '#FFE0C0',
  earthen: '#8B6914',
};

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
];

const CATEGORIES = [
  {
    id: 'all',
    label: 'All Hymns',
    icon: <Star size={15} />,
    color: '#7C5CBF',
    bg: '#EDE7F6',
  },
  {
    id: 'health',
    label: 'Health & Healing',
    icon: <Droplets size={15} />,
    color: '#2E7D32',
    bg: '#E8F5E9',
  },
  {
    id: 'prosperity',
    label: 'Prosperity',
    icon: <Coins size={15} />,
    color: '#F57F17',
    bg: '#FFF8E1',
  },
  {
    id: 'peace',
    label: 'Peace & Harmony',
    icon: <Wind size={15} />,
    color: '#1565C0',
    bg: '#E3F2FD',
  },
  {
    id: 'protection',
    label: 'Protection',
    icon: <Shield size={15} />,
    color: '#B71C1C',
    bg: '#FFEBEE',
  },
  {
    id: 'nature',
    label: 'Nature & Cosmos',
    icon: <Leaf size={15} />,
    color: '#00695C',
    bg: '#E0F2F1',
  },
  {
    id: 'ritual',
    label: 'Ritual & Devotion',
    icon: <Flame size={15} />,
    color: '#E65100',
    bg: '#FBE9E7',
  },
];

const shlokas = [
  {
    id: 1,
    number: 'AV 1.1.1',
    kanda: 1,
    category: 'health',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    sanskrit:
      'ये त्रिषप्ताः परियन्ति विश्वा रूपाणि बिभ्रतः ।\nवाचस्पतिर्बला तेषां तन्वो अद्य दधातु मे ॥',
    transliteration:
      'ye triṣaptāḥ pariyanti viśvā rūpāṇi bibhrataḥ |\nvācaspatir balā teṣāṃ tanvo adya dadhātu me ||',
    translations: {
      en: 'Those who are thrice-seven, moving around bearing all forms — may the Lord of Speech place their strength in my body today.',
      ta: 'இருபத்தியொன்று பேர் அனைத்து உருவங்களையும் தாங்கி சுற்றி வருகிறார்கள் — அவர்களின் வலிமையை வாக்கின் இறைவன் இன்று என் உடலில் நிலைநிறுத்துவாராக.',
      te: 'ఇరవై ఒక్కరు అన్ని రూపాలను ధరించి చుట్టూ తిరుగుతున్నారు — వాక్కుల ప్రభువు వారి బలాన్ని నేడు నా శరీరంలో నిలపాలి.',
      kn: 'ಇಪ್ಪತ್ತೊಂದು ಮಂದಿ ಎಲ್ಲ ರೂಪಗಳನ್ನು ಧರಿಸಿ ಸುತ್ತುತ್ತಿದ್ದಾರೆ — ವಾಕ್ಕಿನ ಒಡೆಯನು ಅವರ ಬಲವನ್ನು ಇಂದು ನನ್ನ ದೇಹದಲ್ಲಿ ನೆಲೆಗೊಳಿಸಲಿ.',
      hi: 'जो इक्कीस सभी रूपों को धारण कर चारों ओर घूमते हैं — वाणी के स्वामी उनकी शक्ति को आज मेरे शरीर में स्थापित करें।',
      ml: 'ഇരുപത്തൊന്നു പേർ എല്ലാ രൂപങ്ങളും ധരിച്ചു ചുറ്റും സഞ്ചരിക്കുന്നു — വാക്കിന്റെ ഈശ്വരൻ അവരുടെ ശക്തി ഇന്ന് എന്റെ ശരീരത്തിൽ നിലനിർത്തട്ടെ.',
    },
    likes: 42,
    comments: [
      { user: 'Seeker', text: 'A profound invocation for divine strength.' },
    ],
  },
  {
    id: 2,
    number: 'AV 1.2.1',
    kanda: 1,
    category: 'peace',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    sanskrit: 'शन्नो देवीरभिष्टय आपो भवन्तु पीतये ।\nशं योरभि स्रवन्तु नः ॥',
    transliteration:
      'śanno devīrabhiṣṭaya āpo bhavantu pītaye |\nśaṃ yorabhi sravantu naḥ ||',
    translations: {
      en: 'May the divine waters be auspicious for our well-being and fit for drinking; may they flow around us bringing peace and joy.',
      ta: 'தெய்வீக நீர்கள் நமது நலனுக்காக மங்களமாகவும் குடிக்கத் தகுந்ததாகவும் இருக்கட்டும்; அவை நம்மைச் சுற்றி அமைதியும் மகிழ்ச்சியும் தரும் வகையில் பாயட்டும்.',
      te: 'దివ్యమైన జలాలు మన శ్రేయస్సు కోసం మంగళకరంగా మరియు త్రాగడానికి యోగ్యంగా ఉండాలి; అవి శాంతి మరియు ఆనందాన్ని తెస్తూ మన చుట్టూ ప్రవహించాలి.',
      kn: 'ದೈವಿಕ ನೀರು ನಮ್ಮ ಒಳಿತಿಗೆ ಮಂಗಳಕರವಾಗಿ ಮತ್ತು ಕುಡಿಯಲು ಯೋಗ್ಯವಾಗಿರಲಿ; ಅವು ಶಾಂತಿ ಮತ್ತು ಸಂತೋಷ ತರುತ್ತ ನಮ್ಮ ಸುತ್ತ ಹರಿಯಲಿ.',
      hi: 'दिव्य जल हमारे कल्याण के लिए मंगलकारी और पीने योग्य हों; वे शांति और आनंद लाते हुए हमारे चारों ओर प्रवाहित हों।',
      ml: 'ദൈവീക ജലങ്ങൾ നമ്മുടെ ക്ഷേമത്തിനായി മംഗളകരവും കുടിക്കാൻ യോഗ്യവുമായിരിക്കട്ടെ; അവ സമാധാനവും സന്തോഷവും നൽകിക്കൊണ്ട് നമ്മുടെ ചുറ്റും ഒഴുകട്ടെ.',
    },
    likes: 35,
    comments: [],
  },
  {
    id: 3,
    number: 'AV 1.3.1',
    kanda: 1,
    category: 'ritual',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=700&q=80',
    sanskrit:
      'अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् ।\nयुयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नम उक्तिं विधेम ॥',
    transliteration:
      'agne naya supathā rāye asmān viśvāni deva vayunāni vidvān |\nyuyodhyasmajjuhurāṇameno bhūyiṣṭhāṃ te nama uktiṃ vidhema ||',
    translations: {
      en: 'O Agni, lead us on the good path to prosperity. O God, knowing all our deeds, remove sin from us. We offer our most abundant words of reverence to you.',
      ta: 'ஓ அக்னியே, செழிப்பிற்கக்கான நல்ல பாதையில் எங்களை வழிநடத்துக. எங்கள் செயல்கள் அனைத்தையும் அறிந்த தேவனே, எங்களிடம் இருந்து பாவத்தை நீக்குக. உமக்கு மிகுந்த வணக்க வார்த்தைகளை நாங்கள் அர்ப்பணிக்கிறோம்.',
      te: 'ఓ అగ్నీ, సమృద్ధికి మంచి మార్గంలో మమ్మల్ని నడిపించు. మా చేష్టలన్నీ తెలిసిన దేవా, మా నుండి పాపాన్ని తొలగించు. మేము నీకు మా అత్యంత విస్తృతమైన నమస్కార వాక్కులు సమర్పిస్తున్నాము.',
      kn: 'ಓ ಅಗ್ನಿಯೇ, ಸಮೃದ್ಧಿಯ ಸರಿಯಾದ ದಾರಿಯಲ್ಲಿ ನಮ್ಮನ್ನು ನಡೆಸು. ನಮ್ಮ ಎಲ್ಲ ಕಾರ್ಯಗಳನ್ನು ತಿಳಿದ ದೇವನೇ, ನಮ್ಮಿಂದ ಪಾಪವನ್ನು ತೊಲಗಿಸು. ನಾವು ನಿನಗೆ ಅತ್ಯಂತ ಹೇರಳವಾದ ನಮನ ವಾಕ್ಯಗಳನ್ನು ಅರ್ಪಿಸುತ್ತೇವೆ.',
      hi: 'हे अग्नि, समृद्धि के लिए हमें उत्तम मार्ग पर ले चलो। हे देव, हमारे सभी कर्मों को जानते हुए हमसे पाप दूर करो। हम तुम्हें अपने सर्वाधिक प्रचुअल वंदना वचन अर्पित करते हैं।',
      ml: 'ഓ അഗ്നേ, സമൃദ്ധിയിലേക്കുള്ള നല്ല പാതയിൽ ഞങ്ങളെ നയിക്കൂ. ഞങ്ങളുടെ എല്ലാ കർമ്മങ്ങളും അറിയുന്ന ദേവാ, ഞങ്ങളിൽ നിന്ന് പാപം നീക്കൂ. ഞങ്ങൾ നിനക്ക് ഞങ്ങളുടെ ഏറ്റവും സമൃദ്ധമായ നമസ്കാര വാക്കുകൾ അർപ്പിക്കുന്നു.',
    },
    likes: 58,
    comments: [
      { user: 'Rishi', text: 'Agni as the cosmic guide — beautiful.' },
    ],
  },
  {
    id: 4,
    number: 'AV 2.1.1',
    kanda: 2,
    category: 'prosperity',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=700&q=80',
    sanskrit:
      'हिरण्यगर्भः समवर्तताग्रे भूतस्य जातः पतिरेक आसीत् ।\nस दाधार पृथिवीं द्यामुतेमां कस्मै देवाय हविषा विधेम ॥',
    transliteration:
      'hiraṇyagarbhaḥ samavartatāgre bhūtasya jātaḥ patireka āsīt |\nsa dādhāra pṛthivīṃ dyāmutemaṃ kasmai devāya haviṣā vidhema ||',
    translations: {
      en: 'In the beginning arose Hiranyagarbha — born as the one lord of all that exists. He upheld this earth and the heavens. To what God shall we offer our oblation?',
      ta: 'ஆரம்பத்தில் ஹிரண்யகர்ப்பம் தோன்றியது — இருப்பவை அனைத்திற்கும் ஒரே இறைவனாக பிறந்தது. அவன் இந்த பூமியையும் வானத்தையும் தாங்கினான். எந்த தெய்வத்திற்கு நாம் நமது படையலை செலுத்துவோம்?',
      te: 'ప్రారంభంలో హిరణ్యగర్భం ఉద్భవించింది — ఉన్న సర్వస్వానికి ఒక్క ప్రభువుగా జన్మించింది. అతను ఈ భూమిని మరియు స్వర్గాన్ని ధరించాడు. ఏ దేవతకు మనం మన హవిస్సును సమర్పించాలి?',
      kn: 'ಆರಂಭದಲ್ಲಿ ಹಿರಣ್ಯಗರ್ಭ ಹೊರಹೊಮ್ಮಿತು — ಇರುವ ಎಲ್ಲದರ ಏಕೈಕ ಒಡೆಯನಾಗಿ ಜನ್ಮ ತಾಳಿತು. ಅವನು ಈ ಭೂಮಿ ಮತ್ತು ಸ್ವರ್ಗವನ್ನು ಧರಿಸಿದನು. ಯಾವ ದೇವರಿಗೆ ನಾವು ನಮ್ಮ ಹವಿಸ್ಸನ್ನು ಅರ್ಪಿಸಬೇಕು?',
      hi: 'सृष्टि के आरंभ में हिरण्यगर्भ प्रकट हुए — समस्त विद्यमान का एकमात्र स्वामी बनकर जन्मे। उन्होंने इस पृथ्वी और आकाश को धारण किया। किस देव को हम अपनी आहुति अर्पित करें?',
      ml: 'ആദ്യത്തിൽ ഹിരണ്യഗർഭം ഉദ്ഭവിച്ചു — നിലവിലുള്ള സർവ്വസ്വത്തിന്റെ ഒരേ ഒരു ഈശ്വരനായി ജനിച്ചു. അദ്ദേഹം ഈ ഭൂമിയും ആകാശവും ഉൾക്കൊണ്ടു. ഏത് ദേവനു ഞങ്ങൾ ഞങ്ങളുടെ ഹവിസ്സ് സമർപ്പിക്കണം?',
    },
    likes: 67,
    comments: [],
  },
  {
    id: 5,
    number: 'AV 3.1.1',
    kanda: 3,
    category: 'protection',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=700&q=80',
    sanskrit:
      'वरुणस्य उत्तम्भनं असि वरुणस्य स्कम्भसर्जनी स्थः ।\nवरुणस्य ऋतसदन्यसि वरुणस्य ऋतसदनमसि ॥',
    transliteration:
      'varuṇasya uttambhanaṃ asi varuṇasya skambhasarjanī sthaḥ |\nvaruṇasya ṛtasadanyasi varuṇasya ṛtasadanamasi ||',
    translations: {
      en: "You are the pillar of Varuna; you are the prop and support of Varuna. You are the abode of Varuna's cosmic order; you are the seat of Varuna's truth.",
      ta: 'நீ வருணனின் தூண்; நீ வருணனின் ஆதாரமும் ஆதரவும். நீ வருணனின் பிரபஞ்ச ஒழுங்கின் இடம்; நீ வருணனின் சத்தியத்தின் இருக்கை.',
      te: 'మీరు వరుణుని స్తంభం; మీరు వరుణుని ఆధారం మరియు మద్దతు. మీరు వరుణుని విశ్వ క్రమానికి నిలయం; మీరు వరుణుని సత్యానికి ఆసనం.',
      kn: 'ನೀವು ವರುಣನ ಸ್ತಂಭ; ನೀವು ವರುಣನ ಆಧಾರ ಮತ್ತು ಬೆಂಬಲ. ನೀವು ವರುಣನ ವಿಶ್ವ ಕ್ರಮದ ನೆಲೆ; ನೀವು ವರುಣನ ಸತ್ಯದ ಆಸನ.',
      hi: 'तुम वरुण के स्तंभ हो; तुम वरुण के आधार और सहारे हो। तुम वरुण की ब्रह्मांडीय व्यवस्था के निवास हो; तुम वरुण के सत्य के आसन हो।',
      ml: 'നിങ്ങൾ വരുണന്റെ സ്തംഭമാണ്; നിങ്ങൾ വരുണന്റെ ആധാരവും പ്രതിഷ്ഠയുമാണ്. നിങ്ങൾ വരുണന്റെ പ്രപഞ്ച ക്രമത്തിന്റെ ആലയമാണ്; നിങ്ങൾ വരുണന്റെ സത്യത്തിന്റെ ആസനമാണ്.',
    },
    likes: 49,
    comments: [
      { user: 'Devotee', text: "Varuna's cosmic order — magnificent!" },
    ],
  },
  {
    id: 6,
    number: 'AV 4.1.1',
    kanda: 4,
    category: 'nature',
    audioUrl: '',
    image:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=700&q=80',
    sanskrit:
      'ये नक्षत्राणि विविदुः सूर्यस्य च चन्द्रमसश्च ।\nता विद्यां देवानां श्रेष्ठां तामहं पारयामसि ॥',
    transliteration:
      'ye nakṣatrāṇi vividuḥ sūryasya ca candramasaśca |\ntā vidyāṃ devānāṃ śreṣṭhāṃ तामहं पारयामसि ||',
    translations: {
      en: 'Those who know the constellations, the sun and the moon — that supreme knowledge of the gods, that knowledge I shall transmit across all boundaries.',
      ta: 'நட்சத்திரங்களையும் சூரியனையும் சந்திரனையும் அறிந்தவர்கள் — தேவர்களின் அந்த உயர்ந்த ஞானத்தை, அந்த அறிவை நான் எல்லை கடந்து பரப்புவேன்.',
      te: 'నక్షత్రాలు, సూర్యుడు మరియు చంద్రుడిని తెలిసిన వారు — దేవతల యొక్క ఆ అత్యున్నత జ్ఞానాన్ని, ఆ జ్ఞానాన్ని నేను అన్ని హద్దులు దాటి ప్రసారం చేస్తాను.',
      kn: 'ನಕ್ಷತ್ರಗಳು, ಸೂರ್ಯ ಮತ್ತು ಚಂದ್ರರನ್ನು ತಿಳಿದವರು — ದೇವತೆಗಳ ಆ ಶ್ರೇಷ್ಠ ಜ್ಞಾನವನ್ನು, ಆ ಜ್ಞಾನವನ್ನು ನಾನು ಎಲ್ಲ ಗಡಿಗಳನ್ನು ದಾಟಿ ಪ್ರಸಾರ ಮಾಡುತ್ತೇನೆ.',
      hi: 'जो नक्षत्रों को, सूर्य और चंद्रमा को जानते हैं — देवों के उस श्रेष्ठ ज्ञान को, उस ज्ञान को मैं सभी सीमाओं के पार प्रसारित करूँगा।',
      ml: 'നക്ഷത്രങ്ങളും സൂര്യനും ചന്ദ്രനും അറിയുന്നവർ — ദേവതകളുടെ ആ ശ്രേഷ്ഠ ജ്ഞാനത്തെ, ആ അറിവ് ഞാൻ എല്ലാ അതിർത്തികൾ കടന്ന് പ്രസരിപ്പിക്കും.',
    },
    likes: 73,
    comments: [],
  },
];

// DYNAMIC SIDEBAR DATA (Now calculates exact actual hymns)
const kandas = Array.from({ length: 20 }, (_, i) => {
  const kandaNum = i + 1;
  const count = shlokas.filter((s) => s.kanda === kandaNum).length;
  return {
    id: kandaNum,
    name: `Kanda ${kandaNum}`,
    hymns: count,
    theme: [
      'Healing',
      'Protection',
      'Cosmology',
      'Nature',
      'Philosophy',
      'Ritual',
      'Prosperity',
      'Time',
      'Creation',
      'Devotion',
    ][i % 10],
  };
});

const themeColors = {
  Healing: '#4CAF8A',
  Protection: '#E07B39',
  Cosmology: '#7C5CBF',
  Nature: '#5A9E44',
  Philosophy: '#2E86AB',
  Ritual: '#C4772C',
  Prosperity: '#D4A017',
  Time: '#6B7280',
  Creation: '#B05598',
  Devotion: '#E05C5C',
};

// REPAIRED HYBRID AUDIO PLAYER
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
      // Fallback progress bar animation if no audio URL is present
      intervalRef.current = setInterval(
        () =>
          setProgress((p) => {
            if (p >= 100) {
              clearInterval(intervalRef.current);
              setPlaying(false);
              return 0;
            }
            return p + 0.5;
          }),
        80
      );
    }
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg,#3B2008,#5C3D1E)',
        borderRadius: 12,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setPlaying(false);
            clearInterval(intervalRef.current);
            setProgress(0);
          }}
          style={{ display: 'none' }}
        />
      )}
      <button
        onClick={toggle}
        style={{
          background: P.gold,
          border: 'none',
          borderRadius: '50%',
          width: 34,
          height: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {playing ? (
          <Pause size={14} color="#3B2008" />
        ) : (
          <Play size={14} color="#3B2008" />
        )}
      </button>
      <Volume2 size={13} color={P.mutedGold} style={{ flexShrink: 0 }} />
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 99,
          height: 5,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg,${P.gold},${P.saffron})`,
            borderRadius: 99,
            height: '100%',
            transition: 'width 0.1s',
          }}
        />
      </div>
      <span style={{ color: P.mutedGold, fontSize: 10, flexShrink: 0 }}>
        {playing ? 'Chanting…' : 'Listen'}
      </span>
    </div>
  );
}

function LangDropdown({ translations, defaultLang }: any) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(defaultLang || 'en');
  const cur = LANGS.find((l) => l.code === lang)!;
  return (
    <div style={{ position: 'relative', marginTop: 12 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: P.offWhite,
          border: `1.5px solid ${P.gold}`,
          borderRadius: 10,
          padding: '8px 14px',
          cursor: 'pointer',
          width: '100%',
          justifyContent: 'space-between',
          color: P.warmBrown,
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={14} color={P.saffron} />
          <span>
            {cur.flag} {cur.label}
          </span>
        </div>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: 'white',
            border: `1.5px solid ${P.gold}`,
            borderRadius: 10,
            zIndex: 50,
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(60,32,8,0.15)',
          }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              style={{
                width: '100%',
                background: lang === l.code ? P.lightSaffron : 'white',
                border: 'none',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: lang === l.code ? P.saffron : P.warmBrown,
                fontWeight: lang === l.code ? 700 : 400,
                fontSize: 13,
                textAlign: 'left',
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && (
                <span style={{ marginLeft: 'auto', color: P.saffron }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
      <div
        style={{
          background: `linear-gradient(135deg,#FFF8E7,#FFE0C0)`,
          borderRadius: '0 0 12px 12px',
          padding: '14px 16px',
          borderTop: `2px solid ${P.gold}`,
          marginTop: 0,
        }}
      >
        <p
          style={{
            color: P.deepBrown,
            lineHeight: 1.8,
            margin: 0,
            fontSize: 14,
          }}
        >
          <span style={{ color: P.saffron, fontWeight: 700, marginRight: 6 }}>
            ॥
          </span>
          {translations[lang] || translations.en}
          <span style={{ color: P.saffron, fontWeight: 700, marginLeft: 6 }}>
            ॥
          </span>
        </p>
      </div>
    </div>
  );
}

// REPAIRED CARD COMPONENT (Removed overflow:hidden from main wrapper)
function ShlokCard({ shloka }: any) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(shloka.likes);
  const [showTrans, setShowTrans] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(shloka.comments);
  const [text, setText] = useState('');
  const cat = CATEGORIES.find((c) => c.id === shloka.category) || CATEGORIES[0];
  const post = () => {
    if (!text.trim()) return;
    setComments((c: any) => [...c, { user: 'You', text: text.trim() }]);
    setText('');
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(60,32,8,0.1)',
        marginBottom: 28,
        border: `1px solid ${P.lightSaffron}`,
      }}
    >
      {/* Overflow hidden is now specifically locked to the image only! */}
      <div
        style={{
          position: 'relative',
          height: 180,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}
      >
        <img
          src={shloka.image}
          alt={shloka.category}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom,transparent 30%,rgba(59,32,8,0.88))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            right: 16,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                background: cat.color,
                color: 'white',
                borderRadius: 99,
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                marginBottom: 4,
              }}
            >
              {cat.icon}
              {cat.label}
            </span>
            <h3
              style={{
                color: 'white',
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {shloka.number}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Heart
              size={14}
              color={liked ? P.saffron : 'rgba(255,255,255,0.6)'}
              fill={liked ? P.saffron : 'none'}
            />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
              {likeCount}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px' }}>
        <div
          style={{
            background: P.offWhite,
            borderLeft: `4px solid ${P.gold}`,
            borderRadius: '0 10px 10px 0',
            padding: '14px 16px',
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontFamily: 'serif',
              fontSize: 18,
              lineHeight: 1.9,
              color: P.deepBrown,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {shloka.sanskrit}
          </p>
        </div>
        <p
          style={{
            color: P.earthen,
            fontStyle: 'italic',
            fontSize: 13,
            lineHeight: 1.7,
            margin: '0 0 12px',
            whiteSpace: 'pre-line',
          }}
        >
          {shloka.transliteration}
        </p>

        <div style={{ marginBottom: 12 }}>
          <AudioPlayer audioUrl={shloka.audioUrl} />
        </div>

        <button
          onClick={() => setShowTrans((s) => !s)}
          style={{
            width: '100%',
            background: showTrans
              ? `linear-gradient(135deg,${P.gold},${P.saffron})`
              : P.offWhite,
            border: `1.5px solid ${P.gold}`,
            borderRadius: 10,
            padding: '9px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: showTrans ? 'white' : P.warmBrown,
            fontWeight: 600,
            fontSize: 13,
            transition: 'all 0.3s',
          }}
        >
          <span>✦ Translation & Meaning</span>
          {showTrans ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {showTrans && <LangDropdown translations={shloka.translations} />}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button
            onClick={() => {
              setLiked((l) => !l);
              setLikeCount((c: any) => (liked ? c - 1 : c + 1));
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: liked ? '#FFE0C0' : P.offWhite,
              border: `1.5px solid ${liked ? P.saffron : '#E5D5B0'}`,
              borderRadius: 99,
              padding: '7px 14px',
              cursor: 'pointer',
              color: liked ? P.saffron : P.warmBrown,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <Heart
              size={14}
              fill={liked ? P.saffron : 'none'}
              color={liked ? P.saffron : P.warmBrown}
            />
            {likeCount}
          </button>
          <button
            onClick={() => setShowComments((s) => !s)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: P.offWhite,
              border: '1.5px solid #E5D5B0',
              borderRadius: 99,
              padding: '7px 14px',
              cursor: 'pointer',
              color: P.warmBrown,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <MessageCircle size={14} />
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </button>
        </div>
        {showComments && (
          <div style={{ marginTop: 14 }}>
            {comments.map((c: any, i: number) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 8,
                  marginBottom: 8,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg,${P.gold},${P.saffron})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {c.user[0]}
                </div>
                <div
                  style={{
                    background: P.offWhite,
                    borderRadius: '0 10px 10px 10px',
                    padding: '7px 12px',
                    flex: 1,
                  }}
                >
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: P.earthen }}
                  >
                    {c.user}
                  </span>
                  <p
                    style={{
                      margin: '2px 0 0',
                      fontSize: 13,
                      color: P.warmBrown,
                    }}
                  >
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && post()}
                placeholder="Share your reflection…"
                style={{
                  flex: 1,
                  border: `1.5px solid ${P.gold}`,
                  borderRadius: 99,
                  padding: '7px 14px',
                  outline: 'none',
                  fontSize: 13,
                  color: P.deepBrown,
                  background: P.offWhite,
                }}
              />
              <button
                onClick={post}
                style={{
                  background: `linear-gradient(135deg,${P.gold},${P.saffron})`,
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KandasPage({ selCat, setSelCat }: any) {
  const [selKanda, setSelKanda] = useState<any>(null);
  const [search, setSearch] = useState('');
  const filtered = shlokas.filter((s) => {
    const catOk = selCat === 'all' || s.category === selCat;
    const kandaOk = selKanda === null || s.kanda === selKanda;
    const q = search.toLowerCase();
    const searchOk =
      !q ||
      s.sanskrit.includes(q) ||
      s.transliteration.toLowerCase().includes(q) ||
      s.number.toLowerCase().includes(q) ||
      Object.values(s.translations).some((t: any) =>
        t.toLowerCase().includes(q)
      );
    return catOk && kandaOk && searchOk;
  });
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        minHeight: '80vh',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: `linear-gradient(180deg,${P.deepBrown},#4A2C10)`,
          padding: '20px 0',
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <div
          style={{
            padding: '0 14px 14px',
            borderBottom: '1px solid rgba(212,160,23,0.2)',
          }}
        >
          <h3
            style={{
              color: P.gold,
              margin: '0 0 10px',
              fontFamily: 'serif',
              fontSize: 14,
            }}
          >
            ✦ Twenty Kandas
          </h3>
          <button
            onClick={() => setSelKanda(null)}
            style={{
              width: '100%',
              background:
                selKanda === null ? `rgba(212,160,23,0.2)` : 'transparent',
              border:
                selKanda === null
                  ? `1px solid ${P.gold}`
                  : '1px solid transparent',
              borderRadius: 8,
              padding: '7px 10px',
              color: selKanda === null ? P.gold : 'rgba(255,240,200,0.6)',
              fontSize: 12,
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: selKanda === null ? 700 : 400,
            }}
          >
            All Kandas
          </button>
        </div>
        <div style={{ overflowY: 'auto' }}>
          {kandas.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelKanda(k.id)}
              style={{
                width: '100%',
                background:
                  selKanda === k.id
                    ? `linear-gradient(90deg,rgba(212,160,23,0.18),transparent)`
                    : 'transparent',
                border: 'none',
                borderLeft:
                  selKanda === k.id
                    ? `3px solid ${P.gold}`
                    : '3px solid transparent',
                padding: '10px 14px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  color: selKanda === k.id ? P.gold : 'rgba(255,240,200,0.75)',
                  fontWeight: selKanda === k.id ? 700 : 400,
                  fontSize: 13,
                }}
              >
                {k.name}
              </div>
              <div
                style={{
                  color: (themeColors as any)[k.theme] || P.mutedGold,
                  fontSize: 10,
                  marginTop: 2,
                }}
              >
                {k.theme}·{k.hymns} Hymns
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Main */}
      <div
        style={{ background: P.cream, overflowY: 'auto', maxHeight: '80vh' }}
      >
        {/* Search + filter bar */}
        <div
          style={{
            background: 'white',
            padding: '16px 20px',
            borderBottom: `1px solid ${P.lightSaffron}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 12,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: P.offWhite,
                border: `1.5px solid ${P.gold}`,
                borderRadius: 99,
                padding: '8px 14px',
              }}
            >
              <Search size={14} color={P.earthen} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search verses, keywords…"
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 13,
                  color: P.deepBrown,
                  width: '100%',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: P.earthen,
                fontSize: 12,
              }}
            >
              <Filter size={14} />
              <span>{filtered.length} hymns</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 4,
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelCat(c.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: selCat === c.id ? c.color : c.bg,
                  border: `1.5px solid ${
                    selCat === c.id ? c.color : 'transparent'
                  }`,
                  borderRadius: 99,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  color: selCat === c.id ? 'white' : c.color,
                  fontWeight: 600,
                  fontSize: 12,
                  transition: 'all 0.2s',
                }}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '24px 20px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🕉</div>
              <h3 style={{ color: P.warmBrown, fontFamily: 'serif' }}>
                No verses found
              </h3>
              <p style={{ color: P.earthen, fontSize: 14 }}>
                Try a different category or search term.
              </p>
            </div>
          ) : (
            filtered.map((s) => <ShlokCard key={s.id} shloka={s} />)
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage, setSelCat }: any) {
  return (
    <div>
      <div
        style={{
          background:
            'linear-gradient(160deg,#3B2008 0%,#5C3D1E 40%,#8B4513 70%,#D4A017 100%)',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 20% 50%,rgba(212,160,23,0.15) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,107,26,0.1) 0%,transparent 40%)',
          }}
        />
        <div style={{ fontSize: 52, marginBottom: 8 }}>🕉</div>
        <h1
          style={{
            color: P.gold,
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            fontFamily: 'serif',
            margin: '0 0 6px',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          AtharvaVāṇī
        </h1>
        <p
          style={{
            color: P.lightSaffron,
            fontSize: 15,
            margin: '0 0 6px',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
          }}
        >
          अथर्ववाणी
        </p>
        <p
          style={{
            color: 'rgba(255,240,200,0.85)',
            fontSize: 17,
            margin: '0 0 32px',
            maxWidth: 520,
          }}
        >
          Voice of the Ancient Seers — An interactive journey through the fourth
          Veda
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => {
              setSelCat('all');
              setPage('kandas');
            }}
            style={{
              background: `linear-gradient(135deg,${P.gold},${P.saffron})`,
              border: 'none',
              borderRadius: 99,
              padding: '13px 28px',
              color: 'white',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(212,160,23,0.4)',
            }}
          >
            Explore Kandas →
          </button>
          <button
            onClick={() => setPage('about')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(212,160,23,0.5)',
              borderRadius: 99,
              padding: '13px 28px',
              color: P.gold,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            About
          </button>
        </div>
      </div>
      {/* Category cards */}
      <div style={{ background: P.cream, padding: '40px 24px' }}>
        <h2
          style={{
            textAlign: 'center',
            color: P.deepBrown,
            fontFamily: 'serif',
            fontSize: 24,
            marginBottom: 24,
          }}
        >
          Explore by Theme
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
            gap: 14,
            maxWidth: 900,
            margin: '0 auto 40px',
          }}
        >
          {CATEGORIES.slice(1).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelCat(c.id);
                setPage('kandas');
              }}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '20px 16px',
                textAlign: 'center',
                border: `2px solid ${c.bg}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(60,32,8,0.07)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: c.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                  color: c.color,
                  transform: 'scale(1.2)',
                }}
              >
                {c.icon}
              </div>
              <div style={{ color: c.color, fontWeight: 700, fontSize: 13 }}>
                {c.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div
      style={{
        background: `linear-gradient(180deg,${P.cream} 0%,white 100%)`,
        padding: '48px 24px',
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(60,32,8,0.12)',
          border: `1px solid ${P.lightSaffron}`,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg,#3B2008,#5C3D1E,#D4A017)',
            height: 130,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              fontSize: 60,
              opacity: 0.1,
              color: 'white',
            }}
          >
            🕉
          </div>
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 10,
              fontSize: 30,
              opacity: 0.08,
              color: 'white',
            }}
          >
            🕉
          </div>
          <div style={{ position: 'absolute', bottom: -56, left: 28 }}>
            <div
              style={{
                width: 112,
                height: 112,
                borderRadius: '50%',
                border: `4px solid white`,
                overflow: 'hidden',
                boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                background: P.offWhite,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg,#D4A017,#FF6B1A)',
                  color: 'white',
                  fontSize: '36px',
                  fontFamily: 'serif',
                  fontWeight: 'bold',
                }}
              >
                RG
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '68px 32px 28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div>
              <h1
                style={{
                  color: P.deepBrown,
                  fontFamily: 'serif',
                  fontSize: 26,
                  margin: '0 0 4px',
                }}
              >
                R. Govinda Krishnan
              </h1>
              <p
                style={{
                  color: P.saffron,
                  fontWeight: 600,
                  fontSize: 14,
                  margin: 0,
                }}
              >
                IT Accounting Professional & Vedic Priest
              </p>
              <p style={{ color: P.earthen, fontSize: 12, margin: '4px 0 0' }}>
                📍 Hyderabad, Telangana, India
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Vedānta', 'Sanskrit', 'Vedic Rituals', 'Upanishads'].map(
                (t) => (
                  <span
                    key={t}
                    style={{
                      background: P.lightSaffron,
                      color: P.warmBrown,
                      borderRadius: 99,
                      padding: '3px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: `linear-gradient(135deg,${P.deepBrown},#5C3D1E)`,
          borderRadius: 20,
          padding: '28px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: 90,
            opacity: 0.05,
          }}
        >
          🕉
        </div>
        <h2
          style={{
            color: P.gold,
            fontFamily: 'serif',
            fontSize: 18,
            margin: '0 0 18px',
          }}
        >
          ✦ The Eternal Quest
        </h2>
        {[
          { q: 'Who am I?', icon: '👁', sub: 'The question of the Self' },
          { q: 'From where I am?', icon: '🌌', sub: 'The question of Origin' },
          { q: 'What am I?', icon: '🔥', sub: 'The question of Nature' },
          { q: 'For whom I am?', icon: '🙏', sub: 'The question of Purpose' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: i < 3 ? 12 : 0,
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 12,
              borderLeft: `3px solid ${P.gold}`,
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <div
                style={{
                  color: 'rgba(255,240,200,0.9)',
                  fontFamily: 'serif',
                  fontSize: 16,
                  fontStyle: 'italic',
                }}
              >
                {item.q}
              </div>
              <div
                style={{
                  color: 'rgba(212,160,23,0.6)',
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: 20,
          padding: '24px 28px',
          boxShadow: '0 4px 20px rgba(60,32,8,0.08)',
          border: `1px solid ${P.lightSaffron}`,
        }}
      >
        <h2
          style={{
            color: P.deepBrown,
            fontFamily: 'serif',
            fontSize: 18,
            margin: '0 0 14px',
          }}
        >
          About
        </h2>
        <p
          style={{
            color: P.warmBrown,
            lineHeight: 1.8,
            fontSize: 14,
            margin: '0 0 12px',
          }}
        >
          Govinda Krishnan walks a dual path — as an IT Accounting Professional,
          he brings analytical precision to the modern world; as a Vedic Priest,
          he serves as a living conduit for the ancient sacred traditions of the
          Vedas.
        </p>
        <p
          style={{
            color: P.warmBrown,
            lineHeight: 1.8,
            fontSize: 14,
            margin: '0 0 12px',
          }}
        >
          His spiritual journey is anchored in a deep, personal engagement with
          the Vedas and Upanishads — not merely as scripture, but as living
          wisdom to be breathed, practiced, and shared.
        </p>
        <p
          style={{
            color: P.warmBrown,
            lineHeight: 1.8,
            fontSize: 14,
            margin: 0,
          }}
        >
          AtharvaVāṇī is his gift to fellow seekers — a digital sanctuary where
          the Voice of the Ancient Seers may guide all who approach in sincerity
          and humility.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [selCat, setSelCat] = useState('all');

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={15} /> },
    { id: 'kandas', label: 'Kandas', icon: <BookOpen size={15} /> },
    { id: 'about', label: 'About', icon: <User size={15} /> },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',sans-serif",
        background: P.cream,
        minHeight: '100vh',
      }}
    >
      <nav
        style={{
          background: 'linear-gradient(90deg,#3B2008,#5C3D1E)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          position: 'sticky',
          top: 0,
          zIndex: 200,
          boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
          onClick={() => setPage('home')}
        >
          <span style={{ fontSize: 22 }}>🕉</span>
          <div>
            <div
              style={{
                color: P.gold,
                fontFamily: 'serif',
                fontSize: 17,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              AtharvaVāṇī
            </div>
            <div
              style={{
                color: 'rgba(212,160,23,0.55)',
                fontSize: 9,
                letterSpacing: '0.1em',
              }}
            >
              VOICE OF THE ANCIENT SEERS
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setPage(n.id);
                if (n.id === 'home') setSelCat('all');
              }}
              style={{
                background:
                  page === n.id
                    ? `linear-gradient(135deg,${P.gold},${P.saffron})`
                    : 'transparent',
                border: 'none',
                borderRadius: 99,
                padding: '7px 16px',
                color: page === n.id ? 'white' : 'rgba(255,240,200,0.8)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        {page === 'home' && (
          <HomePage setPage={setPage} setSelCat={setSelCat} />
        )}
        {page === 'kandas' && (
          <KandasPage selCat={selCat} setSelCat={setSelCat} />
        )}
        {page === 'about' && <AboutPage />}
      </main>
      <footer
        style={{
          background: P.deepBrown,
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 20, marginBottom: 4 }}>🕉</div>
        <p style={{ color: P.mutedGold, fontSize: 12, margin: 0 }}>
          AtharvaVāṇī · Voice of the Ancient Seers
        </p>
        <p
          style={{
            color: 'rgba(212,160,23,0.4)',
            fontSize: 10,
            margin: '3px 0 0',
          }}
        >
          Crafted with devotion by R. Govinda Krishnan
        </p>
      </footer>
    </div>
  );
}
