import type { Metadata } from "next";
import Link from "next/link";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Emissão e download de processos judiciais",
  description: "Conheça o futuro serviço da IA Audita para solicitar cópias de processos judiciais em PDF pelo número do processo. Módulo em desenvolvimento.",
  alternates: { canonical: "https://auditainteligente.com.br/servicos/emissao-processos-judiciais" },
};

const steps = [
  ["Informe o número do processo", "O ponto de partida será o número de identificação do processo, preferencialmente no padrão CNJ. Confira a numeração e o tribunal de origem."],
  ["Confira a disponibilidade", "A proposta é verificar o acesso aos autos e informar as condições da solicitação. A disponibilidade dependerá do tribunal, do sistema e das permissões aplicáveis."],
  ["Confirme sua solicitação", "Antes de confirmar, você poderá conferir o escopo da cópia, o preço e a previsão de entrega apresentados para aquele pedido."],
  ["Receba os documentos em PDF", "Quando a obtenção for concluída, a proposta é disponibilizar os arquivos para download, com identificação do processo e indicação de eventuais documentos indisponíveis."],
];
const questions = [
  ["Já posso solicitar um processo?", "Ainda não. O serviço está em desenvolvimento. Esta página apresenta o funcionamento previsto; as solicitações serão abertas após a validação do módulo."],
  ["O que significa emissão e baixa de processos?", "Neste serviço, significa obter uma cópia dos documentos e baixar os arquivos. Não significa abrir uma ação, emitir uma decisão judicial, encerrar ou dar baixa no processo perante o tribunal."],
  ["Será possível obter qualquer processo?", "A cobertura será informada no lançamento. Processos físicos, sistemas não integrados, documentos indisponíveis e restrições de acesso podem limitar o atendimento. Não há garantia de acesso a todos os tribunais ou a todos os autos."],
  ["E os processos em segredo de justiça?", "O serviço deverá respeitar as restrições de acesso e as autorizações exigidas. Informar um número de processo não concede acesso a documentos sigilosos."],
  ["Qual será o preço e o prazo?", "Valores, formas de contratação e prazos ainda serão definidos. As condições deverão ser apresentadas antes da confirmação de cada solicitação."],
  ["A cópia inclui uma análise jurídica?", "A proposta deste serviço é a obtenção dos documentos disponíveis. Pareceres, cálculos e análises jurídicas não estão incluídos automaticamente e dependerão de contratação e escopo próprios."],
];

