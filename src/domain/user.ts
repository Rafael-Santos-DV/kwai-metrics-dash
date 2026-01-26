export interface KwaiUser {
  uid: string;
  kwaiId: string;
  agency: string;
  type: "Tipo A" | "Tipo B";
  date: string;
}

export interface Pages {
  page: string;
  users: KwaiUser[];
}
