import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { NotificationList } from '@/features/notification';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

//Todo: 알람 불러오는 Api 연결
export default function AlarmPage() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>알림</HeaderBar.Title>
      </HeaderBar>
      <Suspense>
        <NotificationList />
      </Suspense>
    </>
  );
}
