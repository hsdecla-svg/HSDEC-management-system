import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://zgmqllufmqanixgwdjok.supabase.co', 'sb_publishable_vOgl-K0RTxyK9i0WJp7UwA_PlwVgESz');

export default function App() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [name, setName] = useState('');

  const fetchWorkers = async () => {
    const { data } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
    if (data) setWorkers(data);
  };
  useEffect(() => { fetchWorkers(); }, []);

  const handleSave = async () => {
    if (!name) return alert('名前を入れてください');
    await supabase.from('workers').insert([{ name_eng: name, status: '新規受付' }]);
    setName('');
    fetchWorkers();
  };

  return (
    <div style={{padding:'20px', fontFamily:'sans-serif'}}>
      <h1>Lao System (Global)</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' style={{padding:'10px', width:'200px'}} />
      <button onClick={handleSave} style={{padding:'10px', marginLeft:'5px'}}>登録</button>
      <hr />
      <ul>{workers.map(w => <li key={w.id}>{w.name_eng} - {w.status}</li>)}</ul>
    </div>
  );
}
