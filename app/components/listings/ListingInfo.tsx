/** @format */

'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import { SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface IListingInfo {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<IListingInfo> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className='
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-2
            '
        >
          <div>
            Hosted by{' '}
            {user?.name?.includes(' ') ? user?.name.split(' ')[0] : user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
      </div>
      <div
        className='
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
        '
      >
        <div>{guestCount} guest(s)</div>
        <div>{roomCount} room(s)</div>
        <div>{bathroomCount} bathroom(s)</div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
