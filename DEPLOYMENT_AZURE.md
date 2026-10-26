# Deploy a Azure

## URL de producción

```
https://descubri-tu-blend.azurewebsites.net
```

- **Web App**: `descubri-tu-blend` (Node 22 LTS, Linux)
- **Resource Group**: `descubri-tu-blend-rg`
- **Plan**: `descubri-blend-plan` (B1 propio, eastus)

## Cómo deployar

Desde la raíz del proyecto (requiere `az login` con la cuenta de Espert):

```bash
# 1. Empaquetar el código (sin node_modules ni build local)
zip -qr /tmp/deploy.zip . -x "node_modules/*" ".next/*" ".git/*" "tsconfig.tsbuildinfo"

# 2. Deploy con build remoto (Oryx corre npm ci + next build en Azure)
az webapp deploy --resource-group descubri-tu-blend-rg --name descubri-tu-blend \
  --src-path /tmp/deploy.zip --type zip
```

El app setting `SCM_DO_BUILD_DURING_DEPLOYMENT=true` ya está configurado: Azure
instala dependencias y buildea al recibir el zip. `next start` respeta el
puerto que asigna Azure ($PORT), no hace falta startup command.

## Variables de entorno

```bash
# Leads → Google Sheet (sin esto la app funciona pero no persiste leads)
az webapp config appsettings set --resource-group descubri-tu-blend-rg --name descubri-tu-blend \
  --settings SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/<ID>/exec"
```

Ver `sheets/README.md` para crear el Web App de Apps Script.

## Troubleshooting

```bash
# Logs en vivo
az webapp log tail --resource-group descubri-tu-blend-rg --name descubri-tu-blend

# Estado del último deploy
az webapp deployment list-publishing-credentials --resource-group descubri-tu-blend-rg --name descubri-tu-blend
```

> Nota kiosko: tras cada deploy el service worker (`public/sw.js`) debe subir
> de versión de caché (`vk-blend-vN`) para que la tablet tome assets frescos.

> ⚠️ **2026-07-23**: `horeca-blend-espert` (rg-horeca-prod) fue ELIMINADA — era un deploy paralelo sin usuarios. La app canónica es `descubri-tu-blend` (descubri-tu-blend-rg, eastus): los QRs impresos apuntan a esa URL. Deployar SIEMPRE ahí.
