import type { ConstructDefinition } from "../domain";

export const constructs: ConstructDefinition[] = [
  {
    id: "HUE-01",
    version: "1.0.0",
    name: "Social Energy and Engagement",
    plainLanguageName: "Social energy",
    definition: "How a person seeks, uses, and recovers from social contact.",
    facets: ["initiative", "stimulation", "expressiveness", "recovery"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-02",
    version: "1.0.0",
    name: "Emotional Sensitivity",
    plainLanguageName: "Sensitivity",
    definition: "How intensely emotional, interpersonal, and environmental signals register.",
    facets: ["criticism", "rejection", "intensity", "cue-detection"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-03",
    version: "1.0.0",
    name: "Emotional Regulation and Recovery",
    plainLanguageName: "Recovery",
    definition: "What happens after emotion activates and how equilibrium returns.",
    facets: ["impulse-control", "rumination", "support-seeking", "recovery-speed"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-04",
    version: "1.0.0",
    name: "Autonomy and Control Needs",
    plainLanguageName: "Autonomy",
    definition: "How strongly a person needs choice, ownership, independence, and freedom from control.",
    facets: ["choice", "reactance", "authority", "boundaries"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-05",
    version: "1.0.0",
    name: "Belonging, Attachment, and Reassurance",
    plainLanguageName: "Belonging",
    definition: "How a person seeks connection, relational safety, closeness, and reassurance.",
    facets: ["closeness", "reassurance", "trust", "care-receiving"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-06",
    version: "1.0.0",
    name: "Response to Criticism and Evaluation",
    plainLanguageName: "Feedback response",
    definition: "How correction, judgment, failure, and public evaluation are interpreted and handled.",
    facets: ["defensiveness", "curiosity", "perfectionism", "recovery"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-07",
    version: "1.0.0",
    name: "Decision-Making Style",
    plainLanguageName: "Decision style",
    definition: "How a person gathers information, evaluates options, commits, and revisits decisions.",
    facets: ["speed", "information", "consultation", "rumination"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-08",
    version: "1.0.0",
    name: "Conflict and Boundary Style",
    plainLanguageName: "Conflict style",
    definition: "How a person responds when needs, values, expectations, or power collide.",
    facets: ["avoidance", "directness", "boundary-clarity", "repair"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-09",
    version: "1.0.0",
    name: "Need for Certainty and Ambiguity Tolerance",
    plainLanguageName: "Certainty need",
    definition: "How a person responds when outcomes, rules, intentions, or identities are unclear.",
    facets: ["planning", "closure", "flexibility", "unknowns"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-10",
    version: "1.0.0",
    name: "Motivation and Reward Orientation",
    plainLanguageName: "Motivation",
    definition: "What reliably activates and sustains effort across roles and contexts.",
    facets: ["autonomy", "mastery", "belonging", "meaning"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-11",
    version: "1.0.0",
    name: "Adaptability and Change Response",
    plainLanguageName: "Adaptability",
    definition: "How quickly and effectively a person updates when plans, roles, or expectations change.",
    facets: ["transition", "routine", "flexibility", "novelty"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  },
  {
    id: "HUE-12",
    version: "1.0.0",
    name: "Stress Expression and Coping",
    plainLanguageName: "Stress response",
    definition: "The pattern that emerges when demands exceed perceived resources.",
    facets: ["activation", "coping", "warning-signs", "restoration"],
    minimumEvidence: 3,
    evidenceGrade: "B",
    validationStatus: "developmental"
  }
];

export const constructById = new Map(constructs.map((construct) => [construct.id, construct]));
