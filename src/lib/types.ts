export interface Ioptions {
  ele: string | any;
  imageUrl?: string;
  src: string;
  name: string;
  singer: string;
  showProgress?: boolean;
  initstate?: string;
  loop?: string;
  ended?: () => void;
  next?: () => void;
}
