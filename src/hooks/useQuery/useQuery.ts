import API, { graphqlOperation } from '@aws-amplify/api';
import { useLocalStorage } from 'react-frontend-common';

import { queries } from '../../graphql';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useState } from 'react';

type UseQueryType<ResultType> = [boolean, any, ResultType, () => void];

type InitialState<ResultType> = {
  queryName: string;
  result: ResultType;
  loading: boolean;
  error: string;
};

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
): UseQueryType<ResultType> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useLocalStorage(`${query}data`, {} as ResultType);

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
      setLoading(true);
      setError('');
      const { data } = (await API.graphql(graphqlOperation(queries[query], variables))) as {
        data: ResultType;
      };
      setData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchQuery(query, variables);
  };

  useDeepCompareEffect(() => {
    fetchQuery(query, variables);
  }, [query, variables]);

  return [loading, error, data, refetch];
};
