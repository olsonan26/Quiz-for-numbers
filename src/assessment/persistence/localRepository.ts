import type { AssessmentReport, AssessmentSession, FeedbackRecord } from "../domain";
import { parseStored, sessionSchema } from "../schemas";

const KEYS = {
  session: "hue.current-session.v1",
  reports: "hue.reports.v1",
  feedback: "hue.feedback.v1"
} as const;

export interface AssessmentRepository {
  saveSession(session: AssessmentSession): void;
  loadSession(): AssessmentSession | null;
  deleteSession(): void;
  saveReport(report: AssessmentReport): void;
  listReports(): AssessmentReport[];
  deleteReport(reportId: string): void;
  saveFeedback(feedback: FeedbackRecord): void;
  clearAll(): void;
}

const readArray = <T>(key: string): T[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const localRepository: AssessmentRepository = {
  saveSession(session) {
    sessionSchema.parse(session);
    localStorage.setItem(KEYS.session, JSON.stringify(session));
  },
  loadSession() {
    return parseStored(sessionSchema, localStorage.getItem(KEYS.session)) as AssessmentSession | null;
  },
  deleteSession() {
    localStorage.removeItem(KEYS.session);
  },
  saveReport(report) {
    const reports = this.listReports().filter((candidate) => candidate.id !== report.id);
    localStorage.setItem(KEYS.reports, JSON.stringify([report, ...reports]));
  },
  listReports() {
    return readArray<AssessmentReport>(KEYS.reports);
  },
  deleteReport(reportId) {
    const reports = this.listReports().filter((report) => report.id !== reportId);
    localStorage.setItem(KEYS.reports, JSON.stringify(reports));
  },
  saveFeedback(feedback) {
    const records = readArray<FeedbackRecord>(KEYS.feedback).filter((record) => record.id !== feedback.id);
    localStorage.setItem(KEYS.feedback, JSON.stringify([feedback, ...records]));
  },
  clearAll() {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  }
};

export function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
