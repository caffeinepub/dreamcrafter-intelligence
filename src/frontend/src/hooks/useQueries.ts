import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ApiKey,
  DashboardEntry,
  Report,
  UserUsageStats,
} from "../backend";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export function useDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery<DashboardEntry>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReports() {
  const { actor, isFetching } = useActor();
  return useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReportsForCaller();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApiKeys() {
  const { actor, isFetching } = useActor();
  return useQuery<ApiKey[]>({
    queryKey: ["apiKeys"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApiKeysForCaller();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateApiKey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("No actor");
      return actor.createApiKey(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      displayName: string;
      email: string;
      avatarUrl?: string;
      avatarBytes?: Uint8Array<ArrayBuffer>;
    }) => {
      if (!actor) throw new Error("No actor");
      let avatarBlob: ExternalBlob;
      if (params.avatarBytes) {
        avatarBlob = ExternalBlob.fromBytes(params.avatarBytes);
      } else if (params.avatarUrl) {
        avatarBlob = ExternalBlob.fromURL(params.avatarUrl);
      } else {
        avatarBlob = ExternalBlob.fromURL("");
      }
      return actor.saveCallerUserProfile({
        displayName: params.displayName,
        email: params.email,
        avatarUrl: avatarBlob,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useUsageStats() {
  const { actor, isFetching } = useActor();
  return useQuery<UserUsageStats | null>({
    queryKey: ["usageStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUsageStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUsageStats() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stats: UserUsageStats) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCallerUsageStats(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usageStats"] });
    },
  });
}

export function useCallerApiKey() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["callerApiKey"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerApiKey();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGenerateApiKey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.generateApiKeyForCaller();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerApiKey"] });
    },
  });
}

export function useRegenerateApiKey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.regenerateApiKeyForCaller();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerApiKey"] });
    },
  });
}
