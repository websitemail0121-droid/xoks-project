import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Identificação",
    blocks: [
      { type: "p", content: "O presente website, www.xoks.pt, é propriedade de:" },
      { type: "p", content: "XOK'S\nTitular: Patrício Manuel Correia Gomes\nNIF: 223104990\nMorada: Rua das Antas, n.º 360, Medelo, 4820-491 Fafe, Portugal\nEmail: xokscarbon@gmail.com" },
    ],
  },
  {
    title: "Objeto",
    blocks: [{ type: "p", content: "O website www.xoks.pt destina-se à apresentação e comercialização de caneleiras de futebol em fibra de carbono e respetivos acessórios." }],
  },
  {
    title: "Utilização do Website",
    blocks: [
      { type: "p", content: "Ao navegar neste website, o utilizador compromete-se a:" },
      { type: "ul", content: ["Utilizar o website de forma lícita;", "Não praticar atos que comprometam o funcionamento da plataforma;", "Não tentar aceder a áreas restritas sem autorização;", "Não introduzir vírus ou qualquer outro código malicioso."] },
      { type: "p", content: "A XOK'S reserva-se o direito de restringir ou impedir o acesso de utilizadores que violem estas condições." },
    ],
  },
  {
    title: "Propriedade Intelectual",
    blocks: [
      { type: "p", content: "Todo o conteúdo presente neste website é propriedade da XOK'S ou utilizado mediante autorização dos respetivos titulares. Inclui, entre outros:" },
      { type: "ul", content: ["Logótipo;", "Nome comercial;", "Fotografias;", "Vídeos;", "Modelos 3D;", "Descrições dos produtos;", "Textos;", "Design do website;", "Elementos gráficos."] },
      { type: "p", content: "É proibida qualquer reprodução, distribuição, modificação ou utilização sem autorização prévia e por escrito." },
    ],
  },
  {
    title: "Marcas",
    blocks: [{ type: "p", content: "A designação XOK'S, o respetivo logótipo e outros sinais distintivos utilizados neste website constituem elementos identificativos da marca e não podem ser utilizados sem autorização." }],
  },
  {
    title: "Limitação de Responsabilidade",
    blocks: [
      { type: "p", content: "A XOK'S procura manter toda a informação atualizada e correta. No entanto, não garante que:" },
      { type: "ul", content: ["o website esteja permanentemente disponível;", "não existam erros tipográficos;", "todas as imagens reproduzam exatamente o produto final;", "não ocorram interrupções técnicas."] },
      { type: "p", content: "A XOK'S não será responsável por danos resultantes de falhas técnicas, interrupções de serviço ou utilização indevida do website." },
    ],
  },
  {
    title: "Ligações Externas",
    blocks: [{ type: "p", content: "O website poderá conter ligações para websites de terceiros. A XOK'S não controla nem assume responsabilidade pelos conteúdos, políticas ou práticas desses websites." }],
  },
  {
    title: "Alterações",
    blocks: [
      { type: "p", content: "A XOK'S reserva-se o direito de alterar:" },
      { type: "ul", content: ["conteúdos;", "preços;", "produtos;", "campanhas;", "condições comerciais;", "documentos legais,"] },
      { type: "p", content: "sem necessidade de aviso prévio, salvaguardando os direitos dos consumidores relativamente às encomendas já confirmadas." },
    ],
  },
  {
    title: "Proteção de Dados",
    blocks: [{ type: "p", content: "O tratamento de dados pessoais é efetuado de acordo com a Política de Privacidade disponível neste website e em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD)." }],
  },
  {
    title: "Lei Aplicável",
    blocks: [
      { type: "p", content: "O presente Aviso Legal rege-se pela legislação portuguesa." },
      { type: "p", content: "Qualquer litígio será submetido aos tribunais portugueses competentes, sem prejuízo dos direitos conferidos aos consumidores pela legislação em vigor." },
    ],
  },
  {
    title: "Contactos",
    blocks: [{ type: "p", content: "Para qualquer questão relacionada com este website, poderá contactar:\nXOK'S\nEmail: xokscarbon@gmail.com" }],
  },
];

export default function AvisoLegal() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Aviso Legal"
      accentWord="Legal"
      lastUpdated="2 de julho de 2026"
      intro="Identificação do titular, propriedade intelectual e condições de utilização do website."
      sections={sections}
      testid="aviso-legal-page"
    />
  );
}
