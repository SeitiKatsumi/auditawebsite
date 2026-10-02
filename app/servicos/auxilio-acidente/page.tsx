import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import s from "./page.module.css";

const title = "Auxílio-acidente — Análise previdenciária";
const description = "Ficou com uma limitação após um acidente? Conheça a proposta da IA Audita para organizar documentos, avaliar indícios e simular possíveis valores de auxílio-acidente. Em desenvolvimento.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://auditainteligente.com.br/servicos/auxilio-acidente" },
  openGraph: { title, description, url: "https://auditainteligente.com.br/servicos/auxilio-acidente" },
  twitter: { title, description },
};
const inss = "https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-por-incapacidade/auxilio-acidente";
const stj = "https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/15072021-Auxilio-acidente-deve-comecar-no-dia-seguinte-ao-fim-do-auxilio-doenca-que-lhe-deu-origem.aspx";
const questions = [
  ["Ter pinos, placas ou parafusos garante o benefício?", "Não. O ponto central é uma sequela permanente que reduza a capacidade para o trabalho habitual, após a consolidação das lesões, além dos requisitos previdenciários. O material implantado, sozinho, não comprova esse direito."],
  ["Quem pode ser abrangido?", "Empregados urbanos ou rurais, empregados domésticos, trabalhadores avulsos e segurados especiais podem ser abrangidos, conforme os requisitos e as regras aplicáveis à época do acidente. Contribuintes individuais e facultativos não estão abrangidos por essa cobertura, segundo o INSS."],
  ["Posso receber mesmo trabalhando?", "O auxílio-acidente tem natureza indenizatória e pode ser recebido junto com a remuneração do trabalho. Isso não representa garantia de emprego. A acumulação com aposentadoria, em regra, não é permitida; situações específicas precisam de análise."],
  ["O valor é sempre R$ 810,50?", "Não. Na regra geral, o valor corresponde a 50% do salário de benefício, que é uma base previdenciária calculada para o segurado. Não equivale necessariamente ao salário atual e não existe um valor único para todas as pessoas."],
  ["Vou receber cinco anos de atrasados?", "Não automaticamente. É preciso estabelecer o início do benefício, examinar o histórico de requerimentos e pagamentos e aplicar as regras de prescrição. Quando houve auxílio-doença que deu origem ao auxílio-acidente, o Tema 862 do STJ fixa o início no dia seguinte à cessação, observada a prescrição quinquenal."],
  ["A IA vai aprovar meu benefício?", "Não. A proposta é apoiar a organização documental e a análise preliminar, com simulações e pontos para revisão. A avaliação médica e o reconhecimento do benefício cabem às instâncias competentes."],
  ["Já posso enviar meus documentos?", "Ainda não. O módulo está em desenvolvimento, sem recebimento de arquivos, contratação ou protocolo de pedidos nesta página. A data de lançamento e as condições de uso serão informadas quando estiver disponível."],
];

