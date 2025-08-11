# 🚀 Guia de Deploy - Portfolio Neon

Este guia contém instruções específicas para fazer o deploy do seu portfolio em diferentes plataformas.

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de:

1. **Personalizar o conteúdo**:
   - [ ] Atualizar informações pessoais no `index.html`
   - [ ] Substituir placeholders de imagem por suas fotos reais
   - [ ] Configurar links das redes sociais
   - [ ] Atualizar projetos no `scripts/main.js`

2. **Configurar formulário**:
   - [ ] Criar conta no [Formspree](https://formspree.io)
   - [ ] Substituir `YOUR_FORM_ID` no HTML pelo ID real
   - [ ] Testar envio de formulário

3. **Otimizar assets**:
   - [ ] Comprimir imagens (recomendado: WebP + fallback)
   - [ ] Verificar se todas as imagens têm alt text
   - [ ] Testar em diferentes dispositivos

## 🌐 Netlify (Recomendado)

### Deploy via Git
1. **Push para GitHub**:
```bash
git add .
git commit -m "feat: portfolio inicial"
git push origin main
```

2. **Conectar no Netlify**:
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub
   - Configure:
     - **Branch**: `main`
     - **Build command**: (deixe vazio)
     - **Publish directory**: `./`

3. **Configurações adicionais**:
   - **Site name**: Mude para algo como `seu-nome-portfolio`
   - **Domain**: Configure domínio personalizado se tiver
   - **Forms**: Netlify detecta automaticamente formulários

### Deploy via Drag & Drop
1. Compacte todos os arquivos (exceto .git)
2. Arraste o ZIP para [netlify.com/drop](https://netlify.com/drop)

### Configurações do Netlify
Crie um arquivo `netlify.toml` na raiz:
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.svg"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## ▲ Vercel

### Deploy via CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Deploy via Git
1. Conecte repositório em [vercel.com](https://vercel.com)
2. Configure:
   - **Framework**: Other
   - **Root Directory**: `./`
   - **Build Command**: (deixe vazio)
   - **Output Directory**: `./`

### Configurações do Vercel
Crie um arquivo `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🐙 GitHub Pages

### Configuração
1. **Vá para Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`
4. **Folder**: `/ (root)`

### Domínio Personalizado
1. Crie arquivo `CNAME` na raiz:
```
seudominio.com
```

2. Configure DNS:
```
Type: CNAME
Name: www
Value: seu-usuario.github.io
```

### Limitações
- ❌ Sem HTTPS para domínios personalizados (gratuito)
- ❌ Formulários não funcionam nativamente
- ✅ Gratuito e simples
- ✅ Integração direta com Git

## 🌊 Surge.sh

### Deploy
```bash
# Instalar Surge
npm install -g surge

# Deploy
cd pasta-do-projeto
surge

# Deploy com domínio personalizado
surge . seudominio.surge.sh
```

### Vantagens
- ✅ Deploy super rápido
- ✅ Domínios personalizados gratuitos
- ✅ HTTPS automático
- ❌ Sem formulários nativos

## 🔧 Configurações Específicas

### Formulário de Contato

#### Opção 1: Formspree
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

#### Opção 2: Netlify Forms
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- seus campos -->
</form>
```

#### Opção 3: Getform
```html
<form action="https://getform.io/f/SEU_ID" method="POST">
```

### Analytics

#### Google Analytics
Adicione antes do `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Plausible (Privacy-friendly)
```html
<script defer data-domain="seudominio.com" src="https://plausible.io/js/plausible.js"></script>
```

### SEO Avançado

#### Meta Tags Adicionais
```html
<!-- Adicione no <head> -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<link rel="canonical" href="https://seudominio.com">

<!-- Schema.org para Google -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gustavo Souza",
  "jobTitle": "Desenvolvedor Full Stack",
  "url": "https://seudominio.com",
  "sameAs": [
    "https://linkedin.com/in/seuperfil",
    "https://github.com/seuusuario"
  ]
}
</script>
```

#### Sitemap.xml
Crie um arquivo `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seudominio.com</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🔍 Testes Pós-Deploy

### Checklist de Verificação
- [ ] **Carregamento**: Site carrega em < 3 segundos
- [ ] **Responsivo**: Funciona em mobile, tablet, desktop
- [ ] **Formulário**: Envia e recebe emails corretamente
- [ ] **Links**: Todos os links funcionam (internos e externos)
- [ ] **Imagens**: Todas as imagens carregam
- [ ] **Animações**: Funcionam suavemente
- [ ] **SEO**: Meta tags aparecem no compartilhamento
- [ ] **Analytics**: Está rastreando visitas

### Ferramentas de Teste
- **PageSpeed Insights**: Performance
- **GTmetrix**: Análise detalhada de carregamento
- **Lighthouse**: Auditoria completa (Performance, SEO, Acessibilidade)
- **Wave**: Teste de acessibilidade
- **Responsively**: Teste responsivo

### Monitoramento
- **Uptime Robot**: Monitor de disponibilidade
- **Google Search Console**: Performance no Google
- **Analytics**: Comportamento dos usuários

## 🆘 Solução de Problemas

### Problemas Comuns

**Site não carrega**
- Verifique se todos os arquivos foram enviados
- Confirme se o `index.html` está na raiz
- Teste localmente primeiro

**Formulário não funciona**
- Verifique se o endpoint está correto
- Teste o serviço de formulário separadamente
- Confirme se não há bloqueadores de popup

**Imagens não aparecem**
- Verifique caminhos relativos (`./assets/` não `/assets/`)
- Confirme se arquivos foram enviados
- Teste com diferentes formatos (SVG, PNG, JPG)

**Animações não funcionam**
- Verifique se CDNs estão carregando
- Teste sem adblockers
- Verifique console do navegador para erros

### Logs e Debug
```javascript
// Adicione para debug (remova em produção)
console.log('Portfolio loaded successfully');
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Teste em modo incógnito
3. Verifique documentação da plataforma
4. Entre em contato via GitHub Issues

---

**Boa sorte com seu deploy! 🚀**
