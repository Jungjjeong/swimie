import { cookies } from 'next/headers';
import { Suspense } from 'react';

import {
  Form,
  PoolInfoDataProps,
  RecordHeaderBar,
  RecordWarning,
  SwimTimeDataProps,
} from '@/features/record';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function RecordPage() {
  const savedSwimTimeData = cookies().get('swimTime')
    ? (JSON.parse(
        cookies().get('swimTime')?.value as string,
      ) as SwimTimeDataProps)
    : undefined;
  const savedPoolInfoData = cookies().get('poolInfo')
    ? (JSON.parse(
        cookies().get('poolInfo')?.value as string,
      ) as PoolInfoDataProps)
    : undefined;

  return (
    <div>
      <RecordHeaderBar title="수영 기록하기" />
      <RecordWarning
        description="욕설, 비방 등 불쾌한 내용 또는 수영과 관련없는 기록은 서비스 이용에
          제재를 받을 수 있어요."
      />
      {/* Title 컴포넌트 생성 시 대체 */}
      <h1 className={titleStyles.form}>기본정보</h1>
      <Suspense>
        <Form
          savedSwimTimeData={savedSwimTimeData}
          savedPoolInfoData={savedPoolInfoData}
        />
      </Suspense>
    </div>
  );
}

const titleStyles = {
  header: flex({
    justifyContent: 'center',
    alignItems: 'center',
    w: 'full',
    textStyle: 'heading6',
    fontWeight: 500,
  }),

  form: css({
    padding: '0px 20px',
    textStyle: 'heading4',
    fontWeight: '600',
  }),
};
