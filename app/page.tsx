'use client';

import { useState } from 'react';

const photos = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const tracks = [
  { name:'Dados', label:'LER O MUNDO', heading:'Transforme perguntas em gráficos.', info:'De uma tabela bruta a uma história que outra pessoa consegue entender.', units:['Organizar a fonte','Cruzar informações','Contar a história'], hue:'data' },
  { name:'Design', label:'CRIAR COM INTENÇÃO', heading:'Faça uma ideia caber na tela.', info:'Da primeira conversa a um protótipo navegável, tomando decisões visíveis.', units:['Ouvir e mapear','Prototipar','Testar a navegação'], hue:'design' },
  { name:'Código', label:'CONSTRUIR PARA A WEB', heading:'Dê vida a uma interface.', info:'Comece com a estrutura, estilize e implemente a primeira interação.', units:['Estruturar em HTML','Compor e adaptar','Implementar a interação'], hue:'code' },
];

function Mosaic() {
  return <div className="mosaic" aria-hidden="true">
    <div className="tile t1"><div><span/><span/><span/></div></div>
    <div className="tile t2"><div>m<span>.</span></div></div>
    <div className="tile t3"><div>✳</div></div>
    <div className="tile t4"><div><span/><span/><span/></div></div>
    <div className="tile t5"><div>+</div></div>
    <div className="tile t6"><div><span/><span/><span/></div></div>
  </div>;
}

export default function Page() {
  const [active,setActive]=useState(0);
  const [complete,setComplete]=useState<Record<string,number[]>>({});
  const [tempo,setTempo]=useState(15);
  const [shareFeedback,setShareFeedback]=useState('');
  const [showPlan,setShowPlan]=useState(false);
  const track=tracks[active];
  const checks=complete[track.name] ?? [];
  function toggle(index:number) {
    setComplete(previous=>{
      const current=previous[track.name]??[];
      return {...previous,[track.name]:current.includes(index)?current.filter(item=>item!==index):[...current,index]};
    });
  }
  const plan = [`Meu roteiro Mosaico · ${track.name} · ${tempo} min`,...track.units.map((unit,i)=>`${i+1}. ${unit} (${tempo/3} min)`),'Prévia de portfólio, sem matrícula.'].join('\n');
  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(plan);
      setShareFeedback('Roteiro copiado. Você escolhe onde colar.');
    } catch {
      setShowPlan(true);
      setShareFeedback('Cópia automática indisponível. O roteiro aparece abaixo para copiar manualmente.');
    }
  }
  return <>
    <a href="#conteudo" className="skip">Pular para o conteúdo</a>
    <header className="wrap"><a href="#inicio" className="logo">mosaico<span>.</span></a><a href="#trilhas">Explorar trilhas</a></header>
    <main id="conteudo" tabIndex={-1}>
      <section className="hero wrap" id="inicio">
        <div className="intro"><p className="eyebrow"><span aria-hidden="true"/> PROJETO CONCEITUAL · EDUCAÇÃO DIGITAL</p><h1>Aprenda por <em>peças.</em></h1><p className="lead">Em 15 minutos, você já tem um roteiro para começar em dados, design ou código. Escolha uma trilha e leve um plano de estudo que cabe no seu dia.</p><a href="#trilhas" className="button">Escolher minha trilha</a></div>
        <div className="hero-portrait"><img src={photos+'/hero.webp'} alt="Estudantes usando computadores em uma biblioteca" width="1200" height="900" fetchPriority="high"/><div className="portrait-caption"><span>ESTUDO EM PEQUENAS ETAPAS</span><span aria-hidden="true">✳</span></div></div>
      </section>
      <section id="trilhas" className="tracks">
        <div className="wrap">
          <div className="heading"><p className="eyebrow">IMAGINE SEU PERCURSO</p><h2>Três jeitos de começar.</h2><p>Escolha uma área e marque as etapas. É só uma prévia: o progresso vale nesta página.</p></div>
          <div className="tabs" role="group" aria-label="Trilhas disponíveis">{tracks.map((item,index)=><button key={item.name} aria-pressed={active===index} aria-controls="trilha-atual" onClick={()=>setActive(index)}>{item.name}</button>)}</div>
          <div className={`panel ${track.hue}`} id="trilha-atual" key={track.name}>
            <div><p className="eyebrow">{track.label}</p><h3>{track.heading}</h3><p>{track.info}</p></div>
            <div><p className="progress" aria-live="polite">{checks.length} de {track.units.length} etapas marcadas</p><progress max={track.units.length} value={checks.length} aria-label="Progresso demonstrativo" />{track.units.map((unit,index)=><label key={unit} className="check"><input type="checkbox" checked={checks.includes(index)} onChange={()=>toggle(index)} /><span>{unit}</span></label>)}</div>
          </div>
          <a className="button track-next" href="#planejador">Montar sessão de {track.name}</a>
        </div>
      </section>
      <section className="system wrap"><div><p className="eyebrow">UM MÉTODO EM TRÊS ATOS</p><h2>Saia com algo que você fez.</h2><p>O roteiro de cada área segue a mesma sequência. O que muda é a peça final: um gráfico, um protótipo ou uma interface.</p><dl><div><dt>Entenda</dt><dd>Comece pelo objetivo e veja um exemplo em contexto.</dd></div><div><dt>Experimente</dt><dd>Faça uma tarefa curta e compare sua solução.</dd></div><div><dt>Mostre</dt><dd>Organize a entrega para outra pessoa conseguir entender.</dd></div></dl></div><Mosaic /></section>
      <section className="planner" id="planejador" aria-labelledby="planner-title"><div className="wrap planner-grid"><div className="planner-copy"><p className="eyebrow">SEU TEMPO, SEU RITMO</p><h2 id="planner-title">Monte uma sessão.</h2><p>Escolha a duração e veja uma sugestão de como dividir o tempo. A sessão é apenas uma prévia e não cria uma matrícula.</p>
        <div className="tempo" role="group" aria-label="Duração da sessão">{[15,30,45].map(minutes=><button key={minutes} type="button" aria-pressed={tempo===minutes} aria-controls="tempo-result" onClick={()=>setTempo(minutes)}>{minutes} min</button>)}</div>
        <p id="tempo-result" aria-live="polite"><strong>{tempo} minutos:</strong> {tempo/3} min para entender, {tempo/3} min para experimentar e {tempo/3} min para registrar o resultado.</p><button className="button" type="button" onClick={copyPlan}>Copiar roteiro de {track.name}</button><p className="planner-status" role="status">{shareFeedback}</p>{showPlan && <label className="manual-plan">Roteiro para copiar<textarea readOnly rows={5} value={plan} onFocus={event=>event.currentTarget.select()}/></label>}</div>
        <img width="1100" height="733" src={photos+'/editorial.webp'} alt="Estudantes colaborando com materiais de estudo em uma mesa" loading="lazy"/>
      </div></section>
      <section className="deliverables"><div className="wrap"><p className="eyebrow">IDEIAS DE ENTREGAS</p><h2>Do exercício ao portfólio.</h2><div><article><strong>Dados</strong><p>Um mini-relatório com um gráfico e uma conclusão.</p></article><article><strong>Design</strong><p>Um protótipo navegável com pelo menos duas telas.</p></article><article><strong>Código</strong><p>Uma página responsiva com um estado interativo.</p></article></div></div></section>
    </main>
    <footer className="wrap"><b>mosaico.</b><p>Projeto conceitual de portfólio. Sem matrícula, cadastro ou coleta de dados.</p><a href="#inicio">Voltar ao início</a></footer>
  </>;
}
