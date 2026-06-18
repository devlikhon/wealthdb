import { Applicant } from '../app/modules/applicant/applicant.model';
import { Counter } from '../app/modules/counter/counter.model';

export const syncBondCounter = async () => {
  const result = await Applicant.aggregate([
    { $unwind: '$investmentDetails' },
    {
      $group: {
        _id: null,
        maxBond: { $max: '$investmentDetails.bondNumber' },
      },
    },
  ]);

  let maxNumber = 3016221980;

  if (
    result.length &&
    result[0].maxBond &&
    typeof result[0].maxBond === 'string'
  ) {
    // maxNumber = parseInt(result[0].maxBond.replace('XS', ''));

    const numeric = Number(result[0].maxBond.replace('XS', ''));

    // ✅ IMPORTANT SAFETY CHECK
    if (!isNaN(numeric)) {
      maxNumber = numeric;
    }
  }

  await Counter.findOneAndUpdate(
    { _id: 'bondNumber' },
    { sequenceValue: maxNumber },
    { upsert: true }
  );

  console.log('Bond counter synced:', maxNumber);
};
