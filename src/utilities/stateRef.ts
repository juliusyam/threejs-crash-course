import { SetStateAction, useCallback, useState } from 'react';

export function useStateRef<S>(processNode: (node: S) => SetStateAction<S | null>) : [S | null, (newNode: S | null) => void] {

  const [node, setNode] = useState<S | null>(null);

  const setRef = useCallback(newNode => {
    setNode(processNode(newNode));

  }, [processNode]);

  return [node, setRef];
}