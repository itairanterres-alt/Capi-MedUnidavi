// MED-UNIDAVI 2027 — Banco de Questões "Meu Treino" (ITEM 5)
// Padrão ENAMED ABDC — Portaria MEC nº 413/2025 — 4 alternativas SEMPRE

const QUESTOES_MOCK = [
  {
    id: 'q001', fase: '3ª', uc: 'Morfofuncional III', dificuldade: 'intermediário',
    subarea: 'Cardiologia', competencia: 'Atenção à Saúde',
    enunciado: `Mulher de 62 anos, hipertensa e diabética há 15 anos, é atendida em UPA com dor torácica retroesternal em aperto com irradiação para o membro superior esquerdo, iniciada há 3 horas, associada a sudorese fria e náuseas. Ao exame: PA 150/90 mmHg, FC 98 bpm, SpO₂ 96% em ar ambiente, ausculta cardíaca com B4 presente. ECG mostra supradesnivelamento de ST em DII, DIII e aVF. Marcadores de lesão miocárdica em coleta.\n\nQual é a conduta imediata mais adequada neste caso?`,
    alternativas: [
      { letra: 'A', texto: 'Administrar morfina IV, iniciar nitroglicerina sublingual, solicitar ecocardiograma de urgência e aguardar resultado dos marcadores antes de qualquer intervenção adicional' },
      { letra: 'B', texto: 'Administrar AAS 300 mg, clopidogrel 300 mg, enoxaparina e encaminhar imediatamente para hemodinâmica para angioplastia primária (tempo porta-balão < 90 min)' },
      { letra: 'C', texto: 'Iniciar fibrinólise com tenecteplase imediatamente, sem necessidade de anticoagulação adicional, por ser o tratamento padrão-ouro do IAMCSST' },
      { letra: 'D', texto: 'Prescrever AAS e beta-bloqueador oral, internar em enfermaria comum para monitorização e aguardar a evolução clínica nas próximas 24 horas' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. A morfina tem uso controverso no IAMCSST e pode ser prejudicial. Aguardar marcadores retarda a reperfusão, que é tempo-dependente e deve ocorrer em < 90 min (angioplastia primária).',
      B: 'Correta. O quadro é de IAMCSST inferior (supra em DII, DIII, aVF). A terapia de reperfusão por angioplastia primária é o padrão-ouro quando disponível em < 120 min. AAS + inibidor P2Y12 + anticoagulante são indicados imediatamente. Referência: Diretriz SBC/SBHCI de IAMCSST, 2024.',
      C: 'Incorreta. A fibrinólise é reservada para quando a angioplastia primária não é realizável em < 120 min (ex.: serviço sem hemodinâmica e transferência demorada). Não é primeira escolha quando há hemodinâmica disponível.',
      D: 'Incorreta. IAMCSST é emergência com risco de morte. Internação em enfermaria comum e conduta expectante é inadequada e potencialmente fatal.',
    },
    referencia: 'Diretriz da Sociedade Brasileira de Cardiologia sobre IAMCSST, 2024. Arq Bras Cardiol.',
  },
  {
    id: 'q002', fase: '3ª', uc: 'Tutorial PBL', dificuldade: 'básico',
    subarea: 'Pneumologia', competencia: 'Atenção à Saúde',
    enunciado: `Homem de 68 anos, ex-tabagista (40 maços-ano, cessou há 5 anos), é atendido em ambulatório de pneumologia com queixa de dispneia progressiva aos médios esforços há 3 anos e tosse produtiva crônica. Espirometria pós-broncodilatador mostra VEF1/CVF = 0,62 e VEF1 = 58% do previsto. Radiografia de tórax sem alterações significativas.\n\nDe acordo com a classificação GOLD 2025, qual é o estadiamento espirométrico e a conduta farmacológica inicial mais adequada?`,
    alternativas: [
      { letra: 'A', texto: 'GOLD 1 (leve), indicado apenas SABA de alívio conforme necessidade' },
      { letra: 'B', texto: 'GOLD 2 (moderado), indicado broncodilatador de longa duração (LAMA ou LABA) como terapia de manutenção' },
      { letra: 'C', texto: 'GOLD 3 (grave), indicado corticosteroide inalatório em monoterapia como primeira linha' },
      { letra: 'D', texto: 'GOLD 2 (moderado), indicado iniciar imediatamente corticosteroide oral sistêmico para controle da inflamação crônica' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. GOLD 1 corresponde a VEF1 ≥ 80% do previsto. O paciente tem VEF1 = 58%, configurando GOLD 2. SABA em monoterapia não é a terapia de manutenção recomendada para GOLD 2.',
      B: 'Correta. VEF1/CVF < 0,70 confirma obstrução; VEF1 50–79% do previsto = GOLD 2 (moderado). A primeira linha de manutenção é broncodilatador de longa duração (LAMA — tiotrópio, umeclidínio — ou LABA). Referência: GOLD 2025.',
      C: 'Incorreta. GOLD 3 corresponde a VEF1 30–49% do previsto. Além disso, corticosteroide inalatório em monoterapia não é indicado em DPOC — a terapia inicial é sempre broncodilatação.',
      D: 'Incorreta. Corticosteroide oral sistêmico é reservado para exacerbações agudas de DPOC, não para manutenção crônica, dado o perfil de efeitos adversos (miopatia, diabetes, osteoporose).',
    },
    referencia: 'GOLD 2025 — Global Strategy for Prevention, Diagnosis and Management of COPD.',
  },
  {
    id: 'q003', fase: '3ª', uc: 'IESC III', dificuldade: 'básico',
    subarea: 'Saúde Coletiva', competencia: 'Saúde da Família e Comunidade',
    enunciado: `Durante visita domiciliar na UBS, o médico de família atende uma criança de 24 meses com crescimento adequado (P/I no percentil 50, E/I no percentil 45) e boletim de vacinação com atraso na vacina tríplice viral (SCR/MMR). A mãe refere medo de efeitos adversos após ter lido postagens em redes sociais associando a vacina ao autismo.\n\nQual é a abordagem mais adequada do médico nesse atendimento?`,
    alternativas: [
      { letra: 'A', texto: 'Respeitar a recusa vacinal da mãe, registrar no prontuário e remarcar a criança para acompanhamento em 30 dias sem insistir, preservando a autonomia familiar' },
      { letra: 'B', texto: 'Notificar imediatamente o Conselho Tutelar por negligência em saúde da criança e solicitar intervenção judicial para vacinação compulsória' },
      { letra: 'C', texto: 'Acolher o medo da mãe sem julgamento, apresentar evidências científicas que refutam a associação vacina-autismo (estudo de Wakefield retratado), esclarecer a proteção oferecida e aplicar a vacina se houver consentimento' },
      { letra: 'D', texto: 'Encaminhar imediatamente a criança para pediatra especialista, pois hesitação vacinal foge da competência do médico de família e comunidade' },
    ],
    gabarito: 'C',
    justificativas: {
      A: 'Incorreta. Respeitar a recusa sem qualquer discussão clínica-educacional configura omissão. O médico tem responsabilidade ativa na promoção de saúde e deve intervir com base em evidências e comunicação empática.',
      B: 'Incorreta. Notificação ao Conselho Tutelar é indicada em situações de violência, abuso ou negligência grave. Hesitação vacinal ainda não vacinou-se em recusa, requer abordagem educativa como primeira resposta.',
      C: 'Correta. A abordagem de hesitação vacinal inclui: (1) escuta ativa e acolhimento sem julgamento, (2) apresentação de evidências (o artigo de Wakefield foi retratado pela Lancet em 2010 e o autor teve registro cassado), (3) clarificação dos riscos reais da doença vs. benefícios da vacina, (4) vacinação com consentimento. Referência: PNI/MS 2024; DCN 2025 — comunicação terapêutica.',
      D: 'Incorreta. Comunicação em saúde e manejo de hesitação vacinal é competência central do médico de família e comunidade (WONCA/SBMFC). Encaminhar sem abordagem é fragmentação desnecessária.',
    },
    referencia: 'Programa Nacional de Imunizações, MS/CGPNI 2024; SBMFC — Comunicação e Adesão Vacinal.',
  },
  {
    id: 'q004', fase: '3ª', uc: 'Morfofuncional III', dificuldade: 'avançado',
    subarea: 'Nefrologia', competencia: 'Atenção à Saúde',
    enunciado: `Homem de 45 anos, diabético tipo 2 há 10 anos em uso de metformina e linagliptina, é atendido em consulta de rotina. Exames mostram: creatinina sérica 2,1 mg/dL (TFG estimada 38 mL/min/1,73m² — CKD-EPI), proteinúria de 24h = 1,2 g, K⁺ = 5,3 mEq/L, glicemia de jejum 138 mg/dL, HbA1c 8,2%. PA = 148/92 mmHg.\n\nConsiderando as diretrizes brasileiras, qual das condutas abaixo é a mais adequada para este paciente?`,
    alternativas: [
      { letra: 'A', texto: 'Manter metformina na dose atual, iniciar IECA para nefroproteção e prescrever suplementação de potássio para corrigir a hipopotassemia' },
      { letra: 'B', texto: 'Suspender metformina (TFG < 45), iniciar inibidor SGLT2 (dapagliflozina) para nefroproteção e controle glicêmico, e iniciar IECA ou BRA para controle pressórico e proteinúria' },
      { letra: 'C', texto: 'Manter metformina, acrescentar insulina basal como único ajuste, sem necessidade de nefroproteção específica neste estágio de doença renal' },
      { letra: 'D', texto: 'Iniciar hemodiálise de urgência, pois TFG de 38 mL/min/1,73m² representa insuficiência renal terminal que requer terapia de substituição renal imediata' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. Metformina é contraindicada quando TFG < 45 (risco de acidose lática — bula atualizada ANVISA). O K⁺ é 5,3 mEq/L (hipercalemia leve), não hipopotassemia — suplementação seria perigosa.',
      B: 'Correta. TFG 38 → DRC estágio 3b. Condutas: (1) suspender metformina (TFG < 45); (2) iSGLT2 (dapagliflozina 10 mg) reduz progressão da DRC diabética independente do controle glicêmico (CREDENCE, DAPA-CKD); (3) IECA/BRA para proteinúria e PA. Monitorar K⁺ com início do IECA. Referência: Diretriz SBD 2024; SBN 2024.',
      C: 'Incorreta. Manter metformina com TFG 38 é contraindicado. Há indicação documentada de nefroproteção com iSGLT2 + IECA/BRA neste perfil de paciente (DRC diabética + proteinúria).',
      D: 'Incorreta. Terapia de substituição renal é indicada na DRC estágio 5 (TFG < 15) com sintomas urêmicos. TFG 38 é estágio 3b — fase de manejo clínico conservador e nefroproteção.',
    },
    referencia: 'Diretriz Brasileira de Doença Renal do Diabetes — SBD/SBN 2024; CREDENCE trial, NEJM 2019.',
  },
  {
    id: 'q005', fase: '2ª', uc: 'Tutorial PBL II', dificuldade: 'básico',
    subarea: 'Farmacologia', competencia: 'Atenção à Saúde',
    enunciado: `Em aula de farmacologia, discute-se o uso clínico dos beta-bloqueadores. Uma estudante pergunta sobre as diferenças de seletividade e suas implicações na prática. A professora apresenta o caso: paciente asmático com ICC e FA precisa de controle da FC.\n\nQual beta-bloqueador é mais adequado e por quê?`,
    alternativas: [
      { letra: 'A', texto: 'Propranolol, pois é o beta-bloqueador mais potente e eficaz no controle da FC em FA, sem risco de broncoespasmo em doses terapêuticas habituais' },
      { letra: 'B', texto: 'Metoprolol succinato ou bisoprolol, por serem seletivos para β1 (cardioseletivos), com menor risco de broncoespasmo β2-mediado, embora a asma seja contraindicação relativa mesmo com cardioseletivos' },
      { letra: 'C', texto: 'Carvedilol é contraindicado em todo paciente asmático e nunca deve ser usado, independentemente da gravidade da asma ou da necessidade clínica' },
      { letra: 'D', texto: 'Atenolol é o único beta-bloqueador aprovado para uso em pacientes com doença pulmonar obstrutiva, sendo a escolha padrão neste cenário' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. Propranolol é não-seletivo (β1 e β2). Em asmáticos, o bloqueio β2 causa broncoespasmo grave. É contraindicado em asma.',
      B: 'Correta. Metoprolol succinato e bisoprolol são β1-seletivos. Em asma leve-moderada controlada, podem ser usados com cautela quando o benefício cardiovascular supera o risco (ICC + FA com resposta ventricular rápida). Monitorar função pulmonar. Referência: Arq Bras Cardiol — Diretriz de ICC, 2023.',
      C: 'Incorreta. Carvedilol (α1 + β1 + β2 bloqueador) é, de fato, mais arriscado em asmáticos por ser não-seletivo. Porém, a afirmação "nunca deve ser usado" é absoluta demais — em casos selecionados (asma bem controlada), pode ser considerado sob monitoramento. Contraindicação absoluta é asma brônquica grave ou não controlada.',
      D: 'Incorreta. Atenolol é cardioseletivo, mas não há aprovação específica que o diferencie do metoprolol ou bisoprolol neste contexto. Além disso, a farmacocinética do atenolol (sem metabolismo hepático de primeira passagem, excreção renal) não o torna superior neste cenário.',
    },
    referencia: 'Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda — SBC 2023. Arq Bras Cardiol.',
  },
  {
    id: 'q006', fase: '1ª', uc: 'UC1', dificuldade: 'básico',
    subarea: 'Bioquímica / Fisiologia', competencia: 'Atenção à Saúde',
    enunciado: `Uma criança de 6 meses é levada à UBS por sua mãe com queixa de múltiplos episódios de diarreia líquida profusa ao dia. Ao exame: criança com sinais de desidratação moderada, turgência cutânea diminuída, mucosas ressecadas, choro sem lágrimas. A mãe relata que a criança vem sendo alimentada exclusivamente com solução caseira de água e açúcar.\n\nSobre a terapia de reidratação oral (TRO) com SRO padronizada pela OMS, qual afirmativa está correta?`,
    alternativas: [
      { letra: 'A', texto: 'A TRO com SRO é ineficaz em diarreia por rotavírus, pois o vírus destrói os cotransportadores Na⁺-glicose (SGLT1) da borda em escova intestinal' },
      { letra: 'B', texto: 'A eficácia da SRO baseia-se na cotransporte Na⁺-glicose (SGLT1) que permanece funcional mesmo nas diarreias secretoras, permitindo absorção acoplada de Na⁺, glicose e água' },
      { letra: 'C', texto: 'A solução caseira de água e açúcar é equivalente à SRO padronizada pela OMS, pois ambas contêm glicose e água em proporções semelhantes' },
      { letra: 'D', texto: 'A TRO está contraindicada em desidratação moderada, sendo necessária reidratação venosa imediata com soro fisiológico 0,9% em bolus' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. Mesmo nas gastroenterites virais, a capacidade de absorção via SGLT1 é preservada em parte dos enterócitos não destruídos. A TRO funciona mesmo nessas situações — é pilar do manejo da diarreia infantil pelo MS/OMS.',
      B: 'Correta. O cotransportador SGLT1 (sódio + glicose na proporção 1:1) na membrana apical do enterócito mantém funcionamento parcial mesmo em diarreias secretoras. A SRO OMS (Na⁺ 75 mEq/L, K⁺ 20 mEq/L, glicose 75 mmol/L, citrato) fornece as concentrações otimizadas para maximizar esse transporte. Referência: MS — Protocolo de Diarreia Aguda 2024.',
      C: 'Incorreta. A solução caseira não tem a osmolaridade nem a composição eletrolítica correta da SRO padronizada. Pode agravar desequilíbrios eletrolíticos (hipernatremia, hipocalemia).',
      D: 'Incorreta. Desidratação moderada é indicação para TRO (plano B do MS). Reidratação venosa é reservada para desidratação grave (Plano C) com choque hipovolêmico.',
    },
    referencia: 'Ministério da Saúde — Protocolo de Tratamento da Diarreia Aguda, 2024. AIDPI Criança.',
  },
  {
    id: 'q007', fase: '4ª', uc: 'Morfofuncional IV', dificuldade: 'avançado',
    subarea: 'Endocrinologia', competencia: 'Atenção à Saúde',
    enunciado: `Mulher de 35 anos, previamente hígida, é atendida em pronto-socorro com quadro de 24 horas de vômitos, dor abdominal difusa, poliúria e polidipsia. Nega uso de medicamentos. Glicemia capilar: 420 mg/dL. Gasometria arterial: pH 7,21, HCO₃ 12 mEq/L, pCO₂ 28 mmHg, AG = 22 mEq/L. Cetonúria +++. Sódio 132 mEq/L, Potássio 5,8 mEq/L.\n\nQual é o diagnóstico mais provável e a conduta inicial correta?`,
    alternativas: [
      { letra: 'A', texto: 'Estado hiperosmolar hiperglicêmico (EHH); iniciar insulina regular IV em bolus de 0,1 UI/kg e hidratação com soro glicosado a 5%' },
      { letra: 'B', texto: 'Cetoacidose diabética (CAD); iniciar hidratação agressiva com SF 0,9% (1 L/h na 1ª hora), insulina regular IV em infusão contínua (0,1 UI/kg/h) e monitoramento rigoroso do K⁺ antes de iniciar insulina' },
      { letra: 'C', texto: 'Cetoacidose diabética (CAD); iniciar imediatamente insulina regular SC e alta hospitalar com orientações após estabilização clínica' },
      { letra: 'D', texto: 'Acidose lática por metformina; suspender o fármaco, iniciar bicarbonato de sódio IV e hemodiálise de urgência' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. O quadro (pH < 7,3 + cetonúria +++ + AG elevado) é CAD, não EHH (que cursa sem acidose significativa e sem cetonúria). Soro glicosado na fase inicial agravaria a hiperglicemia.',
      B: 'Correta. CAD clássica: hiperglicemia + acidose metabólica de AG elevado + cetonúria. Manejo: (1) Hidratação SF 0,9% 1 L/h 1ª hora; (2) Corrigir K⁺ se < 3,5 antes de insulina; (3) Insulina regular 0,1 UI/kg/h IV; (4) Monitoramento glicêmico horário e eletrólitos. Referência: Diretriz SBD 2024 — CAD.',
      C: 'Incorreta. CAD requer internação e tratamento endovenoso. Alta hospitalar precoce com insulina SC é perigosa — risco de rebote e instabilidade metabólica. K⁺ 5,8 pode cair rapidamente com insulinoterapia.',
      D: 'Incorreta. A paciente nega metformina. O quadro de cetoacidose + hiperglicemia é incompatível com acidose lática por metformina (AG elevado, mas sem cetonúria).',
    },
    referencia: 'Diretriz Brasileira — Cetoacidose Diabética. SBD 2024. Jornal Brasileiro de Nefrologia.',
  },
  {
    id: 'q008', fase: '3ª', uc: 'IESC III', dificuldade: 'intermediário',
    subarea: 'Saúde Coletiva', competencia: 'Gestão em Saúde',
    enunciado: `Na UBS, o médico de família identifica que uma comunidade apresenta taxa de mortalidade infantil de 18/1.000 NV, acima da meta municipal de 10/1.000 NV. Análise dos óbitos mostra que 60% ocorreram por causas evitáveis (diarreia aguda, pneumonia e sepse neonatal). O gestor solicita ao médico que proponha ação prioritária com base em vigilância epidemiológica.\n\nQual ação tem maior impacto na redução da mortalidade infantil por causas evitáveis neste contexto?`,
    alternativas: [
      { letra: 'A', texto: 'Solicitar construção de UTI neonatal na UBS para atender sepse neonatal no próprio território, evitando transferências de alto risco' },
      { letra: 'B', texto: 'Intensificar busca ativa de gestantes, qualificar o pré-natal (mínimo 6 consultas com início no 1º trimestre), ampliar cobertura vacinal infantil e implementar protocolo AIDPI nas unidades' },
      { letra: 'C', texto: 'Distribuir antibióticos de amplo espectro de forma irrestrita às famílias das crianças menores de 5 anos para tratar precocemente qualquer infecção' },
      { letra: 'D', texto: 'Encerrar temporariamente o atendimento de adultos na UBS para concentrar todos os recursos humanos no atendimento infantil' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. UBS não tem estrutura para UTI neonatal — isso é competência de maternidade de risco habitual ou hospital. A UBS atua na prevenção e na captação precoce, não em terapia intensiva.',
      B: 'Correta. Estratégias de maior impacto comprovado: (1) pré-natal adequado reduz prematuridade e sepse neonatal; (2) vacinação reduz pneumonia e outras infecções; (3) AIDPI (Atenção Integrada às Doenças Prevalentes na Infância) é protocolo OMS/MS que reduz mortalidade por diarreia e pneumonia em APS. Referência: MS — Agenda de Compromissos para a Saúde Integral da Criança, 2024.',
      C: 'Incorreta. Uso irrestrito de antibióticos causa resistência bacteriana e tem riscos de efeitos adversos. Sem diagnóstico correto, é uma conduta perigosa e contrária à boa prática clínica.',
      D: 'Incorreta. Redução de atendimento de adultos desestrutura a UBS e viola o princípio da integralidade. Além disso, adultos doentes (incluindo gestantes) são determinantes da saúde infantil.',
    },
    referencia: 'MS — Agenda Nacional de Qualidade do Pré-Natal (2024); AIDPI — OMS/OPAS/MS.',
  },
  {
    id: 'q009', fase: '3ª', uc: 'Morfofuncional III', dificuldade: 'avançado',
    subarea: 'Hematologia', competencia: 'Atenção à Saúde',
    enunciado: `Mulher de 28 anos, gestante de 20 semanas, comparece à consulta pré-natal com queixa de fadiga progressiva. Exames: Hb 9,2 g/dL, Ht 28%, VCM 68 fL, CHCM 30 g/dL, reticulócitos 1,2%, ferritina 8 ng/mL, ferro sérico 42 mcg/dL, TIBC 480 mcg/dL. Ausência de sangramentos. Fezes sem parasitas.\n\nQual é o diagnóstico e a conduta mais adequada?`,
    alternativas: [
      { letra: 'A', texto: 'Anemia de doença crônica; não tratar com ferro pois a ferritina pode estar falsamente baixa na gestação, e aguardar reavaliação pós-parto' },
      { letra: 'B', texto: 'Anemia ferropriva; iniciar sulfato ferroso 300 mg/dia (60 mg Fe elementar) VO, manter por pelo menos 3 meses após normalização da Hb e investigar causa base no puerpério' },
      { letra: 'C', texto: 'Anemia megaloblástica; solicitar dosagem de B12 e folato e iniciar ácido fólico 5 mg/dia como tratamento empírico' },
      { letra: 'D', texto: 'Talassemia minor; não tratar, pois é condição fisiológica sem risco materno-fetal e o uso de ferro seria prejudicial' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. Ferritina baixa (< 12 ng/mL) é patognomônica de ferropenia — não está falsamente baixa. Ao contrário, na inflamação a ferritina pode estar falsamente ELEVADA. O quadro (microcitose + hipocromia + ferritina baixa + TIBC alta) é clássico de anemia ferropriva.',
      B: 'Correta. Anemia ferropriva é a causa mais comum de anemia na gestação. Diagnóstico: VCM < 80, CHCM < 32, ferritina < 12, TIBC elevada. Tratamento: sulfato ferroso 150-300 mg/dia, preferencialmente em jejum, por no mínimo 3 meses após Hb normalizar. Referência: Caderno de Atenção Pré-Natal — MS/FEBRASGO 2024.',
      C: 'Incorreta. Anemia megaloblástica cursa com macrocitose (VCM > 100) e neutrófilos hipersegmentados. O VCM desta paciente é 68 (microcítica), excluindo megaloblastose.',
      D: 'Incorreta. Talassemia minor também cursa com microcitose, mas com ferritina normal ou elevada e TIBC normal. Além disso, talassemia não seria diagnosticada sem eletroforese de hemoglobina — tratamento com ferro seria correto se confirmada ferropenia coexistente.',
    },
    referencia: 'FEBRASGO — Protocolo de Anemia na Gestação, 2024; Cadernos de Atenção Básica — Pré-natal de Baixo Risco, MS 2022.',
  },
  {
    id: 'q010', fase: '2ª', uc: 'IESC II', dificuldade: 'básico',
    subarea: 'Medicina Preventiva', competencia: 'Educação em Saúde',
    enunciado: `Durante atividade de educação em saúde na UBS, o médico de família é questionado por um grupo de adultos sobre rastreamento de câncer colorretal. Um senhor de 52 anos, sem sintomas gastrointestinais, sem história familiar de câncer colorretal, pergunta a partir de que idade e com qual exame deve realizar o rastreio.\n\nQual é a recomendação mais alinhada com as diretrizes brasileiras vigentes?`,
    alternativas: [
      { letra: 'A', texto: 'Rastreamento indicado apenas para pacientes acima de 65 anos com história familiar de primeiro grau, utilizando colonoscopia como único método válido' },
      { letra: 'B', texto: 'Rastreamento com pesquisa de sangue oculto nas fezes (PSOF imunoquímico) anual ou colonoscopia a cada 10 anos, iniciando aos 45–50 anos em população de risco médio' },
      { letra: 'C', texto: 'Rastreamento não é indicado para população geral no Brasil por ausência de programa nacional estruturado; deve-se aguardar implementação pelo MS' },
      { letra: 'D', texto: 'O único método de rastreamento aceito pelo INCA é a retossigmoidoscopia flexível a cada 5 anos, iniciando aos 60 anos' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. Rastreamento em risco médio começa aos 45-50 anos, independentemente de história familiar. Colonoscopia é uma das opções, não a única. Pacientes com história familiar de 1º grau < 60 anos iniciam rastreamento mais precocemente (10 anos antes do diagnóstico do familiar).',
      B: 'Correta. INCA/MS e SBE recomendam rastreamento de CCR em risco médio a partir dos 45–50 anos. Opções aceitas: PSOF imunoquímico anual (FIT), colonoscopia a cada 10 anos (exame padrão-ouro), ou sigmoidoscopia a cada 5 anos. Referência: INCA — Diretrizes para Rastreamento de Câncer Colorretal no Brasil, 2023.',
      C: 'Incorreta. O Brasil tem programa de rastreamento em estruturação, e as diretrizes do INCA estabelecem recomendações claras desde 2021/2023. A ausência de programa nacional unificado não invalida a indicação individual.',
      D: 'Incorreta. Retossigmoidoscopia não é o único método e não é a recomendação padrão do INCA. A colonoscopia é o padrão-ouro; a PSOF imunoquímica é a opção de maior acesso na APS.',
    },
    referencia: 'INCA — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo-retal, 2023.',
  },
  {
    id: 'q011', fase: '3ª', uc: 'Habilidades Profissionais III', dificuldade: 'básico',
    subarea: 'Bioética / Comunicação', competencia: 'Comunicação em Saúde',
    enunciado: `Um médico residente atende um homem de 70 anos com diagnóstico recente de adenocarcinoma de pâncreas localmente avançado, sem possibilidade cirúrgica. O paciente, lúcido e orientado, declara: "Doutor, quero saber tudo sobre minha doença. Não me esconda nada." Sua filha, ao chegar ao consultório, pede ao médico que não informe o diagnóstico ao pai, alegando que "ele não vai aguentar".\n\nQual é a conduta ética e legalmente correta?`,
    alternativas: [
      { letra: 'A', texto: 'Atender ao pedido da filha, pois a família tem precedência nas decisões médicas sobre pacientes idosos, especialmente em diagnósticos graves' },
      { letra: 'B', texto: 'Comunicar o diagnóstico ao paciente de forma clara e empática, respeitando sua autonomia e sua solicitação explícita de informação integral, independentemente da vontade da filha' },
      { letra: 'C', texto: 'Encaminhar o caso ao comitê de bioética antes de qualquer informação, pois conflitos familiares exigem resolução institucional prévia' },
      { letra: 'D', texto: 'Fornecer as informações à filha mas não ao paciente, documentando no prontuário que a revelação poderia causar dano psicológico grave' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. O paciente é o titular do direito à informação sobre sua própria saúde. Família não tem precedência sobre um paciente lúcido e autônomo. CFM e CEM (Código de Ética Médica 2019) são claros: o médico deve respeitar a vontade do paciente capaz.',
      B: 'Correta. Autonomia do paciente lúcido é princípio ético e legal fundamental (CFM Res. 2.232/2019; Lei nº 10.241/1999 — SP; e CEM art. 31). O paciente pediu explicitamente informação completa. O médico deve comunicar o diagnóstico com compaixão, oferecer suporte psicológico e envolver a família com consentimento do paciente. Referência: CFM — CEM 2019.',
      C: 'Incorreta. O comitê de bioética é consultivo — não há urgência em acioná-lo antes de atender a solicitação de um paciente autônomo que quer ser informado. A situação não é um conflito institucional, é uma violação de autonomia se o médico seguir o pedido da filha.',
      D: 'Incorreta. Registrar dano psicológico presumido sem evidência e omitir informação de paciente capaz é antiético e potencialmente ilegal. "Proteção" não justifica paternalismo em pacientes autônomos.',
    },
    referencia: 'CFM — Código de Ética Médica, Resolução 2.217/2018 atualizada 2019. Art. 31, 32, 34.',
  },
  {
    id: 'q012', fase: '3ª', uc: 'Morfofuncional III', dificuldade: 'intermediário',
    subarea: 'Neurologia', competencia: 'Atenção à Saúde',
    enunciado: `Homem de 68 anos chega ao PS acompanhado pela esposa com queixa de instalação súbita, há 40 minutos, de desvio de rima labial para a direita, hemiplegia esquerda e afasia. PA = 178/104 mmHg, glicemia 112 mg/dL. TC de crânio sem contraste não mostra sangramento. NIHSS = 14.\n\nQual é a conduta imediata mais adequada?`,
    alternativas: [
      { letra: 'A', texto: 'Aguardar melhora espontânea por 24 horas antes de qualquer intervenção, pois AIT pode mimetizar AVC isquêmico e resolver espontaneamente' },
      { letra: 'B', texto: 'Iniciar alteplase 0,9 mg/kg IV (máx 90 mg) para trombólise, verificar critérios de inclusão/exclusão, considerar trombectomia mecânica se elegível (oclusão de grande vaso)' },
      { letra: 'C', texto: 'Controlar a PA com nitroprussiato IV até 120/80 mmHg antes de qualquer outra intervenção, pois a hipertensão é contraindicação absoluta ao tratamento do AVC' },
      { letra: 'D', texto: 'Iniciar anticoagulação plena com heparina não-fracionada IV como tratamento de escolha para AVC isquêmico agudo nas primeiras horas' },
    ],
    gabarito: 'B',
    justificativas: {
      A: 'Incorreta. NIHSS 14 com déficit instalado há 40 min é AVC isquêmico estabelecido até prova em contrário — não AIT. Aguardar resulta em morte neuronal ("time is brain": ~1,9 milhões de neurônios/minuto perdidos).',
      B: 'Correta. Janela de trombólise IV (alteplase 0,9 mg/kg, máx 90 mg): até 4,5h do início dos sintomas. NIHSS 14 + sintomas < 1h = candidato. Avaliar concomitantemente para trombectomia mecânica (oclusão de grande vaso por angiotomografia). PA deve ser < 185/110 para trombólise — aqui está controlável. Referência: Diretriz SBN — AVC Isquêmico Agudo, 2024.',
      C: 'Incorreta. Redução agressiva da PA pré-trombólise é contraindicada (piora isquemia por penumbra). A PA deve ser < 185/110 mmHg para trombólise. Nitroprussiato para PA 178/104 não é indicado.',
      D: 'Incorreta. Heparina plena nas primeiras horas do AVC isquêmico aumenta risco de transformação hemorrágica sem benefício comprovado — não é recomendada como tratamento de fase aguda. Anticoagulação tem papel em contextos específicos (ex.: trombose de seio venoso, FA com recorrência).',
    },
    referencia: 'Diretriz Brasileira para o Tratamento do AVC Isquêmico — SBN/ABN 2024. Arq Neuropsiquiatr.',
  },
];

// ── Hub "Meu Treino" ──────────────────────────────────────────────────────────
function QuestoesHub({ onIniciarTreino, isMobile }) {
  const [filtroFase, setFiltroFase] = React.useState('todas');
  const [filtroArea, setFiltroArea] = React.useState('todas');
  const [filtroDif, setFiltroDif] = React.useState('todas');
  const [modo, setModo] = React.useState('livre');
  const [nQuestoes, setNQuestoes] = React.useState(10);

  const fases = ['todas', '1ª', '2ª', '3ª', '4ª'];
  const areas = ['todas', 'Cardiologia', 'Pneumologia', 'Nefrologia', 'Endocrinologia', 'Farmacologia', 'Neurologia', 'Saúde Coletiva', 'Hematologia', 'Bioética / Comunicação', 'Medicina Preventiva'];
  const difs = ['todas', 'básico', 'intermediário', 'avançado'];

  const questoesFiltradas = QUESTOES_MOCK.filter(q =>
    (filtroFase === 'todas' || q.fase === filtroFase) &&
    (filtroArea === 'todas' || q.subarea === filtroArea) &&
    (filtroDif === 'todas' || q.dificuldade === filtroDif)
  );

  const FilterChip = ({ value, options, onChange }) => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: '5px 12px', borderRadius: 100,
          border: `1.5px solid ${value === o ? DS.blue : DS.border}`,
          background: value === o ? DS.blue : DS.surface,
          color: value === o ? '#fff' : DS.textSec,
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
        }}>{o.charAt(0).toUpperCase() + o.slice(1)}</button>
      ))}
    </div>
  );

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Meu Treino"
        subtitle="Banco de questões ENAMED ABDC · Portaria MEC 413/2025"
        isMobile={isMobile}
        actions={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CapiAvatar size={30} /><span style={{ fontSize: 12, color: DS.textMuted }}>Capi · IA pedagógica</span></div>}
      />
      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Estatísticas rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
          {[
            { label: 'Questões no banco', valor: '12', cor: DS.blue },
            { label: 'Respondidas', valor: '5', cor: DS.green },
            { label: 'Taxa de acerto', valor: '60%', cor: DS.amber },
            { label: 'Últimas erradas', valor: '2', cor: DS.terra },
          ].map((s, i) => (
            <Card key={i} style={{ padding: '14px' }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.cor }}>{s.valor}</div>
            </Card>
          ))}
        </div>

        {/* Modo de estudo */}
        <Card style={{ padding: '18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>Modo de estudo</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { id: 'livre', label: 'Estudo livre', icon: '📖', desc: 'Responda no seu ritmo, com gabarito imediato' },
              { id: 'simulado', label: 'Simulado cronometrado', icon: '⏱', desc: '10, 30 ou 100 questões com tempo limitado' },
              { id: 'erradas', label: 'Revisão de erradas', icon: '🔄', desc: 'Refaça apenas as questões que errou' },
            ].map(m => (
              <div
                key={m.id}
                onClick={() => setModo(m.id)}
                style={{
                  flex: 1, minWidth: 140, padding: '14px', borderRadius: DS.radius, cursor: 'pointer',
                  border: `2px solid ${modo === m.id ? DS.blue : DS.border}`,
                  background: modo === m.id ? DS.blueLight : DS.bg,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{m.desc}</div>
              </div>
            ))}
          </div>
          {modo === 'simulado' && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: DS.textSec }}>Nº de questões:</span>
              {[10, 30, 100].map(n => (
                <button key={n} onClick={() => setNQuestoes(n)} style={{
                  padding: '5px 16px', borderRadius: 8, border: `1.5px solid ${nQuestoes === n ? DS.blue : DS.border}`,
                  background: nQuestoes === n ? DS.blue : DS.surface, color: nQuestoes === n ? '#fff' : DS.text,
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                }}>{n}</button>
              ))}
            </div>
          )}
        </Card>

        {/* Filtros */}
        <Card style={{ padding: '18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>Filtrar questões</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600, marginBottom: 6 }}>Fase</div>
              <FilterChip value={filtroFase} options={fases} onChange={setFiltroFase} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600, marginBottom: 6 }}>Área clínica</div>
              <FilterChip value={filtroArea} options={areas} onChange={setFiltroArea} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600, marginBottom: 6 }}>Dificuldade</div>
              <FilterChip value={filtroDif} options={difs} onChange={setFiltroDif} />
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ fontSize: 13, color: DS.textSec }}><strong style={{ color: DS.blue }}>{questoesFiltradas.length}</strong> questões disponíveis</span>
            <Btn variant="primary" onClick={() => onIniciarTreino(questoesFiltradas, modo)}>
              {modo === 'erradas' ? 'Revisar erradas' : modo === 'simulado' ? `Iniciar simulado (${nQuestoes}q)` : 'Iniciar estudo livre'} ›
            </Btn>
          </div>
        </Card>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Resolver Questão ──────────────────────────────────────────────────────────
