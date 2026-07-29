import { beforeEach, describe, expect, it } from "vitest";
import { createDemoSession } from "../../src/assessment/fixtures/demo";
import { generateReport } from "../../src/assessment/engine/report";
import { assertSafeOutput, scanProhibitedLanguage } from "../../src/assessment/safety/safety";
import { profileContextSchema, sessionSchema } from "../../src/assessment/schemas";
import { localRepository } from "../../src/assessment/persistence/localRepository";

describe("safety, schemas, and local-first persistence", () => {
  beforeEach(() => localStorage.clear());

  it("rejects prohibited diagnostic, fatalistic, and manipulative output", () => {
    expect(scanProhibitedLanguage("This person is a narcissist.")).toContain("diagnosis");
    expect(() => assertSafeOutput("You should leave your partner.")).toThrow(/relationship-directive/);
  });

  it("passes the complete deterministic report through the safety scan", () => {
    expect(() => assertSafeOutput(generateReport(createDemoSession()))).not.toThrow();
  });

  it("fails malformed profile and session data early", () => {
    expect(profileContextSchema.safeParse({ displayName: "" }).success).toBe(false);
    expect(sessionSchema.safeParse({ id: "x", responses: "not-an-array" }).success).toBe(false);
  });

  it("saves, resumes, exports logically, deletes, and clears browser-local data", () => {
    const session = createDemoSession();
    const report = generateReport(session);
    localRepository.saveSession(session);
    localRepository.saveReport(report);
    expect(localRepository.loadSession()).toEqual(session);
    expect(localRepository.listReports()).toHaveLength(1);
    localRepository.deleteReport(report.id);
    expect(localRepository.listReports()).toHaveLength(0);
    localRepository.saveReport(report);
    localRepository.clearAll();
    expect(localRepository.loadSession()).toBeNull();
    expect(localRepository.listReports()).toHaveLength(0);
  });
});
