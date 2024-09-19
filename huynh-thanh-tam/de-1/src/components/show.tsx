type Props = {
  when: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export const Show = (props: Props) => {
  return props.when ? props.children : props.fallback || null;
};
