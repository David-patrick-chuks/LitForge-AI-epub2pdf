declare module "convertapi" {
  interface ConvertApiResult {
      saveFiles(path: string): Promise<void>;
  }

  interface ConvertApi {
      convert(format: string, params: Record<string, any>, fromFormat: string): Promise<ConvertApiResult>;
  }

  function convertapi(apiKey: string): ConvertApi;

  export = convertapi;
}
