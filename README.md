# Amigo Cuidador - Plataforma de Saúde Acessível

## Sobre o Projeto

O Amigo Cuidador é uma plataforma de saúde que prioriza a acessibilidade e a inclusão. Nosso objetivo é tornar o acesso à informação e serviços de saúde mais fácil e acessível para todos.

## Recursos de Acessibilidade

Nossa plataforma inclui diversos recursos de acessibilidade:

- Ajuste de tamanho de fonte (90% a 150%)
- Modo de alto contraste
- Modo dislexia com fonte OpenDyslexic
- Modo daltonismo (Deuteranopia, Protanopia, Tritanopia)
- Redução de movimento
- Espaçamento de texto aumentado
- Cursor grande
- Modo de leitura
- Modo de foco
- Dicas de navegação
- Atalhos de teclado
- Navegação por teclado
- Suporte a leitores de tela

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/amigo-cuidador.git
cd amigo-cuidador
```

2. Instale as dependências:
```bash
npm install
```

3. Baixe as fontes OpenDyslexic:
   - Acesse https://github.com/antijingoist/opendyslexic/releases
   - Baixe a versão mais recente (atualmente v0.91.12)
   - Extraia os arquivos .otf para a pasta `public/fonts/`
   - Os arquivos necessários são:
     - OpenDyslexic-Regular.otf
     - OpenDyslexic-Bold.otf
     - OpenDyslexic-Italic.otf
     - OpenDyslexic-BoldItalic.otf

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Atalhos de Teclado

- `Tab`: Navegar entre elementos
- `Enter/Space`: Selecionar/Ativar
- `Esc`: Fechar menus
- `Alt + 1`: Ir para o início
- `Alt + 2`: Ir para serviços
- `Alt + A`: Abrir menu de acessibilidade
- `Alt + C`: Ir para contato

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nossas diretrizes de contribuição antes de enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
