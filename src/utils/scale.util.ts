import {
  ScalePayload,
  ScaleValue,
} from '../interfaces/scale-payload.interface';

export class BaseScaleItemHandler {
  target: ScaleValue;
  value: ScaleValue;
  from: ScaleValue;
  to: ScaleValue;
}

export interface ScaleHandler extends BaseScaleItemHandler {
  applyTargetToModel: (rawData: number[], factor: number) => number[];
  applyRecurrentToModel: (rawData: number[], factor: number) => number[];
  applyIntervalToModel: (rawData: number[], factor: number) => number[];
  applyRecurrentIntervalToModel: (
    rawData: number[],
    factor: number
  ) => number[];
}

export class DayScaleItemHandler extends BaseScaleItemHandler {
  private multiplier: number = 24;

  constructor(data: ScalePayload) {
    super();

    this.target = data.target;
    this.value = data.value;
    this.from = data.from;
    this.to = data.to;
  }

  public applyTargetToModel(rawData: number[], factor: number) {
    const target = this.target as number;
    const start = (target - 1) * this.multiplier;
    // INFO safe to use the mutiplier to determine end since it is just one day
    const end = this.multiplier - 1;

    // console.log(`[start & end] start: ${start} -> end ${start + end}`);

    const dataSlice = rawData
      .splice(start, end + 1)
      // INFO apply factor to the targets
      .map((el) => el * factor);

    rawData.splice(start, 0, ...dataSlice);

    return rawData;
  }

  public applyRecurrentToModel(rawData: number[], factor: number) {
    // INFO start at index -> value * multiplier (i.e 1 | one hour) - 1
    let progress = ((this.value as number) - 1) * this.multiplier;

    // INFO while current progress is not at the possible end of list
    while (progress <= rawData.length) {
      // INFO mutate value by at the current progress by the specified factor
      const start = progress;
      const end = this.multiplier - 1;
      // console.log(`[start & end] start: ${start} -> end: ${start + end}`);

      const dataSlice = rawData
        .splice(start, end + 1)
        // INFO apply factor to the targets
        .map((el) => el * factor);

      rawData.splice(start, 0, ...dataSlice);

      // INFO increment progress by specified value
      progress = progress + (this.value as number) * this.multiplier;
    }

    return rawData;
  }

  public applyIntervalToModel(rawData: number[], factor: number) {
    // INFO normal start - 1 * multiplier
    const start = ((this.from as number) - 1) * this.multiplier;
    // INFO normal end - 1 * multiplier
    const end =
      start +
      ((this.to as number) - (this.from as number) + 1) * this.multiplier;
    const difference = end - start;

    console.log(
      `[start & end] start: ${start} -> end: ${end} | difference: ${difference}`
    );

    // INFO zero based index start -> noOf elements between start to end (starts inclusive that is +1)
    const dataSlice = rawData
      // INFO from start, take end - start not inclusive of the last
      .splice(start, difference)
      // INFO apply factor to the targets
      .map((el) => el * factor);

    rawData.splice(start, 0, ...dataSlice);

    return rawData;
  }

  public applyRecurrentIntervalToModel(rawData: number[], factor: number) {
    // INFO normal start - 1 * multiplier
    const start = ((this.from as number) - 1) * this.multiplier;
    // INFO normal end - 1 * multiplier
    const end =
      start +
      ((this.to as number) - (this.from as number) + 1) * this.multiplier;
    const difference = end - start;
    let progress = start;

    console.log(
      `[start & end] start: ${start} -> end: ${end} | difference: ${difference}`
    );

    // INFO while current progress is not at the possible end of list
    while (progress <= rawData.length) {
      console.log(`[progress] ${progress} -> ${progress + difference}`);
      // INFO zero based index start -> noOf elements between start to end (starts inclusive that is +1)
      const dataSlice = rawData
        .splice(progress, difference + 1)
        // INFO apply factor to the targets
        .map((el) => el * factor);

      rawData.splice(progress, 0, ...dataSlice);

      // INFO increment progress by specified value
      progress = progress + this.multiplier * 7;

      // console.log(`[dataSlice]`, dataSlice);
      // console.log(`[mutated]`, rawData);
    }

    return rawData;
  }
}

