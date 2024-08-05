import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { useTimeLineData } from '@/hooks/use-timeline';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { TimeLineCard } from '../atoms';
import { TimeLineContent } from '../types';

const memories: Array<TimeLineContent> = [
  {
    memoryId: 1,
    type: 'MULTI',
    recordAt: '2024-08-03',
    startTime: '01:00',
    endTime: '01:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    totalDistance: 250,
    memoryDetailId: 1,
    kcal: 300,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 2,
        name: '평영',
        laps: 2,
        meter: 100,
      },
    ],
    isAchieved: false,
    images: [],
  },
  {
    memoryId: 2,
    type: 'SINGLE',
    recordAt: '2024-08-10',
    startTime: '22:00',
    endTime: '23:10',
    lane: 25,
    diary:
      '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    memoryDetailId: 2,
    images: [],
  },

  {
    memoryId: 3,
    type: 'NORMAL',
    recordAt: '2024-08-10',
    startTime: '22:00',
    endTime: '23:10',
    lane: 25,
    memoryDetailId: 3,
    images: [],
  },
  {
    memoryId: 4,
    type: 'MULTI',
    recordAt: '2024-08-28',
    startTime: '11:00',
    endTime: '11:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    memoryDetailId: 4,
    kcal: 300,
    totalDistance: 1250,
    isAchieved: true,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 2,
        name: '평영',
        laps: 2,
        meter: 1100,
      },
    ],
    images: [],
  },
  {
    memoryId: 5,
    type: 'MULTI',
    recordAt: '2024-08-29',
    startTime: '11:00',
    endTime: '11:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    memoryDetailId: 5,
    kcal: 300,
    totalDistance: 1300,
    isAchieved: true,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 2,
        meter: 100,
      },
      {
        strokeId: 2,
        name: '평영',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 3,
        name: '배영',
        laps: 6,
        meter: 300,
      },
      {
        strokeId: 4,
        name: '접영',
        laps: 8,
        meter: 400,
      },
    ],
    images: [],
  },
  {
    memoryId: 6,
    type: 'MULTI',
    recordAt: '2024-08-30',
    startTime: '11:00',
    endTime: '11:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    memoryDetailId: 6,
    kcal: 300,
    totalDistance: 1350,
    isAchieved: true,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 2,
        meter: 100,
      },
      {
        strokeId: 2,
        name: '평영',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 3,
        name: '배영',
        laps: 6,
        meter: 300,
      },
      {
        strokeId: 4,
        name: '접영',
        laps: 8,
        meter: 400,
      },
      {
        strokeId: 5,
        name: '킥판',
        laps: 1,
        meter: 50,
      },
    ],
    images: [],
  },
];

export const TimeLine = () => {
  const isEmptyTimeLine = memories.length === 0;
  const { data: timelineData } = useTimeLineData();

  if (!timelineData) return '';

  return (
    <>
      {isEmptyTimeLine ? (
        <div
          className={cx(
            fullspaceStyles,
            flex({
              direction: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          )}
        >
          <SwimmerIcon width={96} height={96} />
          <p className={descriptionStyles}>아직 수영 기록이 없어요!</p>
        </div>
      ) : (
        <ol className={flex({ direction: 'column', gap: '50px' })}>
          {memories.map((memory) => (
            <TimeLineCard key={memory.memoryId} memory={memory} />
          ))}
        </ol>
      )}
    </>
  );
};

const fullspaceStyles = css({ width: 'full', height: 'full' });

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});
