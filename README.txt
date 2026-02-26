SIMRACING Pro League I (GT7) — Web + Admin + Backend (Google Apps Script) + Netlify

1) Backend (Google Apps Script)
- Abre script.google.com
- Nuevo proyecto
- Pega Code.gs (archivo incluido)
- Cambia: ADMIN_PASSWORD = "CAMBIA_ESTA_PASSWORD"
- Deploy -> New deployment -> Web app
  * Execute as: Me
  * Who has access: Anyone
- Copia tu URL /exec (API_URL)

2) Conectar la web
- Abre index.html y admin.html
- Busca: const API_URL = "__API_URL__";
- Sustituye por tu URL /exec

3) Publicar con Netlify
- Descomprime este ZIP
- En Netlify: Add new site -> Deploy manually
- Arrastra TODOS los archivos (index.html, admin.html, manifest.json, service-worker.js, logo.png, icon-*.png)

4) iPhone (PWA)
- Abre el link en SAFARI
- Compartir -> Añadir a pantalla de inicio
