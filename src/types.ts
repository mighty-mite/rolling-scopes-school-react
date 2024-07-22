export interface ICard {
  description: string;
  id: number;
  thumbnail: string;
  title: string;
}
export interface SelectedItemsState {
  selected: ICard[];
}
