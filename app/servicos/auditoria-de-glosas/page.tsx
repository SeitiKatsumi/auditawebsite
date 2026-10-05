import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Auditoria de glosas com IA",
  description: "Entenda o que foi glosado, confira as evidências e prepare a contestação. Conheça a auditoria de glosas da IA Audita para clínicas, hospitais e equipes de faturamento.",
  alternates: { canonical: "https://auditainteligente.com.br/servicos/auditoria-de-glosas" },
};

export default function GlosasPage() {
  return <main className={s.page}>
    <section className={s.hero}>
      <Image src="/images/services/glosas-hero.png" alt="" fill priority sizes="100vw" className={s.heroImage}/>
      <div className={`${s.wrap} ${s.heroContent}`}>
      <div className={s.heroCopy}><p className={s.kicker}>IA Audita · Auditoria de glosas</p><span className={s.badge}>Em desenvolvimento</span>
        <h1>Seu atendimento foi prestado.<br/><em>O pagamento foi glosado?</em></h1>
        <p className={s.lead}>Transforme demonstrativos de glosas em uma análise clara, com evidências por item e minutas para contestação.</p>
        <p>A IA Audita cruza documentos de faturamento, contratos e autorizações para ajudar sua equipe a entender as divergências e preparar o próximo passo.</p>
        <div className={s.actions}><a className={s.button} href="#como-funciona">Conheça a auditoria <span aria-hidden="true">→</span></a><a href="#relatorio">Veja o que você recebe ↓</a></div>
        <p className={s.note}>Para clínicas, hospitais e equipes de faturamento. O módulo está em desenvolvimento e ainda não recebe documentos por este site.</p>
      </div>
      </div><small className={s.imageCaption}>Imagem ilustrativa gerada por IA.</small>
    </section>

    <div className={`${s.wrap} ${s.strip}`}><span>Identifique a divergência</span><span>Confira a evidência</span><span>Prepare a contestação</span><span>Previna a recorrência</span></div>

    <section className={s.section}><div className={`${s.wrap} ${s.grid}`}>
      <div><p className={s.kicker}>Uma análise que conecta os pontos</p><h2>Do valor glosado<br/><em>ao documento que explica.</em></h2><p className={s.lead}>Veja como a conferência organiza o lote e destaca o que precisa da atenção da sua equipe.</p><p>O exemplo ao lado mostra a ligação entre valores, motivos e evidências, com as pendências separadas para revisão.</p></div>
      <div className={s.preview} aria-label="Exemplo fictício de conferência de glosas">
        <div className={s.previewTop}><span>IA AUDITA / GLOSAS</span><span className={s.dot}>Exemplo ilustrativo</span></div>
        <p className={s.kicker}>Da cobrança à evidência</p><h2>Cada item conta.<br/><em>Cada evidência também.</em></h2>
        <div className={s.metrics}><div><small>Faturado</small><strong>R$ 25.000</strong></div><div><small>Glosado</small><strong>R$ 4.500</strong></div><div><small>Índice de glosa</small><strong>18%</strong></div></div>
        <div className={s.item}><span className={s.tag}>Evidência localizada</span><h3>Autorização a conferir</h3><p>O demonstrativo aponta ausência de autorização. Há um documento para verificar o vínculo com a guia.</p><small>Autorização.pdf · página 1</small></div>
        <div className={s.item}><span className={s.pending}>Revisão necessária</span><h3>Divergência de valor</h3><p>Conferir a tabela e a vigência contratual antes de preparar o recurso.</p></div>
        <p className={s.note}>Valores fictícios. O montante glosado não é uma estimativa de recuperação.</p>
      </div>
    </div></section>

    <section className={s.section}><div className={s.wrap}><p className={s.kicker}>Mais clareza para o faturamento</p><div className={s.grid}><h2>Glosa é o valor que a operadora<br/><em>deixou de reconhecer.</em></h2><div><p>Pode envolver documentação, autorização, cobrança, regras do contrato ou questões assistenciais. Entender o motivo é o primeiro passo para decidir o que conferir, corrigir ou contestar.</p><p>A proposta é conectar o motivo informado às evidências disponíveis, separando divergências financeiras, pendências documentais e pontos que exigem avaliação especializada.</p></div></div>
      <div className={s.cards}>{[
        ["Administrativas", "Autorizações, identificação das guias, documentos e prazos previstos no contrato."],
        ["Técnicas e assistenciais", "Questões que precisam de documentação e revisão por profissional habilitado. A IA não decide a adequação clínica do atendimento."],
        ["Contratuais e de valores", "Diferenças de preços, tabelas, pacotes e condições negociadas com a operadora."],
      ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className={`${s.section} ${s.tint}`} id="como-funciona"><div className={s.wrap}><p className={s.kicker}>O fluxo do módulo</p><h2>Do demonstrativo de glosas<br/><em>à revisão do recurso.</em></h2><ol className={s.steps}>{[
      ["Reúna os documentos", "Demonstrativo de glosas em PDF ou XML, faturamento enviado e, quando disponíveis, contrato e autorizações. Utilize documentos anonimizados."],
      ["Confira a leitura da IA", "Revise guias, itens, motivos e valores extraídos. Consulte as referências ao arquivo e à página ou trecho de origem antes de confirmar."],
      ["Entenda as divergências", "Compare valores faturados, pagos e glosados. Uma diferença ainda não conciliada permanece separada, sem virar automaticamente uma glosa."],
      ["Revise o relatório e as minutas", "Prepare a contestação com as evidências disponíveis. Sua equipe confere fundamentos, documentos e prazos antes de qualquer envio à operadora."],
    ].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className={s.section} id="relatorio"><div className={s.wrap}><p className={s.kicker}>O que você recebe</p><h2>Uma visão do lote.<br/><em>Um caminho para cada item.</em></h2><div className={s.cards}>{[
      ["Resumo financeiro", "Valores faturados, pagos e glosados organizados para enxergar o impacto e as diferenças a conciliar."],
      ["Conferência por item", "Guia, motivo da glosa, evidências encontradas e pendências que merecem atenção da equipe."],
      ["Relatório em PDF", "Análise preliminar organizada para compartilhar com os responsáveis pela revisão do faturamento."],
      ["Minutas de contestação", "Textos de apoio associados às evidências, sujeitos à conferência profissional antes do protocolo."],
      ["Rastreabilidade documental", "Referências que ajudam a voltar ao documento original e verificar a informação usada na análise."],
      ["Pontos para prevenção", "Inconsistências que ajudam a equipe a revisar suas rotinas e evitar que o mesmo problema se repita."],
    ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={`${s.section} ${s.tint}`}><div className={`${s.wrap} ${s.grid}`}><div><p className={s.kicker}>Além da contestação</p><h2>A próxima glosa pode começar<br/><em>no mesmo problema.</em></h2><p className={s.lead}>Use os achados para melhorar a rotina entre recepção, faturamento e equipe assistencial.</p></div><ul className={s.list}><li><h3>Autorizações e documentação</h3><p>Reforce a conferência dos documentos e do vínculo com as guias antes de faturar.</p></li><li><h3>Tabelas e contratos</h3><p>Revise versões, vigências e condições negociadas para reduzir divergências de cobrança.</p></li><li><h3>Revisão com a equipe responsável</h3><p>Encaminhe dúvidas assistenciais para avaliação profissional e organize pendências antes do recurso.</p></li></ul></div></section>

    <section className={s.section}><div className={`${s.wrap} ${s.grid}`}><div><p className={s.kicker}>Perguntas frequentes</p><h2>Entenda a proposta<br/><em>antes de começar.</em></h2></div><div className={s.faq}>{[
      ["O módulo já está disponível para contratação?", "O módulo está em desenvolvimento. Esta página apresenta a proposta; a disponibilidade comercial e as condições de acesso serão informadas quando o serviço for liberado."],
      ["Quais documentos fazem parte da análise?", "Demonstrativos de glosas em PDF ou XML, documentos de faturamento, contratos e autorizações. Os arquivos devem ser anonimizados, sem nomes, CPF, carteirinhas ou prontuários completos."],
      ["A IA decide se uma glosa é indevida?", "A IA apoia a conferência documental e aponta divergências e evidências. A conclusão exige revisão dos documentos, do contrato e, quando necessário, de profissional habilitado."],
      ["O recurso é enviado automaticamente?", "Não. O fluxo prepara relatório e minutas para revisão. A equipe responsável confere o material e realiza o protocolo no canal da operadora."],
      ["Existe garantia de recuperação de valores?", "Não. O resultado depende dos documentos, das condições contratuais, da análise do caso e da resposta da operadora. O valor glosado não representa um valor garantido a receber."],
      ["Há integração automática com ERP ou prontuário?", "A proposta apresentada aqui parte dos documentos fornecidos. Integrações com ERP e prontuário eletrônico não são anunciadas como disponíveis."],
    ].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>

    <section className={s.closing}><div className={s.wrap}><span className={s.badge}>Em desenvolvimento</span><h2>Menos informação dispersa.<br/><em>Mais clareza para agir sobre as glosas.</em></h2><p>Conheça as soluções da IA Audita enquanto preparamos este novo módulo.</p><Link className={s.button} href="/#servicos">Conhecer outras soluções →</Link></div></section>
    <footer className={s.footer}><div className={s.wrap}><Link href="/">IA Audita</Link><p>Inteligência para as decisões da vida.</p><nav aria-label="Links institucionais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></footer>
  </main>;
}
