import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import s from "./page.module.css";

const title = "Audita Kids — A jornada dos detetives";
const description = "Conheça o universo planejado do Audita Kids: aventuras com Auditron, descobertas pelo mundo, missões ambientais e um álbum de figurinhas para aprender em família. Em desenvolvimento.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://auditainteligente.com.br/servicos/audita-kids" },
  openGraph: { title, description, url: "https://auditainteligente.com.br/servicos/audita-kids" },
  twitter: { title, description },
};

const worlds = [
  ["01", "Brasil", "Natureza, cultura e biodiversidade."],
  ["02", "Américas", "Paisagens, ciência e descobertas."],
  ["03", "Europa", "História, arte e patrimônio."],
  ["04", "África", "Culturas, ciência e natureza."],
  ["05", "Ásia", "Inovação e diversidade cultural."],
  ["06", "Oceania", "Ilhas, oceanos e exploração."],
  ["07", "Oceanos", "Vida marinha e preservação."],
  ["08", "Grandes paisagens", "Florestas, montanhas e desertos."],
  ["09", "Futuro", "Robótica, invenções e inteligência artificial."],
  ["10", "Espaço", "Uma grande aventura além da Terra."],
];
const questions = [
  ["Já posso acessar o Audita Kids?", "Ainda não. O Audita Kids está em desenvolvimento e não está disponível no aplicativo. Esta página apresenta a proposta do produto; não há inscrições, assinaturas ou envio de fotos por aqui. A data de lançamento ainda não foi anunciada."],
  ["Para qual idade será indicado?", "A proposta é voltada a crianças, com atividades adaptadas à idade e participação dos responsáveis. As faixas etárias e os critérios de acesso serão informados antes do lançamento."],
  ["Como a inteligência artificial fará parte da aventura?", "O projeto prevê histórias personalizadas, pistas do Auditron e adaptação de desafios. Os recursos de IA serão desenvolvidos com moderação e controles dos responsáveis; sua disponibilidade dependerá da versão e do plano."],
  ["Como serão as recompensas?", "A proposta prevê figurinhas, medalhas, itens de avatar e experiências digitais. A progressão deverá valorizar missões, conhecimento e criatividade, sem conceder pontos por compras ou apenas por tempo de jogo. Não são prometidos prêmios em dinheiro ou viagens físicas."],
  ["Quais serão os planos?", "Estão previstos Detetive, Superdetetive e Guardião do Mundo, com diferentes níveis de acesso a mundos, missões e recursos. Preços, conteúdo de cada plano e condições de assinatura ainda serão divulgados."],
];