function QuestaoResolver({ questoes, modo, onFinalizar, isMobile }) {
  const [idx, setIdx] = React.useState(0);
  const [selecionada, setSelecionada] = React.useState(null);
  const [respondida, setResponder] = React.useState(false);
  const [respostas, setRespostas] = React.useState([]);
  const [upToDateOpen, setUpToDateOpen] = React.useState(false);
  const [tempoRestante, setTempoRestante] = React.useState(modo === 'simulado' ? questoes.length * 120 : null);

  React.useEffect(() => {
    if (modo !== 'simulado' || !tempoRestante) return;
    const t = setInterval(() => setTempoRestante(v => { if (v <= 1) { clearInterval(t); onFinalizar(respostas); return 0; } return v - 1; }), 1000);
    return () => clearInterval(t);
  }, [modo]);

  if (!questoes.length) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, flexDirection: 'column', gap: 16 }}>
      <CapivaraDecorativa size={80} />
      <p style={{ fontSize: 14, color: DS.textSec }}>Nenhuma questão encontrada com os filtros selecionados.</p>
    </div>
  );

  const q = questoes[Math.min(idx, questoes.length - 1)];
  const formatarTempo = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const handleResponder = () => {
    if (!selecionada) return;
    const acerto = selecionada === q.gabarito;
    setRespostas(p => [...p, { id: q.id, selecionada, acerto }]);
    setResponder(true);
  };

  const handleProxima = () => {
    if (idx + 1 >= questoes.length) {
      onFinalizar([...respostas]);
    } else {
      setIdx(i => i + 1);
      setSelecionada(null);
      setResponder(false);
      setUpToDateOpen(false);
    }
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      {/* Header */}
      <div style={{ padding: '14px 24px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: DS.textMuted, marginBottom: 2 }}>
            Questão <strong>{idx + 1}</strong> de <strong>{questoes.length}</strong> · {q.subarea} · <Badge color={q.dificuldade === 'avançado' ? DS.terra : q.dificuldade === 'intermediário' ? DS.amber : DS.green}>{q.dificuldade}</Badge>
          </div>
          <ProgressBar value={idx + 1} max={questoes.length} color={DS.blue} height={4} />
        </div>
        {modo === 'simulado' && tempoRestante !== null && (
          <div style={{ padding: '5px 12px', background: tempoRestante < 120 ? DS.terraLight : DS.blueLight, borderRadius: DS.radiusSm, fontWeight: 800, fontSize: 14, color: tempoRestante < 120 ? DS.terra : DS.blue, fontFamily: 'monospace' }}>
            ⏱ {formatarTempo(tempoRestante)}
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? '16px' : '28px 40px', maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Enunciado */}
        <Card style={{ padding: '20px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
            {q.fase} Fase · {q.uc} · {q.subarea}
          </div>
          <p style={{ margin: 0, fontSize: 14, color: DS.text, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{q.enunciado}</p>
        </Card>

        {/* Alternativas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.alternativas.map(alt => {
            let borderColor = DS.border;
            let bg = DS.surface;
            let textColor = DS.text;
            if (respondida) {
              if (alt.letra === q.gabarito) { borderColor = DS.green; bg = DS.greenLight; }
              else if (alt.letra === selecionada && alt.letra !== q.gabarito) { borderColor = DS.terra; bg = DS.terraLight; }
            } else if (selecionada === alt.letra) {
              borderColor = DS.blue; bg = DS.blueLight;
            }
            return (
              <div
                key={alt.letra}
                onClick={() => !respondida && setSelecionada(alt.letra)}
                style={{ padding: '14px 18px', borderRadius: DS.radius, border: `2px solid ${borderColor}`, background: bg, cursor: respondida ? 'default' : 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'all 0.15s' }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: respondida && alt.letra === q.gabarito ? DS.green : respondida && alt.letra === selecionada && alt.letra !== q.gabarito ? DS.terra : DS.textSec, flexShrink: 0 }}>
                  {respondida && alt.letra === q.gabarito ? '✓' : respondida && alt.letra === selecionada && alt.letra !== q.gabarito ? '✗' : alt.letra}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: textColor, lineHeight: 1.6 }}>{alt.texto}</p>
                  {respondida && q.justificativas[alt.letra] && (
                    <div style={{ marginTop: 8, padding: '10px 12px', background: alt.letra === q.gabarito ? DS.greenLight : '#FFF', borderRadius: DS.radiusSm, borderLeft: `3px solid ${alt.letra === q.gabarito ? DS.green : DS.textMuted}` }}>
                      <p style={{ margin: 0, fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>{q.justificativas[alt.letra]}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Referência e ações */}
        {respondida && (
          <Card style={{ padding: '14px 18px', borderLeft: `3px solid ${DS.blue}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Referência</div>
            <p style={{ margin: 0, fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>{q.referencia}</p>
            <div style={{ marginTop: 10 }}>
              <Btn variant="secondary" size="sm" onClick={() => setUpToDateOpen(true)}>Aprofundar no UpToDate ↗</Btn>
            </div>
          </Card>
        )}

        {/* Botões de ação */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {!respondida ? (
            <Btn variant="primary" onClick={handleResponder} style={{ opacity: selecionada ? 1 : 0.5 }}>
              Responder
            </Btn>
          ) : (
            <Btn variant="primary" onClick={handleProxima}>
              {idx + 1 >= questoes.length ? 'Ver resultado ›' : 'Próxima questão ›'}
            </Btn>
          )}
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {/* UpToDate mock panel */}
      {upToDateOpen && (
        <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: isMobile ? '100%' : 380, background: DS.surface, borderLeft: `1px solid ${DS.border}`, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: DS.text }}>UpToDate</div>
              <div style={{ fontSize: 11, color: DS.textMuted }}>{q.subarea} — Referência clínica</div>
            </div>
            <button onClick={() => setUpToDateOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: DS.textMuted, fontFamily: 'IBM Plex Sans, sans-serif' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <div style={{ height: 120, background: `repeating-linear-gradient(45deg, ${DS.blueLight}, ${DS.blueLight} 6px, ${DS.bg} 6px, ${DS.bg} 14px)`, borderRadius: DS.radius, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px dashed ${DS.blue}40` }}>
              <span style={{ fontSize: 11, color: DS.blue, fontFamily: 'monospace', fontWeight: 700 }}>deep link UpToDate — {q.subarea}</span>
            </div>
            <p style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.7 }}>
              Conteúdo UpToDate para <strong>{q.subarea}</strong> será exibido aqui via deep link integrado. Esta área é um mock do painel de leitura contextual.
            </p>
            <p style={{ fontSize: 12, color: DS.textMuted, lineHeight: 1.6 }}>
              <strong>Referência:</strong> {q.referencia}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Resultado do simulado ─────────────────────────────────────────────────────
function QuestoesResultado({ questoes, respostas, onVoltar, isMobile }) {
  const acertos = respostas.filter(r => r.acerto).length;
  const total = respostas.length;
  const pct = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const erradas = respostas.filter(r => !r.acerto);

  const byArea = {};
  respostas.forEach(r => {
    const q = questoes.find(q => q.id === r.id);
    if (!q) return;
    if (!byArea[q.subarea]) byArea[q.subarea] = { total: 0, acertos: 0 };
    byArea[q.subarea].total++;
    if (r.acerto) byArea[q.subarea].acertos++;
  });

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Resultado" subtitle="Desempenho do treino" isMobile={isMobile} />
      <div style={{ padding: isMobile ? '16px' : '28px 40px', maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Placar geral */}
        <Card style={{ padding: '28px', textAlign: 'center', borderTop: `4px solid ${pct >= 60 ? DS.green : DS.terra}` }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: pct >= 60 ? DS.green : DS.terra, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 15, color: DS.text, fontWeight: 600, marginTop: 6 }}>{acertos} acertos de {total} questões</div>
          <div style={{ marginTop: 8 }}>
            <Badge color={pct >= 60 ? DS.green : pct >= 40 ? DS.amber : DS.terra}>
              {pct >= 60 ? 'Suficiente' : pct >= 40 ? 'Precisa melhorar' : 'Insuficiente'}
            </Badge>
          </div>
        </Card>

        {/* Por área */}
        <section>
          <SectionHeading>Desempenho por área</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(byArea).map(([area, dados]) => {
              const p = Math.round((dados.acertos / dados.total) * 100);
              return (
                <Card key={area} style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{area}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: p >= 60 ? DS.green : p >= 40 ? DS.amber : DS.terra }}>{dados.acertos}/{dados.total}</span>
                  </div>
                  <ProgressBar value={p} color={p >= 60 ? DS.green : p >= 40 ? DS.amber : DS.terra} height={5} />
                </Card>
              );
            })}
          </div>
        </section>

        {/* Erradas */}
        {erradas.length > 0 && (
          <section>
            <SectionHeading>Questões erradas</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {erradas.map(r => {
                const q = questoes.find(q => q.id === r.id);
                if (!q) return null;
                return (
                  <Card key={r.id} style={{ padding: '14px', borderLeft: `3px solid ${DS.terra}` }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: DS.text, marginBottom: 4, lineHeight: 1.4 }}>
                      {q.enunciado.slice(0, 120)}…
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Badge color={DS.terra}>Resposta: {r.selecionada}</Badge>
                      <Badge color={DS.green}>Gabarito: {q.gabarito}</Badge>
                      <Badge color={DS.textMuted}>{q.subarea}</Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn variant="primary" onClick={onVoltar}>Novo treino ›</Btn>
          <Btn variant="ghost" size="sm">Salvar resultado</Btn>
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Orquestrador ──────────────────────────────────────────────────────────────
function QuestoesScreen({ isMobile }) {
  const [view, setView] = React.useState('hub');
  const [questoesTreino, setQuestoesTreino] = React.useState([]);
  const [modoTreino, setModoTreino] = React.useState('livre');
  const [respostas, setRespostas] = React.useState([]);

  if (view === 'resolver') {
    return (
      <QuestaoResolver
        questoes={questoesTreino} modo={modoTreino} isMobile={isMobile}
        onFinalizar={r => { setRespostas(r); setView('resultado'); }}
      />
    );
  }
  if (view === 'resultado') {
    return (
      <QuestoesResultado
        questoes={questoesTreino} respostas={respostas} isMobile={isMobile}
        onVoltar={() => { setView('hub'); setRespostas([]); }}
      />
    );
  }
  return (
    <QuestoesHub
      isMobile={isMobile}
      onIniciarTreino={(qs, modo) => { setQuestoesTreino(qs); setModoTreino(modo); setView('resolver'); }}
    />
  );
}

Object.assign(window, { QuestoesScreen, QUESTOES_MOCK });