export class HourScaleItemHandler extends BaseScaleItemHandler {
  private multiplier: number = 1;

  constructor(data: ScalePayload) {
    super();

    this.target = data.target;
    this.value = data.value;
    this.from = data.from;
    this.to = data.to;
  }

  public applyTargetToModel(rawData: number[], factor: number) {
    const target = ((this.target as number) - 1) * this.multiplier;
    rawData[target] = rawData[target] * factor;

    return rawData;
  }

  public applyRecurrentToModel(rawData: number[], factor: number) {
    // INFO start at index -> value * multiplier (i.e 1 | one hour) - 1
    let progress = ((this.value as number) - 1) * this.multiplier;

    // INFO while current progress is not at the possible end of list
    while (progress <= rawData.length) {
      // console.log(`[value] ${progress}`);
      // INFO mutate value by at the current progress by the specified factor
      rawData[progress] = rawData[progress] * factor;
      // INFO increment progress by specified value
      progress = progress + (this.value as number) * this.multiplier;
    }

    return rawData;
  }

  public applyIntervalToModel(rawData: number[], factor: number) {
    // INFO normal start - 1 * multiplier
    const start = ((this.from as number) - 1) * this.multiplier;
    // INFO normal end - 1 * multiplier
    const end = ((this.to as number) - 1) * this.multiplier;
    const difference = end - start;

    // INFO zero based index start -> noOf elements between start to end (starts inclusive that is +1)
    const dataSlice = rawData
      // INFO from start, take end - start + 1
      .splice(start, difference + 1)
      // INFO apply factor to the targets
      .map((el) => el * factor);

    rawData.splice(start, 0, ...dataSlice);

    return rawData;
  }

  public applyRecurrentIntervalToModel(rawData: number[], factor: number) {
    // INFO normal start as-is
    const start = this.from as number;
    // INFO normal end as-is
    const end = this.to as number;
    const difference = end - start;
    let progress = (start - 1) * this.multiplier;

    // INFO while current progress is not at the possible end of list
    while (progress <= rawData.length) {
      console.log(`[progress] ${progress} -> ${progress + difference}`);
      // INFO zero based index start -> noOf elements between start to end (starts inclusive that is +1)
      const dataSlice = rawData
        .splice(progress, difference + 1)
        // INFO apply factor to the targets
        .map((el) => el * factor);

      rawData.splice(progress, 0, ...dataSlice);

      // INFO increment progress by specified value every day i.e 24
      progress = progress + this.multiplier * 24;

      // console.log(`[dataSlice]`, dataSlice);
      // console.log(`[mutated]`, rawData);
    }

    return rawData;
  }
}

export class ScalePayloadItemHandler {
  static createHandler(data: ScalePayload): ScaleItemHandler {
    return new ScaleItemHandler(data);
  }
}

// INFO determine ScaleItem handler
export class ScaleItemHandler {
  public handlers = {
    hour: (data: ScalePayload) => new HourScaleItemHandler(data),
    day: (data: ScalePayload) => new DayScaleItemHandler(data),
  };

  constructor(private readonly data: ScalePayload) {}

  public build(rawData: any[]) {
    // INFO determine
    const handler = this.determineItemHandler(this.data);

    console.log(`[handler]`, handler);

    if (this.data.target) {
      return handler.applyTargetToModel(rawData, this.data.factor);
    }

    if (this.data.value) {
      return handler.applyRecurrentToModel(rawData, this.data.factor);
    }

    if (
      this.data.from &&
      this.data.to &&
      this.data.recurrent &&
      this.data.recurrent === true
    ) {
      return handler.applyRecurrentIntervalToModel(rawData, this.data.factor);
    }

    if (this.data.from && this.data.to) {
      return handler.applyIntervalToModel(rawData, this.data.factor);
    }
  }

  private get determineItemHandler(): (data: ScalePayload) => ScaleHandler {
    return this.handlers[this.data.type];
  }
}
