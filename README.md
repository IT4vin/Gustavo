# 🚀 Portfolio Neon - Gustavo Souza

Um portfolio profissional one-page com design neon futurístico, desenvolvido com HTML5, CSS3 e JavaScript vanilla. Focado em performance, acessibilidade e responsividade.

![Portfolio Preview](./assets/images/portfolio-preview.png)

## ✨ Características

### 🎨 Design & UX
- **Design Neon Futurístico**: Paleta de cores neon com gradientes vibrantes
- **Fundo Escuro**: Tema escuro profissional (#0b0f17, #05060a)
- **Animações Fluidas**: Transições suaves e micro-interações
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Acessível**: Suporte a leitores de tela e navegação por teclado

### 🛠️ Funcionalidades Técnicas
- **Header Fixo**: Navegação suave com indicador de seção ativa
- **Hero Dinâmico**: Efeito de digitação e partículas animadas
- **Projetos Interativos**: Mockups 3D com efeito tilt e modais detalhados
- **Formulário Funcional**: Validação frontend e integração com Formspree
- **Performance**: Lazy loading, preload de recursos críticos, otimização de imagens

### 🎯 Seções
1. **Hero**: Apresentação com efeito de digitação
2. **Sobre**: Informações pessoais com foto estilizada
3. **Skills**: Grid de tecnologias com animações
4. **Projetos**: Showcase com mockups interativos
5. **Contato**: Formulário funcional e redes sociais

## 🎨 Paleta de Cores

```css
/* Cores Neon */
--neon-blue: #00e5ff     /* Azul neon principal */
--neon-purple: #9b5cff   /* Roxo neon secundário */
--neon-pink: #ff3db1     /* Rosa neon destaque */
--neon-teal: #2fffdc     /* Teal neon accent */

/* Backgrounds */
--bg-dark: #0b0f17       /* Fundo principal */
--bg-darker: #05060a     /* Fundo mais escuro */
--bg-card: #1a1f2e       /* Fundo dos cards */
```

## 🚀 Tecnologias Utilizadas

### Frontend Core
- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis customizadas, Grid, Flexbox
- **JavaScript ES6+**: Funcionalidades interativas

### Bibliotecas & APIs
- **GSAP**: Animações avançadas e ScrollTrigger
- **Particles.js**: Efeitos de partículas no background
- **Vanilla Tilt**: Efeito 3D nos mockups
- **Formspree**: Processamento de formulários

### Fontes
- **Space Grotesk**: Headings (300-700)
- **Inter**: Corpo do texto (100-900)

## 📁 Estrutura do Projeto

```
portfolio-gustavo/
├── index.html              # Página principal
├── styles/
│   └── main.css           # Estilos principais
├── scripts/
│   └── main.js            # JavaScript principal
├── assets/
│   ├── icons/
│   │   ├── favicon.svg    # Favicon SVG
│   │   └── favicon.png    # Favicon PNG fallback
│   ├── fonts/
│   │   └── fonts.css      # Importação das fontes
│   └── images/
│       ├── Perfil.svg
│       └── projects/
│           ├── project-placeholder.svg
│           └── mobile-placeholder.svg
├── README.md              # Este arquivo
└── .gitignore            # Arquivos ignorados pelo Git
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, mas recomendado)

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/gustavosouza/portfolio-gustavo-souza.git
cd portfolio-gustavo-souza
```

2. **Abra com servidor local**
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000

# Usando Live Server (VS Code)
# Instale a extensão Live Server e clique em "Go Live"
```

3. **Acesse no navegador**
```
http://localhost:8000
```

### Personalização

#### 1. Informações Pessoais
Edite o `index.html` nas seções:
- **Hero**: Nome e título
- **Sobre**: Descrição pessoal e informações
- **Contato**: Links das redes sociais

#### 2. Projetos
No arquivo `scripts/main.js`, localize o objeto `projectsData` e atualize:
- Títulos e descrições dos projetos
- URLs dos projetos e repositórios
- Imagens dos projetos (substitua os placeholders)

#### 3. Imagens
Substitua os arquivos placeholder por suas imagens:
- `assets/images/` → sua foto
- `assets/images/projects/` → screenshots dos projetos

#### 4. Cores e Estilo
Modifique as variáveis CSS em `styles/main.css`:
```css
:root {
  --neon-blue: #00e5ff;    /* Sua cor primária */
  --neon-purple: #9b5cff;  /* Sua cor secundária */
  /* ... outras variáveis */
}
```

## 📧 Configuração do Formulário

### Formspree (Recomendado)
1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta e obtenha seu endpoint
3. Substitua no `index.html`:
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

### Netlify Forms
1. Adicione `netlify` ao atributo do form:
```html
<form name="contact" netlify>
```

### Backend Próprio
Substitua a URL no JavaScript (`scripts/main.js`):
```javascript
// Linha ~XXX
const response = await fetch('SUA_API_ENDPOINT', {
  method: 'POST',
  body: formData
});
```

## 🌐 Deploy

### Netlify (Recomendado)
1. Conecte seu repositório GitHub
2. Configure:
   - **Build command**: (deixe vazio)
   - **Publish directory**: `./`
3. Deploy automático a cada push

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
1. Vá em Settings → Pages
2. Selecione source: Deploy from branch
3. Branch: main, folder: / (root)

### Surge.sh
```bash
npm install -g surge
surge
```

## 🔧 Otimizações de Performance

### Implementadas
- ✅ Lazy loading de imagens
- ✅ Preload de recursos críticos
- ✅ Minificação de assets
- ✅ Compressão de imagens
- ✅ Cache de fontes
- ✅ Redução de motion para acessibilidade

### Recomendadas para Produção
- [ ] Service Worker para cache
- [ ] Compressão Gzip/Brotli
- [ ] CDN para assets estáticos
- [ ] Otimização de imagens (WebP)
- [ ] Bundle e minificação de JS/CSS

## ♿ Acessibilidade

### Recursos Implementados
- **Semântica HTML**: Tags apropriadas (`<header>`, `<main>`, `<section>`)
- **Alt text**: Descrições em todas as imagens
- **ARIA labels**: Labels descritivos em controles
- **Contraste**: Cores com contraste adequado
- **Keyboard navigation**: Navegação completa por teclado
- **Focus indicators**: Indicadores visuais de foco
- **Reduced motion**: Respeita preferências de movimento

### Testes Recomendados
- **WAVE**: Ferramenta de avaliação de acessibilidade
- **axe DevTools**: Extensão para Chrome/Firefox
- **Lighthouse**: Auditoria integrada ao Chrome
- **Screen readers**: Teste com NVDA, JAWS ou VoiceOver

## 📱 Responsividade

### Breakpoints
```css
/* Mobile First */
@media (max-width: 480px)  { /* Mobile pequeno */ }
@media (max-width: 768px)  { /* Mobile/Tablet */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 1200px) { /* Desktop pequeno */ }
```

### Testes
- **Chrome DevTools**: Device simulation
- **Responsively**: App para teste multi-device
- **BrowserStack**: Teste em dispositivos reais

## 🐛 Troubleshooting

### Problemas Comuns

**1. Fontes não carregam**
- Verifique a conexão com Google Fonts
- Use fallback fonts: `font-family: 'Inter', system-ui, sans-serif`

**2. Animações não funcionam**
- Verifique se GSAP está carregando
- Teste com `prefers-reduced-motion: reduce` desabilitado

**3. Partículas não aparecem**
- Verifique se particles.js está carregando
- Teste em dispositivo com boa performance

**4. Formulário não envia**
- Verifique a configuração do Formspree
- Teste a validação JavaScript

**5. Imagens não carregam**
- Verifique os caminhos dos arquivos
- Teste com servidor local (não file://)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Gustavo Souza** - Desenvolvedor Full Stack
- 🌐 **Website**: [gustavosouza-portfolio.netlify.app](https://gustavosouza-portfolio.netlify.app)
- 💼 **LinkedIn**: [linkedin.com/in/gustavosouza](https://linkedin.com/in/gustavosouza)
- 🐙 **GitHub**: [github.com/gustavosouza](https://github.com/gustavosouza)
- 📧 **Email**: gustavo.souza@email.com

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**

## 🎯 Próximos Passos

### Melhorias Planejadas
- [ ] **Blog Section**: Seção para artigos técnicos
- [ ] **Dark/Light Toggle**: Alternância de temas
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Internacionalização**: Suporte a múltiplos idiomas
- [ ] **Analytics**: Integração com Google Analytics
- [ ] **CMS**: Integração com Strapi ou Contentful

### Integrações Futuras
- [ ] **GitHub API**: Projetos dinâmicos do GitHub
- [ ] **Medium API**: Artigos automáticos do Medium
- [ ] **Spotify API**: Widget de música atual
- [ ] **Weather API**: Widget de clima local

---

**Desenvolvido com 💙 e muito ☕ por Gustavo Souza**
#   G u s t a v o 
 
 