export type ScaleValue = string | number;

// INFO a certain hour, day, month
export interface ScaleTarget {
  target: ScaleValue;
}

// INFO from a certain hour, day, month to a certain hour, day, month
export interface ScaleInterval {
  from: ScaleValue;
  to: ScaleValue;
}

// INFO every certain hour, day, month
export interface ScaleRecurrent {
  value: ScaleValue;
}

// INFO every from a certain hour, day, month to a certain hour, day, month
export interface ScaleRecurrentInterval extends ScaleInterval {
  recurrent: boolean;
}

export interface ScaleRangeCombined
  extends ScaleTarget,
    ScaleInterval,
    ScaleRecurrent,
    ScaleRecurrentInterval {}

export type ScaleType = 'hour' | 'day' | 'week' | 'month';
export interface ScaleBase {
  type: ScaleType;
  factor: number;
}

export interface ScalePayload
  extends Partial<ScaleTarget>,
    Partial<ScaleBase>,
    Partial<ScaleInterval>,
    Partial<ScaleRecurrent>,
    Partial<ScaleRecurrentInterval> {}
