import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Identificação do Titular",
    blocks: [
      { type: "p", content: "O website www.xoks.pt é propriedade de:" },
      { type: "p", content: "XOK'S\nTitular: Patrício Manuel Correia Gomes\nNIF: 223104990\nMorada: Rua das Antas, n.º 360, Medelo, 4820-491 Fafe, Portugal\nEmail: xokscarbon@gmail.com" },
      { type: "p", content: "Ao navegar neste website ou efetuar uma encomenda, o utilizador declara ter lido, compreendido e aceite os presentes Termos e Condições." },
    ],
  },
  {
    title: "Objeto",
    blocks: [{ type: "p", content: "Os presentes Termos e Condições regulam a utilização do website www.xoks.pt e a compra de produtos comercializados pela XOK'S." }],
  },
  {
    title: "Produtos",
    blocks: [
      { type: "p", content: "A XOK'S dedica-se ao desenvolvimento e fabrico de caneleiras de futebol em fibra de carbono e outros produtos relacionados." },
      { type: "p", content: "As fotografias apresentadas no website são meramente ilustrativas. Poderão existir pequenas diferenças de tonalidade, acabamento ou textura entre o produto apresentado e o produto entregue." },
    ],
  },
  {
    title: "Produtos Personalizados",
    blocks: [
      { type: "p", content: "Grande parte dos produtos vendidos pela XOK'S é fabricada por encomenda e personalizada de acordo com as especificações fornecidas pelo cliente." },
      { type: "p", content: "Por esse motivo:" },
      { type: "ul", content: ["Cada produto é produzido exclusivamente para o respetivo cliente.", "Após o início da produção, a encomenda não poderá ser alterada ou cancelada.", "Produtos personalizados não podem ser revendidos a terceiros."] },
    ],
  },
  {
    title: "Preços",
    blocks: [
      { type: "p", content: "Todos os preços apresentados encontram-se em euros (€)." },
      { type: "p", content: "Os preços poderão ser alterados sem aviso prévio, não afetando encomendas já confirmadas." },
    ],
  },
  {
    title: "Formas de Pagamento",
    blocks: [
      { type: "p", content: "São aceites os seguintes métodos de pagamento:" },
      { type: "ul", content: ["MB Way", "PayPal", "Multibanco"] },
      { type: "p", content: "A produção apenas será iniciada após confirmação do pagamento." },
    ],
  },
  {
    title: "Produção e Entrega",
    blocks: [
      { type: "p", content: "Todos os produtos são produzidos após confirmação da encomenda." },
      { type: "p", content: "O prazo médio de fabrico e entrega é de até 10 dias úteis, podendo sofrer alterações em períodos de maior procura, feriados, dificuldades no fornecimento de matérias-primas ou situações alheias ao controlo da XOK'S." },
      { type: "p", content: "As entregas são efetuadas através dos CTT ou da DHL." },
    ],
  },
  {
    title: "Custos de Envio",
    blocks: [{ type: "p", content: "Os custos de envio são calculados automaticamente durante o processo de compra e apresentados antes da confirmação da encomenda." }],
  },
  {
    title: "Receção da Encomenda",
    blocks: [
      { type: "p", content: "O cliente deverá verificar o estado da embalagem no momento da entrega." },
      { type: "p", content: "Caso existam danos visíveis, deverá comunicá-los imediatamente ao transportador e contactar a XOK'S logo que possível." },
    ],
  },
  {
    title: "Direito de Livre Resolução",
    blocks: [
      { type: "p", content: "Nos termos da legislação aplicável, o direito de livre resolução de 14 dias não é aplicável aos produtos fabricados segundo especificações do consumidor ou claramente personalizados." },
      { type: "p", content: "Como as caneleiras comercializadas pela XOK'S são produzidas por encomenda e personalizadas, não é possível a devolução por simples mudança de opinião." },
      { type: "p", content: "Esta limitação não prejudica os direitos legais do consumidor em caso de produto defeituoso, danificado ou não conforme." },
    ],
  },
  {
    title: "Garantia",
    blocks: [
      { type: "p", content: "Todos os produtos beneficiam da garantia legal prevista na legislação portuguesa para defeitos de fabrico." },
      { type: "p", content: "A garantia não cobre:" },
      { type: "ul", content: ["desgaste normal;", "utilização incorreta;", "impactos ou acidentes;", "modificações efetuadas pelo cliente;", "utilização diferente da finalidade prevista."] },
    ],
  },
  {
    title: "Propriedade Intelectual",
    blocks: [
      { type: "p", content: "Todo o conteúdo presente no website, incluindo textos, fotografias, logótipos, ilustrações, modelos 3D, vídeos e elementos gráficos, é propriedade da XOK'S ou utilizado mediante autorização." },
      { type: "p", content: "É proibida qualquer reprodução total ou parcial sem autorização escrita." },
    ],
  },
  {
    title: "Proteção de Dados",
    blocks: [{ type: "p", content: "Os dados pessoais são tratados em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e com a Política de Privacidade disponível no website." }],
  },
  {
    title: "Resolução de Litígios",
    blocks: [{ type: "p", content: "Em caso de litígio de consumo, o consumidor poderá recorrer a uma entidade de Resolução Alternativa de Litígios (RAL), nos termos da legislação em vigor." }],
  },
  {
    title: "Lei Aplicável",
    blocks: [
      { type: "p", content: "Os presentes Termos e Condições são regidos pela legislação portuguesa." },
      { type: "p", content: "Qualquer litígio será apreciado pelos tribunais portugueses competentes, sem prejuízo dos direitos legalmente reconhecidos aos consumidores." },
    ],
  },
];

export default function Termos() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Termos e Condições de Venda"
      accentWord="Condições"
      lastUpdated="2 de julho de 2026"
      intro="Condições aplicáveis à utilização do website e à compra de produtos XOK'S."
      sections={sections}
      testid="termos-page"
    />
  );
}
