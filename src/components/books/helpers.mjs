const sortDirectionIdentifier = (direction) => {
  if (!direction) return '';

  const capitalizedDirection = direction.toUpperCase();

  switch (capitalizedDirection) {
    case 'ASC':
      return 'ASC';
    case 'DESC':
      return 'DESC';
    default:
      return '';
  }
};
// eslint-disable-next-line import/prefer-default-export
export { sortDirectionIdentifier };
