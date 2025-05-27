import React, { useState, useEffect } from 'react';
import {
  Send,
  Zap,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Bot,
  Sparkles,
  AlignLeft,
  Hash,
  PictureInPicture,
  KeyRound,
  ChevronDown,
  Copy,
  Settings2,
  History,
  Trash2,
  Eye,
  RefreshCw,
  HelpCircle,
  Mic2,
  ImagePlus,
  FileText,
} from 'lucide-react';

// Componente InfoTooltip
const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      <HelpCircle
        size={16}
        className="text-slate-400 hover:text-cyan-400 cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 text-xs text-slate-200 bg-slate-800 border border-slate-700 rounded-md shadow-lg -left-32 bottom-full mb-2">
          {text}
          <div className="absolute w-2 h-2 bg-slate-800 border-r border-b border-slate-700 transform rotate-45 -mb-1.5 left-1/2 -ml-1 bottom-0"></div>
        </div>
      )}
    </div>
  );
};

// Objeto com instruções detalhadas para cada tom de voz
const toneInstructions = {
  default:
    '\nInstrução de Tom de Voz: Mantenha um tom profissional, claro e engajador, adequado para o LinkedIn. O prompt de imagem deve refletir este tom geral.\n',
  didatico: `
Instrução de Tom de Voz: DIDÁTICO / EDUCATIVO
Características do Texto:
- Linguagem clara e acessível, explicando termos ou processos.
- Foco no "como funciona".
- Pode usar analogias ou metáforas. Ideal para iniciantes no tema.
- Exemplo: "Como o algoritmo do LinkedIn decide quem vai ver seu post? Quando você publica algo, o algoritmo testa com um grupo pequeno..."
- Dicas: Imagine que está ensinando para alguém que nunca ouviu falar do tema. Use frases curtas e exemplos cotidianos.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual claro, informativo, talvez com elementos gráficos que ajudem a explicar um conceito, mantendo uma estética profissional e limpa. Evite abstrações excessivas.
  `,
  analitico: `
Instrução de Tom de Voz: ANALÍTICO / CRÍTICO
Características do Texto:
- Traz questionamentos ou contrapontos. Compara diferentes visões.
- Estimula a reflexão sobre o conteúdo. Tom mais sóbrio e racional.
- Exemplo: "IA no LinkedIn: aliada ou ameaça à autenticidade? O artigo defende o uso massivo... Mas será que esse caminho não prejudica a originalidade?"
- Dicas: Traga um contraponto respeitoso. Baseie suas observações em argumentos. Finalize com uma pergunta reflexiva.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual que inspire pensamento crítico, talvez com elementos simbólicos ou justaposições. Estilo pode ser mais sério, conceitual, com iluminação que crie profundidade.
  `,
  inspiracional: `
Instrução de Tom de Voz: INSPIRACIONAL / MOTIVACIONAL
Características do Texto:
- Frases fortes, impactantes e positivas. Gatilhos de superação ou urgência.
- Gera conexão emocional. Pode conter uma "lição" ou chamada à ação.
- Exemplo: "O futuro não espera quem tem medo de se expor. Quem não compartilha ideias hoje corre o risco de ser invisível amanhã."
- Dicas: Use palavras que transmitam energia. Traga frases curtas com impacto emocional. Termine com encorajamento.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual edificante, com cores vibrantes, talvez cenas de superação, crescimento ou horizontes amplos. Iluminação brilhante e otimista.
  `,
  narrativo: `
Instrução de Tom de Voz: NARRATIVO / STORYTELLING
Características do Texto:
- Traz um personagem ou experiência real. Gera identificação e proximidade.
- Desenvolve uma "mini-história" com início, meio e fim. Pode conter vulnerabilidade.
- Exemplo: "Em 2020, eu achava que post viral era sorte. Comecei no LinkedIn sem estratégia... Foi só depois de aplicar um conceito simples que tudo mudou..."
- Dicas: Comece com uma data ou situação concreta. Mostre a transformação. Use frases no estilo "confissão".
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir uma cena que capture um momento chave da narrativa, com personagens expressivos e um ambiente que reforce a história. Estilo pode ser mais cinematográfico ou documental.
  `,
  pratico: `
Instrução de Tom de Voz: PRÁTICO / PASSO A PASSO
Características do Texto:
- Estrutura com tópicos ou numeração. Clareza e objetividade.
- Ideal para dicas, tutoriais, frameworks. Gera valor imediato.
- Exemplo: "3 passos para aumentar o alcance dos seus posts no LinkedIn: 1. Publique entre 8h e 10h... 2. Engaje... 3. Responda..."
- Dicas: Use bullet points ou emojis numerados. Vá direto ao ponto.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual organizado, talvez com infográficos estilizados, ícones representando etapas, ou uma cena de alguém aplicando as dicas. Clareza e funcionalidade são chave.
  `,
  provocador: `
Instrução de Tom de Voz: PROVOCADOR / DESAFIADOR
Características do Texto:
- Começa com uma pergunta instigante ou frase impactante. Quebra de expectativa ou "mito".
- Convida à reação, reflexão ou debate. Pode ter um tom ousado.
- Exemplo: "E se você estiver sabotando o seu alcance no LinkedIn... sem saber? A maioria não comenta nos próprios posts..."
- Dicas: Use perguntas desafiadoras. Exponha um erro comum. Finalize com um "puxão de orelha" elegante.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve ser instigante, talvez com visuais fortes, contrastantes ou que representem um dilema. Pode usar uma estética mais ousada ou dramática.
  `,
  resumo: `
Instrução de Tom de Voz: RESUMO / CURADORIA
Características do Texto:
- Conteúdo condensado de uma fonte. Lista com aprendizados, estatísticas ou pontos-chave.
- Tom informativo e objetivo. Ideal para leitores apressados.
- Exemplo: "Resumo do artigo 'Como criar conteúdo viral...': 📌 Posts com histórias... 📌 Títulos com perguntas..."
- Dicas: Use ícones ou estrutura de lista. Cite a fonte, se possível.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual limpo e direto, talvez como uma representação gráfica de informações chave, ou uma imagem simbólica que encapsule o tema principal do resumo.
  `,
  autoridade: `
Instrução de Tom de Voz: AUTORIDADE / ESPECIALISTA
Características do Texto:
- Tom seguro, técnico e assertivo. Mostra domínio do tema com linguagem de especialista.
- Usa termos específicos e visão estratégica. Ideal para atrair decisores e pares.
- Exemplo: "O artigo acerta em cheio ao destacar o papel dos micro-engajamentos. Como especialista em conteúdo B2B, vejo isso diariamente..."
- Dicas: Use expressões como "Como consultor...". Traga uma visão de bastidor. Foco em credibilidade.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve transmitir expertise e confiança. Pode ser um retrato profissional estilizado, uma cena de trabalho focada, ou uma representação abstrata de conhecimento e estratégia. Cores sóbrias e composição forte.
  `,
  conversacional: `
Instrução de Tom de Voz: CONVERSACIONAL / AMIGÁVEL
Características do Texto:
- Leve, informal, parece um papo de café. Pode usar gírias leves ou emojis.
- Gera identificação por tom humano. Ideal para postagens espontâneas.
- Exemplo: "Li um artigo massa hoje e queria compartilhar uma parada que me bateu forte... O autor disse que o algoritmo 'recompensa quem conversa'..."
- Dicas: Escreva como se estivesse mandando no WhatsApp. Use termos informais com autenticidade.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual acessível e amigável, talvez com pessoas em interação, um ambiente descontraído, ou ilustrações com um toque mais leve e pessoal.
  `,
  humor: `
Instrução de Tom de Voz: HUMOR / SARCÁSTICO (com cuidado)
Características do Texto:
- Ironia leve, brincadeiras com exageros. Usa humor para criticar ou destacar algo.
- Pode incluir memes, analogias engraçadas. Requer bom senso — cuidado com polêmicas.
- Exemplo: "Plano infalível para bombar no LinkedIn: ✅ Escreva como se tivesse descoberto a fórmula da água... Brincadeiras à parte..."
- Dicas: Use exageros para efeito cômico. Sempre volte ao conteúdo útil. Teste com o público certo.
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem pode ser mais criativo e inesperado, talvez com uma pitada de absurdo ou uma representação visual engraçada do tema, mas mantendo um nível de profissionalismo adequado ao LinkedIn.
  `,
  jornalistico: `
Instrução de Tom de Voz: JORNALÍSTICO / NOTICIOSO
Características do Texto:
- Título impactante, porém neutro. Começa com o fato mais importante (pirâmide invertida).
- Usa dados, datas, nomes e fontes (se possível). Linguagem formal, sem adjetivos excessivos.
- Foco na informação, não na opinião.
- Exemplo: "LinkedIn atualiza algoritmo e prioriza posts com interações rápidas, aponta estudo..."
- Dicas: Use frases curtas e claras. Priorize o "o quê, quem, quando, onde e por quê".
Características do Prompt de Imagem (Bloco 6):
- O prompt de imagem deve sugerir um visual objetivo e informativo, talvez com gráficos de dados estilizados, representações de notícias, ou uma cena que ilustre o fato principal de forma direta e profissional.
  `,
};

