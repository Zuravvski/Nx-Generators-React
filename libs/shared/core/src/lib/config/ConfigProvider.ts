export interface ConfigProvider {
    getApiUrl(): string;
    isProduction(): boolean;
}
