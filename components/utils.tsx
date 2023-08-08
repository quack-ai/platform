export const getAxiosErorrMessage = (error: any) => {
  return (
    error?.response?.data?.message || error?.response?.data || error?.message
  );
};
