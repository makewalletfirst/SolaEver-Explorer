export enum ClusterStatus {
    Connected,
    Connecting,
    Failure,
}

export enum Cluster {
    MainnetBeta,
    Testnet,
    Devnet,
    Simd296,
    Custom,
}

export const CLUSTERS = [Cluster.MainnetBeta, Cluster.Testnet, Cluster.Devnet, Cluster.Simd296, Cluster.Custom];

export function clusterSlug(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.MainnetBeta:
            return 'mainnet-beta';
        case Cluster.Testnet:
            return 'testnet';
        case Cluster.Devnet:
            return 'devnet';
        case Cluster.Simd296:
            return 'simd296';
        case Cluster.Custom:
            return 'custom';
    }
}

export function clusterName(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.MainnetBeta:
            return 'SolaEver Mainnet'; // UI에 표시될 이름 수정
        case Cluster.Testnet:
            return 'Testnet';
        case Cluster.Devnet:
            return 'Devnet';
        case Cluster.Simd296:
            return 'SIMD-296';
        case Cluster.Custom:
            return 'Custom';
    }
}

// 기본 메인넷 URL을 당신의 SolaEver 노드 주소로 변경
export const MAINNET_BETA_URL = 'https://rpc-sola.ever-chain.xyz';
export const TESTNET_URL = 'https://api.testnet.solana.com';
export const DEVNET_URL = 'https://api.devnet.solana.com';
export const SIMD296_URL = 'https://simd-0296.surfnet.dev:8899';

const modifyUrl = (url: string): string => {
    // localhost 주소이거나 'api' 문자열이 포함되지 않은 경우 변조 없이 그대로 반환합니다.
    if (url.includes('localhost') || url.includes('127.0.0.1') || !url.includes('api')) {
        return url;
    }
    
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return url;
    } else {
        return url.replace('api', 'explorer-api');
    }
};

export function clusterUrl(cluster: Cluster, customUrl: string): string {
    switch (cluster) {
        case Cluster.Devnet:
            return process.env.NEXT_PUBLIC_DEVNET_RPC_URL ?? modifyUrl(DEVNET_URL);
        case Cluster.MainnetBeta:
            // 환경 변수가 지정되어 있지 않다면 수정된 MAINNET_BETA_URL(localhost:8899)을 사용합니다.
            return process.env.NEXT_PUBLIC_MAINNET_RPC_URL ?? modifyUrl(MAINNET_BETA_URL);
        case Cluster.Testnet:
            return process.env.NEXT_PUBLIC_TESTNET_RPC_URL ?? modifyUrl(TESTNET_URL);
        case Cluster.Simd296:
            return process.env.NEXT_PUBLIC_SIMD296_RPC_URL ?? SIMD296_URL;
        case Cluster.Custom:
            return customUrl;
    }
}

export function serverClusterUrl(cluster: Cluster, customUrl: string): string {
    switch (cluster) {
        case Cluster.Devnet:
            return process.env.DEVNET_RPC_URL ?? modifyUrl(DEVNET_URL);
        case Cluster.MainnetBeta:
            return process.env.MAINNET_RPC_URL ?? modifyUrl(MAINNET_BETA_URL);
        case Cluster.Testnet:
            return process.env.TESTNET_RPC_URL ?? modifyUrl(TESTNET_URL);
        case Cluster.Simd296:
            return process.env.SIMD296_RPC_URL ?? SIMD296_URL;
        case Cluster.Custom:
            return customUrl;
    }
}

export const DEFAULT_CLUSTER = Cluster.MainnetBeta;
