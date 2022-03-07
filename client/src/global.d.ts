declare global {
    function apiURL(path: string, query?: string): string
    function titleCase(str: string): string
    function randomHexColor(): string
}

export {};