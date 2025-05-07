import { useState } from "react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";

const moods = [
  { id: 1, label: "Happy", icon: <FaSmile />, checked: false },
  { id: 2, label: "Neutral", icon: <FaMeh />, checked: false },
  { id: 3, label: "Sad", icon: <FaFrown />, checked: false },
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div>
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <button 
            key={mood.id}
            onClick={() => setSelectedMood(mood.label)}
            className={selectedMood === mood.label ? 'selected' : ''}
          >
            {mood.icon} {mood.label}
          </button>
        ))}
      </div>
    {selectedMood && <p>You're feeling <strong>{selectedMood}</strong> today.</p>}
    </div>
  );
}

