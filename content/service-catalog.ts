import approaches from "./seller-approaches.json";

type Service = { name: string; text: string; href: string; status?: string };
export const serviceGroups: { id: string; name: string; icon: string; text: string; services: Service[] }[] = [
  { id: "financeiro", name: "Financeiro e tributos", icon: "bank", text: "Entenda cobranças, confira valores e organize sua documentação financeira.", services: [
    { name: "Cobranças indevidas · Caso Itaú", text: "Localize seguros e tarifas não reconhecidos em faturas e extratos e organize as evidências em um relatório técnico.", href: "/analise-cobrancas-indevidas" },
    { name: "Dívidas bancárias", text: "Confira contratos, juros, tarifas e evolução do saldo para apoiar a revisão da dívida e a negociação com o banco.", href: "/servicos/dividas-bancarias" },
    { name: "Atualização financeira e cálculos judiciais", text: "Organize a atualização de valores e a memória de cálculo em um relatório para revisão e apoio ao processo.", href: "/servicos/laudos-de-processos-judiciais" },
    { name: "Contas de luz", text: "Confira consumo, tarifas e cobranças nas faturas de energia e reúna informações para solicitar uma revisão.", href: "/servicos/revisao-contas-de-luz" },
    { name: "Auditoria de importação", text: "Cruze documentos da operação, classificação fiscal e possíveis benefícios para apoiar a análise dos tributos da importação.", href: "/servicos/auditoria-de-importacao" },
  ] },
  { id: "beneficios", name: "Benefícios e direitos", icon: "person", text: "Conheça propostas de análise para seu histórico e seus documentos.", services: [
    { name: "Cotas antigas do PIS/PASEP", text: "Apoio a titulares e herdeiros na consulta de cotas antigas, organização de documentos e acompanhamento das etapas do pedido.", href: "/servicos/pis-pasep" },
    { name: "Isenção e restituição de IR", text: "Organize laudos e comprovantes para avaliar a isenção por moléstia grave em aposentadorias, pensões e situações previstas.", href: "/servicos/isencao-imposto-de-renda" },
    { name: "Auxílio-acidente", text: "Análise proposta do histórico previdenciário e das limitações após um acidente, com documentos e possíveis valores para avaliação.", href: "/servicos/auxilio-acidente", status: "Em desenvolvimento" },
  ] },
  { id: "imoveis", name: "Imóveis", icon: "house", text: "Mais contexto antes de comprar, consultar ou alugar.", services: [
    { name: "Análise do vendedor de imóvel", text: "Reúna certidões e documentos para conhecer quem está vendendo e identificar pontos de atenção antes de fechar negócio.", href: "/analise-de-vendedor" },
    { name: "Consulta Certidões do Imóvel", text: "Conheça os canais de pesquisa de informações imobiliárias e o escopo das consultas em validação.", href: "/servicos/consulta-de-imoveis", status: "Em homologação" },
    ...approaches.filter(p => p.slug === "analise-para-locacao").map(p => ({ name: p.title, text: p.description, href: `/servicos/${p.slug}` })),
  ] },
  { id: "negocios", name: "Pessoas e negócios", icon: "briefcase", text: "Documentos e registros para decisões sobre sociedades, contratos e parceiros.", services: approaches.filter(p => p.slug !== "analise-para-locacao").map(p => ({ name: p.title, text: p.description, href: `/servicos/${p.slug}` })) },
  { id: "saude", name: "Saúde e faturamento", icon: "file-earmark-text", text: "Informações organizadas para a equipe e para o cuidado.", services: [
    { name: "Auditoria de glosas", text: "Confira demonstrativos, contratos e autorizações para entender divergências e preparar relatórios e minutas de contestação.", href: "/servicos/auditoria-de-glosas", status: "Em desenvolvimento" },
    { name: "Laudos e exames", text: "Proposta para reunir informações de exames em uma linha do tempo e ajudar a preparar perguntas para o médico.", href: "/servicos/laudos-de-exames", status: "Em desenvolvimento" },
  ] },
  { id: "ia-e-educacao", name: "Inteligência artificial e educação", icon: "chat-left-text", text: "Apoio no dia a dia e novas formas de descobrir o mundo.", services: [
    { name: "Assistente IA Audita", text: "Converse, resuma documentos, organize ideias e encontre informações em textos, PDFs e imagens.", href: "https://app.auditainteligente.com.br/chat" },
    { name: "Audita Kids", text: "Uma jornada de jogos, descobertas e um álbum digital de figurinhas para aprender em família com Auditron.", href: "/servicos/audita-kids", status: "Em desenvolvimento" },
  ] },
  { id: "emissao-certidoes", name: "Emissão Certidões", icon: "file-earmark-text", text: "Documentos judiciais, fiscais e imobiliários organizados por tema e localidade.", services: [
    { name: "Emissão de certidões", text: "Confira o catálogo, os preços e as opções de emissão de certidões, com apoio da IA à leitura documental.", href: "/servicos/emissao-de-certidoes" },
  ] },
  { id: "emissao-processos-judiciais-nacionais", name: "Emissão e baixa Processos Judiciais", icon: "bank", text: "Cópias dos autos para consultar, organizar e encaminhar ao profissional responsável.", services: [
    { name: "Emissão e download de processos judiciais", text: "Conheça o futuro serviço para solicitar cópias dos documentos disponíveis de um processo em PDF, a partir do seu número.", href: "/servicos/emissao-processos-judiciais", status: "Em desenvolvimento" },
  ] },
];

