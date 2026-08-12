import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Âmbito",
    blocks: [
      { type: "p", content: "A presente Política de Envios regula a produção, preparação, expedição e entrega das encomendas efetuadas através do website www.xoks.pt." },
      { type: "p", content: "Ao efetuar uma encomenda, o cliente declara que leu e aceita esta Política de Envios." },
    ],
  },
  {
    title: "Produção por Encomenda",
    blocks: [
      { type: "p", content: "Todos os produtos comercializados pela XOK'S são fabricados após a confirmação da encomenda e do respetivo pagamento." },
      { type: "p", content: "Cada produto é produzido de forma personalizada, de acordo com as especificações selecionadas pelo cliente." },
    ],
  },
  {
    title: "Prazo de Produção e Entrega",
    blocks: [
      { type: "p", content: "O prazo estimado para produção e entrega é de até 10 dias úteis, contados a partir da confirmação do pagamento." },
      { type: "p", content: "Este prazo é indicativo e poderá sofrer alterações em situações excecionais, incluindo:" },
      { type: "ul", content: ["elevado volume de encomendas;", "indisponibilidade temporária de matérias-primas;", "atrasos das transportadoras;", "feriados nacionais ou locais;", "situações de força maior."] },
      { type: "p", content: "Caso exista um atraso significativo, a XOK'S informará o cliente com a maior brevidade possível." },
    ],
  },
  {
    title: "Transportadoras",
    blocks: [
      { type: "p", content: "As encomendas são expedidas através de transportadoras parceiras, nomeadamente:" },
      { type: "ul", content: ["CTT;", "DHL."] },
      { type: "p", content: "A escolha da transportadora poderá variar consoante o destino, peso da encomenda ou critérios logísticos." },
    ],
  },
  {
    title: "Custos de Envio",
    blocks: [
      { type: "p", content: "Os custos de envio são calculados automaticamente durante o processo de compra e apresentados ao cliente antes da confirmação da encomenda." },
      { type: "p", content: "Eventuais campanhas de portes gratuitos serão devidamente identificadas no website." },
    ],
  },
  {
    title: "Acompanhamento da Encomenda",
    blocks: [{ type: "p", content: "Sempre que disponível, será enviado ao cliente um email com o código de rastreamento da encomenda, permitindo acompanhar o estado da entrega." }],
  },
  {
    title: "Morada de Entrega",
    blocks: [
      { type: "p", content: "É da responsabilidade do cliente fornecer uma morada completa e correta." },
      { type: "p", content: "A XOK'S não poderá ser responsabilizada por atrasos ou falhas de entrega resultantes de informações incorretas ou incompletas fornecidas pelo cliente." },
      { type: "p", content: "Caso a encomenda seja devolvida devido a erro na morada ou ausência do destinatário, os custos de um novo envio poderão ser suportados pelo cliente." },
    ],
  },
  {
    title: "Receção da Encomenda",
    blocks: [
      { type: "p", content: "No momento da entrega, o cliente deverá verificar:" },
      { type: "ul", content: ["o estado da embalagem;", "a existência de danos visíveis;", "se recebeu o produto correto."] },
      { type: "p", content: "Caso sejam detetados danos ou irregularidades, o cliente deverá contactar a XOK'S logo que possível, preferencialmente no prazo de 48 horas após a receção, anexando fotografias da embalagem e do produto." },
    ],
  },
  {
    title: "Encomendas Perdidas ou Extraviadas",
    blocks: [
      { type: "p", content: "Se uma encomenda for considerada perdida durante o transporte, a XOK'S iniciará o processo de averiguação junto da transportadora." },
      { type: "p", content: "Confirmado o extravio, será acordada com o cliente a substituição do produto ou outra solução adequada." },
    ],
  },
  {
    title: "Transferência do Risco",
    blocks: [{ type: "p", content: "O risco de perda ou dano da encomenda transfere-se para o cliente no momento da entrega da mesma na morada indicada." }],
  },
  {
    title: "Contactos",
    blocks: [{ type: "p", content: "Para qualquer questão relacionada com envios ou entregas, contacte:\nXOK'S\nEmail: xokscarbon@gmail.com" }],
  },
];

export default function Envios() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Envios"
      accentWord="Envios"
      lastUpdated="2 de julho de 2026"
      intro="Regras de produção, expedição e entrega das encomendas XOK'S."
      sections={sections}
      testid="envios-page"
    />
  );
}