export default function AuditaKidsPage() {
  return <main className={s.page} data-service="audita-kids">
    <section className={s.hero}>
      <Image className={s.heroBackground} src="/images/services/audita-kids-hero.png" alt="" fill priority sizes="100vw"/>
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div>
          <p className={s.eyebrow}>Audita <span>Kids</span> · A jornada dos detetives</p>
          <p className={s.status}>Em desenvolvimento</p>
          <h1>O mundo inteiro<br/>é uma <em>missão.</em></h1>
          <p className={s.lead}>Uma nova aventura da IA Audita para crianças curiosas. Jogos, descobertas pelo mundo e um álbum digital de 500 figurinhas para colecionar — com a natureza e a família fazendo parte da jornada.</p>
          <div className={s.actions}><a className={s.button} href="#jornada">Conheça a aventura <span aria-hidden="true">↓</span></a><a href="#album">Conheça o álbum de figurinhas →</a><a href="#familia">Para mães, pais e responsáveis →</a></div>
          <p className={s.note}>Ainda não disponível no aplicativo. Conheça o que estamos preparando.</p>
        </div>

      </div>
    </section>
    <div className={`${s.wrap} ${s.stats}`} aria-label="Dimensão planejada da primeira jornada"><div><strong>10</strong><span>grandes mundos</span></div><div><strong>100</strong><span>fases na proposta inicial</span></div><div><strong>500</strong><span>figurinhas para descobrir</span></div><p>Uma jornada planejada para crescer.<br/>Conteúdo e etapas sujeitos ao desenvolvimento.</p></div>
    <section className={`${s.wrap} ${s.section}`} id="jornada">
      <p className={s.eyebrow}>Pequenos detetives. Grandes descobertas.</p>
      <h2>Aprender pode ser<br/><em>uma grande aventura.</em></h2>
      <p className={s.intro}>A criança começa como Detetive Aprendiz. Cada destino traz histórias, desafios e algo novo para conhecer, valorizar e preservar. O álbum acompanha essa evolução.</p>
      <ol className={s.steps}>
        <li><span>01</span><h3>Explore um destino</h3><p>Conheça culturas, animais, paisagens e invenções em um mapa-múndi interativo planejado para a jornada.</p></li>
        <li><span>02</span><h3>Desvende a missão</h3><p>Resolva enigmas, crie e descubra com as pistas de Auditron, o guia da aventura.</p></li>
        <li><span>03</span><h3>Registre a conquista</h3><p>Conquiste figurinhas e medalhas, complete o álbum e avance para novas descobertas.</p></li>
      </ol>
    </section>
    <section className={s.band} id="auditron"><div className={`${s.wrap} ${s.split}`}>
      <Image className={s.auditron} src="/images/services/auditron-personagem.png" alt="Auditron, o guardião do conhecimento e da justiça: herói de máscara azul, armadura azul e dourada e capa, sorrindo e estendendo a mão em um convite à aventura." width={1024} height={1536} sizes="(max-width: 760px) calc(100vw - 40px), 367px"/>
      <div><p className={s.eyebrow}>Conheça Auditron</p><h2>Um guardião.<br/><em>Mil motivos para perguntar.</em></h2><blockquote className={s.auditronQuote}>“Atenção, detetive! Uma nova missão foi descoberta!”</blockquote><p>Auditron será o guardião do conhecimento e da justiça: um personagem para apresentar países, contar histórias, oferecer pistas e celebrar as conquistas. A proposta combina esse guia com IA para adaptar histórias e desafios à jornada.</p></div>
    </div></section>
    <section className={`${s.wrap} ${s.section}`} id="mundos">
      <p className={s.eyebrow}>Um mapa de possibilidades</p><h2>Do nosso Brasil<br/><em>à imensidão do espaço.</em></h2>
      <p className={s.intro}>Dez experiências previstas para descobrir o que cada lugar tem de especial, com respeito às culturas e à diversidade do planeta.</p>
      <div className={s.worlds}>{worlds.map(([number, name, text]) => <article key={name}><span>{number}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className={s.environment}><div className={`${s.wrap} ${s.split}`}>
      <div><p className={s.eyebrow}>Missão Guardião da Natureza</p><h2>Conhecer o mundo.<br/><em>Aprender a cuidar dele.</em></h2><p className={s.intro}>Água, florestas, oceanos e biodiversidade farão parte das missões. A descoberta continua fora da tela, com atividades apropriadas à idade e participação da família.</p></div>
      <div className={s.mission}><p className={s.eyebrow}>Uma ideia de missão em família</p><h3>Detetives da natureza</h3><ol><li>Observe uma planta perto de você, com um responsável.</li><li>Desenhe o que encontrou e pesquise do que ela precisa para viver.</li><li>Compartilhe a descoberta com sua família.</li></ol><p>No jogo planejado, o responsável poderá validar atividades do mundo real para liberar conquistas.</p></div>
    </div></section>
    <section className={`${s.wrap} ${s.section}`} id="album">
      <div className={s.split}>
        <figure className={s.albumVisual}><Image src="/images/services/audita-kids-album.png" alt="Ilustração de um álbum Audita Kids aberto, com espaços numerados e figurinhas de animais, natureza, espaço e Auditron." width={1254} height={1254} sizes="(max-width: 760px) calc(100vw - 40px), 550px"/><figcaption>Ilustração conceitual do álbum digital. O visual final do aplicativo poderá ser diferente.</figcaption></figure>
        <div><p className={s.eyebrow}>O álbum de figurinhas Audita Kids</p><h2>500 figurinhas.<br/><em>Um mundo de descobertas.</em></h2><p className={s.intro}>Um álbum digital e interativo para registrar a jornada de cada detetive. A proposta é transformar missões, desafios e descobertas em uma coleção que cresce junto com a criança.</p><p className={s.intro}>Cada figurinha terá seu número, categoria, mundo e fase de origem, além de uma descrição educativa. Animais, culturas, paisagens, ciência e invenções ganham um lugar nessa história.</p><p className={s.note}>Coleção prevista para a primeira temporada. O álbum está em desenvolvimento; não se trata de um produto impresso à venda.</p></div>
      </div>
      <div className={s.steps}>
        <article><h3>Conquiste nas missões</h3><p>A criança poderá receber figurinhas ao concluir fases e desafios. No álbum, acompanhará os itens conquistados e os espaços que ainda faltam completar.</p></article>
        <article><h3>Descubra e evolua</h3><p>Estão previstas figurinhas comuns, especiais, brilhantes, holográficas, animadas, sonoras e lendárias. Alguns itens poderão evoluir conforme a progressão e as conquistas.</p></article>
        <article><h3>Complete em família</h3><p>Após as 499 primeiras, a proposta prevê a figurinha lendária nº 500: Família Super-Auditora. Com autorização dos responsáveis, uma imagem da família poderá dar origem a uma representação artística no universo Audita Kids.</p></article>
      </div>
    </section>
    <section className={s.band} id="familia"><div className={s.wrap}>
      <p className={s.eyebrow}>A família faz parte da equipe</p><h2>Descobertas para as crianças.<br/><em>Participação para os responsáveis.</em></h2>
      <div className={s.steps}><article><h3>Acompanhar de perto</h3><p>O painel planejado permitirá acompanhar o progresso, as conquistas e validar missões feitas fora da tela.</p></article><article><h3>Definir permissões</h3><p>Controles sobre a conta e os recursos de IA estão previstos para os responsáveis participarem da experiência.</p></article><article><h3>Cuidar desde o início</h3><p>Privacidade, uso mínimo de dados e moderação das interações são requisitos do projeto em desenvolvimento.</p></article></div>
    </div></section>
    <section className={`${s.wrap} ${s.section} ${s.split}`} id="duvidas"><div><p className={s.eyebrow}>Antes da primeira missão</p><h2>O que sua família<br/><em>precisa saber.</em></h2></div><div className={s.faq}>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className={s.closing}><div className={s.wrap}><p className={s.eyebrow}>Audita Kids · Em desenvolvimento</p><h2>A próxima grande descoberta<br/>começa com <em>curiosidade.</em></h2><p>Estamos preparando a jornada dos detetives.<br/>O lançamento e as condições de acesso serão divulgados futuramente.</p><Link className={s.button} href="/#servicos">Conheça as soluções da IA Audita <span aria-hidden="true">→</span></Link></div></section>
    <footer className={`${s.wrap} ${s.footer}`}><Link href="/">IA Audita <span>Kids</span></Link><p>O mundo inteiro é uma missão.</p><nav aria-label="Links institucionais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></footer>
  </main>;
}
