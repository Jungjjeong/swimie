import Link from 'next/link';

import { Button, Image } from '@/components/atoms';
import SuccessRecordImage from '@/public/images/success-record.png';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface RecordSuccessPageProps {
  searchParams: { [key: string]: string };
}

export default function RecordSuccessPage({
  searchParams,
}: RecordSuccessPageProps) {
  return (
    <div className={layoutStyles.full}>
      <div className={layoutStyles.content}>
        <Image
          src={SuccessRecordImage}
          width={250}
          height={250}
          priority
          alt="success record"
        />
        <h3 className={textStyles.title}>기록 완료!</h3>
        <p className={textStyles.paragraph}>
          {searchParams.month}월{' '}
          <span className={textStyles.sub}>{searchParams.rank}번째</span>{' '}
          기록이에요.
        </p>
      </div>
      <Link
        href={`/record-detail/${searchParams.memoryId}`}
        className={buttonStyles}
        replace
      >
        <Button
          buttonType="primary"
          variant="solid"
          label="확인"
          size="large"
          className={css({ width: 'full' })}
        />
      </Link>
    </div>
  );
}

const layoutStyles = {
  full: flex({
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100dvh - 100px)',
  }),
  content: flex({
    direction: 'column',
    alignItems: 'center',
  }),
};

const textStyles = {
  title: css({
    textStyle: 'heading3',
    fontWeight: 600,
    mb: '8px',
  }),
  paragraph: css({
    textStyle: 'heading6',
    fontWeight: 500,
    color: 'text.alternative',
  }),
  sub: css({
    color: 'primary.swim.총거리.default',
  }),
};

const buttonStyles = css({
  position: 'fixed',
  bottom: '36px',
  width: 'full',
  maxWidth: 'maxWidth',
  padding: '0 20px',
});
