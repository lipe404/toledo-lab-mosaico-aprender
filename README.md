# Mosaico Aprender

Landing page conceitual de portfólio para o segmento de **Educação**. Marca, serviços e dados são fictícios.

**Demonstração:** Trilhas demonstrativas. Não há envio de dados pessoais, sistema de cadastro ou pagamento.

## Rodar localmente

Requisitos: Node.js 22+ e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000 para ver a landing page.

## Publicar

O projeto usa Next.js App Router, TypeScript e exportação estática. `npm run build` gera `out/`.
Para GitHub Pages, em **Settings → Pages**, selecione **GitHub Actions**, então execute o fluxo “Publicar demonstração no GitHub Pages”. O fluxo configura o caminho público do repositório automaticamente.
Para Vercel, importe o repositório como projeto Next.js sem definir `PAGES_BASE_PATH`.

Fotografia editorial: [Kampus Production, Pexels](https://www.pexels.com/photo/serious-young-woman-with-diverse-groupmates-working-on-laptops-in-library-5940712/), [licença](https://www.pexels.com/license/).

Fotografia secundária: [Charlotte May, Pexels](https://www.pexels.com/photo/content-multiethnic-students-working-together-on-task-5965688/).

### Funil demonstrativo
Trilha visível → escolha da sessão → copiar roteiro para uso ou compartilhamento voluntário. Experimento futuro: comparar duração inicial de 15 minutos com escolha explícita e pedir ao participante, em teste moderado, que explique o próximo passo de estudo. Nenhum evento é coletado pelo site.