export default function AccidentBenefitPage() {
  return <main className={s.page} data-service="auxilio-acidente">
    <section className={s.hero}>
      <Image src="/images/services/auxilio-acidente-hero.png" alt="" fill priority sizes="100vw" className={s.heroImage}/>
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.kicker}>IA Audita · Análise de auxílio-acidente do INSS</p>
          <span className={s.badge}><span aria-hidden="true">●</span> Em desenvolvimento</span>
          <h1>Ficou com sequelas?<br/><em>Você pode ter direito ao auxílio-acidente.</em></h1>
          <p className={s.lead}>Uma limitação permanente após um acidente pode dar direito a uma indenização mensal do INSS, conforme os requisitos do benefício.</p>
          <p>A IA Audita está preparando uma análise do seu histórico previdenciário e documentos médicos para identificar pontos de atenção e estimar possíveis valores e atrasados. Ter pinos, placas ou parafusos, sozinho, não garante o direito.</p>
          <div className={s.actions}><a href="#proposta" className={s.button}>Conheça a análise <span aria-hidden="true">↗</span></a><a href="#beneficio">Entenda o benefício ↓</a></div>
          <p className={s.micro}>Em breve na plataforma. Ainda não recebemos documentos ou solicitações deste serviço.</p>
        </div>
      </div>
      <small className={s.imageCaption}>Imagem ilustrativa gerada por IA.</small>
    </section>

    <section className={s.section} id="beneficio"><div className={s.wrap}>
      <p className={s.kicker}>O que realmente importa</p><div className={s.split}><h2>Não é só a cirurgia.<br/><em>É o que mudou no seu trabalho.</em></h2><div><p>O auxílio-acidente é uma indenização previdenciária para situações em que uma sequela permanente reduz a capacidade de exercer o trabalho habitual.</p><p>A presença de um implante não comprova essa redução. É preciso olhar para a função exercida, a limitação e a situação previdenciária na época do acidente.</p><a className={s.textLink} href={inss} target="_blank" rel="noopener noreferrer">Consultar requisitos no INSS ↗</a></div></div>
      <div className={s.facts}>
        <article><span>01 / SEQUELA</span><h3>Limitação permanente</h3><p>O efeito das lesões sobre as atividades habituais precisa ser avaliado.</p></article>
        <article><span>02 / HISTÓRICO</span><h3>Vínculo e cobertura</h3><p>A categoria e a qualidade de segurado na época do acidente fazem parte da análise.</p></article>
        <article><span>03 / AVALIAÇÃO</span><h3>Cada caso é individual</h3><p>Documentos dão suporte à avaliação. Uma cirurgia não gera concessão automática.</p></article>
      </div>
    </div></section>

    <section className={`${s.section} ${s.valueSection}`} id="valores"><div className={`${s.wrap} ${s.split}`}>
      <div><p className={s.kicker}>Valor mensal e possíveis atrasados</p><h2>Seu histórico define a conta.<br/><em>Não uma promessa pronta.</em></h2><p>Na regra geral, o auxílio-acidente corresponde a 50% do salário de benefício. O valor depende da base previdenciária e das regras aplicáveis ao caso.</p><a className={s.textLink} href="https://www.gov.br/previdencia/pt-br/assuntos/previdencia-social/arquivos/aeps-2024/secao-i-beneficios/apresentacao-beneficios" target="_blank" rel="noopener noreferrer">Entenda a regra de cálculo ↗</a></div>
      <div className={s.valueCard}><p className={s.kicker}>Exemplo fictício · regra geral</p><div className={s.amount}><span>R$ 3.000</span><small>salário de benefício hipotético</small></div><div className={s.calculation}>× 50% <span aria-hidden="true">↓</span></div><div className={`${s.amount} ${s.result}`}><strong>R$ 1.500</strong><small>valor mensal neste exemplo</small></div><p className={s.micro}>Exemplo didático. Não é uma estimativa do seu caso nem do seu salário atual.</p></div>
    </div><div className={`${s.wrap} ${s.retroactive}`}><span className={s.largeNumber}>5<span>anos?</span></span><div><h3>Os atrasados exigem uma análise das datas.</h3><p>A referência aos últimos cinco anos está ligada à prescrição de parcelas, não a um pagamento garantido. Quando o auxílio-acidente decorre de auxílio-doença anterior, o STJ estabelece o início no dia seguinte à cessação, observada a prescrição quinquenal.</p><a className={s.textLink} href={stj} target="_blank" rel="noopener noreferrer">Consultar o Tema 862 do STJ ↗</a></div></div></section>

    <section className={s.section} id="proposta"><div className={s.wrap}>
      <p className={s.kicker}>O que estamos preparando</p><h2>Uma história espalhada em arquivos.<br/><em>Uma análise que conecta os pontos.</em></h2><p className={s.intro}>O futuro módulo reunirá organização documental, conferência de informações e simulações com premissas visíveis. Recursos e condições serão confirmados no lançamento.</p>
      <ol className={s.steps}>
        <li><span>01</span><div><h3>Reunir sua trajetória</h3><p>Questionário sobre profissão, acidente, limitações e benefícios anteriores, acompanhado dos documentos pertinentes.</p></div></li>
        <li><span>02</span><div><h3>Organizar as evidências</h3><p>Leitura assistida do CNIS e dos relatórios médicos para localizar datas, informações relevantes e lacunas, com referência aos documentos de origem.</p></div></li>
        <li><span>03</span><div><h3>Simular com critérios claros</h3><p>Estimativas de valores e períodos quando os dados forem suficientes, com memória de cálculo e questões que precisem de revisão.</p></div></li>
        <li><span>04</span><div><h3>Preparar o próximo passo</h3><p>Relatório preliminar para orientar a conversa com os profissionais responsáveis. A Audita não concede benefícios nem substitui perícia.</p></div></li>
      </ol>
    </div></section>

    <section className={`${s.section} ${s.documents}`} id="documentos"><div className={`${s.wrap} ${s.split}`}>
      <div><p className={s.kicker}>Prepare sua história</p><h2>Datas. Documentos.<br/><em>O contexto faz diferença.</em></h2><p>Estes são exemplos de documentos que podem ajudar na futura análise. Guarde-os com você: o módulo ainda não está recebendo arquivos.</p></div>
      <ul className={s.documentList}>{[
        ["CNIS e histórico profissional", "Vínculos e contribuições, com informações sobre a atividade exercida na época do acidente."],
        ["Relatórios e laudos médicos", "Histórico do tratamento e descrição das limitações funcionais, quando documentadas."],
        ["Documentos do INSS", "Cartas de concessão e cessação, decisões e memória de cálculo de benefícios anteriores, se houver."],
        ["Registros do acidente", "Documentos que ajudem a contextualizar o evento e suas datas; CAT, quando pertinente."],
      ].map(([heading, text]) => <li key={heading}><h3>{heading}</h3><p>{text}</p></li>)}</ul>
    </div></section>

    <section className={s.section} id="duvidas"><div className={`${s.wrap} ${s.split}`}><div><p className={s.kicker}>Perguntas frequentes</p><h2>Antes de criar expectativas,<br/><em>entenda os critérios.</em></h2></div><div className={s.faq}>{questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className={s.closing}><div className={s.wrap}><span className={s.badge}>Em desenvolvimento</span><h2>Mais informação.<br/><em>Um próximo passo mais claro.</em></h2><p>A análise de auxílio-acidente fará parte de uma nova frente da IA Audita. Enquanto preparamos o módulo, conheça as soluções do site.</p><Link href="/#servicos" className={s.button}>Conhecer outras soluções <span aria-hidden="true">→</span></Link></div></section>
    <footer className={s.footer}><div className={s.wrap}><Link href="/" className={s.brand}>IA Audita</Link><p>Informação para decisões mais conscientes.</p><nav aria-label="Links institucionais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></footer>
  </main>;
}
