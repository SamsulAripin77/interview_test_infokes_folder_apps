export const formatResponse = ({
    message,
    data = null,
    errors = null,
  }: {
    message: string;
    data?: any;
    errors?: any;
  }) => ({
    message,
    data,
    errors,
  });
  