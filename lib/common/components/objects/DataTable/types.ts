export interface Column<T> {
  key: string;
  valueGetter: (obj: T) => string | number | undefined | null | JSX.Element;
  label: string;
}

export interface Cell {
  key: string;
  value: string | number | undefined | JSX.Element | null;
}

export interface Row {
  key: string;
  cells: Cell[];
}
