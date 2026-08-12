import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "O que são Cookies?",
    blocks: [
      { type: "p", content: "O website www.xoks.pt, propriedade da XOK'S, utiliza cookies para melhorar a experiência de navegação, garantir o correto funcionamento da loja online e analisar a utilização do website." },
      { type: "p", content: "Os cookies são pequenos ficheiros de texto armazenados no dispositivo do utilizador quando visita um website." },
    ],
  },
  {
    title: "Que tipos de Cookies utilizamos?",
    blocks: [
      { type: "p", content: "Cookies Essenciais — São indispensáveis para o funcionamento do website e permitem:" },
      { type: "ul", content: ["Navegação entre páginas;", "Gestão do carrinho de compras;", "Processo de checkout;", "Autenticação de utilizadores;", "Segurança da sessão."] },
      { type: "p", content: "Sem estes cookies, o website poderá não funcionar corretamente." },
      { type: "p", content: "Cookies de Preferências — Permitem memorizar escolhas do utilizador, como:" },
      { type: "ul", content: ["Idioma;", "Moeda;", "Preferências de navegação."] },
      { type: "p", content: "Cookies Analíticos — Permitem compreender como os visitantes utilizam o website, ajudando-nos a melhorar continuamente a experiência de utilização. As informações recolhidas são agregadas e utilizadas apenas para fins estatísticos." },
      { type: "p", content: "Cookies de Marketing — Com o consentimento do utilizador, poderão ser utilizados cookies para:" },
      { type: "ul", content: ["Apresentar publicidade relevante;", "Medir campanhas publicitárias;", "Melhorar ações de marketing digital;", "Criar públicos para campanhas de remarketing."] },
    ],
  },
  {
    title: "Cookies de Terceiros",
    blocks: [
      { type: "p", content: "O website poderá utilizar serviços de terceiros, incluindo:" },
      { type: "ul", content: ["Google Analytics", "Google Ads", "Meta Pixel (Facebook e Instagram)", "PayPal", "MB Way"] },
      { type: "p", content: "Cada uma destas entidades possui a sua própria Política de Privacidade e Política de Cookies." },
    ],
  },
  {
    title: "Gestão de Cookies",
    blocks: [
      { type: "p", content: "Ao aceder ao website pela primeira vez, será apresentado um banner de consentimento que permitirá ao utilizador:" },
      { type: "ul", content: ["Aceitar todos os cookies;", "Rejeitar cookies não essenciais;", "Personalizar as preferências."] },
      { type: "p", content: "O utilizador poderá alterar as suas preferências a qualquer momento através das definições do navegador ou do gestor de cookies disponível no website." },
    ],
  },
  {
    title: "Desativação de Cookies",
    blocks: [
      { type: "p", content: "A maioria dos navegadores permite bloquear ou eliminar cookies." },
      { type: "p", content: "Contudo, a desativação dos cookies essenciais poderá comprometer o correto funcionamento da loja online, incluindo o carrinho de compras e o processo de pagamento." },
    ],
  },
  {
    title: "Alterações à Política de Cookies",
    blocks: [
      { type: "p", content: "A XOK'S poderá atualizar esta Política de Cookies sempre que necessário para refletir alterações legais ou técnicas." },
      { type: "p", content: "A versão mais recente estará sempre disponível em www.xoks.pt." },
    ],
  },
  {
    title: "Contactos",
    blocks: [{ type: "p", content: "Caso tenha alguma dúvida relativamente à utilização de cookies, poderá contactar:\nXOK'S\nEmail: xokscarbon@gmail.com" }],
  },
];

export default function Cookies() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Cookies"
      accentWord="Cookies"
      lastUpdated="2 de julho de 2026"
      intro="Como e porque utilizamos cookies no website www.xoks.pt."
      sections={sections}
      testid="cookies-page"
    />
  );
}
