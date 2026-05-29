const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const capitalise = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { formatDate, capitalise };
