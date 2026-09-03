import 'dotenv/config'; // add this at the very top
import mongoose from 'mongoose';

const formatSortCode = (raw: null | undefined) => {
  if (raw === null || raw === undefined) return null;
  const digits = String(raw).padStart(6, '0').replace(/\D/g, '');
  if (digits.length !== 6) return null; // flag anything malformed for manual review
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
};

async function migrate() {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) throw new Error('DB_URL is not configured');
  await mongoose.connect(dbUrl);
  const collection = mongoose.connection.db.collection('applicants');

  // Only targets docs where sortCode is still a number — safe to re-run
  const cursor = collection.find({
    'settlement.existingBankAccount.bankAccountDetails.sortCode': {
      $type: 'number',
    },
  });

  let updated = 0;
  const skipped = [];

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    const raw =
      doc.settlement?.existingBankAccount?.bankAccountDetails?.sortCode;
    const formatted = formatSortCode(raw);

    if (!formatted) {
      skipped.push({ id: doc._id.toString(), raw });
      continue;
    }

    await collection.updateOne(
      { _id: doc._id },
      {
        $set: {
          'settlement.existingBankAccount.bankAccountDetails.sortCode':
            formatted,
        },
      }
    );
    updated++;
  }

  console.log(`✅ Updated: ${updated}`);
  if (skipped.length) {
    console.warn(`⚠️  Skipped ${skipped.length} doc(s) — needs manual review:`);
    console.table(skipped);
  }

  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
