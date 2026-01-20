import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabaseの接続設定（先日作成したもの）
const supabase = createClient('https://zgmqllufmqanixgwdjok.supabase.co', 'sb_publishable_vOgl-K0RTxyK9i0WJp7UwA_PlwVgESz');

export default function App() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [name, setName] = useState('');

  // データを読み込む関数
  const fetchWorkers = async () => {
    const { data } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
    if (data) setWorkers(data);
  };

  useEffect(() => { fetchWorkers(); }, []);

  // 登録ボタンを押した時の処理
  const handleSave = async () => {
    if (!name) return alert('名前を入れてください');
    await supabase.from('workers').insert([{ name_eng: name, status: '新規受付' }]);
    setName('');
    fetchWorkers();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#003366' }}>🇱🇦 HSDEC Management System</h1>
      <p>ラオス・ワーカー管理システム</p>
      
      <div style={{ margin: '20px 0' }}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="ワーカーの氏名（英語）" 
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSave} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#ed8936', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          登録
        </button>
      </div>

      <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <h3>最新の登録者</h3>
        <ul>
          {workers.map(w => (
            <li key={w.id}>{w.name_eng} <span style={{fontSize:'0.8em', color:'#888'}}>({w.status})</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