// Constante base do prompt.
const baseSpecializedPrompt = `Sua missão é criar uma postagem profissional para LinkedIn, otimizada para MÁXIMO engajamento e POTENCIAL VIRAL, aplicando TODAS as técnicas relevantes da pesquisa fornecida sobre "Estratégias de Escrita e Estrutura em Postagens Virais do LinkedIn". O usuário fornecerá apenas o [ASSUNTO CENTRAL DA POSTAGEM] ou um [LINK DE REFERÊNCIA] sobre o qual a postagem deve ser baseada.
[INSTRUCAO_LIMITE_CARACTERES]
[INSTRUCAO_VARIACAO]
[INSTRUCAO_GERAL_TOM_DE_VOZ]
Instruções Detalhadas para Geração da Postagem (A SEREM APLICADAS EM CADA POSTAGEM, COM BASE NA PESQUISA E NO TOM DE VOZ SOLICITADO):

Gancho Irresistível e Otimizado (Primeiras 1-3 Linhas - BLOCO 1):
Objetivo: Capturar atenção imediata e interromper a rolagem do feed, alinhado ao tom de voz.
1.  TÉCNICAS DE GANCHO OBRIGATÓRIAS (escolha e combine, adaptando ao tom):
    * Curiosidade e Urgência: Utilize "power words" (ex: "segredo", "exclusivo", "gratuito", "limitado", "novo", "finalmente").
    * Promessa de Solução/Insight Contrário: Formatos como "X dicas para...", "Como eu [resultado impactante]...", "O que ninguém te conta sobre...", "A verdade sobre...".
    * Inimigo Identificável: Aborde um problema universal ou um ponto de dor específico do público (ex: "Cansado de [problema comum]?").
    * Contraste Numérico e Drama Pessoal: Combine números impactantes com uma situação pessoal (ex: "Como perdi R$ X, mas ganhei Y em Z dias").
    * Perguntas Provocativas: Utilize perguntas que instiguem a dissonância cognitiva (ex: "Por que 90% dos profissionais cometem este erro...?").
2.  OTIMIZAÇÃO TÉCNICA OBRIGATÓRIA:
    * Palavras-Chave Estratégicas: As primeiras 1-3 linhas DEVEM conter palavras-chave relevantes para o assunto central para otimizar a indexação e relevância no LinkedIn.
    * Concisão e Impacto Visual: Mantenha as frases curtas e diretas, respeitando o limite de ~150 caracteres antes do "Ver mais". Use emojis (❗🔥💡🎯🚀) ESTRATEGICAMENTE para destacar visualmente e adicionar personalidade, sem exagero, e de acordo com o tom. NÃO use formatação de negrito com asteriscos.
    * Números Específicos: Se possível e relevante, inclua números específicos (ex: "aumentei em 300%", "5 etapas", "R$ 50.000") pois aumentam o potencial viral.
3.  FORMATAÇÃO CRUCIAL DO GANCHO: Utilize de 2 a 4 quebras de linha (parágrafos vazios) IMEDIATAMENTE após o gancho para criar espaço em branco e mistério, incentivando o clique em "Ver mais".

Storytelling Autêntico, APROFUNDADO e Emocional com Vulnerabilidade Controlada (Corpo do Texto - BLOCOS 2 e 3):
Objetivo: Gerar identificação emocional, humanizar o autor e oferecer valor, TUDO ALINHADO COM O TOM DE VOZ ESCOLHIDO.
1.  ESTRUTURA NARRATIVA "PROBLEMA > JORNADA > SOLUÇÃO" (adapte a profundidade e estilo ao tom):
    * Contexto (Problema/Desafio): Apresente um problema ou situação desafiadora.
    * Jornada (Ponto de Virada/Descoberta): Descreva o processo.
    * Solução/Aprendizado: Compartilhe as lições de forma clara e prática.
2.  ANÁLISE PROFUNDA E CONTEÚDO DENSO (SE APLICÁVEL, ESPECIALMENTE COM LINK DE REFERÊNCIA):
    * Se um [LINK DE REFERÊNCIA] for fornecido, TRATE-O COMO FONTE PRIMÁRIA. Extraia os principais argumentos, dados, insights. ANALISE e INTERPRETE as informações.
    * CURADORIA DE LISTAS (SE O LINK FOR UMA LISTA): Se o link contiver uma lista proeminente, faça uma CURADORIA de, no mínimo, 5-10 itens relevantes. Apresente-os de forma engajadora, incluindo links diretos se existirem.
3.  ELABORAÇÃO E DETALHAMENTO: Elabore os pontos com detalhes significativos, explicações claras e exemplos concretos, sempre refletindo o tom de voz.
4.  GATILHOS MENTAIS (use conforme o tom):
    * Prova Social e Autoridade.
    * Relatabilidade.

Formatação Otimizada para Mobile e Legibilidade (Em todo o texto):
Aplique consistentemente:
* Parágrafos EXTREMAMENTE curtos (1-2 linhas no máximo, idealmente 1 linha).
* Uso INTENSO de quebras de linha (espaços em branco entre parágrafos curtos).
* Listas numeradas ou com emojis (ex: ✅ Ponto 1, ➡️ Ponto 2) para quebrar a densidade textual e facilitar a leitura rápida.
* Emojis com moderação e ESTRATEGICAMENTE para adicionar personalidade, ênfase sutil e apelo visual, alinhados ao tom. **NÃO use formatação de negrito com asteriscos em NENHUMA PARTE DO TEXTO.**

Valor Acionável (Se Aplicável):
Combine a narrativa e análise com dicas práticas, passos acionáveis ou insights que o leitor possa aplicar imediatamente.

Finalização Impactante, Call-to-Action (CTA) Claro e Créditos (Condicional) (BLOCO 4):
1.  REFLEXÃO FINAL: Reserve a última frase para uma reflexão profunda, alinhada ao tom.
2.  CALL TO ACTION (CTA) ESPECÍFICO: Faça uma pergunta direta para incentivar comentários ricos e discussão, adaptada ao tom.
3.  CRÉDITOS (CONDICIONAL): Se o [LINK DE REFERÊNCIA] fornecido pelo usuário for uma URL, adicione:
    \n\n--- \nFonte de inspiração/referência para esta postagem: [O LINK EXATO QUE O USUÁRIO FORNECEU]

Hashtags Estratégicas (BLOCO 5):
Sugira de 3 a 5 hashtags relevantes.

Sugestão de Mídia Visual e Prompt de Imagem (BLOCO 6):
1.  SUGESTÃO DE MÍDIA: Com base no conteúdo e no TOM DE VOZ, sugira o tipo de mídia visual mais impactante.
2.  JUSTIFICATIVA: Justifique brevemente.
3.  PROMPT DE IMAGEM ALINHADO AO TOM[INSTRUCAO_TEXTO_IMAGEM]: Crie um PROMPT DETALHADO para geração de imagem. Este prompt deve:
    * Ser baseado na justificativa e no conteúdo geral da postagem.
    * Ter um tom e estilo artístico que REFLITAM O TOM DE VOZ GERAL DA POSTAGEM (conforme definido na "Instrução de Tom de Voz" no início deste prompt). Por exemplo, se o tom é "Didático", a imagem deve ser clara e informativa; se "Inspiracional", vibrante e edificante; se "Analítico", conceitual e instigante.
    [DETALHE_TEXTO_IMAGEM_PROMPT]
    * Ser específico.

FORMATO DE SAÍDA OBRIGATÓRIO (Dividido em Blocos para evitar cortes):
É CRUCIAL que você siga este formato de blocos EXATAMENTE como especificado, incluindo os prefixos "BLOCO X:" com seus respectivos títulos.
Você DEVE entregar o rascunho da postagem dividido nos seguintes blocos, sem exceção:
BLOCO 1: GANCHO MAGNÉTICO (PRIMEIRAS 1-3 LINHAS + ESPAÇAMENTO ESTRATÉGICO)
[Texto do Bloco 1, alinhado ao tom.]
BLOCO 2: DESENVOLVIMENTO DA HISTÓRIA / CONTEÚDO PRINCIPAL (PARTE 1)
[Texto do Bloco 2, alinhado ao tom.]
BLOCO 3: DESENVOLVIMENTO DA HISTÓRIA / CONTEÚDO PRINCIPAL (PARTE 2 - se necessário, ou continuação do valor)
[Texto do Bloco 3, alinhado ao tom. **ENFATIZE: NÃO use formatação de negrito com asteriscos nesta seção.**]
BLOCO 4: FINALIZAÇÃO IMPACTANTE E CALL TO ACTION (CTA)
[Texto do Bloco 4, alinhado ao tom.]
BLOCO 5: SUGESTÃO DE HASHTAGS
[Hashtags]
BLOCO 6: SUGESTÃO DE MÍDIA VISUAL E PROMPT DE IMAGEM
Tipo de Mídia Sugerida: [Imagem/Vídeo Curto/Carrossel]
Justificativa: [Breve explicação]
Prompt para Imagem (Alinhado ao Tom[PLACEHOLDER_TITULO_TEXTO_IMAGEM]): [Seu prompt detalhado aqui, refletindo o tom geral e incluindo instrução para texto na imagem, se solicitado.]

Agora, por favor, gere a postagem para LinkedIn com base no seguinte fornecido pelo usuário:
`;

