import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface UserUsageStats {
    reportsGenerated: bigint;
    companiesTracked: bigint;
    apiCallCount: bigint;
}
export interface Report {
    status: Status__1;
    date: Time;
    name: string;
}
export interface ApiKey {
    name: string;
    createdDate: Time;
    isActive: boolean;
}
export interface ScoutResult {
    status: Status;
    features: Array<string>;
    summary: string;
    queries: Array<string>;
    timestamp: Time;
    companyName: string;
    sources: Array<string>;
}
export interface UserProfile {
    displayName: string;
    email: string;
    avatarUrl: ExternalBlob;
}
export interface DashboardEntry {
    companiesTracked: bigint;
    dataIngestion: bigint;
    apiRequestCount: bigint;
    activeAnalyses: bigint;
}
export enum Status {
    completed = "completed",
    failed = "failed",
    running = "running"
}
export enum Status__1 {
    completed = "completed",
    analyzing = "analyzing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_get_post {
    get = "get",
    post = "post"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createApiKey(name: string): Promise<ApiKey>;
    generateApiKeyForCaller(): Promise<string>;
    getCallerApiKey(): Promise<string | null>;
    getCallerUsageStats(): Promise<UserUsageStats | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardEntry>;
    getLatestScout(companyName: string): Promise<ScoutResult | null>;
    getReportsForCaller(): Promise<Array<Report>>;
    getScoutHistory(): Promise<Array<ScoutResult>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    http_request(request: {
        url: string;
        method: Variant_get_post;
        body: Uint8Array;
        headers: Array<{
            value: string;
            name: string;
        }>;
    }): Promise<{
        status: bigint;
        body: Uint8Array;
        headers: Array<{
            value: string;
            name: string;
        }>;
    }>;
    isCallerAdmin(): Promise<boolean>;
    listApiKeysForCaller(): Promise<Array<ApiKey>>;
    regenerateApiKeyForCaller(): Promise<string>;
    saveCallerUsageStats(stats: UserUsageStats): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveScoutResult(result: ScoutResult): Promise<void>;
}
