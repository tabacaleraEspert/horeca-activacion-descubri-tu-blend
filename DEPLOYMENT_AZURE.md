# Deploy a Azure

## Opción 1: Usando Azure CLI (Recomendado)

### Requisitos
- Azure CLI instalado: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
- Cuenta de Azure activa

### Pasos

1. **Loguearse en Azure**
```bash
az login
```

2. **Crear un Resource Group** (reemplaza con tu nombre)
```bash
az group create --name descubri-tu-blend-rg --location eastus
```

3. **Crear un App Service Plan**
```bash
az appservice plan create --name descubri-tu-blend-plan --resource-group descubri-tu-blend-rg --sku B1 --is-linux
```

4. **Crear la Web App**
```bash
az webapp create --resource-group descubri-tu-blend-rg --plan descubri-tu-blend-plan --name descubri-tu-blend-app --runtime "NODE|20"
```

5. **Configurar variables de entorno** (si necesitas Supabase u otros)
```bash
az webapp config appsettings set --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app --settings WEBSITES_PORT=3000 NODE_ENV=production
```

6. **Deployar desde Git**
```bash
az webapp deployment source config-zip --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app --src <archivo.zip>
```

O si usas Git:
```bash
az webapp up --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app --runtime "NODE|20"
```

---

## Opción 2: Usando Docker + Azure Container Registry

### Requisitos
- Docker instalado
- Azure CLI

### Pasos

1. **Crear un Azure Container Registry**
```bash
az acr create --resource-group descubri-tu-blend-rg --name descubriTuBlendRegistry --sku Basic
```

2. **Loguearse en el registry**
```bash
az acr login --name descubriTuBlendRegistry
```

3. **Build y push de la imagen**
```bash
docker build -t descubriTuBlendRegistry.azurecr.io/descubri-tu-blend:latest .
docker push descubriTuBlendRegistry.azurecr.io/descubri-tu-blend:latest
```

4. **Deployar en App Service**
```bash
az webapp create --resource-group descubri-tu-blend-rg --plan descubri-tu-blend-plan --name descubri-tu-blend-app --deployment-container-image-name descubriTuBlendRegistry.azurecr.io/descubri-tu-blend:latest

az webapp config container set --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app --docker-custom-image-name descubriTuBlendRegistry.azurecr.io/descubri-tu-blend:latest --docker-registry-server-url https://descubriTuBlendRegistry.azurecr.io
```

---

## Opción 3: GitHub Actions (Automático)

Si tu repo está en GitHub, puedes usar GitHub Actions para auto-deployar:

1. Ir a GitHub > Settings > Secrets
2. Agregar secretos necesarios para Azure
3. Crear workflow en `.github/workflows/azure-deploy.yml`

---

## URL de la App

Después del deploy, tu app estará disponible en:
```
https://descubri-tu-blend-app.azurewebsites.net
```

## Troubleshooting

- **Puerto**: La app corre en puerto 3000. Azure lo mapea automáticamente.
- **Logs en vivo**: 
```bash
az webapp log tail --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app
```

- **Conexión a Supabase**: 
Configura las env vars en Azure:
```bash
az webapp config appsettings set --resource-group descubri-tu-blend-rg --name descubri-tu-blend-app --settings SUPABASE_URL=... SUPABASE_KEY=...
```
