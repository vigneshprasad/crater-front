import { useCallback } from "react";
import useSWR from "swr";

import { Box, Select } from "../../atoms";

interface IProps<T> {
  label: string;
  dataUrl: string;
  itemLabelGetter: (val: T) => string;
  onChange?: (value: T) => void;
}

export default function AsyncSelect<T>({
  itemLabelGetter,
  label,
  dataUrl,
  onChange,
}: IProps<T>): JSX.Element {
  const { data, error } = useSWR<T[]>(dataUrl);

  const handleOnChange = useCallback(
    (value: T) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  if (!data) return <Box>Loading...</Box>;
  if (error) return <Box>Error </Box>;

  return (
    <Select<T>
      label={label}
      items={data}
      itemLabelGetter={itemLabelGetter}
      onChange={(val) => handleOnChange(val)}
    />
  );
}
