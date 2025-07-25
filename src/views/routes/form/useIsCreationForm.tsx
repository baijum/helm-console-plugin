import { useLocation } from 'react-router-dom-v5-compat';

const useIsCreationForm = (): boolean => {
  const location = useLocation();

  return location?.pathname.includes('~new/form');
};

export default useIsCreationForm;
