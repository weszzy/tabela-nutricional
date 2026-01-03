# Gerador de Tabela Nutricional (Padrão ANVISA)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-blueviolet)
[![wakatime](https://wakatime.com/badge/user/bdeb95f3-d0ba-450e-bb85-f5c3aa2006a7/project/171cc631-0b8b-4979-8880-4d125c3bb065.svg)](https://wakatime.com/badge/user/bdeb95f3-d0ba-450e-bb85-f5c3aa2006a7/project/171cc631-0b8b-4979-8880-4d125c3bb065)

Aplicação web para criação rápida e confiável de tabelas nutricionais no padrão ANVISA, voltada para produtores artesanais e indústrias que precisam gerar rótulos corretos sem depender de softwares caros ou processos manuais.


<img height="400" alt="preview" src="https://i.imgur.com/JUJGygS.png">


## Principais pontos:
- Geração de tabelas nutricionais conforme RDC 429/2020 e IN 75/2020.
- Cálculo automático de %VD (Valor Diário).
- Geração automática da coluna 100 g / 100 ml a partir da porção informada.
- Preview em tempo real enquanto o usuário preenche os dados.
- Exportação da tabela em PNG e PDF, pronta para impressão.
- Layout fiel ao modelo exigido pela ANVISA.

## Estrutura principal do projeto
- `src/app` — rotas e páginas (App Router). Veja `src/app/page.tsx` para a UI principal e export handlers.
- `src/components` — componentes reutilizáveis; `NutritionalTable.tsx` gera o layout exportável.
- `src/lib` — lógica reutilizável: `calculations.ts`, `constants.ts`, `schema.ts`, `utils.ts`.

## Observações sobre exportação
exportação é feita inteiramente no cliente, utilizando:
- html-to-image para geração do PNG
- jspdf para geração do PDF

```bash
⚠️ Importante: O componente exportável deve manter o id="tabela-export", conforme implementado em src/components/NutritionalTable.tsx. Alterar esse identificador quebrará a exportação.
```

## Aviso legal
Esta ferramenta auxilia na geração de tabelas nutricionais, mas não substitui a validação por um nutricionista responsável técnico. O usuário final é responsável por garantir a conformidade legal do rótulo.

## Reportar problemas / contato
- Issues do GitHub para bugs e sugestões.
- Contato disponível no perfil do repositório.

## Licença
Este projeto está licenciado sob a licença MIT.

---