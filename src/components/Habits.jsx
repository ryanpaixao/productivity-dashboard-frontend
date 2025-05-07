import { useState, useEffect } from 'react';

export default function Habits() {
   const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
   const [habits, setHabits] = useState(savedHabits);
   const [newHabit, setNewHabit] = useState('');

   useEffect(() => {
      localStorage.setItem('habits', JSON.stringify(habits));
   }, [habits]);

   const addHabit = () => {
      if (newHabit.trim()) {
        setHabits([...habits, { id: Date.now(), name: newHabit, checked: false }]);
        setNewHabit('');
      }
   };

   const toggleHabit = (id) => {
      setHabits(habits.map(
        habit => habit.id === id
           ? { ...habit, checked: !habit.checked }
           : habit
      ));
   };

   const deleteHabit = (id) => {
      setHabits(habits.filter(habit => habit.id !== id));
   };

   return (
      <div>
        <h2>Habit Tracker</h2>
        <input
           type="text"
           value={newHabit}
           onChange={(e) => setNewHabit(e.target.value)}
           placeholder="Add a new habit"
        />
        <button onClick={addHabit}>Add Habit</button>
        <ul>
           {habits.map(habit => (
              <li key={habit.id}>
                <input
                   type="checkbox"
                   checked={habit.checked}
                   onChange={() => toggleHabit(habit.id)}
                />
                {habit.name}
                <button onClick={() => deleteHabit(habit.id)}>Delete</button>
              </li>
           ))}
        </ul>
      </div>
   );
}
