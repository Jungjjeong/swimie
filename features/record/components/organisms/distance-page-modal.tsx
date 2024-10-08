'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/atoms';
import {
  BackButton,
  HeaderBar,
  PageModal,
  Tab,
  TabItem,
  TextField,
} from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useDistancePageModal } from '../../hooks';
import { isDistancePageModalOpen } from '../../store';
import { StrokeProps } from '../../types';
import { StrokeDistanceFields } from './stroke-distance-fields';

interface DistancePageModalProps {
  defaultStrokes?: StrokeProps[];
  defaultTotalMeter?: number;
  defaultTotalLap?: number;
}

//Todo: 코드 리팩토링 & 리렌더링 고민
export function DistancePageModal({
  defaultStrokes,
  defaultTotalMeter,
  defaultTotalLap,
}: DistancePageModalProps) {
  const router = useRouter();
  const { setValue, control } = useFormContext();
  const pageModalState = useAtomValue(isDistancePageModalOpen);

  const lane = useWatch({
    control,
    name: 'lane',
  }) as number;

  const {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalMeter,
    totalLaps,
    totalStrokeDistance,
    strokes,
    buttonLabel,
    handlers,
  } = useDistancePageModal<HTMLDivElement>(
    lane,
    defaultStrokes,
    defaultTotalMeter,
    defaultTotalLap,
  );

  const isAssistiveIndexZero = assistiveTabIndex === 0;
  const isAssistiveIndexOne = assistiveTabIndex === 1;

  const secondaryTabItems = [
    {
      text: '총거리',
      selected: secondaryTabIndex === 0,
      onClick: () => handlers.onChangeSecondaryTabIndex(0),
    },
    {
      text: '영법별 거리',
      selected: secondaryTabIndex === 1,
      onClick: () => handlers.onChangeSecondaryTabIndex(1),
    },
  ];
  const assistiveTabItems = [
    {
      text: '미터(m)',
      selected: isAssistiveIndexZero,
      onClick: () => handlers.onChangeAssistiveTabIndex(0),
    },
    {
      text: '바퀴수',
      selected: isAssistiveIndexOne,
      onClick: () => handlers.onChangeAssistiveTabIndex(1),
    },
  ];

  const handleBackArrowClick = () => {
    router.back();
    handlers.onClosePageModal();
  };

  const handleDoneButtonClick = () => {
    if (secondaryTabIndex === 0 && isAssistiveIndexZero)
      setValue(
        'totalDistance',
        totalMeter ? Number(totalMeter).toLocaleString() + 'm' : undefined,
      );
    else
      setValue(
        'totalDistance',
        totalStrokeDistance
          ? totalStrokeDistance.toLocaleString() + 'm'
          : undefined,
      );

    if (secondaryTabIndex === 0) {
      if (isAssistiveIndexZero) {
        if (totalMeter)
          setValue('strokes', [
            { name: '총거리', meter: Number(totalMeter), laps: 0 },
          ]);
        else setValue('strokes', []);
      } else if (isAssistiveIndexOne) {
        if (totalLaps)
          setValue('strokes', [
            { name: '총바퀴', meter: 0, laps: Number(totalLaps) },
          ]);
        else setValue('strokes', []);
      }
    } else {
      if (isAssistiveIndexZero)
        setValue(
          'strokes',
          strokes.filter((stroke) => {
            return stroke.meter;
          }),
        );
      else if (isAssistiveIndexOne)
        setValue(
          'strokes',
          strokes.filter((stroke) => {
            return stroke.laps;
          }),
        );
    }
    handlers.onClosePageModal();
    router.back();
  };

  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div ref={pageModalRef}>
        <HeaderBar>
          <HeaderBar.LeftContent>
            <BackButton onClickBack={handleBackArrowClick} />
          </HeaderBar.LeftContent>
        </HeaderBar>
        <h1 className={titleStyles}>수영 거리를 입력해주세요</h1>
        <section className={layout.tab}>
          <Tab type="secondary" className={css({ marginBottom: '12px' })}>
            {secondaryTabItems.map((tabItem) => (
              <TabItem
                key={tabItem.text + secondaryTabIndex}
                type="secondary"
                {...tabItem}
              />
            ))}
          </Tab>
          <div className={layout.assistiveTab}>
            {assistiveTabItems.map((tabItem) => (
              <TabItem
                key={tabItem.text + assistiveTabIndex}
                type="assistive"
                {...tabItem}
              />
            ))}
          </div>
        </section>
        <section className={layout.record}>
          {secondaryTabIndex === 0 && (
            <TextField
              inputType="number"
              subText={
                isAssistiveIndexOne
                  ? '레인 길이에 따라 자동으로 거리를 계산해드릴게요'
                  : undefined
              }
              maxLength={isAssistiveIndexZero ? 5 : 3}
              step={isAssistiveIndexZero ? undefined : 0.5}
              preventDecimal={isAssistiveIndexZero}
              value={isAssistiveIndexZero ? totalMeter : totalLaps}
              unit={isAssistiveIndexZero ? '미터(m)' : '바퀴'}
              wrapperClassName={css({ marginTop: '16px' })}
              onChange={
                isAssistiveIndexZero
                  ? handlers.onChangeTotalMeter
                  : handlers.onChangeTotalLaps
              }
            />
          )}
          {secondaryTabIndex === 1 && (
            <StrokeDistanceFields
              assistiveTabIndex={assistiveTabIndex}
              strokes={strokes}
              onChangeStroke={handlers.onChangeStroke}
            />
          )}
        </section>
        <div className={layout.button}>
          <Button
            buttonType="primary"
            variant="solid"
            size="large"
            label={buttonLabel}
            interaction="normal"
            onClick={handleDoneButtonClick}
            className={css({ w: 'full' })}
          />
        </div>
      </div>
    </PageModal>
  );
}

const layout = {
  assistiveTab: flex({
    gap: '10px',
  }),
  tab: css({
    width: '100%',
    marginTop: '16px',
    padding: '0 20px',
  }),

  record: css({
    padding: '0 20px',
  }),

  button: css({
    w: 'full',
    position: 'absolute',
    bottom: 'calc(15px + env(safe-area-inset-bottom))',
    padding: '0 20px',
  }),
};

const titleStyles = css({
  marginTop: '24px',
  paddingLeft: '20px',
  textStyle: 'heading3',
  fontWeight: 600,
});
