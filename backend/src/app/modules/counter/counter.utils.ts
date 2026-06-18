import { Counter } from './counter.model';

// const PREFIX = 'XS';
// const START_NUMBER = 3016221980;

export const generateUniqueBondNumber = async (): Promise<string> => {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'bondNumber' },
    {
      $inc: {
        sequenceValue: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  //   const bondNumber = START_NUMBER + counter.sequenceValue;
  //   return `${PREFIX}${bondNumber}`;

  //   const bondNumber = `XS${counter.sequenceValue}`;

  //   return bondNumber;

  // ✅ HARD SAFETY CHECK
  const sequence = Number(counter.sequenceValue);

  if (isNaN(sequence)) {
    throw new Error('Counter corrupted: sequenceValue is NaN');
  }

  return `XS${sequence}`;
};
