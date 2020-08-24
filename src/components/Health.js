import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../helper';

export default function Health() {
  const { data, error } = useSWR('/api/v1/health', fetcher, { refreshInterval: 1000 });

  if (error) return <span className="tag is-error">failed to load</span>;
  if (!data) return <span className="tag is-info">loading...</span>;
  return <span className="tag is-success">{data.time}</span>;
}
