import React, { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

/**
 * Renders a legal document from a structured `sections` array.
 * section = { title, blocks: [{ type: "p"|"ul", content }] }
 *  - type "p": content is a string
 *  - type "ul": content is an array of strings
 */
export const LegalLayout = ({ eyebrow, title, accentWord, lastUpdated, intro, sections, testid }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageHeader eyebrow={eyebrow} title={title} accentWord={accentWord} subtitle={intro} />

      <section className="py-16 sm:py-20 bg-[#0A0A0A]" data-testid={testid}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10">
            Última atualização: {lastUpdated}
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i} data-testid={`legal-section-${i + 1}`}>
                <h2 className="font-display text-xl sm:text-2xl uppercase text-white leading-tight mb-4">
                  <span className="text-[#7EDAF2] mr-2">{i + 1}.</span>
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.blocks.map((block, j) =>
                    block.type === "ul" ? (
                      <ul key={j} className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm leading-relaxed marker:text-[#7EDAF2]">
                        {block.content.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {block.content}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 text-sm text-zinc-500">
            <p className="text-white font-semibold">XOK'S</p>
            <p>Titular: Patrício Manuel Correia Gomes · NIF: 223104990</p>
            <p>Rua das Antas, n.º 360, Medelo, 4820-491 Fafe, Portugal</p>
            <p className="text-[#7EDAF2] mt-1">xokscarbon@gmail.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
