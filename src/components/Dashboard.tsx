import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type Props = {
  code: string | null,
}

export const Dashboard: React.FC<Props> = ({ code }) => {
  const [search, setSearch] = useState<string>('');
  const accessToken = useAuth(code);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  return(
    <div>
      <form action="">
        <input 
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder='Search your favorite song or artist'
        />
      </form>
    </div>
  )
}