import React from 'react';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { fetcher } from '../helper';

export default function Health() {
  const { data, error } = useSWR('/api/v1/health', fetcher, { refreshInterval: 1000 });

  if (error) return <FontAwesomeIcon className="has-text-danger" icon={faHeartbeat} size="5x" />;
  if (!data) return <FontAwesomeIcon className="has-text-info" icon={faHeartbeat} size="5x" />;
  return <FontAwesomeIcon className="has-text-success" icon={faHeartbeat} size="5x" />;
}
