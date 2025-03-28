export function getFormData<T>(formData: FormData, key: string): T | null {
  const value = formData.get(key);
  return value !== null ? (value as T) : null;
}
