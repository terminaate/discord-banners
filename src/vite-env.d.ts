/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_DISCORD_INVITE_LINK: string
    readonly VITE_GITHUB_LINK: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}