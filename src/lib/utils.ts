export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};

export const formatTiming = (ms: number): string => {
  if (ms < 100) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
};

export const getStatusMeta = (
  status: number,
): { bgPrimary: string; bgSecondary: string; text: string; label: string } => {
  if (status >= 200 && status < 300) {
    return {
      bgPrimary: "bg-status-success-bg",
      bgSecondary: "bg-status-success",
      text: "text-status-success",
      label: "success",
    };
  }
  if (status >= 300 && status < 400) {
    return {
      bgPrimary: "bg-status-warning-bg",
      bgSecondary: "bg-status-warning",
      text: "text-status-warning",
      label: "redirect",
    };
  }
  return {
    bgPrimary: "bg-status-error-bg",
    bgSecondary: "bg-status-error",
    text: "text-status-error",
    label: "error",
  };
};

export const tryParseJson = (raw: string): unknown | null => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
