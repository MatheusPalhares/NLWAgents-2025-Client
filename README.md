# NLWAGENTS-2025

Projeto desenvolvido durante um evento da Rocketseat, utilizando React, TypeScript e tecnologias modernas para criar uma aplicação web interativa.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server moderno
- **React Router DOM** - Roteamento para aplicações React
- **TanStack Query** - Gerenciamento de estado server-side

### UI/UX
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Biblioteca de ícones
- **shadcn/ui** - Sistema de componentes reutilizáveis

### Desenvolvimento
- **Biome** - Linter e formatter (configurado com ultracite)
- **Class Variance Authority** - Utilitário para variantes de componentes
- **clsx & tailwind-merge** - Utilitários para classes CSS condicionais

## 📁 Estrutura do Projeto

```
web/
├── src/
│   ├── components/ui/     # Componentes de interface
│   ├── pages/            # Páginas da aplicação
│   ├── lib/              # Utilitários e configurações
│   └── app.tsx           # Componente principal
├── public/               # Arquivos estáticos
└── package.json          # Dependências e scripts
```

## 🛠️ Setup e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd NLWAgents-2025-Client
```

2. Navegue até a pasta web:
```bash
cd web
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 🎨 Padrões de Projeto

- **Component Composition** - Uso do padrão de composição de componentes com Radix UI
- **Alias de Importação** - Configuração de `@/` para imports relativos
- **Tipagem Forte** - TypeScript configurado para máxima segurança de tipos
- **Utility-First CSS** - Tailwind CSS para estilização eficiente
- **Code Quality** - Biome para formatação e linting consistentes

## 📱 Funcionalidades

- Sistema de rotas com React Router
- Gerenciamento de estado com TanStack Query
- Interface responsiva e moderna
- Componentes reutilizáveis e acessíveis
