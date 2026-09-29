# 📚 Projeto 05 - Cálculo de Média e Situação do Aluno
> **Disciplina:** Desenvolvimento Web III  
> **Linguagem:** HTML5, CSS3 e JavaScript (Node.js) 

Aplicação web desenvolvida em Node.js para receber notas via URL, calcular a média final do aluno e apresentar dinamicamente a sua situação (Aprovado ou Reprovado), com base nos conceitos de rotas e manipulação de ficheiros trabalhados em aula.

---

## 📌 Sobre o Projeto

Este projeto consiste num servidor web desenvolvido em **Node.js puro (sem frameworks)**, estruturado com o gestor de pacotes NPM (`package.json`). O objetivo principal é consolidar a lógica de rotas com extração de parâmetros de consulta (Query Strings), injeção de dados no lado do servidor e tratamento de exceções.

### 🎯 Requisitos Atendidos
- Servidor HTTP nativo com o módulo `http` do Node.js.
- Receção de parâmetros (`p1` e `p2`) diretamente pela URL (ex: `/media?p1=7.5&p2=5.0`).
- Cálculo matemático da média, aplicando a regra de negócio: Média >= 6.0 (Aprovado) ou < 6.0 (Reprovado).
- Renderização dinâmica do ecrã (`aprovado.html` ou `reprovado.html`), injetando os valores processados diretamente no HTML.
- Tratamento básico de exceções e validações (notas não informadas ou valores inválidos exibem uma página de erro estruturada).
- Página personalizada de erro 404 para rotas ou ficheiros inexistentes.
- Servimento de ficheiros estáticos (CSS) a partir do diretório `/public`.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (Módulos nativos: `http`, `fs`, `path`, `url`)
- **NPM** (Inicialização e gestão com `package.json`)
- **HTML5 & CSS3** (Layout livre para os ecrãs de aprovação e reprovação)
- **JavaScript (ES6+)**

---

## 📁 Estrutura de Arquivos

```text
  ├── public/
  │   ├── css/             # Ficheiros de estilo para cada ecrã
  │   ├── aprovado.html    # Estrutura visual para média >= 6.0
  │   ├── reprovado.html   # Estrutura visual para média < 6.0
  │   ├── erro.html        # Ecrã para avisos de validação de notas
  │   └── erro404.html     # Ecrã de rota não encontrada (Not Found)
  ├── app.js               # Servidor HTTP e lógica de negócio/rotas
  ├── package.json         # Configurações do projeto e scripts de execução
  └── package-lock.json    # Registo detalhado de dependências
```
## 🔧 Como Executar o Projeto

### Pré-requisitos
Ter o Node.js instalado na sua máquina.

### Passo a Passo
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/yasminandrade8/Projeto05-DWIII.git
   ```
   
2. **Entre na pasta do projeto:**
   ```bash
   cd Projeto05-DWIII
   ```

3. **Inicie o servidor HTTP:**
   ```bash
   npm start
   ```
   *(O comando irá executar o script definido no `package.json` e iniciar o servidor em `http://localhost:3000/`)*

4. **Teste a aplicação:**
   Abra o navegador e aceda ao endereço: 
   `http://localhost:3000/media?p1=7.5&p2=5.0`

---

## 👩‍💻 Autora
Feito com 💜 por Yasmin Andrade
