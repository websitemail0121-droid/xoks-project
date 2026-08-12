import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Objetivo",
    blocks: [
      { type: "p", content: "A presente Política de Devoluções e Reembolsos estabelece as condições aplicáveis às compras efetuadas no website www.xoks.pt, propriedade da XOK'S." },
      { type: "p", content: "Ao efetuar uma compra, o cliente declara ter lido e aceite esta política." },
    ],
  },
  {
    title: "Produtos Fabricados por Encomenda",
    blocks: [
      { type: "p", content: "Todos os produtos comercializados pela XOK'S são fabricados após confirmação da encomenda e personalizados de acordo com as especificações escolhidas pelo cliente." },
      { type: "p", content: "Por esta razão, cada produto é produzido exclusivamente para o respetivo comprador." },
    ],
  },
  {
    title: "Direito de Livre Resolução",
    blocks: [
      { type: "p", content: "Nos termos da legislação portuguesa aplicável aos contratos celebrados à distância, o consumidor dispõe, em regra, de um prazo de 14 dias para resolver o contrato." },
      { type: "p", content: "Contudo, esse direito não se aplica aos bens produzidos de acordo com as especificações do consumidor ou claramente personalizados." },
      { type: "p", content: "Assim, uma vez iniciada a produção da encomenda:" },
      { type: "ul", content: ["não são aceites devoluções por mudança de opinião;", "não são aceites cancelamentos após o início da produção;", "não são efetuados reembolsos por motivos relacionados com preferências pessoais do cliente."] },
    ],
  },
  {
    title: "Alterações ou Cancelamento da Encomenda",
    blocks: [
      { type: "p", content: "O cliente poderá solicitar alterações ou o cancelamento apenas enquanto a produção não tiver sido iniciada." },
      { type: "p", content: "Após o início da produção, a encomenda será considerada definitiva." },
    ],
  },
  {
    title: "Produto Defeituoso ou Não Conforme",
    blocks: [
      { type: "p", content: "Caso o cliente receba um produto:" },
      { type: "ul", content: ["com defeito de fabrico;", "danificado durante o transporte;", "diferente do produto encomendado;"] },
      { type: "p", content: "deverá contactar a XOK'S no mais curto prazo possível, preferencialmente até 48 horas após a receção da encomenda, enviando:" },
      { type: "ul", content: ["número da encomenda;", "descrição do problema;", "fotografias claras do produto e da embalagem."] },
      { type: "p", content: "Após análise da situação, a XOK'S poderá optar por:" },
      { type: "ul", content: ["reparar o produto;", "substituir o produto;", "proceder ao reembolso, quando legalmente aplicável."] },
    ],
  },
  {
    title: "Condições para Aceitação de Reclamações",
    blocks: [
      { type: "p", content: "As reclamações apenas poderão ser aceites quando o produto:" },
      { type: "ul", content: ["não tenha sido alterado pelo cliente;", "não apresente sinais de utilização indevida;", "não tenha sofrido impactos, acidentes ou danos provocados por utilização incorreta."] },
    ],
  },
  {
    title: "Exclusões da Garantia",
    blocks: [
      { type: "p", content: "A garantia não cobre:" },
      { type: "ul", content: ["desgaste normal decorrente da utilização;", "riscos superficiais;", "danos provocados por quedas;", "utilização inadequada;", "modificações efetuadas pelo cliente;", "danos causados por manutenção incorreta."] },
    ],
  },
  {
    title: "Reembolsos",
    blocks: [
      { type: "p", content: "Sempre que exista lugar a reembolso, este será efetuado através do mesmo método de pagamento utilizado na compra, salvo acordo diferente entre as partes." },
      { type: "p", content: "O reembolso será processado após confirmação da situação que lhe deu origem." },
    ],
  },
  {
    title: "Custos de Devolução",
    blocks: [
      { type: "p", content: "Quando a devolução resulte de erro imputável à XOK'S ou de defeito do produto, os custos de transporte serão suportados pela XOK'S." },
      { type: "p", content: "Nos restantes casos em que a devolução seja legalmente admissível, os custos de envio poderão ficar a cargo do cliente." },
    ],
  },
  {
    title: "Contactos",
    blocks: [{ type: "p", content: "Para qualquer questão relacionada com devoluções ou reclamações, contacte:\nXOK'S\nTitular: Patrício Manuel Correia Gomes\nEmail: xokscarbon@gmail.com" }],
  },
];

export default function Devolucoes() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Devoluções e Reembolsos"
      accentWord="Devoluções"
      lastUpdated="2 de julho de 2026"
      intro="Condições aplicáveis a devoluções, trocas e reembolsos de produtos XOK'S."
      sections={sections}
      testid="devolucoes-page"
    />
  );
}
