export interface IFilter {
  code: string;
  languages: string[];
  inWhere: "file" | "path";
}
