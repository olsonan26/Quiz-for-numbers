import type {
  ChartHypothesis,
  ProfileContext,
  ProprietaryCalculationTrace,
  ProprietaryProfile
} from "../../assessment/domain";
import sourceManifest from "../source-manifest.json";
import {
  getCalledNameValue,
  getCoreNumbers,
  getValueFromName,
  type SourceProfileInput
} from "../calculations/numerology";
import { calculatePMEI } from "../calculations/pmei";
import { calledNameMeaningFor } from "../meanings/calledNameMeanings";
import { coreMeaningFor } from "../meanings/coreMeanings";

export interface ProprietaryChartProvider {
  readonly providerId: string;
  readonly calculationVersion: string;
  readonly interpretationVersion: string;
  readonly sourceCommit: string;
  calculateProfile(input: SourceProfileInput): ProprietaryProfile;
  getHypotheses(profile: ProprietaryProfile): ChartHypothesis[];
  explainCalculation(profile: ProprietaryProfile, resultId: string): ProprietaryCalculationTrace | undefined;
}

const numberMappings: Record<
  number,
  { constructId: string; facetId: string; expectedDirection: ChartHypothesis["expectedDirection"] }
> = {
  1: { constructId: "HUE-04", facetId: "autonomy-reactance", expectedDirection: "higher" },
  2: { constructId: "HUE-05", facetId: "belonging-reassurance", expectedDirection: "higher" },
  3: { constructId: "HUE-01", facetId: "social-engagement", expectedDirection: "higher" },
  4: { constructId: "HUE-09", facetId: "ambiguity-tolerance", expectedDirection: "higher" },
  5: { constructId: "HUE-11", facetId: "change-response", expectedDirection: "higher" },
  6: { constructId: "HUE-05", facetId: "belonging-reassurance", expectedDirection: "higher" },
  7: { constructId: "HUE-01", facetId: "social-engagement", expectedDirection: "lower" },
  8: { constructId: "HUE-04", facetId: "autonomy-reactance", expectedDirection: "higher" },
  9: { constructId: "HUE-02", facetId: "signal-sensitivity", expectedDirection: "higher" }
};

const rootValue = (value: number) => (value === 11 ? 2 : value === 22 ? 4 : value === 33 ? 6 : value);

export const costarProvider: ProprietaryChartProvider = {
  providerId: "looks-like-costar-port",
  calculationVersion: sourceManifest.calculationVersion,
  interpretationVersion: sourceManifest.interpretationVersion,
  sourceCommit: sourceManifest.sourceCommit,

  calculateProfile(input) {
    const core = getCoreNumbers(input);
    const calledInput = input.calledName?.trim() || input.fullName;
    const calledName = getCalledNameValue(calledInput);
    const pmei = calculatePMEI(input.fullName);
    const traces: ProprietaryCalculationTrace[] = core.map((number) => ({
      id: `TRACE-${number.name.toUpperCase().replace(/\s+/g, "-")}`,
      label: number.name,
      inputSummary: number.calculation ?? getValueFromName(input.fullName, number.name === "Soul Urge" ? "vowels" : "all").calculation,
      compound: number.compound,
      value: number.value,
      sourcePath: "services/numerology.ts"
    }));
    traces.push({
      id: "TRACE-CALLED-NAME",
      label: "Called Name",
      inputSummary: "Reduced first-name value plus reduced last-name value.",
      compound: calledName.compound,
      value: calledName.value,
      sourcePath: "services/numerology.ts#getCalledNameValue"
    });
    traces.push({
      id: "TRACE-PMEI",
      label: "PMEI / Lettrology",
      inputSummary: `Letters ${pmei.totalLetters}; physical ${pmei.planes.physical}, mental ${pmei.planes.mental}, emotional ${pmei.planes.emotional}, intuitive ${pmei.planes.intuitive}; tone ${pmei.tone.vowels} vowels and ${pmei.tone.consonants} consonants; cross matches ${pmei.crossMatches.map((match) => `${match.plane}=${match.totalEquals}`).join(", ") || "none"}.`,
      compound: `checksum ${pmei.qaChecksumPassed ? "passed" : "failed"}`,
      value: pmei.totalLetters,
      sourcePath: "services/pmeiEngine.ts"
    });

    return {
      providerId: this.providerId,
      sourceCommit: this.sourceCommit,
      calculationVersion: this.calculationVersion,
      interpretationVersion: this.interpretationVersion,
      coreNumbers: core.map((number) => ({
        name: number.name,
        value: number.value,
        compound: number.compound,
        sourceMeaning: coreMeaningFor(number.name, number.value)
      })),
      calledName: {
        value: calledName.value,
        compound: calledName.compound,
        sourceMeaning: calledNameMeaningFor(calledName.value).full
      },
      pmei: {
        planes: pmei.planes,
        geniusPlane: pmei.geniusPlane,
        zeroPlanes: pmei.zeroPlanes,
        harmony: pmei.harmony,
        qaChecksumPassed: pmei.qaChecksumPassed
      },
      traces
    };
  },

  getHypotheses(profile) {
    const sources = [
      ...profile.coreNumbers.slice(0, 3).map((number) => ({
        rule: number.name,
        value: number.value,
        meaning: number.sourceMeaning
      })),
      { rule: "Called Name", value: profile.calledName.value, meaning: profile.calledName.sourceMeaning }
    ];
    return sources.flatMap((source, index) => {
      const mapped = numberMappings[rootValue(source.value)];
      if (!mapped) return [];
      return [{
        id: `COSTAR-HYP-${index + 1}-${source.value}`,
        version: "1.0.0",
        sourceRuleId: source.rule,
        sourceValue: `${source.value}`,
        constructId: mapped.constructId,
        facetId: mapped.facetId,
        expectedDirection: mapped.expectedDirection,
        sourceMeaning: source.meaning,
        testingItemIds: [`ITEM-${mapped.constructId.slice(4)}-01`, `ITEM-${mapped.constructId.slice(4)}-02`, `ITEM-${mapped.constructId.slice(4)}-03`],
        founderInputRequired: true
      } satisfies ChartHypothesis];
    });
  },

  explainCalculation(profile, resultId) {
    return profile.traces.find((trace) => trace.id === resultId);
  }
};

export function calculateProprietaryProfile(profile: ProfileContext): ProprietaryProfile {
  return costarProvider.calculateProfile({
    fullName: profile.birthName,
    calledName: profile.calledName,
    birthDate: profile.birthDate
  });
}
