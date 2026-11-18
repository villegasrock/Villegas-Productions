import { useState } from 'react';
import { FolderOpen, Mic, Play, Pause, SkipBack, SkipForward, Scissors, Undo2, Redo2, Settings, Volume2, Download } from 'lucide-react';

const minutes = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30'];

function Waveform({ seed }: { seed: number }) {
  const bars = Array.from({ length: 170 }, (_, i) => {
    const wave = Math.abs(Math.sin((i + seed) * 0.32) * Math.cos(i * 0.07));
    return 8 + wave * 62;
  });
  return <div className="waveform">{bars.map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>;
}

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [projectName, setProjectName] = useState('Proyecto sin título');

  const openAudio = async () => {
    const file = await window.villegas?.openAudio();
    if (file) setProjectName(file.split(/[\\/]/).pop()?.replace(/\.[^.]+$/, '') ?? 'Audio importado');
  };

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand"><span className="mark">VP</span><strong>Villegas Productions</strong></div>
        <nav className="menu"><button>Archivo</button><button>Editar</button><button>Efectos</button><button>Ver</button><button>Ayuda</button></nav>
        <button className="icon-button"><Settings size={18}/></button>
      </header>

      <section className="toolbar">
        <button onClick={openAudio} className="primary"><FolderOpen size={17}/> Abrir</button>
        <button><Mic size={17}/> Grabar</button>
        <button className="square"><Undo2 size={17}/></button>
        <button className="square"><Redo2 size={17}/></button>
        <span className="divider"/>
        <button className="square"><Scissors size={17}/></button>
        <span className="project-name">{projectName}</span>
        <button className="primary export"><Download size={17}/> Exportar</button>
      </section>

      <section className="workspace">
        <aside className="files">
          <h3>Archivos</h3>
          <div className="file-card active"><span>01</span><div><strong>Audio principal</strong><small>Estéreo · 48 kHz</small></div></div>
          <div className="file-card"><span>02</span><div><strong>Voz</strong><small>Monó · 48 kHz</small></div></div>
        </aside>

        <div className="timeline">
          <div className="ruler">{minutes.map(t => <span key={t}>{t}</span>)}</div>
          <div className="playhead" />
          <div className="track">
            <div className="track-info"><button>M</button><button>S</button><Volume2 size={14}/></div>
            <div className="clip blue"><strong>Audio principal</strong><Waveform seed={1}/></div>
          </div>
          <div className="track">
            <div className="track-info"><button>M</button><button>S</button><Volume2 size={14}/></div>
            <div className="clip purple"><strong>Voz</strong><Waveform seed={9}/></div>
          </div>
          <div className="track empty"><div className="track-info"/><button className="add-track">+ Añadir pista</button></div>
        </div>
      </section>

      <footer className="transport">
        <button className="transport-button"><SkipBack size={18}/></button>
        <button className="transport-button play" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={20}/> : <Play size={20}/>}</button>
        <button className="transport-button"><SkipForward size={18}/></button>
        <div className="timecode">00:00:18:12</div>
        <div className="meter"><span/><span/><span/><span/><span/><span/></div>
      </footer>
    </main>
  );
}
