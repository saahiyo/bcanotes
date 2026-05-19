import { subjectsData } from "@/data/subjects";

/**
 * Generates a URL-friendly slug from a unit title.
 * e.g. "Unit 1 ( Introduction to Computer )" → "unit-1-introduction-to-computer"
 */
export function generateUnitSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[()]/g, "")        // Remove parentheses
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-")         // Spaces to hyphens
    .replace(/-+/g, "-")          // Collapse multiple hyphens
    .replace(/^-|-$/g, "");       // Trim leading/trailing hyphens
}

/**
 * Finds a unit by its subject ID and unit slug.
 * Returns the subject, unit, and unit index if found.
 */
export function findUnitBySlug(subjectId: string, unitSlug: string) {
  const subject = subjectsData[subjectId];
  if (!subject) return null;

  const unitIndex = subject.units.findIndex(
    (unit) => generateUnitSlug(unit.title) === unitSlug
  );

  if (unitIndex === -1) return null;

  return {
    subject,
    unit: subject.units[unitIndex],
    unitIndex,
  };
}

/**
 * Returns all subject+unit slug combinations for static generation.
 */
export function getAllUnitParams() {
  const params: { subjectId: string; unitSlug: string }[] = [];

  for (const [subjectId, subject] of Object.entries(subjectsData)) {
    for (const unit of subject.units) {
      params.push({
        subjectId,
        unitSlug: generateUnitSlug(unit.title),
      });
    }
  }

  return params;
}
