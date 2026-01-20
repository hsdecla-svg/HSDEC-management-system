import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabaseの設定
const supabase = createClient('https://zgmqllufmqanixgwdjok.supabase.co', 'sb_publishable_vOgl-K0RTxyK9i0WJp7UwA_PlwVgESz');

export default function App() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [name, setName] = useState('');

  // データ取得
  const fetchWorkers = async () => {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setWorkers(data);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  // 保存処理
  const handleSave = async () => {
    if (!name) return alert('名前を入力してください');
    const { error } = await supabase
      .from('workers')
      .insert([{ name_eng: name, status: '新規受付' }]);
    
    if (error) {
      alert('エラー: ' + error.message);
    } else {
      setName('');
      fetchWorkers();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a365d', borderBottom: '2px solid #ed8936', paddingBottom: '10px' }}>
        HSDEC System (Lao)
      </h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="ワーカーの名前を入力" 
          style={{ padding: '10px', flex: 1, borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSave}
          style={{ padding: '10px 20px', backgroundColor: '#ed8936', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          登録
        </button>
      </div>

      <div style={{ backgroundColor: '#f7fafc', padding: '15px', borderRadius: '10px' }}>
        <h3>登録済みリスト</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workers.map((w) => (
            <li key={w.id} style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
              <span>{w.name_eng}</span>
              <span style={{ color: '#718096', fontSize: '0.8em' }}>{w.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
