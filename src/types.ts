export type DisplayMode = "hms" | "sec";

export type Gender = "male" | "female";

export type Settings = {
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  birthStr: string;
  setBirthStr: (s: string) => void;
  avgYears: number;
  setAvgYears: (n: number) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
};
