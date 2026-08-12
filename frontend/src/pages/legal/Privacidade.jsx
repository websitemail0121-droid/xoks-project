import React from "react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Introdução",
    blocks: [
      { type: "p", content: "A XOK'S respeita a privacidade dos seus clientes e compromete-se a proteger os seus dados pessoais, em conformidade com o Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados – RGPD) e demais legislação portuguesa aplicável." },
      { type: "p", content: "Esta Política de Privacidade explica como recolhemos, utilizamos, armazenamos e protegemos os seus dados pessoais quando utiliza o website www.xoks.pt." },
    ],
  },
  {
    title: "Responsável pelo Tratamento dos Dados",
    blocks: [{ type: "p", content: "XOK'S\nTitular: Patrício Manuel Correia Gomes\nNIF: 223104990\nMorada: Rua das Antas, n.º 360, Medelo, 4820-491 Fafe, Portugal\nEmail: xokscarbon@gmail.com" }],
  },
  {
    title: "Dados Pessoais Recolhidos",
    blocks: [
      { type: "p", content: "Dependendo da utilização do website, poderemos recolher:" },
      { type: "ul", content: ["Nome completo;", "Morada de faturação e entrega;", "Endereço de email;", "Número de telefone;", "Número de Identificação Fiscal (quando necessário para faturação);", "Histórico de encomendas;", "Informações de pagamento (os dados bancários ou do cartão não são armazenados pela XOK'S);", "Endereço IP;", "Dados de navegação;", "Cookies."] },
    ],
  },
  {
    title: "Finalidade da Recolha dos Dados",
    blocks: [
      { type: "p", content: "Os dados pessoais são tratados para:" },
      { type: "ul", content: ["Processar e entregar encomendas;", "Emitir faturas;", "Comunicar com o cliente sobre a encomenda;", "Responder a pedidos de informação;", "Cumprir obrigações legais e fiscais;", "Melhorar o funcionamento do website;", "Prevenir fraude e garantir a segurança da plataforma;", "Enviar comunicações promocionais, apenas quando exista consentimento."] },
    ],
  },
  {
    title: "Base Jurídica do Tratamento",
    blocks: [
      { type: "p", content: "Os dados são tratados com base em:" },
      { type: "ul", content: ["Execução de um contrato de compra e venda;", "Cumprimento de obrigações legais;", "Consentimento do titular dos dados, quando aplicável;", "Interesse legítimo da XOK'S, desde que não prevaleçam os direitos e liberdades do titular."] },
    ],
  },
  {
    title: "Partilha de Dados",
    blocks: [
      { type: "p", content: "A XOK'S apenas partilha dados pessoais quando necessário para a prestação dos seus serviços, nomeadamente com:" },
      { type: "ul", content: ["Empresas de transporte (CTT e DHL);", "Prestadores de serviços de pagamento (MB Way, PayPal e Multibanco);", "Prestadores de alojamento e manutenção do website;", "Software de faturação certificado;", "Autoridades públicas, quando legalmente exigido."] },
      { type: "p", content: "A XOK'S não vende nem cede os seus dados pessoais a terceiros para fins comerciais." },
    ],
  },
  {
    title: "Conservação dos Dados",
    blocks: [{ type: "p", content: "Os dados pessoais serão conservados apenas durante o período necessário para cumprir as finalidades para que foram recolhidos ou durante os prazos legalmente exigidos, nomeadamente para efeitos fiscais e contabilísticos." }],
  },
  {
    title: "Direitos do Titular dos Dados",
    blocks: [
      { type: "p", content: "Nos termos da legislação em vigor, o utilizador pode exercer os seguintes direitos:" },
      { type: "ul", content: ["Direito de acesso;", "Direito de retificação;", "Direito ao apagamento;", "Direito à limitação do tratamento;", "Direito de oposição;", "Direito à portabilidade dos dados;", "Direito de retirar o consentimento, quando este constitua a base legal do tratamento."] },
      { type: "p", content: "Os pedidos deverão ser enviados para xokscarbon@gmail.com." },
    ],
  },
  {
    title: "Segurança",
    blocks: [
      { type: "p", content: "A XOK'S adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra perda, utilização indevida, acesso não autorizado, alteração ou divulgação." },
      { type: "p", content: "Embora sejam aplicadas boas práticas de segurança, nenhum sistema é totalmente imune a riscos, pelo que não é possível garantir uma segurança absoluta." },
    ],
  },
  {
    title: "Cookies",
    blocks: [
      { type: "p", content: "O website utiliza cookies para:" },
      { type: "ul", content: ["Garantir o correto funcionamento da loja;", "Memorizar preferências do utilizador;", "Melhorar a experiência de navegação;", "Recolher estatísticas de utilização;", "Apoiar campanhas de marketing, quando autorizado pelo utilizador."] },
      { type: "p", content: "O utilizador poderá gerir ou desativar os cookies através do banner de consentimento ou das definições do navegador." },
    ],
  },
  {
    title: "Ligações para Websites de Terceiros",
    blocks: [{ type: "p", content: "O website poderá conter ligações para websites externos. A XOK'S não é responsável pelas respetivas políticas de privacidade nem pelo conteúdo desses websites." }],
  },
  {
    title: "Alterações à Política de Privacidade",
    blocks: [
      { type: "p", content: "A XOK'S poderá atualizar esta Política de Privacidade sempre que necessário." },
      { type: "p", content: "As alterações entram em vigor após a sua publicação no website." },
    ],
  },
  {
    title: "Contactos",
    blocks: [
      { type: "p", content: "Para qualquer questão relacionada com a proteção dos seus dados pessoais, poderá contactar:" },
      { type: "p", content: "XOK'S\nEmail: xokscarbon@gmail.com" },
      { type: "p", content: "Caso considere que os seus direitos não foram respeitados, poderá apresentar reclamação junto da autoridade de controlo competente em Portugal (CNPD)." },
    ],
  },
];

export default function Privacidade() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Privacidade"
      accentWord="Privacidade"
      lastUpdated="2 de julho de 2026"
      intro="Como recolhemos, utilizamos e protegemos os seus dados pessoais, em conformidade com o RGPD."
      sections={sections}
      testid="privacidade-page"
    />
  );
}
