# Café Aurora — preparación del entorno (Laboratorio 04)

Este archivo describe **solo el punto de partida**. El desarrollo del
laboratorio (scripts, utilidad, tipos y el indicador) se realiza siguiendo
`Laboratorio_04.docx`.

## Contenido de la carpeta

| Carpeta | Qué es | Stack |
|---|---|---|
| `cafe-aurora-adm` | **Panel administrativo — aquí se trabaja el Lab 04** | Next.js 16 + React 19 + Tailwind 4 |
| `cafe-aurora-codigo` | Sitio público del café (reservas del Lab 03) | Vite + TanStack Start + Supabase |

## Arranque del panel administrativo (PASO A)

```
cd cafe-aurora-adm
npm install
npm run dev
```

Las dependencias ya están instaladas y `npm run build` fue verificado.

## Variables de entorno

Copie `cafe-aurora-adm/.env.example` como `cafe-aurora-adm/.env.local` y
complete con los datos del proyecto Supabase de práctica:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Use **únicamente la clave anon**. La clave `service_role` no se usa, no se
comparte y no se pega en la herramienta de IA.

Los archivos `.env*` están excluidos del repositorio.

## Generación de tipos (PASO E)

Supabase CLI no está instalado de forma global. Se ejecuta con `npx`:

```
npx supabase@latest --version
```

El comando exacto de generación lo propone la herramienta de IA en el Paso E
y se revisa antes de ejecutarlo. La salida debe **reemplazar**
`cafe-aurora-adm/lib/database.types.ts`, sin crear archivos duplicados.

## Estado inicial (verificado)

- `npm run build` del panel administrativo: correcto.
- `npx tsc --noEmit` del panel administrativo: sin errores.
- Cliente de Supabase disponible en `cafe-aurora-adm/lib/supabase.ts`.
- Tipos actuales: solo `customers` y `reservations` (se regeneran en el Paso E).
- Los indicadores del dashboard usan datos de demostración.