export default function ProcessosPage() {
  return <main className={s.page}>
    <section className={s.hero}><div className={`${s.wrap} ${s.heroGrid}`}>
      <div><p className={s.kicker}>IA Audita · Documentos judiciais</p><span className={s.badge}>Em desenvolvimento</span>
        <h1>Seu processo.<br/>Seus documentos.<br/><em>Em um só lugar.</em></h1>
        <p className={s.lead}>Emissão e download de cópias de processos judiciais em PDF, a partir do número do processo.</p>
        <p>Estamos preparando um caminho mais simples para reunir os autos disponíveis, consultar as peças e organizar os documentos de que você precisa.</p>
        <div className={s.actions}><a className={s.button} href="#como-funciona">Conheça o futuro serviço <span aria-hidden="true">→</span></a><a href="#documentos">Veja os documentos previstos ↓</a></div>
        <p className={s.note}>Solicitações ainda não abertas. Cobertura, preços e prazos serão informados no lançamento.</p>
      </div>
      <div className={s.preview} aria-label="Ilustração do futuro serviço, sem consulta disponível">
        <div className={s.previewTop}><strong>IA AUDITA / PROCESSOS</strong><span>Prévia ilustrativa</span></div>
        <p className={s.kicker}>Do número aos documentos</p><h2>Uma referência.<br/><em>O histórico em mãos.</em></h2>
        <div className={s.number}><small>Número do processo · padrão CNJ</small><span>NNNNNNN-DD.AAAA.J.TR.OOOO</span></div>
        <div className={s.files}>{["Petição inicial e manifestações", "Decisões e despachos", "Sentenças e documentos anexos"].map((label, i) => <div key={label}><span className={s.fileIcon}>PDF</span><div><strong>{label}</strong><small>0{i + 1} · Conforme disponibilidade nos autos</small></div></div>)}</div>
        <div className={s.previewFoot}><span aria-hidden="true">↓</span><div><strong>Cópias para consultar e organizar</strong><small>Formato e composição sujeitos à validação do serviço.</small></div></div>
      </div>
    </div></section>
    <div className={`${s.wrap} ${s.strip}`}><span>Busca pelo número</span><span>Verificação de acesso</span><span>Documentos em PDF</span></div>

    <section className={s.section} id="documentos"><div className={s.wrap}><p className={s.kicker}>O que estamos preparando</p><h2>Os autos que você precisa.<br/><em>Mais facilidade para consultar.</em></h2><p className={s.intro}>A proposta é reunir as peças acessíveis do processo para apoiar a consulta documental por pessoas, empresas e profissionais.</p>
      <div className={s.cards}>{[
        ["Peças do processo", "Petições, manifestações, decisões e outros documentos disponíveis na origem, conforme o escopo informado na solicitação."],
        ["Arquivos para download", "Cópias em PDF para leitura, organização e compartilhamento com os profissionais responsáveis pelo seu caso."],
        ["Clareza sobre a entrega", "Identificação do processo e informação sobre limitações de acesso. Documentos indisponíveis não devem ser confundidos com documentos inexistentes."],
      ].map(([title, text], i) => <article key={title}><span className={s.index}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className={`${s.section} ${s.tint}`} id="como-funciona"><div className={s.wrap}><p className={s.kicker}>Como deverá funcionar</p><h2>Do pedido à cópia.<br/><em>Um passo de cada vez.</em></h2><ol className={s.steps}>{steps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className={s.section}><div className={`${s.wrap} ${s.split}`}><div><p className={s.kicker}>Para diferentes necessidades</p><h2>Documentos à mão<br/><em>para o próximo passo.</em></h2><p>Ter acesso às peças ajuda a preparar uma conversa, reunir informações e encaminhar documentos para quem vai avaliar o caso.</p></div><div className={s.audiences}>{[
      ["Pessoas e famílias", "Reunir os documentos de um processo para consulta e orientação com seu advogado."],
      ["Advogados e escritórios", "Apoiar a organização dos autos para estudo, revisão e trabalho da equipe."],
      ["Empresas e departamentos jurídicos", "Centralizar cópias para conferência documental e acompanhamento interno dos casos."],
    ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={`${s.section} ${s.tint}`}><div className={`${s.wrap} ${s.split}`}><div><p className={s.kicker}>Disponibilidade e acesso</p><h2>Cada tribunal.<br/><em>Cada condição de acesso.</em></h2></div><div><p>A cobertura dos sistemas judiciais será divulgada após os testes de integração. O acesso a cada documento dependerá da disponibilidade na origem e das permissões exigidas.</p><p><strong>“Baixa”, aqui, significa download dos arquivos.</strong> A solicitação de uma cópia não altera a situação do processo nem realiza qualquer protocolo no tribunal.</p><p className={s.note}>A IA Audita é uma iniciativa privada. Este serviço não é um portal oficial do Poder Judiciário e não substitui os canais dos tribunais.</p></div></div></section>

    <section className={s.section}><div className={s.wrap}><p className={s.kicker}>Perguntas frequentes</p><h2>Antes de solicitar,<br/><em>entenda o serviço.</em></h2><div className={s.faq}>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className={s.closing}><div className={s.wrap}><span className={s.badge}>Em breve na IA Audita</span><h2>Mais acesso à informação.<br/><em>Mais contexto para decidir.</em></h2><p>Enquanto preparamos este serviço, conheça as demais soluções da IA Audita.</p><Link className={s.button} href="/central-de-servicos">Explorar a Central de serviços <span aria-hidden="true">→</span></Link></div></section>
  </main>;
}