const BlockDisplay = ({ blockId, title, content, icon: IconComponent, onContentChange, children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = React.useRef(null);

  const handleTextChange = (e) => {
    onContentChange(blockId, e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

  let renderableContent = content;
  let isStringForTextarea = typeof content === 'string';

  if (!isStringForTextarea && content !== null && content !== undefined && typeof content !== 'number') {
    // Se não for string, null, undefined ou número, é um tipo inesperado.
    renderableContent = `[Conteúdo inválido para o bloco ${blockId}. Tipo: ${typeof content}]`;
    console.warn(
      `BlockDisplay (${blockId}): Conteúdo não é string, null, undefined ou número. Tipo: ${typeof content}`,
      content,
    );
    isStringForTextarea = false; // Garante que não tentará renderizar em textarea
  }

  return (
    <div
      className={`bg-slate-800/50 p-5 rounded-lg shadow-xl border backdrop-blur-sm transition-all duration-300 ${
        isFocused ? 'border-cyan-500 shadow-cyan-500/30' : 'border-slate-700 hover:border-cyan-500/70'
      }`}
    >
      <div className="flex items-center text-cyan-400 mb-3">
        {IconComponent && <IconComponent className="w-6 h-6 mr-3" />}
        <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
      </div>
      {isStringForTextarea ? (
        <textarea
          ref={textAreaRef}
          id={`textarea-${blockId}`}
          value={renderableContent}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full min-h-[100px] p-4 bg-slate-900/70 text-slate-300 text-sm leading-relaxed rounded-md border-none focus:ring-0 focus:outline-none resize-none"
          placeholder="Conteúdo do bloco..."
          rows="3"
        />
      ) : (
        <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed bg-slate-900/70 p-4 rounded-md">
          {renderableContent}
        </pre>
      )}
      {children}
    </div>
  );
};

const Modal = ({ title, message, type, onClose }) => {
  if (!message) return null;

  const IconComponent = type === 'error' ? AlertTriangle : CheckCircle;
  const titleColor = type === 'error' ? 'text-red-400' : 'text-green-400';
  const buttonColor = type === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
        <div className="flex items-center mb-4">
          <IconComponent className={`w-8 h-8 mr-3 ${titleColor}`} />
          <h3 className={`text-2xl font-bold ${titleColor}`}>{title}</h3>
        </div>
        <p className="text-slate-300 mb-6 text-center">{message}</p>
        <button
          onClick={onClose}
          className={`w-full ${buttonColor} text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isGeneratingVariation, setIsGeneratingVariation] = useState(false);
  const [generatedBlocks, setGeneratedBlocks] = useState({});
  const [modal, setModal] = useState({ title: '', message: '', type: '', visible: false });

  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const [generateImagePromptWithText, setGenerateImagePromptWithText] = useState(true);
  const [totalCharacterLimit, setTotalCharacterLimit] = useState(1200);
  const [selectedTone, setSelectedTone] = useState('default');

  const [generationHistory, setGenerationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const loadedHistory = localStorage.getItem('linkedinGenerationHistory');
      if (loadedHistory) {
        const parsedHistory = JSON.parse(loadedHistory);
        if (Array.isArray(parsedHistory)) {
          // Validar cada item do array
          const validHistory = parsedHistory.filter(
            (item) => item && typeof item === 'object' && item.id && item.userInput && item.timestamp,
          );
          setGenerationHistory(validHistory);
        } else {
          console.warn('Histórico do localStorage não é um array, limpando.');
          localStorage.removeItem('linkedinGenerationHistory');
        }
      }
    } catch (e) {
      console.error('Erro ao parsear histórico do localStorage:', e);
      localStorage.removeItem('linkedinGenerationHistory');
    }
  }, []);

  useEffect(() => {
    if (generationHistory.length > 0 || localStorage.getItem('linkedinGenerationHistory') !== null) {
      localStorage.setItem('linkedinGenerationHistory', JSON.stringify(generationHistory));
    }
  }, [generationHistory]);

  const handleBlockContentChange = (blockId, newContent) => {
    // Garante que newContent seja string antes de atualizar o estado
    const contentToSet = typeof newContent === 'string' ? newContent : String(newContent || '');
    if (typeof newContent !== 'string') {
      console.warn(
        `handleBlockContentChange: newContent para ${blockId} não era string. Convertido para: "${contentToSet}"`,
      );
    }
    setGeneratedBlocks((prevBlocks) => ({
      ...prevBlocks,
      [blockId]: contentToSet,
    }));
  };

  const availableModels = [{ id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' }];

  const toneOptions = [
    { id: 'default', name: 'Padrão Profissional' },
    { id: 'didatico', name: '🎓 Didático / Educativo' },
    { id: 'analitico', name: '🧠 Analítico / Crítico' },
    { id: 'inspiracional', name: '🚀 Inspiracional / Motivacional' },
    { id: 'narrativo', name: '📖 Narrativo / Storytelling' },
    { id: 'pratico', name: '🛠️ Prático / Passo a Passo' },
    { id: 'provocador', name: '⚡ Provocador / Desafiador' },
    { id: 'resumo', name: '🧾 Resumo / Curadoria' },
    { id: 'autoridade', name: '🧑‍💼 Autoridade / Especialista' },
    { id: 'conversacional', name: '👋 Conversacional / Amigável' },
    { id: 'humor', name: '😏 Humor / Sarcástico (cuidado)' },
    { id: 'jornalistico', name: '📰 Jornalístico / Noticioso' },
  ];

  const blockDefinitions = [
    {
      id: 'bloco1',
      title: 'GANCHO MAGNÉTICO',
      markerTitle: 'GANCHO MAGNÉTICO (PRIMEIRAS 1-3 LINHAS + ESPAÇAMENTO ESTRATÉGICO)',
      icon: Sparkles,
    },
    {
      id: 'bloco2',
      title: 'DESENVOLVIMENTO (PARTE 1)',
      markerTitle: 'DESENVOLVIMENTO DA HISTÓRIA / CONTEÚDO PRINCIPAL (PARTE 1)',
      icon: AlignLeft,
    },
    {
      id: 'bloco3',
      title: 'DESENVOLVIMENTO (PARTE 2)',
      markerTitle:
        'DESENVOLVIMENTO DA HISTÓRIA / CONTEÚDO PRINCIPAL (PARTE 2 - se necessário, ou continuação do valor)',
      icon: AlignLeft,
    },
    {
      id: 'bloco4',
      title: 'FINALIZAÇÃO E CTA',
      markerTitle: 'FINALIZAÇÃO IMPACTANTE E CALL TO ACTION (CTA)',
      icon: Send,
    },
    { id: 'bloco5', title: 'HASHTAGS', markerTitle: 'SUGESTÃO DE HASHTAGS', icon: Hash },
    {
      id: 'bloco6',
      title: 'SUGESTÃO DE MÍDIA E PROMPT',
      markerTitle: 'SUGESTÃO DE MÍDIA VISUAL E PROMPT DE IMAGEM',
      icon: PictureInPicture,
    },
  ];

  const showModal = (title, message, type = 'info') => {
    setModal({ title, message, type, visible: true });
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  const clearOutputs = () => {
    setGeneratedBlocks({});
    setCopySuccess('');
  };

  const parseAndSetResponse = (responseText) => {
    if (typeof responseText !== 'string') {
      console.error('parseAndSetResponse: responseText não é uma string!', responseText);
      responseText = String(responseText || '');
    }

    const newBlocks = {};
    const foundMarkers = [];

    for (let i = 0; i < blockDefinitions.length; i++) {
      const blockDef = blockDefinitions[i];
      const markerRegex = new RegExp(
        `BLOCO ${i + 1}: ${blockDef.markerTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
        'i',
      );
      const match = responseText.match(markerRegex);
      if (match && typeof match.index === 'number') {
        foundMarkers.push({
          blockDefId: blockDef.id,
          markerTitle: blockDef.markerTitle,
          markerText: match[0],
          startIndex: match.index,
          contentStartIndex: match.index + match[0].length,
          originalOrderIndex: i,
        });
      }
    }

    foundMarkers.sort((a, b) => a.startIndex - b.startIndex);

    for (let i = 0; i < blockDefinitions.length; i++) {
      const currentBlockDef = blockDefinitions[i];
      const correspondingFoundMarkerDetails = foundMarkers.find((fm) => fm.originalOrderIndex === i);
      let contentForBlock = `Marcador para "${currentBlockDef.markerTitle}" não encontrado.`;

      if (correspondingFoundMarkerDetails) {
        const sortedIndexOfCurrentMarker = foundMarkers.findIndex(
          (fm) => fm.startIndex === correspondingFoundMarkerDetails.startIndex,
        );
        let endOfBlockContent = responseText.length;
        if (sortedIndexOfCurrentMarker !== -1 && sortedIndexOfCurrentMarker < foundMarkers.length - 1) {
          const nextFoundMarkerInSortedList = foundMarkers[sortedIndexOfCurrentMarker + 1];
          endOfBlockContent = nextFoundMarkerInSortedList.startIndex;
        }
        contentForBlock = responseText
          .substring(correspondingFoundMarkerDetails.contentStartIndex, endOfBlockContent)
          .trim();
      } else {
        console.warn(
          `Marcador para o Bloco ${i + 1} (${currentBlockDef.markerTitle}) não foi encontrado no texto da IA.`,
        );
      }

      // Realizar limpezas no conteúdo do bloco
      contentForBlock = contentForBlock
        .replace(/\[Aplique TODAS as técnicas de Gancho Irresistível e Otimizado aqui.*?\]/gi, '')
        .trim();
      contentForBlock = contentForBlock
        .replace(/\[Comece o Storytelling "Problema > Jornada > Solução" aqui.*?\]/gi, '')
        .trim();
      contentForBlock = contentForBlock.replace(/\[Continue o desenvolvimento denso e elaborado.*?\]/gi, '').trim();
      contentForBlock = contentForBlock
        .replace(/\[Crie a reflexão final, o CTA específico e, se aplicável, a linha de crédito.*?\]/gi, '')
        .trim();
      contentForBlock = contentForBlock
        .replace(/\[Sugira as hashtags seguindo a estratégia detalhada\.\]/gi, '')
        .trim();
      contentForBlock = contentForBlock.replace(/\[Texto do Bloco \d, alinhado ao tom\.\]/gi, '').trim();

      if (currentBlockDef.id === 'bloco6') {
        contentForBlock = contentForBlock.replace(/Tipo de Mídia Sugerida: \[.*?\]/gi, '').trim();
        contentForBlock = contentForBlock.replace(/Justificativa: \[.*?\]/gi, '').trim();
        contentForBlock = contentForBlock
          .replace(/Prompt para Imagem \(Estilo Profissional\/Artístico, com Texto Integrado\): \[.*?\]/gi, '')
          .trim();
        contentForBlock = contentForBlock
          .replace(/Prompt para Imagem \(Estilo Profissional\/Artístico\): \[.*?\]/gi, '')
          .trim();
        contentForBlock = contentForBlock.replace(/Prompt para Imagem \(Alinhado ao Tom.*?\[.*?\]/gi, '').trim();
        contentForBlock = contentForBlock
          .replace(/\[Seu prompt detalhado aqui, seguindo as novas diretrizes de estilo.*?\]/gi, '')
          .trim();
      }

      // Garantir que o conteúdo do bloco seja sempre uma string
      if (typeof contentForBlock !== 'string') {
        console.error(
          `parseAndSetResponse: contentForBlock para ${
            currentBlockDef.id
          } NÃO é string! Tipo: ${typeof contentForBlock}. Convertendo.`,
        );
        contentForBlock = String(contentForBlock || ''); // Força para string
      }
      newBlocks[currentBlockDef.id] = contentForBlock;
    }
    setGeneratedBlocks(newBlocks);

    const newHistoryEntry = {
      id: Date.now(),
      userInput: userInput,
      generatedBlocks: newBlocks,
      selectedModel: selectedModel,
      timestamp: new Date().toISOString(),
      generateImagePromptWithText: generateImagePromptWithText,
      totalCharacterLimit: totalCharacterLimit,
      selectedTone: selectedTone,
    };
    setGenerationHistory((prevHistory) => [newHistoryEntry, ...prevHistory.slice(0, 19)]);
  };

  const callApiForTextGeneration = async (isVariation = false) => {
    if (!userInput.trim()) {
      showModal('Entrada Inválida', 'Por favor, insira um assunto ou link de referência.', 'error');
      return false;
    }

    const userProvidedApiKey = apiKey.trim();
    if (!userProvidedApiKey) {
      showModal('Chave de API Necessária', 'Por favor, insira sua chave de API para gerar o conteúdo.', 'error');
      return false;
    }

    if (!isVariation) {
      clearOutputs();
    }
    setIsLoadingText(true);
    if (isVariation) setIsGeneratingVariation(true);

    let finalPrompt = baseSpecializedPrompt;

    const toneInstruction = toneInstructions[selectedTone] || toneInstructions.default;
    finalPrompt = finalPrompt.replace('[INSTRUCAO_GERAL_TOM_DE_VOZ]', toneInstruction);

    const charLimitInstruction = `\nInstrução Adicional de Comprimento: Tente manter o comprimento total do conteúdo dos Blocos 1 a 5 em aproximadamente ${totalCharacterLimit} caracteres. Esta é uma diretriz, a qualidade e completude do conteúdo são prioritárias.\n`;
    finalPrompt = finalPrompt.replace('[INSTRUCAO_LIMITE_CARACTERES]', charLimitInstruction);

    if (isVariation) {
      finalPrompt = finalPrompt.replace(
        '[INSTRUCAO_VARIACAO]',
        '\nInstrução Adicional de Variação: Por favor, gere uma variação criativa e distinta da postagem anterior sobre este mesmo tema, explorando novos ângulos, exemplos ou uma estrutura narrativa diferente. Evite repetir frases ou ideias da geração anterior, se possível.\n',
      );
    } else {
      finalPrompt = finalPrompt.replace('[INSTRUCAO_VARIACAO]', '');
    }

    if (generateImagePromptWithText) {
      finalPrompt = finalPrompt.replace('[INSTRUCAO_TEXTO_IMAGEM]', ' COM TEXTO INTEGRADO');
      finalPrompt = finalPrompt.replace(
        '[DETALHE_TEXTO_IMAGEM_PROMPT]',
        `    * **Incluir uma instrução para que a imagem contenha um elemento textual (ex: uma sobreposição de texto elegante, um elemento gráfico com texto, texto integrado à cena de forma sutil) com uma frase curta e impactante que remeta diretamente ao assunto principal da postagem.** A frase deve ser concisa, legível e complementar a mensagem visual de forma profissional.`,
      );
      finalPrompt = finalPrompt.replace(
        '[EXEMPLO_TEXTO_IMAGEM_PROMPT]',
        `A imagem deve incluir a frase '[FRASE CURTA RELACIONADA AO POST]' integrada de forma elegante e legível. `,
      );
      finalPrompt = finalPrompt.replace('[PLACEHOLDER_TITULO_TEXTO_IMAGEM]', ', com Texto Integrado');
    } else {
      finalPrompt = finalPrompt.replace('[INSTRUCAO_TEXTO_IMAGEM]', '');
      finalPrompt = finalPrompt.replace(
        '[DETALHE_TEXTO_IMAGEM_PROMPT]',
        `    * A imagem NÃO deve conter nenhum texto sobreposto ou integrado.`,
      );
      finalPrompt = finalPrompt.replace('[EXEMPLO_TEXTO_IMAGEM_PROMPT]', '');
      finalPrompt = finalPrompt.replace('[PLACEHOLDER_TITULO_TEXTO_IMAGEM]', '');
    }

    const fullPromptForText = finalPrompt + userInput;
    let chatHistory = [{ role: 'user', parts: [{ text: fullPromptForText }] }];
    const payloadText = { contents: chatHistory };
    const apiKeyToUse = userProvidedApiKey;
    const apiUrlText = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKeyToUse}`;

    try {
      const textApiResponse = await fetch(apiUrlText, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadText),
      });

      if (!textApiResponse.ok) {
        let errorText = await textApiResponse.text();
        let errorDetails;
        if (textApiResponse.status === 401 || textApiResponse.status === 403) {
          errorDetails = `Erro de Autenticação/Permissão (${
            textApiResponse.status
          }). Verifique se sua chave de API está correta e tem permissão para usar o modelo ${selectedModel}. Detalhes: ${
            errorText || 'Resposta vazia da API.'
          }`;
        } else if (textApiResponse.status === 400) {
          errorDetails = `Erro na requisição (400). Verifique o formato da sua chave de API ou os parâmetros. Detalhes: ${
            errorText || 'Resposta vazia da API.'
          }`;
        } else if (errorText && errorText.trim() !== '') {
          try {
            const errorData = JSON.parse(errorText);
            errorDetails = errorData?.error?.message || errorText;
          } catch (e) {
            errorDetails = errorText;
          }
        } else {
          errorDetails = `A API de texto retornou o status ${textApiResponse.status} (${textApiResponse.statusText}) com uma resposta vazia.`;
        }
        console.error('Text API Error Response Text:', errorText);
        throw new Error(
          `Erro da API (texto): ${textApiResponse.status} ${textApiResponse.statusText}. Detalhes: ${errorDetails}`,
        );
      }

      const responseBodyText = await textApiResponse.text();
      if (!responseBodyText) {
        console.error('Text API response body is empty.');
        throw new Error('Resposta da API de texto está vazia.');
      }

      let resultText;
      try {
        resultText = JSON.parse(responseBodyText);
      } catch (e) {
        console.error('Failed to parse Text API response as JSON:', responseBodyText);
        throw new Error(
          `Falha ao analisar a resposta da API de texto: ${e.message}. Resposta recebida: ${responseBodyText.substring(
            0,
            100,
          )}...`,
        );
      }

      if (resultText.candidates && resultText.candidates[0]?.content?.parts?.[0]?.text) {
        const generatedText = resultText.candidates[0].content.parts[0].text;
        parseAndSetResponse(generatedText);
        return true;
      } else {
        console.error('Resposta da API de texto inesperada (sem conteúdo válido):', resultText);
        throw new Error(
          'Não foi possível obter o conteúdo de texto gerado da API. A estrutura da resposta pode estar incorreta.',
        );
      }
    } catch (error) {
      console.error('Erro ao gerar postagem de texto:', error);
      showModal('Erro na Geração', `Ocorreu um erro ao gerar o texto: ${error.message}`, 'error');
      return false;
    } finally {
      setIsLoadingText(false);
      if (isVariation) setIsGeneratingVariation(false);
    }
  };

  const handleGenerate = () => {
    callApiForTextGeneration(false);
  };

  const handleGenerateVariation = () => {
    if (!userInput || Object.keys(generatedBlocks).length === 0) {
      showModal(
        'Gere um Conteúdo Primeiro',
        'Você precisa gerar um conteúdo inicial antes de solicitar uma variação.',
        'error',
      );
      return;
    }
    callApiForTextGeneration(true);
  };

  const handleCopyToClipboard = async () => {
    const blocksToCopy = ['bloco1', 'bloco2', 'bloco3', 'bloco4', 'bloco5'];
    let fullPostText = '';

    blocksToCopy.forEach((blockId) => {
      const blockContent = generatedBlocks[blockId];
      const markerNotFoundMessage = `Marcador para "${
        blockDefinitions.find((b) => b.id === blockId)?.markerTitle
      }" não encontrado.`;
      if (blockContent && blockContent !== markerNotFoundMessage) {
        fullPostText += blockContent + '\n\n';
      }
    });

    fullPostText = fullPostText.trim();

    if (!fullPostText) {
      setCopySuccess('Nenhum conteúdo para copiar.');
      setTimeout(() => setCopySuccess(''), 3000);
      return;
    }

    try {
      // Tentativa com método antigo primeiro, que é mais compatível
      const textArea = document.createElement('textarea');
      textArea.value = fullPostText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      let successful = false;

      try {
        // Usar o método antigo primeiro
        successful = document.execCommand('copy');
        if (successful) {
          setCopySuccess('Conteúdo copiado para a área de transferência!');
        } else {
          // Se o método antigo falhar, tentar a API moderna
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(fullPostText);
            setCopySuccess('Conteúdo copiado para a área de transferência!');
            successful = true;
          }
        }
      } catch (clipboardError) {
        console.warn('Erro ao usar clipboard API, tentando método alternativo:', clipboardError);
        // Se ambos falharem, sugerir cópia manual
        if (!successful) {
          setCopySuccess('Não foi possível copiar automaticamente. Por favor, selecione o texto e use Ctrl+C.');
          textArea.style.position = 'static';
          textArea.style.left = 'auto';
          textArea.style.width = '100%';
          textArea.style.height = '200px';
          textArea.style.margin = '10px 0';
          textArea.style.padding = '10px';
          textArea.style.backgroundColor = '#1e293b';
          textArea.style.color = '#e2e8f0';
          textArea.style.border = '1px solid #475569';
          textArea.style.borderRadius = '6px';
          textArea.style.zIndex = '1000';
          // Não remover o textArea se precisar de cópia manual
          return;
        }
      }

      // Remover o textArea apenas se a cópia foi bem-sucedida
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Falha geral ao copiar para a área de transferência:', err);
      setCopySuccess('Erro ao copiar: ' + err.message);
    }

    setTimeout(() => setCopySuccess(''), 3000);
  };

  const loadHistoryItem = (item) => {
    if (!item || typeof item !== 'object') {
      console.error('loadHistoryItem: item inválido', item);
      showModal('Erro', 'Item do histórico inválido ou corrompido.', 'error');
      return;
    }

    setUserInput(item.userInput || '');

    // Garantir que os blocos carregados do histórico sejam strings
    const blocksFromHistory = {};
    for (const key in item.generatedBlocks) {
      if (typeof item.generatedBlocks[key] !== 'string') {
        console.warn(`loadHistoryItem: item.generatedBlocks['${key}'] não era string. Convertendo.`);
        blocksFromHistory[key] = String(item.generatedBlocks[key] || '');
      } else {
        blocksFromHistory[key] = item.generatedBlocks[key];
      }
    }
    setGeneratedBlocks(blocksFromHistory);

    // Verificar e definir as configurações com valores padrão se necessário
    setSelectedModel(item.selectedModel || 'gemini-2.0-flash');
    setGenerateImagePromptWithText(
      item.generateImagePromptWithText !== undefined ? item.generateImagePromptWithText : true,
    );
    setTotalCharacterLimit(item.totalCharacterLimit || 1200);
    setSelectedTone(item.selectedTone || 'default');

    setShowHistory(false);
    window.scrollTo(0, 0);
    showModal('Conteúdo Carregado', 'A postagem do histórico foi carregada nos campos acima.', 'success');
  };

  const deleteHistoryItem = (itemId) => {
    const updatedHistory = generationHistory.filter((item) => item.id !== itemId);
    setGenerationHistory(updatedHistory);
  };

  const clearAllHistory = () => {
    if (
      window.confirm('Tem certeza que deseja limpar todo o histórico de gerações? Esta ação não pode ser desfeita.')
    ) {
      setGenerationHistory([]);
      showModal('Histórico Limpo', 'Todo o histórico de gerações foi removido.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col items-center selection:bg-cyan-500 selection:text-slate-900">
      {modal.visible && <Modal title={modal.title} message={modal.message} type={modal.type} onClose={closeModal} />}

      <div className="w-full max-w-4xl bg-slate-800/70 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700/50">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-3">
            <Bot className="w-12 h-12 text-cyan-400 mr-3 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              LinkViral Pro Assistant
            </h1>
          </div>
          <p className="text-slate-400 text-sm sm:text-base">
            Insira o tema ou link para gerar uma postagem otimizada para o LinkedIn!
          </p>
        </header>

        <main>
          {/* Seção de Configuração da API */}
          <div className="mb-6 p-4 border border-slate-700 rounded-lg bg-slate-800/30">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
              <KeyRound className="w-6 h-6 mr-2" /> Configuração da API
              <InfoTooltip text="Sua chave de API é enviada diretamente do seu navegador para a API do Google e não é armazenada permanentemente por esta aplicação (exceto no histórico local do seu navegador, se você salvar uma geração). Trate sua chave com cuidado." />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="modelSelect" className="block text-sm font-medium text-slate-300 mb-1">
                  Selecionar Modelo de IA:
                </label>
                <div className="relative">
                  <select
                    id="modelSelect"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full appearance-none p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 transition-all duration-300"
                  >
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="apiKeyInput" className="block text-sm font-medium text-slate-300 mb-1">
                  Sua Chave de API (Obrigatória):
                </label>
                <div className="relative">
                  <input
                    id="apiKeyInput"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 placeholder-slate-500 transition-all duration-300 pr-10"
                    placeholder="Insira sua chave de API aqui"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-cyan-400"
                    aria-label={showApiKey ? 'Esconder chave' : 'Mostrar chave'}
                  >
                    {showApiKey ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Opções de Geração */}
          <div className="mb-8 p-4 border border-slate-700 rounded-lg bg-slate-800/30">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
              <Settings2 className="w-6 h-6 mr-2" /> Opções de Geração
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="toneSelect" className="block text-sm font-medium text-slate-300 mb-1">
                  <Mic2 size={16} className="inline mr-1 mb-0.5" /> Tom de Voz da Postagem:
                </label>
                <div className="relative">
                  <select
                    id="toneSelect"
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full appearance-none p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 transition-all duration-300"
                  >
                    {toneOptions.map((tone) => (
                      <option key={tone.id} value={tone.id}>
                        {tone.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="charLimitInput" className="block text-sm font-medium text-slate-300 mb-1">
                  <FileText size={16} className="inline mr-1 mb-0.5" /> Limite de Caracteres (aprox. para Blocos 1-5):
                </label>
                <input
                  id="charLimitInput"
                  type="number"
                  value={totalCharacterLimit}
                  onChange={(e) => setTotalCharacterLimit(parseInt(e.target.value, 10) || 1200)}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 placeholder-slate-500"
                  min="100"
                  step="50"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="imagePromptTextToggle"
                  type="checkbox"
                  checked={generateImagePromptWithText}
                  onChange={(e) => setGenerateImagePromptWithText(e.target.checked)}
                  className="h-5 w-5 text-cyan-500 border-slate-600 rounded bg-slate-700/50 focus:ring-cyan-600 focus:ring-offset-slate-800"
                />
                <label
                  htmlFor="imagePromptTextToggle"
                  className="ml-3 block text-sm font-medium text-slate-300 flex items-center"
                >
                  <ImagePlus size={16} className="inline mr-1.5" /> Incluir sugestão de texto no prompt da imagem (Bloco
                  6)
                </label>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="userInput" className="block text-sm font-medium text-cyan-400 mb-2 ml-1">
              Assunto Central ou Link de Referência:
            </label>
            <textarea
              id="userInput"
              rows="4"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg shadow-inner focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 placeholder-slate-500 transition-all duration-300 focus:shadow-cyan-500/30 focus:shadow-lg"
              placeholder="Ex: A importância da criatividade no trabalho remoto..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              id="generateButton"
              onClick={handleGenerate}
              disabled={isLoadingText || isGeneratingVariation}
              className="w-full sm:w-auto flex-grow bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center text-lg disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isLoadingText && !isGeneratingVariation ? (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              ) : (
                <Zap className="w-6 h-6 mr-2 group-hover:animate-ping" />
              )}
              {isLoadingText && !isGeneratingVariation ? 'Gerando...' : 'Gerar Conteúdo'}
            </button>
            <button
              id="generateVariationButton"
              onClick={handleGenerateVariation}
              disabled={isLoadingText || isGeneratingVariation || Object.keys(generatedBlocks).length === 0}
              className="w-full sm:w-auto flex-grow bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center text-lg disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isGeneratingVariation ? (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              )}
              {isGeneratingVariation ? 'Gerando Variação...' : 'Gerar Variação'}
            </button>
          </div>

          {/* Seção de Histórico de Gerações */}
          <div className="mt-10 p-4 border border-slate-700 rounded-lg bg-slate-800/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-cyan-400 flex items-center">
                <History className="w-6 h-6 mr-2" /> Histórico de Gerações
                <InfoTooltip text="Seu histórico de gerações é salvo localmente no seu navegador. Nenhuma chave de API é salva." />
              </h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm text-cyan-400 hover:text-cyan-300 underline"
              >
                {showHistory ? 'Esconder' : 'Mostrar'} Histórico ({generationHistory.length})
              </button>
            </div>
            {showHistory && (
              <>
                {generationHistory.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">Nenhuma geração salva no histórico.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {generationHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-700/50 rounded-md border border-slate-600 flex justify-between items-center hover:border-cyan-500/70 transition-colors"
                      >
                        <div>
                          <p className="text-sm text-slate-300 truncate w-60" title={item.userInput}>
                            <span className="font-medium text-cyan-500">Input:</span> {item.userInput.substring(0, 50)}
                            {item.userInput.length > 50 ? '...' : ''}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleString('pt-BR')} - Modelo: {item.selectedModel} - Tom:{' '}
                            {toneOptions.find((t) => t.id === item.selectedTone)?.name || item.selectedTone}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => loadHistoryItem(item)}
                            title="Carregar esta geração"
                            className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => deleteHistoryItem(item.id)}
                            title="Excluir esta geração"
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {generationHistory.length > 0 && (
                  <button
                    onClick={clearAllHistory}
                    className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
                  >
                    Limpar Todo o Histórico
                  </button>
                )}
              </>
            )}
          </div>

          {isLoadingText && Object.keys(generatedBlocks).length === 0 && (
            <div className="mt-10 text-center">
              <Loader2 className="w-12 h-12 mx-auto text-cyan-400 animate-spin" />
              <p className="text-slate-400 mt-3">Processando sua solicitação...</p>
            </div>
          )}

          {Object.keys(generatedBlocks).length > 0 && (
            <div className="mt-10">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-sky-400">Resultados da Geração</h2>
                <InfoTooltip text="O conteúdo gerado pela IA é exibido como texto para sua segurança, prevenindo a execução de scripts. Você pode editar os blocos antes de copiar." />
              </div>
              <div className="space-y-8">
                {blockDefinitions.map((blockDef) => (
                  <BlockDisplay
                    key={blockDef.id}
                    blockId={blockDef.id}
                    title={blockDef.title}
                    content={generatedBlocks[blockDef.id]}
                    icon={blockDef.icon}
                    onContentChange={handleBlockContentChange}
                  ></BlockDisplay>
                ))}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleCopyToClipboard}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto group"
                    disabled={Object.keys(generatedBlocks).length === 0 || isLoadingText || isGeneratingVariation}
                  >
                    <Copy className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Copiar Postagem para LinkedIn
                  </button>
                  {copySuccess && (
                    <p className="text-green-400 mt-3 text-sm transition-opacity duration-500">{copySuccess}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <footer className="text-center mt-12 pb-8">
        <p className="text-slate-500 text-sm">
          Powered by AI & <span className="text-cyan-400">Futuristic Visions</span>.
        </p>
      </footer>
    </div>
  );
}
