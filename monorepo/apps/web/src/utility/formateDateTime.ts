export const FormatDateTime = ({ data }: { data: string | number | Date }) => {
  const date = new Date(data);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  const options = isToday
    ? ({ hour: "numeric", minute: "numeric" } as const)
    : ({ month: "long", day: "numeric", year: "numeric" } as const);

  return date.toLocaleString("en-US", options);
};
