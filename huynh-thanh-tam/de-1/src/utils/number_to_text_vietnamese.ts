type Suffix = "M" | "K";

const suffixes = {
  M: "triệu",
  K: "nghìn",
};

const suffix_offset = {
  M: 1000000,
  K: 1000,
};

export function number_to_simple_vietnamese(
  input: number,
  suffix: Suffix = "M"
) {
  const formatted = +(input / suffix_offset[suffix]).toFixed(2);
  return formatted + " " + suffixes[suffix];
}
