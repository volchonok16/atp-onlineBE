export const rawDbResponseTransform = <T>(response: any): T[] => {
  delete response.statement;
  delete response.parameters;
  delete response.return;
  delete response.count;
  delete response.columns;

  return response;
};
