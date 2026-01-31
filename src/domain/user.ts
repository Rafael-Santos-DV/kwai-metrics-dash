export interface KwaiUser {
  uid: string;
  kwaiId: string;
  agency: string;
  type: string;
  date?: string;
  name?: string;
  avatar?: string;
  followers?: number;
  following?: number;
  likes?: number;
  bio?: string;
}

export interface IPage {
  page: string;
  users: KwaiUser[];
}

export interface KwaiLiveData {
  kwaiId: string;
  name: string;
  avatar?: string;
  followers?: number;
  following?: number;
  likes?: number;
  bio?: string;
}
