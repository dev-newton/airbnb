/** @format */
'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { IconType } from 'react-icons';

interface ICategoryBox {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<ICategoryBox> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  //   const handleClick = useCallback(() => {
  //     let currentQuery = {};

  //     if (params) {
  //       currentQuery = qs.parse(params.toString());
  //     }

  //     const updatedQuery: any = {
  //       ...currentQuery,
  //       category: label,
  //     };

  //     if (params?.get('category') === label) {
  //       delete updatedQuery.category;
  //     }

  //     const url = qs.stringifyUrl(
  //       {
  //         url: '/',
  //         query: updatedQuery,
  //       },
  //       { skipNull: true }
  //     );

  //     router.push(url);
  //   }, [label, params, router]);

  const handleClick = useCallback(() => {
    const currentQuery = params
      ? new URLSearchParams(params)
      : new URLSearchParams();

    if (currentQuery.get('category') === label) {
      currentQuery.delete('category');
    } else {
      currentQuery.set('category', label);
    }

    const url = `/?${currentQuery.toString()}`;

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            select-none
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};

export default CategoryBox;
