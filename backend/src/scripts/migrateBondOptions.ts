// Run Command: npx ts-node src/scripts/migrateBondOptions.ts

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../config';
import { Applicant } from '../app/modules/applicant/applicant.model';

async function migrate() {
  await mongoose.connect(config.db_url!);

  const applicants = await Applicant.find();

  for (const applicant of applicants) {
    let updated = false;

    applicant.investmentDetails.forEach(inv => {
      // cast to any to allow comparing legacy option codes to current union-typed field
      switch (inv.bondInvestmentOption as any) {
        case 'PLC':
        case 'PLC3':
          inv.bondInvestmentOption = 'Goldman Sachs Corp';
          updated = true;
          break;

        case 'HB':
          inv.bondInvestmentOption = 'HSBC Holdings Plc';
          updated = true;
          break;

        case 'NatWest Group Plc':
          inv.bondInvestmentOption = 'Natwest Plc';
          updated = true;
          break;
      }
    });

    if (updated) {
      await applicant.save();
      console.log(`Updated applicant ${applicant._id}`);
    }
  }

  console.log('Migration complete.');

  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
